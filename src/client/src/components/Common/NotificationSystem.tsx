
import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationContextType {
  notify: (notification: Omit<Notification, 'id'>) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const getIcon = (type: NotificationType) => {
  switch (type) {
    case 'success': return CheckCircle;
    case 'error': return XCircle;
    case 'warning': return AlertCircle;
    case 'info': return Info;
  }
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    const Icon = getIcon(notification.type);
    
    toast(notification.title, {
      description: notification.message,
      duration: notification.duration || 4000,
      icon: <Icon className="h-4 w-4" />,
      action: notification.action ? {
        label: notification.action.label,
        onClick: notification.action.onClick
      } : undefined,
      className: `toast-${notification.type}`
    });

    const newNotification = { ...notification, id };
    setNotifications(prev => [...prev, newNotification]);

    // إزالة الإشعار بعد المدة المحددة
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, notification.duration || 4000);
  }, []);

  const success = useCallback((title: string, message?: string) => {
    notify({ type: 'success', title, message: message || '' });
  }, [notify]);

  const error = useCallback((title: string, message?: string) => {
    notify({ type: 'error', title, message: message || '' });
  }, [notify]);

  const warning = useCallback((title: string, message?: string) => {
    notify({ type: 'warning', title, message: message || '' });
  }, [notify]);

  const info = useCallback((title: string, message?: string) => {
    notify({ type: 'info', title, message: message || '' });
  }, [notify]);

  return (
    <NotificationContext.Provider value={{ notify, success, error, warning, info }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};
