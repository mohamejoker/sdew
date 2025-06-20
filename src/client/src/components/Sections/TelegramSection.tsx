
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Users, Zap, Target, Shield, TrendingUp, CheckCircle, Star } from 'lucide-react';

const TelegramSection = () => {
  const features = [
    {
      icon: Bot,
      title: 'سحب ذكي بالـ AI',
      description: 'تقنية ذكاء اصطناعي متطورة لاختيار الأعضاء المناسبين'
    },
    {
      icon: Target,
      title: 'استهداف دقيق',
      description: 'سحب أعضاء نشطين ومتفاعلين من الجروبات المشابهة'
    },
    {
      icon: Shield,
      title: 'آمن ومضمون',
      description: 'تقنيات حماية متقدمة لضمان سلامة حسابك'
    },
    {
      icon: TrendingUp,
      title: 'نمو سريع',
      description: 'زيادة أعضاء القناة أو الجروب بسرعة ملحوظة'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'اختر الجروب المصدر',
      description: 'حدد الجروب الذي تريد سحب الأعضاء منه'
    },
    {
      number: '2',
      title: 'تحديد المعايير',
      description: 'اختر نوع الأعضاء (نشطين، متفاعلين، إلخ)'
    },
    {
      number: '3',
      title: 'السحب الذكي',
      description: 'الذكاء الاصطناعي يختار أفضل الأعضاء'
    },
    {
      number: '4',
      title: 'النتائج الفورية',
      description: 'مشاهدة النتائج مباشرة في قناتك'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzNzNkNmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-8 py-4 mb-8 border border-blue-400/30">
            <Bot className="h-8 w-8 text-blue-300 mr-3 animate-pulse" />
            <span className="text-white font-bold text-xl">🚀 خدمة حصرية جديدة</span>
            <Badge className="bg-red-500 text-white font-bold ml-3 animate-bounce">جديد</Badge>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              سحب أعضاء Telegram
            </span>
            <br />
            <span className="text-white text-3xl md:text-4xl">بالذكاء الاصطناعي 🤖</span>
          </h2>
          
          <p className="text-xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed">
            أول وأقوى خدمة في المنطقة لسحب أعضاء تليجرام بتقنية الذكاء الاصطناعي المتطورة
            <br />
            <span className="text-yellow-300 font-bold">🎯 استهداف ذكي • 🔥 نتائج مضمونة • ⚡ تنفيذ سريع</span>
          </p>

          {/* Special Offer */}
          <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto border border-red-400/30 mb-8">
            <div className="flex items-center justify-center gap-3 text-white font-bold text-lg">
              <Star className="h-6 w-6 text-yellow-400 animate-spin" />
              عرض الإطلاق الحصري - خصم 50% على أول 100 عميل!
              <Star className="h-6 w-6 text-yellow-400 animate-spin" />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100 text-center text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">كيف تعمل الخدمة؟</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {step.number}
                </div>
                <h4 className="text-white font-bold text-lg mb-2">{step.title}</h4>
                <p className="text-blue-100 text-sm">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-8 border-t-2 border-dashed border-blue-300 transform translate-x-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-sm rounded-3xl p-8 border border-blue-400/30">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">🎯 جاهز لزيادة أعضاء قناتك؟</h3>
            <p className="text-blue-100 text-lg mb-6">ابدأ الآن واحصل على آلاف الأعضاء الحقيقيين بالذكاء الاصطناعي</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                🚀 ابدأ السحب الذكي الآن
                <Bot className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg rounded-full backdrop-blur-sm"
              >
                💬 استشارة مجانية
              </Button>
            </div>

            {/* Guarantee */}
            <div className="flex items-center justify-center gap-2 text-green-300">
              <CheckCircle className="h-5 w-5" />
              <span className="font-semibold">ضمان استرداد المال 100% - نتائج مضمونة</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TelegramSection;
