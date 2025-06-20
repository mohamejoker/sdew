
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, DollarSign, TrendingUp, Calendar } from 'lucide-react';

const PaymentsPage = () => {
  const payments = [
    {
      id: 1,
      amount: 299,
      customer: 'أحمد محمد',
      service: 'إدارة وسائل التواصل',
      status: 'مكتمل',
      date: '2024-01-15'
    },
    {
      id: 2,
      amount: 499,
      customer: 'سارة أحمد',
      service: 'تصميم الهوية البصرية',
      status: 'معلق',
      date: '2024-01-14'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">لوحة المدفوعات</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47,250 ر.س</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المدفوعات اليوم</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847 ر.س</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المعاملات المعلقة</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">نمو الإيرادات</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+15%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>المعاملات الأخيرة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{payment.customer}</p>
                  <p className="text-sm text-gray-600">{payment.service}</p>
                </div>
                <div className="text-left">
                  <p className="font-bold">{payment.amount} ر.س</p>
                  <Badge variant={payment.status === 'مكتمل' ? 'default' : 'secondary'}>
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsPage;
