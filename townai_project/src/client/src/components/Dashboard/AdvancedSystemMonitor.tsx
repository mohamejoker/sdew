
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Database, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Activity,
  BarChart3,
  RefreshCw,
  Download
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SystemStatus {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  uptime: string;
  lastUpdate: Date;
}

const AdvancedSystemMonitor = () => {
  const [systemData, setSystemData] = useState<SystemStatus>({
    cpu: 45,
    memory: 68,
    disk: 32,
    network: 120,
    uptime: '15 يوم، 8 ساعات',
    lastUpdate: new Date()
  });
  
  const [performanceHistory, setPerformanceHistory] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    // محاكاة البيانات الحية
    const interval = setInterval(() => {
      setSystemData(prev => ({
        ...prev,
        cpu: Math.floor(Math.random() * 30) + 40,
        memory: Math.floor(Math.random() * 40) + 50,
        disk: Math.floor(Math.random() * 20) + 25,
        network: Math.floor(Math.random() * 50) + 100,
        lastUpdate: new Date()
      }));

      // إضافة نقطة جديدة للرسم البياني
      setPerformanceHistory(prev => {
        const newPoint = {
          time: new Date().toLocaleTimeString('ar-SA', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          cpu: Math.floor(Math.random() * 30) + 40,
          memory: Math.floor(Math.random() * 40) + 50,
          disk: Math.floor(Math.random() * 20) + 25,
          network: Math.floor(Math.random() * 50) + 100
        };
        
        const newHistory = [...prev, newPoint];
        return newHistory.slice(-20); // الاحتفاظ بآخر 20 نقطة
      });
    }, isLive ? 3000 : 0);

    return () => clearInterval(interval);
  }, [isLive]);

  const systemComponents = [
    {
      name: 'خادم الويب',
      status: 'active',
      uptime: '99.9%',
      lastCheck: 'منذ دقيقة',
      icon: Server,
      details: 'Apache 2.4.41'
    },
    {
      name: 'قاعدة البيانات',
      status: 'active',
      uptime: '99.8%',
      lastCheck: 'منذ دقيقتين',
      icon: Database,
      details: 'PostgreSQL 14.2'
    },
    {
      name: 'نظام الأمان',
      status: 'warning',
      uptime: '98.5%',
      lastCheck: 'منذ 5 دقائق',
      icon: Shield,
      details: 'SSL Certificate expires in 30 days'
    },
    {
      name: 'API Gateway',
      status: 'active',
      uptime: '99.7%',
      lastCheck: 'منذ دقيقة',
      icon: Wifi,
      details: 'Rate limit: 1000/min'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      default: return Clock;
    }
  };

  const ProgressBar = ({ label, value, color, unit = '%' }: {
    label: string;
    value: number;
    color: string;
    unit?: string;
  }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{value}{unit}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`h-3 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">مراقبة النظام المتقدمة</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600">
              {isLive ? 'مباشر' : 'متوقف'} - آخر تحديث: {systemData.lastUpdate.toLocaleTimeString('ar-SA')}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsLive(!isLive)}
          >
            {isLive ? 'إيقاف' : 'تشغيل'} المراقبة
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            تصدير السجلات
          </Button>
          <Button size="sm" className="bg-blue-600">
            <RefreshCw className="h-4 w-4 mr-2" />
            إعدادات المراقبة
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="performance">الأداء</TabsTrigger>
          <TabsTrigger value="services">الخدمات</TabsTrigger>
          <TabsTrigger value="logs">السجلات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* مقاييس النظام الرئيسية */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">معالج النظام</p>
                    <p className="text-2xl font-bold text-blue-900">{systemData.cpu}%</p>
                    <p className="text-xs text-blue-600 mt-1">
                      {systemData.cpu > 80 ? 'مرتفع' : systemData.cpu > 60 ? 'متوسط' : 'منخفض'}
                    </p>
                  </div>
                  <Cpu className="h-8 w-8 text-blue-600" />
                </div>
                <div className="mt-4">
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${systemData.cpu}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">الذاكرة</p>
                    <p className="text-2xl font-bold text-green-900">{systemData.memory}%</p>
                    <p className="text-xs text-green-600 mt-1">8.2 GB / 16 GB</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
                <div className="mt-4">
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${systemData.memory}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-600 text-sm font-medium">مساحة التخزين</p>
                    <p className="text-2xl font-bold text-orange-900">{systemData.disk}%</p>
                    <p className="text-xs text-orange-600 mt-1">320 GB / 1 TB</p>
                  </div>
                  <HardDrive className="h-8 w-8 text-orange-600" />
                </div>
                <div className="mt-4">
                  <div className="w-full bg-orange-200 rounded-full h-2">
                    <div 
                      className="bg-orange-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${systemData.disk}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">الشبكة</p>
                    <p className="text-2xl font-bold text-purple-900">{systemData.network} MB/s</p>
                    <p className="text-xs text-purple-600 mt-1">استهلاك مباشر</p>
                  </div>
                  <Wifi className="h-8 w-8 text-purple-600" />
                </div>
                <div className="mt-4">
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(systemData.network / 5, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* معلومات النظام */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                معلومات النظام
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">وقت التشغيل</h4>
                  <p className="text-2xl font-bold text-green-600">{systemData.uptime}</p>
                  <p className="text-sm text-gray-500">منذ آخر إعادة تشغيل</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">آخر تحديث</h4>
                  <p className="text-lg font-medium text-blue-600">
                    {systemData.lastUpdate.toLocaleString('ar-SA')}
                  </p>
                  <p className="text-sm text-gray-500">البيانات الحية</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">حالة النظام</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-600 font-medium">يعمل بكفاءة</span>
                  </div>
                  <p className="text-sm text-gray-500">جميع الأنظمة تعمل</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>رسم الأداء التاريخي</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={performanceHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="cpu" stroke="#3B82F6" name="المعالج" strokeWidth={2} />
                  <Line type="monotone" dataKey="memory" stroke="#10B981" name="الذاكرة" strokeWidth={2} />
                  <Line type="monotone" dataKey="disk" stroke="#F59E0B" name="التخزين" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <div className="grid gap-4">
            {systemComponents.map((component, index) => {
              const StatusIcon = getStatusIcon(component.status);
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <component.icon className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{component.name}</h3>
                          <p className="text-sm text-gray-500">{component.details}</p>
                          <p className="text-xs text-gray-400 mt-1">آخر فحص: {component.lastCheck}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-500">وقت التشغيل</p>
                          <p className="font-semibold">{component.uptime}</p>
                        </div>
                        <Badge className={getStatusColor(component.status)}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {component.status === 'active' ? 'نشط' : 
                           component.status === 'warning' ? 'تحذير' : 'خطأ'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>سجلات النظام الأخيرة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {Array.from({ length: 15 }, (_, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      i % 4 === 0 ? 'bg-red-500' : 
                      i % 4 === 1 ? 'bg-yellow-500' : 
                      i % 4 === 2 ? 'bg-green-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {i % 4 === 0 ? 'تحذير: استخدام مرتفع للمعالج' :
                         i % 4 === 1 ? 'معلومات: تم تحديث قاعدة البيانات' :
                         i % 4 === 2 ? 'نجح: إكمال النسخ الاحتياطي' :
                         'نشاط: دخول مستخدم جديد'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(Date.now() - i * 60000).toLocaleString('ar-SA')}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {i % 4 === 0 ? 'WARNING' : i % 4 === 1 ? 'INFO' : i % 4 === 2 ? 'SUCCESS' : 'ACTIVITY'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedSystemMonitor;
