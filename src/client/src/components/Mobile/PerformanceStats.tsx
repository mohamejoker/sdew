
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const PerformanceStats = () => {
  const stats = [
    { value: '< 2s', label: 'وقت التحميل', color: 'text-blue-600' },
    { value: '99%', label: 'معدل الاستجابة', color: 'text-green-600' },
    { value: '24/7', label: 'متاح دائماً', color: 'text-purple-600' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6 text-center">
            <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
            <p className="text-gray-600">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PerformanceStats;
