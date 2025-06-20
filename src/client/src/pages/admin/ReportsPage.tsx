
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar, BarChart3 } from 'lucide-react';

const ReportsPage = () => {
  const reports = [
    {
      id: 1,
      name: 'تقرير المبيعات الشهري',
      description: 'تحليل شامل للمبيعات والإيرادات',
      type: 'مبيعات',
      lastGenerated: '2024-01-15',
      size: '2.3 MB'
    },
    {
      id: 2,
      name: 'تقرير نشاط المستخدمين',
      description: 'إحصائيات استخدام المنصة',
      type: 'مستخدمين',
      lastGenerated: '2024-01-14',
      size: '1.8 MB'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">التقارير المتقدمة</h1>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          إنشاء تقرير جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">التقارير المتاحة</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">تم إنشاؤها اليوم</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي التحميلات</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">التقارير التلقائية</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>التقارير المتاحة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{report.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                  <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                    <span>النوع: {report.type}</span>
                    <span>آخر إنشاء: {report.lastGenerated}</span>
                    <span>الحجم: {report.size}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    تحميل
                  </Button>
                  <Button size="sm" variant="outline">
                    عرض
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
