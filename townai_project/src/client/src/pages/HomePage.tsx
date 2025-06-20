
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Settings, 
  Users, 
  BarChart3,
  Shield,
  Zap,
  ArrowLeft,
  Star,
  CheckCircle,
  TrendingUp,
  Brain,
  MessageSquare,
  Globe
} from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: CreditCard,
      title: 'نظام الدفع المتقدم',
      description: 'دعم جميع طرق الدفع الإلكترونية المصرية مع محاكاة تفاعلية كاملة',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Users,
      title: 'إدارة المستخدمين',
      description: 'نظام متقدم لإدارة المستخدمين والصلاحيات مع أدوات مراقبة شاملة',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: BarChart3,
      title: 'التحليلات المتقدمة',
      description: 'تقارير تفصيلية وإحصائيات في الوقت الفعلي لجميع العمليات',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Shield,
      title: 'الأمان المتقدم',
      description: 'حماية متعددة الطبقات مع مراقبة الأمان والتحكم في الوصول',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: Zap,
      title: 'الأداء العالي',
      description: 'تحسين مستمر للأداء مع أدوات مراقبة النظام والصيانة التلقائية',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Settings,
      title: 'التحكم الكامل',
      description: 'إعدادات مرنة وقابلة للتخصيص لتناسب احتياجات عملك',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  ];

  const stats = [
    { label: 'عميل راضي', value: '250,000+', icon: Users },
    { label: 'خدمة متنوعة', value: '100+', icon: Globe },
    { label: 'معدل الرضا', value: '99%', icon: Star },
    { label: 'دعم متواصل', value: '24/7', icon: MessageSquare }
  ];

  const quickActions = [
    {
      title: 'الخدمات المتاحة',
      description: 'تصفح جميع الخدمات والباقات',
      icon: Globe,
      link: '/services',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'لوحة التحكم',
      description: 'الوصول إلى لوحة التحكم الإدارية',
      icon: BarChart3,
      link: '/admin',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      title: 'الذكاء الاصطناعي',
      description: 'تجربة الوكيل الذكي المتطور',
      icon: Brain,
      link: '/ai-chat',
      color: 'bg-green-600 hover:bg-green-700'
    }
  ];

  const testimonials = [
    {
      name: 'أحمد محمد',
      role: 'مدير تسويق',
      content: 'نظام رائع ساعدني في زيادة متابعيني بشكل كبير',
      rating: 5
    },
    {
      name: 'فاطمة أحمد',
      role: 'صاحبة متجر إلكتروني',
      content: 'خدمة عملاء ممتازة ونتائج مضمونة',
      rating: 5
    },
    {
      name: 'محمد علي',
      role: 'مؤثر على وسائل التواصل',
      content: 'أفضل منصة جربتها حتى الآن',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
            <Brain className="h-4 w-4 mr-1" />
            مدعوم بالذكاء الاصطناعي
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            نظام إدارة المدفوعات المتقدم
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            منصة شاملة لإدارة المدفوعات الإلكترونية والمحافظ الرقمية مع وكيل ذكاء اصطناعي متطور
          </p>
          
          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Link key={index} to={action.link}>
                  <Button size="lg" className={`${action.color} text-white px-8 py-3`}>
                    <IconComponent className="h-5 w-5 mr-2" />
                    {action.title}
                    <ArrowLeft className="h-4 w-4 mr-2" />
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-4">
                    <IconComponent className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            ميزات النظام
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${feature.bgColor}`}>
                        <IconComponent className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            آراء العملاء
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">ابدأ رحلتك معنا اليوم</h2>
          <p className="text-blue-100 mb-6 text-lg">
            انضم إلى أكثر من 250,000 عميل راضي واكتشف قوة النظام المتقدم
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                <CheckCircle className="h-5 w-5 mr-2" />
                إنشاء حساب مجاني
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                <TrendingUp className="h-5 w-5 mr-2" />
                تصفح الخدمات
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
