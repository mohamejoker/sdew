import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, DollarSign, ShoppingCart, TrendingUp, Activity, 
  Shield, AlertTriangle, CheckCircle, Clock, Zap, 
  Eye, Download, RefreshCw, Settings, Bell,
  BarChart3, FileText, Globe, Database, UserCheck,
  CreditCard, Package, MessageSquare, Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  // جلب الإحصائيات الأساسية
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: async () => {
      const [
        { count: usersCount },
        { count: ordersCount },
        { count: transactionsCount },
        { data: recentTransactions }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('service_orders').select('*', { count: 'exact', head: true }),
        supabase.from('transactions').select('*', { count: 'exact', head: true }),
        supabase.from('transactions').select('*').order('created_at', { ascending: false }).limit(5)
      ]);

      const totalRevenue = recentTransactions?.reduce((sum, t) => 
        t.status === 'completed' ? sum + (t.amount || 0) : sum, 0) || 0;

      return {
        usersCount: usersCount || 0,
        ordersCount: ordersCount || 0,
        transactionsCount: transactionsCount || 0,
        totalRevenue,
        recentTransactions: recentTransactions || []
      };
    }
  });

  const quickActions = [
    { 
      title: 'إدارة المستخدمين', 
      icon: Users, 
      route: '/admin/users', 
      color: 'bg-blue-500',
      description: 'عرض وإدارة حسابات المستخدمين'
    },
    { 
      title: 'إدارة المدفوعات', 
      icon: CreditCard, 
      route: '/admin/payment-methods', 
      color: 'bg-green-500',
      description: 'تكوين طرق الدفع والمعاملات'
    },
    { 
      title: 'إدارة الخدمات', 
      icon: Package, 
      route: '/admin/services', 
      color: 'bg-purple-500',
      description: 'إضافة وتحرير الخدمات المتاحة'
    },
    { 
      title: 'إدارة الطلبات', 
      icon: ShoppingCart, 
      route: '/admin/orders', 
      color: 'bg-orange-500',
      description: 'متابعة ومعالجة الطلبات'
    },
    { 
      title: 'التحليلات', 
      icon: BarChart3, 
      route: '/admin/analytics', 
      color: 'bg-indigo-500',
      description: 'تقارير وإحصائيات مفصلة'
    },
    { 
      title: 'إعدادات النظام', 
      icon: Settings, 
      route: '/admin/settings', 
      color: 'bg-gray-500',
      description: 'تكوين إعدادات النظام العامة'
    },
    { 
      title: 'إدارة المحتوى', 
      icon: FileText, 
      route: '/admin/content', 
      color: 'bg-yellow-500',
      description: 'تحرير محتوى الموقع والصفحات'
    },
    { 
      title: 'الأمان والحماية', 
      icon: Shield, 
      route: '/admin/security', 
      color: 'bg-red-500',
      description: 'إعدادات الأمان ومراقبة النظام'
    },
    { 
      title: 'إدارة الإشعارات', 
      icon: Bell, 
      route: '/admin/notifications', 
      color: 'bg-pink-500',
      description: 'إرسال وإدارة الإشعارات'
    },
    { 
      title: 'إدارة الوظائف', 
      icon: Calendar, 
      route: '/jobs', 
      color: 'bg-teal-500',
      description: 'نشر وإدارة الوظائف المتاحة'
    },
    { 
      title: 'إدارة المزودين', 
      icon: Globe, 
      route: '/admin/providers', 
      color: 'bg-cyan-500',
      description: 'تكوين وإدارة مزودي الخدمات'
    },
    { 
      title: 'مراقبة الأداء', 
      icon: Activity, 
      route: '/admin/performance', 
      color: 'bg-emerald-500',
      description: 'مراقبة أداء النظام والخوادم'
    }
  ];

  const mainStats = [
    {
      title: 'إجمالي المستخدمين',
      value: stats?.usersCount?.toLocaleString() || '0',
      change: '+12%',
      trending: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'إجمالي الإيرادات',
      value: `${stats?.totalRevenue?.toLocaleString() || '0'} ر.س`,
      change: '+18%',
      trending: 'up',
      icon: DollarSign,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'الطلبات الإجمالية',
      value: stats?.ordersCount?.toLocaleString() || '0',
      change: '+25%',
      trending: 'up',
      icon: ShoppingCart,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'المعاملات',
      value: stats?.transactionsCount?.toLocaleString() || '0',
      change: '+8%',
      trending: 'up',
      icon: Activity,
      color: 'from-emerald-500 to-emerald-600'
    }
  ];

  const recentAlerts = [
    {
      type: 'success',
      title: 'مستخدم جديد',
      message: 'انضم مستخدم جديد للمنصة',
      time: 'منذ 5 دقائق'
    },
    {
      type: 'warning',
      title: 'استخدام مرتفع للخادم',
      message: 'CPU Usage: 85% - يُنصح بالمراقبة',
      time: 'منذ 15 دقيقة'
    },
    {
      type: 'info',
      title: 'نسخة احتياطية',
      message: 'تم إنشاء نسخة احتياطية تلقائية',
      time: 'منذ ساعة'
    }
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* العنوان الرئيسي */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            لوحة التحكم الإدارية
          </h1>
          <p className="text-gray-600 mt-2">نظرة شاملة على أداء المنصة والإحصائيات</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تصدير التقرير
          </Button>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-blue-500 to-purple-600 flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            تحديث
          </Button>
        </div>
      </div>

      {/* الإحصائيات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
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

      {/* الإجراءات السريعة */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-orange-500" />
            الإجراءات السريعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 group"
                  onClick={() => navigate(action.route)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-3 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
                        <p className="text-xs text-gray-500 line-clamp-2">{action.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* النشاط الحديث والتنبيهات */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* التنبيهات الأخيرة */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-yellow-500" />
              التنبيهات الأخيرة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'success' ? 'border-l-green-500 bg-green-50' :
                  alert.type === 'warning' ? 'border-l-yellow-500 bg-yellow-50' :
                  'border-l-blue-500 bg-blue-50'
                }`}>
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

        {/* المعاملات الأخيرة */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-500" />
              المعاملات الأخيرة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats?.recentTransactions?.slice(0, 5).map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{transaction.customer_name || 'غير محدد'}</p>
                    <p className="text-xs text-gray-500">{transaction.description}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(transaction.created_at).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{transaction.amount} ر.س</p>
                    <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                      {transaction.status === 'completed' ? 'مكتمل' : 
                       transaction.status === 'pending' ? 'معلق' : 'ملغي'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/admin/payments')}>
              عرض جميع المعاملات
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
