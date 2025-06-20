
import React from 'react';
import { ArrowLeft, CheckCircle, Star, Users, Bot, TrendingUp, Instagram, Youtube, Facebook, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  const features = [
    'متابعين حقيقيين 100%',
    'وكيل ذكاء اصطناعي',
    'تنفيذ سريع',
    'دعم فني 24/7'
  ];

  const platforms = [
    { name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600' },
    { name: 'TikTok', icon: Play, color: 'from-black to-red-500' },
    { name: 'Facebook', icon: Facebook, color: 'from-blue-500 to-blue-700' },
    { name: 'YouTube', icon: Youtube, color: 'from-red-500 to-red-700' }
  ];

  const stats = [
    { icon: Users, value: '250K+', label: 'عميل راضي' },
    { icon: Bot, value: 'AI', label: 'وكيل ذكي' },
    { icon: TrendingUp, value: '99%', label: 'معدل النجاح' }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* AI Badge */}
        <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-green-500/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-green-400/30">
          <Bot className="h-5 w-5 text-green-300" />
          <span className="text-white font-semibold">🤖 وكيل ذكاء اصطناعي</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
          <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
            متابعين حقيقيين
          </span>
          <br />
          <span className="text-3xl md:text-4xl">لجميع المنصات 💯</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
          <span className="text-green-300">📱 زيادة المتابعين والتفاعل</span>
          <br />
          <span className="text-blue-200">⚡ تنفيذ سريع وآمن</span>
        </p>

        {/* Platforms */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
          {platforms.map((platform, index) => {
            const IconComponent = platform.icon;
            return (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className={`w-12 h-12 bg-gradient-to-br ${platform.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <span className="text-white/80 text-sm font-medium">{platform.name}</span>
              </div>
            );
          })}
        </div>

        {/* Features */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-white text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-8 py-3 text-lg rounded-full shadow-xl"
          >
            🚀 ابدأ الآن
            <ArrowLeft className="h-5 w-5 mr-2" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg rounded-full backdrop-blur-sm"
          >
            🤖 تحدث مع الوكيل الذكي
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-3">
                  <IconComponent className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
