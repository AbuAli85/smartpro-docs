/**
 * Notification Service
 * Handles notification creation, delivery, and management
 */

// Initialize Prisma client
let prisma: any;
try {
  const { PrismaClient: PC } = require("@prisma/client");
  prisma = new PC();
} catch (error) {
  console.warn("Prisma client not available");
}

export interface CreateNotificationInput {
  userId: string;
  type: string;
  priority?: string;
  title: string;
  message: string;
  description?: string;
  icon?: string;
  actionUrl?: string;
  actionLabel?: string;
  relatedId?: string;
  data?: Record<string, any>;
}

export interface NotificationWebSocketServer {
  sendNotificationToProvider(
    userId: string,
    notification: any
  ): Promise<boolean> | boolean;
}

export class NotificationService {
  private wsServer: NotificationWebSocketServer | null = null;

  constructor(wsServer?: NotificationWebSocketServer | null) {
    this.wsServer = wsServer || null;
  }

  /**
   * Create and send a notification to a provider
   */
  async createAndSendNotification(
    input: CreateNotificationInput
  ): Promise<any> {
    try {
      // Create notification in database
      const notification = await prisma.notification.create({
        data: {
          userId: input.userId,
          type: input.type,
          priority: input.priority || "normal",
          title: input.title,
          message: input.message,
          description: input.description,
          icon: input.icon,
          actionUrl: input.actionUrl,
          actionLabel: input.actionLabel,
          relatedId: input.relatedId,
          data: input.data,
          deliveryStatus: "pending",
        },
      });

      // Track analytics event
      await this.trackAnalyticsEvent(notification.id, input.userId, "sent");

      // Send via WebSocket if server is available
      if (this.wsServer) {
        const sent = await this.wsServer.sendNotificationToProvider(
          input.userId,
          notification
        );

        if (sent) {
          console.log(`Notification ${notification.id} sent to ${input.userId}`);
        } else {
          console.log(
            `Notification ${notification.id} queued for ${input.userId}`
          );
        }
      } else {
        console.warn("WebSocket server not available, notification queued");
        // Queue for later delivery
        await this.queueNotification(notification.id, input.userId);
      }

      return notification;
    } catch (error) {
      console.error("Error creating notification:", error);
      throw error;
    }
  }

  /**
   * Create and broadcast notification to all providers
   */
  async createAndBroadcastNotification(
    input: Omit<CreateNotificationInput, "userId">
  ): Promise<number> {
    try {
      // Get all providers
      const providers = await prisma.user.findMany({
        where: { role: "provider" },
        select: { id: true },
      });

      let count = 0;

      // Create notification for each provider
      for (const provider of providers) {
        try {
          await this.createAndSendNotification({
            ...input,
            userId: provider.id,
          });
          count++;
        } catch (error) {
          console.error(
            `Failed to send notification to provider ${provider.id}:`,
            error
          );
        }
      }

      console.log(`Broadcast notification to ${count} providers`);
      return count;
    } catch (error) {
      console.error("Error broadcasting notification:", error);
      throw error;
    }
  }

  /**
   * Get notifications for a provider
   */
  async getNotifications(
    userId: string,
    options?: {
      limit?: number;
      offset?: number;
      read?: boolean;
      archived?: boolean;
      type?: string;
    }
  ) {
    try {
      const where: any = { userId };

      if (options?.read !== undefined) {
        where.read = options.read;
      }

      if (options?.archived !== undefined) {
        where.archived = options.archived;
      }

      if (options?.type) {
        where.type = options.type;
      }

      const notifications = await prisma.notification.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: options?.limit || 50,
        skip: options?.offset || 0,
      });

      const total = await prisma.notification.count({ where });

      return {
        notifications,
        total,
        limit: options?.limit || 50,
        offset: options?.offset || 0,
      };
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string, userId: string) {
    try {
      const notification = await prisma.notification.update({
        where: { id: notificationId },
        data: {
          read: true,
          readAt: new Date(),
        },
      });

      // Track analytics event
      await this.trackAnalyticsEvent(notificationId, userId, "opened");

      return notification;
    } catch (error) {
      console.error("Error marking notification as read:", error);
      throw error;
    }
  }

  /**
   * Archive notification
   */
  async archiveNotification(notificationId: string, userId: string) {
    try {
      const notification = await prisma.notification.update({
        where: { id: notificationId },
        data: { archived: true },
      });

      // Track analytics event
      await this.trackAnalyticsEvent(notificationId, userId, "archived");

      return notification;
    } catch (error) {
      console.error("Error archiving notification:", error);
      throw error;
    }
  }

  /**
   * Delete notification
   */
  async deleteNotification(notificationId: string, userId: string) {
    try {
      // Track analytics event before deletion
      await this.trackAnalyticsEvent(notificationId, userId, "deleted");

      const notification = await prisma.notification.delete({
        where: { id: notificationId },
      });

      return notification;
    } catch (error) {
      console.error("Error deleting notification:", error);
      throw error;
    }
  }

  /**
   * Get notification statistics
   */
  async getNotificationStats(userId: string) {
    try {
      const total = await prisma.notification.count({
        where: { userId },
      });

      const unread = await prisma.notification.count({
        where: { userId, read: false, archived: false },
      });

      const archived = await prisma.notification.count({
        where: { userId, archived: true },
      });

      const byType = await prisma.notification.groupBy({
        by: ["type"],
        where: { userId },
        _count: true,
      });

      return {
        total,
        unread,
        archived,
        byType: byType.map((item: any) => ({
          type: item.type,
          count: item._count,
        })),
      };
    } catch (error) {
      console.error("Error fetching notification stats:", error);
      throw error;
    }
  }

  /**
   * Queue notification for offline provider
   */
  private async queueNotification(notificationId: string, userId: string) {
    try {
      await prisma.notificationQueue.create({
        data: {
          notificationId,
          userId,
          nextRetryAt: new Date(Date.now() + 60000), // Retry in 1 minute
        },
      });
    } catch (error) {
      console.error("Error queuing notification:", error);
    }
  }

  /**
   * Process queued notifications
   */
  async processQueuedNotifications() {
    try {
      const queuedItems = await prisma.notificationQueue.findMany({
        where: {
          nextRetryAt: {
            lte: new Date(),
          },
        },
        include: {
          notification: true,
        },
      });

      console.log(`Processing ${queuedItems.length} queued notifications`);

      for (const item of queuedItems) {
        try {
          if (this.wsServer) {
            const sent = await this.wsServer.sendNotificationToProvider(
              item.userId,
              item.notification
            );

            if (sent) {
              // Remove from queue
              await prisma.notificationQueue.delete({
                where: { id: item.id },
              });
            } else {
              // Increment retry count and update next retry time
              const nextRetry = Math.min(
                item.retryCount + 1,
                item.maxRetries
              );
              const backoffMs = Math.pow(2, nextRetry) * 60000; // Exponential backoff

              await prisma.notificationQueue.update({
                where: { id: item.id },
                data: {
                  retryCount: nextRetry,
                  nextRetryAt: new Date(Date.now() + backoffMs),
                  lastError:
                    nextRetry >= item.maxRetries
                      ? "Max retries exceeded"
                      : undefined,
                },
              });
            }
          }
        } catch (error) {
          console.error(
            `Error processing queued notification ${item.id}:`,
            error
          );
        }
      }
    } catch (error) {
      console.error("Error processing queued notifications:", error);
    }
  }

  /**
   * Track analytics event
   */
  private async trackAnalyticsEvent(
    notificationId: string,
    userId: string,
    eventType: string
  ) {
    try {
      await prisma.analyticsEvent.create({
        data: {
          notificationId,
          userId,
          eventType,
          metadata: {
            timestamp: new Date().toISOString(),
          },
        },
      });
    } catch (error) {
      console.error("Error tracking analytics event:", error);
    }
  }

  /**
   * Get analytics for a notification
   */
  async getNotificationAnalytics(notificationId: string) {
    try {
      const events = await prisma.analyticsEvent.findMany({
        where: { notificationId },
        orderBy: { timestamp: "asc" },
      });

      const stats = {
        sent: events.filter(((e: any) => (e as any)?.eventType === "sent") as any).length,
        delivered: events.filter(((e: any) => (e as any)?.eventType === "delivered") as any).length,
        opened: events.filter(((e: any) => (e as any)?.eventType === "opened") as any).length,
        clicked: events.filter(((e: any) => (e as any)?.eventType === "clicked") as any).length,
        archived: events.filter(((e: any) => (e as any)?.eventType === "archived") as any).length,
        deleted: events.filter(((e: any) => (e as any)?.eventType === "deleted") as any).length,
      };

      return {
        events,
        stats,
      };
    } catch (error) {
      console.error("Error fetching notification analytics:", error);
      throw error;
    }
  }

  /**
   * Get provider analytics dashboard data
   */
  async getProviderAnalyticsDashboard(userId: string, days: number = 7) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      // Get notifications sent in period
      const notificationsSent = await prisma.notification.findMany({
        where: {
          userId,
          createdAt: {
            gte: startDate,
          },
        },
      });

      // Get analytics events
      const analyticsEvents = await prisma.analyticsEvent.findMany({
        where: {
          userId,
          timestamp: {
            gte: startDate,
          },
        },
      });

      // Calculate metrics
      const totalSent = notificationsSent.length;
      const delivered = analyticsEvents.filter(
        (e: any) => e.eventType === "delivered"
      ).length;
      const opened = analyticsEvents.filter(
        (e: any) => e.eventType === "opened"
      ).length;
      const clicked = analyticsEvents.filter(
        (e: any) => e.eventType === "clicked"
      ).length;

      const deliveryRate = totalSent > 0 ? (delivered / totalSent) * 100 : 0;
      const openRate = totalSent > 0 ? (opened / totalSent) * 100 : 0;
      const clickRate = totalSent > 0 ? (clicked / totalSent) * 100 : 0;

      // Group by notification type
      const byType = await prisma.notification.groupBy({
        by: ["type"],
        where: {
          userId,
          createdAt: {
            gte: startDate,
          },
        },
        _count: true,
      });

      // Group events by day
      const eventsByDay: Record<string, any> = {};
      analyticsEvents.forEach((event: any) => {
        const day = event.timestamp.toISOString().split("T")[0];
        if (!eventsByDay[day]) {
          eventsByDay[day] = {};
        }
        eventsByDay[day][event.eventType] =
          (eventsByDay[day][event.eventType] || 0) + 1;
      });

      return {
        period: { startDate, endDate: new Date(), days },
        metrics: {
          totalSent,
          delivered,
          opened,
          clicked,
          deliveryRate: Math.round(deliveryRate * 100) / 100,
          openRate: Math.round(openRate * 100) / 100,
          clickRate: Math.round(clickRate * 100) / 100,
        },
        byType: byType.map((item: any) => ({
          type: item.type,
          count: item._count,
        })),
        eventsByDay,
      };
    } catch (error) {
      console.error("Error fetching provider analytics dashboard:", error);
      throw error;
    }
  }
}

export default NotificationService;
