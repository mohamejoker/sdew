
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Shield, Star, Users, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompactCTA = () => {
  const guarantees = [
    { icon: Shield, text: 'ضمان النتائج', desc: 'أو استرداد كامل' },
    { icon: Clock, text: 'نتائج سريعة', desc: 'خلال 48 ساعة' },
    { icon: Users, text: '+250 ألف عميل', desc: 'راضي ومتابع' }
  ];

  const benefits = [
    { icon: '📊', title: 'تحليل شامل', desc: 'لحسابك والمنافسين' },
    { icon: '💡', title: 'اقتراحات ذكية', desc: 'لتحسين المحتوى' },
    { icon: '🎯', title: 'خطة عمل', desc: 'مخصصة لأهدافك' }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Left Side - CTA Content */}
            <div className="text-center lg:text-right">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                جاهز لبدء رحلة النجاح؟
              </h2>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                انضم لآلاف الناجحين الذين حققوا أحلامهم معنا
                <br />
                <span className="text-lg font-medium text-white/80">
                  ابدأ بتحليل مجاني لحسابك واكتشف إمكانياتك الحقيقية
                </span>
              </p>

              {/* Trust Elements Row */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 mb-8">
                {guarantees.map((guarantee, index) => {
                  const IconComponent = guarantee.icon;
                  return (
                    <div key={index} className="flex items-center text-white/90">
                      <IconComponent className="h-5 w-5 mr-2" />
                      <div className="text-left">
                        <div className="font-semibold text-sm">{guarantee.text}</div>
                        <div className="text-xs text-blue-200">{guarantee.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-8">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-white font-semibold mr-2">4.9/5</span>
                <span className="text-blue-200">تقييم عملائنا</span>
              </div>

              {/* Main CTA */}
              <Link to="/ai-chat">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-12 py-6 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 mb-4"
                >
                  <MessageSquare className="h-6 w-6 mr-3" />
                  ابدأ تحليلك المجاني الآن
                </Button>
              </Link>
              
              <p className="text-blue-200 text-sm">
                💬 رد فوري خلال دقائق | 🤖 تحليل ذكي مجاني | 🚀 بدء فوري
              </p>
            </div>

            {/* Right Side - Benefits Preview */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  ماذا ستحصل عليه مجاناً؟
                </h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4 bg-white/5 rounded-xl p-4">
                      <div className="text-3xl">{benefit.icon}</div>
                      <div>
                        <h4 className="font-semibold text-white text-lg">{benefit.title}</h4>
                        <p className="text-blue-200">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-black text-white mb-1">250K+</div>
                    <div className="text-blue-200 text-sm">عميل نشط</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white mb-1">99.9%</div>
                    <div className="text-blue-200 text-sm">معدل النجاح</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white mb-1">24/7</div>
                    <div className="text-blue-200 text-sm">دعم فني</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Guarantee */}
          <div className="bg-emerald-500/20 backdrop-blur-sm rounded-2xl p-6 border border-emerald-400/30 text-center">
            <div className="flex items-center justify-center gap-3 text-emerald-100">
              <Shield className="h-6 w-6" />
              <span className="font-bold text-lg">
                🛡️ ضمان مدى الحياة: راضي 100% أو نعيد لك أموالك
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompactCTA;
