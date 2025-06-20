
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown, Shield } from 'lucide-react';

const CompactPlans = () => {
  const plans = [
    {
      id: 'basic',
      name: 'الخطة الأساسية',
      icon: Zap,
      price: '49 ريال',
      period: 'شهرياً',
      description: 'مثالية للمبتدئين',
      features: [
        'تحليل AI أساسي',
        '1000 متابع حقيقي',
        'دعم فني 24/7',
        'تقارير أسبوعية'
      ],
      gradient: 'from-blue-500 to-purple-600',
      popular: false
    },
    {
      id: 'pro',
      name: 'الخطة الاحترافية',
      icon: Crown,
      price: '99 ريال',
      period: 'شهرياً',
      description: 'الأكثر شعبية',
      features: [
        'تحليل AI متقدم',
        '5000 متابع حقيقي',
        'إدارة المحتوى',
        'استراتيجية مخصصة',
        'أولوية في الدعم'
      ],
      gradient: 'from-purple-500 to-pink-600',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'خطة المؤسسات',
      icon: Shield,
      price: '199 ريال',
      period: 'شهرياً',
      description: 'للشركات الكبيرة',
      features: [
        'تحليل AI شامل',
        '15000 متابع حقيقي',
        'فريق إدارة مخصص',
        'تقارير مفصلة',
        'استشارات شخصية'
      ],
      gradient: 'from-orange-500 to-red-600',
      popular: false
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              خطط مصممة لنجاحك
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اختر الخطة المناسبة لأهدافك واحصل على نتائج استثنائية
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={plan.id} 
                className={`relative border-2 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  plan.popular ? 'border-purple-500 ring-4 ring-purple-100' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 flex items-center gap-2">
                      <Star className="h-4 w-4 fill-current" />
                      الأكثر شعبية
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                    {plan.name}
                  </CardTitle>
                  
                  <div className="text-center">
                    <div className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient} mb-1`}>
                      {plan.price}
                    </div>
                    <div className="text-gray-500 text-sm">{plan.period}</div>
                    <div className="text-blue-600 font-medium text-sm mt-1">{plan.description}</div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90 transition-opacity text-white font-bold py-3`}
                    size="lg"
                  >
                    {plan.popular ? 'ابدأ الآن' : 'اختر هذه الخطة'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6 max-w-2xl mx-auto border border-green-200">
            <div className="flex items-center justify-center gap-3 text-green-700">
              <Shield className="h-6 w-6" />
              <span className="font-bold text-lg">
                🛡️ ضمان استرداد المال خلال 30 يوم
              </span>
            </div>
            <p className="text-green-600 mt-2">
              غير راضي عن النتائج؟ نسترد لك أموالك كاملة بدون أي أسئلة
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompactPlans;
