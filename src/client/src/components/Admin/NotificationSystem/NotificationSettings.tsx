
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const NotificationSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>إعدادات الإشعارات</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <Label className="text-base font-medium">إشعارات البريد الإلكتروني</Label>
            <p className="text-sm text-gray-500">إرسال الإشعارات عبر البريد الإلكتروني</p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <Label className="text-base font-medium">إشعارات الهاتف</Label>
            <p className="text-sm text-gray-500">إرسال الإشعارات عبر الرسائل النصية</p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <Label className="text-base font-medium">الإشعارات الفورية</Label>
            <p className="text-sm text-gray-500">إشعارات مباشرة في التطبيق</p>
          </div>
          <Switch defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
