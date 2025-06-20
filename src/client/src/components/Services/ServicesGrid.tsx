
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { serviceService } from '@/services/serviceService';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Loader2 } from 'lucide-react';

const ServicesGrid = () => {
  const { data: services = [], isLoading, isError } = useQuery({
    queryKey: ['activeServices'],
    queryFn: serviceService.getActiveServices,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-8">
        حدث خطأ أثناء جلب الخدمات. الرجاء المحاولة مرة أخرى.
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد خدمات متاحة حالياً</h3>
        <p className="text-gray-500">سنقوم بإضافة خدمات جديدة قريباً.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Card 
          key={service.id} 
          className={`relative shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
            service.is_popular ? 'ring-2 ring-yellow-400' : ''
          }`}
        >
          {service.is_popular && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 flex items-center gap-1">
                <Star className="h-3 w-3 fill-current" />
                الأكثر طلباً
              </Badge>
            </div>
          )}
          
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-bold text-gray-800 mb-2">
              {service.title}
            </CardTitle>
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
              {service.price}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-600 text-sm">{feature}</span>
              </div>
            ))}
          </CardContent>
          
          <CardFooter className="pt-6">
            <Button 
              className={`w-full bg-gradient-to-r ${service.gradient_class || 'from-indigo-500 to-purple-600'} hover:opacity-90 transition-opacity`}
              size="lg"
            >
              {service.button_text}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ServicesGrid;
