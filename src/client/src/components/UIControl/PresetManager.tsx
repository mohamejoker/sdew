
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Palette, 
  Download, 
  Upload, 
  Star, 
  Copy, 
  Trash2, 
  Plus,
  Eye,
  Settings,
  Crown,
  Sparkles
} from 'lucide-react';
import { useUIControl } from '@/contexts/UIControlContext';

interface ThemePreset {
  id: string;
  name: string;
  description: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  typography: {
    fontFamily: string;
    fontSize: string;
  };
  layout: {
    borderRadius: string;
    spacing: string;
  };
  category: 'business' | 'creative' | 'minimal' | 'dark' | 'colorful';
  isPremium: boolean;
  rating: number;
  downloads: number;
  author: string;
}

const PresetManager = () => {
  const { updateSettings } = useUIControl();
  const [selectedPreset, setSelectedPreset] = useState<ThemePreset | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const presets: ThemePreset[] = [
    {
      id: '1',
      name: 'الأزرق الكلاسيكي',
      description: 'ثيم أزرق أنيق ومهني',
      preview: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
      colors: {
        primary: '#3B82F6',
        secondary: '#1E40AF',
        accent: '#10B981',
        background: '#FFFFFF'
      },
      typography: {
        fontFamily: 'Cairo',
        fontSize: '16px'
      },
      layout: {
        borderRadius: '8px',
        spacing: '1rem'
      },
      category: 'business',
      isPremium: false,
      rating: 4.8,
      downloads: 1250,
      author: 'النظام'
    },
    {
      id: '2',
      name: 'الليل المظلم',
      description: 'ثيم مظلم مريح للعينين',
      preview: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)',
      colors: {
        primary: '#60A5FA',
        secondary: '#3B82F6',
        accent: '#34D399',
        background: '#111827'
      },
      typography: {
        fontFamily: 'Inter',
        fontSize: '16px'
      },
      layout: {
        borderRadius: '12px',
        spacing: '1.25rem'
      },
      category: 'dark',
      isPremium: false,
      rating: 4.9,
      downloads: 890,
      author: 'المطور'
    },
    {
      id: '3',
      name: 'الغروب الوردي',
      description: 'ثيم وردي إبداعي وحيوي',
      preview: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)',
      colors: {
        primary: '#EC4899',
        secondary: '#BE185D',
        accent: '#F59E0B',
        background: '#FFFFFF'
      },
      typography: {
        fontFamily: 'Tajawal',
        fontSize: '17px'
      },
      layout: {
        borderRadius: '16px',
        spacing: '1.5rem'
      },
      category: 'creative',
      isPremium: true,
      rating: 4.7,
      downloads: 650,
      author: 'المصمم'
    },
    {
      id: '4',
      name: 'الطبيعة الخضراء',
      description: 'ثيم أخضر طبيعي ومنعش',
      preview: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      colors: {
        primary: '#10B981',
        secondary: '#059669',
        accent: '#F59E0B',
        background: '#F0FDF4'
      },
      typography: {
        fontFamily: 'Noto Sans Arabic',
        fontSize: '16px'
      },
      layout: {
        borderRadius: '10px',
        spacing: '1rem'
      },
      category: 'minimal',
      isPremium: false,
      rating: 4.6,
      downloads: 420,
      author: 'النظام'
    }
  ];

  const categoryColors = {
    business: 'bg-blue-100 text-blue-800',
    creative: 'bg-purple-100 text-purple-800',
    minimal: 'bg-gray-100 text-gray-800',
    dark: 'bg-gray-800 text-white',
    colorful: 'bg-rainbow text-white'
  };

  const applyPreset = (preset: ThemePreset) => {
    updateSettings({
      primaryColor: preset.colors.primary,
      secondaryColor: preset.colors.secondary,
      accentColor: preset.colors.accent,
      backgroundColor: preset.colors.background,
      fontFamily: preset.typography.fontFamily,
      fontSize: preset.typography.fontSize,
      borderRadius: preset.layout.borderRadius,
      spacing: preset.layout.spacing
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">مدير القوالب</h3>
          <p className="text-gray-600">اختر من مجموعة متنوعة من القوالب الجاهزة</p>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button variant="outline">
            <Upload className="h-4 w-4 ml-2" />
            استيراد قالب
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-600">
                <Plus className="h-4 w-4 ml-2" />
                إنشاء قالب جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>إنشاء قالب جديد</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>اسم القالب</Label>
                    <Input placeholder="اسم القالب" />
                  </div>
                  <div className="space-y-2">
                    <Label>الفئة</Label>
                    <Input placeholder="business, creative, etc." />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>الوصف</Label>
                  <Textarea placeholder="وصف القالب" rows={3} />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>اللون الأساسي</Label>
                    <Input type="color" defaultValue="#3B82F6" />
                  </div>
                  <div className="space-y-2">
                    <Label>اللون الثانوي</Label>
                    <Input type="color" defaultValue="#1E40AF" />
                  </div>
                  <div className="space-y-2">
                    <Label>لون التمييز</Label>
                    <Input type="color" defaultValue="#10B981" />
                  </div>
                  <div className="space-y-2">
                    <Label>لون الخلفية</Label>
                    <Input type="color" defaultValue="#FFFFFF" />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 rtl:space-x-reverse pt-4">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={() => setIsCreateDialogOpen(false)}>
                    إنشاء القالب
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">الكل</TabsTrigger>
          <TabsTrigger value="business">أعمال</TabsTrigger>
          <TabsTrigger value="creative">إبداعي</TabsTrigger>
          <TabsTrigger value="minimal">بسيط</TabsTrigger>
          <TabsTrigger value="dark">مظلم</TabsTrigger>
          <TabsTrigger value="premium">مميز</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presets.map((preset) => (
              <Card key={preset.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  {/* معاينة القالب */}
                  <div 
                    className="h-32 relative"
                    style={{ background: preset.preview }}
                  >
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                    {preset.isPremium && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-yellow-500 text-white">
                          <Crown className="h-3 w-3 ml-1" />
                          مميز
                        </Badge>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="flex space-x-1 rtl:space-x-reverse">
                        <Button size="sm" variant="secondary" className="flex-1 text-xs">
                          <Eye className="h-3 w-3 ml-1" />
                          معاينة
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1 text-xs bg-white/20 backdrop-blur-sm hover:bg-white/30"
                          onClick={() => applyPreset(preset)}
                        >
                          تطبيق
                        </Button>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-lg">{preset.name}</h4>
                          <p className="text-sm text-gray-600">{preset.description}</p>
                        </div>
                        <Badge className={categoryColors[preset.category]}>
                          {preset.category === 'business' && 'أعمال'}
                          {preset.category === 'creative' && 'إبداعي'}
                          {preset.category === 'minimal' && 'بسيط'}
                          {preset.category === 'dark' && 'مظلم'}
                          {preset.category === 'colorful' && 'ملون'}
                        </Badge>
                      </div>

                      {/* عرض الألوان */}
                      <div className="flex space-x-1 rtl:space-x-reverse">
                        {Object.values(preset.colors).map((color, index) => (
                          <div
                            key={index}
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>

                      {/* الإحصائيات */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 ml-1" />
                            <span>{preset.rating}</span>
                          </div>
                          <span>•</span>
                          <span>{preset.downloads} تحميل</span>
                        </div>
                        <span>{preset.author}</span>
                      </div>

                      {/* الإجراءات */}
                      <div className="flex space-x-2 rtl:space-x-reverse pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Copy className="h-3 w-3 ml-1" />
                          نسخ
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* باقي التبويبات تحتوي على نفس البطاقات مفلترة حسب الفئة */}
      </Tabs>

      {/* قسم إنشاء قالب سريع */}
      <Card className="border-dashed border-2 border-gray-300">
        <CardContent className="p-8 text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">إنشاء قالب مخصص</h3>
          <p className="text-gray-600 mb-4">أنشئ قالبك الخاص بألوان وخطوط مميزة</p>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-600">
            <Plus className="h-4 w-4 ml-2" />
            ابدأ الإنشاء
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PresetManager;
