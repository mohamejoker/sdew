
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Database, Activity, CheckCircle, Settings } from 'lucide-react';

const MaintenanceToolsCard = () => (
  <Card className="border-0 shadow-lg">
    <CardHeader>
      <CardTitle>أدوات الصيانة</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          <span className="font-medium text-orange-800">وضع الصيانة</span>
        </div>
        <p className="text-sm text-orange-700 mb-3">
          سيتم إيقاف الموقع مؤقتاً وعرض صفحة صيانة للزوار
        </p>
        <Button 
          variant="outline" 
          className="w-full border-orange-300 text-orange-700 hover:bg-orange-100"
        >
          تفعيل وضع الصيانة
        </Button>
      </div>
      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start">
          <RefreshCw className="h-4 w-4 ml-2" />
          مسح جميع البيانات المؤقتة
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Database className="h-4 w-4 ml-2" />
          تحسين قاعدة البيانات
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Activity className="h-4 w-4 ml-2" />
          فحص سلامة النظام
        </Button>
      </div>
    </CardContent>
  </Card>
);
export default MaintenanceToolsCard;
