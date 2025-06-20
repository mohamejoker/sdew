
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, CheckCircle, TrendingUp, Bot, Crown } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'أحمد محمد',
      role: 'صاحب متجر إلكتروني',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'الوكيل الذكي في Town Media غير حياتي! زادت متابعيني من 500 إلى 80,000 في شهر واحد. الخدمة حقيقية ومش فيك زي المنافسين!',
      results: 'زيادة 16,000% في المتابعين',
      verified: true,
      highlight: 'متابعين حقيقيين'
    },
    {
      name: 'فاطمة السعيد',
      role: 'مؤثرة في الجمال',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b332c1c3?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'خدمة الكومنتات من النجوم الموثقين خلت حسابي يبان احترافي جداً! دلوقتي بتعاون مع أكبر الماركات العالمية والتفاعل حقيقي مش مزيف.',
      results: 'تعاقد مع 25 ماركة عالمية',
      verified: true,
      highlight: 'تفاعل من نجوم حقيقيين'
    },
    {
      name: 'خالد العتيبي',
      role: 'مدرب لياقة بدنية',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'الذكاء الاصطناعي حلل حسابي وحط لي استراتيجية محترفة. من 1000 متابع لـ 120,000 في 3 أشهر! عندي قوائم انتظار للتدريب.',
      results: 'دخل شهري زاد 800%',
      verified: true,
      highlight: 'استراتيجية ذكية'
    }
  ];

  const platforms = [
    { name: 'Instagram', icon: '📸', count: '50K+' },
    { name: 'TikTok', icon: '🎵', count: '100K+' },
    { name: 'Facebook', icon: '👥', count: '75K+' },
    { name: 'YouTube', icon: '📺', count: '25K+' },
    { name: 'Telegram', icon: '✈️', count: '30K+' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 font-arabic">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 px-8 py-4 rounded-full text-lg font-bold mb-8 border border-green-200">
            <CheckCircle className="h-6 w-6 mr-3" />
            شهادات عملاء حقيقيين • متابعين حقيقيين مش فيك 💯
            <Bot className="h-5 w-5 ml-3 animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              قصص نجاح حقيقية
            </span>
            <br />
            <span className="text-gray-800 text-2xl md:text-3xl">مع الوكيل الذكي المتطور</span>
          </h2>
          
          <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-8">
            آلاف العملاء حققوا أحلامهم مع خدماتنا المتطورة والذكاء الاصطناعي
            <br />
            <span className="text-green-600 font-bold">✅ متابعين حقيقيين • ✅ تفاعل طبيعي • ✅ نتائج مضمونة</span>
          </p>

          {/* Platform Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {platforms.map((platform, index) => (
              <div key={index} className="bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200 flex items-center">
                <span className="text-2xl mr-2">{platform.icon}</span>
                <div className="text-left">
                  <div className="font-bold text-gray-900">{platform.count}</div>
                  <div className="text-sm text-gray-600">{platform.name}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-black text-green-600 mb-2">4,247</div>
              <div className="text-gray-600 font-semibold">عميل راضٍ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600 font-semibold">متابعين حقيقيين</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-purple-600 mb-2">AI</div>
              <div className="text-gray-600 font-semibold">وكيل ذكي</div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 border-gray-200 relative overflow-hidden">
              {/* Highlight Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                {testimonial.highlight}
              </div>
              
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="h-8 w-8 text-blue-500 mb-4" />
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-800 text-lg leading-relaxed mb-6 font-medium">
                  "{testimonial.text}"
                </p>

                {/* Results Badge */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-xl text-sm font-bold mb-6 inline-block">
                  <TrendingUp className="h-4 w-4 inline mr-2" />
                  {testimonial.results}
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-blue-200"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      {testimonial.verified && (
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <Crown className="h-4 w-4 text-yellow-500" />
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-black mb-4">🤖 انضم إلى ثورة الذكاء الاصطناعي</h3>
            <p className="text-blue-100 text-lg mb-6">
              احصل على متابعين حقيقيين وتفاعل طبيعي مع أحدث تقنيات الذكاء الاصطناعي
              <br />
              <span className="text-yellow-200 font-bold">✨ متابعين حقيقيين مش فيك • نتائج مضمونة 100%</span>
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all transform hover:scale-105">
              🚀 ابدأ الآن مع الوكيل الذكي
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
