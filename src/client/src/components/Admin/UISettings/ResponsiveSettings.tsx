
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Monitor, Tablet, Smartphone } from 'lucide-react';

const ResponsiveSettings = () => {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>إعدادات التجاوب المتقدمة</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 border rounded-lg">
            <Monitor className="h-12 w-12 mx-auto mb-3 text-blue-600" />
            <h3 className="font-semibold mb-2">سطح المكتب</h3>
            <p className="text-sm text-gray-600 mb-3">1200px وأكثر</p>
            <Switch className="mx-auto" />
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span>العرض الأقصى:</span>
                <span>1400px</span>
              </div>
              <div className="flex justify-between">
                <span>الهوامش:</span>
                <span>2rem</span>
              </div>
            </div>
          </div>

          <div className="text-center p-6 border rounded-lg">
            <Tablet className="h-12 w-12 mx-auto mb-3 text-green-600" />
            <h3 className="font-semibold mb-2">الجهاز اللوحي</h3>
            <p className="text-sm text-gray-600 mb-3">768px - 1199px</p>
            <Switch className="mx-auto" />
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span>العرض الأقصى:</span>
                <span>100%</span>
              </div>
              <div className="flex justify-between">
                <span>الهوامش:</span>
                <span>1.5rem</span>
              </div>
            </div>
          </div>

          <div className="text-center p-6 border rounded-lg">
            <Smartphone className="h-12 w-12 mx-auto mb-3 text-purple-600" />
            <h3 className="font-semibold mb-2">الهاتف المحمول</h3>
            <p className="text-sm text-gray-600 mb-3">أقل من 768px</p>
            <Switch className="mx-auto" />
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span>العرض الأقصى:</span>
                <span>100%</span>
              </div>
              <div className="flex justify-between">
                <span>الهوامش:</span>
                <span>1rem</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponsiveSettings;
