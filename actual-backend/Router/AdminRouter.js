import express from "express";
import { AdminData } from "../Controller/Admin/AdminData.js";
const router = express.Router();
router.get("/products", AdminData);
export default router;
