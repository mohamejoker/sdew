
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Settings, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeControlPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
              <Palette className="h-6 w-6 text-white" />
            </div>
            إدارة الثيم
          </h1>
          <p className="text-gray-600 mt-2">تخصيص وإدارة مظهر النظام</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            استيراد ثيم
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            تصدير ثيم
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              الألوان الأساسية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">اللون الأساسي</label>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded"></div>
                    <span className="text-sm">#3B82F6</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">اللون الثانوي</label>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500 rounded"></div>
                    <span className="text-sm">#8B5CF6</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              إعدادات المظهر
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">نمط الثيم</label>
                <select className="w-full p-2 border rounded">
                  <option>فاتح</option>
                  <option>داكن</option>
                  <option>تلقائي</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">حجم الخط</label>
                <select className="w-full p-2 border rounded">
                  <option>صغير</option>
                  <option>متوسط</option>
                  <option>كبير</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>معاينة الثيم</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <h3 className="text-xl font-bold mb-4">مثال على التصميم</h3>
            <p className="text-gray-600 mb-4">هذا مثال على كيفية ظهور النصوص والعناصر مع الثيم الحالي.</p>
            <div className="flex gap-2">
              <Button>زر أساسي</Button>
              <Button variant="outline">زر ثانوي</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeControlPanel;
