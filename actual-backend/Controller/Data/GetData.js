import Product from "../../Model/ProductSchema.js";

// Hard-coded production backend URL
const HOST_BASE = "https://e-commerce-project-76em.onrender.com";

export const getData = async (req, res) => {
  try {
    const { category, page, limit } = req.query;

    // Convert filename → full public Render URL
    const toPublicImageUrl = (img) => {
      if (!img) return "";
      const s = String(img).trim();
      if (s.startsWith("http://") || s.startsWith("https://")) return s;
      return `${HOST_BASE}/images/${encodeURIComponent(s)}`;
    };

    // FEATURED PRODUCTS (home page default)
    if (!category || category.toLowerCase() === "featured") {
      const featured = await Product.find({
        $or: [{ category: { $exists: false } }, { category: "Featured" }],
      })
        .sort({ _id: 1 })
        .limit(8)
        .lean();

      const mapped = featured.map((it) => ({
        ...it,
        image: toPublicImageUrl(it.image),
      }));

      return res.json({ items: mapped, totalCount: mapped.length });
    }

    // CATEGORY FILTER
    const pageNum = Math.max(1, Number(page) || 1);
    const lim = Math.max(1, Number(limit) || 100);
    const skip = (pageNum - 1) * lim;
    const categoryRegex = new RegExp(`^${category.trim()}$`, "i");

    const [items, totalCount] = await Promise.all([
      Product.find({ category: categoryRegex }).skip(skip).limit(lim).lean(),
      Product.countDocuments({ category: categoryRegex }),
    ]);

    const mapped = items.map((it) => ({
      ...it,
      image: toPublicImageUrl(it.image),
    }));

    return res.json({ items: mapped, totalCount });
  } catch (err) {
    console.error("getData error:", err);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};
