import { Router } from "express";
import { User } from "../models/User";
import { logger } from "../lib/logger";

const router = Router();

router.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Return a simple success with user info (basic auth token simulation)
    return res.status(200).json({
      success: true,
      user: { id: user._id, username: user.username },
      token: "TONIQE_auth_token_" + Date.now() // Mock token for session storage
    });
  } catch (error: any) {
    logger.error({ err: error }, "Login error");
    return res.status(500).json({ error: "An error occurred during login" });
  }
});

export default router;
