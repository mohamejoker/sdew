
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquare, Brain, Zap, Bot, Star, TrendingUp, Users, Shield, Globe } from 'lucide-react';
import RealAIChat from '@/components/AI/RealAIChat';

const AIAssistant = () => {
  const { t } = useLanguage();

  const handleActionClick = (action: string, data?: any) => {
    console.log('AI Action clicked:', action, data);
    // Handle specific actions from the AI agent
  };

  const advantages = [
    { icon: Star, text: 'متابعين حقيقيين 100%' },
    { icon: Shield, text: 'آمن ومضمون' },
    { icon: Users, text: 'تفاعل طبيعي' },
    { icon: Zap, text: 'نتائج سريعة' }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 px-6 py-3 rounded-full text-lg font-bold mb-6 border border-purple-200">
            <Bot className="h-5 w-5 mr-2 animate-pulse" />
            🤖 وكيل ذكاء اصطناعي حقيقي
            <Brain className="h-4 w-4 ml-2" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ذكاء اصطناعي حقيقي
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              متصل بأقوى المنصات العالمية
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            وكيل ذكاء اصطناعي متطور متصل مباشرة بـ OpenAI GPT-4، Google Gemini، و Grok AI
            للحصول على أفضل النتائج في تحليل حساباتك ووضع الاستراتيجيات المتقدمة
          </p>

          {/* AI Providers */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200">
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-2">
                <Brain className="h-3 w-3 text-white" />
              </div>
              <span className="font-semibold text-gray-700 text-sm">OpenAI GPT-4</span>
            </div>
            <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-2">
                <Globe className="h-3 w-3 text-white" />
              </div>
              <span className="font-semibold text-gray-700 text-sm">Google Gemini</span>
            </div>
            <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-2">
                <Zap className="h-3 w-3 text-white" />
              </div>
              <span className="font-semibold text-gray-700 text-sm">Grok AI</span>
            </div>
          </div>

          {/* Advantages */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <div key={index} className="flex items-center bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200">
                  <IconComponent className="h-4 w-4 text-green-500 mr-2" />
                  <span className="font-semibold text-gray-700 text-sm">{advantage.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Capabilities */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 md:p-8 mb-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">🚀 قدرات الذكاء الاصطناعي الحقيقية</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl mb-2">🧠</div>
              <h4 className="text-lg font-bold mb-1">تحليل متقدم</h4>
              <p className="text-blue-100 text-sm">تحليل عميق للحسابات والمحتوى</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl mb-2">🎨</div>
              <h4 className="text-lg font-bold mb-1">إنشاء المحتوى</h4>
              <p className="text-blue-100 text-sm">محتوى إبداعي وجذاب</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl mb-2">🖼️</div>
              <h4 className="text-lg font-bold mb-1">تحليل الصور</h4>
              <p className="text-blue-100 text-sm">تحليل تفصيلي للمحتوى المرئي</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl mb-2">🌍</div>
              <h4 className="text-lg font-bold mb-1">ترجمة فورية</h4>
              <p className="text-blue-100 text-sm">ترجمة احترافية لأي لغة</p>
            </div>
          </div>
        </div>

        {/* Real AI Chat */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 text-center">
            <h3 className="text-xl font-bold mb-1">💬 تحدث مع الذكاء الاصطناعي الحقيقي</h3>
            <p className="text-blue-100 text-sm">اختر المزود المفضل واحصل على إجابات فورية</p>
          </div>
          <RealAIChat onActionClick={handleActionClick} />
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
