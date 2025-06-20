
import React, { useState, useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface Notification {
  id: number;
  name: string;
  action: string;
  platform: string;
  time: string;
}

const LiveNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [nextId, setNextId] = useState(1);

  const sampleNotifications = [
    { name: "أحمد م.", action: "اشترى باقة Instagram", platform: "Instagram", time: "منذ 2 دقيقة" },
    { name: "فاطمة س.", action: "حصلت على 5000 متابع", platform: "TikTok", time: "منذ 5 دقائق" },
    { name: "خالد ع.", action: "اشترى الباقة المتقدمة", platform: "Twitter", time: "منذ 8 دقائق" },
    { name: "نورا ا.", action: "حققت 10K متابع", platform: "YouTube", time: "منذ 12 دقيقة" },
    { name: "محمد ب.", action: "اشترى باقة Snapchat", platform: "Snapchat", time: "منذ 15 دقيقة" },
    { name: "عائشة ق.", action: "حصلت على 3000 متابع", platform: "LinkedIn", time: "منذ 18 دقيقة" }
  ];

  useEffect(() => {
    const addNotification = () => {
      const randomNotification = sampleNotifications[Math.floor(Math.random() * sampleNotifications.length)];
      const newNotification = { ...randomNotification, id: nextId };
      
      setNotifications(prev => [newNotification, ...prev.slice(0, 2)]);
      setNextId(prev => prev + 1);

      // Auto remove after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(notif => notif.id !== newNotification.id));
      }, 5000);
    };

    // Add first notification after 2 seconds
    const initialTimer = setTimeout(addNotification, 2000);

    // Then add notifications every 8-15 seconds
    const interval = setInterval(() => {
      addNotification();
    }, Math.random() * 7000 + 8000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [nextId]);

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white border-2 border-green-200 rounded-xl p-4 shadow-2xl max-w-sm animate-in slide-in-from-left duration-500"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900 text-sm">{notification.name}</div>
                <div className="text-gray-700 text-sm">{notification.action}</div>
                <div className="text-gray-500 text-xs mt-1">{notification.time}</div>
              </div>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveNotifications;
