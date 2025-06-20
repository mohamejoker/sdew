
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, 
  Image, 
  Layout, 
  Sparkles, 
  Download, 
  Eye,
  Edit,
  Copy,
  BarChart,
  Zap
} from 'lucide-react';
import { designService, type DesignRequest } from '@/services/design/designService';
import type { AIAgentResponse } from '@/services/aiAgent';

interface DesignStudioProps {
  onDesignCreate?: (response: AIAgentResponse) => void;
}

const DesignStudio: React.FC<DesignStudioProps> = ({ onDesignCreate }) => {
  const [designRequest, setDesignRequest] = useState<Partial<DesignRequest>>({
    type: 'post',
    platform: 'instagram',
    style: 'modern'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [brandInfo, setBrandInfo] = useState({
    name: '',
    colors: ['#3B82F6', '#10B981']
  });

  const designTypes = [
    { value: 'ad', label: 'إعلان تجاري', icon: Zap },
    { value: 'post', label: 'منشور اجتماعي', icon: Image },
    { value: 'banner', label: 'بانر ويب', icon: Layout },
    { value: 'logo', label: 'شعار', icon: Sparkles },
    { value: 'infographic', label: 'إنفوجرافيك', icon: BarChart }
  ];

  const platforms = [
    { value: 'instagram', label: 'إنستقرام' },
    { value: 'facebook', label: 'فيسبوك' },
    { value: 'twitter', label: 'تويتر' },
    { value: 'linkedin', label: 'لينكد إن' },
    { value: 'youtube', label: 'يوتيوب' }
  ];

  const styles = [
    { value: 'modern', label: 'عصري' },
    { value: 'classic', label: 'كلاسيكي' },
    { value: 'minimalist', label: 'بسيط' },
    { value: 'bold', label: 'جريء' },
    { value: 'creative', label: 'إبداعي' }
  ];

  const handleGenerateDesign = async () => {
    if (!designRequest.text?.trim()) return;

    setIsGenerating(true);
    try {
      const response = await designService.generateDesign({
        type: designRequest.type || 'post',
        platform: designRequest.platform || 'instagram',
        text: designRequest.text,
        colors: brandInfo.colors,
        style: designRequest.style || 'modern',
        brand: brandInfo.name ? {
          name: brandInfo.name,
          colors: brandInfo.colors
        } : undefined
      } as DesignRequest);

      if (onDesignCreate) {
        onDesignCreate(response);
      }
    } catch (error) {
      console.error('Design generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateInfographic = async () => {
    const response = await designService.generateInfographic(
      designRequest.text || 'إحصائيات التسويق الرقمي',
      [
        { label: 'زيادة المتابعين', value: 85 },
        { label: 'معدل التفاعل', value: 92 },
        { label: 'الوصول العضوي', value: 78 }
      ]
    );
    
    if (onDesignCreate) {
      onDesignCreate(response);
    }
  };

  const handleCreateBrandKit = async () => {
    if (!brandInfo.name.trim()) return;

    const response = await designService.createBrandKit(
      brandInfo.name,
      brandInfo.colors,
      designRequest.style || 'modern'
    );
    
    if (onDesignCreate) {
      onDesignCreate(response);
    }
  };

  const templates = designService.getTemplates();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Palette className="h-5 w-5" />
          <span>استوديو التصميم الذكي</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="create">إنشاء تصميم</TabsTrigger>
            <TabsTrigger value="templates">القوالب الجاهزة</TabsTrigger>
            <TabsTrigger value="brand">الهوية البصرية</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* نوع التصميم */}
              <div className="space-y-2">
                <label className="text-sm font-medium">نوع التصميم</label>
                <div className="grid grid-cols-2 gap-2">
                  {designTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <Button
                        key={type.value}
                        variant={designRequest.type === type.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDesignRequest(prev => ({ ...prev, type: type.value as any }))}
                        className="flex items-center space-x-1 rtl:space-x-reverse"
                      >
                        <IconComponent className="h-3 w-3" />
                        <span className="text-xs">{type.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* المنصة */}
              <div className="space-y-2">
                <label className="text-sm font-medium">المنصة</label>
                <Select
                  value={designRequest.platform}
                  onValueChange={(value) => setDesignRequest(prev => ({ ...prev, platform: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المنصة" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((platform) => (
                      <SelectItem key={platform.value} value={platform.value}>
                        {platform.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* النص والمحتوى */}
            <div className="space-y-2">
              <label className="text-sm font-medium">النص والمحتوى</label>
              <Textarea
                placeholder="اكتب النص المطلوب في التصميم..."
                value={designRequest.text || ''}
                onChange={(e) => setDesignRequest(prev => ({ ...prev, text: e.target.value }))}
                rows={3}
              />
            </div>

            {/* النمط */}
            <div className="space-y-2">
              <label className="text-sm font-medium">النمط</label>
              <div className="flex flex-wrap gap-2">
                {styles.map((style) => (
                  <Badge
                    key={style.value}
                    variant={designRequest.style === style.value ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setDesignRequest(prev => ({ ...prev, style: style.value as any }))}
                  >
                    {style.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* أزرار الإجراءات */}
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={handleGenerateDesign}
                disabled={!designRequest.text?.trim() || isGenerating}
                className="flex items-center space-x-1 rtl:space-x-reverse"
              >
                <Sparkles className="h-4 w-4" />
                <span>{isGenerating ? 'جاري الإنشاء...' : 'إنشاء التصميم'}</span>
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleCreateInfographic}
                className="flex items-center space-x-1 rtl:space-x-reverse"
              >
                <BarChart className="h-4 w-4" />
                <span>إنشاء إنفوجرافيك</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <Image className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium text-sm mb-1">{template.name}</h3>
                    <p className="text-xs text-gray-600 mb-3">{template.description}</p>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-xs">
                        {template.dimensions.width}×{template.dimensions.height}
                      </Badge>
                      <div className="flex space-x-1 rtl:space-x-reverse">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="brand" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">اسم العلامة التجارية</label>
                <Input
                  placeholder="اسم الشركة أو العلامة التجارية"
                  value={brandInfo.name}
                  onChange={(e) => setBrandInfo(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">ألوان العلامة التجارية</label>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  {brandInfo.colors.map((color, index) => (
                    <div key={index} className="flex items-center space-x-1 rtl:space-x-reverse">
                      <div 
                        className="w-8 h-8 rounded border"
                        style={{ backgroundColor: color }}
                      />
                      <Input
                        type="color"
                        value={color}
                        onChange={(e) => {
                          const newColors = [...brandInfo.colors];
                          newColors[index] = e.target.value;
                          setBrandInfo(prev => ({ ...prev, colors: newColors }));
                        }}
                        className="w-16 h-8 p-0 border-0"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleCreateBrandKit}
                disabled={!brandInfo.name.trim()}
                className="w-full"
              >
                <Palette className="h-4 w-4 mr-2" />
                إنشاء الهوية البصرية
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DesignStudio;
