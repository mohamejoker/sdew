
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, CheckCircle, XCircle, Zap } from 'lucide-react';

interface Provider {
  id: string;
  is_active: boolean;
  servicesCount: number;
  activeServicesCount: number;
}

interface ProviderStatsProps {
  providers: Provider[];
}

const ProviderStats: React.FC<ProviderStatsProps> = ({ providers }) => {
  const totalProviders = providers.length;
  const activeProviders = providers.filter(p => p.is_active).length;
  const totalServices = providers.reduce((sum, p) => sum + p.servicesCount, 0);
  const activeServices = providers.reduce((sum, p) => sum + p.activeServicesCount, 0);

  const stats = [
    {
      title: 'إجمالي الموردين',
      value: totalProviders,
      icon: Globe,
      color: 'text-blue-600'
    },
    {
      title: 'الموردين المفعلين',
      value: activeProviders,
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'إجمالي الخدمات',
      value: totalServices,
      icon: Zap,
      color: 'text-purple-600'
    },
    {
      title: 'الخدمات المفعلة',
      value: activeServices,
      icon: CheckCircle,
      color: 'text-emerald-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <IconComponent className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ProviderStats;
