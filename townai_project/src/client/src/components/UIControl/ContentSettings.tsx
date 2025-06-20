
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useUIControl } from '@/contexts/UIControlContext';

const ContentSettings = () => {
  const { settings, updateSettings } = useUIControl();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">معلومات الموقع</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs">عنوان الموقع</Label>
            <Input
              value={settings.siteTitle}
              onChange={(e) => updateSettings({ siteTitle: e.target.value })}
              placeholder="Town Media"
              className="text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">وصف الموقع</Label>
            <Input
              value={settings.siteDescription}
              onChange={(e) => updateSettings({ siteDescription: e.target.value })}
              placeholder="منصة التسويق الرقمي الذكية"
              className="text-sm"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">القسم الرئيسي (Hero)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs">العنوان الرئيسي</Label>
            <Input
              value={settings.heroTitle}
              onChange={(e) => updateSettings({ heroTitle: e.target.value })}
              className="text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">العنوان الفرعي</Label>
            <Textarea
              value={settings.heroSubtitle}
              onChange={(e) => updateSettings({ heroSubtitle: e.target.value })}
              className="text-sm resize-none"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">معاينة المحتوى</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-lg bg-gray-50">
            <h1 
              className="text-lg font-bold mb-2"
              style={{ 
                color: settings.primaryColor,
                fontFamily: settings.fontFamily 
              }}
            >
              {settings.heroTitle}
            </h1>
            <p 
              className="text-sm"
              style={{ 
                color: settings.textColor,
                fontFamily: settings.fontFamily 
              }}
            >
              {settings.heroSubtitle}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">نصائح للمحتوى</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-gray-600 space-y-2">
            <p>• استخدم عناوين جذابة ومختصرة</p>
            <p>• اكتب وصفاً واضحاً يشرح قيمة خدماتك</p>
            <p>• استخدم كلمات مفتاحية مهمة لمحركات البحث</p>
            <p>• تأكد من أن النص يناسب الجمهور المستهدف</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentSettings;
