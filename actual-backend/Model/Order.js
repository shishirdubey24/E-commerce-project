// backend/models/Order.js
import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  qty: { type: Number, default: 1 },
  price: { type: Number, default: 0 },
});

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  items: { type: [ItemSchema], default: [] },
  customer: {
    name: String,
    email: String,
    phone: String,
    customer_id: String, // sanitized id used for Cashfree
  },
  status: { type: String, default: "pending" }, // pending, paid, failed
  paymentMeta: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
