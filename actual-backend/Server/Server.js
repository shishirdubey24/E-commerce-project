/* eslint-disable no-undef */
// @ts-nocheck
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Cashfree, CFEnvironment } from "cashfree-pg";

dotenv.config();

const app = express();

// ✅ Enhanced CORS configuration for localhost
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173", // Vite default port
    "http://localhost:8080",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "https://dev-by-shishir.netlify.app", // Your production URL
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const clientId = process.env.CASHFREE_API_KEY;
const secret = process.env.CASHFREE_SECRET_KEY;

const cashfree = new Cashfree(CFEnvironment.SANDBOX, clientId, secret);

app.post("/create-order", async (req, res) => {
  try {
    console.log("Received order request:", req.body); // ✅ Add logging

    const response = await cashfree.PGCreateOrder({
      order_amount: "1",
      order_currency: "INR",
      customer_details: {
        customer_id: "testuser001",
        customer_email: "test@gmail.com",
        customer_phone: "9999999999",
      },
      order_meta: {
        return_url: "https://dev-by-shishir.netlify.app/success",
      },
    });

    console.log("Order created successfully"); // ✅ Add logging
    res.json({ paymentSessionId: response.data.payment_session_id });
  } catch (err) {
    console.log("Order creation error:", err.response?.data || err);
    res.status(500).json({ error: "Order creation failed" });
  }
});

app.get("/", (req, res) => {
  res.send("Cashfree Payment Backend is Live");
});

// ✅ Add health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  // ✅ Listen on all interfaces
  console.log(`Server running on port ${PORT}`);
  console.log(`Test URL: http://localhost:${PORT}`);
});
