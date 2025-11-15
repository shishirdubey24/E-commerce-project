/* eslint-disable no-undef */
// @ts-nocheck
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDb from "../Model/MongoDB.js";

import FetchRouter from "../Router/FetchRouter.js";
import AuthRouter from "../Router/AuthRouter.js";
import PaymentRouter from "../Router/PaymentRouter.js";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const app = express();
ConnectDb();
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
app.options("*", cors(corsOptions));

app.use(express.json());

app.use("/fetch", FetchRouter);
app.use("/payment", PaymentRouter);
app.use("/auth", AuthRouter);
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
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
