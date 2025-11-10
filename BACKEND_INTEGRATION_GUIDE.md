# Backend Integration Guide: WebSocket Server, Email Digest & Analytics

This guide provides comprehensive documentation for integrating the three backend systems into your SmartPro application.

## Overview

The backend consists of three integrated systems:

1. **WebSocket Server** - Real-time notification delivery with connection management
2. **Email Digest Service** - Scheduled email summaries with customizable frequency
3. **Analytics Service** - Engagement tracking and metrics collection

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                          │
│  - AnalyticsDashboard Component                              │
│  - NotificationBell & ProviderNotificationCenter             │
│  - WebSocket Client with auto-reconnect                      │
└────────────────────┬────────────────────────────────────────┘
                     │ WebSocket (ws://)
                     │ REST API (http://)
┌────────────────────▼────────────────────────────────────────┐
│                  Backend Services                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ WebSocket Server (server/websocket.ts)               │   │
│  │ - JWT Authentication                                 │   │
│  │ - Connection Management                              │   │
│  │ - Message Routing                                    │   │
│  │ - Heartbeat Mechanism                                │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Notification Service (server/services/notificationService.ts) │
│  │ - Create & Send Notifications                        │   │
│  │ - Broadcast to Multiple Providers                    │   │
│  │ - Queue Management for Offline Users                 │   │
│  │ - Notification Preferences                           │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Email Digest Service (server/services/emailDigestService.ts) │
│  │ - Scheduled Job Execution (cron)                     │   │
│  │ - HTML Email Template Generation                     │   │
│  │ - Nodemailer Integration                             │   │
│  │ - Digest History Tracking                            │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Analytics Service (server/services/analyticsService.ts) │
│  │ - Event Tracking                                     │   │
│  │ - Metrics Calculation                                │   │
│  │ - Engagement Analysis                                │   │
│  │ - Data Export                                        │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────────┘
                     │ Prisma ORM
┌────────────────────▼────────────────────────────────────────┐
│                   Database (PostgreSQL)                      │
│  - Notifications                                             │
│  - NotificationPreferences                                   │
│  - WebSocketSessions                                         │
│  - AnalyticsEvents                                           │
│  - EmailDigests                                              │
│  - NotificationQueue                                         │
│  - NotificationTemplates                                     │
└─────────────────────────────────────────────────────────────┘
```

## Database Schema

### Core Tables

#### Notifications
Stores all notifications sent to providers.

```typescript
model Notification {
  id                String
  userId            String          // Provider ID
  type              String          // new_message, booking_request, etc.
  priority          String          // critical, high, normal, low
  title             String
  message           String
  description       String?
  icon              String?
  actionUrl         String?
  actionLabel       String?
  read              Boolean
  archived          Boolean
  deliveryStatus    String          // pending, sent, delivered, failed
  sentAt            DateTime?
  deliveredAt       DateTime?
  readAt            DateTime?
  relatedId         String?         // Reference to related entity
  data              Json?           // Additional metadata
  createdAt         DateTime
  updatedAt         DateTime
}
```

#### NotificationPreferences
User-specific notification settings.

```typescript
model NotificationPreferences {
  id                        String
  userId                    String
  
  // Channels
  inAppEnabled              Boolean
  emailEnabled              Boolean
  browserPushEnabled        Boolean
  smsEnabled                Boolean
  
  // Notification Types
  newMessageEnabled         Boolean
  bookingRequestEnabled     Boolean
  bookingConfirmedEnabled   Boolean
  paymentReceivedEnabled    Boolean
  platformUpdateEnabled     Boolean
  securityAlertEnabled      Boolean
  
  // Quiet Hours
  quietHoursEnabled         Boolean
  quietHoursStart           String    // HH:mm format
  quietHoursEnd             String
  
  // Frequency
  frequency                 String    // immediate, hourly, daily_digest
  
  // Sound & Desktop
  soundEnabled              Boolean
  soundVolume               Int
  desktopNotifications      Boolean
  
  // Email Digest
  emailDigestEnabled        Boolean
  emailDigestFrequency      String    // hourly, daily, weekly
  
  createdAt                 DateTime
  updatedAt                 DateTime
}
```

#### AnalyticsEvents
Tracks all notification engagement events.

```typescript
model AnalyticsEvent {
  id                String
  notificationId    String
  userId            String
  eventType         String          // sent, delivered, opened, clicked, archived, deleted
  timestamp         DateTime
  metadata          Json?           // Device, browser, location, etc.
}
```

#### EmailDigest
Tracks scheduled email digest delivery.

```typescript
model EmailDigest {
  id                String
  userId            String
  frequency         String          // hourly, daily, weekly
  status            String          // pending, sent, failed
  sentAt            DateTime?
  scheduledFor      DateTime
  emailAddress      String
  subject           String?
  htmlContent       String?
  createdAt         DateTime
  updatedAt         DateTime
}
```

## Setup Instructions

### 1. Database Migration

Run the Prisma migration to create all necessary tables:

```bash
pnpm db:push
```

This will:
- Create all tables defined in `server/schema.prisma`
- Set up indexes for performance
- Configure foreign key relationships

### 2. Environment Variables

Add the following to your `.env` file:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/smartpro"

# JWT
JWT_SECRET="your-secret-key-here"

# Email Service (Nodemailer)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
EMAIL_FROM="noreply@smartpro.io"

# WebSocket
WEBSOCKET_URL="ws://localhost:3001"
WEBSOCKET_PORT="3001"
```

### 3. Initialize Services

In your main server file (e.g., `server/index.ts`):

```typescript
import { NotificationWebSocketServer } from "./websocket";
import NotificationService from "./services/notificationService";
import EmailDigestService from "./services/emailDigestService";
import AnalyticsService from "./services/analyticsService";
import express from "express";
import { createServer } from "http";

const app = express();
const server = createServer(app);

// Initialize WebSocket server
const wsServer = new NotificationWebSocketServer(server);

// Initialize services
const notificationService = new NotificationService(wsServer);
const emailDigestService = new EmailDigestService({
  host: process.env.EMAIL_HOST!,
  port: parseInt(process.env.EMAIL_PORT!),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
  from: process.env.EMAIL_FROM!,
});
const analyticsService = new AnalyticsService();

// Initialize scheduled email digest jobs
await emailDigestService.initializeScheduledJobs();

// Start server
server.listen(process.env.WEBSOCKET_PORT || 3001, () => {
  console.log("WebSocket server running on port", process.env.WEBSOCKET_PORT);
});
```

## API Usage Examples

### Creating a Notification

```typescript
const notification = await notificationService.createAndSendNotification({
  userId: "provider-123",
  type: "new_message",
  priority: "high",
  title: "New message from Sarah Johnson",
  message: "Sarah has sent you a message about the booking",
  description: "Click to view the conversation",
  icon: "💬",
  actionUrl: "/messages/msg-456",
  actionLabel: "View Message",
  relatedId: "msg-456",
  data: {
    senderId: "client-789",
    conversationId: "conv-456",
  },
});
```

### Broadcasting Notification

```typescript
const count = await notificationService.createAndBroadcastNotification({
  type: "platform_update",
  priority: "normal",
  title: "New feature: Advanced Analytics",
  message: "Check out our new analytics dashboard",
  actionUrl: "/analytics",
  actionLabel: "Explore",
});

console.log(`Notification sent to ${count} providers`);
```

### Getting User Notifications

```typescript
const result = await notificationService.getNotifications("provider-123", {
  limit: 20,
  offset: 0,
  read: false,
  archived: false,
});

console.log(`Total: ${result.total}, Showing: ${result.notifications.length}`);
```

### Tracking Analytics

```typescript
await analyticsService.trackEvent(
  "notif-123",
  "provider-123",
  "opened",
  {
    device: "mobile",
    browser: "Chrome",
    timestamp: new Date().toISOString(),
  }
);
```

### Getting Metrics

```typescript
// Single notification metrics
const metrics = await analyticsService.getNotificationMetrics("notif-123");
console.log(`Open Rate: ${metrics.openRate}%`);

// User metrics for last 7 days
const userMetrics = await analyticsService.getUserMetrics("provider-123", 7);
console.log(`Delivery Rate: ${userMetrics.deliveryRate}%`);

// Metrics by type
const byType = await analyticsService.getMetricsByType("provider-123", 30);
console.log(byType);
```

### Sending Test Email Digest

```typescript
await emailDigestService.sendTestDigest("provider-123", "daily");
console.log("Test digest sent");
```

## Frontend Integration

### WebSocket Connection

The frontend already has WebSocket client support. To connect:

```typescript
import { useProviderNotifications } from "@/hooks/useProviderNotifications";

function MyComponent() {
  const { notifications, unreadCount, addNotification } = useProviderNotifications();

  // Notifications are automatically received via WebSocket
  // and displayed in real-time
}
```

### Analytics Dashboard

Access the analytics dashboard at `/analytics`:

```
https://yourapp.com/analytics
```

Features:
- Real-time metrics display
- Engagement trends over time
- Performance by notification type
- Top performing notifications
- Daily/weekly/monthly views
- Export analytics data

## Notification Types

The system supports the following notification types:

| Type | Description | Priority | Use Case |
|------|-------------|----------|----------|
| `new_message` | New message from client | High | Direct communication |
| `booking_request` | New booking request | High | Business critical |
| `booking_confirmed` | Booking confirmed | Normal | Confirmation |
| `payment_received` | Payment received | High | Financial |
| `platform_update` | Platform announcement | Low | Informational |
| `security_alert` | Security notification | Critical | Security |

## Email Digest Frequency

The system supports three digest frequencies:

- **Hourly**: Sent at the top of every hour (`:00`)
- **Daily**: Sent at 8:00 AM daily
- **Weekly**: Sent every Monday at 9:00 AM

Users can customize their digest frequency in notification preferences.

## Monitoring & Debugging

### Check WebSocket Connections

```typescript
const connectedCount = wsServer.getConnectedClientsCount();
const providers = wsServer.getConnectedProviders();
console.log(`Connected: ${connectedCount} clients from ${providers.length} providers`);
```

### View Queued Notifications

```typescript
const queued = await prisma.notificationQueue.findMany({
  where: {
    nextRetryAt: {
      lte: new Date(),
    },
  },
});
console.log(`${queued.length} notifications pending retry`);
```

### Check Email Digest Status

```typescript
const stats = await emailDigestService.getDigestStats("provider-123");
console.log(`Sent: ${stats.totalSent}, Failed: ${stats.totalFailed}`);
```

## Performance Optimization

### Database Indexes

The schema includes indexes on:
- `Notification.userId` - For quick user lookups
- `Notification.type` - For type-based filtering
- `Notification.createdAt` - For time-based queries
- `AnalyticsEvent.notificationId` - For event lookups
- `AnalyticsEvent.userId` - For user analytics
- `AnalyticsEvent.eventType` - For event filtering
- `AnalyticsEvent.timestamp` - For time-range queries

### Connection Pooling

Configure Prisma connection pooling in `.env`:

```env
DATABASE_URL="postgresql://user:pass@host:5432/db?schema=public&connection_limit=20"
```

### Caching

Consider implementing Redis caching for:
- User preferences (1 hour TTL)
- Notification metrics (5 minute TTL)
- Top notifications (1 hour TTL)

## Security Considerations

1. **JWT Authentication**: All WebSocket connections require valid JWT tokens
2. **Rate Limiting**: Implement rate limiting on notification creation endpoints
3. **Data Validation**: All inputs are validated before database operations
4. **HTTPS/WSS**: Use secure WebSocket (WSS) in production
5. **CORS**: Configure CORS properly for cross-origin requests

## Troubleshooting

### WebSocket Connection Issues

**Problem**: Clients can't connect to WebSocket
- Check JWT token validity
- Verify WebSocket URL and port
- Check firewall/proxy settings
- Review server logs for authentication errors

### Email Digest Not Sending

**Problem**: Email digests not being delivered
- Verify email service credentials
- Check cron job logs
- Ensure database has notifications to digest
- Verify user email addresses are valid

### Analytics Not Recording

**Problem**: No analytics events being tracked
- Ensure `trackEvent` is called after notifications
- Check database connectivity
- Verify notification IDs are correct
- Review error logs for database errors

## Next Steps

1. **Implement API Endpoints**: Create REST endpoints for notification management
2. **Add Real-Time Sync**: Sync notification state between frontend and backend
3. **Setup Monitoring**: Integrate with monitoring/alerting system
4. **Performance Testing**: Load test with multiple concurrent connections
5. **Backup Strategy**: Implement database backup and recovery procedures

## Support & Resources

- Prisma Documentation: https://www.prisma.io/docs/
- WebSocket (ws) Library: https://github.com/websockets/ws
- Nodemailer: https://nodemailer.com/
- Node-cron: https://github.com/kelektiv/node-cron

---

**Last Updated**: November 2025
**Version**: 1.0.0
