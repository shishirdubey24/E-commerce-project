import ProductModel from "../../Model/ProductSchema.js";
import "dotenv/config";
const HOST_BASE = process.env.PUBLIC_HOST;
export const AdminData = async (req, res) => {
  try {
    const cursor = req.query.cursor;
    const limit = parseInt(req.query.limit) || 20;
    const query = {};
    if (cursor) {
      query._id = { $lt: cursor };
    }
    const toPublicImageUrl = (img) => {
      if (!img) return "";
      const s = String(img).trim();
      if (s.startsWith("http://") || s.startsWith("https://")) return s;
      return `${HOST_BASE}/images/${encodeURIComponent(s)}`;
    };

    const products = await ProductModel.find(query)
      .sort({ _id: -1 })
      .limit(limit + 1)
      .lean();
    let nextCursor = null;
    if (products.length > limit) {
      products.pop();
    }
    const mappedProducts = products.map((item) => ({
      ...item,
      image: toPublicImageUrl(item.image),
    }));
    return res.status(200).json({
      message: true,
      products: mappedProducts,
      nextCursor: nextCursor,
    });
  } catch (error) {
    return res.status(500).json({
      message: "unbale to fetch",
      error: error.message,
    });
  }
};
