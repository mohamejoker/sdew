
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Brain, Shield, Users, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const OptimizedHero: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
      <div className="absolute inset-0 bg-black/5"></div>
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-right">
            {/* Trust Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-full mb-6 shadow-xl">
              <Shield className="h-5 w-5 mr-2" />
              <span className="font-bold">✅ موثوق من +250 ألف عميل</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                حقق نجاح حقيقي
              </span>
              <br />
              <span className="text-white text-3xl md:text-4xl">بذكاء اصطناعي متطور</span>
            </h1>

            {/* Value Proposition */}
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              📈 نحلل حساباتك ونصمم استراتيجيات ذكية تضاعف متابعينك وتفاعلك
              <br />
              <span className="text-blue-200 font-semibold">🚀 نتائج ملموسة خلال 48 ساعة مضمونة</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
              <Link to="/ai-chat">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-bold px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all"
                >
                  <MessageSquare className="h-6 w-6 mr-3" />
                  تحليل مجاني فوري
                </Button>
              </Link>
              <Link to="/services">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg rounded-full backdrop-blur-sm"
                >
                  تصفح الخدمات
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
              <span className="text-white font-bold text-lg mr-2">4.9/5</span>
              <span className="text-blue-200">من 250,000+ عميل</span>
            </div>
          </div>

          {/* Right Content - Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">تحليل AI فوري</h3>
              <p className="text-white/80 text-sm">تحليل شامل لحسابك والمنافسين خلال دقائق</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">نمو مضاعف</h3>
              <p className="text-white/80 text-sm">زيادة المتابعين والتفاعل بنسبة 300% أو أكثر</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">آمان مضمون</h3>
              <p className="text-white/80 text-sm">جميع خدماتنا آمنة وموثوقة 100%</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">متابعين حقيقيين</h3>
              <p className="text-white/80 text-sm">100% متابعين حقيقيين ونشطين</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptimizedHero;
