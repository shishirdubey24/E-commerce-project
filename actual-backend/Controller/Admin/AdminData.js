import Product from "../../Model/ProductSchema.js";
const HOST_BASE = "https://e-commerce-project-76em.onrender.com";

export const AdminData = async (req, res) => {
  try {
    //image conversion
    const ImageURL = (img) => {
      if (!img) return "";
      const s = String(img).trim();
      if (s.startsWith("http://") || s.startsWith("https://")) return s;
      return `${HOST_BASE}/images/${encodeURIComponent(s)}`;
    };

    //full data fetching
    const Products = await Product.find({}).lean();
    const mapped = Products.map((p) => ({
      ...p,
      image: ImageURL(p.ImageURL),
    }));
    return res.json(mapped);
  } catch (error) {
    console.error("[AdminData] Error:", error);
    return res.status(500).json({
      error: "Failed to fetch products",
      message: error.message,
    });
  }
};
