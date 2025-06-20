
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Shield, UserCheck } from 'lucide-react';
import { SupaUser } from '@/hooks/useSupabaseUsers';

interface RoleStatsProps {
  users: SupaUser[];
}

const RoleStats: React.FC<RoleStatsProps> = ({ users }) => {
  const stats = [
    { 
      title: 'إجمالي المستخدمين', 
      value: users?.length || 0, 
      color: 'from-blue-500 to-blue-600', 
      icon: Users 
    },
    { 
      title: 'المدراء', 
      value: users?.filter(u => u.roles.includes('admin')).length || 0, 
      color: 'from-red-500 to-red-600', 
      icon: Shield 
    },
    { 
      title: 'المستخدمين العاديين', 
      value: users?.filter(u => !u.roles.includes('admin')).length || 0, 
      color: 'from-green-500 to-green-600', 
      icon: UserCheck 
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color} text-white`}>
                  <IconComponent className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default RoleStats;
