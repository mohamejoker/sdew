
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, MessageSquare, Brain, Target, BarChart3, Sparkles, Zap } from 'lucide-react';

const AIServicesSection = () => {
  const services = [
    {
      icon: Brain,
      title: 'تحليل ذكي شامل',
      description: 'تحليل عميق لحسابك والمنافسين بتقنيات AI متطورة لفهم جمهورك بدقة',
      benefits: [
        'تحليل الجمهور المستهدف بدقة',
        'دراسة سلوك المتابعين والتفاعل',
        'تحديد أفضل أوقات النشر',
        'مقارنة شاملة مع المنافسين'
      ],
      gradient: 'from-emerald-500 to-blue-600',
      badge: 'الأساس للنجاح',
      result: 'فهم عميق للجمهور'
    },
    {
      icon: Target,
      title: 'استراتيجية نمو ذكية',
      description: 'خطة نمو مخصصة بالكامل لحسابك مع متابعة يومية من خبراء التسويق',
      benefits: [
        'استراتيجية نمو مخصصة 100%',
        'متابعة يومية من خبراء',
        'تحليل النتائج وتحسين مستمر',
        'ضمان تحقيق الأهداف المحددة'
      ],
      gradient: 'from-blue-500 to-purple-600',
      badge: 'الأكثر طلباً',
      result: 'نمو مضاعف مضمون',
      popular: true
    },
    {
      icon: BarChart3,
      title: 'محتوى ذكي مُحسَّن',
      description: 'إنشاء وتحسين المحتوى بالذكاء الاصطناعي لتحقيق أقصى تفاعل وانتشار',
      benefits: [
        'محتوى مُحسَّن بـ AI',
        'تصاميم جذابة واحترافية',
        'كتابة نصوص تسويقية فعالة',
        'جدولة وتوقيت مثالي للنشر'
      ],
      gradient: 'from-purple-500 to-pink-600',
      badge: 'إبداع بلا حدود',
      result: 'محتوى فيروسي'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-xl font-bold mb-8">
            <Sparkles className="h-6 w-6 mr-3" />
            حلول ذكية مُثبتة النجاح
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            كيف نحقق لك النجاح؟
          </h2>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            نستخدم أحدث تقنيات الذكاء الاصطناعي لتحليل حسابك وبناء استراتيجية نمو مخصصة تحقق نتائج استثنائية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className={`relative hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 ${
                  service.popular 
                    ? 'ring-4 ring-blue-300 scale-110 border-blue-300 shadow-xl' 
                    : 'border-gray-200 shadow-lg'
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 font-bold text-lg shadow-xl">
                      🔥 الأكثر اختياراً
                    </Badge>
                  </div>
                )}

                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold px-4 py-2">
                    {service.badge}
                  </Badge>
                </div>

                <CardHeader className="text-center pb-6 pt-12">
                  <div className={`w-20 h-20 bg-gradient-to-r ${service.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </CardTitle>
                  
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {service.description}
                  </p>
                </CardHeader>

                <CardContent className="px-8">
                  <ul className="space-y-4 mb-8">
                    {service.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start">
                        <div className={`w-6 h-6 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0`}>
                          <Check className="h-4 w-4 text-white font-bold" />
                        </div>
                        <span className="text-gray-700 text-lg leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4 mb-6 border border-blue-200">
                    <div className="flex items-center justify-center gap-2 text-blue-700 font-bold text-lg">
                      <Zap className="h-5 w-5" />
                      <span>{service.result}</span>
                    </div>
                  </div>

                  <Button 
                    className={`w-full py-4 text-xl font-bold transition-all duration-300 bg-gradient-to-r ${service.gradient} hover:shadow-xl transform hover:scale-105`}
                  >
                    <MessageSquare className="h-6 w-6 mr-3" />
                    ابدأ رحلتك المجانية
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* AI Providers Section - Enhanced */}
        <div className="mt-20 bg-white rounded-3xl shadow-2xl p-10 max-w-5xl mx-auto border-2 border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">مدعوم بأقوى منصات الذكاء الاصطناعي</h3>
            <p className="text-lg text-gray-600">نستخدم أحدث التقنيات لضمان أفضل النتائج</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl px-8 py-4 border border-green-200">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-800 text-lg">OpenAI GPT-4</div>
                <div className="text-sm text-gray-600">تحليل وتوليد المحتوى</div>
              </div>
            </div>
            
            <div className="flex items-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl px-8 py-4 border border-blue-200">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-800 text-lg">Google Gemini</div>
                <div className="text-sm text-gray-600">تحليل البيانات المتقدم</div>
              </div>
            </div>
            
            <div className="flex items-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl px-8 py-4 border border-purple-200">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-800 text-lg">Claude AI</div>
                <div className="text-sm text-gray-600">استراتيجيات التسويق</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIServicesSection;
