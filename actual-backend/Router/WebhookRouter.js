// backend Router/WebhookRouter.js
import express from "express";
import Order from "../Model/Order.js";

const router = express.Router();

// Accept raw body so we can log & parse exactly what Cashfree sends
router.post("/cashfree", express.raw({ type: "*/*" }), async (req, res) => {
  try {
    // Log headers and raw body for debugging
    console.log("Incoming Cashfree webhook headers:", req.headers);

    let payload;
    try {
      payload = JSON.parse(req.body.toString());
    } catch (e) {
      console.warn("Webhook: failed to parse JSON from raw body", e);
      payload = {};
    }
    console.log("Incoming Cashfree webhook payload:", payload);

    // Try multiple possible keys (Cashfree payload fields may vary)
    const orderId =
      payload.order_id ||
      payload.reference_id ||
      payload.orderId ||
      payload.orderid ||
      payload.referenceId;
    const order_status =
      payload.order_status ||
      payload.txStatus ||
      payload.status ||
      payload.orderStatus;

    if (!orderId) {
      console.warn("Webhook missing order id, payload:", payload);
      return res.status(400).send("missing order id");
    }

    // Normalize status to lower-case string for DB
    const normalizedStatus = (order_status || "unknown")
      .toString()
      .toLowerCase();

    await Order.updateOne(
      { orderId },
      { status: normalizedStatus, paymentMeta: payload }
    );

    console.log(`Order ${orderId} updated to status=${normalizedStatus}`);
    return res.status(200).send("OK");
  } catch (err) {
    console.error("Webhook handling error:", err);
    return res.status(500).send("error");
  }
});

export default router;
