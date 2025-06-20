
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const SimplifiedHeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="absolute inset-0 bg-black/5"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
          <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
            متابعين حقيقيين
          </span>
          <br />
          <span className="text-white">بضمان 100%</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
          زيادة المتابعين والتفاعل لجميع المنصات خلال 24 ساعة
        </p>

        {/* Single CTA Button */}
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-12 py-6 text-2xl rounded-full shadow-2xl transform hover:scale-105 transition-all"
        >
          <MessageSquare className="h-6 w-6 mr-3" />
          تواصل معنا عبر الواتساب
        </Button>
      </div>
    </section>
  );
};

export default SimplifiedHeroSection;
