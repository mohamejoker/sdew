
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, Monitor, Smartphone, Tablet, Eye, Save, 
  Download, Upload, RefreshCw, Palette, Layout, 
  Type, Image, Layers, Zap, Move, RotateCw, Code,
  Puzzle, Package, GitBranch
} from 'lucide-react';
import { useUIControl } from '@/contexts/UIControlContext';
import DragDropComponentManager from './DragDropComponentManager';
import LiveCSSEditor from './LiveCSSEditor';
import PluginSystem from './PluginSystem';
import ComponentExporter from './ComponentExporter';
import ThemeVersioning from './ThemeVersioning';

const DynamicUIController = () => {
  const { settings, updateSettings, theme, updateTheme, saveSettings } = useUIControl();
  const [activeDevice, setActiveDevice] = useState('desktop');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const components = [
    { id: 'hero', name: 'البانر الرئيسي', type: 'section', icon: Layout },
    { id: 'services', name: 'قسم الخدمات', type: 'section', icon: Layers },
    { id: 'navbar', name: 'شريط التنقل', type: 'navigation', icon: Settings },
    { id: 'footer', name: 'التذييل', type: 'section', icon: Layout },
    { id: 'pricing', name: 'الأسعار', type: 'section', icon: Zap },
  ];

  const devices = [
    { id: 'desktop', name: 'سطح المكتب', icon: Monitor, width: '1200px+' },
    { id: 'tablet', name: 'الجهاز اللوحي', icon: Tablet, width: '768px-1199px' },
    { id: 'mobile', name: 'الهاتف', icon: Smartphone, width: '0px-767px' },
  ];

  const handleFontSizeChange = (value: string) => {
    const numValue = parseInt(value) || 16;
    updateTheme({ fontSize: numValue });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Settings className="h-6 w-6" />
              <span>مركز التحكم الديناميكي المتقدم</span>
              <Badge className="bg-blue-100 text-blue-800">Pro v2.0</Badge>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                معاينة
              </Button>
              <Button size="sm" onClick={saveSettings}>
                <Save className="h-4 w-4 mr-2" />
                حفظ
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs defaultValue="layout" className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="layout">التخطيط</TabsTrigger>
          <TabsTrigger value="styling">التصميم</TabsTrigger>
          <TabsTrigger value="content">المحتوى</TabsTrigger>
          <TabsTrigger value="advanced">متقدم</TabsTrigger>
          <TabsTrigger value="drag-drop">السحب والإفلات</TabsTrigger>
          <TabsTrigger value="css-editor">محرر CSS</TabsTrigger>
          <TabsTrigger value="plugins">الإضافات</TabsTrigger>
          <TabsTrigger value="export">التصدير</TabsTrigger>
          <TabsTrigger value="versions">الإصدارات</TabsTrigger>
        </TabsList>

        {/* Device Selection */}
        <Card>
          <CardHeader>
            <CardTitle>اختيار الجهاز</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {devices.map((device) => (
                <Button
                  key={device.id}
                  variant={activeDevice === device.id ? "default" : "outline"}
                  onClick={() => setActiveDevice(device.id)}
                  className="flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <device.icon className="h-4 w-4" />
                  <span>{device.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <TabsContent value="layout" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Component Tree */}
            <Card>
              <CardHeader>
                <CardTitle>شجرة المكونات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {components.map((component) => (
                  <div
                    key={component.id}
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedComponent === component.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedComponent(component.id)}
                  >
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <component.icon className="h-5 w-5 text-blue-500" />
                      <div>
                        <span className="font-medium">{component.name}</span>
                        <p className="text-sm text-gray-500">{component.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Switch defaultChecked />
                      <Button size="sm" variant="ghost">
                        <Move className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Properties Panel */}
            <Card>
              <CardHeader>
                <CardTitle>خصائص المكون</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedComponent ? (
                  <>
                    <div className="space-y-2">
                      <Label>العرض</Label>
                      <select className="w-full px-3 py-2 border rounded-lg">
                        <option>عرض كامل</option>
                        <option>حاوية</option>
                        <option>مخصص</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label>الارتفاع</Label>
                      <Input placeholder="auto" />
                    </div>

                    <div className="space-y-2">
                      <Label>الهوامش</Label>
                      <div className="grid grid-cols-4 gap-2">
                        <Input placeholder="Top" />
                        <Input placeholder="Right" />
                        <Input placeholder="Bottom" />
                        <Input placeholder="Left" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>لون الخلفية</Label>
                      <Input type="color" defaultValue="#ffffff" />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>مرئي</Label>
                      <Switch defaultChecked />
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    اختر مكوناً لتحريره
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="styling" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>الألوان</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>اللون الأساسي</Label>
                  <Input 
                    type="color" 
                    value={theme.primaryColor || "#3b82f6"}
                    onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>اللون الثانوي</Label>
                  <Input 
                    type="color" 
                    value={theme.secondaryColor || "#6b7280"}
                    onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>لون النص</Label>
                  <Input 
                    type="color" 
                    value={theme.textColor || "#1f2937"}
                    onChange={(e) => updateTheme({ textColor: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الخطوط</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>نوع الخط</Label>
                  <select 
                    className="w-full px-3 py-2 border rounded-lg"
                    value={theme.fontFamily || "Inter"}
                    onChange={(e) => updateTheme({ fontFamily: e.target.value })}
                  >
                    <option value="Inter">Inter</option>
                    <option value="Cairo">Cairo</option>
                    <option value="Tajawal">Tajawal</option>
                    <option value="Amiri">Amiri</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>حجم الخط</Label>
                  <Input 
                    value={theme.fontSize?.toString() || "16"}
                    onChange={(e) => handleFontSizeChange(e.target.value)}
                    type="number"
                    min="12"
                    max="24"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>التأثيرات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>الحركات</Label>
                  <Switch 
                    checked={theme.animations === true}
                    onCheckedChange={(checked) => updateTheme({ animations: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>الظلال</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>التدرجات</Label>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>محرر المحتوى</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>عنوان الصفحة</Label>
                  <Input placeholder="عنوان الصفحة الرئيسية" />
                </div>
                <div className="space-y-2">
                  <Label>الوصف</Label>
                  <textarea 
                    className="w-full px-3 py-2 border rounded-lg min-h-[100px]"
                    placeholder="وصف الصفحة..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>الصورة الرئيسية</Label>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Input placeholder="رابط الصورة" />
                    <Button variant="outline">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>CSS مخصص</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea 
                  className="w-full px-3 py-2 border rounded-lg min-h-[200px] font-mono text-sm"
                  placeholder="/* أدخل CSS مخصص هنا */"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إعدادات متقدمة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>وضع المطور</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>التحميل التدريجي</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>تحسين الصور</Label>
                  <Switch defaultChecked />
                </div>
                <Button className="w-full" variant="outline">
                  <Code className="h-4 w-4 mr-2" />
                  تصدير الكود
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* New Advanced Features */}
        <TabsContent value="drag-drop">
          <DragDropComponentManager />
        </TabsContent>

        <TabsContent value="css-editor">
          <LiveCSSEditor />
        </TabsContent>

        <TabsContent value="plugins">
          <PluginSystem />
        </TabsContent>

        <TabsContent value="export">
          <ComponentExporter />
        </TabsContent>

        <TabsContent value="versions">
          <ThemeVersioning />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DynamicUIController;
