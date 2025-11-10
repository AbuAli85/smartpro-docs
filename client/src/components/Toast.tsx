import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Notification } from '@/contexts/NotificationContext';
import { useNotification } from '@/contexts/NotificationContext';

interface ToastProps {
  notification: Notification;
}

export function Toast({ notification }: ToastProps) {
  const { removeNotification } = useNotification();

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-yellow-50 border-yellow-200',
  };

  const textColors = {
    success: 'text-green-900',
    error: 'text-red-900',
    info: 'text-blue-900',
    warning: 'text-yellow-900',
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border ${bgColors[notification.type]} animate-in fade-in slide-in-from-top-4 duration-300`}
      role="alert"
    >
      <div className="flex-shrink-0 mt-0.5">{icons[notification.type]}</div>
      <div className="flex-1">
        <h3 className={`font-semibold ${textColors[notification.type]}`}>
          {notification.title}
        </h3>
        <p className={`text-sm mt-1 ${textColors[notification.type]} opacity-90`}>
          {notification.message}
        </p>
        {notification.action && (
          <button
            onClick={notification.action.onClick}
            className={`text-sm font-medium mt-2 underline hover:no-underline ${textColors[notification.type]}`}
          >
            {notification.action.label}
          </button>
        )}
      </div>
      <button
        onClick={() => removeNotification(notification.id)}
        className={`flex-shrink-0 ${textColors[notification.type]} hover:opacity-70 transition-opacity`}
        aria-label="Close notification"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
