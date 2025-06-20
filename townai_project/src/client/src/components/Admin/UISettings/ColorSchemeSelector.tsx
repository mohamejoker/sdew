
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Palette } from 'lucide-react';

interface ColorScheme {
  name: string;
  value: string;
  primary: string;
  secondary: string;
}

interface ColorSchemeSelectorProps {
  colorScheme: string;
  setColorScheme: (scheme: string) => void;
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => void;
}

const colorSchemes: ColorScheme[] = [
  { name: 'أزرق', value: 'blue', primary: '#3B82F6', secondary: '#1E40AF' },
  { name: 'أخضر', value: 'green', primary: '#10B981', secondary: '#059669' },
  { name: 'بنفسجي', value: 'purple', primary: '#8B5CF6', secondary: '#7C3AED' },
  { name: 'وردي', value: 'pink', primary: '#EC4899', secondary: '#DB2777' },
  { name: 'برتقالي', value: 'orange', primary: '#F59E0B', secondary: '#D97706' }
];

const ColorSchemeSelector: React.FC<ColorSchemeSelectorProps> = ({
  colorScheme,
  setColorScheme,
  darkMode,
  setDarkMode
}) => {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Palette className="h-5 w-5" />
          <span>نظام الألوان المتقدم</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {colorSchemes.map((scheme) => (
            <div
              key={scheme.value}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                colorScheme === scheme.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setColorScheme(scheme.value)}
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: scheme.primary }}
                />
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: scheme.secondary }}
                />
                <span className="font-medium">{scheme.name}</span>
              </div>
              {colorScheme === scheme.value && (
                <Badge className="bg-blue-500">مُختار</Badge>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>الوضع المظلم</Label>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
          <div className="flex items-center justify-between">
            <Label>تدرج تلقائي للألوان</Label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <Label>حفظ ألوان المتصفح</Label>
            <Switch />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorSchemeSelector;
