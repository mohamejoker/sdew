
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { PaymentStat } from './types';
import { useIsMobile } from '@/hooks/use-mobile';

interface StatsCardsProps {
  stats: PaymentStat[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const isMobile = useIsMobile();
  return (
    <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 lg:grid-cols-4 gap-6'}`}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className={`border-0 shadow-lg bg-gradient-to-r ${stat.color} text-white overflow-hidden`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-white/80 text-sm font-medium">{stat.title}</p>
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

export default StatsCards;
