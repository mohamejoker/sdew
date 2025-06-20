
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useUIControl } from '@/contexts/UIControlContext';

const LayoutSettings = () => {
  const { settings, updateSettings } = useUIControl();

  const containerWidths = [
    { value: '1140px', label: 'صغير (1140px)' },
    { value: '1200px', label: 'متوسط (1200px)' },
    { value: '1320px', label: 'كبير (1320px)' },
    { value: '100%', label: 'كامل العرض' },
  ];

  const shadowLevels = [
    { value: 'none', label: 'بدون ظل' },
    { value: 'sm', label: 'ظل خفيف' },
    { value: 'medium', label: 'ظل متوسط' },
    { value: 'lg', label: 'ظل كبير' },
    { value: 'xl', label: 'ظل كبير جداً' },
  ];

  const borderRadiusValue = parseInt(settings.borderRadius.replace('px', ''));
  const headerHeightValue = parseInt(settings.headerHeight.replace('px', ''));
  const logoSizeValue = parseInt(settings.logoSize.replace('px', ''));

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">التخطيط العام</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs">عرض الحاوية</Label>
            <Select
              value={settings.containerWidth}
              onValueChange={(value) => updateSettings({ containerWidth: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {containerWidths.map((width) => (
                  <SelectItem key={width.value} value={width.value}>
                    {width.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs">انحناء الحواف: {settings.borderRadius}</Label>
            <Slider
              value={[borderRadiusValue]}
              onValueChange={([value]) => updateSettings({ borderRadius: `${value}px` })}
              min={0}
              max={30}
              step={2}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">مستوى الظل</Label>
            <Select
              value={settings.shadowLevel}
              onValueChange={(value) => updateSettings({ shadowLevel: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {shadowLevels.map((shadow) => (
                  <SelectItem key={shadow.value} value={shadow.value}>
                    {shadow.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">الهيدر</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs">ارتفاع الهيدر: {settings.headerHeight}</Label>
            <Slider
              value={[headerHeightValue]}
              onValueChange={([value]) => updateSettings({ headerHeight: `${value}px` })}
              min={60}
              max={120}
              step={5}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">حجم الشعار: {settings.logoSize}</Label>
            <Slider
              value={[logoSizeValue]}
              onValueChange={([value]) => updateSettings({ logoSize: `${value}px` })}
              min={120}
              max={250}
              step={10}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">المسافات</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs">المسافة الأساسية</Label>
            <Select
              value={settings.spacing}
              onValueChange={(value) => updateSettings({ spacing: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.5rem">صغيرة (0.5rem)</SelectItem>
                <SelectItem value="1rem">متوسطة (1rem)</SelectItem>
                <SelectItem value="1.5rem">كبيرة (1.5rem)</SelectItem>
                <SelectItem value="2rem">كبيرة جداً (2rem)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">معاينة التخطيط</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div 
              className="w-full bg-blue-100 p-2 text-center text-xs"
              style={{ 
                height: `${headerHeightValue/2}px`,
                borderRadius: settings.borderRadius 
              }}
            >
              هيدر
            </div>
            <div 
              className="w-full bg-gray-100 p-4 text-center text-xs"
              style={{ 
                maxWidth: settings.containerWidth === '100%' ? '100%' : '200px',
                margin: '0 auto',
                borderRadius: settings.borderRadius,
                boxShadow: settings.shadowLevel === 'none' ? 'none' : '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              محتوى الصفحة
            </div>
            <div 
              className="w-full bg-gray-800 p-2 text-center text-xs text-white"
              style={{ borderRadius: settings.borderRadius }}
            >
              فوتر
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LayoutSettings;
