
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, Check, X, Settings, TrendingUp, AlertTriangle, Heart, MessageSquare } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionable?: boolean;
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'نمو في المتابعين',
      message: 'تمت إضافة 250 متابع جديد على Instagram اليوم',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      actionable: true
    },
    {
      id: '2',
      type: 'info',
      title: 'اكتمال الحملة',
      message: 'حملة زيادة الإعجابات اكتملت بنجاح',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false
    },
    {
      id: '3',
      type: 'warning',
      title: 'انخفاض في التفاعل',
      message: 'انخفض معدل التفاعل بنسبة 5% هذا الأسبوع',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      actionable: true
    },
    {
      id: '4',
      type: 'error',
      title: 'فشل في الجدولة',
      message: 'فشل في نشر المحتوى المجدول على Facebook',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
      actionable: true
    }
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    campaignUpdates: true,
    competitorAlerts: false
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'info':
        return <Bell className="h-5 w-5 text-blue-600" />;
      case 'error':
        return <X className="h-5 w-5 text-red-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'info':
        return 'border-l-blue-500 bg-blue-50';
      case 'error':
        return 'border-l-red-500 bg-red-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (hours < 24) return `منذ ${hours} ساعة`;
    return `منذ ${days} يوم`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <h2 className="text-2xl font-bold text-gray-900">مركز الإشعارات</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="rounded-full">
              {unreadCount}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button variant="outline" onClick={markAllAsRead}>
            قراءة الكل
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Bell className="h-5 w-5" />
                <span>الإشعارات الحديثة</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">لا توجد إشعارات جديدة</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-l-4 rounded-lg ${getNotificationColor(notification.type)} ${
                      !notification.read ? 'border-l-4' : 'opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 rtl:space-x-reverse">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <h4 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    {notification.actionable && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <Button size="sm" variant="outline">
                          عرض التفاصيل
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Settings Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Settings className="h-5 w-5" />
                <span>إعدادات الإشعارات</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">إشعارات البريد</p>
                  <p className="text-sm text-gray-600">تلقي الإشعارات عبر البريد الإلكتروني</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, emailNotifications: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">الإشعارات الفورية</p>
                  <p className="text-sm text-gray-600">إشعارات في المتصفح</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, pushNotifications: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">التقارير الأسبوعية</p>
                  <p className="text-sm text-gray-600">ملخص أسبوعي للأداء</p>
                </div>
                <Switch
                  checked={settings.weeklyReports}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, weeklyReports: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">تحديثات الحملات</p>
                  <p className="text-sm text-gray-600">إشعارات حول حالة الحملات</p>
                </div>
                <Switch
                  checked={settings.campaignUpdates}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, campaignUpdates: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">تنبيهات المنافسين</p>
                  <p className="text-sm text-gray-600">تنبيهات حول أنشطة المنافسين</p>
                </div>
                <Switch
                  checked={settings.competitorAlerts}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, competitorAlerts: checked})
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>إحصائيات سريعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm">إعجابات اليوم</span>
                </div>
                <span className="font-bold text-red-500">+1.2K</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">تعليقات جديدة</span>
                </div>
                <span className="font-bold text-blue-500">+47</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm">متابعين جدد</span>
                </div>
                <span className="font-bold text-green-500">+312</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
