
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Check, Star, Zap, Crown, Gift, Timer, Sparkles, TrendingUp, Shield, MessageSquare, Users, Heart } from 'lucide-react';

const PricingSection = () => {
  const { t } = useLanguage();

  const plans = [
    {
      name: 'البداية المثالية',
      description: 'مثالي للمبتدئين الذين يريدون نمو حقيقي وآمن',
      features: [
        'متابعين حقيقيين نشطين',
        'تفاعل يومي مضمون',
        'تقارير أسبوعية مفصلة',
        'دعم فني عبر الواتساب',
        'ضمان عدم النقصان أبداً',
        'بداية النتائج خلال 24 ساعة'
      ],
      popular: false,
      badge: 'للمبتدئين',
      badgeColor: 'bg-gradient-to-r from-green-500 to-emerald-600',
      gradient: 'from-blue-500 to-blue-600',
      icon: Star,
      bestFor: 'المبتدئين والأفراد',
      result: 'نمو سريع وآمن'
    },
    {
      name: 'النمو السريع',
      description: 'الخيار الأمثل للنمو السريع والمضاعف',
      features: [
        'نمو مضاعف سريع',
        'تفاعل عالي الجودة',
        'تعليقات ذكية مخصصة',
        'مساعد AI متقدم مجاناً',
        'تقارير يومية تفصيلية',
        'دعم فني متميز 24/7',
        'استراتيجية نمو مخصصة',
        'ضمان مضاعفة المتابعين'
      ],
      popular: true,
      badge: 'الأكثر اختياراً',
      badgeColor: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      gradient: 'from-purple-500 to-pink-500',
      icon: Zap,
      bestFor: 'الأعمال والمؤثرين',
      result: 'نمو مضاعف مضمون'
    },
    {
      name: 'الاحتراف الكامل',
      description: 'للمحترفين الذين يريدون هيمنة كاملة',
      features: [
        'نمو غير محدود',
        'تفاعل عالي الجودة',
        'تعليقات ذكية متقدمة',
        'مدير حساب شخصي مخصص',
        'تقارير لحظية مباشرة',
        'دعم فني VIP فوري',
        'تحليلات متقدمة للمنافسين',
        'استراتيجية نمو احترافية',
        'ضمان النجاح 100%',
        'استشارات تسويقية مجانية'
      ],
      popular: false,
      badge: 'VIP حصري',
      badgeColor: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
      gradient: 'from-yellow-500 to-orange-500',
      icon: Crown,
      bestFor: 'الشركات والمشاهير',
      result: 'هيمنة كاملة'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-arabic">
      <div className="container mx-auto px-4">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-red-500/10 to-pink-500/10 backdrop-blur-sm text-red-700 px-8 py-4 rounded-full text-lg font-bold mb-8 border border-red-200 animate-pulse shadow-lg">
            <Timer className="h-5 w-5 mr-3" />
            🔥 عرض الإطلاق الذهبي - محدود لأول 100 عميل فقط!
            <Sparkles className="h-5 w-5 ml-3 animate-spin" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              باقات استثنائية
            </span>
            <br />
            <span className="text-gray-800 text-3xl md:text-4xl font-bold">
              لنجاح حقيقي مضمون
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-10 leading-relaxed font-medium">
            🎯 اختر الباقة المناسبة لك واحصل على نتائج مذهلة مضمونة
            <br />
            <span className="text-lg text-blue-600 font-semibold">✨ بدء فوري • نتائج مضمونة • دعم 24/7 ✨</span>
          </p>

          {/* Enhanced Counter */}
          <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white rounded-3xl p-8 max-w-3xl mx-auto mb-10 shadow-2xl border-4 border-white">
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="font-black text-2xl">العرض ينتهي قريباً!</span>
                <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-yellow-200 font-bold text-xl">
              <TrendingUp className="h-6 w-6 animate-bounce" />
              متبقي 17 مكان فقط من أصل 100 مكان!
              <Shield className="h-6 w-6 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Enhanced Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            
            return (
              <Card 
                key={index} 
                className={`relative hover:shadow-3xl transition-all duration-700 transform hover:scale-105 overflow-hidden border-4 ${
                  plan.popular 
                    ? 'ring-8 ring-purple-300/50 scale-110 z-20 border-purple-400 shadow-2xl shadow-purple-500/25' 
                    : 'border-gray-200 shadow-xl'
                }`}
              >
                {/* Enhanced Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-30">
                    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-8 py-3 rounded-full text-lg font-black flex items-center space-x-2 rtl:space-x-reverse shadow-2xl border-4 border-white">
                      <Crown className="h-6 w-6 animate-pulse" />
                      <span>🏆 الأكثر اختياراً</span>
                      <Star className="h-6 w-6 animate-pulse" />
                    </div>
                  </div>
                )}

                {/* Enhanced Badge */}
                <div className="absolute top-6 right-6 z-20">
                  <Badge className={`${plan.badgeColor} text-white font-black px-4 py-2 text-lg shadow-xl border-2 border-white`}>
                    {plan.badge}
                  </Badge>
                </div>

                {/* Best For Badge */}
                <div className="absolute top-6 left-6 z-20">
                  <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold px-3 py-1 text-sm">
                    {plan.bestFor}
                  </Badge>
                </div>

                {/* Enhanced Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-10`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent"></div>

                <CardHeader className="text-center relative z-10 pb-6 pt-12">
                  <div className={`w-24 h-24 bg-gradient-to-r ${plan.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-white`}>
                    <IconComponent className="h-12 w-12 text-white" />
                  </div>
                  
                  <CardTitle className="text-3xl font-black text-gray-900 mb-4">
                    {plan.name}
                  </CardTitle>
                  
                  <p className="text-gray-700 text-lg mb-6 font-medium leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Results Display */}
                  <div className="mb-6">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl font-black text-lg shadow-lg">
                      🎯 {plan.result}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10 px-8">
                  {/* Enhanced Features List */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className={`w-6 h-6 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0 shadow-lg`}>
                          <Check className="h-4 w-4 text-white font-bold" />
                        </div>
                        <span className="text-gray-800 text-lg font-medium leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Enhanced CTA Button */}
                  <Button 
                    className={`w-full py-6 text-xl font-black bg-gradient-to-r ${plan.gradient} hover:shadow-2xl transition-all duration-500 transform hover:scale-105 mb-6 border-4 border-white shadow-xl`}
                  >
                    {plan.popular ? '🔥 احجز الآن!' : '🚀 ابدأ النجاح'}
                  </Button>

                  {/* Contact for Pricing */}
                  <div className="text-center bg-blue-50 rounded-2xl p-4 border-2 border-blue-200 mb-4">
                    <div className="flex items-center justify-center gap-3 text-blue-700 font-bold text-lg">
                      <MessageSquare className="h-5 w-5" />
                      <span>تواصل معنا للحصول على عرض خاص</span>
                    </div>
                  </div>

                  {/* Enhanced Guarantee */}
                  <div className="text-center bg-green-50 rounded-2xl p-4 border-2 border-green-200">
                    <div className="flex items-center justify-center gap-3 text-green-700 font-bold">
                      <Gift className="h-5 w-5" />
                      <span>ضمان النتائج أو استرداد المال</span>
                      <Shield className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enhanced Bottom Guarantee Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border-4 border-green-300 rounded-3xl p-10 max-w-5xl mx-auto shadow-2xl">
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                <Check className="h-10 w-10 text-white" />
              </div>
              <div className="text-right">
                <h3 className="text-3xl font-black text-gray-900 mb-2">ضمان النتائج 100%</h3>
                <p className="text-green-700 font-bold text-xl">أو استرداد كامل للمبلغ + تعويض إضافي</p>
              </div>
            </div>
            <p className="text-gray-800 text-xl mb-8 font-medium leading-relaxed">
              🛡️ نحن واثقون من جودة خدماتنا المتطورة، لذلك نقدم ضمان كامل وشامل. 
              إذا لم تحصل على النتائج المتوقعة، سنسترد لك المبلغ كاملاً مع تعويض إضافي.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 font-black text-xl px-10 py-4 shadow-xl rounded-2xl">
                💬 تحدث مع مستشار مجاناً الآن
              </Button>
              <Button variant="outline" size="lg" className="font-bold text-xl px-10 py-4 border-2 border-green-500 text-green-700 hover:bg-green-50 rounded-2xl">
                ⭐ اطلع على قصص نجاح عملائنا
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
