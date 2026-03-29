import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "./logger";
import path from "path";
import { fileURLToPath } from "url";

// Try multiple possible .env locations for portability
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envCandidates = [
  path.resolve(__dirname, "../../../../.env"),   // from dist/lib/ -> workspace root
  path.resolve(__dirname, "../../../.env"),       // from src/lib/ -> workspace root
  path.resolve(process.cwd(), "../../.env"),      // original: cwd = artifacts/api-server
  path.resolve(process.cwd(), ".env"),            // cwd = workspace root
];

for (const envPath of envCandidates) {
  const result = dotenv.config({ path: envPath });
  if (!result.error) {
    logger.info(`Loaded .env from: ${envPath}`);
    break;
  }
}

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in the environment variables. None of the .env candidate paths contained it.");
    }

    logger.info(`Connecting to MongoDB (host: ${mongoURI.split("@")[1]?.split("/")[0] ?? "unknown"})...`);
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
    });
    logger.info("Successfully connected to MongoDB");
  } catch (error: any) {
    logger.error(
      { err: error },
      `Failed to connect to MongoDB: ${error.message}. Check your IP whitelist on MongoDB Atlas (https://cloud.mongodb.com -> Network Access).`
    );
    process.exit(1);
  }
};
