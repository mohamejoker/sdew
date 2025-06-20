
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageSquare, Brain, Zap, TrendingUp, Star, Youtube, Facebook, Instagram, Twitter, Coins, Clock, Gift } from "lucide-react";
import { motion } from 'framer-motion';

// Social media icons info
const socialIcons = [
  { icon: Youtube, label: "YouTube", color: "text-red-500" },
  { icon: Facebook, label: "Facebook", color: "text-blue-600" },
  { icon: Instagram, label: "Instagram", color: "text-pink-500" },
  { icon: Twitter, label: "Twitter", color: "text-sky-400" },
];

const features = [
  { icon: Brain, title: "وكيل AI ذكي", desc: "تحليل ورفع الأداء تلقائيًا" },
  { icon: Zap, title: "تنفيذ فوري", desc: "بدء خدماتك في ثوان" },
  { icon: TrendingUp, title: "نتائج مضمونة", desc: "نمو ملحوظ خلال 48 ساعة" },
];

const stats = [
  { value: "250,000+", label: "عميل سعيد" },
  { value: "24/7", label: "دعم متواصل" },
  { value: "99%", label: "معدل الرضا" },
  { value: "100+", label: "خدمة متنوعة" },
];

// بطاقات الأسعار المميزة كما في الموقع المرجعي
const pricingCards = [
  {
    title: "الأسعار تبدأ من",
    price: "$0.0001",
    description: "لكل خدمة",
    icon: Coins,
    gradient: "from-gray-900 via-gray-800 to-black",
    coins: true
  },
  {
    title: "طلب مكتمل",
    price: "+31124200",
    description: "عملية ناجحة",
    icon: Gift,
    gradient: "from-orange-100 to-orange-200",
    textColor: "text-gray-800"
  },
  {
    title: "طلب جديد كل",
    price: "ثانية",
    description: "سرعة فائقة",
    icon: Clock,
    gradient: "from-yellow-400 to-yellow-500",
    textColor: "text-gray-900"
  }
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 py-16">
      {/* خلفيات ديناميكية ودوائر تزيينية */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-black/30"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-400 rounded-full blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col items-center text-center">
          {/* Badge وكيل الذكاء الاصطناعي */}
          <motion.div 
            className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-green-500/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-green-400/30"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Brain className="h-5 w-5 text-green-300 animate-pulse" />
            <span className="text-white font-semibold tracking-wide">وكيل AI للإعلانات وSMM</span>
          </motion.div>

          {/* عنوان الهبوط الإبداعي */}
          <motion.h1 
            className="text-5xl md:text-7xl font-black mb-6 text-white drop-shadow-lg leading-tight"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              انطلق بنجاحك الرقمي
            </span>
            <br />
            <span className="text-3xl md:text-4xl text-white">
              مع أقوى منصة AI وSMM احترافية
            </span>
          </motion.h1>

          {/* وصف مختصر، جملة اقوى للمشروع */}
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-3xl mb-8 mt-4 drop-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            🤖 الحل الذكي لمضاعفة متابعينك وتوسيع إعلاناتك
            <br />
            خدمات SMM + وكيل إعلانات AI = <span className="text-yellow-300 font-extrabold">تفوق رقمي مضمون</span>
          </motion.p>

          {/* بطاقات الأسعار المميزة */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {pricingCards.map((card, index) => (
              <motion.div
                key={index}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${card.gradient} shadow-2xl border border-white/10 backdrop-blur-sm`}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.3 }}
              >
                {card.coins && (
                  <div className="absolute top-4 right-4">
                    <Coins className="h-8 w-8 text-yellow-400 animate-bounce" />
                    <Coins className="h-6 w-6 text-yellow-300 absolute -top-2 -right-2 animate-bounce delay-200" />
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-4">
                  <card.icon className={`h-10 w-10 ${card.textColor || 'text-white'}`} />
                </div>
                
                <h3 className={`text-sm font-medium mb-2 ${card.textColor || 'text-white/80'}`}>
                  {card.title}
                </h3>
                <div className={`text-3xl font-black mb-1 ${card.textColor || 'text-white'}`}>
                  {card.price}
                </div>
                <p className={`text-sm ${card.textColor || 'text-white/60'}`}>
                  {card.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* أزرار الدعوة للإجراء */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-8 py-3 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              🚀 جرّب الوكيل الذكي الآن
              <ArrowLeft className="h-5 w-5 mr-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-bold backdrop-blur-sm"
            >
              استعرض باقات SMM
            </Button>
          </motion.div>

          {/* منصات السوشيال ميديا */}
          <motion.div 
            className="flex justify-center gap-6 my-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {socialIcons.map(({ icon: Icon, label, color }, index) => (
              <motion.div 
                key={label} 
                className={`flex items-center justify-center w-16 h-16 rounded-2xl ${color} bg-white/20 shadow-lg backdrop-blur-sm border border-white/20`}
                whileHover={{ scale: 1.1, rotateZ: 10 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              >
                <Icon className="h-8 w-8 text-white drop-shadow-lg" />
              </motion.div>
            ))}
          </motion.div>

          {/* ميزات صغيرة/مربعات مميزة */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8 mt-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {features.map((feat, idx) => (
              <motion.div 
                key={idx} 
                className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-5 py-3 shadow-lg min-w-[190px] border border-white/20"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <feat.icon className="h-5 w-5 text-yellow-300 mr-2" />
                <div>
                  <div className="text-white font-semibold">{feat.title}</div>
                  <div className="text-white/70 text-xs text-right">{feat.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* إحصائيات سريعة وأرقام محفزة */}
          <motion.div 
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
