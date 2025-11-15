// actual-backend/Router/WebhookRouter.js
import express from "express";
import Order from "../Model/Order.js";
import { Buffer } from "buffer";
const router = express.Router();

// Handle Cashfree webhook - accept raw body + handle cases where body is already parsed
router.post("/cashfree", express.raw({ type: "*/*" }), async (req, res) => {
  try {
    console.log("Incoming Cashfree webhook headers:", req.headers || {});

    let payload = {};

    // CASE 1: Raw Buffer (correct scenario for webhooks)
    if (Buffer.isBuffer(req.body)) {
      const rawText = req.body.toString();
      try {
        payload = JSON.parse(rawText);
      } catch {
        console.warn("Webhook: Could not parse raw body as JSON");
      }
    }

    // CASE 2: Body is already parsed into an object
    if (
      typeof req.body === "object" &&
      req.body !== null &&
      !Buffer.isBuffer(req.body) &&
      Object.keys(req.body).length > 0
    ) {
      payload = req.body;
    }

    // CASE 3: Body is a string
    if (typeof req.body === "string") {
      try {
        payload = JSON.parse(req.body);
      } catch {
        console.warn("Webhook: req.body was string but not valid JSON");
      }
    }

    console.log("Incoming Cashfree webhook payload:", payload);

    // Extract orderId & status from multiple possible Cashfree formats
    const orderId =
      payload.order_id ||
      payload.orderId ||
      payload.reference_id ||
      payload.referenceId ||
      payload.data?.order_id ||
      payload.data?.orderId;

    const order_status =
      payload.order_status ||
      payload.status ||
      payload.txStatus ||
      payload.data?.order_status ||
      payload.data?.status;

    if (!orderId) {
      console.warn("Webhook missing order id, payload:", payload);
      return res.status(400).send("missing order id");
    }

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
