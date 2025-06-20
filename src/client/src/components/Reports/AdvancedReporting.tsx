
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  Calendar, Download, Filter, TrendingUp, TrendingDown,
  Users, DollarSign, Package, Eye, Share2, Clock
} from 'lucide-react';

const AdvancedReporting = () => {
  const [reportType, setReportType] = useState('monthly');
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const monthlyData = [
    { month: 'يناير', revenue: 45000, orders: 120, customers: 89, growth: 12 },
    { month: 'فبراير', revenue: 52000, orders: 145, customers: 102, growth: 15 },
    { month: 'مارس', revenue: 48000, orders: 132, customers: 95, growth: 8 },
    { month: 'أبريل', revenue: 61000, orders: 168, customers: 125, growth: 22 },
    { month: 'مايو', revenue: 55000, orders: 152, customers: 110, growth: 18 },
    { month: 'يونيو', revenue: 67000, orders: 185, customers: 140, growth: 25 }
  ];

  const servicePerformance = [
    { service: 'متابعين Instagram', sales: 45, revenue: 135000, satisfaction: 4.8 },
    { service: 'لايكات Instagram', sales: 30, revenue: 90000, satisfaction: 4.7 },
    { service: 'مشاهدات TikTok', sales: 25, revenue: 75000, satisfaction: 4.9 },
    { service: 'متابعين TikTok', sales: 35, revenue: 105000, satisfaction: 4.6 },
    { service: 'مشاهدات YouTube', sales: 20, revenue: 60000, satisfaction: 4.8 },
    { service: 'لايكات TikTok', sales: 15, revenue: 45000, satisfaction: 4.7 }
  ];

  const customerAnalytics = [
    { metric: 'الاحتفاظ', value: 85, max: 100 },
    { metric: 'الرضا', value: 92, max: 100 },
    { metric: 'التوصية', value: 78, max: 100 },
    { metric: 'الولاء', value: 88, max: 100 },
    { metric: 'التفاعل', value: 75, max: 100 }
  ];

  const topMetrics = [
    {
      title: 'إجمالي الإيرادات',
      value: '328,500 ريال',
      change: '+18.2%',
      trending: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'إجمالي الطلبات',
      value: '1,247',
      change: '+12.8%',
      trending: 'up',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'العملاء الجدد',
      value: '189',
      change: '+25.4%',
      trending: 'up',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'معدل النمو',
      value: '15.6%',
      change: '+3.2%',
      trending: 'up',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  const generateReport = () => {
    const reportData = {
      type: reportType,
      period: selectedPeriod,
      generated: new Date().toISOString(),
      data: {
        summary: topMetrics,
        monthly: monthlyData,
        services: servicePerformance,
        customer: customerAnalytics
      }
    };
    
    // محاكاة تحميل التقرير
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `تقرير-${reportType}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">التقارير والتحليلات</h2>
          <p className="text-gray-600">تقارير شاملة لأداء المنصة</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={reportType} 
            onChange={(e) => setReportType(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="daily">يومي</option>
            <option value="weekly">أسبوعي</option>
            <option value="monthly">شهري</option>
            <option value="yearly">سنوي</option>
          </select>
          
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="current">الفترة الحالية</option>
            <option value="previous">الفترة السابقة</option>
            <option value="comparison">مقارنة</option>
          </select>
          
          <Button onClick={generateReport} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <div className={`flex items-center mt-1 ${metric.color}`}>
                    {metric.trending === 'up' ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    <span className="text-sm font-medium">{metric.change}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <metric.icon className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Reports */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">الأداء المالي</TabsTrigger>
          <TabsTrigger value="services">تحليل الخدمات</TabsTrigger>
          <TabsTrigger value="customers">تحليل العملاء</TabsTrigger>
          <TabsTrigger value="trends">الاتجاهات</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>نمو الإيرادات الشهرية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value.toLocaleString()} ريال`, 'الإيرادات']} />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#3B82F6" 
                        fillOpacity={1}
                        fill="url(#revenueGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الطلبات والعملاء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="orders" fill="#10B981" name="الطلبات" />
                      <Bar dataKey="customers" fill="#F59E0B" name="العملاء" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>أداء الخدمات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {servicePerformance.map((service, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{service.service}</h4>
                      <Badge variant="secondary">
                        {service.satisfaction} ⭐
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">المبيعات:</span>
                        <span className="font-medium mr-2">{service.sales}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">الإيرادات:</span>
                        <span className="font-medium mr-2">{service.revenue.toLocaleString()} ريال</span>
                      </div>
                      <div>
                        <span className="text-gray-600">الرضا:</span>
                        <span className="font-medium mr-2">{service.satisfaction}/5</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>تحليل رضا العملاء</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={customerAnalytics}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar
                      name="النتيجة"
                      dataKey="value"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.3}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>اتجاهات النمو</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="growth" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedReporting;
