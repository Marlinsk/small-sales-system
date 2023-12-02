import "dotenv/config"
import mongoose from "mongoose";

export function connect() {
  mongoose.connect(String(process.env.DATABASE_URL));
  
  mongoose.connection.on("connected", function () {
    console.info("The application connected to MongoDB successfully!");
  });

  mongoose.connection.on("error", function () {
    console.error("The application failed to connect to MongoDB!");
  });
}