
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Wallet, 
  CheckCircle, 
  XCircle, 
  Plus, 
  TrendingUp, 
  Gift,
  CreditCard
} from 'lucide-react';
import { toast } from 'sonner';

interface BalancePaymentSimulatorProps {
  amount: number;
  onSuccess: (transactionData: any) => void;
  onError: (error: string) => void;
}

const BalancePaymentSimulator: React.FC<BalancePaymentSimulatorProps> = ({
  amount,
  onSuccess,
  onError
}) => {
  const [currentBalance, setCurrentBalance] = useState(250.50); // رصيد تجريبي
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'check' | 'confirm' | 'success' | 'insufficient'>('check');
  const [transactionId, setTransactionId] = useState('');

  const canAfford = currentBalance >= amount;
  const remainingBalance = currentBalance - amount;
  const balancePercentage = (currentBalance / 500) * 100; // افتراض حد أقصى 500

  const rechargeOptions = [
    { amount: 50, bonus: 0, popular: false },
    { amount: 100, bonus: 5, popular: true },
    { amount: 200, bonus: 15, popular: false },
    { amount: 500, bonus: 50, popular: false }
  ];

  const handlePayment = () => {
    if (!canAfford) {
      setStep('insufficient');
      onError(`رصيدك الحالي ${currentBalance.toFixed(2)} ج.م غير كافي للدفع`);
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      const txId = `BALANCE_${Date.now()}`;
      setTransactionId(txId);
      setCurrentBalance(remainingBalance);
      setStep('success');
      setIsProcessing(false);
      
      onSuccess({
        transaction_id: txId,
        provider: 'الرصيد الداخلي',
        amount: amount,
        fees: 0,
        total: amount,
        previous_balance: currentBalance,
        new_balance: remainingBalance
      });
      
      toast.success(`تم خصم ${amount.toFixed(2)} ج.م من رصيدك`);
    }, 1500);
  };

  const handleRecharge = (rechargeAmount: number) => {
    toast.success(`تمت إضافة ${rechargeAmount} ج.م إلى رصيدك`);
    setCurrentBalance(prev => prev + rechargeAmount);
    setStep('check');
  };

  if (step === 'success') {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-600" />
        <h3 className="text-lg font-semibold text-green-600 mb-2">تم الدفع بنجاح!</h3>
        <div className="space-y-2 text-gray-600">
          <p>تم خصم {amount.toFixed(2)} ج.م من رصيدك</p>
          <p>رصيدك الجديد: {remainingBalance.toFixed(2)} ج.م</p>
          <p className="text-xs">رقم المعاملة: {transactionId}</p>
        </div>
        <Button 
          onClick={() => setStep('check')} 
          variant="outline"
          className="mt-4"
        >
          عملية جديدة
        </Button>
      </div>
    );
  }

  if (step === 'insufficient') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <XCircle className="h-16 w-16 mx-auto mb-4 text-red-600" />
          <h3 className="text-lg font-semibold text-red-600 mb-2">رصيد غير كافي</h3>
          <p className="text-gray-600">
            تحتاج إلى {(amount - currentBalance).toFixed(2)} ج.م إضافية لإتمام العملية
          </p>
        </div>

        {/* خيارات الشحن */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            شحن الرصيد
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {rechargeOptions.map((option, index) => (
              <Card 
                key={index}
                className={`cursor-pointer hover:shadow-md transition-shadow ${
                  option.popular ? 'border-green-500 bg-green-50' : ''
                }`}
                onClick={() => handleRecharge(option.amount + option.bonus)}
              >
                <CardContent className="p-4 text-center">
                  {option.popular && (
                    <Badge className="mb-2 bg-green-500">الأكثر شيوعاً</Badge>
                  )}
                  <div className="text-lg font-bold">{option.amount} ج.م</div>
                  {option.bonus > 0 && (
                    <div className="text-sm text-green-600">
                      + {option.bonus} ج.م مجاناً
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    المجموع: {option.amount + option.bonus} ج.م
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* طرق الشحن */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h5 className="font-medium mb-2">طرق شحن الرصيد:</h5>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>بطاقة ائتمان/خصم</span>
            </div>
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              <span>محافظ إلكترونية</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              <span>كوبونات شحن</span>
            </div>
          </div>
        </div>

        <Button 
          onClick={() => setStep('check')}
          variant="outline"
          className="w-full"
        >
          رجوع
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* عرض الرصيد الحالي */}
      <Card className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm opacity-90">رصيدك الحالي</div>
              <div className="text-3xl font-bold">{currentBalance.toFixed(2)} ج.م</div>
            </div>
            <Wallet className="h-8 w-8 opacity-75" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>مستوى الرصيد</span>
              <span>{balancePercentage.toFixed(0)}%</span>
            </div>
            <Progress value={balancePercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* تفاصيل العملية */}
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>مبلغ الطلب:</span>
              <span className="font-semibold">{amount.toFixed(2)} ج.م</span>
            </div>
            <div className="flex justify-between">
              <span>رسوم المعالجة:</span>
              <span className="font-semibold text-green-600">مجاني</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-bold">الإجمالي:</span>
              <span className="font-bold">{amount.toFixed(2)} ج.م</span>
            </div>
            <div className="flex justify-between">
              <span>الرصيد بعد الدفع:</span>
              <span className={`font-semibold ${canAfford ? 'text-green-600' : 'text-red-600'}`}>
                {canAfford ? remainingBalance.toFixed(2) : '---'} ج.م
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* تحذير الرصيد المنخفض */}
      {canAfford && remainingBalance < 50 && (
        <Alert>
          <TrendingUp className="h-4 w-4" />
          <AlertDescription>
            تحذير: رصيدك سيصبح منخفضاً بعد هذه العملية. فكر في شحن رصيدك قريباً.
          </AlertDescription>
        </Alert>
      )}

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-lg font-bold text-blue-600">15</div>
          <div className="text-xs text-gray-600">عملية هذا الشهر</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-lg font-bold text-green-600">500</div>
          <div className="text-xs text-gray-600">نقاط المكافآت</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <div className="text-lg font-bold text-purple-600">VIP</div>
          <div className="text-xs text-gray-600">مستوى العضوية</div>
        </div>
      </div>

      {canAfford ? (
        <Button 
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              جاري المعالجة...
            </>
          ) : (
            <>
              <Wallet className="h-4 w-4 mr-2" />
              دفع {amount.toFixed(2)} ج.م من الرصيد
            </>
          )}
        </Button>
      ) : (
        <Button 
          onClick={() => setStep('insufficient')}
          variant="destructive"
          className="w-full"
        >
          رصيد غير كافي - شحن الرصيد
        </Button>
      )}
    </div>
  );
};

export default BalancePaymentSimulator;
