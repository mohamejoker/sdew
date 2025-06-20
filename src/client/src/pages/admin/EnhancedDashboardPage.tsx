
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  DollarSign, 
  Activity, 
  TrendingUp,
  BarChart3,
  Globe,
  Shield,
  Zap
} from 'lucide-react';

const EnhancedDashboardPage = () => {
  const stats = [
    {
      title: 'إجمالي المستخدمين',
      value: '2,847',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'الإيرادات الشهرية',
      value: '47,250 ر.س',
      change: '+8%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'النشاط اليومي',
      value: '1,234',
      change: '+23%',
      icon: Activity,
      color: 'text-orange-600'
    },
    {
      title: 'معدل النمو',
      value: '18.5%',
      change: '+5%',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم المحسنة</h1>
        <div className="flex space-x-2">
          <Card className="p-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">النظام يعمل بشكل طبيعي</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <IconComponent className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-green-600 font-medium">
                  {stat.change} من الشهر الماضي
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              إجراءات سريعة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full p-3 text-right bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <div className="flex items-center justify-between">
                <span>إدارة المستخدمين</span>
                <Users className="h-4 w-4" />
              </div>
            </button>
            <button className="w-full p-3 text-right bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <div className="flex items-center justify-between">
                <span>مراجعة المدفوعات</span>
                <DollarSign className="h-4 w-4" />
              </div>
            </button>
            <button className="w-full p-3 text-right bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <div className="flex items-center justify-between">
                <span>إعدادات النظام</span>
                <Shield className="h-4 w-4" />
              </div>
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              النشاط الأخير
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3 p-2 border-r-2 border-blue-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">مستخدم جديد سجل</p>
                <p className="text-xs text-gray-500">منذ 5 دقائق</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-2 border-r-2 border-green-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">دفعة جديدة تمت</p>
                <p className="text-xs text-gray-500">منذ 12 دقيقة</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-2 border-r-2 border-orange-500">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">تحديث النظام</p>
                <p className="text-xs text-gray-500">منذ ساعة</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedDashboardPage;
