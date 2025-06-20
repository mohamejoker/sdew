
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Eye, AlertTriangle } from 'lucide-react';

const SecurityPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">لوحة الأمان</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">حالة الأمان</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">آمن</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">محاولات الدخول الفاشلة</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الجلسات النشطة</CardTitle>
            <Eye className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">التحديث الأخير</CardTitle>
            <Lock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">اليوم</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>سجل الأمان</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium">تسجيل دخول ناجح</p>
                <p className="text-sm text-gray-600">admin@example.com</p>
              </div>
              <Badge variant="default">منذ 5 دقائق</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium">محاولة دخول فاشلة</p>
                <p className="text-sm text-gray-600">IP: 192.168.1.100</p>
              </div>
              <Badge variant="destructive">منذ ساعة</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إعدادات الأمان</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" variant="outline">
              تفعيل المصادقة الثنائية
            </Button>
            <Button className="w-full" variant="outline">
              إعدادات كلمة المرور
            </Button>
            <Button className="w-full" variant="outline">
              إدارة الجلسات
            </Button>
            <Button className="w-full" variant="outline">
              سجل النشاطات
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurityPage;
