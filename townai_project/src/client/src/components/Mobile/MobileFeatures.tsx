
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Zap, Shield, Bell } from 'lucide-react';

const MobileFeatures = () => {
  const features = [
    {
      icon: Brain,
      title: 'الذكاء الاصطناعي',
      description: 'محادثات ذكية ومساعدة فورية',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Zap,
      title: 'أداء سريع',
      description: 'تحميل فوري وتجربة سلسة',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'أمان متقدم',
      description: 'حماية قصوى لبياناتك',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Bell,
      title: 'إشعارات ذكية',
      description: 'تنبيهات مخصصة ومفيدة',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => {
        const IconComponent = feature.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                <IconComponent className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MobileFeatures;
