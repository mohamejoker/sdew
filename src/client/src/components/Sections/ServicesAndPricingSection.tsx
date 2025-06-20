
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap, MessageSquare } from 'lucide-react';

const ServicesAndPricingSection = () => {
  const services = [
    {
      icon: '👥',
      title: 'زيادة المتابعين',
      description: 'متابعين حقيقيين 100% مع ضمان عدم النقصان',
      features: ['متابعين حقيقيين', 'ضمان عدم النقصان', 'تسليم آمن', 'دعم 24/7']
    },
    {
      icon: '❤️',
      title: 'تفاعل حقيقي',
      description: 'إعجابات وتفاعل فوري من حسابات نشطة',
      features: ['تسليم فوري', 'حسابات نشطة', 'توزيع طبيعي', 'جودة عالية']
    },
    {
      icon: '💬',
      title: 'تعليقات ذكية',
      description: 'تعليقات مناسبة لمحتواك بالذكاء الاصطناعي',
      features: ['تعليقات ذكية', 'باللغة العربية', 'متنوعة وطبيعية', 'كتابة احترافية']
    },
    {
      icon: '📈',
      title: 'نمو شامل',
      description: 'استراتيجية متكاملة لنمو حسابك بشكل طبيعي',
      features: ['نمو متوازن', 'استراتيجية مخصصة', 'تقارير دورية', 'ضمان النتائج']
    }
  ];

  const plans = [
    {
      name: 'البداية',
      badge: 'للمبتدئين',
      features: [
        'متابعين حقيقيين نشطين',
        'تفاعل يومي مضمون',
        'دعم فني عبر الواتساب',
        'ضمان عدم النقصان'
      ],
      icon: Star,
      gradient: 'from-blue-500 to-blue-600',
      popular: false
    },
    {
      name: 'النمو السريع',
      badge: 'الأكثر اختياراً',
      features: [
        'نمو مضاعف سريع',
        'تفاعل عالي الجودة',
        'مساعد AI متقدم مجاناً',
        'تقارير يومية تفصيلية',
        'دعم فني متميز 24/7',
        'استراتيجية نمو مخصصة'
      ],
      icon: Zap,
      gradient: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      name: 'الاحتراف الكامل',
      badge: 'VIP حصري',
      features: [
        'نمو غير محدود',
        'تفاعل عالي الجودة',
        'مدير حساب شخصي مخصص',
        'تقارير لحظية مباشرة',
        'دعم فني VIP فوري',
        'تحليلات متقدمة للمنافسين',
        'استشارات تسويقية مجانية'
      ],
      icon: Crown,
      gradient: 'from-yellow-500 to-orange-500',
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Services Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              خدماتنا المميزة
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            احصل على أفضل خدمات التسويق الرقمي مع ضمان النتائج المذهلة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">{service.title}</CardTitle>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              باقات استثنائية
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            اختر الباقة المناسبة لك واحصل على نتائج مذهلة مضمونة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            
            return (
              <Card 
                key={index} 
                className={`relative hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden border-4 ${
                  plan.popular 
                    ? 'ring-4 ring-purple-300/50 scale-110 z-20 border-purple-400 shadow-xl' 
                    : 'border-gray-200 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-30">
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 text-sm font-bold">
                      🏆 الأكثر اختياراً
                    </Badge>
                  </div>
                )}

                <div className="absolute top-4 right-4">
                  <Badge className="bg-blue-500 text-white font-bold px-3 py-1">
                    {plan.badge}
                  </Badge>
                </div>

                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-5`}></div>

                <CardHeader className="text-center relative z-10 pt-12">
                  <div className={`w-20 h-20 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  
                  <CardTitle className="text-2xl font-black text-gray-900 mb-4">
                    {plan.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-800 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full py-4 text-lg font-bold bg-gradient-to-r ${plan.gradient} hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-4`}
                  >
                    {plan.popular ? '🔥 احجز الآن!' : '🚀 ابدأ النجاح'}
                  </Button>

                  <div className="text-center bg-blue-50 rounded-xl p-3 border border-blue-200">
                    <div className="flex items-center justify-center gap-2 text-blue-700 font-bold text-sm">
                      <MessageSquare className="h-4 w-4" />
                      <span>تواصل معنا للحصول على عرض خاص</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesAndPricingSection;
