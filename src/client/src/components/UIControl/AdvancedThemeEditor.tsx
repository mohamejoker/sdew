
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { useUIControl } from '@/contexts/UIControlContext';
import {
  Palette, Type, Layout, Image, Code, Download, Upload, 
  Save, RotateCcw, Eye, Layers, Zap, Smartphone, Monitor,
  Settings2, Paintbrush, FileCode, Shuffle
} from 'lucide-react';

const AdvancedThemeEditor = () => {
  const { theme, settings, updateTheme, updateSettings, resetTheme, resetSettings } = useUIControl();
  const [customCSS, setCustomCSS] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const gradientPresets = [
    { name: 'الغروب', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { name: 'المحيط', value: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
    { name: 'النار', value: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
    { name: 'الليل', value: 'linear-gradient(135deg, #434343 0%, #000000 100%)' },
    { name: 'الربيع', value: 'linear-gradient(135deg, #a8caba 0%, #5d4e75 100%)' },
  ];

  const componentStyles = [
    { name: 'الأزرار', key: 'buttons' },
    { name: 'الكروت', key: 'cards' },
    { name: 'النماذج', key: 'forms' },
    { name: 'القوائم', key: 'navigation' },
    { name: 'التذييل', key: 'footer' },
  ];

  const exportTheme = () => {
    const themeData = {
      theme,
      settings,
      customCSS,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme-${Date.now()}.json`;
    a.click();
  };

  const importTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const themeData = JSON.parse(e.target?.result as string);
          if (themeData.theme) updateTheme(themeData.theme);
          if (themeData.settings) updateSettings(themeData.settings);
          if (themeData.customCSS) setCustomCSS(themeData.customCSS);
        } catch (error) {
          console.error('خطأ في استيراد الثيم:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* أدوات التحكم السريع */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Paintbrush className="h-5 w-5" />
              <span>محرر الثيم المتقدم</span>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button size="sm" variant="outline" onClick={() => setPreviewMode(!previewMode)}>
                <Eye className="h-4 w-4 ml-2" />
                {previewMode ? 'إيقاف المعاينة' : 'معاينة مباشرة'}
              </Button>
              <Button size="sm" variant="outline" onClick={exportTheme}>
                <Download className="h-4 w-4 ml-2" />
                تصدير
              </Button>
              <label className="cursor-pointer">
                <Button size="sm" variant="outline" asChild>
                  <span>
                    <Upload className="h-4 w-4 ml-2" />
                    استيراد
                  </span>
                </Button>
                <input type="file" accept=".json" onChange={importTheme} className="hidden" />
              </label>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={resetTheme} variant="outline" className="h-20 flex-col">
              <RotateCcw className="h-6 w-6 mb-2" />
              <span>إعادة تعيين الثيم</span>
            </Button>
            <Button onClick={resetSettings} variant="outline" className="h-20 flex-col">
              <Settings2 className="h-6 w-6 mb-2" />
              <span>إعادة تعيين الإعدادات</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Shuffle className="h-6 w-6 mb-2" />
              <span>ثيم عشوائي</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Layers className="h-6 w-6 mb-2" />
              <span>نسخ الستايل</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="colors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-white p-1 rounded-xl shadow-sm">
          <TabsTrigger value="colors">الألوان</TabsTrigger>
          <TabsTrigger value="layout">التخطيط</TabsTrigger>
          <TabsTrigger value="typography">الخطوط</TabsTrigger>
          <TabsTrigger value="effects">التأثيرات</TabsTrigger>
          <TabsTrigger value="components">المكونات</TabsTrigger>
          <TabsTrigger value="advanced">متقدم</TabsTrigger>
        </TabsList>

        {/* تبويب الألوان المتقدم */}
        <TabsContent value="colors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>نظام الألوان المتقدم</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* منتقي الألوان الذكي */}
                <div className="space-y-3">
                  <Label>اللون الأساسي</Label>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Input
                      type="color"
                      value={theme.primaryColor}
                      onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={theme.primaryColor}
                      onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                      className="flex-1"
                    />
                    <Button size="sm" variant="outline">
                      <Shuffle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* خلفيات متدرجة */}
                <div className="space-y-3">
                  <Label>خلفيات متدرجة مسبقة</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {gradientPresets.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => updateSettings({ heroBackground: preset.value })}
                        className="p-3 rounded-lg border-2 hover:border-blue-500 transition-colors"
                        style={{ background: preset.value }}
                      >
                        <span className="text-white text-xs font-medium drop-shadow">
                          {preset.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* تدرجات ألوان تلقائية */}
                <div className="space-y-3">
                  <Label>تدرجات تلقائية</Label>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button size="sm" variant="outline">فاتح</Button>
                    <Button size="sm" variant="outline">متوسط</Button>
                    <Button size="sm" variant="outline">داكن</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>معاينة الألوان المباشرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div 
                    className="p-6 rounded-lg"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    <h3 className="text-white font-bold mb-2">عنوان بالألوان الجديدة</h3>
                    <p className="text-white/80 text-sm">
                      نص تجريبي لمعاينة الألوان الجديدة
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div 
                      className="p-3 rounded text-center text-white text-sm"
                      style={{ backgroundColor: theme.secondaryColor }}
                    >
                      ثانوي
                    </div>
                    <div 
                      className="p-3 rounded text-center text-white text-sm"
                      style={{ backgroundColor: settings.accentColor }}
                    >
                      تمييز
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* تبويب التخطيط المتقدم */}
        <TabsContent value="layout" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>تخطيط الصفحة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>عرض الحاوية: {settings.containerWidth}</Label>
                  <Select 
                    value={settings.containerWidth} 
                    onValueChange={(value) => updateSettings({ containerWidth: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1140px">1140px - صغير</SelectItem>
                      <SelectItem value="1200px">1200px - متوسط</SelectItem>
                      <SelectItem value="1320px">1320px - كبير</SelectItem>
                      <SelectItem value="100%">100% - عرض كامل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>ارتفاع الهيدر: {settings.headerHeight}</Label>
                  <Slider
                    value={[parseInt(settings.headerHeight)]}
                    onValueChange={([value]) => updateSettings({ headerHeight: `${value}px` })}
                    min={60}
                    max={120}
                    step={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label>المسافات العامة</Label>
                  <Select
                    value={settings.spacing}
                    onValueChange={(value) => updateSettings({ spacing: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5rem">مضغوط</SelectItem>
                      <SelectItem value="1rem">عادي</SelectItem>
                      <SelectItem value="1.5rem">مريح</SelectItem>
                      <SelectItem value="2rem">واسع</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تخطيط الأجهزة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Monitor className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">سطح المكتب</p>
                    <Switch defaultChecked />
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Smartphone className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">المحمول</p>
                    <Switch defaultChecked />
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Smartphone className="h-8 w-8 mx-auto mb-2 rotate-90" />
                    <p className="text-sm font-medium">اللوحي</p>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* تبويب المكونات */}
        <TabsContent value="components" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تخصيص المكونات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {componentStyles.map((component) => (
                  <div key={component.key} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">{component.name}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs">لون الخلفية</Label>
                        <Input type="color" className="w-full h-8" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">لون النص</Label>
                        <Input type="color" className="w-full h-8" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">الحدود</Label>
                        <Input type="color" className="w-full h-8" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">الظل</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">بدون</SelectItem>
                            <SelectItem value="sm">خفيف</SelectItem>
                            <SelectItem value="md">متوسط</SelectItem>
                            <SelectItem value="lg">كبير</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب متقدم */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <FileCode className="h-5 w-5" />
                <span>CSS مخصص</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={customCSS}
                onChange={(e) => setCustomCSS(e.target.value)}
                placeholder="أدخل CSS مخصص هنا..."
                rows={10}
                className="font-mono text-sm"
              />
              <div className="flex justify-between items-center mt-4">
                <Button size="sm" variant="outline">
                  تحقق من الصحة
                </Button>
                <Button size="sm">
                  <Save className="h-4 w-4 ml-2" />
                  تطبيق CSS
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>إعدادات الأداء</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>تحسين الصور</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label>ضغط CSS</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label>تحميل كسول</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label>وضع التطوير</Label>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* باقي التبويبات موجودة في الملفات الأخرى */}
        <TabsContent value="typography">
          <div className="text-center py-8 text-gray-500">
            إعدادات الخطوط متوفرة في تبويب منفصل
          </div>
        </TabsContent>

        <TabsContent value="effects">
          <div className="text-center py-8 text-gray-500">
            إعدادات التأثيرات متوفرة في تبويب منفصل
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedThemeEditor;
