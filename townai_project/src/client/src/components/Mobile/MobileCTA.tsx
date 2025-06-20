
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain } from 'lucide-react';

const MobileCTA = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <CardContent className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">جرب التطبيق الآن</h2>
        <p className="text-blue-100 mb-6">
          استمتع بجميع المميزات المتاحة مجاناً
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => window.location.href = '/register'}
          >
            إنشاء حساب جديد
            <ArrowRight className="h-4 w-4 mr-2" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-blue-600"
            onClick={() => window.location.href = '/ai-chat'}
          >
            تجربة الذكاء الاصطناعي
            <Brain className="h-4 w-4 mr-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileCTA;
