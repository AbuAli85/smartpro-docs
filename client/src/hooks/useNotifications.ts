import { useNotification } from '@/contexts/NotificationContext';

export function useNotifications() {
  const { addNotification, removeNotification, clearNotifications } = useNotification();

  return {
    success: (title: string, message: string, duration?: number) =>
      addNotification({ type: 'success', title, message, duration }),
    error: (title: string, message: string, duration?: number) =>
      addNotification({ type: 'error', title, message, duration }),
    info: (title: string, message: string, duration?: number) =>
      addNotification({ type: 'info', title, message, duration }),
    warning: (title: string, message: string, duration?: number) =>
      addNotification({ type: 'warning', title, message, duration }),
    remove: removeNotification,
    clear: clearNotifications,
  };
}
