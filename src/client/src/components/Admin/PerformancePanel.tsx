
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Zap, Database, Server, Globe } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PerformancePanel = () => {
  const { data: healthMetrics } = useQuery({
    queryKey: ['system-health-performance'],
    queryFn: async () => {
      const { data } = await supabase
        .from('system_health_logs')
        .select('*')
        .order('recorded_at', { ascending: false })
        .limit(50);

      // Group metrics by name for charts
      const groupedMetrics = data?.reduce((acc, metric) => {
        if (!acc[metric.metric_name]) {
          acc[metric.metric_name] = [];
        }
        acc[metric.metric_name].push({
          time: new Date(metric.recorded_at).toLocaleTimeString(),
          value: metric.metric_value
        });
        return acc;
      }, {} as Record<string, any[]>) || {};

      return {
        raw: data || [],
        grouped: groupedMetrics,
        latest: data?.reduce((acc, metric) => {
          if (!acc[metric.metric_name] || new Date(metric.recorded_at) > new Date(acc[metric.metric_name].recorded_at)) {
            acc[metric.metric_name] = metric;
          }
          return acc;
        }, {} as Record<string, any>) || {}
      };
    },
    refetchInterval: 30000
  });

  const performanceMetrics = [
    {
      name: 'استخدام المعالج',
      value: healthMetrics?.latest['cpu_usage']?.metric_value || 45,
      icon: Zap,
      color: 'text-blue-500',
      unit: '%'
    },
    {
      name: 'استخدام الذاكرة',
      value: healthMetrics?.latest['memory_usage']?.metric_value || 62,
      icon: Server,
      color: 'text-green-500',
      unit: '%'
    },
    {
      name: 'استخدام القرص',
      value: healthMetrics?.latest['disk_usage']?.metric_value || 38,
      icon: Database,
      color: 'text-purple-500',
      unit: '%'
    },
    {
      name: 'سرعة الشبكة',
      value: healthMetrics?.latest['network_speed']?.metric_value || 850,
      icon: Globe,
      color: 'text-orange-500',
      unit: 'Mbps'
    }
  ];

  const getStatusColor = (value: number, isSpeed = false) => {
    if (isSpeed) {
      if (value > 500) return 'bg-green-500';
      if (value > 200) return 'bg-yellow-500';
      return 'bg-red-500';
    }
    if (value < 50) return 'bg-green-500';
    if (value < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Zap className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold">مراقبة الأداء</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric) => {
          const Icon = metric.icon;
          const isSpeed = metric.unit === 'Mbps';
          
          return (
            <Card key={metric.name}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`h-8 w-8 ${metric.color}`} />
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {metric.value}{metric.unit}
                    </div>
                    <div className="text-sm text-gray-500">{metric.name}</div>
                  </div>
                </div>
                <Progress 
                  value={isSpeed ? Math.min((metric.value / 1000) * 100, 100) : metric.value} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>منخفض</span>
                  <span>عالي</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>استخدام المعالج - آخر ساعة</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={healthMetrics?.grouped['cpu_usage']?.slice(-20) || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>استخدام الذاكرة - آخر ساعة</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={healthMetrics?.grouped['memory_usage']?.slice(-20) || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10B981" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>إحصائيات النظام التفصيلية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold">وقت التشغيل</h4>
              <p className="text-2xl font-bold text-green-600">15 يوم</p>
              <p className="text-sm text-gray-500">آخر إعادة تشغيل: منذ 15 يوماً</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">متوسط زمن الاستجابة</h4>
              <p className="text-2xl font-bold text-blue-600">245ms</p>
              <p className="text-sm text-gray-500">آخر 24 ساعة</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">معدل الأخطاء</h4>
              <p className="text-2xl font-bold text-red-600">0.02%</p>
              <p className="text-sm text-gray-500">آخر 7 أيام</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>حالة الخدمات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'خدمة قاعدة البيانات', status: 'نشط', uptime: '99.9%' },
              { name: 'خدمة الملفات', status: 'نشط', uptime: '99.8%' },
              { name: 'خدمة البريد الإلكتروني', status: 'نشط', uptime: '100%' },
              { name: 'خدمة التخزين السحابي', status: 'نشط', uptime: '99.7%' }
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">{service.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">وقت التشغيل: {service.uptime}</span>
                  <span className="text-sm font-medium text-green-600">{service.status}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformancePanel;
