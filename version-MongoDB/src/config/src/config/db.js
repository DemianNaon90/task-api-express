// src/config/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tasksDB");
    console.log("✅ MongoDB conectado");
  } catch (error) {
    console.error("❌ Error de conexión:", error.message);
    process.exit(1);
  }
};
