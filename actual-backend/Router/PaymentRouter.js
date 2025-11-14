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

    const response = await cashfree.PGCreateOrder({
      order_amount: "1",
      order_currency: "INR",
      customer_details: {
        customer_id: "testuser001",
        customer_email: "test@gmail.com",
        customer_phone: "9999999999",
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
