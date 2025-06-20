
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useUIControl } from '@/contexts/UIControlContext';

const TypographySettings = () => {
  const { settings, updateSettings } = useUIControl();

  const fontFamilies = [
    { value: 'Cairo', label: 'Cairo (عربي)' },
    { value: 'Inter', label: 'Inter (إنجليزي)' },
    { value: 'Tajawal', label: 'Tajawal (عربي)' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Open Sans', label: 'Open Sans' },
    { value: 'Lato', label: 'Lato' },
    { value: 'Montserrat', label: 'Montserrat' },
  ];

  const fontWeights = [
    { value: '300', label: 'خفيف' },
    { value: '400', label: 'عادي' },
    { value: '500', label: 'متوسط' },
    { value: '600', label: 'نصف عريض' },
    { value: '700', label: 'عريض' },
    { value: '800', label: 'عريض جداً' },
  ];

  const fontSizeValue = parseInt(settings.fontSize.replace('px', ''));
  const lineHeightValue = parseFloat(settings.lineHeight);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">الخط الأساسي</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs">نوع الخط</Label>
            <Select
              value={settings.fontFamily}
              onValueChange={(value) => updateSettings({ fontFamily: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontFamilies.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <span style={{ fontFamily: font.value }}>{font.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs">وزن الخط</Label>
            <Select
              value={settings.fontWeight}
              onValueChange={(value) => updateSettings({ fontWeight: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontWeights.map((weight) => (
                  <SelectItem key={weight.value} value={weight.value}>
                    <span style={{ fontWeight: weight.value }}>{weight.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs">حجم الخط: {settings.fontSize}</Label>
            <Slider
              value={[fontSizeValue]}
              onValueChange={([value]) => updateSettings({ fontSize: `${value}px` })}
              min={12}
              max={24}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">ارتفاع السطر: {settings.lineHeight}</Label>
            <Slider
              value={[lineHeightValue]}
              onValueChange={([value]) => updateSettings({ lineHeight: value.toString() })}
              min={1.2}
              max={2.0}
              step={0.1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">معاينة الخط</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="p-4 border rounded-lg bg-gray-50"
            style={{
              fontFamily: settings.fontFamily,
              fontSize: settings.fontSize,
              fontWeight: settings.fontWeight,
              lineHeight: settings.lineHeight,
              color: settings.textColor,
            }}
          >
            <h3 className="text-lg mb-2">عنوان تجريبي</h3>
            <p>
              هذا نص تجريبي لمعاينة الخط المحدد. يمكنك رؤية كيف سيبدو النص في الموقع 
              باستخدام الإعدادات الحالية للخط والحجم والوزن.
            </p>
            <p className="mt-2 text-sm">
              This is sample English text to preview the selected font settings.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">خطوط Google الإضافية</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-gray-600 mb-2">
            لإضافة خطوط جديدة، قم بإدراج رابط الخط في إعدادات HTML
          </p>
          <div className="text-xs bg-gray-100 p-2 rounded">
            {'<link href="https://fonts.googleapis.com/css2?family=FontName:wght@300;400;500;600;700&display=swap" rel="stylesheet">'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TypographySettings;
