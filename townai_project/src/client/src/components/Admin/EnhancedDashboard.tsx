
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, Users, DollarSign, Activity, 
  Bell, RefreshCw, Download, Eye 
} from 'lucide-react';
import { useAdvancedDashboard } from '@/hooks/useAdvancedDashboard';
import { useSystemHealth } from '@/hooks/useSystemHealth';
import { useNotifications } from '@/hooks/useNotifications';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const EnhancedDashboard = () => {
  const { data: metrics, isLoading: metricsLoading } = useAdvancedDashboard();
  const { data: healthData } = useSystemHealth();
  const { notifications, unreadCount } = useNotifications();

  // بيانات وهمية للرسوم البيانية
  const chartData = [
    { name: 'يناير', users: 400, revenue: 2400, transactions: 120 },
    { name: 'فبراير', users: 300, revenue: 1398, transactions: 98 },
    { name: 'مارس', users: 200, revenue: 9800, transactions: 86 },
    { name: 'أبريل', users: 278, revenue: 3908, transactions: 156 },
    { name: 'مايو', users: 189, revenue: 4800, transactions: 198 },
    { name: 'يونيو', users: 239, revenue: 3800, transactions: 165 }
  ];

  if (metricsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" text="جاري تحميل لوحة التحكم..." />
      </div>
    );
  }

  const statCards = [
    {
      title: 'إجمالي المستخدمين',
      value: metrics?.totalUsers?.toLocaleString() || '0',
      change: '+12%',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'إجمالي الإيرادات',
      value: `${metrics?.totalRevenue?.toLocaleString() || '0'} ريال`,
      change: `+${metrics?.monthlyGrowth || 0}%`,
      icon: DollarSign,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'المعاملات',
      value: metrics?.totalTransactions?.toLocaleString() || '0',
      change: '+8%',
      icon: Activity,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'صحة النظام',
      value: `${metrics?.systemHealth || 0}%`,
      change: '+2%',
      icon: TrendingUp,
      color: 'from-emerald-500 to-emerald-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم المتقدمة</h1>
          <p className="text-gray-600 mt-1">نظرة شاملة على أداء المنصة</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            الإشعارات
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white">{unreadCount}</Badge>
            )}
          </Button>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-2 text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-4 rounded-full bg-gradient-to-r ${stat.color} text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>تطور الإيرادات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} ريال`, 'الإيرادات']} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10B981" 
                    fillOpacity={1}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Users Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>نمو المستخدمين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>صحة النظام</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthData?.slice(0, 4).map((metric, index) => (
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

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>النشاط الحديث</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics?.recentActivity?.slice(0, 5).map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action_type}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.created_at).toLocaleString('ar-SA')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              <Eye className="h-4 w-4 mr-2" />
              عرض جميع الأنشطة
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
