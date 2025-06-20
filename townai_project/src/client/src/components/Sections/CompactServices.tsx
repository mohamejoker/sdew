
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { serviceService } from '@/services/serviceService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Instagram, Youtube, Facebook, TrendingUp, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompactServices = () => {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['activeServices'],
    queryFn: serviceService.getActiveServices,
  });

  const featuredServices = services.slice(0, 3);

  const platforms = [
    { name: 'Instagram', icon: Instagram, users: '2M+', color: 'from-pink-500 to-purple-600' },
    { name: 'TikTok', icon: TrendingUp, users: '1.5M+', color: 'from-black to-red-500' },
    { name: 'Facebook', icon: Facebook, users: '3M+', color: 'from-blue-500 to-blue-700' },
    { name: 'YouTube', icon: Youtube, users: '800K+', color: 'from-red-500 to-red-700' }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              خدماتنا المتميزة
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            أقوى الخدمات لتنمية حضورك الرقمي على جميع المنصات
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Platforms Stats */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">المنصات المدعومة</h3>
            <div className="grid grid-cols-2 gap-4">
              {platforms.map((platform, index) => {
                const IconComponent = platform.icon;
                return (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all">
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 bg-gradient-to-br ${platform.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-800 mb-1">{platform.name}</h4>
                      <p className="text-sm text-gray-600">{platform.users} مستخدم</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {/* Success Stats */}
            <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-6 text-white">
              <h4 className="text-xl font-bold mb-4">إحصائيات النجاح</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-black mb-1">99.9%</div>
                  <div className="text-sm text-blue-100">معدل النجاح</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black mb-1">24/7</div>
                  <div className="text-sm text-blue-100">دعم فني</div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Services */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">الخدمات الأكثر طلباً</h3>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : (
              <div className="space-y-4">
                {featuredServices.map((service, index) => (
                  <Card key={service.id} className="border-0 shadow-sm hover:shadow-md transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-lg text-gray-800">{service.title}</h4>
                        {service.is_popular && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            الأكثر طلباً
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
                        {service.price}
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        {service.features.slice(0, 2).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        className={`w-full bg-gradient-to-r ${service.gradient_class || 'from-blue-500 to-purple-600'} hover:opacity-90`}
                        size="sm"
                      >
                        {service.button_text}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                
                <Link to="/services">
                  <Button variant="outline" className="w-full" size="lg">
                    عرض جميع الخدمات
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompactServices;
