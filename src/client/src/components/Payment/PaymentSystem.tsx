
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, Smartphone, Gift, Receipt, Shield,
  CheckCircle, AlertCircle, Clock, DollarSign,
  Zap, Star, Lock, Wallet, QrCode
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'wallet' | 'bank';
  icon: React.ElementType;
  fees: number;
  processingTime: string;
  isAvailable: boolean;
}

interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minAmount: number;
  expiresAt: Date;
  isActive: boolean;
}

const PaymentSystem = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [amount, setAmount] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'visa',
      name: 'فيزا/ماستركارد',
      type: 'card',
      icon: CreditCard,
      fees: 2.9,
      processingTime: 'فوري',
      isAvailable: true
    },
    {
      id: 'vodafone',
      name: 'فودافون كاش',
      type: 'wallet',
      icon: Smartphone,
      fees: 1.5,
      processingTime: 'خلال دقائق',
      isAvailable: true
    },
    {
      id: 'orange',
      name: 'أورانج موني',
      type: 'wallet',
      icon: Wallet,
      fees: 1.5,
      processingTime: 'خلال دقائق',
      isAvailable: true
    },
    {
      id: 'instapay',
      name: 'InstaPay',
      type: 'bank',
      icon: QrCode,
      fees: 0,
      processingTime: 'فوري',
      isAvailable: true
    }
  ];

  const availableCoupons: Coupon[] = [
    {
      code: 'WELCOME20',
      discount: 20,
      type: 'percentage',
      minAmount: 50,
      expiresAt: new Date('2024-12-31'),
      isActive: true
    },
    {
      code: 'SAVE50',
      discount: 50,
      type: 'fixed',
      minAmount: 200,
      expiresAt: new Date('2024-12-31'),
      isActive: true
    },
    {
      code: 'NEWUSER',
      discount: 15,
      type: 'percentage',
      minAmount: 100,
      expiresAt: new Date('2024-12-31'),
      isActive: true
    }
  ];

  const applyCoupon = () => {
    const coupon = availableCoupons.find(c => 
      c.code.toLowerCase() === couponCode.toLowerCase() && 
      c.isActive && 
      amount >= c.minAmount
    );

    if (coupon) {
      setAppliedCoupon(coupon);
      toast({
        title: "تم تطبيق الكوبون!",
        description: `تم خصم ${coupon.type === 'percentage' ? coupon.discount + '%' : coupon.discount + ' ريال'}`,
      });
    } else {
      toast({
        title: "كوبون غير صالح",
        description: "تأكد من صحة الكود أو الحد الأدنى للمبلغ",
        variant: "destructive"
      });
    }
  };

  const calculateTotal = () => {
    let total = amount;
    let discount = 0;

    if (appliedCoupon) {
      if (appliedCoupon.type === 'percentage') {
        discount = (amount * appliedCoupon.discount) / 100;
      } else {
        discount = appliedCoupon.discount;
      }
    }

    const subtotal = total - discount;
    const selectedPaymentMethod = paymentMethods.find(m => m.id === selectedMethod);
    const fees = selectedPaymentMethod ? (subtotal * selectedPaymentMethod.fees) / 100 : 0;
    
    return {
      original: total,
      discount,
      subtotal,
      fees,
      final: subtotal + fees
    };
  };

  const processPayment = async () => {
    if (!selectedMethod) {
      toast({
        title: "اختر طريقة الدفع",
        description: "يرجى اختيار طريقة دفع للمتابعة",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // محاكاة معالجة الدفع
    await new Promise(resolve => setTimeout(resolve, 3000));

    const totals = calculateTotal();
    
    toast({
      title: "تم الدفع بنجاح!",
      description: `تم دفع ${totals.final.toFixed(2)} ريال بنجاح`,
    });

    setIsProcessing(false);
  };

  const totals = calculateTotal();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">نظام الدفع المتكامل</h2>
        <p className="text-gray-600">اختر طريقة الدفع المناسبة لك واستمتع بخصومات حصرية</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Methods */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                طرق الدفع المتاحة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${!method.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <method.icon className={`h-6 w-6 ${
                          selectedMethod === method.id ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                        <span className="font-medium">{method.name}</span>
                      </div>
                      {selectedMethod === method.id && (
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>رسوم:</span>
                        <span>{method.fees}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>المعالجة:</span>
                        <span>{method.processingTime}</span>
                      </div>
                    </div>
                    
                    {!method.isAvailable && (
                      <Badge variant="secondary" className="mt-2">
                        غير متاح حالياً
                      </Badge>
                    )}
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Gift className="h-4 w-4 text-green-600" />
                  كود الخصم
                </h4>
                <div className="flex gap-2">
                  <Input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="أدخل كود الخصم"
                    className="flex-1"
                  />
                  <Button onClick={applyCoupon} variant="outline">
                    تطبيق
                  </Button>
                </div>
                
                {appliedCoupon && (
                  <div className="mt-3 p-2 bg-green-100 rounded-md flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-800">
                      تم تطبيق كوبون "{appliedCoupon.code}" - خصم {appliedCoupon.type === 'percentage' ? appliedCoupon.discount + '%' : appliedCoupon.discount + ' ريال'}
                    </span>
                  </div>
                )}

                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-2">كوبونات متاحة:</h5>
                  <div className="flex flex-wrap gap-2">
                    {availableCoupons.map((coupon) => (
                      <Badge
                        key={coupon.code}
                        variant="outline"
                        className="cursor-pointer hover:bg-gray-100"
                        onClick={() => setCouponCode(coupon.code)}
                      >
                        {coupon.code} - {coupon.type === 'percentage' ? coupon.discount + '%' : coupon.discount + ' ريال'}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                ملخص الطلب
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">المبلغ الأساسي</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="mt-1"
                />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>المبلغ الأصلي:</span>
                  <span>{totals.original.toFixed(2)} ريال</span>
                </div>
                
                {totals.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>الخصم:</span>
                    <span>-{totals.discount.toFixed(2)} ريال</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>المبلغ بعد الخصم:</span>
                  <span>{totals.subtotal.toFixed(2)} ريال</span>
                </div>
                
                {totals.fees > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>رسوم المعالجة:</span>
                    <span>+{totals.fees.toFixed(2)} ريال</span>
                  </div>
                )}
                
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>المجموع النهائي:</span>
                  <span>{totals.final.toFixed(2)} ريال</span>
                </div>
              </div>

              <Button
                onClick={processPayment}
                disabled={isProcessing || !selectedMethod}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    جاري المعالجة...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    دفع آمن - {totals.final.toFixed(2)} ريال
                  </div>
                )}
              </Button>

              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  آمن ومشفر
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  دفع فوري
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  موثوق
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentSystem;
