
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Zap, Target, TrendingUp, Shield } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      step: '01',
      title: 'اشترك واربط حسابك',
      description: 'سجل في المنصة واربط حساباتك على مواقع التواصل بأمان تام. العملية تستغرق دقيقتين فقط.',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      features: ['ربط آمن 100%', 'حماية كاملة للبيانات', 'دعم جميع المنصات']
    },
    {
      step: '02',
      title: 'اختر استراتيجيتك',
      description: 'حدد أهدافك ونوع المحتوى. ذكاؤنا الاصطناعي سيضع استراتيجية مخصصة لحسابك.',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      features: ['تحليل ذكي للمنافسين', 'استراتيجية مخصصة', 'تحديث مستمر للخطة']
    },
    {
      step: '03',
      title: 'شاهد النمو المذهل',
      description: 'استرخ ودع التكنولوجيا تعمل. ستشاهد نمواً حقيقياً ومتابعين فعليين خلال 24-48 ساعة.',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      features: ['نتائج خلال 24 ساعة', 'نمو مستمر ومضمون', 'تقارير يومية مفصلة']
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 font-arabic">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 px-6 py-3 rounded-full text-lg font-bold mb-6 border border-blue-200">
            <Zap className="h-5 w-5 mr-3" />
            عملية بسيطة • نتائج مضمونة
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              كيف تعمل المنصة؟
            </span>
            <br />
            <span className="text-gray-800 text-2xl md:text-3xl">3 خطوات بسيطة للنجاح</span>
          </h2>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            عملية بسيطة ومدروسة لضمان أفضل النتائج في أقل وقت ممكن
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            
            return (
              <div key={index} className="relative">
                <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 border-gray-200 h-full">
                  <CardContent className="p-8 text-center">
                    {/* Step Number */}
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 text-white font-black text-2xl shadow-lg`}>
                      {step.step}
                    </div>

                    {/* Icon */}
                    <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3">
                      {step.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center justify-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-gray-800 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Arrow (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 bg-white border-2 border-blue-300 rounded-full flex items-center justify-center shadow-lg">
                      <ArrowRight className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Guarantee Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-4 border-green-300 rounded-3xl p-10 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Shield className="h-12 w-12 text-green-600" />
            <div className="text-right">
              <h3 className="text-3xl font-black text-gray-900">ضمان النتائج أو استرداد المال</h3>
              <p className="text-green-700 font-bold text-xl">نضمن لك النجاح 100% أو نسترد أموالك كاملة</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">ضمان لمدة 30 يوم</h4>
              <p className="text-gray-700">إذا لم تحصل على النتائج، نسترد المال كاملاً</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <Zap className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">نتائج خلال 24 ساعة</h4>
              <p className="text-gray-700">ستشاهد بداية النمو خلال يوم واحد فقط</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <Shield className="h-8 w-8 text-purple-600 mx-auto mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">حماية كاملة للحساب</h4>
              <p className="text-gray-700">تقنيات متطورة لضمان أمان حسابك 100%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
