
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Save, Eye, EyeOff } from 'lucide-react';

interface ThemeEditorProps {
  onSave: (themeData: any) => void;
  initialData?: any;
}

const ThemeEditor: React.FC<ThemeEditorProps> = ({ onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    category: initialData?.category || 'business',
    isPublic: initialData?.isPublic || false,
    isDownloadable: initialData?.isDownloadable || true,
    primaryColor: initialData?.primaryColor || '#3B82F6',
    secondaryColor: initialData?.secondaryColor || '#1E40AF',
    accentColor: initialData?.accentColor || '#10B981',
    backgroundColor: initialData?.backgroundColor || '#FFFFFF',
    surfaceColor: initialData?.surfaceColor || '#F8FAFC',
    textColor: initialData?.textColor || '#1F2937',
    borderRadius: initialData?.borderRadius || '8',
    fontFamily: initialData?.fontFamily || 'Inter'
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>محرر الثيم</span>
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            {previewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {previewMode ? 'إخفاء المعاينة' : 'معاينة'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* المعلومات الأساسية */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>اسم الثيم</Label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="اسم الثيم الجديد" 
              />
            </div>
            <div className="space-y-2">
              <Label>الفئة</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفئة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="business">أعمال</SelectItem>
                  <SelectItem value="creative">إبداعي</SelectItem>
                  <SelectItem value="minimal">بسيط</SelectItem>
                  <SelectItem value="dark">مظلم</SelectItem>
                  <SelectItem value="colorful">ملون</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>الوصف</Label>
            <Textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="وصف الثيم" 
              rows={3} 
            />
          </div>

          {/* إعدادات الألوان */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">نظام الألوان</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>اللون الأساسي</Label>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <Input 
                    type="color" 
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                    className="w-16 h-10 p-1"
                  />
                  <Input 
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>اللون الثانوي</Label>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <Input 
                    type="color" 
                    value={formData.secondaryColor}
                    onChange={(e) => setFormData({...formData, secondaryColor: e.target.value})}
                    className="w-16 h-10 p-1"
                  />
                  <Input 
                    value={formData.secondaryColor}
                    onChange={(e) => setFormData({...formData, secondaryColor: e.target.value})}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>لون التمييز</Label>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <Input 
                    type="color" 
                    value={formData.accentColor}
                    onChange={(e) => setFormData({...formData, accentColor: e.target.value})}
                    className="w-16 h-10 p-1"
                  />
                  <Input 
                    value={formData.accentColor}
                    onChange={(e) => setFormData({...formData, accentColor: e.target.value})}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* إعدادات الخطوط والتخطيط */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>عائلة الخط</Label>
              <Select value={formData.fontFamily} onValueChange={(value) => setFormData({...formData, fontFamily: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Cairo">Cairo</SelectItem>
                  <SelectItem value="Tajawal">Tajawal</SelectItem>
                  <SelectItem value="Amiri">Amiri</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>استدارة الحواف</Label>
              <Input 
                type="number"
                value={formData.borderRadius}
                onChange={(e) => setFormData({...formData, borderRadius: e.target.value})}
                placeholder="8"
              />
            </div>
          </div>

          {/* إعدادات النشر */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">إعدادات النشر</h3>
            <div className="flex items-center justify-between">
              <Label>ثيم عام</Label>
              <Switch 
                checked={formData.isPublic}
                onCheckedChange={(checked) => setFormData({...formData, isPublic: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>قابل للتحميل</Label>
              <Switch 
                checked={formData.isDownloadable}
                onCheckedChange={(checked) => setFormData({...formData, isDownloadable: checked})}
              />
            </div>
          </div>

          {/* معاينة الثيم */}
          {previewMode && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">معاينة مباشرة</h3>
              <div 
                className="p-6 rounded-lg border-2"
                style={{
                  backgroundColor: formData.backgroundColor,
                  color: formData.textColor,
                  borderColor: formData.primaryColor,
                  fontFamily: formData.fontFamily,
                  borderRadius: `${formData.borderRadius}px`
                }}
              >
                <h3 style={{ color: formData.primaryColor, marginBottom: '12px' }}>
                  عنوان تجريبي
                </h3>
                <p style={{ marginBottom: '16px' }}>
                  هذا نص تجريبي لمعاينة الثيم الجديد مع الألوان والخطوط المختارة
                </p>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <div 
                    className="px-4 py-2 rounded text-white"
                    style={{ 
                      backgroundColor: formData.primaryColor,
                      borderRadius: `${formData.borderRadius}px`
                    }}
                  >
                    زر أساسي
                  </div>
                  <div 
                    className="px-4 py-2 rounded text-white"
                    style={{ 
                      backgroundColor: formData.secondaryColor,
                      borderRadius: `${formData.borderRadius}px`
                    }}
                  >
                    زر ثانوي
                  </div>
                  <div 
                    className="px-4 py-2 rounded text-white"
                    style={{ 
                      backgroundColor: formData.accentColor,
                      borderRadius: `${formData.borderRadius}px`
                    }}
                  >
                    زر مميز
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full">
            <Save className="h-4 w-4 ml-2" />
            حفظ الثيم
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ThemeEditor;
