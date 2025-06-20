
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Plus, Send, Users } from 'lucide-react';

const NotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      title: 'مرحباً بالعضو الجديد',
      message: 'تم تسجيل عضو جديد في المنصة',
      type: 'info',
      sent: true,
      recipients: 1
    },
    {
      id: 2,
      title: 'تحديث الخدمات',
      message: 'تم إضافة خدمات جديدة للمنصة',
      type: 'announcement',
      sent: false,
      recipients: 245
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">نظام الإشعارات</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          إنشاء إشعار جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الإشعارات</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المرسلة اليوم</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">في الانتظار</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المشتركين</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>الإشعارات الأخيرة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{notification.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <Badge variant={notification.sent ? 'default' : 'secondary'}>
                      {notification.sent ? 'مرسل' : 'في الانتظار'}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {notification.recipients} متلقي
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!notification.sent && (
                    <Button size="sm">
                      <Send className="h-4 w-4 mr-1" />
                      إرسال
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    عرض
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;
