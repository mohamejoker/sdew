
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Brain, Globe, Zap, Bot, Star, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompactAIChat = () => {
  const aiProviders = [
    { name: 'OpenAI GPT-4', icon: Brain, color: 'from-green-500 to-blue-500' },
    { name: 'Google Gemini', icon: Globe, color: 'from-blue-500 to-purple-500' },
    { name: 'Grok AI', icon: Zap, color: 'from-purple-500 to-pink-500' }
  ];

  const capabilities = [
    { icon: '🧠', title: 'تحليل متقدم', desc: 'تحليل عميق للحسابات والمحتوى' },
    { icon: '🎨', title: 'إنشاء المحتوى', desc: 'محتوى إبداعي وجذاب' },
    { icon: '🖼️', title: 'تحليل الصور', desc: 'تحليل تفصيلي للمحتوى المرئي' },
    { icon: '🌍', title: 'ترجمة فورية', desc: 'ترجمة احترافية لأي لغة' }
  ];

  const advantages = [
    { icon: Star, text: 'متابعين حقيقيين 100%' },
    { icon: Users, text: 'تفاعل طبيعي' },
    { icon: TrendingUp, text: 'نتائج سريعة' }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 px-6 py-3 rounded-full text-lg font-bold mb-6 border border-purple-200">
            <Bot className="h-5 w-5 mr-2 animate-pulse" />
            🤖 وكيل ذكاء اصطناعي حقيقي
            <Brain className="h-4 w-4 ml-2" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            ذكاء اصطناعي حقيقي
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              متصل بأقوى المنصات العالمية
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            وكيل ذكاء اصطناعي متطور متصل مباشرة بـ OpenAI GPT-4، Google Gemini، و Grok AI
            للحصول على أفضل النتائج في تحليل حساباتك ووضع الاستراتيجيات المتقدمة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - AI Info */}
          <div className="space-y-8">
            {/* AI Providers */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">منصات الذكاء الاصطناعي المدعومة</h3>
              <div className="space-y-4">
                {aiProviders.map((provider, index) => {
                  const IconComponent = provider.icon;
                  return (
                    <div key={index} className="flex items-center bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                      <div className={`w-12 h-12 bg-gradient-to-r ${provider.color} rounded-xl flex items-center justify-center mr-4`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{provider.name}</h4>
                        <p className="text-sm text-gray-600">متصل ومتاح الآن</p>
                      </div>
                      <div className="mr-auto">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Advantages */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">المزايا الحصرية</h3>
              <div className="flex flex-wrap gap-3">
                {advantages.map((advantage, index) => {
                  const IconComponent = advantage.icon;
                  return (
                    <div key={index} className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
                      <IconComponent className="h-4 w-4 text-green-500 mr-2" />
                      <span className="font-semibold text-gray-700 text-sm">{advantage.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side - Capabilities & CTA */}
          <div className="space-y-6">
            {/* AI Capabilities */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-2xl font-bold mb-6 text-center">🚀 قدرات الذكاء الاصطناعي الحقيقية</h3>
              <div className="grid grid-cols-2 gap-4">
                {capabilities.map((capability, index) => (
                  <div key={index} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm text-center">
                    <div className="text-2xl mb-2">{capability.icon}</div>
                    <h4 className="font-bold mb-1">{capability.title}</h4>
                    <p className="text-blue-100 text-sm">{capability.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Preview */}
            <Card className="border-2 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">مساعد الذكاء الاصطناعي</h4>
                    <p className="text-sm text-green-600">● متصل ونشط</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-gray-700">
                    مرحباً! أنا مساعدك الذكي. يمكنني تحليل حسابك، اقتراح محتوى، وإنشاء استراتيجيات نمو مخصصة لك.
                  </p>
                </div>
                
                <Link to="/ai-chat">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90" size="lg">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    ابدأ المحادثة الآن
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompactAIChat;
