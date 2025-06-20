
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MessageSquare, Bot, Phone, Mail, Clock, CheckCircle, Star } from 'lucide-react';

const SupportSection = () => {
  const [chatOpen, setChatOpen] = useState(false);

  const faqs = [
    {
      question: 'هل المتابعين حقيقيين؟',
      answer: 'نعم، جميع متابعينا حقيقيين 100% وحسابات نشطة. نحن نضمن عدم استخدام botts أو حسابات وهمية.'
    },
    {
      question: 'كم من الوقت يستغرق التسليم؟',
      answer: 'التسليم يبدأ خلال 24 ساعة وقد يستغرق من 1-7 أيام حسب حجم الطلب لضمان التسليم الطبيعي والآمن.'
    },
    {
      question: 'هل هناك ضمان؟',
      answer: 'نعم، نقدم ضمان مدى الحياة ضد النقصان. في حالة حدوث أي نقصان، سنعوضه مجاناً.'
    },
    {
      question: 'هل الخدمة آمنة؟',
      answer: 'نعم، خدماتنا آمنة 100% ولا تخالف قوانين المنصات. نستخدم طرق طبيعية لضمان سلامة حسابك.'
    },
    {
      question: 'ما هي طرق الدفع المتاحة؟',
      answer: 'نقبل فودافون كاش، العملات الرقمية، والتحويل البنكي. جميع المعاملات آمنة ومشفرة.'
    },
    {
      question: 'هل يمكنني إلغاء الطلب؟',
      answer: 'يمكن إلغاء الطلب قبل بدء التسليم فقط. بعد بدء التسليم لا يمكن الإلغاء لكن يمكن تعديل المتطلبات.'
    }
  ];

  const supportChannels = [
    {
      icon: MessageSquare,
      title: 'الدردشة المباشرة',
      description: 'تحدث معنا فوراً',
      action: 'ابدأ المحادثة',
      available: '24/7'
    },
    {
      icon: Phone,
      title: 'الواتساب',
      description: 'تواصل عبر الواتساب',
      action: 'راسلنا الآن',
      available: '24/7'
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      description: 'أرسل لنا استفسارك',
      action: 'أرسل رسالة',
      available: 'رد خلال ساعة'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* AI Assistant Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 px-8 py-4 rounded-full text-lg font-bold mb-8 border border-purple-200">
            <Bot className="h-6 w-6 mr-3 animate-pulse" />
            🤖 وكيل ذكاء اصطناعي متطور - اسأل أي سؤال!
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              مساعدة فورية
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            احصل على إجابات فورية من وكيلنا الذكي أو تحدث مع فريق الدعم مباشرة
          </p>

          <Button 
            onClick={() => setChatOpen(!chatOpen)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-4 text-xl font-bold rounded-full shadow-xl transform hover:scale-105 transition-all"
          >
            💬 تحدث مع الوكيل الذكي الآن
          </Button>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {supportChannels.map((channel, index) => {
            const IconComponent = channel.icon;
            return (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{channel.title}</CardTitle>
                  <p className="text-gray-600">{channel.description}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex items-center justify-center gap-2 text-green-600 font-bold mb-4">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{channel.available}</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                    {channel.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              الأسئلة الشائعة
            </h3>
            <p className="text-lg text-gray-700">
              إجابات سريعة على أهم الأسئلة
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-2 border-gray-200 rounded-xl px-6">
                <AccordionTrigger className="text-right text-lg font-bold text-gray-900 hover:text-purple-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-lg leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white max-w-4xl mx-auto">
            <CardContent className="p-10">
              <h3 className="text-3xl font-black mb-4">
                🚀 هل أنت مستعد للبدء؟
              </h3>
              <p className="text-xl mb-8 opacity-90">
                انضم لآلاف العملاء الراضين واحصل على نتائج مذهلة خلال 24 ساعة
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg rounded-full shadow-xl"
                >
                  💬 ابدأ محادثة مجانية
                </Button>
                <Button 
                  variant="outline"
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 text-lg rounded-full"
                >
                  🤖 جرب الوكيل الذكي
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
