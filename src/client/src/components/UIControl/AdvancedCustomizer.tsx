
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useUIControl } from '@/contexts/UIControlContext';
import {
  Palette, Type, Layout, Image, Code, Download, Upload, 
  Save, RotateCcw, Eye, Layers, Zap, Smartphone, Monitor,
  Settings2, Paintbrush, FileCode, Shuffle, MousePointer,
  Move, RotateCw, Square, Circle, Triangle
} from 'lucide-react';

const AdvancedCustomizer = () => {
  const { settings, updateSettings, resetSettings } = useUIControl();
  const [dragEnabled, setDragEnabled] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const layoutComponents = [
    { id: 'hero', name: 'البانر الرئيسي', enabled: true },
    { id: 'services', name: 'قسم الخدمات', enabled: true },
    { id: 'features', name: 'قسم المميزات', enabled: true },
    { id: 'testimonials', name: 'آراء العملاء', enabled: true },
    { id: 'pricing', name: 'الأسعار', enabled: false },
    { id: 'contact', name: 'التواصل', enabled: true },
    { id: 'footer', name: 'التذييل', enabled: true }
  ];

  const animationPresets = [
    { name: 'لا شيء', value: 'none' },
    { name: 'انزلاق من اليسار', value: 'slide-left' },
    { name: 'انزلاق من اليمين', value: 'slide-right' },
    { name: 'تلاشي', value: 'fade' },
    { name: 'تكبير', value: 'scale' },
    { name: 'دوران', value: 'rotate' },
    { name: 'ارتداد', value: 'bounce' }
  ];

  const backgroundPatterns = [
    { name: 'لا شيء', value: 'none' },
    { name: 'نقاط', value: 'dots' },
    { name: 'خطوط', value: 'lines' },
    { name: 'شبكة', value: 'grid' },
    { name: 'موجات', value: 'waves' },
    { name: 'دوائر', value: 'circles' }
  ];

  return (
    <div className="space-y-6">
      {/* شريط الأدوات المتقدم */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <MousePointer className="h-5 w-5" />
              <span>محرر التخصيص المتقدم</span>
              <Badge className="bg-purple-100 text-purple-800">Pro</Badge>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button
                size="sm"
                variant={dragEnabled ? "default" : "outline"}
                onClick={() => setDragEnabled(!dragEnabled)}
              >
                <Move className="h-4 w-4 ml-2" />
                {dragEnabled ? 'إيقاف السحب' : 'تفعيل السحب'}
              </Button>
              <Button size="sm" variant="outline">
                <RotateCw className="h-4 w-4 ml-2" />
                تراجع
              </Button>
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 ml-2" />
                معاينة
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Button variant="outline" className="h-16 flex-col">
              <Square className="h-6 w-6 mb-1" />
              <span className="text-xs">إضافة قسم</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Circle className="h-6 w-6 mb-1" />
              <span className="text-xs">إضافة دائرة</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Type className="h-6 w-6 mb-1" />
              <span className="text-xs">إضافة نص</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Image className="h-6 w-6 mb-1" />
              <span className="text-xs">إضافة صورة</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Layout className="h-6 w-6 mb-1" />
              <span className="text-xs">شبكة</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Zap className="h-6 w-6 mb-1" />
              <span className="text-xs">تأثيرات</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="layout" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white p-1 rounded-xl shadow-sm">
          <TabsTrigger value="layout">التخطيط</TabsTrigger>
          <TabsTrigger value="animations">الحركات</TabsTrigger>
          <TabsTrigger value="backgrounds">الخلفيات</TabsTrigger>
          <TabsTrigger value="interactions">التفاعل</TabsTrigger>
          <TabsTrigger value="responsive">الاستجابة</TabsTrigger>
        </TabsList>

        {/* تبويب التخطيط المتقدم */}
        <TabsContent value="layout" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة أقسام الصفحة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {layoutComponents.map((component) => (
                  <div
                    key={component.id}
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedElement === component.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedElement(component.id)}
                  >
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">{component.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Switch defaultChecked={component.enabled} />
                      <Button size="sm" variant="ghost">
                        <Move className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>خصائص العنصر المحدد</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedElement ? (
                  <>
                    <div className="space-y-2">
                      <Label>العرض</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر العرض" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">عرض كامل</SelectItem>
                          <SelectItem value="container">حاوية</SelectItem>
                          <SelectItem value="narrow">ضيق</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>الهوامش: {settings.spacing}</Label>
                      <Slider
                        value={[parseInt(settings.spacing.replace('rem', ''))]}
                        onValueChange={([value]) => updateSettings({ spacing: `${value}rem` })}
                        min={0}
                        max={5}
                        step={0.5}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>لون الخلفية</Label>
                      <Input
                        type="color"
                        value={settings.backgroundColor}
                        onChange={(e) => updateSettings({ backgroundColor: e.target.value })}
                        className="h-10"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>نمط الحدود</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر النمط" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">بدون حدود</SelectItem>
                          <SelectItem value="solid">خط مستمر</SelectItem>
                          <SelectItem value="dashed">خط متقطع</SelectItem>
                          <SelectItem value="dotted">نقاط</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    اختر عنصراً لتحريره
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* تبويب الحركات */}
        <TabsContent value="animations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الحركة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>نوع الحركة</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الحركة" />
                    </SelectTrigger>
                    <SelectContent>
                      {animationPresets.map((preset) => (
                        <SelectItem key={preset.value} value={preset.value}>
                          {preset.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>مدة الحركة (ثانية): 0.3</Label>
                  <Slider
                    defaultValue={[0.3]}
                    min={0.1}
                    max={2}
                    step={0.1}
                  />
                </div>

                <div className="space-y-2">
                  <Label>التأخير (ثانية): 0</Label>
                  <Slider
                    defaultValue={[0]}
                    min={0}
                    max={1}
                    step={0.1}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>تكرار الحركة</Label>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <Label>حركة عند التمرير</Label>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>معاينة الحركة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold animate-bounce">
                    عنصر متحرك
                  </div>
                  <Button className="w-full">
                    تشغيل المعاينة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* تبويب الخلفيات */}
        <TabsContent value="backgrounds" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>أنماط الخلفية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>نمط الخلفية</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر النمط" />
                    </SelectTrigger>
                    <SelectContent>
                      {backgroundPatterns.map((pattern) => (
                        <SelectItem key={pattern.value} value={pattern.value}>
                          {pattern.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>الشفافية: 100%</Label>
                  <Slider
                    defaultValue={[100]}
                    min={0}
                    max={100}
                    step={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label>حجم النمط: متوسط</Label>
                  <Slider
                    defaultValue={[50]}
                    min={10}
                    max={100}
                    step={10}
                  />
                </div>

                <div className="space-y-2">
                  <Label>لون النمط</Label>
                  <Input type="color" defaultValue="#3B82F6" className="h-10" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الخلفيات المتدرجة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
                  ].map((gradient, index) => (
                    <button
                      key={index}
                      className="aspect-square rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors"
                      style={{ background: gradient }}
                    />
                  ))}
                </div>

                <div className="space-y-2">
                  <Label>اتجاه التدرج</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الاتجاه" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="to-right">يسار إلى يمين</SelectItem>
                      <SelectItem value="to-left">يمين إلى يسار</SelectItem>
                      <SelectItem value="to-bottom">أعلى إلى أسفل</SelectItem>
                      <SelectItem value="to-top">أسفل إلى أعلى</SelectItem>
                      <SelectItem value="to-br">قطري</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* تبويب التفاعل */}
        <TabsContent value="interactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات التفاعل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">تأثيرات التمرير</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>تكبير عند التمرير</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>تغيير اللون</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>إضافة ظل</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>دوران خفيف</Label>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">تأثيرات النقر</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>موجة عند النقر</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>اهتزاز خفيف</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>تغيير فوري</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>صوت التفاعل</Label>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب الاستجابة */}
        <TabsContent value="responsive" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { device: 'سطح المكتب', icon: Monitor, size: '1200px+' },
              { device: 'الجهاز اللوحي', icon: Smartphone, size: '768px-1199px', rotate: true },
              { device: 'الهاتف المحمول', icon: Smartphone, size: '0px-767px' }
            ].map((device, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                    <device.icon className={`h-5 w-5 ${device.rotate ? 'rotate-90' : ''}`} />
                    <span>{device.device}</span>
                  </CardTitle>
                  <p className="text-sm text-gray-500">{device.size}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>عرض الحاوية</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر العرض" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">100%</SelectItem>
                        <SelectItem value="container">حاوية</SelectItem>
                        <SelectItem value="fixed">ثابت</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>الهوامش</Label>
                    <Slider defaultValue={[16]} min={0} max={48} step={4} />
                  </div>

                  <div className="space-y-2">
                    <Label>حجم الخط</Label>
                    <Slider defaultValue={[16]} min={12} max={24} step={1} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>إخفاء على هذا الجهاز</Label>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedCustomizer;
