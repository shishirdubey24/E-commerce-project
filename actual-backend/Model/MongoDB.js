/* global process */
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB is connected");
  } catch (error) {
    console.error(" MongoDB connection error:", error.message);
    process.exit(1);
  }
};
export default ConnectDb;
