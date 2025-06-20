
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, DollarSign, ShoppingCart, Activity } from 'lucide-react';

interface MainStatsProps {
  stats?: {
    usersCount: number;
    totalRevenue: number;
    ordersCount: number;
    transactionsCount: number;
  };
}

const MainStats: React.FC<MainStatsProps> = ({ stats }) => {
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

  return (
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
  );
};

export default MainStats;
