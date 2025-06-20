
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Clock, CheckCircle, XCircle } from 'lucide-react';

interface OrdersStatsProps {
  stats?: {
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    cancelledOrders: number;
  };
}

const OrdersStats: React.FC<OrdersStatsProps> = ({ stats }) => {
  const statsData = [
    {
      title: 'إجمالي الطلبات',
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      title: 'طلبات معلقة',
      value: stats?.pendingOrders || 0,
      icon: Clock,
      color: 'text-yellow-600'
    },
    {
      title: 'طلبات مكتملة',
      value: stats?.completedOrders || 0,
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'طلبات ملغية',
      value: stats?.cancelledOrders || 0,
      icon: XCircle,
      color: 'text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default OrdersStats;
