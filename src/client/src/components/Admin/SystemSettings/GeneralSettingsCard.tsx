
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Settings } from 'lucide-react';

const GeneralSettingsCard = ({
  maintenanceMode,
  setMaintenanceMode
}: {
  maintenanceMode: boolean;
  setMaintenanceMode: (v: boolean) => void;
}) => (
  <Card className="border-0 shadow-lg">
    <CardHeader>
      <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
        <Settings className="h-5 w-5" />
        <span>الإعدادات العامة</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label>اسم الموقع</Label>
        <Input defaultValue="Town Media" />
      </div>
      <div className="space-y-2">
        <Label>وصف الموقع</Label>
        <Textarea defaultValue="منصة متخصصة في خدمات وسائل التواصل الاجتماعي" rows={3} />
      </div>
      <div className="space-y-2">
        <Label>المنطقة الزمنية</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="اختر المنطقة الزمنية" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="utc+3">UTC+3 (الرياض)</SelectItem>
            <SelectItem value="utc+2">UTC+2 (القاهرة)</SelectItem>
            <SelectItem value="utc+0">UTC+0 (لندن)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>اللغة الافتراضية</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="اختر اللغة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ar">العربية</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Label>وضع الصيانة</Label>
          <p className="text-sm text-gray-600">إيقاف الموقع مؤقتاً للصيانة</p>
        </div>
        <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
      </div>
    </CardContent>
  </Card>
);

export default GeneralSettingsCard;
