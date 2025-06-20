
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Server, Database, Wifi } from 'lucide-react';

const SystemHealthPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">صحة النظام</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">حالة الخادم</CardTitle>
            <Server className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">متصل</div>
            <Badge variant="default" className="mt-2">99.9% وقت التشغيل</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">قاعدة البيانات</CardTitle>
            <Database className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">نشطة</div>
            <Badge variant="default" className="mt-2">استجابة سريعة</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الشبكة</CardTitle>
            <Wifi className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">مستقرة</div>
            <Badge variant="default" className="mt-2">سرعة عالية</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الأداء العام</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">ممتاز</div>
            <Badge variant="default" className="mt-2">جميع الأنظمة تعمل</Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>مراقبة النظام في الوقت الفعلي</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>استخدام المعالج</span>
              <div className="flex items-center">
                <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                  <div className="w-1/4 h-full bg-green-500 rounded-full"></div>
                </div>
                <span>25%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span>استخدام الذاكرة</span>
              <div className="flex items-center">
                <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                  <div className="w-1/2 h-full bg-blue-500 rounded-full"></div>
                </div>
                <span>50%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span>مساحة التخزين</span>
              <div className="flex items-center">
                <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                  <div className="w-1/3 h-full bg-orange-500 rounded-full"></div>
                </div>
                <span>33%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemHealthPage;
