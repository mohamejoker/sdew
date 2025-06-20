
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Smartphone, 
  Wallet, 
  Settings, 
  Zap, 
  Clock,
  DollarSign,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { PaymentMethod, paymentService } from '@/services/payment/paymentService';
import VodafoneCashPayment from './VodafoneCashPayment';
import CryptoPayment from './CryptoPayment';
import { useToast } from '@/hooks/use-toast';

interface AdvancedPaymentSystemProps {
  amount: number;
  onPaymentSuccess: (transactionId: string, method: string) => void;
  onPaymentError: (error: string) => void;
}

const AdvancedPaymentSystem: React.FC<AdvancedPaymentSystemProps> = ({
  amount,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const methods = await paymentService.getPaymentMethods();
      setPaymentMethods(methods);
      
      // Add built-in methods for Vodafone Cash and Crypto
      const builtInMethods: PaymentMethod[] = [
        {
          id: 'vodafone-cash',
          name: 'فودافون كاش',
          type: 'wallet',
          icon: 'Smartphone',
          fees_percentage: 0.5,
          is_active: true,
          processing_time: 'فوري',
          config: { manual_mode: true, auto_mode: true },
          manual_mode: true,
          auto_mode: true
        },
        {
          id: 'crypto',
          name: 'العملات الرقمية',
          type: 'crypto',
          icon: 'Wallet',
          fees_percentage: 1.0,
          is_active: true,
          processing_time: '2-10 دقائق',
          config: { supported_coins: ['BTC', 'ETH', 'USDT', 'USDC'] }
        }
      ];
      
      setPaymentMethods([...builtInMethods, ...methods]);
      if (builtInMethods.length > 0) {
        setSelectedMethod(builtInMethods[0].id);
      }
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل طرق الدفع",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMethodStatus = async (methodId: string) => {
    try {
      const method = paymentMethods.find(m => m.id === methodId);
      if (!method || ['vodafone-cash', 'crypto'].includes(methodId)) {
        // Toggle local state for built-in methods
        setPaymentMethods(prev => 
          prev.map(m => 
            m.id === methodId 
              ? { ...m, is_active: !m.is_active }
              : m
          )
        );
        return;
      }

      await paymentService.updatePaymentMethod(methodId, {
        is_active: !method.is_active
      });
      
      await fetchPaymentMethods();
      toast({
        title: "تم التحديث",
        description: `تم ${method.is_active ? 'تعطيل' : 'تفعيل'} طريقة الدفع`,
      });
    } catch (error) {
      console.error('Error toggling payment method:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث طريقة الدفع",
        variant: "destructive"
      });
    }
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      CreditCard,
      Smartphone,
      Wallet,
      DollarSign
    };
    return icons[iconName] || CreditCard;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      card: 'text-blue-600',
      wallet: 'text-green-600', 
      bank: 'text-purple-600',
      crypto: 'text-orange-600'
    };
    return colors[type as keyof typeof colors] || 'text-gray-600';
  };

  const selectedPaymentMethod = paymentMethods.find(m => m.id === selectedMethod);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">نظام الدفع المتقدم</h2>
          <p className="text-gray-600">اختر طريقة الدفع المناسبة لك</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {amount.toFixed(2)} ج.م
        </Badge>
      </div>

      <Tabs defaultValue="payment" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="payment">الدفع</TabsTrigger>
          <TabsTrigger value="manage">إدارة الطرق</TabsTrigger>
        </TabsList>
        
        <TabsContent value="payment" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paymentMethods.filter(method => method.is_active).map((method) => {
              const IconComponent = getIcon(method.icon);
              const isSelected = selectedMethod === method.id;
              
              return (
                <Card 
                  key={method.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg bg-gray-100 ${getTypeColor(method.type)}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{method.name}</h3>
                        <p className="text-xs text-gray-600">{method.processing_time}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">الرسوم:</span>
                        <span className="font-semibold">{method.fees_percentage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">التكلفة:</span>
                        <span className="font-semibold">
                          {(amount * method.fees_percentage / 100).toFixed(2)} ج.م
                        </span>
                      </div>
                    </div>
                    
                    {method.manual_mode && method.auto_mode && (
                      <Badge variant="outline" className="mt-2 text-xs">
                        يدوي/تلقائي
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {selectedPaymentMethod && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  الدفع بـ {selectedPaymentMethod.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedMethod === 'vodafone-cash' && (
                  <VodafoneCashPayment
                    amount={amount}
                    onSuccess={(transactionId) => onPaymentSuccess(transactionId, 'فودافون كاش')}
                    onError={onPaymentError}
                  />
                )}
                
                {selectedMethod === 'crypto' && (
                  <CryptoPayment
                    amount={amount}
                    onSuccess={(transactionId) => onPaymentSuccess(transactionId, 'العملات الرقمية')}
                    onError={onPaymentError}
                  />
                )}
                
                {!['vodafone-cash', 'crypto'].includes(selectedMethod) && (
                  <div className="text-center py-8">
                    <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {selectedPaymentMethod.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      سيتم توجيهك لصفحة الدفع الخارجية
                    </p>
                    <Button className="w-full">
                      متابعة للدفع
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="manage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                إدارة طرق الدفع
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const IconComponent = getIcon(method.icon);
                  
                  return (
                    <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gray-100 ${getTypeColor(method.type)}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">{method.name}</h4>
                          <p className="text-sm text-gray-600">
                            رسوم: {method.fees_percentage}% | {method.processing_time}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant={method.is_active ? 'default' : 'secondary'}>
                          {method.is_active ? 'مفعل' : 'معطل'}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleMethodStatus(method.id)}
                        >
                          {method.is_active ? (
                            <ToggleRight className="h-4 w-4 text-green-600" />
                          ) : (
                            <ToggleLeft className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedPaymentSystem;
