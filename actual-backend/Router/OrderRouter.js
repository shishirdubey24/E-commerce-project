// backend/routes/orders.js
import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.get("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId }).lean();
    if (!order) return res.status(404).json({ error: "Order not found" });
    return res.json({ order });
  } catch (err) {
    console.error("Fetch order error:", err);
    return res.status(500).json({ error: "Failed to fetch order" });
  }
});

export default router;
