
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Type } from 'lucide-react';

interface FontSettingsPanelProps {
  fontSize: number[];
  setFontSize: (size: number[]) => void;
  borderRadius: number[];
  setBorderRadius: (radius: number[]) => void;
}

const fontFamilies = [
  { name: 'Cairo', value: 'Cairo, sans-serif' },
  { name: 'Tajawal', value: 'Tajawal, sans-serif' },
  { name: 'Amiri', value: 'Amiri, serif' },
  { name: 'Noto Sans Arabic', value: 'Noto Sans Arabic, sans-serif' }
];

const FontSettingsPanel: React.FC<FontSettingsPanelProps> = ({
  fontSize,
  setFontSize,
  borderRadius,
  setBorderRadius
}) => {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Type className="h-5 w-5" />
          <span>إعدادات الخطوط المتقدمة</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>عائلة الخط</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="اختر الخط" />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>حجم الخط الأساسي: {fontSize[0]}px</Label>
          <Slider
            value={fontSize}
            onValueChange={setFontSize}
            max={24}
            min={12}
            step={1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>استدارة الحواف: {borderRadius[0]}px</Label>
          <Slider
            value={borderRadius}
            onValueChange={setBorderRadius}
            max={20}
            min={0}
            step={1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>سُمك الخط</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="اختر سُمك الخط" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="300">خفيف</SelectItem>
              <SelectItem value="400">عادي</SelectItem>
              <SelectItem value="500">متوسط</SelectItem>
              <SelectItem value="600">سميك</SelectItem>
              <SelectItem value="700">عريض</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>تباعد الأسطر</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="اختر تباعد الأسطر" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1.2">ضيق</SelectItem>
              <SelectItem value="1.5">عادي</SelectItem>
              <SelectItem value="1.8">واسع</SelectItem>
              <SelectItem value="2.0">واسع جداً</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default FontSettingsPanel;
