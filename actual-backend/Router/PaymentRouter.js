/* eslint-disable no-undef */
import express from "express";
import { Cashfree, CFEnvironment } from "cashfree-pg";

const router = express.Router();

const clientId = process.env.CASHFREE_API_KEY;
const secret = process.env.CASHFREE_SECRET_KEY;

const cashfree = new Cashfree(CFEnvironment.SANDBOX, clientId, secret);

const sanitizeForCf = (s = "") =>
  String(s)
    .split("@")[0]
    .replace(/[^A-Za-z0-9_-]/g, "_")
    .slice(0, 64);

router.post("/create-order", async (req, res) => {
  try {
    const {
      order_amount,
      customer_id,
      customer_email,
      customer_phone,
      customer_name,
      items = [], // send items from frontend
    } = req.body;

    const amountNum = Number(order_amount);
    if (!amountNum || amountNum <= 0) {
      return res.status(400).json({ error: "Invalid order amount" });
    }

    const orderId = `ORDER_${Date.now()}`;

    // create and save order (status = pending)
    const orderDoc = await Order.create({
      orderId,
      amount: amountNum,
      items,
      customer: {
        name: customer_name || "Guest User",
        email: customer_email || "",
        phone: customer_phone || "",
        customer_id: sanitizeForCf(
          customer_id || customer_email || `user_${Date.now()}`
        ),
      },
      status: "pending",
    });

    // create Cashfree order; replace the return_url with your frontend URL
    const FRONTEND_SUCCESS_URL =
      process.env.FRONTEND_SUCCESS_URL || "http://localhost:3000/success";
    const response = await cashfree.PGCreateOrder({
      order_id: orderId,
      order_amount: amountNum.toString(),
      order_currency: "INR",
      customer_details: {
        customer_id: orderDoc.customer.customer_id,
        customer_email: orderDoc.customer.email || "test@gmail.com",
        customer_phone: orderDoc.customer.phone || "9999999999",
        customer_name: orderDoc.customer.name || "Guest User",
      },
      order_meta: {
        return_url: `${FRONTEND_SUCCESS_URL}?orderId=${orderId}`,
        // optional: notify_url: `https://your-backend.com/webhook/cashfree`
      },
    });

    return res.json({
      paymentSessionId: response?.data?.payment_session_id,
      orderId,
    });
  } catch (err) {
    console.error(
      "Order creation error:",
      err.response?.data || err?.message || err
    );
    const details = err.response?.data || {
      message: err?.message || "Order creation failed",
    };
    return res.status(500).json({ error: "Order creation failed", details });
  }
});

export default router;
