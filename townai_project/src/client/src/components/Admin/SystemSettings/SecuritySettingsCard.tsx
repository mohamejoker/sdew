
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Shield, RefreshCw, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SecuritySettingsCard = () => (
  <Card className="border-0 shadow-lg">
    <CardHeader>
      <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
        <Shield className="h-5 w-5" />
        <span>إعدادات الأمان</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label>كلمة مرور المدير</Label>
        <Input type="password" placeholder="كلمة مرور جديدة" />
      </div>
      <div className="space-y-2">
        <Label>تأكيد كلمة المرور</Label>
        <Input type="password" placeholder="تأكيد كلمة المرور" />
      </div>
      <div className="space-y-2">
        <Label>مفتاح التشفير</Label>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Input type="password" placeholder="مفتاح التشفير الحالي" className="flex-1" />
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Label>المصادقة الثنائية</Label>
          <p className="text-sm text-gray-600">حماية إضافية للحساب</p>
        </div>
        <Switch />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Label>تسجيل محاولات الدخول</Label>
          <p className="text-sm text-gray-600">حفظ سجل بجميع المحاولات</p>
        </div>
        <Switch defaultChecked />
      </div>
    </CardContent>
  </Card>
);

export default SecuritySettingsCard;
