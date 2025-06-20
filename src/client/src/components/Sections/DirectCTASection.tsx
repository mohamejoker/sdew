
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Shield, Star, Users } from 'lucide-react';

const DirectCTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Trust Elements */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
            <div className="flex items-center text-white/90">
              <Users className="h-6 w-6 mr-2" />
              <span className="font-semibold">+250 ألف عميل</span>
            </div>
            <div className="flex items-center text-white/90">
              <div className="flex items-center mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="font-semibold">تقييم 4.9/5</span>
            </div>
            <div className="flex items-center text-white/90">
              <Shield className="h-6 w-6 mr-2" />
              <span className="font-semibold">ضمان النتائج</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            جاهز لبدء رحلة النجاح؟
          </h2>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed">
            انضم لآلاف الناجحين الذين حققوا أحلامهم معنا
            <br />
            <span className="text-lg font-medium text-white/80">
              ابدأ بتحليل مجاني لحسابك واكتشف إمكانياتك الحقيقية
            </span>
          </p>
          
          {/* Benefits Preview */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-10 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">ماذا ستحصل عليه مجاناً؟</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
              <div className="text-center">
                <div className="text-3xl mb-2">📊</div>
                <div className="font-semibold">تحليل شامل</div>
                <div className="text-sm text-blue-200">لحسابك والمنافسين</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💡</div>
                <div className="font-semibold">اقتراحات ذكية</div>
                <div className="text-sm text-blue-200">لتحسين المحتوى</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <div className="font-semibold">خطة عمل</div>
                <div className="text-sm text-blue-200">مخصصة لأهدافك</div>
              </div>
            </div>
          </div>

          {/* Main CTA */}
          <div className="mb-8">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-16 py-6 text-2xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <MessageSquare className="h-8 w-8 mr-4" />
              ابدأ تحليلك المجاني الآن
            </Button>
          </div>
          
          {/* Guarantee */}
          <div className="bg-emerald-500/20 backdrop-blur-sm rounded-2xl p-6 border border-emerald-400/30">
            <div className="flex items-center justify-center gap-3 text-emerald-100">
              <Shield className="h-6 w-6" />
              <span className="font-bold text-lg">
                🛡️ ضمان مدى الحياة: راضي 100% أو نعيد لك أموالك
              </span>
            </div>
          </div>
          
          <p className="text-blue-200 mt-6 text-lg">
            💬 رد فوري خلال دقائق | 🤖 تحليل ذكي مجاني | 🚀 بدء فوري
          </p>
        </div>
      </div>
    </section>
  );
};

export default DirectCTASection;
