
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Paintbrush, 
  Layers, 
  Type, 
  Box, 
  MousePointer,
  Eye,
  Code,
  Copy,
  RotateCcw,
  Wand2
} from 'lucide-react';

interface ComponentStyle {
  name: string;
  selector: string;
  properties: {
    backgroundColor?: string;
    color?: string;
    border?: string;
    borderRadius?: number;
    padding?: string;
    margin?: string;
    fontSize?: number;
    fontWeight?: string;
    boxShadow?: string;
    opacity?: number;
    transform?: string;
  };
  states: {
    hover?: Partial<ComponentStyle['properties']>;
    active?: Partial<ComponentStyle['properties']>;
    focus?: Partial<ComponentStyle['properties']>;
  };
}

const ComponentStyler = () => {
  const [selectedComponent, setSelectedComponent] = useState('button');
  const [selectedState, setSelectedState] = useState('normal');
  const [customCSS, setCustomCSS] = useState('');

  const components = [
    { id: 'button', name: 'الأزرار', icon: MousePointer },
    { id: 'card', name: 'البطاقات', icon: Box },
    { id: 'input', name: 'حقول الإدخال', icon: Type },
    { id: 'header', name: 'الرأس', icon: Layers },
    { id: 'footer', name: 'التذييل', icon: Layers },
    { id: 'sidebar', name: 'الشريط الجانبي', icon: Layers }
  ];

  const [styles, setStyles] = useState<Record<string, ComponentStyle>>({
    button: {
      name: 'الأزرار',
      selector: '.btn, button',
      properties: {
        backgroundColor: '#3B82F6',
        color: '#FFFFFF',
        borderRadius: 8,
        padding: '12px 24px',
        fontSize: 16,
        fontWeight: '500',
        border: 'none',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      },
      states: {
        hover: {
          backgroundColor: '#2563EB',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
        },
        active: {
          transform: 'translateY(0)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }
      }
    },
    card: {
      name: 'البطاقات',
      selector: '.card',
      properties: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: '24px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        border: '1px solid #E5E7EB'
      },
      states: {
        hover: {
          boxShadow: '0 8px 12px rgba(0,0,0,0.1)',
          transform: 'translateY(-2px)'
        }
      }
    }
  });

  const currentStyle = styles[selectedComponent];

  const updateProperty = (property: string, value: any) => {
    setStyles(prev => ({
      ...prev,
      [selectedComponent]: {
        ...prev[selectedComponent],
        properties: {
          ...prev[selectedComponent].properties,
          [property]: value
        }
      }
    }));
  };

  const updateStateProperty = (state: string, property: string, value: any) => {
    setStyles(prev => ({
      ...prev,
      [selectedComponent]: {
        ...prev[selectedComponent],
        states: {
          ...prev[selectedComponent].states,
          [state]: {
            ...prev[selectedComponent].states[state],
            [property]: value
          }
        }
      }
    }));
  };

  const generateCSS = () => {
    let css = '';
    Object.values(styles).forEach(style => {
      css += `${style.selector} {\n`;
      Object.entries(style.properties).forEach(([prop, value]) => {
        const cssProperty = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
        if (typeof value === 'number' && ['border-radius', 'font-size'].includes(cssProperty)) {
          css += `  ${cssProperty}: ${value}px;\n`;
        } else {
          css += `  ${cssProperty}: ${value};\n`;
        }
      });
      css += '}\n\n';

      // حالات الـ hover والـ active
      Object.entries(style.states).forEach(([state, stateProps]) => {
        if (stateProps && Object.keys(stateProps).length > 0) {
          css += `${style.selector}:${state} {\n`;
          Object.entries(stateProps).forEach(([prop, value]) => {
            const cssProperty = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
            if (typeof value === 'number' && ['border-radius', 'font-size'].includes(cssProperty)) {
              css += `  ${cssProperty}: ${value}px;\n`;
            } else {
              css += `  ${cssProperty}: ${value};\n`;
            }
          });
          css += '}\n\n';
        }
      });
    });
    return css;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">مصمم المكونات</h3>
          <p className="text-gray-600">تخصيص شامل لجميع عناصر الواجهة</p>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button variant="outline">
            <Eye className="h-4 w-4 ml-2" />
            معاينة مباشرة
          </Button>
          <Button variant="outline">
            <Code className="h-4 w-4 ml-2" />
            عرض CSS
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* قائمة المكونات */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">المكونات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {components.map((component) => {
              const Icon = component.icon;
              return (
                <Button
                  key={component.id}
                  variant={selectedComponent === component.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedComponent(component.id)}
                >
                  <Icon className="h-4 w-4 ml-2" />
                  {component.name}
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* محرر الخصائص */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>تحرير {currentStyle?.name}</span>
                <Badge>{selectedState}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedState} onValueChange={setSelectedState} className="space-y-4">
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="normal">عادي</TabsTrigger>
                  <TabsTrigger value="hover">تمرير</TabsTrigger>
                  <TabsTrigger value="active">نشط</TabsTrigger>
                  <TabsTrigger value="focus">تركيز</TabsTrigger>
                </TabsList>

                <TabsContent value="normal" className="space-y-4">
                  {/* الألوان */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">الألوان</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>لون الخلفية</Label>
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <Input
                            type="color"
                            value={currentStyle?.properties.backgroundColor || '#3B82F6'}
                            onChange={(e) => updateProperty('backgroundColor', e.target.value)}
                            className="w-12 h-10 p-1"
                          />
                          <Input
                            value={currentStyle?.properties.backgroundColor || '#3B82F6'}
                            onChange={(e) => updateProperty('backgroundColor', e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>لون النص</Label>
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <Input
                            type="color"
                            value={currentStyle?.properties.color || '#FFFFFF'}
                            onChange={(e) => updateProperty('color', e.target.value)}
                            className="w-12 h-10 p-1"
                          />
                          <Input
                            value={currentStyle?.properties.color || '#FFFFFF'}
                            onChange={(e) => updateProperty('color', e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* الأبعاد */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">الأبعاد والمسافات</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>الحشو الداخلي</Label>
                        <Input
                          value={currentStyle?.properties.padding || '12px 24px'}
                          onChange={(e) => updateProperty('padding', e.target.value)}
                          placeholder="12px 24px"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>الهامش الخارجي</Label>
                        <Input
                          value={currentStyle?.properties.margin || '0'}
                          onChange={(e) => updateProperty('margin', e.target.value)}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>استدارة الحواف: {currentStyle?.properties.borderRadius || 8}px</Label>
                      <Slider
                        value={[currentStyle?.properties.borderRadius || 8]}
                        onValueChange={(value) => updateProperty('borderRadius', value[0])}
                        max={50}
                        min={0}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* النص */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">النص</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>حجم الخط: {currentStyle?.properties.fontSize || 16}px</Label>
                        <Slider
                          value={[currentStyle?.properties.fontSize || 16]}
                          onValueChange={(value) => updateProperty('fontSize', value[0])}
                          max={32}
                          min={8}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>وزن الخط</Label>
                        <Select
                          value={currentStyle?.properties.fontWeight || '500'}
                          onValueChange={(value) => updateProperty('fontWeight', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="300">خفيف (300)</SelectItem>
                            <SelectItem value="400">عادي (400)</SelectItem>
                            <SelectItem value="500">متوسط (500)</SelectItem>
                            <SelectItem value="600">نصف عريض (600)</SelectItem>
                            <SelectItem value="700">عريض (700)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* التأثيرات */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">التأثيرات</h4>
                    <div className="space-y-2">
                      <Label>الظل</Label>
                      <Select
                        value={currentStyle?.properties.boxShadow || '0 2px 4px rgba(0,0,0,0.1)'}
                        onValueChange={(value) => updateProperty('boxShadow', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">بدون ظل</SelectItem>
                          <SelectItem value="0 1px 2px rgba(0,0,0,0.05)">ظل خفيف</SelectItem>
                          <SelectItem value="0 2px 4px rgba(0,0,0,0.1)">ظل متوسط</SelectItem>
                          <SelectItem value="0 4px 8px rgba(0,0,0,0.15)">ظل قوي</SelectItem>
                          <SelectItem value="0 8px 16px rgba(0,0,0,0.2)">ظل كبير</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                {/* تبويبات الحالات الأخرى */}
                <TabsContent value="hover" className="space-y-4">
                  <div className="text-center py-8">
                    <Wand2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h4 className="font-semibold mb-2">تخصيص حالة التمرير</h4>
                    <p className="text-gray-600 mb-4">تحديد شكل العنصر عند تمرير الماوس عليه</p>
                    <Button>ابدأ التخصيص</Button>
                  </div>
                </TabsContent>

                <TabsContent value="active" className="space-y-4">
                  <div className="text-center py-8">
                    <MousePointer className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h4 className="font-semibold mb-2">تخصيص حالة النشاط</h4>
                    <p className="text-gray-600 mb-4">تحديد شكل العنصر عند الضغط عليه</p>
                    <Button>ابدأ التخصيص</Button>
                  </div>
                </TabsContent>

                <TabsContent value="focus" className="space-y-4">
                  <div className="text-center py-8">
                    <Eye className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h4 className="font-semibold mb-2">تخصيص حالة التركيز</h4>
                    <p className="text-gray-600 mb-4">تحديد شكل العنصر عند التركيز عليه</p>
                    <Button>ابدأ التخصيص</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* CSS المخصص */}
          <Card>
            <CardHeader>
              <CardTitle>CSS مخصص</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={customCSS}
                onChange={(e) => setCustomCSS(e.target.value)}
                placeholder="أضف CSS مخصص هنا..."
                rows={6}
                className="font-mono text-sm"
              />
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button size="sm" variant="outline">
                  <Copy className="h-4 w-4 ml-2" />
                  نسخ الكود
                </Button>
                <Button size="sm" variant="outline">
                  <RotateCcw className="h-4 w-4 ml-2" />
                  إعادة تعيين
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* المعاينة */}
        <Card>
          <CardHeader>
            <CardTitle>المعاينة المباشرة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedComponent === 'button' && (
              <div className="space-y-3">
                <button
                  style={{
                    backgroundColor: currentStyle?.properties.backgroundColor,
                    color: currentStyle?.properties.color,
                    borderRadius: `${currentStyle?.properties.borderRadius}px`,
                    padding: currentStyle?.properties.padding,
                    fontSize: `${currentStyle?.properties.fontSize}px`,
                    fontWeight: currentStyle?.properties.fontWeight,
                    border: currentStyle?.properties.border || 'none',
                    boxShadow: currentStyle?.properties.boxShadow,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  className="block w-full"
                >
                  زر تجريبي
                </button>
                <button
                  style={{
                    backgroundColor: currentStyle?.properties.backgroundColor,
                    color: currentStyle?.properties.color,
                    borderRadius: `${currentStyle?.properties.borderRadius}px`,
                    padding: currentStyle?.properties.padding,
                    fontSize: `${currentStyle?.properties.fontSize}px`,
                    fontWeight: currentStyle?.properties.fontWeight,
                    border: '2px solid transparent',
                    boxShadow: currentStyle?.properties.boxShadow,
                    cursor: 'pointer',
                    opacity: 0.8
                  }}
                  className="block w-full"
                >
                  زر ثانوي
                </button>
                <button
                  style={{
                    backgroundColor: 'transparent',
                    color: currentStyle?.properties.backgroundColor,
                    borderRadius: `${currentStyle?.properties.borderRadius}px`,
                    padding: currentStyle?.properties.padding,
                    fontSize: `${currentStyle?.properties.fontSize}px`,
                    fontWeight: currentStyle?.properties.fontWeight,
                    border: `2px solid ${currentStyle?.properties.backgroundColor}`,
                    cursor: 'pointer'
                  }}
                  className="block w-full"
                >
                  زر محدود
                </button>
              </div>
            )}

            {selectedComponent === 'card' && (
              <div
                style={{
                  backgroundColor: currentStyle?.properties.backgroundColor,
                  borderRadius: `${currentStyle?.properties.borderRadius}px`,
                  padding: currentStyle?.properties.padding,
                  boxShadow: currentStyle?.properties.boxShadow,
                  border: currentStyle?.properties.border
                }}
              >
                <h4 className="font-semibold mb-2">عنوان البطاقة</h4>
                <p className="text-gray-600 text-sm">هذا نص تجريبي لمعاينة شكل البطاقة مع الإعدادات الحالية.</p>
              </div>
            )}

            <div className="pt-4 border-t">
              <Button size="sm" className="w-full" variant="outline">
                <Code className="h-4 w-4 ml-2" />
                تصدير CSS
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComponentStyler;
