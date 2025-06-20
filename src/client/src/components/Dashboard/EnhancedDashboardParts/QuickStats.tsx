
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, DollarSign, ShoppingCart, Activity, TrendingUp } from 'lucide-react';
import { RealTimeMetrics } from '@/services/dashboard/realTimeDataService';

interface QuickStatsProps {
  metrics: RealTimeMetrics | null;
}

const QuickStats: React.FC<QuickStatsProps> = ({ metrics }) => {
  const quickStats = [
    {
      title: 'المستخدمون النشطون',
      value: metrics?.activeUsers?.toLocaleString() || '0',
      change: '+12%',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'الإيرادات اليوم',
      value: `${metrics?.revenue?.toLocaleString() || '0'} ج.م`,
      change: '+8%',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'الطلبات',
      value: metrics?.orders?.toLocaleString() || '0',
      change: '+15%',
      icon: ShoppingCart,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'صحة النظام',
      value: `${metrics?.systemHealth || 0}%`,
      change: '+2%',
      icon: Activity,
      color: 'from-emerald-500 to-emerald-600',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {quickStats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-semibold">{stat.change}</span>
                    </div>
                  </div>
                </div>
                <div className={`p-4 rounded-xl bg-gradient-to-tr ${stat.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>التقدم</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`} style={{ width: '75%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default QuickStats;
