
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor, Smartphone, Tablet, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const UISettingsPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl">
              <Monitor className="h-6 w-6 text-white" />
            </div>
            إعدادات واجهة المستخدم
          </h1>
          <p className="text-gray-600 mt-2">تخصيص تجربة المستخدم والواجهة</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              الإعدادات العامة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">الرسوم المتحركة</label>
                  <p className="text-xs text-gray-500">تفعيل التأثيرات البصرية</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">الأصوات</label>
                  <p className="text-xs text-gray-500">تفعيل أصوات النظام</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">الإشعارات الفورية</label>
                  <p className="text-xs text-gray-500">إشعارات على سطح المكتب</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              إعدادات الاستجابة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">معاينة الأجهزة</label>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Monitor className="h-4 w-4 mr-1" />
                    سطح المكتب
                  </Button>
                  <Button size="sm" variant="outline">
                    <Tablet className="h-4 w-4 mr-1" />
                    تابلت
                  </Button>
                  <Button size="sm" variant="outline">
                    <Smartphone className="h-4 w-4 mr-1" />
                    هاتف
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>معاينة التخطيط</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded border">
                <h4 className="font-medium mb-2">الشريط الجانبي</h4>
                <div className="space-y-2">
                  <div className="h-2 bg-blue-200 rounded"></div>
                  <div className="h-2 bg-blue-200 rounded"></div>
                  <div className="h-2 bg-blue-200 rounded"></div>
                </div>
              </div>
              <div className="bg-white p-4 rounded border md:col-span-2">
                <h4 className="font-medium mb-2">المحتوى الرئيسي</h4>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UISettingsPanel;
