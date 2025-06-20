
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, X } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

const RealTimeNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // محاكاة إشعارات فورية
    const generateNotification = () => {
      const types: Notification['type'][] = ['info', 'success', 'warning', 'error'];
      const messages = [
        { title: 'مستخدم جديد', message: 'انضم مستخدم جديد للمنصة' },
        { title: 'دفعة جديدة', message: 'تم استلام دفعة بقيمة 500 ريال' },
        { title: 'تحديث النظام', message: 'تم تحديث النظام بنجاح' },
        { title: 'تنبيه أمني', message: 'محاولة دخول غير مصرح بها' },
      ];

      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      const randomType = types[Math.floor(Math.random() * types.length)];

      const newNotification: Notification = {
        id: Date.now().toString(),
        title: randomMessage.title,
        message: randomMessage.message,
        type: randomType,
        timestamp: new Date(),
        read: false,
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
    };

    // إنشاء إشعار كل 30 ثانية
    const interval = setInterval(generateNotification, 30000);
    
    // إشعار أولي
    generateNotification();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    const colors = {
      info: 'bg-blue-500',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      error: 'bg-red-500',
    };
    return colors[type];
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 px-1 min-w-[1.2rem] h-5 text-xs bg-red-500 hover:bg-red-500"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-80 max-h-96 overflow-y-auto bg-white shadow-lg border"
      >
        <div className="p-3 border-b">
          <h3 className="font-semibold">الإشعارات</h3>
        </div>
        
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            لا توجد إشعارات جديدة
          </div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem 
              key={notification.id}
              className="p-0"
              onSelect={e => e.preventDefault()}
            >
              <div 
                className={`w-full p-3 hover:bg-gray-50 transition-colors ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 rtl:space-x-reverse flex-1">
                    <div 
                      className={`w-2 h-2 rounded-full mt-2 ${getNotificationIcon(notification.type)}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.timestamp.toLocaleTimeString('ar-SA')}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeNotification(notification.id);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RealTimeNotifications;
