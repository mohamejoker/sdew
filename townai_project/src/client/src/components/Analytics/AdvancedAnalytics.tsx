
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CreditCard, 
  ShoppingBag, 
  DollarSign,
  Calendar,
  Download,
  BarChart3,
  PieChart,
  Activity,
  Target
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdvancedAnalytics = () => {
  const [dateRange, setDateRange] = useState('7d');

  // بيانات المخططات
  const revenueData = [
    { date: 'يناير', revenue: 4200, orders: 85, users: 120 },
    { date: 'فبراير', revenue: 5800, orders: 98, users: 145 },
    { date: 'مارس', revenue: 7200, orders: 125, users: 180 },
    { date: 'أبريل', revenue: 6900, orders: 115, users: 165 },
    { date: 'مايو', revenue: 8500, orders: 142, users: 210 },
    { date: 'يونيو', revenue: 9200, orders: 158, users: 235 },
    { date: 'يوليو', revenue: 10800, orders: 175, users: 280 }
  ];

  const serviceData = [
    { name: 'متابعين انستغرام', value: 35, count: 450 },
    { name: 'لايكات انستغرام', value: 25, count: 320 },
    { name: 'مشاهدات يوتيوب', value: 20, count: 258 },
    { name: 'متابعين تويتر', value: 12, count: 154 },
    { name: 'خدمات أخرى', value: 8, count: 103 }
  ];

  const dailyStats = [
    { day: 'السبت', orders: 45, revenue: 1250 },
    { day: 'الأحد', orders: 52, revenue: 1420 },
    { day: 'الاثنين', orders: 38, revenue: 980 },
    { day: 'الثلاثاء', orders: 61, revenue: 1680 },
    { day: 'الأربعاء', orders: 55, revenue: 1520 },
    { day: 'الخميس', orders: 48, revenue: 1340 },
    { day: 'الجمعة', orders: 42, revenue: 1150 }
  ];

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  // الإحصائيات الرئيسية
  const mainStats = [
    {
      title: 'إجمالي الإيرادات',
      value: '$52,847',
      change: '+15.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'إجمالي الطلبات',
      value: '1,293',
      change: '+8.7%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'text-blue-600'
    },
    {
      title: 'المستخدمين النشطين',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'متوسط قيمة الطلب',
      value: '$40.85',
      change: '-2.1%',
      trend: 'down',
      icon: Target,
      color: 'text-orange-600'
    }
  ];

  const dateRanges = [
    { value: '7d', label: '7 أيام' },
    { value: '30d', label: '30 يوم' },
    { value: '90d', label: '90 يوم' },
    { value: '1y', label: 'سنة واحدة' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">التحليلات المتقدمة</h1>
          <p className="text-gray-600 mt-1">تحليل شامل لأداء المنصة والإيرادات</p>
        </div>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {dateRanges.map((range) => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((stat, index) => {
          const IconComponent = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className={`flex items-center mt-2 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      <TrendIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              تطور الإيرادات الشهرية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`$${value}`, name === 'revenue' ? 'الإيرادات' : 'الطلبات']} />
                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Services Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-green-600" />
              توزيع الخدمات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <RechartsPieChart data={serviceData} dataKey="value" cx="50%" cy="50%" outerRadius={100}>
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </RechartsPieChart>
                <Tooltip formatter={(value) => [`${value}%`, 'النسبة']} />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {serviceData.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: colors[index % colors.length] }}
                    ></div>
                    <span className="text-sm text-gray-600">{service.name}</span>
                  </div>
                  <div className="text-sm font-medium">
                    {service.value}% ({service.count})
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-purple-600" />
            الأداء اليومي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="orders" fill="#3B82F6" name="الطلبات" />
              <Bar yAxisId="right" dataKey="revenue" fill="#10B981" name="الإيرادات" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">معدل التحويل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">3.2%</div>
            <div className="flex items-center text-sm text-gray-600">
              <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
              +0.5% من الشهر الماضي
            </div>
            <div className="mt-4 bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '32%' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">رضا العملاء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">4.8/5</div>
            <div className="flex items-center text-sm text-gray-600">
              <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
              +0.2 من الشهر الماضي
            </div>
            <div className="mt-4 flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div 
                  key={star} 
                  className={`w-4 h-4 ${star <= 4.8 ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ⭐
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">معدل الاحتفاظ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 mb-2">78%</div>
            <div className="flex items-center text-sm text-gray-600">
              <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
              +3% من الشهر الماضي
            </div>
            <div className="mt-4 bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
