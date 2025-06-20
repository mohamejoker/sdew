
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Shield, Clock, Zap } from 'lucide-react';

const FAQSection = () => {
  const faqs = [
    {
      id: "item-1",
      question: "هل الخدمة آمنة على حسابي؟",
      answer: "نعم، نستخدم أحدث تقنيات الأمان والحماية. جميع خدماتنا تتوافق مع سياسات منصات التواصل الاجتماعي ولا تضر بحسابك أبداً. لدينا ضمان كامل على سلامة حسابك.",
      icon: Shield
    },
    {
      id: "item-2", 
      question: "متى سأرى النتائج؟",
      answer: "ستبدأ في رؤية النتائج خلال 24-48 ساعة من بداية الخدمة. النمو الكامل يكون واضحاً خلال أسبوع واحد. نضمن لك النتائج أو نسترد أموالك كاملة.",
      icon: Clock
    },
    {
      id: "item-3",
      question: "هل المتابعين حقيقيين؟",
      answer: "نعم، 100% من المتابعين حقيقيين ونشطين. نحن لا نستخدم حسابات وهمية أو بوتات. جميع المتابعين من أشخاص حقيقيين مهتمين بمحتواك.",
      icon: Zap
    },
    {
      id: "item-4",
      question: "ماذا لو لم أحصل على النتائج المطلوبة؟",
      answer: "لدينا ضمان استرداد المال خلال 30 يوم. إذا لم تحصل على النتائج الموعودة، سنسترد لك المبلغ كاملاً بدون أي أسئلة. ثقتك هي أولويتنا.",
      icon: Shield
    },
    {
      id: "item-5",
      question: "هل يمكنني إيقاف الخدمة في أي وقت؟",
      answer: "نعم، يمكنك إيقاف أو تعديل الخدمة في أي وقت من لوحة التحكم. لا توجد التزامات طويلة المدى ولديك السيطرة الكاملة على حسابك.",
      icon: HelpCircle
    },
    {
      id: "item-6",
      question: "هل تدعمون جميع منصات التواصل؟",
      answer: "نعم، ندعم Instagram, TikTok, Twitter, Facebook, YouTube, Snapchat وجميع منصات التواصل الرئيسية. يمكنك استخدام الخدمة على عدة منصات بنفس الحساب.",
      icon: Zap
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 font-arabic">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-orange-500/10 to-red-500/10 text-orange-700 px-6 py-3 rounded-full text-lg font-bold mb-6 border border-orange-200">
            <HelpCircle className="h-5 w-5 mr-3" />
            أسئلة شائعة • إجابات واضحة
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              الأسئلة الشائعة
            </span>
            <br />
            <span className="text-gray-800 text-2xl md:text-3xl">كل ما تريد معرفته</span>
          </h2>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            إجابات واضحة ومفصلة على جميع أسئلتك حول خدماتنا
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* FAQ Accordion */}
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden mb-12">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => {
                const IconComponent = faq.icon;
                
                return (
                  <AccordionItem key={faq.id} value={faq.id} className="border-b border-gray-200 last:border-b-0">
                    <AccordionTrigger className="px-8 py-6 text-right hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4 w-full">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-lg font-bold text-gray-900 text-right flex-1">
                          {faq.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="mr-16">
                        <p className="text-gray-700 text-lg leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-black mb-4">لديك سؤال آخر؟</h3>
            <p className="text-blue-100 text-lg mb-6">
              فريق الدعم متاح 24/7 للرد على جميع استفساراتك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all">
                💬 تحدث معنا عبر الواتساب
              </button>
              <button className="bg-blue-500/20 border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-500/30 transition-all">
                📧 راسلنا عبر البريد الإلكتروني
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
