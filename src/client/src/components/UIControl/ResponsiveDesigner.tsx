
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  Eye,
  Settings,
  Maximize2,
  RotateCw,
  Ruler,
  Grid,
  Layout
} from 'lucide-react';

interface ResponsiveBreakpoint {
  name: string;
  key: string;
  icon: any;
  minWidth: number;
  maxWidth?: number;
  defaultSettings: {
    containerWidth: string;
    fontSize: number;
    spacing: number;
    columns: number;
    sidebarWidth: number;
  };
}

const ResponsiveDesigner = () => {
  const [selectedBreakpoint, setSelectedBreakpoint] = useState('desktop');
  const [previewWidth, setPreviewWidth] = useState(1200);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const breakpoints: ResponsiveBreakpoint[] = [
    {
      name: 'سطح المكتب',
      key: 'desktop',
      icon: Monitor,
      minWidth: 1200,
      defaultSettings: {
        containerWidth: '1200px',
        fontSize: 16,
        spacing: 24,
        columns: 4,
        sidebarWidth: 280
      }
    },
    {
      name: 'الجهاز اللوحي',
      key: 'tablet',
      icon: Tablet,
      minWidth: 768,
      maxWidth: 1199,
      defaultSettings: {
        containerWidth: '100%',
        fontSize: 15,
        spacing: 20,
        columns: 2,
        sidebarWidth: 240
      }
    },
    {
      name: 'الهاتف الكبير',
      key: 'mobile-lg',
      icon: Smartphone,
      minWidth: 480,
      maxWidth: 767,
      defaultSettings: {
        containerWidth: '100%',
        fontSize: 14,
        spacing: 16,
        columns: 1,
        sidebarWidth: 0
      }
    },
    {
      name: 'الهاتف الصغير',
      key: 'mobile-sm',
      icon: Smartphone,
      minWidth: 0,
      maxWidth: 479,
      defaultSettings: {
        containerWidth: '100%',
        fontSize: 13,
        spacing: 12,
        columns: 1,
        sidebarWidth: 0
      }
    }
  ];

  const [responsiveSettings, setResponsiveSettings] = useState<Record<string, any>>({
    desktop: breakpoints[0].defaultSettings,
    tablet: breakpoints[1].defaultSettings,
    'mobile-lg': breakpoints[2].defaultSettings,
    'mobile-sm': breakpoints[3].defaultSettings
  });

  const currentBreakpoint = breakpoints.find(bp => bp.key === selectedBreakpoint);
  const currentSettings = responsiveSettings[selectedBreakpoint];

  const updateSetting = (key: string, value: any) => {
    setResponsiveSettings(prev => ({
      ...prev,
      [selectedBreakpoint]: {
        ...prev[selectedBreakpoint],
        [key]: value
      }
    }));
  };

  const commonSizes = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone 12', width: 390, height: 844 },
    { name: 'iPad', width: 768, height: 1024 },
    { name: 'iPad Pro', width: 1024, height: 1366 },
    { name: 'Desktop HD', width: 1920, height: 1080 },
    { name: 'Desktop 4K', width: 3840, height: 2160 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">مصمم التجاوب</h3>
          <p className="text-gray-600">تخصيص الواجهة لجميع الأجهزة والشاشات</p>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button 
            variant={isPreviewMode ? "default" : "outline"}
            onClick={() => setIsPreviewMode(!isPreviewMode)}
          >
            <Eye className="h-4 w-4 ml-2" />
            {isPreviewMode ? 'إيقاف المعاينة' : 'معاينة مباشرة'}
          </Button>
          <Button variant="outline">
            <RotateCw className="h-4 w-4 ml-2" />
            تدوير الشاشة
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* قائمة نقاط الكسر */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Grid className="h-5 w-5 ml-2" />
              نقاط الكسر
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {breakpoints.map((breakpoint) => {
              const Icon = breakpoint.icon;
              return (
                <div
                  key={breakpoint.key}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedBreakpoint === breakpoint.key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedBreakpoint(breakpoint.key)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{breakpoint.name}</span>
                    </div>
                    {selectedBreakpoint === breakpoint.key && (
                      <Badge className="bg-blue-500">نشط</Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {breakpoint.minWidth}px
                    {breakpoint.maxWidth && ` - ${breakpoint.maxWidth}px`}
                    {!breakpoint.maxWidth && '+'}
                  </div>
                </div>
              );
            })}

            {/* أحجام شائعة */}
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">أحجام شائعة</h4>
              <div className="space-y-2">
                {commonSizes.map((size) => (
                  <Button
                    key={size.name}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between text-xs"
                    onClick={() => setPreviewWidth(size.width)}
                  >
                    <span>{size.name}</span>
                    <span className="text-gray-500">{size.width}×{size.height}</span>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* إعدادات التجاوب */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>إعدادات {currentBreakpoint?.name}</span>
                <Badge variant="outline">
                  {currentBreakpoint?.minWidth}px+
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* التخطيط العام */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center">
                  <Layout className="h-4 w-4 ml-2" />
                  التخطيط العام
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>عرض الحاوية</Label>
                    <Select
                      value={currentSettings?.containerWidth || '100%'}
                      onValueChange={(value) => updateSetting('containerWidth', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100%">عرض كامل</SelectItem>
                        <SelectItem value="1200px">1200px</SelectItem>
                        <SelectItem value="1400px">1400px</SelectItem>
                        <SelectItem value="1600px">1600px</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>عدد الأعمدة: {currentSettings?.columns || 1}</Label>
                    <Slider
                      value={[currentSettings?.columns || 1]}
                      onValueChange={(value) => updateSetting('columns', value[0])}
                      max={6}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>عرض الشريط الجانبي: {currentSettings?.sidebarWidth || 0}px</Label>
                  <Slider
                    value={[currentSettings?.sidebarWidth || 0]}
                    onValueChange={(value) => updateSetting('sidebarWidth', value[0])}
                    max={400}
                    min={0}
                    step={20}
                    className="w-full"
                  />
                </div>
              </div>

              {/* النص والخطوط */}
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-semibold">النص والخطوط</h4>
                
                <div className="space-y-2">
                  <Label>حجم الخط الأساسي: {currentSettings?.fontSize || 16}px</Label>
                  <Slider
                    value={[currentSettings?.fontSize || 16]}
                    onValueChange={(value) => updateSetting('fontSize', value[0])}
                    max={24}
                    min={10}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>المسافات: {currentSettings?.spacing || 16}px</Label>
                  <Slider
                    value={[currentSettings?.spacing || 16]}
                    onValueChange={(value) => updateSetting('spacing', value[0])}
                    max={48}
                    min={8}
                    step={4}
                    className="w-full"
                  />
                </div>
              </div>

              {/* إعدادات خاصة */}
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-semibold">إعدادات خاصة</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>إخفاء الشريط الجانبي</Label>
                    <Switch 
                      checked={currentSettings?.sidebarWidth === 0}
                      onCheckedChange={(checked) => updateSetting('sidebarWidth', checked ? 0 : 240)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>تكديس العناصر عمودياً</Label>
                    <Switch 
                      checked={currentSettings?.columns === 1}
                      onCheckedChange={(checked) => updateSetting('columns', checked ? 1 : 2)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>تصغير حجم الخط</Label>
                    <Switch 
                      checked={currentSettings?.fontSize < 16}
                      onCheckedChange={(checked) => updateSetting('fontSize', checked ? 14 : 16)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>تقليل المسافات</Label>
                    <Switch 
                      checked={currentSettings?.spacing < 20}
                      onCheckedChange={(checked) => updateSetting('spacing', checked ? 12 : 24)}
                    />
                  </div>
                </div>
              </div>

              {/* معاينة الكود */}
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-semibold">CSS المُولد</h4>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div>@media (min-width: {currentBreakpoint?.minWidth}px) {`{`}</div>
                  <div className="ml-4">
                    <div>  .container {`{ max-width: ${currentSettings?.containerWidth}; }`}</div>
                    <div>  .grid {`{ grid-template-columns: repeat(${currentSettings?.columns}, 1fr); }`}</div>
                    <div>  .sidebar {`{ width: ${currentSettings?.sidebarWidth}px; }`}</div>
                    <div>  html {`{ font-size: ${currentSettings?.fontSize}px; }`}</div>
                    <div>  .spacing {`{ gap: ${currentSettings?.spacing}px; }`}</div>
                  </div>
                  <div>{`}`}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* المعاينة */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>المعاينة</span>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Ruler className="h-4 w-4" />
                <span className="text-sm">{previewWidth}px</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* تحكم في عرض المعاينة */}
            <div className="space-y-2">
              <Label>عرض المعاينة: {previewWidth}px</Label>
              <Slider
                value={[previewWidth]}
                onValueChange={(value) => setPreviewWidth(value[0])}
                max={1920}
                min={320}
                step={10}
                className="w-full"
              />
            </div>

            {/* إطار المعاينة */}
            <div className="border rounded-lg overflow-hidden">
              <div 
                className="bg-white transition-all duration-300"
                style={{ 
                  width: `${Math.min(previewWidth, 300)}px`,
                  height: '400px',
                  transform: `scale(${Math.min(300 / previewWidth, 1)})`,
                  transformOrigin: 'top left'
                }}
              >
                {/* محتوى المعاينة */}
                <div className="p-4 h-full">
                  <div className="bg-blue-500 text-white p-2 rounded mb-4 text-xs">
                    Header
                  </div>
                  
                  <div className="grid gap-2 mb-4" style={{
                    gridTemplateColumns: `repeat(${Math.min(currentSettings?.columns || 1, 3)}, 1fr)`
                  }}>
                    {Array.from({ length: currentSettings?.columns || 1 }).map((_, i) => (
                      <div key={i} className="bg-gray-200 p-2 rounded text-xs">
                        محتوى {i + 1}
                      </div>
                    ))}
                  </div>
                  
                  {currentSettings?.sidebarWidth > 0 && previewWidth > 768 && (
                    <div className="bg-gray-300 p-2 rounded text-xs mb-4">
                      شريط جانبي
                    </div>
                  )}
                  
                  <div className="bg-gray-500 text-white p-2 rounded text-xs mt-auto">
                    Footer
                  </div>
                </div>
              </div>
            </div>

            {/* معلومات الجهاز */}
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span>نقطة الكسر:</span>
                <span>{currentBreakpoint?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>العرض:</span>
                <span>{previewWidth}px</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>الأعمدة:</span>
                <span>{currentSettings?.columns}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>حجم الخط:</span>
                <span>{currentSettings?.fontSize}px</span>
              </div>
            </div>

            {/* أزرار سريعة */}
            <div className="space-y-2 pt-4 border-t">
              <Button size="sm" className="w-full" variant="outline">
                <Settings className="h-4 w-4 ml-2" />
                إعدادات متقدمة
              </Button>
              <Button size="sm" className="w-full" variant="outline">
                <Maximize2 className="h-4 w-4 ml-2" />
                معاينة ملء الشاشة
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResponsiveDesigner;
