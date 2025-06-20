
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useUIControl } from '@/contexts/UIControlContext';
import { Moon, Sun, Monitor } from 'lucide-react';

const ThemeSettings = () => {
  const { theme, updateTheme } = useUIControl();

  const themePresets = [
    {
      name: 'فاتح',
      icon: Sun,
      colors: {
        primaryColor: '#3B82F6',
        secondaryColor: '#1E40AF',
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937',
        darkMode: false
      }
    },
    {
      name: 'مظلم',
      icon: Moon,
      colors: {
        primaryColor: '#60A5FA',
        secondaryColor: '#3B82F6',
        backgroundColor: '#1F2937',
        textColor: '#F9FAFB',
        darkMode: true
      }
    },
    {
      name: 'تلقائي',
      icon: Monitor,
      colors: {
        primaryColor: '#3B82F6',
        secondaryColor: '#1E40AF',
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937',
        darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches
      }
    }
  ];

  const applyThemePreset = (preset: typeof themePresets[0]) => {
    updateTheme(preset.colors);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">الثيم العام</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-xs">الوضع المظلم</Label>
            <Switch
              checked={theme.darkMode}
              onCheckedChange={(checked) => updateTheme({ darkMode: checked })}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-xs">الثيمات المسبقة</Label>
            <div className="grid grid-cols-1 gap-2">
              {themePresets.map((preset, index) => {
                const IconComponent = preset.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => applyThemePreset(preset)}
                    className="flex items-center justify-start gap-3 p-3 h-auto"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{preset.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">معاينة الثيم</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="p-4 rounded-lg border-2 transition-all"
            style={{
              backgroundColor: theme.backgroundColor,
              color: theme.textColor,
              borderColor: theme.primaryColor
            }}
          >
            <h3 
              className="font-bold mb-2"
              style={{ color: theme.primaryColor }}
            >
              عنوان تجريبي
            </h3>
            <p className="text-sm mb-3">
              هذا نص تجريبي لمعاينة الثيم المختار
            </p>
            <div 
              className="px-3 py-1 rounded text-white text-xs inline-block"
              style={{ backgroundColor: theme.secondaryColor }}
            >
              زر تجريبي
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeSettings;
