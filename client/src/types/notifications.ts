/**
 * Notification System Type Definitions
 * Defines all types, interfaces, and enums for the real-time notification system
 */

/**
 * Notification type categories
 */
export enum NotificationType {
  NEW_MESSAGE = "new_message",
  BOOKING_REQUEST = "booking_request",
  BOOKING_CONFIRMED = "booking_confirmed",
  BOOKING_CANCELLED = "booking_cancelled",
  PAYMENT_RECEIVED = "payment_received",
  PAYMENT_PENDING = "payment_pending",
  PROFILE_VERIFIED = "profile_verified",
  PROFILE_REVIEW = "profile_review",
  PLATFORM_UPDATE = "platform_update",
  SECURITY_ALERT = "security_alert",
  CONTRACT_SIGNED = "contract_signed",
  REVIEW_RECEIVED = "review_received",
  PROMOTION = "promotion",
  SYSTEM_ALERT = "system_alert",
}

/**
 * Notification priority levels
 */
export enum NotificationPriority {
  CRITICAL = "critical",
  HIGH = "high",
  NORMAL = "normal",
  LOW = "low",
}

/**
 * Notification delivery channels
 */
export enum NotificationChannel {
  IN_APP = "in_app",
  EMAIL = "email",
  BROWSER_PUSH = "browser_push",
  SMS = "sms",
}

/**
 * WebSocket event types
 */
export enum WebSocketEventType {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  NOTIFICATION = "notification",
  NOTIFICATION_READ = "notification_read",
  NOTIFICATION_ARCHIVED = "notification_archived",
  PREFERENCES_UPDATED = "preferences_updated",
  HEARTBEAT = "heartbeat",
  ERROR = "error",
}

/**
 * Core notification interface
 */
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  description?: string;
  icon?: string;
  actionUrl?: string;
  actionLabel?: string;
  timestamp: Date;
  read: boolean;
  archived: boolean;
  data?: Record<string, any>;
  relatedId?: string; // ID of related entity (booking, message, etc.)
}

/**
 * Notification preference settings
 */
export interface NotificationPreferences {
  userId: string;
  channels: {
    inApp: boolean;
    email: boolean;
    browserPush: boolean;
    sms: boolean;
  };
  types: {
    [key in NotificationType]?: boolean;
  };
  quietHours: {
    enabled: boolean;
    startTime: string; // HH:MM format
    endTime: string; // HH:MM format
  };
  frequency: "immediate" | "hourly" | "daily_digest";
  soundEnabled: boolean;
  soundVolume: number; // 0-100
  desktopNotifications: boolean;
  emailDigest: boolean;
  emailDigestFrequency: "daily" | "weekly" | "never";
}

/**
 * WebSocket message payload
 */
export interface WebSocketMessage {
  type: WebSocketEventType;
  data: any;
  timestamp: Date;
  messageId?: string;
}

/**
 * Notification state in context
 */
export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  preferences: NotificationPreferences | null;
  isLoading: boolean;
  error: string | null;
  connectionStatus: "connecting" | "connected" | "disconnected" | "error";
}

/**
 * Notification filter options
 */
export interface NotificationFilter {
  type?: NotificationType;
  priority?: NotificationPriority;
  read?: boolean;
  archived?: boolean;
  startDate?: Date;
  endDate?: Date;
  searchText?: string;
}

/**
 * Notification action payload
 */
export interface NotificationAction {
  type: "read" | "archive" | "delete" | "action";
  notificationId: string;
  data?: any;
}

/**
 * Provider notification context type
 */
export interface ProviderNotificationContextType {
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
