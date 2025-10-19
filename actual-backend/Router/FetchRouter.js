import express from "express";
import { getData } from "../Controller/Data/GetData.js";

const router = express.Router();

// Correct route
router.get("/data", getData);

export default router;
