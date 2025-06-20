
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useUIControl } from '@/contexts/UIControlContext';

const AnimationSettings = () => {
  const { settings, updateSettings } = useUIControl();

  const animationSpeedValue = parseInt(settings.animationSpeed.replace('ms', ''));

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">الحركات والتأثيرات</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-xs">تفعيل الحركات</Label>
            <Switch
              checked={settings.enableAnimations}
              onCheckedChange={(checked) => updateSettings({ enableAnimations: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">سرعة الحركة: {settings.animationSpeed}</Label>
            <Slider
              value={[animationSpeedValue]}
              onValueChange={([value]) => updateSettings({ animationSpeed: `${value}ms` })}
              min={100}
              max={1000}
              step={50}
              className="w-full"
              disabled={!settings.enableAnimations}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">نوع الانتقال</Label>
            <Select
              disabled={!settings.enableAnimations}
              defaultValue="ease-out"
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر نوع الانتقال" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ease">عادي</SelectItem>
                <SelectItem value="ease-in">بطيء ثم سريع</SelectItem>
                <SelectItem value="ease-out">سريع ثم بطيء</SelectItem>
                <SelectItem value="ease-in-out">بطيء-سريع-بطيء</SelectItem>
                <SelectItem value="linear">خطي</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">معاينة الحركات</CardTitle>
        </CardHeader>
        <CardContent>
          {settings.enableAnimations ? (
            <div className="space-y-3">
              <div 
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm transition-all duration-300 hover:scale-105"
                style={{ animationDuration: settings.animationSpeed }}
              >
                تحريك عند التمرير
              </div>
              <div 
                className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm animate-pulse"
                style={{ animationDuration: settings.animationSpeed }}
              >
                حركة النبض
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500 text-sm">
              الحركات معطلة
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">إعدادات متقدمة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-xs text-gray-600 space-y-2">
            <p>• الحركات تحسن تجربة المستخدم</p>
            <p>• قد تؤثر على الأداء في الأجهزة القديمة</p>
            <p>• يمكن تعطيلها لتوفير الطاقة</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnimationSettings;
