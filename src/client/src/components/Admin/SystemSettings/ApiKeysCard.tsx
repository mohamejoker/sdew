
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Key } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ApiKeysCard = () => (
  <Card className="border-0 shadow-lg">
    <CardHeader>
      <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
        <Key className="h-5 w-5" />
        <span>مفاتيح API</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-3">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">مفتاح الإنتاج</span>
            <Badge className="bg-green-100 text-green-800">فعال</Badge>
          </div>
          <code className="text-xs text-gray-600">sk_live_xxxxxxxxxxxxxxxx</code>
          <div className="flex space-x-2 rtl:space-x-reverse mt-2">
            <Button size="sm" variant="outline">تجديد</Button>
            <Button size="sm" variant="outline">نسخ</Button>
          </div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">مفتاح التطوير</span>
            <Badge variant="secondary">تطوير</Badge>
          </div>
          <code className="text-xs text-gray-600">sk_test_xxxxxxxxxxxxxxxx</code>
          <div className="flex space-x-2 rtl:space-x-reverse mt-2">
            <Button size="sm" variant="outline">تجديد</Button>
            <Button size="sm" variant="outline">نسخ</Button>
          </div>
        </div>
      </div>
      <Button className="w-full" variant="outline">
        <Key className="h-4 w-4 ml-2" />
        إنشاء مفتاح جديد
      </Button>
    </CardContent>
  </Card>
);

export default ApiKeysCard;
