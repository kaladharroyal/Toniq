import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "./logger";
import path from "path";

// Load .env relative to the workspace root if not already loaded
dotenv.config({ path: path.join(process.cwd(), "../../.env") });

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in the environment variables");
    }
    
    await mongoose.connect(mongoURI);
    logger.info("Successfully connected to MongoDB");
  } catch (error) {
    logger.error({ err: error }, "Failed to connect to MongoDB");
    // Optionally we can exit if DB is strictly required
    // process.exit(1); 
  }
};
