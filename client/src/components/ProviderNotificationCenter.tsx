/**
 * Provider Notification Center Component
 * Displays list of provider notifications with filtering and actions
 */

import { useContext, useState } from "react";
import { Trash2, Archive, CheckCircle2, Clock } from "lucide-react";
import { ProviderNotificationContext } from "@/contexts/ProviderNotificationContext";
import { NotificationType } from "@/types/notifications";
import { Button } from "@/components/ui/button";

interface ProviderNotificationCenterProps {
  onClose?: () => void;
}

const notificationTypeLabels: Record<NotificationType, string> = {
  [NotificationType.NEW_MESSAGE]: "New Message",
  [NotificationType.BOOKING_REQUEST]: "Booking Request",
  [NotificationType.BOOKING_CONFIRMED]: "Booking Confirmed",
  [NotificationType.BOOKING_CANCELLED]: "Booking Cancelled",
  [NotificationType.PAYMENT_RECEIVED]: "Payment Received",
  [NotificationType.PAYMENT_PENDING]: "Payment Pending",
  [NotificationType.PROFILE_VERIFIED]: "Profile Verified",
  [NotificationType.PROFILE_REVIEW]: "Profile Review",
  [NotificationType.PLATFORM_UPDATE]: "Platform Update",
  [NotificationType.SECURITY_ALERT]: "Security Alert",
  [NotificationType.CONTRACT_SIGNED]: "Contract Signed",
  [NotificationType.REVIEW_RECEIVED]: "Review Received",
  [NotificationType.PROMOTION]: "Promotion",
  [NotificationType.SYSTEM_ALERT]: "System Alert",
};

const notificationTypeColors: Record<NotificationType, string> = {
  [NotificationType.NEW_MESSAGE]: "bg-blue-100 text-blue-700",
  [NotificationType.BOOKING_REQUEST]: "bg-purple-100 text-purple-700",
  [NotificationType.BOOKING_CONFIRMED]: "bg-green-100 text-green-700",
  [NotificationType.BOOKING_CANCELLED]: "bg-red-100 text-red-700",
  [NotificationType.PAYMENT_RECEIVED]: "bg-emerald-100 text-emerald-700",
  [NotificationType.PAYMENT_PENDING]: "bg-yellow-100 text-yellow-700",
  [NotificationType.PROFILE_VERIFIED]: "bg-green-100 text-green-700",
  [NotificationType.PROFILE_REVIEW]: "bg-orange-100 text-orange-700",
  [NotificationType.PLATFORM_UPDATE]: "bg-indigo-100 text-indigo-700",
  [NotificationType.SECURITY_ALERT]: "bg-red-100 text-red-700",
  [NotificationType.CONTRACT_SIGNED]: "bg-blue-100 text-blue-700",
  [NotificationType.REVIEW_RECEIVED]: "bg-pink-100 text-pink-700",
  [NotificationType.PROMOTION]: "bg-amber-100 text-amber-700",
  [NotificationType.SYSTEM_ALERT]: "bg-gray-100 text-gray-700",
};

export function ProviderNotificationCenter({ onClose }: ProviderNotificationCenterProps) {
  const context = useContext(ProviderNotificationContext);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  if (!context) {
    return (
      <div className="p-4 text-center text-gray-500">
        Notification system not available
      </div>
    );
  }

  const { state, markAsRead, archiveNotification, deleteNotification, markAllAsRead } = context;

  const filteredNotifications =
    filter === "unread"
      ? state.notifications.filter((n) => !n.read && !n.archived)
      : state.notifications.filter((n) => !n.archived);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="max-h-96 overflow-y-auto">
      {/* Filter Tabs */}
      <div className="flex gap-2 p-4 border-b border-gray-200">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            filter === "unread"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Unread ({state.unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">
            {filter === "unread" ? "No unread notifications" : "No notifications"}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-gray-50 transition-colors ${
                !notification.read ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex gap-3">
                {/* Type Badge */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    notificationTypeColors[notification.type]
                  }`}
                >
                  {notification.type.charAt(0).toUpperCase()}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-gray-900">{notification.title}</p>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {notification.message}
                      </p>
                      {notification.description && (
                        <p className="text-xs text-gray-500 mt-1">{notification.description}</p>
                      )}
                    </div>

                    {/* Read Indicator */}
                    {!notification.read && (
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 mt-2" />
                    )}
                  </div>

                  {/* Time */}
                  <p className="text-xs text-gray-500 mt-2">
                    {formatTime(notification.timestamp)}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2 mt-3">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        Mark Read
                      </button>
                    )}

                    <button
                      onClick={() => archiveNotification(notification.id)}
                      className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-1"
                    >
                      <Archive className="w-3 h-3" />
                      Archive
                    </button>

                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-xs px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Actions */}
      {filteredNotifications.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            className="flex-1"
          >
            Mark All as Read
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="flex-1"
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProviderNotificationCenter;
