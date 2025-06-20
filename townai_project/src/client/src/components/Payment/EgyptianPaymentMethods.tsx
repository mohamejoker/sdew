
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  CreditCard, 
  Banknote, 
  Gift, 
  Wallet,
  Building2,
  QrCode
} from 'lucide-react';
import EgyptianWalletPayment from './EgyptianWalletPayment';
import { useToast } from '@/hooks/use-toast';

interface EgyptianPaymentMethodsProps {
  amount: number;
  onSuccess: (transactionId: string, method: string) => void;
  onError: (error: string) => void;
}

const EgyptianPaymentMethods: React.FC<EgyptianPaymentMethodsProps> = ({
  amount,
  onSuccess,
  onError
}) => {
  const [selectedMethod, setSelectedMethod] = useState('wallet');
  const [couponCode, setCouponCode] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const { toast } = useToast();

  const paymentMethods = [
    {
      id: 'wallet',
      name: 'المحافظ الإلكترونية',
      icon: Smartphone,
      description: 'فودافون، اتصالات، أورانج، WE',
      fees: '2-2.5%',
      time: 'فوري',
      color: 'bg-blue-600'
    },
    {
      id: 'fawry',
      name: 'فوري',
      icon: Building2,
      description: 'دفع نقدي في فروع فوري',
      fees: '5 ج.م',
      time: 'فوري',
      color: 'bg-orange-600'
    },
    {
      id: 'paymob',
      name: 'PayMob',
      icon: CreditCard,
      description: 'بطاقات ائتمان وخصم',
      fees: '2.9%',
      time: 'فوري',
      color: 'bg-purple-600'
    },
    {
      id: 'bank',
      name: 'تحويل بنكي',
      icon: Banknote,
      description: 'تحويل من البنك مباشرة',
      fees: 'مجاني',
      time: '1-24 ساعة',
      color: 'bg-green-600'
    },
    {
      id: 'coupon',
      name: 'كوبون مدفوع',
      icon: Gift,
      description: 'كود كوبون مشترى مسبقاً',
      fees: 'مجاني',
      time: 'فوري',
      color: 'bg-pink-600'
    },
    {
      id: 'balance',
      name: 'الرصيد الداخلي',
      icon: Wallet,
      description: 'من رصيدك في الموقع',
      fees: 'مجاني',
      time: 'فوري',
      color: 'bg-indigo-600'
    }
  ];

  const handleFawryPayment = () => {
    const fawryCode = `FWR${Date.now()}`;
    toast({
      title: "كود فوري",
      description: `كود الدفع: ${fawryCode} - اذهب لأقرب فرع فوري وادفع المبلغ`,
    });
    onSuccess(fawryCode, 'فوري');
  };

  const handlePayMobPayment = () => {
    if (!cardNumber || cardNumber.length < 16) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رقم بطاقة صحيح",
        variant: "destructive"
      });
      return;
    }
    
    // محاكاة PayMob
    const transactionId = `PMB${Date.now()}`;
    const success = Math.random() > 0.15; // 85% success rate
    
    if (success) {
      onSuccess(transactionId, 'PayMob');
      toast({
        title: "تم الدفع",
        description: "تمت العملية بنجاح عبر PayMob",
      });
    } else {
      onError("فشل في الدفع - تحقق من بيانات البطاقة");
    }
  };

  const handleBankTransfer = () => {
    if (!bankAccount) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رقم الحساب",
        variant: "destructive"
      });
      return;
    }

    const transferId = `BANK${Date.now()}`;
    toast({
      title: "طلب تحويل",
      description: `تم إنشاء طلب التحويل رقم: ${transferId}`,
    });
    onSuccess(transferId, 'تحويل بنكي');
  };

  const handleCouponPayment = () => {
    if (!couponCode) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال كود الكوبون",
        variant: "destructive"
      });
      return;
    }

    // محاكاة التحقق من الكوبون
    const validCoupons = ['SAVE20', 'DISCOUNT50', 'WELCOME100'];
    if (validCoupons.includes(couponCode.toUpperCase())) {
      onSuccess(couponCode, 'كوبون');
      toast({
        title: "تم الدفع",
        description: "تم استخدام الكوبون بنجاح",
      });
    } else {
      onError("كود الكوبون غير صحيح أو منتهي الصلاحية");
    }
  };

  const handleBalancePayment = () => {
    // محاكاة رصيد المستخدم
    const userBalance = 150.00; // رصيد افتراضي
    
    if (userBalance >= amount) {
      const transactionId = `BAL${Date.now()}`;
      onSuccess(transactionId, 'الرصيد الداخلي');
      toast({
        title: "تم الدفع",
        description: `تم خصم ${amount} ج.م من رصيدك`,
      });
    } else {
      onError(`رصيدك الحالي ${userBalance} ج.م غير كافي للدفع`);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            طرق الدفع المصرية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedMethod} onValueChange={setSelectedMethod}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {paymentMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <TabsTrigger 
                    key={method.id} 
                    value={method.id}
                    className="flex flex-col gap-1 h-16"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="text-xs">{method.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <div className="mt-6">
              {paymentMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <TabsContent key={method.id} value={method.id}>
                    <Card>
                      <CardHeader>
                        <CardTitle className={`flex items-center gap-2 text-white p-4 rounded-lg ${method.color}`}>
                          <IconComponent className="h-6 w-6" />
                          <div className="flex-1">
                            <div>{method.name}</div>
                            <div className="text-sm opacity-90">{method.description}</div>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary" className="bg-white/20">
                              {method.fees}
                            </Badge>
                            <div className="text-xs opacity-75 mt-1">{method.time}</div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        {method.id === 'wallet' && (
                          <EgyptianWalletPayment 
                            amount={amount}
                            onSuccess={(txId) => onSuccess(txId, 'محفظة إلكترونية')}
                            onError={onError}
                          />
                        )}

                        {method.id === 'fawry' && (
                          <div className="space-y-4">
                            <div className="bg-orange-50 p-4 rounded-lg">
                              <h4 className="font-semibold mb-2">خطوات الدفع عبر فوري:</h4>
                              <ol className="list-decimal list-inside space-y-1 text-sm">
                                <li>اضغط على "إنشاء كود فوري"</li>
                                <li>اذهب لأقرب فرع أو ماكينة فوري</li>
                                <li>ادفع المبلغ باستخدام الكود</li>
                                <li>سيتم تفعيل طلبك تلقائياً</li>
                              </ol>
                            </div>
                            <Button onClick={handleFawryPayment} className="w-full bg-orange-600">
                              إنشاء كود فوري - {(amount + 5).toFixed(2)} ج.م
                            </Button>
                          </div>
                        )}

                        {method.id === 'paymob' && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="card">رقم البطاقة</Label>
                              <Input
                                id="card"
                                placeholder="1234 5678 9012 3456"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                maxLength={19}
                              />
                            </div>
                            <Button onClick={handlePayMobPayment} className="w-full bg-purple-600">
                              دفع بالبطاقة - {(amount + (amount * 0.029)).toFixed(2)} ج.م
                            </Button>
                          </div>
                        )}

                        {method.id === 'bank' && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="account">رقم الحساب البنكي</Label>
                              <Input
                                id="account"
                                placeholder="123456789012"
                                value={bankAccount}
                                onChange={(e) => setBankAccount(e.target.value)}
                              />
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg text-sm">
                              <p><strong>بيانات التحويل:</strong></p>
                              <p>البنك: البنك الأهلي المصري</p>
                              <p>رقم الحساب: 1234567890123456</p>
                              <p>اسم المستفيد: Town Media Group</p>
                            </div>
                            <Button onClick={handleBankTransfer} className="w-full bg-green-600">
                              إنشاء طلب تحويل - {amount.toFixed(2)} ج.م
                            </Button>
                          </div>
                        )}

                        {method.id === 'coupon' && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="coupon">كود الكوبون</Label>
                              <Input
                                id="coupon"
                                placeholder="أدخل كود الكوبون"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                              />
                            </div>
                            <div className="bg-pink-50 p-4 rounded-lg text-sm">
                              <p><strong>كوبونات تجريبية:</strong></p>
                              <p>SAVE20 - خصم 20 ج.م</p>
                              <p>DISCOUNT50 - خصم 50 ج.م</p>
                              <p>WELCOME100 - خصم 100 ج.م</p>
                            </div>
                            <Button onClick={handleCouponPayment} className="w-full bg-pink-600">
                              استخدام الكوبون
                            </Button>
                          </div>
                        )}

                        {method.id === 'balance' && (
                          <div className="space-y-4">
                            <div className="bg-indigo-50 p-4 rounded-lg">
                              <div className="flex justify-between items-center">
                                <span>رصيدك الحالي:</span>
                                <span className="font-bold text-indigo-600">150.00 ج.م</span>
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <span>المبلغ المطلوب:</span>
                                <span className="font-bold">{amount.toFixed(2)} ج.م</span>
                              </div>
                              <div className="flex justify-between items-center mt-2 pt-2 border-t">
                                <span>الرصيد بعد الدفع:</span>
                                <span className="font-bold text-green-600">
                                  {(150 - amount).toFixed(2)} ج.م
                                </span>
                              </div>
                            </div>
                            <Button 
                              onClick={handleBalancePayment} 
                              className="w-full bg-indigo-600"
                              disabled={amount > 150}
                            >
                              {amount > 150 ? 'رصيد غير كافي' : `دفع من الرصيد - ${amount.toFixed(2)} ج.م`}
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                );
              })}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EgyptianPaymentMethods;
