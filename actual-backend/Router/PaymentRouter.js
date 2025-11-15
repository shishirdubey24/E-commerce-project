/* eslint-disable no-undef */
import express from "express";
import { Cashfree, CFEnvironment } from "cashfree-pg";

const router = express.Router();

const clientId = process.env.CASHFREE_API_KEY;
const secret = process.env.CASHFREE_SECRET_KEY;

const cashfree = new Cashfree(CFEnvironment.SANDBOX, clientId, secret);

router.post("/create-order", async (req, res) => {
  try {
    console.log("Received order request:", req.body);
    const {
      order_amount,
      customer_id,
      customer_email,
      customer_phone,
      customer_name,
    } = req.body;
    //  Validate amount
    if (!order_amount || order_amount <= 0) {
      return res.status(400).json({ error: "Invalid order amount" });
    }

    //  Generate unique order ID
    const orderId = `ORDER_${Date.now()}`;

    const response = await cashfree.PGCreateOrder({
      order_id: orderId,
      order_amount: order_amount.toString(), //  Use dynamic amount
      order_currency: "INR",
      customer_details: {
        customer_id: customer_id || "testuser001",
        customer_email: customer_email || "test@gmail.com",
        customer_phone: customer_phone || "9999999999",
        customer_name: customer_name || "Guest User",
      },
      order_meta: {
        return_url: "https://trendwired.netlify.app/success",
      },
    });

    console.log("Order created successfully");
    res.json({ paymentSessionId: response.data.payment_session_id });
  } catch (err) {
    console.log("Order creation error:", err.response?.data || err);
    res.status(500).json({ error: "Order creation failed" });
  }
});
export default router;
