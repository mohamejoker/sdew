
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart3, TrendingUp, Users, Eye } from 'lucide-react';

const DashboardSection = () => {
  const { t } = useLanguage();

  const dashboardStats = [
    {
      title: 'إجمالي المتابعين',
      value: '12,543',
      change: '+15%',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'المشاهدات الشهرية',
      value: '89,231',
      change: '+23%',
      icon: Eye,
      color: 'green'
    },
    {
      title: 'معدل التفاعل',
      value: '4.8%',
      change: '+8%',
      icon: TrendingUp,
      color: 'yellow'
    },
    {
      title: 'الحملات النشطة',
      value: '7',
      change: '+2',
      icon: BarChart3,
      color: 'purple'
    }
  ];

  const recentCampaigns = [
    { name: 'حملة متابعين Instagram', status: 'نشطة', progress: 78 },
    { name: 'إعجابات Facebook', status: 'مكتملة', progress: 100 },
    { name: 'مشاهدات YouTube', status: 'جارية', progress: 45 },
    { name: 'تعليقات Twitter', status: 'نشطة', progress: 62 }
  ];

  return (
    <section id="dashboard" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('dashboardTitle')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            تتبع أداء حملاتك وحساباتك من مكان واحد
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Campaigns */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span>الحملات الأخيرة</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCampaigns.map((campaign, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                      <p className="text-sm text-gray-600">{campaign.status}</p>
                    </div>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${campaign.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {campaign.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>إجراءات سريعة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                  <Users className="h-4 w-4 mr-2 ml-0 rtl:mr-0 rtl:ml-2" />
                  إنشاء حملة جديدة
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2 ml-0 rtl:mr-0 rtl:ml-2" />
                  عرض التحليلات
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2 ml-0 rtl:mr-0 rtl:ml-2" />
                  تصدير التقارير
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2 ml-0 rtl:mr-0 rtl:ml-2" />
                  إعدادات الحساب
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
