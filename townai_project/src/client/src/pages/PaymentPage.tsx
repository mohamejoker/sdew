
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard } from 'lucide-react';
import EgyptianPaymentSimulator from '@/components/Payment/EgyptianPaymentSimulator';

const PaymentPage = () => {
  const [amount, setAmount] = useState(100);
  const [showPayment, setShowPayment] = useState(false);

  const handlePaymentSuccess = (transactionData: any) => {
    console.log('Payment successful:', transactionData);
    // هنا يمكن إضافة منطق معالجة الدفع الناجح
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    // هنا يمكن إضافة منطق معالجة أخطاء الدفع
  };

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setShowPayment(false)}
              className="flex items-center gap-2"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              العودة
            </Button>
          </div>
          
          <EgyptianPaymentSimulator
            amount={amount}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">نظام الدفع الإلكتروني المصري</h1>
          <p className="text-gray-600">تجربة محاكاة كاملة لجميع طرق الدفع المصرية</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              تجربة نظام الدفع
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">المبلغ (ج.م)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full p-3 border rounded-lg text-center text-xl font-bold"
                min="1"
                max="10000"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>✅ فودافون كاش</div>
              <div>✅ اتصالات كاش</div>
              <div>✅ أورانج موني</div>
              <div>✅ WE Pay</div>
              <div>✅ فوري</div>
              <div>✅ بطاقات ائتمان</div>
            </div>

            <Button 
              onClick={() => setShowPayment(true)}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-lg py-6"
              disabled={amount < 1}
            >
              بدء عملية الدفع
              <ArrowRight className="mr-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentPage;
