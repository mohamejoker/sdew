
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap } from 'lucide-react';
import { RealTimeMetrics } from '@/services/dashboard/realTimeDataService';

interface PerformanceMetricsProps {
  metrics: RealTimeMetrics | null;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics }) => (
  <Card className="lg:col-span-2">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-orange-500" />
        مقاييس الأداء الفورية
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">وقت الاستجابة</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-blue-600">{metrics?.responseTime || 0}ms</span>
            <Badge className="bg-green-100 text-green-800">ممتاز</Badge>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">معدل الأخطاء</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-green-600">{metrics?.errorRate?.toFixed(2) || 0}%</span>
            <Badge className="bg-green-100 text-green-800">منخفض</Badge>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">الطلبات الحالية</span>
          <span className="font-bold text-purple-600">
            {Math.floor((metrics?.activeUsers || 0) * 0.1).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">معدل التحويل</span>
          <span className="font-bold text-orange-600">12.5%</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default PerformanceMetrics;
