
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Bot, Star, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompactHeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* خلفية ديناميكية */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* شارة الثقة */}
        <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-green-400/30">
          <Users className="h-5 w-5 text-green-300 mr-2" />
          <span className="text-white font-semibold">✅ موثوق من +250 ألف عميل</span>
        </div>

        {/* العنوان الرئيسي */}
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
          <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
            نمو حقيقي
          </span>
          <br />
          <span className="text-white text-4xl md:text-5xl">بذكاء اصطناعي</span>
        </h1>

        {/* الوصف */}
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
          📈 ضاعف متابعينك وتفاعلك خلال 48 ساعة مضمونة
        </p>

        {/* المميزات السريعة */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { icon: Bot, text: 'تحليل AI فوري' },
            { icon: TrendingUp, text: 'نمو 300%+' },
            { icon: Star, text: 'ضمان النتائج' }
          ].map((feature, index) => (
            <div key={index} className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <feature.icon className="h-4 w-4 text-white mr-2" />
              <span className="text-white text-sm font-medium">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* أزرار العمل */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link to="/ai-chat">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-bold px-8 py-6 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all"
            >
              <MessageSquare className="h-6 w-6 mr-3" />
              تحليل مجاني فوري
            </Button>
          </Link>
          <Link to="/services">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-xl rounded-full backdrop-blur-sm"
            >
              تصفح الخدمات
            </Button>
          </Link>
        </div>

        {/* إحصائيات سريعة */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
          <div className="flex justify-center items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
            <span className="text-white font-bold text-lg mr-2">4.9/5</span>
          </div>
          <p className="text-white/90">
            <span className="font-bold text-emerald-300">250,000+ عميل</span> حققوا نمواً استثنائياً
          </p>
        </div>
      </div>
    </section>
  );
};

export default CompactHeroSection;
