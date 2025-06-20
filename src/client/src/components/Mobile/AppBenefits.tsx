
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const AppBenefits = () => {
  const benefits = [
    'تثبيت سريع بدون متجر التطبيقات',
    'يعمل بدون اتصال إنترنت',
    'مساحة تخزين أقل من التطبيقات التقليدية',
    'تحديثات تلقائية',
    'واجهة محسّنة للهاتف المحمول',
    'دعم الإشعارات الفورية'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl">مميزات التطبيق المحمول</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppBenefits;
