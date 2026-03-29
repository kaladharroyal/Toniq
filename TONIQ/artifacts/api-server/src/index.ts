import app from "./app";
import { logger } from "./lib/logger";
import { connectDB } from "./lib/db";
import { User } from "./models/User";

const port = Number(process.env["PORT"]) || 3000;

async function seedAdmin() {
  try {
    const adminExists = await User.findOne({ username: "admin" });
    if (!adminExists) {
      await User.create({
        username: "admin",
        password: "toniqadmin123", // In a real app, use bcrypt hashing
        role: "admin",
      });
      logger.info("Default admin user created");
    }
  } catch (error) {
    logger.error({ err: error }, "Error seeding admin user");
  }
}

try {
  await connectDB();
  await seedAdmin();
  
  app.listen(port, () => {
    logger.info({ port }, "Server listening");
  });
} catch (err) {
  logger.error({ err }, "Fatal error during startup");
  process.exit(1);
}
