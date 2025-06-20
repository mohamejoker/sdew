
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Brain, Zap, TrendingUp, Star, Shield } from 'lucide-react';

const AIFocusedHero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
      <div className="absolute inset-0 bg-black/5"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Trust Badge */}
        <div className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-8 py-4 rounded-full mb-8 shadow-xl">
          <Shield className="h-6 w-6 mr-3" />
          <span className="font-bold text-lg">✅ موثوق من +250 ألف عميل</span>
        </div>

        {/* Main Heading - Focus on Results */}
        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
          <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
            حقق نجاح حقيقي
          </span>
          <br />
          <span className="text-white">بذكاء اصطناعي متطور</span>
        </h1>

        {/* Value-focused Subtitle */}
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
          📈 نحلل حساباتك ونصمم استراتيجيات ذكية تضاعف متابعينك وتفاعلك
          <br />
          <span className="text-blue-200 font-semibold">🚀 نتائج ملموسة خلال 48 ساعة مضمونة</span>
        </p>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">تحليل AI فوري</h3>
            <p className="text-white/80 leading-relaxed">تحليل شامل لحسابك والمنافسين خلال دقائق</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">نمو مضاعف</h3>
            <p className="text-white/80 leading-relaxed">زيادة المتابعين والتفاعل بنسبة 300% أو أكثر</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">نتائج سريعة</h3>
            <p className="text-white/80 leading-relaxed">تحسن ملحوظ خلال 48 ساعة من البدء</p>
          </div>
        </div>

        {/* Single Strong CTA - Free Trial Focus */}
        <div className="mb-8">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-bold px-16 py-8 text-2xl rounded-full shadow-2xl transform hover:scale-105 transition-all border-4 border-white/20"
          >
            <MessageSquare className="h-8 w-8 mr-4" />
            احصل على تحليل مجاني فوري
          </Button>
        </div>

        {/* Social Proof & Guarantee */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto border border-white/20">
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
            ))}
            <span className="text-white font-bold text-lg mr-3">4.9/5</span>
          </div>
          <p className="text-white/90 text-lg leading-relaxed">
            <span className="font-bold text-emerald-300">250,000+ عميل راض</span> حققوا نمواً استثنائياً
            <br />
            <span className="text-blue-200">🛡️ ضمان النتائج أو استرداد كامل للمال</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AIFocusedHero;
