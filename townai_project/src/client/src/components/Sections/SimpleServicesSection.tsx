
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { serviceService } from '@/services/serviceService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, MessageSquare, Star, Loader2 } from 'lucide-react';

const SimpleServicesSection = () => {
  const { data: services = [], isLoading, isError } = useQuery({
    queryKey: ['activeServices'],
    queryFn: serviceService.getActiveServices,
  });

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            خدماتنا المصممة لنجاحك
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نقدم حلولاً مبتكرة وقوية لمساعدتك على النمو والتألق في العالم الرقمي. اختر الباقة التي تلبي طموحاتك.
          </p>
        </div>

        {isLoading && <div className="flex justify-center"><Loader2 className="h-10 w-10 animate-spin text-blue-600" /></div>}
        {isError && <div className="text-center text-red-500">عذراً، حدث خطأ أثناء تحميل الخدمات.</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                service.is_popular ? 'p-1 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 shadow-2xl' : 'shadow-lg bg-white'
              }`}
            >
              <Card 
                className={`w-full h-full rounded-xl flex flex-col ${service.is_popular ? '' : 'border'}`}
              >
                {service.is_popular && (
                  <div className="flex justify-center">
                    <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 font-bold transform -translate-y-4 border-2 border-white shadow-lg">
                      <Star className="w-4 h-4 ml-2" />
                      الأكثر طلباً
                    </Badge>
                  </div>
                )}

                <CardHeader className={`text-center pb-4 ${service.is_popular ? 'pt-0' : ''}`}>
                  <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                    {service.title}
                  </CardTitle>
                  <div className={`text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r ${service.gradient_class || 'from-sky-400 to-blue-500'}`}>
                    {service.price}
                  </div>
                  <p className="text-gray-500 text-sm">تبدأ من</p>
                </CardHeader>

                <CardContent className="flex flex-col flex-grow">
                  <ul className="space-y-4 mb-8 flex-grow">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${service.gradient_class || 'from-sky-400 to-blue-500'} text-white flex items-center justify-center mr-3 mt-1 shadow`}>
                          <Check className="h-4 w-4" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className={`w-full bg-gradient-to-r ${service.gradient_class || 'from-sky-400 to-blue-500'} hover:shadow-lg hover:brightness-110 py-3 text-lg font-bold transition-all`}>
                    <MessageSquare className="h-5 w-5 ml-2" />
                    {service.button_text}
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimpleServicesSection;
