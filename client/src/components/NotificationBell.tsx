/**
 * Notification Bell Component
 * Displays notification bell icon with unread count badge
 */

import { useContext, useState } from "react";
import { Bell, X } from "lucide-react";
import { ProviderNotificationContext } from "@/contexts/ProviderNotificationContext";
import ProviderNotificationCenter from "./ProviderNotificationCenter";

export default function NotificationBell() {
  const context = useContext(ProviderNotificationContext);
  const [isOpen, setIsOpen] = useState(false);

  if (!context) {
    return null;
  }

  const { state } = context;
  const unreadCount = state.unreadCount;

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-6 h-6" />

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}

        {/* Connection Status Indicator */}
        <div
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
            state.connectionStatus === "connected"
              ? "bg-green-500"
              : state.connectionStatus === "connecting"
                ? "bg-yellow-500"
                : "bg-gray-400"
          }`}
          title={`Connection: ${state.connectionStatus}`}
        />
      </button>

      {/* Notification Center Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Notification Center Content */}
          <ProviderNotificationCenter onClose={() => setIsOpen(false)} />
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
