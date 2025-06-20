
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Server,
  Database,
  Wifi,
  HardDrive,
  Cpu,
  MemoryStick,
  Activity,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  TrendingUp,
  Clock,
  Users,
  Globe
} from 'lucide-react';

const SystemMonitoring = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const systemMetrics = [
    {
      title: 'استخدام المعالج',
      value: 45,
      status: 'good',
      icon: Cpu,
      unit: '%',
      trend: '+2%'
    },
    {
      title: 'استخدام الذاكرة',
      value: 68,
      status: 'warning',
      icon: MemoryStick,
      unit: '%',
      trend: '+5%'
    },
    {
      title: 'مساحة التخزين',
      value: 82,
      status: 'critical',
      icon: HardDrive,
      unit: '%',
      trend: '+12%'
    },
    {
      title: 'استخدام الشبكة',
      value: 34,
      status: 'good',
      icon: Wifi,
      unit: 'Mbps',
      trend: '-3%'
    }
  ];

  const serverStatus = [
    {
      name: 'خادم الويب الرئيسي',
      status: 'online',
      uptime: '99.9%',
      response: '145ms',
      load: '1.2',
      icon: Server
    },
    {
      name: 'قاعدة البيانات',
      status: 'online',
      uptime: '99.8%',
      response: '23ms',
      load: '0.8',
      icon: Database
    },
    {
      name: 'خادم الملفات',
      status: 'warning',
      uptime: '98.5%',
      response: '234ms',
      load: '2.1',
      icon: HardDrive
    },
    {
      name: 'خدمة API',
      status: 'online',
      uptime: '99.7%',
      response: '89ms',
      load: '1.5',
      icon: Globe
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'استخدام مرتفع للذاكرة على الخادم الرئيسي',
      timestamp: '2024-01-15 14:30',
      resolved: false
    },
    {
      id: 2,
      type: 'critical',
      message: 'مساحة التخزين تقترب من الامتلاء',
      timestamp: '2024-01-15 13:45',
      resolved: false
    },
    {
      id: 3,
      type: 'info',
      message: 'تم تحديث النظام بنجاح',
      timestamp: '2024-01-15 12:00',
      resolved: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getMetricColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return <CheckCircle className="h-4 w-4 text-blue-600" />;
    }
  };

  const refreshMetrics = () => {
    setLastUpdate(new Date());
    // هنا يمكن إضافة منطق تحديث البيانات الفعلي
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">مراقبة النظام</h1>
          <p className="text-gray-600">متابعة صحة وأداء النظام في الوقت الفعلي</p>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm text-gray-500">
            آخر تحديث: {lastUpdate.toLocaleTimeString('ar')}
          </span>
          <Button onClick={refreshMetrics} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 ml-2" />
            تحديث
          </Button>
        </div>
      </div>

      {/* مؤشرات الأداء */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status === 'good' && 'طبيعي'}
                    {metric.status === 'warning' && 'تحذير'}
                    {metric.status === 'critical' && 'حرج'}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{metric.title}</h3>
                    <span className={`text-2xl font-bold ${getMetricColor(metric.status)}`}>
                      {metric.value}{metric.unit}
                    </span>
                  </div>
                  
                  <Progress 
                    value={metric.value} 
                    className="h-2"
                  />
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">الاتجاه</span>
                    <span className={metric.trend.startsWith('+') ? 'text-red-600' : 'text-green-600'}>
                      {metric.trend}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* حالة الخوادم */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <Server className="h-5 w-5" />
            <span>حالة الخوادم</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serverStatus.map((server, index) => {
              const Icon = server.icon;
              return (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Icon className="h-5 w-5 text-gray-600" />
                      <h3 className="font-semibold">{server.name}</h3>
                    </div>
                    <Badge className={getStatusColor(server.status)}>
                      {server.status === 'online' && 'متصل'}
                      {server.status === 'warning' && 'تحذير'}
                      {server.status === 'offline' && 'غير متصل'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">وقت التشغيل</p>
                      <p className="font-semibold">{server.uptime}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">زمن الاستجابة</p>
                      <p className="font-semibold">{server.response}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">الحمولة</p>
                      <p className="font-semibold">{server.load}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* التنبيهات الحديثة */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <AlertTriangle className="h-5 w-5" />
            <span>التنبيهات الحديثة</span>
            <Badge variant="secondary">{recentAlerts.filter(a => !a.resolved).length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <Alert key={alert.id} className={`${alert.resolved ? 'opacity-60' : ''}`}>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <AlertDescription className="flex items-center justify-between">
                      <span>{alert.message}</span>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-xs text-gray-500">{alert.timestamp}</span>
                        {alert.resolved ? (
                          <Badge variant="outline">محلول</Badge>
                        ) : (
                          <Button size="sm" variant="outline">
                            حل المشكلة
                          </Button>
                        )}
                      </div>
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemMonitoring;
