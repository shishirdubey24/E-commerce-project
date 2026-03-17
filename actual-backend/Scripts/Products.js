import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ConnectDb from "../Model/MongoDB.js";
import ProductModel from "../Model/ProductSchema.js";
import mongoose from "mongoose";
// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Always resolve items.json relative to this script
const itemsPath = path.join(__dirname, "../items.json");
const fileContent = fs.readFileSync(itemsPath, "utf8");
const items = JSON.parse(fileContent);

const InsertProducts = async () => {
  try {
    await ConnectDb();

    // Clear old data
    await ProductModel.deleteMany({});

    // Insert real JSON data
    await ProductModel.insertMany(items);

    console.log("Products inserted successfully");
  } catch (err) {
    console.error("Error during seeding:", err);
  } finally {
    await mongoose.disconnect();
  }
};

InsertProducts();
