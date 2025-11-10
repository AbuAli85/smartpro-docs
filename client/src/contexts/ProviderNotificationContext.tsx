/**
 * Provider Notification Context
 * Manages global notification state and provides notification management functions
 */

import React, { createContext, useCallback, useEffect, useState } from "react";
import type {
  Notification,
  NotificationPreferences,
  NotificationState,
  NotificationFilter,
  ProviderNotificationContextType,
} from "@/types/notifications";
import {
  NotificationType,
  WebSocketEventType,
} from "@/types/notifications";
import { WebSocketClient, createWebSocketClient } from "@/lib/websocketClient";

const defaultPreferences: NotificationPreferences = {
  userId: "",
  channels: {
    inApp: true,
    email: true,
    browserPush: true,
    sms: false,
  },
  types: {
    [NotificationType.NEW_MESSAGE]: true,
    [NotificationType.BOOKING_REQUEST]: true,
    [NotificationType.BOOKING_CONFIRMED]: true,
    [NotificationType.PAYMENT_RECEIVED]: true,
    [NotificationType.PLATFORM_UPDATE]: true,
    [NotificationType.SECURITY_ALERT]: true,
  } as Record<NotificationType, boolean>,
  quietHours: {
    enabled: false,
    startTime: "22:00",
    endTime: "08:00",
  },
  frequency: "immediate",
  soundEnabled: true,
  soundVolume: 70,
  desktopNotifications: true,
  emailDigest: true,
  emailDigestFrequency: "daily",
};

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  preferences: defaultPreferences,
  isLoading: false,
  error: null,
  connectionStatus: "disconnected",
};

export const ProviderNotificationContext = createContext<ProviderNotificationContextType | undefined>(
  undefined
);

interface ProviderNotificationProviderProps {
  children: React.ReactNode;
  userId?: string;
  wsUrl?: string;
}

export function ProviderNotificationProvider({
  children,
  userId = "provider-1",
  wsUrl = process.env.VITE_WS_URL || "ws://localhost:3001",
}: ProviderNotificationProviderProps) {
  const [state, setState] = useState<NotificationState>({
    ...initialState,
    preferences: {
      ...defaultPreferences,
      userId,
      types: {
        [NotificationType.NEW_MESSAGE]: true,
        [NotificationType.BOOKING_REQUEST]: true,
        [NotificationType.BOOKING_CONFIRMED]: true,
        [NotificationType.PAYMENT_RECEIVED]: true,
        [NotificationType.PLATFORM_UPDATE]: true,
        [NotificationType.SECURITY_ALERT]: true,
      } as Record<NotificationType, boolean>,
    },
  });
  const [wsClient, setWsClient] = useState<WebSocketClient | null>(null);

  // Initialize WebSocket connection
  useEffect(() => {
    const initializeWebSocket = async () => {
      try {
        const client = createWebSocketClient({
          url: wsUrl,
          token: userId,
          reconnectAttempts: 5,
          reconnectDelay: 1000,
          maxReconnectDelay: 30000,
          heartbeatInterval: 30000,
        });

        // Listen for connection status changes
        client.on("status", (message) => {
          setState((prev) => ({
            ...prev,
            connectionStatus: message.data.status,
            error: message.data.error ? message.data.error.message : null,
          }));
        });

        // Listen for incoming notifications
        client.on(WebSocketEventType.NOTIFICATION, (message) => {
          const notification = message.data as Notification;
          addNotification(notification);
        });

        // Listen for preference updates
        client.on(WebSocketEventType.PREFERENCES_UPDATED, (message) => {
          setState((prev) => ({
            ...prev,
            preferences: message.data,
          }));
        });

        setWsClient(client);

        // Attempt initial connection
        await client.connect();
      } catch (error) {
        console.error("Failed to initialize WebSocket:", error);
        setState((prev) => ({
          ...prev,
          error: "Failed to connect to notification service",
        }));
      }
    };

    initializeWebSocket();

    return () => {
      if (wsClient) {
        wsClient.disconnect();
      }
    };
  }, [userId, wsUrl, wsClient]);

  // Add notification to state
  const addNotification = useCallback((notification: Omit<Notification, "id" | "timestamp" | "read" | "archived">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      read: false,
      archived: false,
    };
    setState((prev) => ({
      ...prev,
      notifications: [newNotification, ...prev.notifications],
      unreadCount: prev.unreadCount + 1,
    }));

    // Play sound if enabled
    setState((prev) => {
      if (prev.preferences?.soundEnabled) {
        playNotificationSound(prev.preferences.soundVolume);
      }
      return prev;
    });
  }, []);

  // Mark notification as read
  const markAsRead = useCallback((notificationId: string) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, prev.unreadCount - 1),
    }));

    if (wsClient?.isConnected()) {
      wsClient.send({
        type: WebSocketEventType.NOTIFICATION_READ,
        data: { notificationId },
        timestamp: new Date(),
      });
    }
  }, [wsClient]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }));
  }, []);

  // Archive notification
  const archiveNotification = useCallback((notificationId: string) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) =>
        n.id === notificationId ? { ...n, archived: true } : n
      ),
    }));

    if (wsClient?.isConnected()) {
      wsClient.send({
        type: WebSocketEventType.NOTIFICATION_ARCHIVED,
        data: { notificationId },
        timestamp: new Date(),
      });
    }
  }, [wsClient]);

  // Delete notification
  const deleteNotification = useCallback((notificationId: string) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.filter((n) => n.id !== notificationId),
    }));
  }, []);

  // Clear all notifications
  const clearAllNotifications = useCallback(() => {
    setState((prev) => ({
      ...prev,
      notifications: [],
      unreadCount: 0,
    }));
  }, []);

  // Update preferences
  const updatePreferences = useCallback((preferences: Partial<NotificationPreferences>) => {
    setState((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences!,
        ...preferences,
      },
    }));

    if (wsClient?.isConnected()) {
      wsClient.send({
        type: WebSocketEventType.PREFERENCES_UPDATED,
        data: preferences,
        timestamp: new Date(),
      });
    }
  }, [wsClient]);

  // Get filtered notifications
  const getFilteredNotifications = useCallback((filter: NotificationFilter): Notification[] => {
    return state.notifications.filter((notification) => {
      if (filter.type && notification.type !== filter.type) return false;
      if (filter.priority && notification.priority !== filter.priority) return false;
      if (filter.read !== undefined && notification.read !== filter.read) return false;
      if (filter.archived !== undefined && notification.archived !== filter.archived) return false;
      if (filter.startDate && notification.timestamp < filter.startDate) return false;
      if (filter.endDate && notification.timestamp > filter.endDate) return false;
      if (filter.searchText) {
        const searchLower = filter.searchText.toLowerCase();
        return (
          notification.title.toLowerCase().includes(searchLower) ||
          notification.message.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  }, [state.notifications]);

  // Reconnect WebSocket
  const reconnectWebSocket = useCallback(() => {
    if (wsClient) {
      wsClient.connect().catch((error) => {
        console.error("Failed to reconnect:", error);
      });
    }
  }, [wsClient]);

  const contextValue: ProviderNotificationContextType = {
    state,
    addNotification,
    markAsRead,
    markAllAsRead,
    archiveNotification,
    deleteNotification,
    clearAllNotifications,
    updatePreferences,
    getFilteredNotifications,
    reconnectWebSocket,
  };

  return (
    <ProviderNotificationContext.Provider value={contextValue}>
      {children}
    </ProviderNotificationContext.Provider>
  );
}

/**
 * Play notification sound
 */
function playNotificationSound(volume: number = 70) {
  try {
    const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(volume / 100, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (error) {
    console.error("Failed to play notification sound:", error);
  }
}
