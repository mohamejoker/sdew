
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  RefreshCw,
  Database,
  Wifi,
  Shield,
  Settings,
  Users,
  FileText
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DiagnosticCheck {
  id: string;
  name: string;
  description: string;
  status: 'checking' | 'passed' | 'failed' | 'warning';
  details?: string;
  icon: React.ElementType;
}

const SystemDiagnostics = () => {
  const [checks, setChecks] = useState<DiagnosticCheck[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const initialChecks: DiagnosticCheck[] = [
    {
      id: 'database',
      name: 'اتصال قاعدة البيانات',
      description: 'التحقق من اتصال Supabase',
      status: 'checking',
      icon: Database
    },
    {
      id: 'auth',
      name: 'نظام المصادقة',
      description: 'التحقق من عمل نظام تسجيل الدخول',
      status: 'checking',
      icon: Shield
    },
    {
      id: 'tables',
      name: 'جداول البيانات',
      description: 'التحقق من وجود الجداول الأساسية',
      status: 'checking',
      icon: FileText
    },
    {
      id: 'permissions',
      name: 'صلاحيات المستخدمين',
      description: 'التحقق من إعدادات RLS',
      status: 'checking',
      icon: Users
    },
    {
      id: 'api',
      name: 'واجهة برمجة التطبيقات',
      description: 'التحقق من استجابة API',
      status: 'checking',
      icon: Wifi
    },
    {
      id: 'config',
      name: 'الإعدادات العامة',
      description: 'التحقق من صحة الإعدادات',
      status: 'checking',
      icon: Settings
    }
  ];

  const runDiagnostics = async () => {
    setIsRunning(true);
    setChecks(initialChecks);

    // فحص اتصال قاعدة البيانات
    try {
      const { data, error } = await supabase.from('profiles').select('count').limit(1);
      updateCheckStatus('database', error ? 'failed' : 'passed', 
        error ? `خطأ في الاتصال: ${error.message}` : 'الاتصال يعمل بشكل صحيح');
    } catch (err) {
      updateCheckStatus('database', 'failed', 'فشل في الاتصال بقاعدة البيانات');
    }

    // فحص نظام المصادقة
    try {
      const { data: { user } } = await supabase.auth.getUser();
      updateCheckStatus('auth', user ? 'passed' : 'warning', 
        user ? 'المستخدم مسجل دخول' : 'لا يوجد مستخدم مسجل دخول');
    } catch (err) {
      updateCheckStatus('auth', 'failed', 'خطأ في نظام المصادقة');
    }

    // فحص الجداول الأساسية - استخدام أسماء الجداول الصحيحة
    const requiredTables = ['profiles', 'services', 'service_orders', 'user_roles'] as const;
    let tablesStatus = 'passed';
    let tablesDetails = 'جميع الجداول موجودة';

    for (const table of requiredTables) {
      try {
        const { error } = await supabase.from(table).select('*').limit(1);
        if (error) {
          tablesStatus = 'failed';
          tablesDetails = `جدول ${table} غير موجود أو لا يمكن الوصول إليه`;
          break;
        }
      } catch (err) {
        tablesStatus = 'failed';
        tablesDetails = `خطأ في فحص الجداول`;
        break;
      }
    }
    updateCheckStatus('tables', tablesStatus as any, tablesDetails);

    // فحص صلاحيات المستخدمين
    try {
      const { data, error } = await supabase.from('user_roles').select('*').limit(1);
      updateCheckStatus('permissions', error ? 'warning' : 'passed',
        error ? 'قد تحتاج لضبط صلاحيات RLS' : 'الصلاحيات تعمل بشكل صحيح');
    } catch (err) {
      updateCheckStatus('permissions', 'failed', 'خطأ في فحص الصلاحيات');
    }

    // فحص واجهة برمجة التطبيقات
    try {
      const response = await fetch('/api/health');
      updateCheckStatus('api', response?.ok ? 'passed' : 'warning',
        response?.ok ? 'API يستجيب بشكل صحيح' : 'API قد لا يعمل بالشكل المطلوب');
    } catch (err) {
      updateCheckStatus('api', 'warning', 'لا يمكن الوصول لـ API endpoint');
    }

    // فحص الإعدادات العامة
    try {
      const { data, error } = await supabase.from('system_settings').select('*').limit(5);
      updateCheckStatus('config', error ? 'warning' : 'passed',
        error ? 'بعض الإعدادات قد تكون مفقودة' : 'الإعدادات محملة بشكل صحيح');
    } catch (err) {
      updateCheckStatus('config', 'warning', 'تحذير: فحص الإعدادات');
    }

    setIsRunning(false);
  };

  const updateCheckStatus = (checkId: string, status: DiagnosticCheck['status'], details?: string) => {
    setChecks(prev => prev.map(check => 
      check.id === checkId 
        ? { ...check, status, details }
        : check
    ));
  };

  const getStatusColor = (status: DiagnosticCheck['status']) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'checking': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: DiagnosticCheck['status']) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'checking': return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      default: return null;
    }
  };

  const getStatusText = (status: DiagnosticCheck['status']) => {
    switch (status) {
      case 'passed': return 'نجح';
      case 'failed': return 'فشل';
      case 'warning': return 'تحذير';
      case 'checking': return 'جاري الفحص...';
      default: return 'غير محدد';
    }
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  const overallStatus = checks.length > 0 ? (
    checks.every(c => c.status === 'passed') ? 'passed' :
    checks.some(c => c.status === 'failed') ? 'failed' : 'warning'
  ) : 'checking';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">فحص أساسيات النظام</CardTitle>
              <p className="text-gray-600 mt-2">التحقق من حالة جميع مكونات النظام الأساسية</p>
            </div>
            <Button 
              onClick={runDiagnostics} 
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRunning ? 'animate-spin' : ''}`} />
              {isRunning ? 'جاري الفحص...' : 'إعادة فحص'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              {getStatusIcon(overallStatus)}
              <span className="font-medium">الحالة العامة:</span>
            </div>
            <Badge className={getStatusColor(overallStatus)}>
              {getStatusText(overallStatus)}
            </Badge>
          </div>

          <div className="grid gap-4">
            {checks.map((check) => {
              const IconComponent = check.icon;
              return (
                <div key={check.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-5 w-5 text-gray-500" />
                    <div>
                      <h3 className="font-medium">{check.name}</h3>
                      <p className="text-sm text-gray-600">{check.description}</p>
                      {check.details && (
                        <p className="text-xs text-gray-500 mt-1">{check.details}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(check.status)}
                    <Badge className={getStatusColor(check.status)}>
                      {getStatusText(check.status)}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemDiagnostics;
