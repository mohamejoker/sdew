
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, DollarSign, ShoppingCart, TrendingUp, Activity, 
  Shield, AlertTriangle, CheckCircle, Clock, Zap, 
  Eye, Download, RefreshCw, Settings, Bell,
  BarChart3, FileText, Globe, Database
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { realTimeDataService, RealTimeMetrics } from '@/services/dashboard/realTimeDataService';

const AdvancedAdminDashboard = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<RealTimeMetrics | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  useEffect(() => {
    realTimeDataService.startRealTimeUpdates();
    setIsLive(true);

    const unsubscribe = realTimeDataService.subscribeToMetrics((data) => {
      setMetrics(data);
      setLastUpdate(new Date());
    });

    return () => {
      unsubscribe();
      realTimeDataService.stopRealTimeUpdates();
      setIsLive(false);
    };
  }, []);

  const adminStats = [
    {
      title: 'إجمالي المستخدمين',
      value: '12,547',
      change: '+156 اليوم',
      trending: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      route: '/admin/users'
    },
    {
      title: 'الإيرادات الشهرية',
      value: `${metrics?.revenue?.toLocaleString() || '0'} ريال`,
      change: '+18.2%',
      trending: 'up',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      route: '/admin/payments'
    },
    {
      title: 'الطلبات النشطة',
      value: metrics?.orders?.toString() || '0',
      change: '+12 منذ ساعة',
      trending: 'up',
      icon: ShoppingCart,
      color: 'from-purple-500 to-purple-600',
      route: '/admin/services'
    },
    {
      title: 'صحة النظام',
      value: `${metrics?.systemHealth || 0}%`,
      change: 'ممتاز',
      trending: 'up',
      icon: Activity,
      color: 'from-emerald-500 to-emerald-600',
      route: '/admin/performance'
    }
  ];

  const systemAlerts = [
    {
      type: 'warning',
      title: 'استخدام مرتفع للخادم',
      message: 'CPU Usage: 85% - يُنصح بالمراقبة',
      time: 'منذ 5 دقائق',
      severity: 'medium'
    },
    {
      type: 'success',
      title: 'تم تحديث النظام',
      message: 'نجح تحديث قاعدة البيانات بالإصدار الجديد',
      time: 'منذ 30 دقيقة',
      severity: 'low'
    },
    {
      type: 'info',
      title: 'نسخة احتياطية جديدة',
      message: 'تم إنشاء نسخة احتياطية تلقائية بنجاح',
      time: 'منذ ساعة',
      severity: 'low'
    }
  ];

  const quickActions = [
    { title: 'إدارة المستخدمين', icon: Users, route: '/admin/users', color: 'bg-blue-500' },
    { title: 'مراجعة المدفوعات', icon: DollarSign, route: '/admin/payments', color: 'bg-green-500' },
    { title: 'إعدادات الأمان', icon: Shield, route: '/admin/security', color: 'bg-red-500' },
    { title: 'التحليلات', icon: BarChart3, route: '/admin/analytics', color: 'bg-purple-500' },
    { title: 'إدارة المحتوى', icon: FileText, route: '/admin/content', color: 'bg-yellow-500' },
    { title: 'إعدادات النظام', icon: Settings, route: '/admin/settings', color: 'bg-gray-500' }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      case 'success': return 'border-l-green-500 bg-green-50';
      case 'info': return 'border-l-blue-500 bg-blue-50';
      case 'error': return 'border-l-red-500 bg-red-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            لوحة التحكم الإدارية المتقدمة
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
              isLive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500' : 'bg-red-500'} ${
                isLive ? 'animate-pulse' : ''
              }`}></div>
              {isLive ? 'مباشر' : 'غير متصل'}
            </div>
            <span className="text-sm text-gray-500">
              آخر تحديث: {lastUpdate.toLocaleTimeString('ar-SA')}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <select 
            value={selectedTimeRange} 
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="24h">24 ساعة</option>
            <option value="7d">7 أيام</option>
            <option value="30d">30 يوم</option>
            <option value="90d">90 يوم</option>
          </select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تصدير التقرير
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            تحديث
          </Button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index} 
              className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => navigate(stat.route)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-semibold">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl bg-gradient-to-tr ${stat.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-orange-500" />
            الإجراءات السريعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  onClick={() => navigate(action.route)}
                  className={`h-20 flex flex-col gap-2 ${action.color} hover:opacity-90 text-white`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs text-center">{action.title}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* System Status & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              أداء النظام الحالي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">معالج الخادم (CPU)</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-sm font-bold">45%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">الذاكرة (RAM)</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <span className="text-sm font-bold">68%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">مساحة التخزين</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                  <span className="text-sm font-bold">32%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">سرعة الشبكة</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-sm font-bold">85 Mbps</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-yellow-500" />
              تنبيهات النظام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemAlerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${getAlertColor(alert.type)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{alert.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{alert.time}</p>
                    </div>
                    {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-600 mt-1" />}
                    {alert.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600 mt-1" />}
                    {alert.type === 'info' && <Eye className="h-4 w-4 text-blue-600 mt-1" />}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/admin/notifications')}>
              عرض جميع التنبيهات
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-500" />
            النشاطات الأخيرة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">مستخدم جديد انضم للمنصة</p>
                <p className="text-xs text-gray-500">أحمد محمد سجل حساب جديد - منذ دقيقتين</p>
              </div>
              <Badge variant="secondary">جديد</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">دفعة جديدة تم استلامها</p>
                <p className="text-xs text-gray-500">دفع بقيمة 350 ريال عبر STC Pay - منذ 5 دقائق</p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">+350 ريال</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">طلب خدمة جديد</p>
                <p className="text-xs text-gray-500">طلب زيادة متابعين انستقرام - منذ 8 دقائق</p>
              </div>
              <Badge variant="secondary">قيد المعالجة</Badge>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/admin/analytics')}>
            عرض سجل النشاطات الكامل
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAdminDashboard;
