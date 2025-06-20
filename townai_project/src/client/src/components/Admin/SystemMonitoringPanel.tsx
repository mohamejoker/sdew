
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, AlertTriangle, CheckCircle, Clock, 
  Server, Database, Wifi, HardDrive 
} from 'lucide-react';
import { useSystemHealth } from '@/hooks/useSystemHealth';
import { useNotifications } from '@/hooks/useNotifications';
import {
  LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const SystemMonitoringPanel = () => {
  const { data: healthMetrics } = useSystemHealth();
  const { notifications, createNotification } = useNotifications();

  // بيانات وهمية لمراقبة الأداء
  const performanceData = [
    { time: '00:00', cpu: 45, memory: 60, disk: 30, network: 25 },
    { time: '04:00', cpu: 52, memory: 65, disk: 35, network: 30 },
    { time: '08:00', cpu: 78, memory: 80, disk: 45, network: 60 },
    { time: '12:00', cpu: 85, memory: 85, disk: 50, network: 75 },
    { time: '16:00', cpu: 92, memory: 88, disk: 55, network: 80 },
    { time: '20:00', cpu: 75, memory: 75, disk: 40, network: 50 },
    { time: '24:00', cpu: 55, memory: 70, disk: 35, network: 35 }
  ];

  const systemAlerts = [
    {
      type: 'warning',
      title: 'استخدام الذاكرة مرتفع',
      description: 'استخدام الذاكرة وصل إلى 85%',
      time: 'منذ 5 دقائق',
      icon: AlertTriangle
    },
    {
      type: 'success',
      title: 'تم تحديث النظام',
      description: 'تم تحديث النظام بنجاح إلى الإصدار 2.1.0',
      time: 'منذ 30 دقيقة',
      icon: CheckCircle
    },
    {
      type: 'info',
      title: 'نسخة احتياطية جديدة',
      description: 'تم إنشاء نسخة احتياطية تلقائية',
      time: 'منذ ساعة',
      icon: Clock
    }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const systemStats = [
    { title: 'وقت التشغيل', value: '99.98%', icon: Server, color: 'from-green-500 to-green-600' },
    { title: 'وقت الاستجابة', value: '1.2s', icon: Activity, color: 'from-blue-500 to-blue-600' },
    { title: 'قاعدة البيانات', value: 'نشطة', icon: Database, color: 'from-purple-500 to-purple-600' },
    { title: 'الشبكة', value: 'مستقرة', icon: Wifi, color: 'from-emerald-500 to-emerald-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl">
              <Activity className="h-6 w-6 text-white" />
            </div>
            مراقبة النظام
          </h1>
          <p className="text-gray-600 mt-2">مراقبة الأداء والتنبيهات في الوقت الفعلي</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            إعدادات التنبيهات
          </Button>
          <Button className="bg-gradient-to-r from-red-500 to-pink-600 flex items-center gap-2">
            <Activity className="h-4 w-4" />
            تحديث فوري
          </Button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color} text-white`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Monitoring Tabs */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">الأداء</TabsTrigger>
          <TabsTrigger value="alerts">التنبيهات</TabsTrigger>
          <TabsTrigger value="health">صحة النظام</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>مراقبة الأداء</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cpu" stroke="#3B82F6" name="المعالج" strokeWidth={2} />
                    <Line type="monotone" dataKey="memory" stroke="#10B981" name="الذاكرة" strokeWidth={2} />
                    <Line type="monotone" dataKey="disk" stroke="#F59E0B" name="القرص الصلب" strokeWidth={2} />
                    <Line type="monotone" dataKey="network" stroke="#8B5CF6" name="الشبكة" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>التنبيهات النشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemAlerts.map((alert, index) => {
                  const AlertIcon = alert.icon;
                  return (
                    <div key={index} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
                      <div className="flex items-start gap-3">
                        <AlertIcon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-medium">{alert.title}</h3>
                          <p className="text-sm opacity-90 mt-1">{alert.description}</p>
                          <p className="text-xs opacity-75 mt-2">{alert.time}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          حل المشكلة
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>مؤشرات الصحة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {healthMetrics?.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-600">{metric.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{metric.current} {metric.unit}</span>
                        <Badge className={`
                          ${metric.status === 'normal' ? 'bg-green-100 text-green-800' : 
                            metric.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}
                        `}>
                          {metric.status === 'normal' ? 'طبيعي' : 
                           metric.status === 'warning' ? 'تحذير' : 'خطر'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إحصائيات الموارد</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>استخدام المعالج</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>استخدام الذاكرة</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>مساحة القرص</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemMonitoringPanel;
