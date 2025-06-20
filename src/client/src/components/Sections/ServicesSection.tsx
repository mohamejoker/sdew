
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Users, 
  Heart, 
  MessageSquare, 
  Eye, 
  TrendingUp, 
  Star,
  Zap,
  Gift,
  Crown,
  Sparkles,
  Shield,
  Clock,
  CheckCircle
} from 'lucide-react';

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: '👥',
      title: 'زيادة المتابعين الحقيقيين',
      description: 'متابعين حقيقيين 100% مع ضمان عدم النقصان أبداً',
      popular: true,
      features: ['متابعين حقيقيين نشطين', 'ضمان عدم النقصان', 'تسليم آمن ومدروس', 'دعم فني 24/7'],
      gradient: 'from-blue-500 to-purple-600',
      badge: 'الأكثر طلباً',
      results: 'نتائج خلال 24 ساعة'
    },
    {
      icon: '❤️',
      title: 'تفاعل حقيقي مضمون',
      description: 'إعجابات وتفاعل فوري من حسابات نشطة وحقيقية',
      popular: false,
      features: ['تسليم فوري آمن', 'حسابات نشطة حقيقية', 'توزيع طبيعي', 'ضمان الجودة العالية'],
      gradient: 'from-pink-500 to-red-500',
      badge: 'عرض خاص',
      results: 'تسليم فوري'
    },
    {
      icon: '💬',
      title: 'تعليقات ذكية مخصصة',
      description: 'تعليقات ذكية ومناسبة لمحتواك من متابعين حقيقيين',
      popular: false,
      features: ['تعليقات ذكية مناسبة', 'باللغة العربية', 'متنوعة وطبيعية', 'كتابة احترافية'],
      gradient: 'from-green-500 to-emerald-600',
      badge: 'ذكاء اصطناعي',
      results: 'جودة عالية'
    },
    {
      icon: '👁️',
      title: 'زيادة المشاهدات الحقيقية',
      description: 'مشاهدات عالية الجودة لزيادة انتشار محتواك',
      popular: false,
      features: ['مشاهدات حقيقية 100%', 'زيادة الوصول', 'تحسين خوارزمية المنصة', 'نتائج سريعة'],
      gradient: 'from-yellow-500 to-orange-500',
      badge: 'سريع',
      results: 'انتشار أوسع'
    },
    {
      icon: '📈',
      title: 'نمو شامل احترافي',
      description: 'استراتيجية متكاملة لنمو حسابك بشكل طبيعي ومتوازن',
      popular: true,
      features: ['نمو متوازن طبيعي', 'استراتيجية مخصصة', 'تقارير دورية', 'ضمان النتائج 100%'],
      gradient: 'from-purple-500 to-indigo-600',
      badge: 'الأفضل قيمة',
      results: 'نمو مضاعف'
    },
    {
      icon: '⭐',
      title: 'خدمة VIP الحصرية',
      description: 'خدمة مميزة مع مدير حساب شخصي ونمو مضاعف',
      popular: false,
      features: ['مدير حساب مخصص', 'نمو مضاعف سريع', 'أولوية في التنفيذ', 'استشارات مجانية'],
      gradient: 'from-yellow-400 to-yellow-600',
      badge: 'VIP حصري',
      results: 'خدمة شخصية'
    }
  ];

  const guarantees = [
    { icon: Shield, text: 'آمان تام 100%' },
    { icon: CheckCircle, text: 'نتائج مضمونة' },
    { icon: Clock, text: 'تسليم سريع' },
    { icon: Crown, text: 'جودة عالية' }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header Enhanced */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-8 py-4 rounded-full text-lg font-bold mb-8 border border-blue-200">
            <Sparkles className="h-5 w-5 mr-3 animate-spin" />
            🚀 خدمات حصرية لنمو حسابك بسرعة البرق
            <Star className="h-5 w-5 ml-3 animate-pulse" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              خدماتنا المميزة
            </span>
            <br />
            <span className="text-gray-800 text-3xl md:text-4xl font-bold">
              لنجاح حقيقي مضمون
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-10 leading-relaxed font-medium">
            🎯 احصل على أفضل خدمات التسويق الرقمي مع ضمان النتائج المذهلة
            <br />
            <span className="text-lg text-blue-600 font-semibold">✨ متابعين حقيقيين • تفاعل طبيعي • نمو مضمون ✨</span>
          </p>

          {/* Guarantees */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {guarantees.map((guarantee, index) => {
              const IconComponent = guarantee.icon;
              return (
                <div key={index} className="flex items-center bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-3 rounded-full border border-green-200 shadow-lg">
                  <IconComponent className="h-5 w-5 mr-2" />
                  <span className="font-bold">{guarantee.text}</span>
                </div>
              );
            })}
          </div>

          {/* Success Stats */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white max-w-4xl mx-auto mb-10 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">🏆 إنجازاتنا المذهلة</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-black mb-2">250K+</div>
                <div className="text-blue-100">عميل راضي</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black mb-2">99.9%</div>
                <div className="text-blue-100">معدل النجاح</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black mb-2">24/7</div>
                <div className="text-blue-100">دعم فني</div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => {
            return (
              <Card 
                key={index} 
                className={`relative hover:shadow-3xl transition-all duration-700 transform hover:scale-105 overflow-hidden border-4 ${
                  service.popular 
                    ? 'ring-4 ring-purple-300/50 scale-110 z-20 border-purple-400 shadow-2xl shadow-purple-500/25' 
                    : 'border-gray-200 shadow-xl'
                }`}
              >
                {/* Popular Badge Enhanced */}
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-30">
                    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-black flex items-center space-x-2 rtl:space-x-reverse shadow-2xl border-2 border-white">
                      <Crown className="h-4 w-4 animate-pulse" />
                      <span>🔥 الأكثر اختياراً</span>
                    </div>
                  </div>
                )}

                {/* Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <Badge 
                    className={`${
                      service.badge === 'الأكثر طلباً' ? 'bg-purple-500' : 
                      service.badge === 'VIP حصري' ? 'bg-yellow-500' :
                      service.badge === 'ذكاء اصطناعي' ? 'bg-green-500' :
                      'bg-blue-500'
                    } text-white font-bold px-3 py-1 shadow-lg`}
                  >
                    {service.badge}
                  </Badge>
                </div>

                {/* Results Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-3 py-1 text-sm">
                    {service.results}
                  </Badge>
                </div>

                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent"></div>

                <CardHeader className="text-center relative z-10 pb-6 pt-12">
                  <div className={`w-20 h-20 bg-gradient-to-r ${service.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-white`}>
                    <span className="text-3xl">{service.icon}</span>
                  </div>
                  
                  <CardTitle className="text-2xl font-black text-gray-900 mb-4">
                    {service.title}
                  </CardTitle>
                  
                  <p className="text-gray-700 text-lg mb-6 font-medium leading-relaxed">
                    {service.description}
                  </p>
                </CardHeader>

                <CardContent className="relative z-10 px-8">
                  {/* Features Enhanced */}
                  <ul className="space-y-4 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className={`w-6 h-6 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0 shadow-lg`}>
                          <CheckCircle className="h-4 w-4 text-white font-bold" />
                        </div>
                        <span className="text-gray-800 text-lg font-medium leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button Enhanced */}
                  <Button 
                    className={`w-full py-4 text-xl font-black bg-gradient-to-r ${service.gradient} hover:shadow-2xl transition-all duration-500 transform hover:scale-105 mb-6 border-4 border-white shadow-xl`}
                  >
                    {service.popular ? '🔥 احجز الآن!' : '🚀 ابدأ النجاح'}
                  </Button>

                  {/* Guarantee Enhanced */}
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

        {/* Bottom CTA Enhanced */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-10 text-white max-w-5xl mx-auto shadow-2xl border-4 border-white">
            <h3 className="text-3xl md:text-4xl font-black mb-6">
              🚀 جاهز لتحقيق النجاح الحقيقي؟
            </h3>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              انضم لآلاف العملاء الذين حققوا نمواً استثنائياً مع خدماتنا المتميزة
              <br />
              <span className="text-lg font-semibold text-yellow-200">🎯 نتائج مضمونة خلال 24 ساعة أو استرداد كامل للمال</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 font-black px-10 py-4 text-xl rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                💬 ابدأ محادثة مجانية الآن
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className="border-2 border-white text-white hover:bg-white/10 font-bold px-10 py-4 text-xl rounded-2xl backdrop-blur-sm"
              >
                🤖 تحدث مع الوكيل الذكي
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
