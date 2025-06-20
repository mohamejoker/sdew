
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  UserCheck, 
  Shield, 
  Crown,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

interface UserStatsProps {
  users: User[];
}

const UserStats: React.FC<UserStatsProps> = ({ users }) => {
  const isMobile = useIsMobile();

  const stats = [
    {
      title: 'إجمالي المستخدمين',
      value: users.length,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'المستخدمين النشطين',
      value: users.filter(u => u.status === 'active').length,
      icon: UserCheck,
      color: 'from-green-500 to-green-600',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'المديرين',
      value: users.filter(u => u.role === 'admin').length,
      icon: Crown,
      color: 'from-purple-500 to-purple-600',
      change: '+2',
      trend: 'up'
    },
    {
      title: 'المشرفين',
      value: users.filter(u => u.role === 'moderator').length,
      icon: Shield,
      color: 'from-orange-500 to-orange-600',
      change: '+5',
      trend: 'up'
    }
  ];

  return (
    <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'}`}>
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-semibold">{stat.change}</span>
                  </div>
                </div>
                <div className={`p-4 rounded-full bg-gradient-to-r ${stat.color} text-white shadow-lg`}>
                  <IconComponent className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default UserStats;
