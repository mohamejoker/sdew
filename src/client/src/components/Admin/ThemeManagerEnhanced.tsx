
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  Sparkles,
  Wand2,
  Save,
  RefreshCw,
  Code,
  Monitor,
  Smartphone,
  Sun,
  Moon
} from 'lucide-react';
import { useUIControl } from '@/contexts/UIControlContext';

interface ThemeTemplate {
  id: string;
  name: string;
  description: string;
  category: 'modern' | 'classic' | 'minimal' | 'creative' | 'dark';
  isPremium: boolean;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    fontWeight: string;
  };
  layout: {
    borderRadius: number;
    spacing: string;
    shadows: boolean;
  };
  rating: number;
  downloads: number;
  author: string;
}

const ThemeManagerEnhanced = () => {
  const { theme, updateTheme, settings, updateSettings } = useUIControl();
  const [selectedTemplate, setSelectedTemplate] = useState<ThemeTemplate | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [previewMode, setPreviewMode] = useState(false);

  const templates: ThemeTemplate[] = [
    {
      id: '1',
      name: 'الأزرق الحديث',
      description: 'ثيم حديث بألوان زرقاء أنيقة',
      category: 'modern',
      isPremium: false,
      preview: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
      colors: {
        primary: '#3B82F6',
        secondary: '#1E40AF',
        accent: '#10B981',
        background: '#FFFFFF',
        text: '#1F2937'
      },
      typography: {
        fontFamily: 'Cairo',
        fontSize: 16,
        fontWeight: '400'
      },
      layout: {
        borderRadius: 8,
        spacing: 'normal',
        shadows: true
      },
      rating: 4.8,
      downloads: 1250,
      author: 'النظام'
    },
    {
      id: '2',
      name: 'الليل المظلم',
      description: 'ثيم مظلم مريح للعينين',
      category: 'dark',
      isPremium: false,
      preview: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)',
      colors: {
        primary: '#60A5FA',
        secondary: '#3B82F6',
        accent: '#34D399',
        background: '#111827',
        text: '#F9FAFB'
      },
      typography: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '400'
      },
      layout: {
        borderRadius: 12,
        spacing: 'comfortable',
        shadows: true
      },
      rating: 4.9,
      downloads: 890,
      author: 'المطور'
    },
    {
      id: '3',
      name: 'الورود الإبداعية',
      description: 'ثيم وردي إبداعي وحيوي',
      category: 'creative',
      isPremium: true,
      preview: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)',
      colors: {
        primary: '#EC4899',
        secondary: '#BE185D',
        accent: '#F59E0B',
        background: '#FFFFFF',
        text: '#1F2937'
      },
      typography: {
        fontFamily: 'Tajawal',
        fontSize: 17,
        fontWeight: '500'
      },
      layout: {
        borderRadius: 16,
        spacing: 'comfortable',
        shadows: true
      },
      rating: 4.7,
      downloads: 650,
      author: 'المصمم'
    },
    {
      id: '4',
      name: 'البساطة الكلاسيكية',
      description: 'تصميم بسيط وكلاسيكي',
      category: 'minimal',
      isPremium: false,
      preview: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
      colors: {
        primary: '#475569',
        secondary: '#334155',
        accent: '#0EA5E9',
        background: '#FFFFFF',
        text: '#1E293B'
      },
      typography: {
        fontFamily: 'Inter',
        fontSize: 15,
        fontWeight: '400'
      },
      layout: {
        borderRadius: 6,
        spacing: 'compact',
        shadows: false
      },
      rating: 4.6,
      downloads: 420,
      author: 'النظام'
    }
  ];

  const categories = [
    { id: 'all', name: 'الكل', count: templates.length },
    { id: 'modern', name: 'حديث', count: templates.filter(t => t.category === 'modern').length },
    { id: 'dark', name: 'مظلم', count: templates.filter(t => t.category === 'dark').length },
    { id: 'creative', name: 'إبداعي', count: templates.filter(t => t.category === 'creative').length },
    { id: 'minimal', name: 'بسيط', count: templates.filter(t => t.category === 'minimal').length },
    { id: 'classic', name: 'كلاسيكي', count: templates.filter(t => t.category === 'classic').length }
  ];

  const applyTemplate = (template: ThemeTemplate) => {
    updateTheme({
      primaryColor: template.colors.primary,
      secondaryColor: template.colors.secondary,
      backgroundColor: template.colors.background,
      textColor: template.colors.text,
      fontFamily: template.typography.fontFamily,
      fontSize: template.typography.fontSize,
      borderRadius: template.layout.borderRadius,
      spacing: template.layout.spacing as any
    });

    updateSettings({
      primaryColor: template.colors.primary,
      secondaryColor: template.colors.secondary,
      backgroundColor: template.colors.background,
      textColor: template.colors.text,
      accentColor: template.colors.accent,
      fontFamily: template.typography.fontFamily,
      fontSize: `${template.typography.fontSize}px`,
      borderRadius: `${template.layout.borderRadius}px`,
      spacing: template.layout.spacing === 'compact' ? '0.75rem' : template.layout.spacing === 'comfortable' ? '1.25rem' : '1rem'
    });
  };

  const filteredTemplates = activeCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Palette className="h-6 w-6 text-purple-600" />
              <span>مدير الثيمات المتقدم</span>
              <Badge className="bg-purple-100 text-purple-800">Pro</Badge>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button size="sm" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                استيراد
              </Button>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                تصدير
              </Button>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                    <Plus className="h-4 w-4 mr-2" />
                    إنشاء ثيم
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>إنشاء ثيم مخصص</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* النموذج */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>اسم الثيم</Label>
                          <Input placeholder="ثيمي الجديد" />
                        </div>
                        <div className="space-y-2">
                          <Label>الفئة</Label>
                          <select className="w-full px-3 py-2 border rounded-lg">
                            <option value="modern">حديث</option>
                            <option value="classic">كلاسيكي</option>
                            <option value="minimal">بسيط</option>
                            <option value="creative">إبداعي</option>
                            <option value="dark">مظلم</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>الوصف</Label>
                        <Input placeholder="وصف الثيم" />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
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
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>خط النص</Label>
                          <select className="w-full px-3 py-2 border rounded-lg">
                            <option value="Cairo">Cairo</option>
                            <option value="Inter">Inter</option>
                            <option value="Tajawal">Tajawal</option>
                            <option value="Amiri">Amiri</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>حجم الخط</Label>
                          <Input type="number" defaultValue="16" min="12" max="24" />
                        </div>
                      </div>
                    </div>

                    {/* المعاينة */}
                    <div className="space-y-4">
                      <Label>معاينة مباشرة</Label>
                      <Card className="border-2 border-dashed">
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div className="h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
                            <div className="space-y-2">
                              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                            </div>
                            <div className="flex space-x-2 rtl:space-x-reverse">
                              <div className="h-8 bg-blue-500 rounded px-4 flex-1"></div>
                              <div className="h-8 border border-gray-300 rounded px-4 flex-1"></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 rtl:space-x-reverse pt-4">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      إلغاء
                    </Button>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                      <Save className="h-4 w-4 mr-2" />
                      إنشاء الثيم
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Categories */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            onClick={() => setActiveCategory(category.id)}
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            <span>{category.name}</span>
            <Badge variant="secondary" className="text-xs">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg">
            <div className="relative">
              {/* معاينة الثيم */}
              <div 
                className="h-40 relative cursor-pointer"
                style={{ background: template.preview }}
                onClick={() => setSelectedTemplate(template)}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                
                {template.isPremium && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-yellow-500 text-white">
                      <Crown className="h-3 w-3 ml-1" />
                      مميز
                    </Badge>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button size="sm" variant="secondary" className="flex-1 text-xs">
                      <Eye className="h-3 w-3 ml-1" />
                      معاينة
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 text-xs bg-white/20 backdrop-blur-sm hover:bg-white/30"
                      onClick={(e) => {
                        e.stopPropagation();
                        applyTemplate(template);
                      }}
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
                      <h3 className="font-semibold text-lg">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {template.category === 'modern' && 'حديث'}
                      {template.category === 'classic' && 'كلاسيكي'}
                      {template.category === 'minimal' && 'بسيط'}
                      {template.category === 'creative' && 'إبداعي'}
                      {template.category === 'dark' && 'مظلم'}
                    </Badge>
                  </div>

                  {/* عرض الألوان */}
                  <div className="flex space-x-1 rtl:space-x-reverse">
                    {Object.values(template.colors).slice(0, 4).map((color, index) => (
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
                        <span>{template.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{template.downloads} تحميل</span>
                    </div>
                    <span>{template.author}</span>
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

      {/* Current Theme Display */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Wand2 className="h-5 w-5 text-blue-600" />
              <span>الثيم الحالي</span>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button size="sm" variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                إعادة تعيين
              </Button>
              <Button size="sm" variant="outline">
                <Code className="h-4 w-4 mr-2" />
                تصدير CSS
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">الألوان</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div 
                    className="w-4 h-4 rounded border"
                    style={{ backgroundColor: theme.primaryColor }}
                  />
                  <span className="text-sm">أساسي: {theme.primaryColor}</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div 
                    className="w-4 h-4 rounded border"
                    style={{ backgroundColor: theme.secondaryColor }}
                  />
                  <span className="text-sm">ثانوي: {theme.secondaryColor}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">النص</h4>
              <div className="space-y-2">
                <div className="text-sm">
                  <span>الخط: {theme.fontFamily}</span>
                </div>
                <div className="text-sm">
                  <span>الحجم: {theme.fontSize}px</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">التخطيط</h4>
              <div className="space-y-2">
                <div className="text-sm">
                  <span>زوايا الحواف: {theme.borderRadius}px</span>
                </div>
                <div className="text-sm">
                  <span>التباعد: {theme.spacing}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeManagerEnhanced;
