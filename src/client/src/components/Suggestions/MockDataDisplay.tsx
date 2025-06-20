
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  Users, 
  TrendingUp, 
  DollarSign,
  Eye,
  RefreshCw,
  Activity
} from 'lucide-react';

const MockDataDisplay = () => {
  const [refreshing, setRefreshing] = useState(false);

  // بيانات وهمية للعرض
  const mockStats = {
    users: {
      total: 15847,
      active: 12234,
      newToday: 342,
      growth: '+12.5%'
    },
    revenue: {
      total: 234567,
      monthly: 45678,
      daily: 1567,
      growth: '+8.3%'
    },
    engagement: {
      rate: 78.5,
      views: 567890,
      interactions: 23456,
      growth: '+15.2%'
    },
    performance: {
      uptime: 99.9,
      responseTime: 120,
      errors: 0.1,
      growth: '+2.1%'
    }
  };

  const mockActivities = [
    { id: 1, type: 'user_signup', message: 'مستخدم جديد انضم للمنصة', time: '5 دقائق', status: 'success' },
    { id: 2, type: 'payment', message: 'تم استلام دفعة جديدة 450 ريال', time: '12 دقيقة', status: 'success' },
    { id: 3, type: 'service_order', message: 'طلب خدمة جديد: زيادة متابعين', time: '18 دقيقة', status: 'pending' },
    { id: 4, type: 'system', message: 'تحديث النظام مكتمل بنجاح', time: '25 دقيقة', status: 'info' },
    { id: 5, type: 'support', message: 'تذكرة دعم فني جديدة', time: '31 دقيقة', status: 'warning' },
  ];

  const mockTrends = [
    { platform: 'إنستقرام', orders: 234, revenue: 12450, growth: '+18%' },
    { platform: 'تيك توك', orders: 189, revenue: 9876, growth: '+25%' },
    { platform: 'يوتيوب', orders: 156, revenue: 15678, growth: '+12%' },
    { platform: 'تويتر', orders: 123, revenue: 6789, growth: '+8%' },
    { platform: 'فيسبوك', orders: 98, revenue: 5432, growth: '+5%' },
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  return (
    <div className="space-y-6">
      {/* عنوان القسم */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">البيانات الوهمية للعرض</h2>
          <p className="text-gray-600">عرض للبيانات والإحصائيات التجريبية</p>
        </div>
        <Button 
          onClick={handleRefresh} 
          disabled={refreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'جاري التحديث...' : 'تحديث البيانات'}
        </Button>
      </div>

      {/* الإحصائيات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المستخدمين</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.users.total.toLocaleString()}</p>
                <p className="text-xs text-green-600">{mockStats.users.growth}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الإيرادات الشهرية</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.revenue.monthly.toLocaleString()} ريال</p>
                <p className="text-xs text-green-600">{mockStats.revenue.growth}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل التفاعل</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.engagement.rate}%</p>
                <p className="text-xs text-green-600">{mockStats.engagement.growth}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">وقت التشغيل</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.performance.uptime}%</p>
                <p className="text-xs text-green-600">{mockStats.performance.growth}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* تبويبات البيانات المفصلة */}
      <Tabs defaultValue="activities" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activities">النشاطات الأخيرة</TabsTrigger>
          <TabsTrigger value="trends">اتجاهات المنصات</TabsTrigger>
          <TabsTrigger value="analytics">تحليلات متقدمة</TabsTrigger>
        </TabsList>

        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                النشاطات الأخيرة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge 
                        className={
                          activity.status === 'success' ? 'bg-green-500' :
                          activity.status === 'pending' ? 'bg-yellow-500' :
                          activity.status === 'warning' ? 'bg-orange-500' :
                          'bg-blue-500'
                        }
                      >
                        {activity.type}
                      </Badge>
                      <span className="text-gray-700">{activity.message}</span>
                    </div>
                    <span className="text-sm text-gray-500">منذ {activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                اتجاهات المنصات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTrends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="font-semibold text-gray-900">{trend.platform}</div>
                      <Badge variant="outline">{trend.orders} طلب</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-700">{trend.revenue.toLocaleString()} ريال</span>
                      <Badge className="bg-green-500 text-white">{trend.growth}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                تحليلات متقدمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">مقاييس الأداء</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>متوسط وقت الاستجابة</span>
                      <span className="font-medium">{mockStats.performance.responseTime}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>معدل نجاح الطلبات</span>
                      <span className="font-medium">99.1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>متوسط حجم الطلب</span>
                      <span className="font-medium">267 ريال</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">إحصائيات المستخدمين</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>مستخدمين نشطين اليوم</span>
                      <span className="font-medium">{mockStats.users.active.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>تسجيلات جديدة اليوم</span>
                      <span className="font-medium">{mockStats.users.newToday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>معدل الاحتفاظ</span>
                      <span className="font-medium">84.5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MockDataDisplay;
