
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Eye, Users, Clock, TrendingUp } from 'lucide-react';

const notificationStats = [
  { label: 'المرسلة اليوم', value: '45', icon: Send, color: 'from-blue-500 to-blue-600', change: '+5%' },
  { label: 'معدل الفتح', value: '68%', icon: Eye, color: 'from-green-500 to-green-600', change: '+2%' },
  { label: 'إجمالي المشتركين', value: '2,341', icon: Users, color: 'from-purple-500 to-purple-600', change: '+50' },
  { label: 'المجدولة', value: '12', icon: Clock, color: 'from-orange-500 to-orange-600', change: '-1' }
];

const NotificationStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {notificationStats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className={`border-0 shadow-lg bg-gradient-to-r ${stat.color} text-white overflow-hidden`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-white/80 text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-xs">{stat.change}</span>
                  </div>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
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

export default NotificationStats;
