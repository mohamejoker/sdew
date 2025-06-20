
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Settings, 
  Check, 
  CheckCheck, 
  Trash2, 
  User, 
  CreditCard, 
  AlertTriangle, 
  Info,
  MessageSquare,
  TrendingUp,
  Shield
} from 'lucide-react';

const NotificationsHub = () => {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'طلب جديد تم استلامه',
      message: 'تم استلام طلب جديد من العميل أحمد محمد لخدمة متابعين انستغرام',
      time: 'منذ 5 دقائق',
      read: false,
      icon: CreditCard,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'user',
      title: 'مستخدم جديد سجل',
      message: 'قام مستخدم جديد بالتسجيل: فاطمة أحمد',
      time: 'منذ 15 دقيقة',
      read: false,
      icon: User,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'system',
      title: 'تحديث النظام',
      message: 'تم تحديث النظام بنجاح إلى الإصدار 2.1.0',
      time: 'منذ 30 دقيقة',
      read: true,
      icon: Settings,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'security',
      title: 'تنبيه أمني',
      message: 'تم اكتشاف محاولة دخول مشبوهة من عنوان IP غير معروف',
      time: 'منذ ساعة',
      read: false,
      icon: Shield,
      color: 'text-red-600'
    },
    {
      id: 5,
      type: 'payment',
      title: 'دفعة جديدة',
      message: 'تم استلام دفعة بقيمة $25.50 من العميل محمد علي',
      time: 'منذ ساعتين',
      read: true,
      icon: CreditCard,
      color: 'text-green-600'
    },
    {
      id: 6,
      type: 'analytics',
      title: 'تقرير الأداء اليومي',
      message: 'تقرير أداء اليوم جاهز: 150 طلب جديد، معدل نمو 15%',
      time: 'منذ 3 ساعات',
      read: true,
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      id: 7,
      type: 'support',
      title: 'رسالة دعم جديدة',
      message: 'تم استلام رسالة دعم جديدة من العميل سارة خالد',
      time: 'منذ 4 ساعات',
      read: false,
      icon: MessageSquare,
      color: 'text-orange-600'
    },
    {
      id: 8,
      type: 'warning',
      title: 'تحذير: سعة الخادم',
      message: 'سعة الخادم وصلت إلى 85%، يرجى مراجعة استخدام الموارد',
      time: 'منذ 5 ساعات',
      read: true,
      icon: AlertTriangle,
      color: 'text-yellow-600'
    }
  ];

  const filters = [
    { id: 'all', name: 'جميع الإشعارات', count: notifications.length },
    { id: 'unread', name: 'غير مقروءة', count: notifications.filter(n => !n.read).length },
    { id: 'order', name: 'الطلبات', count: notifications.filter(n => n.type === 'order').length },
    { id: 'user', name: 'المستخدمين', count: notifications.filter(n => n.type === 'user').length },
    { id: 'system', name: 'النظام', count: notifications.filter(n => n.type === 'system').length },
    { id: 'security', name: 'الأمان', count: notifications.filter(n => n.type === 'security').length }
  ];

  const filteredNotifications = filter === 'all' 
    ? notifications
    : filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    // تحديث حالة الإشعار كمقروء
    console.log('Marking notification as read:', id);
  };

  const markAllAsRead = () => {
    // تحديد جميع الإشعارات كمقروءة
    console.log('Marking all notifications as read');
  };

  const deleteNotification = (id: number) => {
    // حذف الإشعار
    console.log('Deleting notification:', id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Bell className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">مركز الإشعارات</h1>
            <p className="text-gray-600 mt-1">
              متابعة جميع الأنشطة والتحديثات
              {unreadCount > 0 && (
                <span className="mr-2 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                  {unreadCount} غير مقروءة
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <CheckCheck className="h-4 w-4 mr-2" />
              تحديد الكل كمقروء
            </Button>
          )}
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            إعدادات الإشعارات
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((filterItem) => (
              <Button
                key={filterItem.id}
                variant={filter === filterItem.id ? "default" : "outline"}
                onClick={() => setFilter(filterItem.id)}
                className="flex items-center gap-2"
              >
                {filterItem.name}
                <Badge variant="secondary" className="ml-1">
                  {filterItem.count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => {
          const IconComponent = notification.icon;
          return (
            <Card 
              key={notification.id} 
              className={`hover:shadow-md transition-shadow ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg bg-gray-50 ${notification.color}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                          {!notification.read && (
                            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                          )}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                        <p className="text-gray-400 text-xs mt-2">{notification.time}</p>
                      </div>
                      
                      <div className="flex gap-1">
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد إشعارات</h3>
            <p className="text-gray-500">لا توجد إشعارات تطابق الفلتر المحدد</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationsHub;
