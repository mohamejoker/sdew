
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Users, Heart, Eye, MessageSquare, Calendar, Target } from 'lucide-react';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [platform, setPlatform] = useState('all');

  const followersData = [
    { date: '2024-01-01', instagram: 1200, facebook: 800, twitter: 600, tiktok: 1500 },
    { date: '2024-01-02', instagram: 1250, facebook: 820, twitter: 620, tiktok: 1580 },
    { date: '2024-01-03', instagram: 1300, facebook: 850, twitter: 640, tiktok: 1650 },
    { date: '2024-01-04', instagram: 1380, facebook: 880, twitter: 660, tiktok: 1720 },
    { date: '2024-01-05', instagram: 1450, facebook: 900, twitter: 680, tiktok: 1800 },
    { date: '2024-01-06', instagram: 1520, facebook: 930, twitter: 700, tiktok: 1880 },
    { date: '2024-01-07', instagram: 1600, facebook: 950, twitter: 720, tiktok: 1950 },
  ];

  const engagementData = [
    { name: 'الإعجابات', value: 45, color: '#3B82F6' },
    { name: 'التعليقات', value: 25, color: '#10B981' },
    { name: 'المشاركات', value: 20, color: '#F59E0B' },
    { name: 'الحفظ', value: 10, color: '#EF4444' },
  ];

  const metrics = [
    {
      title: 'إجمالي المتابعين',
      value: '15.2K',
      change: '+12.5%',
      trending: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'معدل التفاعل',
      value: '4.8%',
      change: '+2.1%',
      trending: 'up',
      icon: Heart,
      color: 'bg-green-500'
    },
    {
      title: 'المشاهدات الشهرية',
      value: '124K',
      change: '+8.3%',
      trending: 'up',
      icon: Eye,
      color: 'bg-purple-500'
    },
    {
      title: 'التعليقات',
      value: '2.1K',
      change: '-1.2%',
      trending: 'down',
      icon: MessageSquare,
      color: 'bg-yellow-500'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">لوحة التحليلات</h2>
          <p className="text-gray-600">تتبع أداء حساباتك عبر جميع المنصات</p>
        </div>
        
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع المنصات</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 أيام</SelectItem>
              <SelectItem value="30d">30 يوم</SelectItem>
              <SelectItem value="90d">90 يوم</SelectItem>
              <SelectItem value="1y">سنة</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <div className={`flex items-center mt-1 ${
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
                <div className={`w-12 h-12 rounded-full ${metric.color} flex items-center justify-center`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="followers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="followers">نمو المتابعين</TabsTrigger>
          <TabsTrigger value="engagement">التفاعل</TabsTrigger>
          <TabsTrigger value="performance">الأداء</TabsTrigger>
        </TabsList>

        <TabsContent value="followers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>نمو المتابعين عبر المنصات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={followersData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="instagram" stroke="#E4405F" strokeWidth={2} />
                    <Line type="monotone" dataKey="facebook" stroke="#1877F2" strokeWidth={2} />
                    <Line type="monotone" dataKey="twitter" stroke="#1DA1F2" strokeWidth={2} />
                    <Line type="monotone" dataKey="tiktok" stroke="#000000" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>توزيع التفاعل</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={engagementData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {engagementData.map((entry, index) => (
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
                <CardTitle>معدل التفاعل اليومي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={followersData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="instagram" stackId="1" stroke="#E4405F" fill="#E4405F" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>أداء المنشورات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={followersData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="instagram" fill="#E4405F" />
                    <Bar dataKey="facebook" fill="#1877F2" />
                    <Bar dataKey="twitter" fill="#1DA1F2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
