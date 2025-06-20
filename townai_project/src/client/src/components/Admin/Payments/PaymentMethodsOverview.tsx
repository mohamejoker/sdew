
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const PaymentMethodsOverview = () => {
  const stats = [
    {
      title: 'طرق الدفع المفعلة',
      value: '8',
      change: '+2 هذا الشهر',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'إجمالي المعاملات',
      value: '1,234',
      change: '+15% من الشهر الماضي',
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      title: 'متوسط الرسوم',
      value: '2.5%',
      change: 'ثابت',
      icon: CreditCard,
      color: 'text-purple-600'
    },
    {
      title: 'المعاملات المعلقة',
      value: '12',
      change: 'تحتاج مراجعة',
      icon: AlertCircle,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <IconComponent className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>نظرة عامة على طرق الدفع</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              <p>يمكنك إدارة طرق الدفع المختلفة من الألسنة أعلاه:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>طرق الدفع العامة:</strong> بطاقات الائتمان، PayPal، Stripe وغيرها</li>
                <li><strong>طرق الدفع المصرية:</strong> فودافون كاش، أورانج موني، إتصالات كاش وغيرها</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethodsOverview;
