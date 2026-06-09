import ProductModel from "../../Model/ProductSchema.js";
import "dotenv/config";

const HOST_BASE = process.env.PUBLIC_HOST;

export const AdminData = async (req, res) => {
  try {
    const cursor = req.query.cursor;
    const limit = parseInt(req.query.limit) || 20;

    // 1. Build the infinite scroll query
    const query = {};
    if (cursor) {
      query._id = { $lt: cursor };
    }

    const toPublicImageUrl = (img) => {
      if (!img) return "";
      const s = String(img).trim();
      if (s.startsWith("http://") || s.startsWith("https://")) return s;

      const baseUrl = HOST_BASE || "http://localhost:5000";
      return `${baseUrl}/images/${encodeURIComponent(s)}`;
    };

    const promises = [
      ProductModel.find(query)
        .sort({ _id: -1 })
        .limit(limit + 1)
        .lean(),
    ];

    if (!cursor) {
      promises.push(
        ProductModel.aggregate([
          {
            $facet: {
              // Worker 1: Your top-level metric cards
              globalStats: [
                {
                  $group: {
                    _id: null,
                    totalInventoryValue: { $sum: "$current_price" },
                    maxDiscountGiven: { $max: "$discount_percentage" },
                    minDiscountGiven: { $min: "$discount_percentage" },
                    avgStoreRating: { $avg: "$rating.stars" },
                    totalProducts: { $sum: 1 },
                  },
                },
              ],

              // Worker 2: categoryChart data
              categoryChart: [
                {
                  $group: {
                    _id: { $ifNull: ["$category", "Uncategorized"] }, // Handle missing categories safely
                    count: { $sum: 1 },
                  },
                },
                {
                  $project: {
                    name: "$_id", // Rename _id to 'name' for Recharts
                    count: 1,
                    _id: 0,
                  },
                },
              ],

              // Worker 3: ratingChart data
              ratingChart: [
                {
                  $group: {
                    _id: { $ifNull: ["$category", "Uncategorized"] },
                    avgRating: { $avg: "$rating.stars" },
                  },
                },
                {
                  $project: {
                    category: "$_id",
                    avgRating: { $round: ["$avgRating", 1] }, // Round to 1 decimal place!
                    _id: 0,
                  },
                },
              ],

              // Worker 4: discountChart data (The 10% Bucket Math)
              discountChart: [
                {
                  $group: {
                    // MongoDB Math: floor(discount / 10) * 10
                    _id: {
                      $multiply: [
                        {
                          $floor: {
                            $divide: [
                              { $ifNull: ["$discount_percentage", 0] },
                              10,
                            ],
                          },
                        },
                        10,
                      ],
                    },
                    count: { $sum: 1 },
                  },
                },
                {
                  $project: {
                    // Format the string: "10-19%"
                    discountRange: {
                      $concat: [
                        { $toString: "$_id" },
                        "-",
                        { $toString: { $add: ["$_id", 9] } },
                        "%",
                      ],
                    },
                    count: 1,
                    _id: 0,
                  },
                },
                { $sort: { discountRange: 1 } }, // Sort buckets from lowest to highest
              ],
            },
          },
        ]),
      );
    }

    const [products, metricsResult] = await Promise.all(promises);

    // 5. Cursor Math
    let nextCursor = null;
    if (products.length > limit) {
      products.pop();
      nextCursor = products[products.length - 1]._id;
    }

    const mappedProducts = products.map((item) => ({
      ...item,
      image: toPublicImageUrl(item.image),
    }));

    const metricsPayload =
      metricsResult && metricsResult.length > 0
        ? {
            // globalStats comes back as an array, so we grab the first item
            globalStats: metricsResult[0].globalStats[0] || {},
            categoryChart: metricsResult[0].categoryChart || [],
            ratingChart: metricsResult[0].ratingChart || [],
            discountChart: metricsResult[0].discountChart || [],
          }
        : null;

    return res.status(200).json({
      success: true,
      products: mappedProducts,
      nextCursor: nextCursor,
      metrics: metricsPayload, // Send metrics to the frontend!
    });
  } catch (error) {
    console.error("[AdminData] Error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch products",
      error: error.message,
    });
  }
};
