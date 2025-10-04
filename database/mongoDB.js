import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

if (!DB_URI) {
  throw new Error("DB_URI is not defined in the environment variables");
}

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`✅ Connected to MongoDB in ${process.env.NODE_ENV || "development"} mode`);
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

export default connectToDB;
