import Product from "../../Model/ProductSchema.js";
export const AdminData = async (req, res) => {
  try {
    const Products = await Product.find({});
    return res.json(Products);
  } catch (error) {
    console.error("[AdminData] Error:", error);
    return res.status(500).json({
      error: "Failed to fetch products",
      message: error.message,
    });
  }
};
