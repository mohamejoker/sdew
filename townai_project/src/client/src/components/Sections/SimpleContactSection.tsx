
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Phone } from 'lucide-react';

const SimpleContactSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
          تواصل معنا الآن
        </h2>
        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          فريقنا متاح 24/7 للإجابة على استفساراتك وتنفيذ طلبك فوراً
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">واتساب</h3>
              <p className="text-white/80 mb-6">
                تواصل معنا عبر الواتساب للحصول على رد فوري
              </p>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 text-lg">
                <MessageSquare className="h-5 w-5 mr-2" />
                فتح واتساب
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">اتصال مباشر</h3>
              <p className="text-white/80 mb-6">
                اتصل بنا مباشرة للحصول على استشارة مجانية
              </p>
              <Button 
                variant="outline" 
                className="w-full border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-3 text-lg"
              >
                <Phone className="h-5 w-5 mr-2" />
                اتصل الآن
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">
            🚀 احصل على عرض خاص اليوم!
          </h3>
          <p className="text-white/90 text-lg">
            خصم 20% على أول طلب + متابعين مجانيين
          </p>
        </div>
      </div>
    </section>
  );
};

export default SimpleContactSection;
