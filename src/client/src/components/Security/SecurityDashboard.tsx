
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  Lock,
  Activity,
  Users,
  Ban,
  CheckCircle
} from 'lucide-react';
import { securityService, SecurityAlert, SecurityAudit } from '@/services/security/securityService';

const SecurityDashboard = () => {
  const [stats, setStats] = useState(securityService.getSecurityStats());
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [auditLog, setAuditLog] = useState<SecurityAudit[]>([]);

  useEffect(() => {
    loadSecurityData();
  }, []);

  const loadSecurityData = () => {
    setStats(securityService.getSecurityStats());
    setAlerts(securityService.getSecurityAlerts());
    setAuditLog(securityService.getSecurityAuditLog(50));
  };

  const resolveAlert = (alertId: string) => {
    securityService.resolveAlert(alertId);
    loadSecurityData();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'login_attempt': return Users;
      case 'data_breach': return AlertTriangle;
      case 'suspicious_activity': return Eye;
      case 'system_error': return Activity;
      default: return Shield;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">لوحة الأمان</h2>
        <Button onClick={loadSecurityData}>
          <Activity className="h-4 w-4 mr-2" />
          تحديث البيانات
        </Button>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">التنبيهات النشطة</p>
                <p className="text-2xl font-bold text-red-600">{stats.unresolvedAlerts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">محاولات الدخول الفاشلة</p>
                <p className="text-2xl font-bold text-orange-600">{stats.failedLogins}</p>
              </div>
              <Ban className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">عناوين IP محظورة</p>
                <p className="text-2xl font-bold text-gray-600">{stats.blockedIPs}</p>
              </div>
              <Shield className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">دخول ناجح اليوم</p>
                <p className="text-2xl font-bold text-green-600">{stats.successfulLogins}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alerts" className="w-full">
        <TabsList>
          <TabsTrigger value="alerts">التنبيهات الأمنية</TabsTrigger>
          <TabsTrigger value="audit">سجل المراجعة</TabsTrigger>
          <TabsTrigger value="blocked">العناوين المحظورة</TabsTrigger>
        </TabsList>
        
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>التنبيهات الأمنية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">لا توجد تنبيهات أمنية</p>
                ) : (
                  alerts.map((alert) => {
                    const IconComponent = getAlertIcon(alert.type);
                    return (
                      <div key={alert.id} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <IconComponent className="h-5 w-5 mt-1" />
                            <div>
                              <p className="font-medium">{alert.message}</p>
                              <p className="text-sm opacity-75">
                                {alert.timestamp.toLocaleString('ar-SA')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={alert.resolved ? 'default' : 'destructive'}>
                              {alert.resolved ? 'تم الحل' : alert.severity}
                            </Badge>
                            {!alert.resolved && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => resolveAlert(alert.id)}
                              >
                                حل
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>سجل المراجعة الأمنية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-2">الوقت</th>
                      <th className="text-right p-2">الإجراء</th>
                      <th className="text-right p-2">المستخدم</th>
                      <th className="text-right p-2">عنوان IP</th>
                      <th className="text-right p-2">النتيجة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLog.map((entry) => (
                      <tr key={entry.id} className="border-b">
                        <td className="p-2 text-sm">
                          {entry.timestamp.toLocaleString('ar-SA')}
                        </td>
                        <td className="p-2">{entry.action}</td>
                        <td className="p-2">{entry.userId || 'غير محدد'}</td>
                        <td className="p-2 font-mono text-sm">{entry.ipAddress}</td>
                        <td className="p-2">
                          <Badge variant={entry.result === 'success' ? 'default' : 'destructive'}>
                            {entry.result === 'success' ? 'نجح' : 'فشل'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blocked">
          <Card>
            <CardHeader>
              <CardTitle>عناوين IP المحظورة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {stats.blockedIPs === 0 ? (
                  <p className="text-center text-gray-500 py-8">لا توجد عناوين IP محظورة</p>
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    يوجد {stats.blockedIPs} عنوان IP محظور
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityDashboard;
