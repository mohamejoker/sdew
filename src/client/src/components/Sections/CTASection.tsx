
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Shield, Timer, Gift, TrendingUp, Zap, Crown, Bot, CheckCircle } from 'lucide-react';

const CTASection = () => {
  const specialOffers = [
    {
      icon: Crown,
      title: 'خصم 75%',
      subtitle: 'على جميع الباقات',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Bot,
      title: 'وكيل ذكي مجاني',
      subtitle: 'لمدة 6 أشهر',
      color: 'from-purple-400 to-indigo-500'
    },
    {
      icon: Gift,
      title: 'هدايا حصرية',
      subtitle: 'قيمتها 800 ريال',
      color: 'from-green-400 to-emerald-500'
    }
  ];

  const guarantees = [
    'متابعين حقيقيين 100% مش فيك',
    'تفاعل طبيعي ومضمون',
    'خدمات من نجوم موثقين',
    'نتائج سريعة بدون تعقيدات'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 font-arabic relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* AI Badge */}
          <div className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-bold mb-8 border border-purple-400/30 animate-pulse">
            <Bot className="h-6 w-6 mr-3 text-purple-300" />
            🤖 وكيل ذكاء اصطناعي متطور - طورنا فكرة التزويد عن المنافسين
            <Crown className="h-5 w-5 ml-3 text-yellow-300" />
          </div>

          {/* Urgency Badge */}
          <div className="inline-flex items-center bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-bold mb-8 border border-red-400/30 animate-pulse">
            <Timer className="h-5 w-5 mr-3 text-red-300" />
            🔥 عرض الإطلاق الحصري ينتهي خلال ساعات قليلة!
            <Gift className="h-5 w-5 ml-3 text-yellow-300" />
          </div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 bg-clip-text text-transparent">
              متابعين حقيقيين مش فيك!
            </span>
            <br />
            <span className="text-white text-2xl md:text-4xl font-bold">
              انضم لثورة الذكاء الاصطناعي 🤖
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed">
            آخر 12 مكان متاح من عرض الإطلاق الحصري مع الوكيل الذكي
            <br />
            <span className="text-lg text-yellow-200 font-semibold">⚡ احجز مكانك قبل انتهاء العرض إلى الأبد!</span>
          </p>

          {/* Guarantees */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-4xl mx-auto">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-white font-medium">{guarantee}</span>
              </div>
            ))}
          </div>

          {/* Special Offer Box */}
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-3xl p-8 mb-10 border border-green-400/30 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {specialOffers.map((offer, index) => {
                const IconComponent = offer.icon;
                return (
                  <div key={index} className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${offer.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{offer.title}</h3>
                    <p className="text-green-200">{offer.subtitle}</p>
                  </div>
                );
              })}
            </div>

            {/* Countdown */}
            <div className="flex justify-center gap-4 mb-6">
              <div className="bg-red-500 text-white px-4 py-3 rounded-xl font-black text-xl">
                47
                <div className="text-xs">ساعة</div>
              </div>
              <div className="text-2xl font-bold text-yellow-300 self-center">:</div>
              <div className="bg-red-500 text-white px-4 py-3 rounded-xl font-black text-xl">
                23
                <div className="text-xs">دقيقة</div>
              </div>
              <div className="text-2xl font-bold text-yellow-300 self-center">:</div>
              <div className="bg-red-500 text-white px-4 py-3 rounded-xl font-black text-xl">
                45
                <div className="text-xs">ثانية</div>
              </div>
            </div>
            
            <p className="text-yellow-200 font-bold text-lg">
              ⚡ بعد انتهاء العرض، السعر سيعود إلى 1499 ريال! ⚡
            </p>
          </div>

          {/* Price Comparison */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-10 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-gray-400 line-through text-xl font-bold">1499 ريال</div>
                <div className="text-sm text-gray-400">السعر العادي</div>
              </div>
              <div className="text-4xl font-bold text-yellow-300">←</div>
              <div className="text-center">
                <div className="text-4xl font-black text-green-300">399 ريال</div>
                <div className="text-sm text-green-200">عرض الذكاء الاصطناعي</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full font-bold">
                وفر 1100 ريال (75% خصم) + وكيل ذكي مجاني!
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-12 py-6 text-xl font-black rounded-2xl shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-110 animate-pulse"
            >
              🤖 احجز مع الوكيل الذكي الآن!
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-10 py-6 text-xl font-semibold rounded-2xl transition-all duration-300"
            >
              💬 تحدث مع الوكيل أولاً
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4">
              <Shield className="h-8 w-8 text-green-300 mx-auto mb-2" />
              <div className="text-white font-bold">متابعين حقيقيين</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4">
              <Star className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
              <div className="text-white font-bold">تقييم 4.9/5</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4">
              <TrendingUp className="h-8 w-8 text-blue-300 mx-auto mb-2" />
              <div className="text-white font-bold">4247+ عميل</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4">
              <Bot className="h-8 w-8 text-purple-300 mx-auto mb-2" />
              <div className="text-white font-bold">وكيل ذكي</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
