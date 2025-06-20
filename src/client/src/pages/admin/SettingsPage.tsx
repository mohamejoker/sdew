
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Save } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">إعدادات النظام</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              الإعدادات العامة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">اسم الموقع</Label>
              <Input id="siteName" defaultValue="منصة التسويق الرقمي" />
            </div>
            
            <div>
              <Label htmlFor="siteDescription">وصف الموقع</Label>
              <Input id="siteDescription" defaultValue="أفضل منصة للتسويق الرقمي" />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance">وضع الصيانة</Label>
              <Switch id="maintenance" />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="registration">السماح بالتسجيل</Label>
              <Switch id="registration" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إعدادات الإشعارات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotifications">إشعارات البريد الإلكتروني</Label>
              <Switch id="emailNotifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="smsNotifications">إشعارات الرسائل النصية</Label>
              <Switch id="smsNotifications" />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="pushNotifications">الإشعارات الفورية</Label>
              <Switch id="pushNotifications" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button>
          <Save className="h-4 w-4 mr-2" />
          حفظ التغييرات
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
