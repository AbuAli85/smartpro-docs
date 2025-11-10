/**
 * Preferences API Routes
 * Handles notification preferences endpoints
 */

import express, { Request, Response, NextFunction } from "express";

// Initialize Prisma client
let prisma: any;
try {
  const { PrismaClient: PC } = require("@prisma/client");
  prisma = new PC();
} catch (error) {
  console.warn("Prisma client not available");
}

const router = express.Router();

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
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

/**
 * GET /api/preferences
 * Get user's notification preferences
 */
router.get(
  "/",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      let preferences = await prisma.notificationPreferences.findUnique({
        where: { userId: req.userId },
      });

      if (!preferences) {
        // Create default preferences if they don't exist
        preferences = await prisma.notificationPreferences.create({
          data: {
            userId: req.userId,
          },
        });
      }

      res.json(preferences);
    } catch (error: any) {
      console.error("Error fetching preferences:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * PUT /api/preferences
 * Update user's notification preferences
 */
router.put(
  "/",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      const preferences = await prisma.notificationPreferences.upsert({
        where: { userId: req.userId },
        update: req.body,
        create: {
          userId: req.userId,
          ...req.body,
        },
      });

      res.json(preferences);
    } catch (error: any) {
      console.error("Error updating preferences:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * POST /api/preferences/reset
 * Reset preferences to defaults
 */
router.post(
  "/reset",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      const preferences = await prisma.notificationPreferences.upsert({
        where: { userId: req.userId },
        update: {
          inAppEnabled: true,
          emailEnabled: true,
          browserPushEnabled: true,
          smsEnabled: false,
          newMessageEnabled: true,
          bookingRequestEnabled: true,
          bookingConfirmedEnabled: true,
          paymentReceivedEnabled: true,
          platformUpdateEnabled: true,
          securityAlertEnabled: true,
          quietHoursEnabled: false,
          quietHoursStart: "22:00",
          quietHoursEnd: "08:00",
          frequency: "immediate",
          soundEnabled: true,
          soundVolume: 70,
          desktopNotifications: true,
          emailDigestEnabled: true,
          emailDigestFrequency: "daily",
        },
        create: {
          userId: req.userId,
        },
      });

      res.json(preferences);
    } catch (error: any) {
      console.error("Error resetting preferences:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * PUT /api/preferences/channels
 * Update notification channels
 */
router.put(
  "/channels",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      const { inAppEnabled, emailEnabled, browserPushEnabled, smsEnabled } =
        req.body;

      const preferences = await prisma.notificationPreferences.upsert({
        where: { userId: req.userId },
        update: {
          inAppEnabled,
          emailEnabled,
          browserPushEnabled,
          smsEnabled,
        },
        create: {
          userId: req.userId,
          inAppEnabled: inAppEnabled !== false,
          emailEnabled: emailEnabled !== false,
          browserPushEnabled: browserPushEnabled !== false,
          smsEnabled: smsEnabled === true,
        },
      });

      res.json(preferences);
    } catch (error: any) {
      console.error("Error updating channels:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * PUT /api/preferences/types
 * Update notification types
 */
router.put(
  "/types",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      const {
        newMessageEnabled,
        bookingRequestEnabled,
        bookingConfirmedEnabled,
        paymentReceivedEnabled,
        platformUpdateEnabled,
        securityAlertEnabled,
      } = req.body;

      const preferences = await prisma.notificationPreferences.upsert({
        where: { userId: req.userId },
        update: {
          newMessageEnabled,
          bookingRequestEnabled,
          bookingConfirmedEnabled,
          paymentReceivedEnabled,
          platformUpdateEnabled,
          securityAlertEnabled,
        },
        create: {
          userId: req.userId,
        },
      });

      res.json(preferences);
    } catch (error: any) {
      console.error("Error updating notification types:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * PUT /api/preferences/quiet-hours
 * Update quiet hours settings
 */
router.put(
  "/quiet-hours",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      const { quietHoursEnabled, quietHoursStart, quietHoursEnd } = req.body;

      // Validate time format (HH:mm)
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (
        quietHoursStart &&
        !timeRegex.test(quietHoursStart)
      ) {
        return res.status(400).json({ error: "Invalid start time format" });
      }
      if (quietHoursEnd && !timeRegex.test(quietHoursEnd)) {
        return res.status(400).json({ error: "Invalid end time format" });
      }

      const preferences = await prisma.notificationPreferences.upsert({
        where: { userId: req.userId },
        update: {
          quietHoursEnabled,
          quietHoursStart,
          quietHoursEnd,
        },
        create: {
          userId: req.userId,
        },
      });

      res.json(preferences);
    } catch (error: any) {
      console.error("Error updating quiet hours:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * PUT /api/preferences/email-digest
 * Update email digest settings
 */
router.put(
  "/email-digest",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      const { emailDigestEnabled, emailDigestFrequency } = req.body;

      // Validate frequency
      const validFrequencies = ["hourly", "daily", "weekly"];
      if (
        emailDigestFrequency &&
        !validFrequencies.includes(emailDigestFrequency)
      ) {
        return res.status(400).json({ error: "Invalid frequency" });
      }

      const preferences = await prisma.notificationPreferences.upsert({
        where: { userId: req.userId },
        update: {
          emailDigestEnabled,
          emailDigestFrequency,
        },
        create: {
          userId: req.userId,
        },
      });

      res.json(preferences);
    } catch (error: any) {
      console.error("Error updating email digest settings:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
