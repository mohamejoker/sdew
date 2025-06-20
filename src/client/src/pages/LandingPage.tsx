
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/Common/Logo';
import { 
  Star, 
  Users, 
  Zap, 
  Shield, 
  TrendingUp, 
  Globe,
  CheckCircle,
  ArrowRight,
  Play,
  Award,
  Clock,
  Target,
  MessageSquare
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Zap,
      title: 'سرعة فائقة',
      description: 'تنفيذ الطلبات في ثوانٍ معدودة'
    },
    {
      icon: Shield,
      title: 'أمان مضمون',
      description: 'حماية كاملة لحسابك ومعلوماتك'
    },
    {
      icon: Users,
      title: 'دعم 24/7',
      description: 'فريق دعم متاح على مدار الساعة'
    },
    {
      icon: TrendingUp,
      title: 'نتائج مضمونة',
      description: 'زيادة حقيقية في المتابعين والتفاعل'
    }
  ];

  const stats = [
    { value: '+50M', label: 'متابع تم إضافتهم', icon: Users },
    { value: '+2M', label: 'طلب مكتمل', icon: CheckCircle },
    { value: '99.9%', label: 'معدل النجاح', icon: Target },
    { value: '24/7', label: 'دعم فوري', icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo size="sm" />

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-700">
                  تسجيل الدخول
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  إنشاء حساب
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 text-lg">
              🚀 منصة التسويق الرقمي #1 في المنطقة
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              نمو ذكي لوسائل التواصل الاجتماعي
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              خدمات احترافية لزيادة متابعيك وتفاعلك على جميع منصات التواصل الاجتماعي
              <br />
              بأفضل الأسعار وأعلى جودة في السوق
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 rounded-full shadow-lg"
                >
                  ابدأ الآن مجاناً
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-4 rounded-full border-2"
                >
                  <Play className="ml-2 h-5 w-5" />
                  استكشف الخدمات
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                <span>بدون كلمات مرور</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-blue-500 ml-2" />
                <span>آمن 100%</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 text-yellow-500 ml-2" />
                <span>ضمان الاسترداد</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-lg">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              لماذا تختار منصتنا؟
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نوفر لك أفضل الخدمات والأدوات لنمو حساباتك على وسائل التواصل الاجتماعي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full hover:shadow-xl transition-all duration-300 group border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-3 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">
              ابدأ رحلتك نحو النجاح اليوم
            </h2>
            <p className="text-xl mb-8 opacity-90">
              انضم إلى آلاف العملاء الذين حققوا نجاحاً باهراً مع خدماتنا
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full"
                >
                  ابدأ مجاناً الآن
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 rounded-full"
                >
                  استكشف الخدمات
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Logo variant="white" size="sm" />
            <div className="text-gray-400">
              © 2025 جميع الحقوق محفوظة
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
