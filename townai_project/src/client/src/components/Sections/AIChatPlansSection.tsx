
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Star, Crown, MessageSquare, Brain, Sparkles, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AIChatPlansSection = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const plans = [
    {
      id: 'free',
      name: 'مجاني',
      price: 0,
      period: 'يومياً',
      description: 'ابدأ رحلتك مع الذكاء الاصطناعي',
      features: [
        '5 رسائل يومياً مجاناً',
        'تحليل أساسي للحساب',
        'نصائح تسويقية بسيطة',
        'دعم عبر التليجرام'
      ],
      limitations: [
        'محدود بـ 5 رسائل يومياً',
        'ميزات محدودة',
        'لا يوجد حفظ للمحادثات'
      ],
      gradient: 'from-gray-500 to-gray-600',
      icon: Gift,
      popular: false,
      ctaText: 'ابدأ مجاناً',
      badge: 'مجاني'
    },
    {
      id: 'starter',
      name: 'البداية',
      price: 99,
      period: 'شهرياً',
      description: 'للمسوقين المبتدئين والشركات الناشئة',
      features: [
        '100 رسالة شهرياً',
        'تحليل متقدم للحساب والمنافسين',
        'استراتيجيات تسويقية مخصصة',
        'حفظ وتصدير المحادثات',
        'قوالب محادثة جاهزة',
        'دعم أولوية'
      ],
      gradient: 'from-blue-500 to-purple-600',
      icon: Zap,
      popular: false,
      ctaText: 'اشترك الآن',
      badge: 'الأنسب للبداية'
    },
    {
      id: 'professional',
      name: 'الاحتراف',
      price: 299,
      period: 'شهرياً',
      description: 'للمحترفين والوكالات الصغيرة',
      features: [
        'رسائل غير محدودة',
        'جميع ميزات الذكاء الاصطناعي',
        'تحليل عميق للمنافسين',
        'تصميم المحتوى بـ AI',
        'جدولة المنشورات',
        'تقارير تفصيلية',
        'API مخصص',
        'دعم مباشر 24/7'
      ],
      gradient: 'from-orange-500 to-red-600',
      icon: Star,
      popular: true,
      ctaText: 'الأكثر شعبية',
      badge: 'الأكثر طلباً'
    },
    {
      id: 'enterprise',
      name: 'الشركات',
      price: 899,
      period: 'شهرياً',
      description: 'للشركات الكبيرة والوكالات',
      features: [
        'كل ميزات الخطة الاحترافية',
        'فريق دعم مخصص',
        'تدريب شخصي للفريق',
        'تكامل مع أنظمة CRM',
        'تقارير مخصصة',
        'SLA مضمون',
        'استشارات استراتيجية شهرية',
        'أولوية في الميزات الجديدة'
      ],
      gradient: 'from-purple-600 to-pink-600',
      icon: Crown,
      popular: false,
      ctaText: 'تواصل معنا',
      badge: 'حلول متقدمة'
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    const plan = plans.find(p => p.id === planId);
    
    if (planId === 'free') {
      toast({
        title: "مرحباً بك! 🎉",
        description: "يمكنك البدء فوراً بـ 5 رسائل يومية مجانية",
      });
    } else {
      toast({
        title: `تم اختيار خطة ${plan?.name}`,
        description: `سيتم توجيهك لصفحة الدفع لاستكمال الاشتراك`,
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-xl font-bold mb-8">
            <Sparkles className="h-6 w-6 mr-3" />
            خطط الذكاء الاصطناعي
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            اختر الخطة المناسبة لك
          </h2>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            من التجربة المجانية إلى الحلول الاحترافية - نوفر لك خطط متنوعة تناسب احتياجاتك وميزانيتك
          </p>

          {/* Free Trial Banner */}
          <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-2xl p-6 max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Gift className="h-8 w-8" />
              <h3 className="text-2xl font-bold">جرب مجاناً الآن!</h3>
            </div>
            <p className="text-lg opacity-90">
              احصل على 5 رسائل ذكاء اصطناعي يومياً بدون أي تكلفة
            </p>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={plan.id}
                className={`relative hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 ${
                  plan.popular 
                    ? 'ring-4 ring-orange-300 scale-110 border-orange-300 shadow-xl' 
                    : 'border-gray-200 shadow-lg'
                } ${selectedPlan === plan.id ? 'ring-4 ring-blue-400' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 font-bold text-lg shadow-xl">
                      🔥 الأكثر اختياراً
                    </Badge>
                  </div>
                )}

                <div className="absolute top-4 right-4">
                  <Badge className={`bg-gradient-to-r ${plan.gradient} text-white font-bold px-4 py-2`}>
                    {plan.badge}
                  </Badge>
                </div>

                <CardHeader className="text-center pb-6 pt-12">
                  <div className={`w-20 h-20 bg-gradient-to-r ${plan.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                    {plan.name}
                  </CardTitle>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-black text-gray-900">
                        {plan.price === 0 ? 'مجاني' : `${plan.price}`}
                      </span>
                      {plan.price > 0 && <span className="text-gray-600">ج.م</span>}
                    </div>
                    <p className="text-gray-500">{plan.period}</p>
                  </div>
                  
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="px-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className={`w-6 h-6 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0`}>
                          <Check className="h-4 w-4 text-white font-bold" />
                        </div>
                        <span className="text-gray-700 text-lg leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations && (
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                      <h4 className="font-semibold text-gray-700 mb-2">قيود الخطة:</h4>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, idx) => (
                          <li key={idx} className="text-sm text-gray-600">• {limitation}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button 
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`w-full py-4 text-xl font-bold transition-all duration-300 bg-gradient-to-r ${plan.gradient} hover:shadow-xl transform hover:scale-105`}
                  >
                    <MessageSquare className="h-6 w-6 mr-3" />
                    {plan.ctaText}
                  </Button>

                  {plan.id === 'free' && (
                    <p className="text-center text-sm text-gray-500 mt-3">
                      لا حاجة لبطاقة ائتمان
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Comparison */}
        <div className="mt-20 bg-white rounded-3xl shadow-2xl p-10 max-w-6xl mx-auto border-2 border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">مقارنة شاملة للميزات</h3>
            <p className="text-lg text-gray-600">اكتشف ما تحصل عليه مع كل خطة</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
              <Brain className="h-12 w-12 text-blue-600 mb-4" />
              <h4 className="font-bold text-gray-800 text-lg mb-2">ذكاء اصطناعي متقدم</h4>
              <p className="text-sm text-gray-600">تحليل ذكي ونصائح مخصصة باستخدام أحدث نماذج AI</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
              <MessageSquare className="h-12 w-12 text-green-600 mb-4" />
              <h4 className="font-bold text-gray-800 text-lg mb-2">محادثات غير محدودة</h4>
              <p className="text-sm text-gray-600">تفاعل مع AI بدون حدود في الخطط المتقدمة</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
              <Star className="h-12 w-12 text-orange-600 mb-4" />
              <h4 className="font-bold text-gray-800 text-lg mb-2">تحليل المنافسين</h4>
              <p className="text-sm text-gray-600">دراسة شاملة للمنافسين واستراتيجياتهم</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
              <Crown className="h-12 w-12 text-purple-600 mb-4" />
              <h4 className="font-bold text-gray-800 text-lg mb-2">دعم مخصص</h4>
              <p className="text-sm text-gray-600">فريق دعم متخصص لمساعدتك في تحقيق أهدافك</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">جاهز للبدء؟</h3>
            <p className="text-xl mb-6 opacity-90">
              انضم إلى آلاف المسوقين الذين يستخدمون AI لتطوير أعمالهم
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => handlePlanSelect('free')}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold"
              >
                ابدأ مجاناً الآن
              </Button>
              <Button 
                onClick={() => handlePlanSelect('professional')}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-bold"
              >
                اختر الخطة الاحترافية
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChatPlansSection;
