
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, X, Check, AlertCircle, Info, CheckCircle, 
  Clock, User, Package, DollarSign, TrendingUp,
  Settings, Filter, Archive
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionRequired?: boolean;
  category: string;
}

const LiveNotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // محاكاة الإشعارات المباشرة
    const generateNotification = (): Notification => {
      const types: Array<'success' | 'warning' | 'info' | 'error'> = ['success', 'warning', 'info', 'error'];
      const notifications = [
        {
          type: 'success' as const,
          title: 'طلب جديد مكتمل',
          message: 'تم إكمال طلب متابعين Instagram بنجاح',
          category: 'orders',
          actionRequired: false
        },
        {
          type: 'info' as const,
          title: 'عميل جديد',
          message: 'انضم عميل جديد إلى المنصة',
          category: 'users',
          actionRequired: false
        },
        {
          type: 'warning' as const,
          title: 'رصيد منخفض',
          message: 'رصيد مورد الخدمة أقل من 100 ريال',
          category: 'system',
          actionRequired: true
        },
        {
          type: 'success' as const,
          title: 'دفعة جديدة',
          message: 'تم استلام دفعة بقيمة 500 ريال',
          category: 'payments',
          actionRequired: false
        }
      ];

      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      
      return {
        id: `notif-${Date.now()}-${Math.random()}`,
        ...randomNotification,
        timestamp: new Date(),
        read: false
      };
    };

    const interval = setInterval(() => {
      const newNotification = generateNotification();
      setNotifications(prev => [newNotification, ...prev.slice(0, 49)]);
      
      // إظهار toast للإشعارات الهامة
      if (newNotification.actionRequired) {
        toast({
          title: newNotification.title,
          description: newNotification.message,
          variant: newNotification.type === 'error' ? 'destructive' : 'default'
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [toast]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'orders': return <Package className="h-4 w-4" />;
      case 'users': return <User className="h-4 w-4" />;
      case 'payments': return <DollarSign className="h-4 w-4" />;
      case 'system': return <Settings className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (showUnreadOnly && notif.read) return false;
    if (filter === 'all') return true;
    return notif.category === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            الإشعارات المباشرة
          </CardTitle>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {unreadCount}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <Check className="h-4 w-4 mr-1" />
            قراءة الكل
          </Button>
          
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="px-2 py-1 text-sm border rounded"
          >
            <option value="all">جميع الإشعارات</option>
            <option value="orders">الطلبات</option>
            <option value="users">المستخدمين</option>
            <option value="payments">المدفوعات</option>
            <option value="system">النظام</option>
          </select>
          
          <Button
            variant={showUnreadOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>لا توجد إشعارات حالياً</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                notification.read 
                  ? 'bg-gray-50 border-gray-200' 
                  : 'bg-white border-blue-200 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {getNotificationIcon(notification.type)}
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-medium ${
                        notification.read ? 'text-gray-700' : 'text-gray-900'
                      }`}>
                        {notification.title}
                      </h4>
                      {getCategoryIcon(notification.category)}
                      {notification.actionRequired && (
                        <Badge variant="destructive" className="text-xs">
                          يتطلب إجراء
                        </Badge>
                      )}
                    </div>
                    
                    <p className={`text-sm ${
                      notification.read ? 'text-gray-500' : 'text-gray-600'
                    }`}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      {notification.timestamp.toLocaleTimeString('ar-SA', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeNotification(notification.id)}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default LiveNotificationSystem;
