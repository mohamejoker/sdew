
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Eye, Star, EyeOff } from 'lucide-react';

interface ServicesStatsProps {
  stats?: {
    totalServices: number;
    activeServices: number;
    popularServices: number;
    inactiveServices: number;
  };
}

const ServicesStats: React.FC<ServicesStatsProps> = ({ stats }) => {
  const statsData = [
    {
      title: 'إجمالي الخدمات',
      value: stats?.totalServices || 0,
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'خدمات نشطة',
      value: stats?.activeServices || 0,
      icon: Eye,
      color: 'text-green-600'
    },
    {
      title: 'خدمات شائعة',
      value: stats?.popularServices || 0,
      icon: Star,
      color: 'text-purple-600'
    },
    {
      title: 'خدمات معطلة',
      value: stats?.inactiveServices || 0,
      icon: EyeOff,
      color: 'text-orange-600'
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

export default ServicesStats;
