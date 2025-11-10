# SmartPro API Documentation

Complete REST API reference for the SmartPro notification system, authentication, and analytics.

## Base URL

```
https://api.smartpro.io/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer {access_token}
```

### Getting a Token

**POST** `/auth/login`

```json
{
  "email": "provider@example.com",
  "password": "securepassword123"
}
```

Response:
```json
{
  "user": {
    "id": "user-123",
    "email": "provider@example.com",
    "name": "John Doe",
    "role": "provider"
  },
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## Authentication Endpoints

### Register New User

**POST** `/auth/register`

Create a new provider or client account.

**Request:**
```json
{
  "email": "newuser@example.com",
  "password": "securepassword123",
  "name": "Jane Smith",
  "role": "provider"
}
```

**Response:** `201 Created`
```json
{
  "user": {
    "id": "user-456",
    "email": "newuser@example.com",
    "name": "Jane Smith",
    "role": "provider"
  },
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Login

**POST** `/auth/login`

Authenticate user and get access token.

**Request:**
```json
{
  "email": "provider@example.com",
  "password": "securepassword123"
}
```

**Response:** `200 OK`
```json
{
  "user": { ... },
  "token": "...",
  "refreshToken": "..."
}
```

### Refresh Token

**POST** `/auth/refresh`

Get a new access token using refresh token.

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Get Current User

**GET** `/auth/me`

Get the authenticated user's profile.

**Response:** `200 OK`
```json
{
  "id": "user-123",
  "email": "provider@example.com",
  "name": "John Doe",
  "role": "provider",
  "createdAt": "2025-11-01T10:00:00Z",
  "updatedAt": "2025-11-08T10:00:00Z"
}
```

### Update Profile

**PUT** `/auth/profile`

Update user profile information.

**Request:**
```json
{
  "name": "John Smith",
  "email": "newemail@example.com"
}
```

**Response:** `200 OK`
```json
{
  "id": "user-123",
  "email": "newemail@example.com",
  "name": "John Smith",
  "role": "provider"
}
```

### Change Password

**POST** `/auth/change-password`

Change user password.

**Request:**
```json
{
  "oldPassword": "currentpassword123",
  "newPassword": "newpassword456"
}
```

**Response:** `200 OK`
```json
{
  "success": true
}
```

### Logout

**POST** `/auth/logout`

Logout user (client-side token removal).

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Notification Endpoints

### Create Notification

**POST** `/notifications`

Create and send a new notification.

**Request:**
```json
{
  "userId": "provider-123",
  "type": "new_message",
  "priority": "high",
  "title": "New message from Sarah",
  "message": "Sarah has sent you a message",
  "description": "Click to view the conversation",
  "icon": "💬",
  "actionUrl": "/messages/msg-456",
  "actionLabel": "View Message",
  "relatedId": "msg-456",
  "data": {
    "senderId": "client-789",
    "conversationId": "conv-456"
  }
}
```

**Response:** `201 Created`
```json
{
  "id": "notif-123",
  "userId": "provider-123",
  "type": "new_message",
  "priority": "high",
  "title": "New message from Sarah",
  "message": "Sarah has sent you a message",
  "read": false,
  "archived": false,
  "deliveryStatus": "sent",
  "createdAt": "2025-11-08T10:05:00Z"
}
```

### List Notifications

**GET** `/notifications?limit=50&offset=0&read=false&archived=false&type=new_message`

Get notifications for the authenticated user.

**Query Parameters:**
- `limit` (optional): Number of results (default: 50)
- `offset` (optional): Pagination offset (default: 0)
- `read` (optional): Filter by read status (true/false)
- `archived` (optional): Filter by archived status (true/false)
- `type` (optional): Filter by notification type

**Response:** `200 OK`
```json
{
  "notifications": [
    {
      "id": "notif-123",
      "userId": "provider-123",
      "type": "new_message",
      "priority": "high",
      "title": "New message from Sarah",
      "message": "Sarah has sent you a message",
      "read": false,
      "archived": false,
      "deliveryStatus": "delivered",
      "createdAt": "2025-11-08T10:05:00Z"
    }
  ],
  "total": 125
}
```

### Get Single Notification

**GET** `/notifications/:id`

Get a specific notification by ID.

**Response:** `200 OK`
```json
{
  "id": "notif-123",
  "userId": "provider-123",
  "type": "new_message",
  "priority": "high",
  "title": "New message from Sarah",
  "message": "Sarah has sent you a message",
  "read": false,
  "archived": false,
  "createdAt": "2025-11-08T10:05:00Z"
}
```

### Mark as Read

**POST** `/notifications/:id/read`

Mark a notification as read.

**Response:** `200 OK`
```json
{
  "id": "notif-123",
  "read": true,
  "readAt": "2025-11-08T10:10:00Z"
}
```

### Archive Notification

**POST** `/notifications/:id/archive`

Archive a notification.

**Response:** `200 OK`
```json
{
  "id": "notif-123",
  "archived": true
}
```

### Delete Notification

**DELETE** `/notifications/:id`

Delete a notification.

**Response:** `200 OK`
```json
{
  "success": true
}
```

### Get Notification Stats

**GET** `/notifications/stats`

Get notification statistics for the user.

**Response:** `200 OK`
```json
{
  "total": 250,
  "unread": 12,
  "archived": 45,
  "byType": {
    "new_message": 85,
    "booking_request": 60,
    "payment_received": 45,
    "platform_update": 60
  }
}
```

### Broadcast Notification (Admin Only)

**POST** `/notifications/broadcast`

Send a notification to all providers.

**Request:**
```json
{
  "type": "platform_update",
  "priority": "normal",
  "title": "New Feature Available",
  "message": "Check out our new analytics dashboard",
  "actionUrl": "/analytics",
  "actionLabel": "Explore"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 1250
}
```

---

## Preferences Endpoints

### Get Preferences

**GET** `/preferences`

Get notification preferences for the authenticated user.

**Response:** `200 OK`
```json
{
  "id": "pref-123",
  "userId": "user-123",
  "inAppEnabled": true,
  "emailEnabled": true,
  "browserPushEnabled": true,
  "smsEnabled": false,
  "newMessageEnabled": true,
  "bookingRequestEnabled": true,
  "paymentReceivedEnabled": true,
  "platformUpdateEnabled": true,
  "quietHoursEnabled": false,
  "quietHoursStart": "22:00",
  "quietHoursEnd": "08:00",
  "frequency": "immediate",
  "soundEnabled": true,
  "soundVolume": 70,
  "desktopNotifications": true,
  "emailDigestEnabled": true,
  "emailDigestFrequency": "daily"
}
```

### Update Preferences

**PUT** `/preferences`

Update notification preferences.

**Request:**
```json
{
  "inAppEnabled": true,
  "emailEnabled": false,
  "quietHoursEnabled": true,
  "quietHoursStart": "22:00",
  "quietHoursEnd": "08:00",
  "emailDigestFrequency": "weekly"
}
```

**Response:** `200 OK`
```json
{
  "id": "pref-123",
  "userId": "user-123",
  ...
}
```

### Update Channels

**PUT** `/preferences/channels`

Update notification channels.

**Request:**
```json
{
  "inAppEnabled": true,
  "emailEnabled": true,
  "browserPushEnabled": true,
  "smsEnabled": false
}
```

**Response:** `200 OK`
```json
{
  ...
}
```

### Update Notification Types

**PUT** `/preferences/types`

Update which notification types to receive.

**Request:**
```json
{
  "newMessageEnabled": true,
  "bookingRequestEnabled": true,
  "paymentReceivedEnabled": true,
  "platformUpdateEnabled": false
}
```

**Response:** `200 OK`
```json
{
  ...
}
```

### Update Quiet Hours

**PUT** `/preferences/quiet-hours`

Set quiet hours for notifications.

**Request:**
```json
{
  "quietHoursEnabled": true,
  "quietHoursStart": "22:00",
  "quietHoursEnd": "08:00"
}
```

**Response:** `200 OK`
```json
{
  ...
}
```

### Update Email Digest

**PUT** `/preferences/email-digest`

Configure email digest settings.

**Request:**
```json
{
  "emailDigestEnabled": true,
  "emailDigestFrequency": "daily"
}
```

**Response:** `200 OK`
```json
{
  ...
}
```

### Reset to Defaults

**POST** `/preferences/reset`

Reset all preferences to default values.

**Response:** `200 OK`
```json
{
  ...
}
```

---

## Analytics Endpoints

### Get Dashboard Data

**GET** `/analytics/dashboard?days=7`

Get analytics dashboard data.

**Query Parameters:**
- `days` (optional): Number of days to analyze (default: 7)

**Response:** `200 OK`
```json
{
  "metrics": {
    "totalSent": 1250,
    "delivered": 1198,
    "opened": 856,
    "clicked": 342,
    "deliveryRate": 95.84,
    "openRate": 68.48,
    "clickRate": 27.36
  },
  "byType": {
    "new_message": {
      "count": 450,
      "openRate": 72.5,
      "clickRate": 31.2
    },
    ...
  },
  "topNotifications": [...]
}
```

### Get Metrics

**GET** `/analytics/metrics?days=30`

Get detailed metrics for the user.

**Response:** `200 OK`
```json
{
  "totalSent": 3500,
  "delivered": 3350,
  "opened": 2200,
  "clicked": 850,
  "deliveryRate": 95.71,
  "openRate": 62.86,
  "clickRate": 24.29
}
```

### Get Metrics by Type

**GET** `/analytics/metrics/by-type?days=30`

Get metrics grouped by notification type.

**Response:** `200 OK`
```json
{
  "new_message": {
    "count": 1200,
    "openRate": 72.5,
    "clickRate": 31.2
  },
  "booking_request": {
    "count": 900,
    "openRate": 65.3,
    "clickRate": 24.8
  },
  ...
}
```

### Get Notification Metrics

**GET** `/analytics/notifications/:id`

Get metrics for a specific notification.

**Response:** `200 OK`
```json
{
  "notificationId": "notif-123",
  "sent": 1250,
  "delivered": 1198,
  "opened": 856,
  "clicked": 342,
  "deliveryRate": 95.84,
  "openRate": 68.48,
  "clickRate": 27.36
}
```

### Get Analytics Events

**GET** `/analytics/events?notificationId=notif-123&eventType=opened&limit=50&offset=0`

Get analytics events with filters.

**Query Parameters:**
- `notificationId` (optional): Filter by notification
- `eventType` (optional): Filter by event type (sent, delivered, opened, clicked)
- `limit` (optional): Number of results (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Response:** `200 OK`
```json
{
  "events": [
    {
      "id": "evt-123",
      "notificationId": "notif-123",
      "userId": "user-123",
      "eventType": "opened",
      "timestamp": "2025-11-08T10:05:00Z",
      "metadata": {
        "device": "mobile",
        "browser": "Chrome"
      }
    }
  ],
  "total": 856
}
```

### Track Event

**POST** `/analytics/events`

Track an analytics event.

**Request:**
```json
{
  "notificationId": "notif-123",
  "eventType": "opened",
  "metadata": {
    "device": "mobile",
    "browser": "Chrome",
    "timestamp": "2025-11-08T10:05:00Z"
  }
}
```

**Response:** `201 Created`
```json
{
  "id": "evt-123",
  "notificationId": "notif-123",
  "userId": "user-123",
  "eventType": "opened",
  "timestamp": "2025-11-08T10:05:00Z"
}
```

### Export Analytics

**GET** `/analytics/export?format=csv&days=30`

Export analytics data.

**Query Parameters:**
- `format` (optional): Export format - `csv` or `json` (default: csv)
- `days` (optional): Number of days to export (default: 30)

**Response:** `200 OK` (CSV file)
```
Notification ID,Event Type,Timestamp,Metadata
notif-123,opened,2025-11-08T10:05:00Z,"{...}"
...
```

---

## Error Responses

All endpoints return standard error responses:

### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "error": "Access token required"
}
```

### 403 Forbidden
```json
{
  "error": "Admin access required"
}
```

### 404 Not Found
```json
{
  "error": "Notification not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting

API endpoints are rate limited:

- **Authentication endpoints**: 5 requests per minute per IP
- **Notification endpoints**: 100 requests per minute per user
- **Analytics endpoints**: 50 requests per minute per user

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1636360800
```

---

## Webhook Events

The system can send webhook events for:

- `notification.sent` - Notification delivered
- `notification.opened` - Notification opened
- `notification.clicked` - Notification clicked
- `user.registered` - New user registered
- `user.deleted` - User deleted

Configure webhooks in your account settings.

---

## SDK Examples

### JavaScript/TypeScript

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.smartpro.io/api',
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Login
const { data } = await api.post('/auth/login', {
  email: 'provider@example.com',
  password: 'password123',
});

localStorage.setItem('token', data.token);

// Get notifications
const { data: notifications } = await api.get('/notifications');

// Create notification
await api.post('/notifications', {
  userId: 'provider-123',
  type: 'new_message',
  title: 'New message',
  message: 'You have a new message',
});
```

---

**Last Updated**: November 2025
**Version**: 1.0.0
