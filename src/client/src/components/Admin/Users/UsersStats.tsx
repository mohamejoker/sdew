
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, UserCheck, UserX } from 'lucide-react';

interface UsersStatsProps {
  stats?: {
    totalUsers: number;
    newUsersToday: number;
    activeUsers: number;
    inactiveUsers: number;
  };
}

const UsersStats: React.FC<UsersStatsProps> = ({ stats }) => {
  const statsData = [
    {
      title: 'إجمالي المستخدمين',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'مستخدمين جدد اليوم',
      value: stats?.newUsersToday || 0,
      icon: UserCheck,
      color: 'text-green-600'
    },
    {
      title: 'مستخدمين نشطين',
      value: stats?.activeUsers || 0,
      icon: UserCheck,
      color: 'text-purple-600'
    },
    {
      title: 'مستخدمين غير نشطين',
      value: stats?.inactiveUsers || 0,
      icon: UserX,
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

export default UsersStats;
