/**
 * Notification Preferences Component
 * Allows providers to customize notification settings
 */

import { useContext, useState } from "react";
import { Save, RotateCcw } from "lucide-react";
import { ProviderNotificationContext } from "@/contexts/ProviderNotificationContext";
import { NotificationType, NotificationChannel } from "@/types/notifications";
import { Button } from "@/components/ui/button";

export function NotificationPreferences() {
  const context = useContext(ProviderNotificationContext);
  const [isSaving, setIsSaving] = useState(false);

  if (!context) {
    return (
      <div className="p-4 text-center text-gray-500">
        Notification preferences not available
      </div>
    );
  }

  const { state, updatePreferences } = context;
  const prefs = state.preferences;

  if (!prefs) {
    return (
      <div className="p-4 text-center text-gray-500">
        Loading preferences...
      </div>
    );
  }

  const handleChannelToggle = (channel: NotificationChannel) => {
    updatePreferences({
      channels: {
        ...prefs.channels,
        [channel]: !prefs.channels[channel as keyof typeof prefs.channels],
      },
    });
  };

  const handleTypeToggle = (type: NotificationType) => {
    updatePreferences({
      types: {
        ...prefs.types,
        [type]: !prefs.types[type],
      },
    });
  };

  const handleQuietHoursToggle = () => {
    updatePreferences({
      quietHours: {
        ...prefs.quietHours,
        enabled: !prefs.quietHours.enabled,
      },
    });
  };

  const handleSoundToggle = () => {
    updatePreferences({
      soundEnabled: !prefs.soundEnabled,
    });
  };

  const handleDesktopNotificationsToggle = () => {
    updatePreferences({
      desktopNotifications: !prefs.desktopNotifications,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Preferences are automatically saved via updatePreferences
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>

      {/* Notification Channels */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Notification Channels</h3>
        <div className="space-y-3">
          {[
            { id: "inApp" as const, label: "In-App Notifications" },
            { id: "email" as const, label: "Email Notifications" },
            { id: "browserPush" as const, label: "Browser Push Notifications" },
            { id: "sms" as const, label: "SMS Notifications" },
          ].map(({ id, label }) => (
            <label key={id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={prefs.channels[id]}
                onChange={() => handleChannelToggle(id as NotificationChannel)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Notification Types */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Notification Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            NotificationType.NEW_MESSAGE,
            NotificationType.BOOKING_REQUEST,
            NotificationType.BOOKING_CONFIRMED,
            NotificationType.PAYMENT_RECEIVED,
            NotificationType.PROFILE_VERIFIED,
            NotificationType.PLATFORM_UPDATE,
          ].map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={prefs.types[type] ?? true}
                onChange={() => handleTypeToggle(type)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-gray-700 capitalize">
                {type.replace(/_/g, " ")}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Quiet Hours */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Quiet Hours</h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={prefs.quietHours.enabled}
              onChange={handleQuietHoursToggle}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Enable</span>
          </label>
        </div>

        {prefs.quietHours.enabled && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time
              </label>
              <input
                type="time"
                value={prefs.quietHours.startTime}
                onChange={(e) =>
                  updatePreferences({
                    quietHours: {
                      ...prefs.quietHours,
                      startTime: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time
              </label>
              <input
                type="time"
                value={prefs.quietHours.endTime}
                onChange={(e) =>
                  updatePreferences({
                    quietHours: {
                      ...prefs.quietHours,
                      endTime: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        )}
      </section>

      {/* Sound & Desktop Notifications */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Sound & Desktop</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={prefs.soundEnabled}
              onChange={handleSoundToggle}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="text-gray-700">Notification Sounds</span>
          </label>

          {prefs.soundEnabled && (
            <div className="ml-7">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sound Volume: {prefs.soundVolume}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={prefs.soundVolume}
                onChange={(e) =>
                  updatePreferences({
                    soundVolume: Number(e.target.value),
                  })
                }
                className="w-full"
              />
            </div>
          )}

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={prefs.desktopNotifications}
              onChange={handleDesktopNotificationsToggle}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="text-gray-700">Desktop Notifications</span>
          </label>
        </div>
      </section>

      {/* Frequency */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Notification Frequency</h3>
        <div className="space-y-3">
          {[
            { value: "immediate" as const, label: "Immediate" },
            { value: "hourly" as const, label: "Hourly Digest" },
            { value: "daily_digest" as const, label: "Daily Digest" },
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="frequency"
                value={value}
                checked={prefs.frequency === value}
                onChange={() =>
                  updatePreferences({
                    frequency: value,
                  })
                }
                className="w-4 h-4"
              />
              <span className="text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6 border-t border-gray-200">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Preferences"}
        </Button>
        <Button variant="outline">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
}

export default NotificationPreferences;
