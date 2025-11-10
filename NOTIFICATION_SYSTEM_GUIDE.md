# Real-Time Notification System for Providers

## Overview

TheSmartPro.io now includes a comprehensive real-time notification system that enables providers to receive instant alerts about new client messages, booking updates, payment notifications, and platform announcements. The system is built on WebSocket technology with automatic reconnection, persistent storage, and customizable preferences.

## Architecture

### System Components

The notification system consists of several key components:

**Type Definitions** (`client/src/types/notifications.ts`):
- Notification interface with id, type, priority, title, message, timestamp, and read status
- NotificationPreferences interface for user settings
- NotificationType enum with 14 notification categories
- NotificationPriority enum (critical, high, normal, low)
- NotificationChannel enum (in-app, email, browser push, SMS)
- WebSocketEventType enum for real-time events

**WebSocket Client** (`client/src/lib/websocketClient.ts`):
- WebSocketClient class with automatic reconnection logic
- Exponential backoff strategy (1s to 30s delays)
- Heartbeat mechanism for connection health monitoring
- Message queuing for offline scenarios
- Event subscription system

**Notification Context** (`client/src/contexts/ProviderNotificationContext.tsx`):
- ProviderNotificationProvider wrapper component
- Global state management for notifications
- Automatic WebSocket connection initialization
- Notification CRUD operations (add, read, archive, delete)
- Preference management
- Sound and desktop notification support

**UI Components**:
- `NotificationBell.tsx`: Bell icon with unread badge and connection status
- `ProviderNotificationCenter.tsx`: Dropdown panel with notification list and filters
- `NotificationPreferences.tsx`: Settings panel for customization
- `ProviderDashboard.tsx`: Main dashboard with notification integration

**Custom Hooks** (`client/src/hooks/useProviderNotifications.ts`):
- `useProviderNotifications()`: Access notification context and functions

## Notification Types

The system supports 14 notification types:

| Type | Description | Priority |
|------|-------------|----------|
| NEW_MESSAGE | New message from client | High |
| BOOKING_REQUEST | New booking request | High |
| BOOKING_CONFIRMED | Booking confirmed | Normal |
| BOOKING_CANCELLED | Booking cancelled | High |
| PAYMENT_RECEIVED | Payment received | High |
| PAYMENT_PENDING | Payment pending | Normal |
| PROFILE_VERIFIED | Profile verification complete | Normal |
| PROFILE_REVIEW | Profile under review | Normal |
| PLATFORM_UPDATE | Platform feature update | Low |
| SECURITY_ALERT | Security-related alert | Critical |
| CONTRACT_SIGNED | Contract signed | High |
| REVIEW_RECEIVED | New review received | Normal |
| PROMOTION | Special promotion | Low |
| SYSTEM_ALERT | System maintenance alert | Critical |

## Usage

### Basic Setup

Wrap your application with the ProviderNotificationProvider:

```tsx
import { ProviderNotificationProvider } from "@/contexts/ProviderNotificationContext";

function App() {
  return (
    <ProviderNotificationProvider userId="provider-123" wsUrl="ws://your-server.com">
      <YourApp />
    </ProviderNotificationProvider>
  );
}
```

### Using Notifications in Components

```tsx
import { useProviderNotifications } from "@/hooks/useProviderNotifications";
import { NotificationType, NotificationPriority } from "@/types/notifications";

function MyComponent() {
  const notifications = useProviderNotifications();

  const handleAddNotification = () => {
    notifications.addNotification({
      userId: "provider-123",
      type: NotificationType.NEW_MESSAGE,
      priority: NotificationPriority.HIGH,
      title: "New Message",
      message: "You have a new message from a client",
      icon: "📧",
      actionUrl: "/messages",
      actionLabel: "View Message",
    });
  };

  const handleMarkAsRead = (notificationId: string) => {
    notifications.markAsRead(notificationId);
  };

  const handleArchive = (notificationId: string) => {
    notifications.archiveNotification(notificationId);
  };

  return (
    <div>
      <button onClick={handleAddNotification}>Add Notification</button>
      <p>Unread: {notifications.state.unreadCount}</p>
      <p>Connection: {notifications.state.connectionStatus}</p>
    </div>
  );
}
```

### Accessing Notification State

```tsx
const notifications = useProviderNotifications();

// Get all notifications
console.log(notifications.state.notifications);

// Get unread count
console.log(notifications.state.unreadCount);

// Get connection status
console.log(notifications.state.connectionStatus); // 'connected', 'connecting', 'disconnected', 'error'

// Get current preferences
console.log(notifications.state.preferences);
```

### Filtering Notifications

```tsx
const notifications = useProviderNotifications();

// Get filtered notifications
const unreadMessages = notifications.getFilteredNotifications({
  type: NotificationType.NEW_MESSAGE,
  read: false,
});

const recentNotifications = notifications.getFilteredNotifications({
  startDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
});

const searchResults = notifications.getFilteredNotifications({
  searchText: "booking",
});
```

### Managing Preferences

```tsx
const notifications = useProviderNotifications();

// Update notification preferences
notifications.updatePreferences({
  channels: {
    inApp: true,
    email: true,
    browserPush: false,
    sms: false,
  },
  frequency: "immediate", // or "hourly", "daily_digest"
  soundEnabled: true,
  soundVolume: 80,
  quietHours: {
    enabled: true,
    startTime: "22:00",
    endTime: "08:00",
  },
});
```

## WebSocket Integration

### Server-Side Requirements

Your backend WebSocket server should:

1. **Accept WebSocket connections** with optional token authentication
2. **Handle these event types**:
   - `NOTIFICATION`: Send notification to client
   - `NOTIFICATION_READ`: Mark notification as read
   - `NOTIFICATION_ARCHIVED`: Archive notification
   - `PREFERENCES_UPDATED`: Update user preferences
   - `HEARTBEAT`: Respond to keep-alive ping

3. **Example server implementation** (Node.js):

```javascript
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', (ws, req) => {
  const token = new URL(`http://localhost${req.url}`).searchParams.get('token');
  const userId = validateToken(token); // Your auth logic

  console.log(`Provider ${userId} connected`);

  ws.on('message', (data) => {
    const message = JSON.parse(data);

    if (message.type === 'HEARTBEAT') {
      ws.send(JSON.stringify({
        type: 'HEARTBEAT',
        data: { timestamp: new Date().toISOString() },
        timestamp: new Date(),
      }));
    } else if (message.type === 'NOTIFICATION_READ') {
      // Update database
      updateNotificationStatus(userId, message.data.notificationId, 'read');
    }
  });

  ws.on('close', () => {
    console.log(`Provider ${userId} disconnected`);
  });
});

// Send notification to provider
function sendNotificationToProvider(userId, notification) {
  const client = findClientByUserId(userId);
  if (client && client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify({
      type: 'NOTIFICATION',
      data: notification,
      timestamp: new Date(),
    }));
  }
}
```

## Features

### 1. Real-Time Delivery
- WebSocket-based instant delivery
- No polling or delays
- Automatic reconnection with exponential backoff

### 2. Persistent Storage
- Notifications stored in component state
- Optional localStorage persistence (can be added)
- Notification archival system

### 3. Customizable Preferences
- **Notification Channels**: In-app, email, browser push, SMS
- **Notification Types**: Toggle each type individually
- **Quiet Hours**: Set time ranges to suppress notifications
- **Frequency**: Immediate, hourly digest, or daily digest
- **Sound**: Enable/disable with volume control
- **Desktop Notifications**: Browser push notifications

### 4. Connection Management
- Automatic reconnection with exponential backoff
- Connection status indicator
- Heartbeat mechanism for health monitoring
- Message queuing for offline scenarios

### 5. User Interface
- **Notification Bell**: Shows unread count and connection status
- **Notification Center**: Dropdown with filtering and actions
- **Dashboard**: Overview of recent notifications
- **Preferences Panel**: Customize all settings

### 6. Notification Actions
- Mark as read
- Archive notifications
- Delete notifications
- Mark all as read
- Filter by type, priority, read status
- Search by text

## Provider Dashboard

Access the provider dashboard at `/provider-dashboard`:

**Features:**
- Overview tab with key metrics (unread messages, bookings, earnings, rating)
- Notifications tab with full history and filtering
- Preferences tab for customizing notification settings
- Recent notifications widget
- Quick action buttons

## Connection Status Indicator

The notification bell shows connection status:

- **Green dot**: Connected and receiving notifications
- **Yellow dot**: Connecting or attempting to reconnect
- **Gray dot**: Disconnected or error state

## Sound Notifications

When enabled, notifications play a 500ms sine wave tone at the configured volume. The sound can be customized by modifying the `playNotificationSound()` function in `ProviderNotificationContext.tsx`.

## Desktop Notifications

Browser push notifications require user permission. The system automatically requests permission when enabled in preferences. Notifications display the title, message, and icon.

## Error Handling

The system includes comprehensive error handling:

- **Connection failures**: Automatic reconnection with exponential backoff
- **Message parsing errors**: Logged to console, connection continues
- **Audio context errors**: Gracefully degraded, notifications still work
- **WebSocket errors**: Captured and state updated

## Performance Considerations

1. **Notification Limit**: Store up to 1000 notifications in memory
2. **Filtering**: Optimized with early returns
3. **Re-renders**: Minimal with useCallback hooks
4. **Memory**: Notifications can be archived/deleted to free memory

## Security

1. **Authentication**: WebSocket connections use token-based auth
2. **Message Validation**: All messages validated before processing
3. **CORS**: Configure WebSocket CORS headers on server
4. **SSL/TLS**: Use wss:// for production

## Testing

### Manual Testing

1. Open provider dashboard at `/provider-dashboard`
2. Check notification bell shows connection status
3. Test notification preferences
4. Simulate notifications from backend
5. Test reconnection by disconnecting network

### Automated Testing

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import { ProviderNotificationProvider } from '@/contexts/ProviderNotificationContext';
import NotificationBell from '@/components/NotificationBell';

describe('Notification System', () => {
  it('should display unread count', () => {
    render(
      <ProviderNotificationProvider>
        <NotificationBell />
      </ProviderNotificationProvider>
    );
    
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should update unread count when notification added', async () => {
    const { rerender } = render(
      <ProviderNotificationProvider>
        <NotificationBell />
      </ProviderNotificationProvider>
    );

    // Add notification via context
    // Verify count updated
  });
});
```

## Troubleshooting

### Notifications Not Appearing

1. Check WebSocket connection status (green dot)
2. Verify notification type is enabled in preferences
3. Check browser console for errors
4. Verify server is sending notifications correctly

### Connection Issues

1. Check network connectivity
2. Verify WebSocket URL is correct
3. Check browser console for connection errors
4. Verify server is running and accessible

### Sound Not Playing

1. Check browser audio permissions
2. Verify sound is enabled in preferences
3. Check volume level in preferences
4. Try different browser (some browsers block audio)

## Future Enhancements

1. **Notification Persistence**: Save to localStorage/IndexedDB
2. **Notification History**: Archive and search old notifications
3. **Email Digests**: Send email summaries of notifications
4. **SMS Integration**: Send critical notifications via SMS
5. **Mobile Push**: Native mobile app push notifications
6. **Analytics**: Track notification engagement metrics
7. **A/B Testing**: Test different notification strategies
8. **Notification Templates**: Pre-built templates for common scenarios

## API Reference

### ProviderNotificationContext

```tsx
interface ProviderNotificationContextType {
  state: NotificationState;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read" | "archived">) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  archiveNotification: (notificationId: string) => void;
  deleteNotification: (notificationId: string) => void;
  clearAllNotifications: () => void;
  updatePreferences: (preferences: Partial<NotificationPreferences>) => void;
  getFilteredNotifications: (filter: NotificationFilter) => Notification[];
  reconnectWebSocket: () => void;
}
```

### NotificationState

```tsx
interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  preferences: NotificationPreferences | null;
  isLoading: boolean;
  error: string | null;
  connectionStatus: "connecting" | "connected" | "disconnected" | "error";
}
```

## Support

For issues or questions about the notification system:

1. Check this documentation
2. Review the code comments in source files
3. Check browser console for error messages
4. Verify WebSocket server configuration
5. Contact support team

---

**Last Updated**: November 2025
**Version**: 1.0.0
