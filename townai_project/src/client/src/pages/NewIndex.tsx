import React from 'react';
import Navbar from '@/components/Frontend/Navbar';
import Footer from '@/components/Frontend/Footer';
import HeroSection from '@/components/Frontend/HeroSection';
import ServicesIconsSection from '@/components/Frontend/ServicesIconsSection';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUIControl } from '@/contexts/UIControlContext';
import { ArrowLeft, ArrowRight, CheckCircle, ChevronLeft, ChevronRight, Globe, Sparkles, Star, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const NewIndex = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();
  const { theme } = useUIControl();
  
  const isRTL = language === 'ar';
  
  const features = [
    {
      title: 'تحليلات متقدمة',
      description: 'تحليل شامل لأداء حساباتك على وسائل التواصل الاجتماعي',
      icon: <Sparkles className="h-6 w-6 text-blue-500" />
    },
    {
      title: 'إدارة متكاملة',
      description: 'منصة موحدة لإدارة جميع حساباتك الاجتماعية',
      icon: <Users className="h-6 w-6 text-purple-500" />
    },
    {
      title: 'دعم عالمي',
      description: 'دعم لأكثر من 10 منصات تواصل اجتماعي عالمية',
      icon: <Globe className="h-6 w-6 text-green-500" />
    }
  ];
  
  const testimonials = [
    {
      name: 'أحمد محمد',
      role: 'مدير تسويق',
      content: 'ساعدتنا المنصة على زيادة التفاعل بنسبة 200% خلال شهرين فقط!',
      rating: 5
    },
    {
      name: 'سارة أحمد',
      role: 'مؤثرة رقمية',
      content: 'أفضل منصة استخدمتها لإدارة حساباتي على السوشيال ميديا',
      rating: 5
    },
    {
      name: 'خالد العتيبي',
      role: 'صاحب متجر إلكتروني',
      content: 'سهلة الاستخدام وفعالة جدًا في زيادة المبيعات عبر منصات التواصل',
      rating: 4
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        {/* قسم الأيقونات والخدمات الجديد */}
        <ServicesIconsSection />
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">مميزات المنصة</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                نقدم لك مجموعة متكاملة من الأدوات لتحسين تواجدك على وسائل التواصل الاجتماعي
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  variants={itemVariants}
                >
                  <div className="mb-4 p-3 inline-block bg-blue-50 rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">ماذا يقول عملاؤنا</h2>
            
            <div className="relative">
              <Tabs defaultValue="testimonial-0" className="w-full">
                <TabsList className="flex justify-center mb-8">
                  {testimonials.map((_, index) => (
                    <TabsTrigger 
                      key={index} 
                      value={`testimonial-${index}`}
                      className="rounded-full w-3 h-3 mx-1 p-0"
                    />
                  ))}
                </TabsList>
                
                {testimonials.map((testimonial, index) => (
                  <TabsContent key={index} value={`testimonial-${index}`}>
                    <Card className="border-0 shadow-lg max-w-3xl mx-auto">
                      <CardContent className="p-8">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div className="mr-4">
                            <h4 className="font-bold">{testimonial.name}</h4>
                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                          </div>
                          <div className="mr-auto flex">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 text-lg italic">"{testimonial.content}"</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
                
                <div className="flex justify-center mt-6">
                  <Button variant="outline" size="icon" className="rounded-full mr-2">
                    {isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    {isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                </div>
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">ابدأ رحلتك مع منصتنا اليوم</h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/80">
              انضم إلى آلاف المستخدمين الذين يعتمدون على منصتنا لتحسين تواجدهم على وسائل التواصل الاجتماعي
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => navigate('/register')}
              >
                سجل الآن مجانًا
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate('/services')}
              >
                استكشف خدماتنا
                {isRTL ? <ArrowLeft className="mr-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-300" />
                <span>بدء مجاني</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-300" />
                <span>دعم على مدار الساعة</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-300" />
                <span>إلغاء في أي وقت</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Platforms Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-12">نتكامل مع جميع منصات التواصل الاجتماعي الرائدة</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'tiktok'].map((platform) => (
                <div key={platform} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mb-2">
                    <img 
                      src={`/icons/${platform}.svg`} 
                      alt={platform} 
                      className="w-8 h-8"
                      onError={(e) => {
                        e.currentTarget.src = '/icons/placeholder.svg';
                      }}
                    />
                  </div>
                  <span className="text-sm capitalize">{platform}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">+10K</div>
                <div className="text-gray-600">مستخدم نشط</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">+50M</div>
                <div className="text-gray-600">تفاعل شهري</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">+200%</div>
                <div className="text-gray-600">زيادة في المبيعات</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600">دعم فني</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="py-12">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">عرض خاص</Badge>
            <h2 className="text-3xl font-bold mb-6">احصل على خصم 20% عند التسجيل اليوم</h2>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              onClick={() => navigate('/register')}
            >
              ابدأ الآن
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewIndex;
