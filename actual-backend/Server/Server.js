/* eslint-disable no-undef */
// @ts-nocheck
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Cashfree, CFEnvironment } from "cashfree-pg";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const clientId = process.env.CASHFREE_API_KEY;
const secret = process.env.CASHFREE_SECRET_KEY;

const cashfree = new Cashfree(CFEnvironment.SANDBOX, clientId, secret);

app.post("/create-order", async (req, res) => {
  try {
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

    res.json({ paymentSessionId: response.data.payment_session_id });
  } catch (err) {
    console.log(err.response?.data || err);
    res.status(500).json({ error: "Order creation failed" });
  }
});
app.get("/", (req, res) => {
  res.send("Cashfree Payment Backend is Live ");
});

app.listen(5000, () => console.log("Server running on port 5000"));
