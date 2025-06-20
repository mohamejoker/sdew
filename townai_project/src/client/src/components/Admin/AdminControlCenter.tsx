import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Power, Settings, Database, Shield, Users, 
  AlertTriangle, CheckCircle, Clock, Zap,
  RefreshCw, Download, Upload, Archive
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminControlCenter = () => {
  const navigate = useNavigate();
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [systemStatus, setSystemStatus] = useState('operational');

  const systemControls = [
    {
      title: 'إعادة تشغيل النظام',
      description: 'إعادة تشغيل جميع الخدمات',
      icon: Power,
      color: 'bg-red-500',
      action: () => console.log('System restart'),
      dangerous: true
    },
    {
      title: 'تحديث النظام',
      description: 'تحديث إلى أحدث إصدار',
      icon: RefreshCw,
      color: 'bg-blue-500',
      action: () => console.log('System update')
    },
    {
      title: 'نسخة احتياطية',
      description: 'إنشاء نسخة احتياطية كاملة',
      icon: Archive,
      color: 'bg-green-500',
      action: () => console.log('Create backup')
    },
    {
      title: 'استيراد البيانات',
      description: 'استيراد بيانات من ملف',
      icon: Upload,
      color: 'bg-purple-500',
      action: () => console.log('Import data')
    },
    {
      title: 'تصدير البيانات',
      description: 'تصدير جميع البيانات',
      icon: Download,
      color: 'bg-yellow-500',
      action: () => console.log('Export data')
    },
    {
      title: 'إعدادات الأمان',
      description: 'تكوين إعدادات الحماية',
      icon: Shield,
      color: 'bg-orange-500',
      action: () => navigate('/admin/security')
    }
  ];

  const systemServices = [
    { name: 'خدمة المصادقة', status: 'running', uptime: '99.9%' },
    { name: 'قاعدة البيانات', status: 'running', uptime: '99.8%' },
    { name: 'خدمة الدفع', status: 'running', uptime: '99.7%' },
    { name: 'خدمة الإشعارات', status: 'warning', uptime: '98.5%' },
    { name: 'خدمة التحليلات', status: 'running', uptime: '99.9%' },
    { name: 'خدمة الأمان', status: 'running', uptime: '100%' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'stopped': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'stopped': return <Clock className="h-4 w-4 text-gray-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">مركز التحكم الإداري</h2>
        <div className="flex items-center gap-2">
          <Badge variant={systemStatus === 'operational' ? 'secondary' : 'destructive'}>
            {systemStatus === 'operational' ? 'النظام يعمل بشكل طبيعي' : 'مشاكل في النظام'}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="controls" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="controls">أدوات التحكم</TabsTrigger>
          <TabsTrigger value="services">الخدمات</TabsTrigger>
          <TabsTrigger value="maintenance">الصيانة</TabsTrigger>
        </TabsList>

        <TabsContent value="controls" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systemControls.map((control, index) => {
              const Icon = control.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className={`p-4 rounded-full ${control.color} text-white`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{control.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{control.description}</p>
                      </div>
                      <Button 
                        onClick={control.action}
                        variant={control.dangerous ? "destructive" : "default"}
                        className="w-full"
                      >
                        {control.dangerous ? 'تنفيذ بحذر' : 'تنفيذ'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                حالة الخدمات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(service.status)}
                      <div>
                        <p className="font-medium text-gray-900">{service.name}</p>
                        <p className="text-sm text-gray-600">وقت التشغيل: {service.uptime}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(service.status)}>
                      {service.status === 'running' ? 'يعمل' : 
                       service.status === 'warning' ? 'تحذير' : 
                       service.status === 'error' ? 'خطأ' : 'متوقف'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-gray-500" />
                إعدادات الصيانة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div>
                  <h3 className="font-semibold text-gray-900">وضع الصيانة</h3>
                  <p className="text-sm text-gray-600">تفعيل وضع الصيانة لجميع المستخدمين</p>
                </div>
                <Button 
                  variant={maintenanceMode ? "destructive" : "outline"}
                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                >
                  {maintenanceMode ? 'إلغاء الصيانة' : 'تفعيل الصيانة'}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  تنظيف قاعدة البيانات
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Archive className="h-4 w-4" />
                  أرشفة السجلات القديمة
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  مسح الذاكرة المؤقتة
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  فحص الأمان
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminControlCenter;
