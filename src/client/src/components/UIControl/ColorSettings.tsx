
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useUIControl } from '@/contexts/UIControlContext';

const ColorSettings = () => {
  const { settings, updateSettings } = useUIControl();

  const colorOptions = [
    { key: 'primaryColor', label: 'اللون الأساسي', value: settings.primaryColor },
    { key: 'secondaryColor', label: 'اللون الثانوي', value: settings.secondaryColor },
    { key: 'backgroundColor', label: 'لون الخلفية', value: settings.backgroundColor },
    { key: 'textColor', label: 'لون النص', value: settings.textColor },
    { key: 'accentColor', label: 'لون التمييز', value: settings.accentColor },
    { key: 'headerBackground', label: 'خلفية الهيدر', value: settings.headerBackground },
    { key: 'footerBackground', label: 'خلفية الفوتر', value: settings.footerBackground },
    { key: 'footerTextColor', label: 'نص الفوتر', value: settings.footerTextColor },
  ];

  const presetColors = {
    blue: { primary: '#3B82F6', secondary: '#8B5CF6', accent: '#10B981' },
    purple: { primary: '#8B5CF6', secondary: '#EC4899', accent: '#F59E0B' },
    green: { primary: '#10B981', secondary: '#3B82F6', accent: '#EF4444' },
    orange: { primary: '#F59E0B', secondary: '#EF4444', accent: '#8B5CF6' },
    dark: { primary: '#1F2937', secondary: '#374151', accent: '#6B7280' },
  };

  const applyPreset = (preset: keyof typeof presetColors) => {
    const colors = presetColors[preset];
    updateSettings({
      primaryColor: colors.primary,
      secondaryColor: colors.secondary,
      accentColor: colors.accent,
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">الألوان المخصصة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {colorOptions.map((color) => (
            <div key={color.key} className="space-y-2">
              <Label className="text-xs">{color.label}</Label>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Input
                  type="color"
                  value={color.value}
                  onChange={(e) => updateSettings({ [color.key]: e.target.value })}
                  className="w-12 h-8 p-1 border-2"
                />
                <Input
                  type="text"
                  value={color.value}
                  onChange={(e) => updateSettings({ [color.key]: e.target.value })}
                  className="flex-1 text-xs"
                  placeholder="#000000"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">الألوان المسبقة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(presetColors).map(([name, colors]) => (
              <button
                key={name}
                onClick={() => applyPreset(name as keyof typeof presetColors)}
                className="aspect-square rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors relative overflow-hidden"
                title={name}
              >
                <div 
                  className="w-full h-1/3" 
                  style={{ backgroundColor: colors.primary }}
                />
                <div 
                  className="w-full h-1/3" 
                  style={{ backgroundColor: colors.secondary }}
                />
                <div 
                  className="w-full h-1/3" 
                  style={{ backgroundColor: colors.accent }}
                />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">خلفيات الأقسام</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label className="text-xs">خلفية البانر الرئيسي</Label>
            <Input
              type="text"
              value={settings.heroBackground}
              onChange={(e) => updateSettings({ heroBackground: e.target.value })}
              placeholder="linear-gradient(...)"
              className="text-xs"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">خلفية قسم الخدمات</Label>
            <Input
              type="text"
              value={settings.servicesBackground}
              onChange={(e) => updateSettings({ servicesBackground: e.target.value })}
              className="text-xs"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">خلفية قسم الأسعار</Label>
            <Input
              type="text"
              value={settings.pricingBackground}
              onChange={(e) => updateSettings({ pricingBackground: e.target.value })}
              className="text-xs"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorSettings;
