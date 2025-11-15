// backend/routes/webhook.js
import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// For simplicity we parse JSON. If Cashfree sends raw body for signature, adapt middleware accordingly.
router.post("/cashfree", express.json(), async (req, res) => {
  try {
    const payload = req.body;
    // payload keys vary; adjust per actual Cashfree webhook shape
    const orderId = payload.order_id || payload.reference_id || payload.orderId;
    const order_status =
      payload.order_status || payload.txStatus || payload.status;

    if (!orderId) {
      console.warn("Webhook missing order id", payload);
      return res.status(400).send("missing order id");
    }

    await Order.updateOne(
      { orderId },
      { status: order_status || "unknown", paymentMeta: payload }
    );

    return res.status(200).send("OK");
  } catch (err) {
    console.error("Webhook handling error:", err);
    return res.status(500).send("error");
  }
});

export default router;
