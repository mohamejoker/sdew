
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Zap, Star, Clock, TrendingUp, Users, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PromotionalBannerProps {
  onClose?: () => void;
  initialTimeInMinutes?: number;
}

const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ 
  onClose, 
  initialTimeInMinutes = 30 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(initialTimeInMinutes * 60); // Convert to seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsVisible(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4"
      >
        <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          
          <CardContent className="p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              {/* Content Section */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-2">
                    <Zap className="h-6 w-6 text-yellow-300" />
                  </div>
                  <Badge className="bg-yellow-400 text-black font-bold px-3 py-1 text-sm">
                    🔥 عرض محدود الوقت
                  </Badge>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
                    بديل أفضل للإعلانات المدفوعة!
                  </h2>
                  <p className="text-lg text-white/90 mb-4">
                    احصل على نتائج مضمونة بتكلفة أقل من الإعلانات التقليدية
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-300" />
                    <span>نمو 300% أسرع</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-300" />
                    <span>متابعين حقيقيين</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-purple-300" />
                    <span>ضمان 100%</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-6"
                  >
                    ابدأ الآن - خصم 50%
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10 font-medium"
                  >
                    تعرف على المزيد
                  </Button>
                </div>
              </div>

              {/* Timer Section */}
              <div className="text-center space-y-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Clock className="h-5 w-5 text-yellow-300" />
                    <span className="text-sm font-medium">ينتهي العرض خلال</span>
                  </div>
                  
                  <motion.div
                    className="text-4xl font-bold text-yellow-300 mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {formatTime(timeLeft)}
                  </motion.div>
                  
                  <div className="text-sm text-white/80">
                    دقيقة:ثانية
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>بدلاً من</span>
                      <span className="line-through text-red-300">500 ريال</span>
                    </div>
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>السعر الآن</span>
                      <span className="text-yellow-300">250 ريال</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-300 fill-current" />
                  ))}
                  <span className="text-sm mr-2">4.9/5 من 2,500+ عميل</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs mb-2">
                <span>العرض متاح</span>
                <span>محدود الكمية</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
                  initial={{ width: '100%' }}
                  animate={{ width: `${(timeLeft / (initialTimeInMinutes * 60)) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default PromotionalBanner;
