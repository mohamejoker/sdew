
import React, { memo, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Service } from '@/services/serviceService';

// مكون محسن للخدمة الواحدة
export const OptimizedServiceCard = memo<{
  service: Service;
  onSelect?: (service: Service) => void;
}>(({ service, onSelect }) => {
  const handleSelect = useCallback(() => {
    onSelect?.(service);
  }, [service, onSelect]);

  const gradientClass = useMemo(() => 
    service.gradient_class || 'from-blue-500 to-purple-600'
  , [service.gradient_class]);

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">{service.title}</CardTitle>
          {service.is_popular && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              الأكثر طلباً
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${gradientClass}`}>
          {service.price}
        </div>
        
        <div className="space-y-2">
          {service.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
              {feature}
            </div>
          ))}
        </div>
        
        <Button 
          onClick={handleSelect}
          className={`w-full bg-gradient-to-r ${gradientClass} hover:opacity-90 transition-opacity`}
          size="sm"
        >
          {service.button_text}
        </Button>
      </CardContent>
    </Card>
  );
});

OptimizedServiceCard.displayName = 'OptimizedServiceCard';

// مكون محسن لقائمة الخدمات
export const OptimizedServicesList = memo<{
  services: Service[];
  onServiceSelect?: (service: Service) => void;
  loading?: boolean;
}>(({ services, onServiceSelect, loading }) => {
  const sortedServices = useMemo(() => 
    [...services].sort((a, b) => {
      if (a.is_popular && !b.is_popular) return -1;
      if (!a.is_popular && b.is_popular) return 1;
      return 0;
    })
  , [services]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-8 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-10 bg-gray-200 rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedServices.map((service) => (
        <OptimizedServiceCard
          key={service.id}
          service={service}
          onSelect={onServiceSelect}
        />
      ))}
    </div>
  );
});

OptimizedServicesList.displayName = 'OptimizedServicesList';

// مكون محسن للإحصائيات
export const OptimizedStatsCard = memo<{
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  trend?: 'up' | 'down' | 'stable';
  description?: string;
}>(({ title, value, icon: Icon, trend, description }) => {
  const trendColor = useMemo(() => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  }, [trend]);

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {description && (
              <p className={`text-sm ${trendColor}`}>{description}</p>
            )}
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

OptimizedStatsCard.displayName = 'OptimizedStatsCard';
