/* eslint-disable no-undef */
import ConnectDb from "../Model/MongoDB";
import ProductModel from "../Model/ProductSchema";
import items from "../items.json";

const InsertProducts = async () => {
  try {
    await ConnectDb();
    await ProductModel.insertMany(items);
    console.log("Products inserted successfully");
  } catch (err) {
    console.error("Error during seeding:", err);
  } finally {
    // 7. Close DB connection so the process exits cleanly
    process.exit();
  }
};
InsertProducts();
