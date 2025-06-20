
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Server, 
  Database, 
  Wifi, 
  HardDrive,
  Cpu,
  MemoryStick,
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const SystemHealth = () => {
  const systemMetrics = [
    {
      name: 'الخادم الرئيسي',
      status: 'healthy',
      value: '99.9%',
      icon: Server,
      details: 'وقت التشغيل'
    },
    {
      name: 'قاعدة البيانات',
      status: 'healthy',
      value: '150ms',
      icon: Database,
      details: 'زمن الاستجابة'
    },
    {
      name: 'الاتصال',
      status: 'warning',
      value: '85%',
      icon: Wifi,
      details: 'جودة الشبكة'
    },
    {
      name: 'التخزين',
      status: 'healthy',
      value: '78%',
      icon: HardDrive,
      details: 'المساحة المستخدمة'
    },
    {
      name: 'المعالج',
      status: 'healthy',
      value: '45%',
      icon: Cpu,
      details: 'الاستخدام الحالي'
    },
    {
      name: 'الذاكرة',
      status: 'warning',
      value: '82%',
      icon: MemoryStick,
      details: 'الاستخدام الحالي'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="h-5 w-5 text-green-600" />
          حالة النظام
        </CardTitle>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          تحديث
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-900">{metric.name}</span>
                  </div>
                  <Badge className={getStatusColor(metric.status)}>
                    {getStatusIcon(metric.status)}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-sm text-gray-600">{metric.details}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-blue-900">النظام يعمل بكفاءة عالية</span>
          </div>
          <p className="text-sm text-blue-700">
            جميع الخدمات الأساسية تعمل بشكل طبيعي. آخر فحص: منذ 5 دقائق
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemHealth;
