
import React from 'react';
import ServicesGrid from '@/components/Services/ServicesGrid';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Shield, Clock, Headphones } from 'lucide-react';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            خدماتنا المتميزة
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            اكتشف مجموعة واسعة من الخدمات المصممة خصيصاً لنمو حضورك الرقمي
          </p>
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <span className="text-sm font-medium">أكثر من 1000+ عميل راضي</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-green-400 to-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">آمان مضمون</h3>
                <p className="text-sm text-gray-600">جميع خدماتنا آمنة وموثوقة</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">تسليم سريع</h3>
                <p className="text-sm text-gray-600">نتائج فورية خلال دقائق</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-purple-400 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">جودة عالية</h3>
                <p className="text-sm text-gray-600">خدمات بأعلى معايير الجودة</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-orange-400 to-orange-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headphones className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">دعم 24/7</h3>
                <p className="text-sm text-gray-600">فريق دعم متواجد دائماً</p>
              </CardContent>
            </Card>
          </div>

          {/* Services Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                اختر الخدمة المناسبة لك
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                مجموعة متنوعة من الخدمات المصممة لتلبية احتياجاتك وتحقيق أهدافك الرقمية
              </p>
            </div>
            
            <ServicesGrid />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
