/* eslint-disable no-undef */
// @ts-nocheck
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDb from "../Model/MongoDB.js";

import FetchRouter from "../Router/FetchRouter.js";
import AuthRouter from "../Router/AuthRouter.js";
import PaymentRouter from "../Router/PaymentRouter.js";
import OrderRouter from "../Router/OrderRouter.js";
import WebhookRouter from "../Router/WebhookRouter.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
ConnectDb();

// Generate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  1. CORS - Must be first for preflight requests
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
app.options("*", cors(corsOptions));

//  2. Logging middleware - Before body parsing to see raw requests
app.use((req, res, next) => {
  console.log(
    "[REQ]",
    new Date().toISOString(),
    req.method,
    req.originalUrl,
    "Origin:",
    req.get("origin")
  );
  next();
});

//  3. Webhook routes with raw body parser - MUST come before express.json()
app.use("/webhooks", express.raw({ type: "application/json" }), WebhookRouter);

//  4. Body parsing for all other routes
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this for form data

//  5. Static files middleware
app.use(
  "/images",
  express.static(path.join(__dirname, "../images"), {
    maxAge: "30d",
    immutable: true,
    etag: true,
    lastModified: true,
    setHeaders: (res) => {
      res.setHeader("Cache-Control", "public, max-age=2592000, immutable");
      res.setHeader("X-Content-Type-Options", "nosniff");
    },
  })
);

// ✅ 6. Application routes - After body parsing
app.use("/fetch", FetchRouter);
app.use("/payment", PaymentRouter);
app.use("/auth", AuthRouter);
app.use("/orders", OrderRouter);

// ✅ 7. 404 handler - Should come after all routes
app.use((req, res) => {
  console.log("404 - Route not found:", req.method, req.path);
  res.status(404).json({
    error: "Route not found",
    path: req.path,
    method: req.method,
  });
});

// ✅ 8. Error handling middleware - Must be last
app.use((err, req, res) => {
  console.error("Server error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
