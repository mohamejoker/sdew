
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CreditCard, CheckCircle, XCircle, RefreshCw, Shield, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface CardPaymentSimulatorProps {
  amount: number;
  onSuccess: (transactionData: any) => void;
  onError: (error: string) => void;
}

const CardPaymentSimulator: React.FC<CardPaymentSimulatorProps> = ({
  amount,
  onSuccess,
  onError
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'form' | 'processing' | 'success' | 'error'>('form');
  const [cardType, setCardType] = useState<'visa' | 'mastercard' | 'unknown'>('unknown');

  const cardFee = (amount * 2.9) / 100; // رسوم 2.9%
  const totalAmount = amount + cardFee;

  // كشف نوع البطاقة
  const detectCardType = (number: string) => {
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5')) return 'mastercard';
    return 'unknown';
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
    setCardType(detectCardType(formatted.replace(/\s/g, '')));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
  };

  const handleSubmit = async () => {
    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      toast.error('يرجى ملء جميع الحقول');
      return;
    }

    if (cardNumber.replace(/\s/g, '').length < 16) {
      toast.error('رقم البطاقة غير صحيح');
      return;
    }

    if (cvv.length < 3) {
      toast.error('رمز الأمان غير صحيح');
      return;
    }

    setIsProcessing(true);
    setStep('processing');

    // محاكاة معالجة الدفع
    setTimeout(() => {
      const successRate = cardType === 'visa' ? 95 : cardType === 'mastercard' ? 93 : 85;
      const isSuccess = Math.random() * 100 < successRate;

      if (isSuccess) {
        setStep('success');
        onSuccess({
          transaction_id: `CARD_${Date.now()}`,
          provider: 'PayMob',
          card_type: cardType,
          card_last_four: cardNumber.slice(-4),
          cardholder_name: cardholderName,
          amount: amount,
          fees: cardFee,
          total: totalAmount
        });
        toast.success('تم الدفع بالبطاقة بنجاح!');
      } else {
        setStep('error');
        onError('فشل في الدفع - تحقق من بيانات البطاقة أو الرصيد');
      }
      setIsProcessing(false);
    }, 3000);
  };

  const resetForm = () => {
    setStep('form');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setCardholderName('');
    setCardType('unknown');
  };

  if (step === 'processing') {
    return (
      <div className="text-center py-8">
        <div className="relative">
          <CreditCard className="h-16 w-16 mx-auto mb-4 text-blue-600" />
          <RefreshCw className="h-6 w-6 animate-spin absolute top-5 right-1/2 translate-x-1/2 text-white" />
        </div>
        <h3 className="text-lg font-semibold mb-2">جاري معالجة الدفع...</h3>
        <p className="text-gray-600">يرجى عدم إغلاق هذه الصفحة</p>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Shield className="h-4 w-4" />
          <span>اتصال آمن ومشفر</span>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-600" />
        <h3 className="text-lg font-semibold text-green-600 mb-2">تم الدفع بنجاح!</h3>
        <p className="text-gray-600 mb-4">
          تم خصم {totalAmount.toFixed(2)} ج.م من البطاقة المنتهية بـ {cardNumber.slice(-4)}
        </p>
        <Button onClick={resetForm} variant="outline">
          عملية جديدة
        </Button>
      </div>
    );
  }

  if (step === 'error') {
    return (
      <div className="text-center py-8">
        <XCircle className="h-16 w-16 mx-auto mb-4 text-red-600" />
        <h3 className="text-lg font-semibold text-red-600 mb-2">فشل في الدفع</h3>
        <p className="text-gray-600 mb-4">تحقق من بيانات البطاقة أو الرصيد المتاح</p>
        <Button onClick={resetForm} variant="outline">
          إعادة المحاولة
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* معلومات الأمان */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="text-sm">جميع بياناتك محمية بتشفير SSL 256-bit</span>
          </div>
        </AlertDescription>
      </Alert>

      {/* تفاصيل المبلغ */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>مبلغ الطلب:</span>
            <span className="font-semibold">{amount.toFixed(2)} ج.م</span>
          </div>
          <div className="flex justify-between">
            <span>رسوم المعالجة (2.9%):</span>
            <span className="font-semibold">{cardFee.toFixed(2)} ج.م</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="font-bold">إجمالي المبلغ:</span>
            <span className="font-bold text-blue-600">{totalAmount.toFixed(2)} ج.م</span>
          </div>
        </div>
      </div>

      {/* نموذج البطاقة */}
      <div className="space-y-4">
        {/* رقم البطاقة */}
        <div>
          <Label htmlFor="cardNumber">رقم البطاقة</Label>
          <div className="relative">
            <Input
              id="cardNumber"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="pl-12"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {cardType === 'visa' && <span className="text-blue-600 font-bold text-xs">VISA</span>}
              {cardType === 'mastercard' && <span className="text-red-600 font-bold text-xs">MC</span>}
              {cardType === 'unknown' && <CreditCard className="h-4 w-4 text-gray-400" />}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* تاريخ الانتهاء */}
          <div>
            <Label htmlFor="expiry">تاريخ الانتهاء</Label>
            <Input
              id="expiry"
              value={expiryDate}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              maxLength={5}
            />
          </div>

          {/* رمز الأمان */}
          <div>
            <Label htmlFor="cvv">رمز الأمان (CVV)</Label>
            <Input
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
              placeholder="123"
              maxLength={4}
              type="password"
            />
          </div>
        </div>

        {/* اسم حامل البطاقة */}
        <div>
          <Label htmlFor="cardholderName">اسم حامل البطاقة</Label>
          <Input
            id="cardholderName"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="الاسم كما هو مكتوب على البطاقة"
          />
        </div>
      </div>

      {/* أنواع البطاقات المقبولة */}
      <div className="flex items-center justify-center gap-4 p-4 bg-gray-50 rounded-lg">
        <span className="text-sm text-gray-600">نقبل:</span>
        <div className="flex gap-2">
          <div className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded">VISA</div>
          <div className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">MC</div>
          <div className="px-2 py-1 bg-green-600 text-white text-xs font-bold rounded">MEEZA</div>
        </div>
      </div>

      <Button 
        onClick={handleSubmit}
        disabled={isProcessing || !cardNumber || !expiryDate || !cvv || !cardholderName}
        className="w-full bg-purple-600 hover:bg-purple-700"
      >
        {isProcessing ? (
          <>
            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
            جاري المعالجة...
          </>
        ) : (
          <>
            <CreditCard className="h-4 w-4 mr-2" />
            دفع {totalAmount.toFixed(2)} ج.م
          </>
        )}
      </Button>
    </div>
  );
};

export default CardPaymentSimulator;
