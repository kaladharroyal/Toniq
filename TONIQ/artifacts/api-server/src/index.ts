import app from "./app";
import { logger } from "./lib/logger";
import { connectDB } from "./lib/db";

const port = Number(process.env["PORT"]) || 3000;

try {
  await connectDB();
  
  app.listen(port, () => {
    logger.info({ port }, "Server listening");
  });
} catch (err) {
  logger.error({ err }, "Fatal error during startup");
  process.exit(1);
}
