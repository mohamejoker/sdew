import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Palette,
  Type,
  Layout,
  Monitor,
  Settings,
  Download,
  Upload,
  Save,
  Layers
} from 'lucide-react';
import ThemeManager from '../ThemeManager';
import AdvancedThemeEditor from '../../UIControl/AdvancedThemeEditor';
import ColorSchemeSelector from './ColorSchemeSelector';
import FontSettingsPanel from './FontSettingsPanel';
import ResponsiveSettings from './ResponsiveSettings';

const UISettingsPanel = () => {
  const [activeTab, setActiveTab] = useState('themes');
  const [colorScheme, setColorScheme] = useState('blue');
  const [fontSize, setFontSize] = useState([16]);
  const [borderRadius, setBorderRadius] = useState([8]);
  const [darkMode, setDarkMode] = useState(false);

  // إحصائيات سريعة
  const stats = [
    { title: 'الثيمات النشطة', value: '3', color: 'from-blue-500 to-blue-600', icon: Palette },
    { title: 'صفحات محسنة', value: '12', color: 'from-green-500 to-green-600', icon: Layout },
    { title: 'تخصيصات CSS', value: '8', color: 'from-purple-500 to-purple-600', icon: Settings },
    { title: 'سرعة التحميل', value: '95%', color: 'from-orange-500 to-orange-600', icon: Monitor }
  ];

  return (
    <div className="space-y-6">
      {/* Header محسن */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            مركز التحكم في الواجهة المتقدم
          </h2>
          <p className="text-gray-600 mt-2">تحكم كامل ومتقدم في تصميم ومظهر الموقع</p>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button variant="outline">
            <Download className="h-4 w-4 ml-2" />
            تصدير الإعدادات
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 ml-2" />
            استيراد إعدادات
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-600">
            <Save className="h-4 w-4 ml-2" />
            حفظ جميع التغييرات
          </Button>
        </div>
      </div>

      {/* إحصائيات سريعة محسنة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className={`bg-gradient-to-r ${stat.color} text-white border-0`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <IconComponent className="h-8 w-8 text-white/80" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-white rounded-xl shadow-sm p-1">
          <TabsTrigger value="themes" className="rounded-lg">
            <Layers className="h-4 w-4 ml-2" />
            إدارة الثيمات
          </TabsTrigger>
          <TabsTrigger value="colors" className="rounded-lg">
            <Palette className="h-4 w-4 ml-2" />
            الألوان
          </TabsTrigger>
          <TabsTrigger value="typography" className="rounded-lg">
            <Type className="h-4 w-4 ml-2" />
            الخطوط
          </TabsTrigger>
          <TabsTrigger value="layout" className="rounded-lg">
            <Layout className="h-4 w-4 ml-2" />
            التخطيط
          </TabsTrigger>
          <TabsTrigger value="responsive" className="rounded-lg">
            <Monitor className="h-4 w-4 ml-2" />
            التجاوب
          </TabsTrigger>
          <TabsTrigger value="advanced" className="rounded-lg">
            <Settings className="h-4 w-4 ml-2" />
            متقدم
          </TabsTrigger>
        </TabsList>

        {/* تبويب إدارة الثيمات */}
        <TabsContent value="themes">
          <ThemeManager />
        </TabsContent>

        {/* تبويب الألوان */}
        <TabsContent value="colors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ColorSchemeSelector
              colorScheme={colorScheme}
              setColorScheme={setColorScheme}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">معاينة الألوان المباشرة</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                    <h3 className="font-bold">عنوان رئيسي</h3>
                    <p className="text-blue-100">نص توضيحي للمعاينة</p>
                  </div>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button className="bg-blue-500">زر أساسي</Button>
                    <Button variant="outline">زر ثانوي</Button>
                    <Button variant="ghost">زر شفاف</Button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="p-2 bg-green-100 text-green-800 rounded">نجاح</div>
                    <div className="p-2 bg-yellow-100 text-yellow-800 rounded">تحذير</div>
                    <div className="p-2 bg-red-100 text-red-800 rounded">خطأ</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* تبويب الخطوط */}
        <TabsContent value="typography">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FontSettingsPanel
              fontSize={fontSize}
              setFontSize={setFontSize}
              borderRadius={borderRadius}
              setBorderRadius={setBorderRadius}
            />

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">معاينة الخطوط</h3>
                <div className="space-y-4">
                  <div style={{ fontSize: `${fontSize[0] * 2}px` }} className="font-bold">
                    عنوان كبير
                  </div>
                  <div style={{ fontSize: `${fontSize[0] * 1.5}px` }} className="font-semibold">
                    عنوان متوسط
                  </div>
                  <div style={{ fontSize: `${fontSize[0]}px` }}>
                    نص عادي للقراءة العامة والمحتوى الأساسي للموقع
                  </div>
                  <div style={{ fontSize: `${fontSize[0] * 0.875}px` }} className="text-gray-600">
                    نص صغير للملاحظات والتفاصيل الإضافية
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="layout">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responsive">
          <ResponsiveSettings />
        </TabsContent>

        <TabsContent value="advanced">
          <AdvancedThemeEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UISettingsPanel;
