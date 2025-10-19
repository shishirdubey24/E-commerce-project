/* eslint-disable no-undef */
// @ts-nocheck
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import fetchRouter from "../Router/FetchRouter.js";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const app = express();
// Generate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:8080",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "https://trendwired.netlify.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // ✅ handle preflight requests

app.use(express.json());

const clientId = process.env.CASHFREE_API_KEY;
const secret = process.env.CASHFREE_SECRET_KEY;

const cashfree = new Cashfree(CFEnvironment.SANDBOX, clientId, secret);

app.post("/create-order", async (req, res) => {
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

app.use("/fetch", fetchRouter);
app.use(
  "/images",
  express.static(path.join(__dirname, "../images"), {
    maxAge: "30d", // Cache for 30 days
    immutable: true, // Tells browser: "These files won't change"
    etag: true, // Allows cache validation if file ever changes
    lastModified: true, // Sends 'Last-Modified' header for conditional requests
    setHeaders: (res) => {
      // ✅ Explicitly add Cache-Control header
      res.setHeader("Cache-Control", "public, max-age=2592000, immutable");
      // Optional: Slight security hardening
      res.setHeader("X-Content-Type-Options", "nosniff");
    },
  })
);

app.get("/", (req, res) => {
  res.send("Cashfree Payment Backend is Live");
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
