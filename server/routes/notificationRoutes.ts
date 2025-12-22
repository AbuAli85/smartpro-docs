/**
 * Notification API Routes
 * Handles all notification-related endpoints
 */

import express, { Request, Response, NextFunction } from "express";
import NotificationService from "../services/notificationService.js";

// Initialize Prisma client
let prisma: any;
try {
  const { PrismaClient: PC } = require("@prisma/client");
  prisma = new PC();
} catch (error) {
  console.warn("Prisma client not available");
}

const router = express.Router();
const notificationService = new NotificationService();

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
 * POST /api/notifications
 * Create a new notification
 */
router.post(
  "/",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      const { userId, type, priority, title, message, description, icon, actionUrl, actionLabel, relatedId, data } = req.body;

      // Validate required fields
      if (!userId || !type || !title || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const notification = await notificationService.createAndSendNotification({
        userId,
        type,
        priority: priority || "normal",
        title,
        message,
        description,
        icon,
        actionUrl,
        actionLabel,
        relatedId,
        data,
      });

      res.status(201).json(notification);
    } catch (error: any) {
      console.error("Error creating notification:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * GET /api/notifications
 * Get notifications for the authenticated user
 */
router.get(
  "/",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      const { limit = 50, offset = 0, read, archived, type } = req.query;

      const result = await notificationService.getNotifications(req.userId, {
        limit: parseInt(limit),
        offset: parseInt(offset),
        read: read ? read === "true" : undefined,
        archived: archived ? archived === "true" : undefined,
        type,
      });

      res.json(result);
    } catch (error: any) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * GET /api/notifications/:id
 * Get a single notification
 */
router.get(
  "/:id",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      const notification = await prisma.notification.findUnique({
        where: { id: req.params.id },
      });

      if (!notification) {
        return res.status(404).json({ error: "Notification not found" });
      }

      if (notification.userId !== req.userId && req.userRole !== "admin") {
        return res.status(403).json({ error: "Unauthorized" });
      }

      res.json(notification);
    } catch (error: any) {
      console.error("Error fetching notification:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * PUT /api/notifications/:id
 * Update a notification
 */
router.put(
  "/:id",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      const notification = await prisma.notification.findUnique({
        where: { id: req.params.id },
      });

      if (!notification) {
        return res.status(404).json({ error: "Notification not found" });
      }

      if (notification.userId !== req.userId && req.userRole !== "admin") {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const updated = await prisma.notification.update({
        where: { id: req.params.id },
        data: req.body,
      });

      res.json(updated);
    } catch (error: any) {
      console.error("Error updating notification:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * DELETE /api/notifications/:id
 * Delete a notification
 */
router.delete(
  "/:id",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      const notification = await prisma.notification.findUnique({
        where: { id: req.params.id },
      });

      if (!notification) {
        return res.status(404).json({ error: "Notification not found" });
      }

      if (notification.userId !== req.userId && req.userRole !== "admin") {
        return res.status(403).json({ error: "Unauthorized" });
      }

      await notificationService.deleteNotification(req.params.id, req.userId);

      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting notification:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * POST /api/notifications/:id/read
 * Mark notification as read
 */
router.post(
  "/:id/read",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      const notification = await prisma.notification.findUnique({
        where: { id: req.params.id },
      });

      if (!notification) {
        return res.status(404).json({ error: "Notification not found" });
      }

      if (notification.userId !== req.userId && req.userRole !== "admin") {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const updated = await notificationService.markAsRead(
        req.params.id,
        req.userId
      );

      res.json(updated);
    } catch (error: any) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * POST /api/notifications/:id/archive
 * Archive notification
 */
router.post(
  "/:id/archive",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      const notification = await prisma.notification.findUnique({
        where: { id: req.params.id },
      });

      if (!notification) {
        return res.status(404).json({ error: "Notification not found" });
      }

      if (notification.userId !== req.userId && req.userRole !== "admin") {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const updated = await notificationService.archiveNotification(
        req.params.id,
        req.userId
      );

      res.json(updated);
    } catch (error: any) {
      console.error("Error archiving notification:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * GET /api/notifications/stats
 * Get notification statistics
 */
router.get(
  "/stats",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      const stats = await notificationService.getNotificationStats(req.userId);
      res.json(stats);
    } catch (error: any) {
      console.error("Error fetching notification stats:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * POST /api/notifications/broadcast
 * Broadcast notification to all providers (admin only)
 */
router.post(
  "/broadcast",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      if (req.userRole !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }

      const { type, priority, title, message, description, icon, actionUrl, actionLabel, data } = req.body;

      if (!type || !title || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const count = await notificationService.createAndBroadcastNotification({
        type,
        priority: priority || "normal",
        title,
        message,
        description,
        icon,
        actionUrl,
        actionLabel,
        data,
      });

      res.json({ success: true, count });
    } catch (error: any) {
      console.error("Error broadcasting notification:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
