/**
 * useProviderNotifications Hook
 * Provides easy access to provider notification context and functions
 */

import { useContext } from "react";
import { ProviderNotificationContext } from "@/contexts/ProviderNotificationContext";

export function useProviderNotifications() {
  const context = useContext(ProviderNotificationContext);

  if (!context) {
    throw new Error(
      "useProviderNotifications must be used within ProviderNotificationProvider"
    );
  }

  return context;
}

export default useProviderNotifications;
