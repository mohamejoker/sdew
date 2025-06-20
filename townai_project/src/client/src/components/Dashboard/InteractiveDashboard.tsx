
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadialBarChart, RadialBar
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Users, Heart, Eye, MessageSquare,
  DollarSign, Package, Clock, CheckCircle, RefreshCw,
  Bell, Target, Calendar, Download, Filter
} from 'lucide-react';

const InteractiveDashboard = () => {
  const [isRealTime, setIsRealTime] = useState(true);
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // محاكاة البيانات المباشرة
  const [liveData, setLiveData] = useState({
    totalRevenue: 125430,
    activeOrders: 48,
    completedToday: 12,
    growthRate: 15.3
  });

  useEffect(() => {
    if (isRealTime) {
      const interval = setInterval(() => {
        setLiveData(prev => ({
          totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 100),
          activeOrders: prev.activeOrders + Math.floor(Math.random() * 3) - 1,
          completedToday: prev.completedToday + Math.floor(Math.random() * 2),
          growthRate: prev.growthRate + (Math.random() - 0.5) * 0.5
        }));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isRealTime]);

  const revenueData = [
    { time: '00:00', revenue: 12000, orders: 45, engagement: 78 },
    { time: '04:00', revenue: 15000, orders: 52, engagement: 82 },
    { time: '08:00', revenue: 22000, orders: 68, engagement: 85 },
    { time: '12:00', revenue: 35000, orders: 95, engagement: 89 },
    { time: '16:00', revenue: 28000, orders: 78, engagement: 87 },
    { time: '20:00', revenue: 18000, orders: 58, engagement: 84 },
    { time: '23:59', revenue: 25000, orders: 72, engagement: 86 }
  ];

  const platformData = [
    { name: 'Instagram', value: 45, color: '#E4405F', growth: '+12%' },
    { name: 'TikTok', value: 30, color: '#000000', growth: '+25%' },
    { name: 'YouTube', value: 15, color: '#FF0000', growth: '+8%' },
    { name: 'Twitter', value: 10, color: '#1DA1F2', growth: '+15%' }
  ];

  const performanceMetrics = [
    {
      title: 'الإيرادات اليومية',
      value: `${liveData.totalRevenue.toLocaleString()} ريال`,
      change: `+${liveData.growthRate.toFixed(1)}%`,
      trending: 'up',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'الطلبات النشطة',
      value: liveData.activeOrders,
      change: '+8',
      trending: 'up',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'مكتمل اليوم',
      value: liveData.completedToday,
      change: '+3',
      trending: 'up',
      icon: CheckCircle,
      color: 'bg-purple-500'
    },
    {
      title: 'معدل النمو',
      value: `${liveData.growthRate.toFixed(1)}%`,
      change: '+2.1%',
      trending: 'up',
      icon: TrendingUp,
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم التفاعلية</h1>
          <p className="text-gray-600 flex items-center gap-2">
            آخر تحديث: الآن
            {isRealTime && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant={isRealTime ? "default" : "outline"}
            onClick={() => setIsRealTime(!isRealTime)}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRealTime ? 'animate-spin' : ''}`} />
            مباشر
          </Button>
          
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="24h">24 ساعة</option>
            <option value="7d">7 أيام</option>
            <option value="30d">30 يوم</option>
            <option value="90d">90 يوم</option>
          </select>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Live Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  <div className={`flex items-center mt-2 ${
                    metric.trending === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trending === 'up' ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    <span className="text-sm font-medium">{metric.change}</span>
                  </div>
                </div>
                <div className={`w-16 h-16 rounded-full ${metric.color} flex items-center justify-center`}>
                  <metric.icon className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Interactive Charts */}
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">الإيرادات</TabsTrigger>
          <TabsTrigger value="orders">الطلبات</TabsTrigger>
          <TabsTrigger value="platforms">المنصات</TabsTrigger>
          <TabsTrigger value="performance">الأداء</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>تطور الإيرادات</CardTitle>
              <Badge variant="secondary">مباشر</Badge>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(label) => `الوقت: ${label}`}
                      formatter={(value, name) => [`${value.toLocaleString()} ريال`, 'الإيرادات']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#3B82F6" 
                      fillOpacity={1}
                      fill="url(#revenueGradient)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>إحصائيات الطلبات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>توزيع المنصات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {platformData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>نمو المنصات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {platformData.map((platform, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: platform.color }}
                        />
                        <span className="font-medium">{platform.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">{platform.value}%</span>
                        <Badge variant="secondary" className="text-green-600">
                          {platform.growth}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>مؤشرات الأداء</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="engagement" 
                      stroke="#8B5CF6" 
                      strokeWidth={3}
                      dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
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

export default InteractiveDashboard;
