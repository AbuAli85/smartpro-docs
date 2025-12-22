/**
 * Authentication API Routes
 * Handles user registration, login, and token management
 */

import express, { Request, Response, NextFunction } from "express";
import AuthService from "../services/authService.js";

const router = express.Router();
const authService = new AuthService();

// Middleware to verify JWT token
const authenticateToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    const decoded = require("jsonwebtoken").verify(
      token,
      process.env.JWT_SECRET || "secret"
    );
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post(
  "/register",
  async (req: Request, res: Response) => {
    try {
      const { email, password, name, role } = req.body;

      // Validate required fields
      if (!email || !password || !name) {
        return res
          .status(400)
          .json({ error: "Email, password, and name are required" });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      // Validate password strength
      if (password.length < 8) {
        return res
          .status(400)
          .json({ error: "Password must be at least 8 characters" });
      }

      const result = await authService.register({
        email,
        password,
        name,
        role: role || "provider",
      });

      res.status(201).json(result);
    } catch (error: any) {
      console.error("Error registering user:", error);
      res.status(400).json({ error: error.message });
    }
  }
);

/**
 * POST /api/auth/login
 * Login user
 */
router.post(
  "/login",
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const result = await authService.login({ email, password });

      res.json(result);
    } catch (error: any) {
      console.error("Error logging in user:", error);
      res.status(401).json({ error: error.message });
    }
  }
);

/**
 * POST /api/auth/refresh
 * Refresh access token
 */
router.post(
  "/refresh",
  async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({ error: "Refresh token is required" });
      }

      const result = await authService.refreshToken(refreshToken);

      res.json(result);
    } catch (error: any) {
      console.error("Error refreshing token:", error);
      res.status(401).json({ error: error.message });
    }
  }
);

/**
 * GET /api/auth/me
 * Get current user profile
 */
router.get(
  "/me",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      const user = await authService.getUserById(req.userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (error: any) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * PUT /api/auth/profile
 * Update user profile
 */
router.put(
  "/profile",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      const { name, email } = req.body;

      if (!name && !email) {
        return res
          .status(400)
          .json({ error: "At least one field is required" });
      }

      const user = await authService.updateProfile(req.userId, {
        name,
        email,
      });

      res.json(user);
    } catch (error: any) {
      console.error("Error updating profile:", error);
      res.status(400).json({ error: error.message });
    }
  }
);

/**
 * POST /api/auth/change-password
 * Change user password
 */
router.post(
  "/change-password",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        return res
          .status(400)
          .json({ error: "Old password and new password are required" });
      }

      if (newPassword.length < 8) {
        return res
          .status(400)
          .json({ error: "New password must be at least 8 characters" });
      }

      const result = await authService.changePassword(
        req.userId,
        oldPassword,
        newPassword
      );

      res.json(result);
    } catch (error: any) {
      console.error("Error changing password:", error);
      res.status(400).json({ error: error.message });
    }
  }
);

/**
 * POST /api/auth/request-password-reset
 * Request password reset
 */
router.post(
  "/request-password-reset",
  async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const result = await authService.requestPasswordReset(email);

      res.json(result);
    } catch (error: any) {
      console.error("Error requesting password reset:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * POST /api/auth/reset-password
 * Reset password with token
 */
router.post(
  "/reset-password",
  async (req: Request, res: Response) => {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res
          .status(400)
          .json({ error: "Token and new password are required" });
      }

      if (newPassword.length < 8) {
        return res
          .status(400)
          .json({ error: "Password must be at least 8 characters" });
      }

      const result = await authService.resetPassword(token, newPassword);

      res.json(result);
    } catch (error: any) {
      console.error("Error resetting password:", error);
      res.status(400).json({ error: error.message });
    }
  }
);

/**
 * POST /api/auth/logout
 * Logout user (client-side token removal)
 */
router.post(
  "/logout",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      // In a real app, you might want to blacklist the token
      // For now, just confirm logout
      res.json({ success: true, message: "Logged out successfully" });
    } catch (error: any) {
      console.error("Error logging out:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * GET /api/auth/users (admin only)
 * Get all users
 */
router.get(
  "/users",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      if (req.userRole !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }

      const { limit = 50, offset = 0 } = req.query;

      const result = await authService.getAllUsers(
        parseInt(limit),
        parseInt(offset)
      );

      res.json(result);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * DELETE /api/auth/users/:id (admin only)
 * Delete a user
 */
router.delete(
  "/users/:id",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      if (req.userRole !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }

      const result = await authService.deleteUser(req.params.id);

      res.json(result);
    } catch (error: any) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
