
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Users, 
  Shield, 
  Zap, 
  Brain,
  FileText,
  DollarSign,
  Globe,
  Activity,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SystemStatus {
  name: string;
  status: 'active' | 'warning' | 'error';
  lastUpdate: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

const UnifiedDashboard = () => {
  const navigate = useNavigate();
  const [activeSystem, setActiveSystem] = useState<string>('overview');

  const systemsStatus: SystemStatus[] = [
    {
      name: 'نظام الذكاء الاصطناعي',
      status: 'active',
      lastUpdate: 'منذ دقيقتين',
      metrics: [
        { label: 'المحادثات النشطة', value: '23' },
        { label: 'معدل الاستجابة', value: '1.2 ثانية' }
      ]
    },
    {
      name: 'نظام المدفوعات',
      status: 'active',
      lastUpdate: 'منذ 5 دقائق',
      metrics: [
        { label: 'المعاملات اليوم', value: '156' },
        { label: 'إجمالي المبيعات', value: '12,450 ج.م' }
      ]
    },
    {
      name: 'نظام الأمان',
      status: 'warning',
      lastUpdate: 'منذ 10 دقائق',
      metrics: [
        { label: 'محاولات الدخول المشبوهة', value: '3' },
        { label: 'IPs محظورة', value: '2' }
      ]
    },
    {
      name: 'نظام التقارير',
      status: 'active',
      lastUpdate: 'منذ ساعة',
      metrics: [
        { label: 'التقارير المنشأة', value: '8' },
        { label: 'معدل التصدير', value: '95%' }
      ]
    }
  ];

  const quickActions = [
    { 
      title: 'AI Chat', 
      icon: Brain, 
      color: 'from-purple-500 to-purple-600',
      action: () => navigate('/ai-chat')
    },
    { 
      title: 'Analytics', 
      icon: BarChart3, 
      color: 'from-blue-500 to-blue-600',
      action: () => navigate('/admin/analytics')
    },
    { 
      title: 'Users', 
      icon: Users, 
      color: 'from-green-500 to-green-600',
      action: () => navigate('/admin/users')
    },
    { 
      title: 'Security', 
      icon: Shield, 
      color: 'from-red-500 to-red-600',
      action: () => navigate('/admin/security')
    },
    { 
      title: 'Payments', 
      icon: DollarSign, 
      color: 'from-yellow-500 to-yellow-600',
      action: () => navigate('/admin/payments')
    },
    { 
      title: 'Reports', 
      icon: FileText, 
      color: 'from-indigo-500 to-indigo-600',
      action: () => navigate('/admin/analytics')
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">لوحة التحكم الموحدة</h1>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/admin/settings')} variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            الإعدادات
          </Button>
        </div>
      </div>

      {/* نظرة عامة سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المستخدمون النشطون</p>
                <p className="text-2xl font-bold">2,143</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الإيرادات اليوم</p>
                <p className="text-2xl font-bold">18,250 ج.م</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">محادثات AI</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <Brain className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">أداء النظام</p>
                <p className="text-2xl font-bold">98.5%</p>
              </div>
              <Zap className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeSystem} onValueChange={setActiveSystem}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="systems">حالة الأنظمة</TabsTrigger>
          <TabsTrigger value="actions">إجراءات سريعة</TabsTrigger>
          <TabsTrigger value="monitoring">المراقبة</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>الأنشطة الأخيرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">محادثة AI جديدة</p>
                      <p className="text-sm text-gray-600">المستخدم أحمد بدأ محادثة - منذ دقيقتين</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">معاملة جديدة</p>
                      <p className="text-sm text-gray-600">دفع بقيمة 250 ج.م عبر فودافون كاش - منذ 5 دقائق</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <Shield className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium">تحذير أمني</p>
                      <p className="text-sm text-gray-600">محاولة دخول مشبوهة من IP جديد - منذ 10 دقائق</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إحصائيات سريعة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">معدل نجاح المعاملات</span>
                    <span className="font-bold text-green-600">97.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">متوسط وقت الاستجابة</span>
                    <span className="font-bold text-blue-600">1.2 ثانية</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">المستخدمون الجدد اليوم</span>
                    <span className="font-bold text-purple-600">43</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">استخدام الذاكرة</span>
                    <span className="font-bold text-orange-600">68%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="systems" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {systemsStatus.map((system, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{system.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(system.status)}`}>
                      {system.status === 'active' ? 'نشط' : system.status === 'warning' ? 'تحذير' : 'خطأ'}
                    </span>
                  </CardTitle>
                  <p className="text-sm text-gray-600">آخر تحديث: {system.lastUpdate}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {system.metrics.map((metric, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span className="text-gray-600">{metric.label}</span>
                        <span className="font-medium">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={index}
                  onClick={action.action}
                  className={`h-24 flex flex-col gap-2 bg-gradient-to-r ${action.color} hover:opacity-90`}
                >
                  <IconComponent className="h-6 w-6" />
                  <span className="text-sm">{action.title}</span>
                </Button>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>مراقبة الأداء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory</span>
                      <span>68%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Storage</span>
                      <span>32%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إحصائيات الشبكة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Requests/min</span>
                    <span className="font-bold">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Response Time</span>
                    <span className="font-bold">125ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Error Rate</span>
                    <span className="font-bold text-green-600">0.02%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Uptime</span>
                    <span className="font-bold text-green-600">99.98%</span>
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

export default UnifiedDashboard;
