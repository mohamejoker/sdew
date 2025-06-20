
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Smartphone, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EgyptianWalletPaymentProps {
  amount: number;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
}

interface NetworkProvider {
  name: string;
  color: string;
  icon: string;
  prefixes: string[];
  serviceName: string;
  fees: number;
}

const networkProviders: Record<string, NetworkProvider> = {
  vodafone: {
    name: 'فودافون كاش',
    color: 'bg-red-600',
    icon: '📱',
    prefixes: ['010'],
    serviceName: 'Vodafone Cash',
    fees: 2.5
  },
  etisalat: {
    name: 'اتصالات كاش',
    color: 'bg-green-600',
    icon: '💳',
    prefixes: ['011'],
    serviceName: 'Etisalat Cash',
    fees: 2.0
  },
  orange: {
    name: 'أورانج موني',
    color: 'bg-orange-600',
    icon: '🧡',
    prefixes: ['012'],
    serviceName: 'Orange Money',
    fees: 2.2
  },
  we: {
    name: 'WE Pay',
    color: 'bg-purple-600',
    icon: '💜',
    prefixes: ['015'],
    serviceName: 'WE Pay',
    fees: 2.3
  }
};

const EgyptianWalletPayment: React.FC<EgyptianWalletPaymentProps> = ({
  amount,
  onSuccess,
  onError
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isManualMode, setIsManualMode] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'phone' | 'confirmation' | 'processing' | 'success' | 'error'>('phone');
  const [transactionId, setTransactionId] = useState('');
  const [simulationResult, setSimulationResult] = useState<any>(null);
  const [detectedProvider, setDetectedProvider] = useState<NetworkProvider | null>(null);
  const { toast } = useToast();

  // Auto-detect network provider based on phone number
  useEffect(() => {
    if (phoneNumber.length >= 3) {
      const prefix = phoneNumber.substring(0, 3);
      const provider = Object.values(networkProviders).find(p => 
        p.prefixes.includes(prefix)
      );
      setDetectedProvider(provider || null);
    } else {
      setDetectedProvider(null);
    }
  }, [phoneNumber]);

  const calculateFees = () => {
    if (!detectedProvider) return 0;
    return (amount * detectedProvider.fees) / 100;
  };

  const getTotalAmount = () => {
    return amount + calculateFees();
  };

  const simulateWalletPayment = async (phoneNumber: string, amount: number, provider: NetworkProvider, mode: 'manual' | 'auto') => {
    const transactionId = `${provider.name.substring(0, 2).toUpperCase()}${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    
    if (mode === 'manual') {
      const confirmationCode = Math.floor(1000 + Math.random() * 9000).toString();
      return {
        success: true,
        confirmationCode,
        transactionId,
        message: `تم إرسال كود التأكيد ${confirmationCode} إلى ${phoneNumber} عبر ${provider.serviceName}`
      };
    } else {
      const isSuccess = Math.random() > 0.1; // 90% success rate
      return {
        success: isSuccess,
        transactionId,
        message: isSuccess 
          ? `تم الدفع بنجاح من ${provider.serviceName} ${phoneNumber}`
          : `فشل في الدفع - رصيد غير كافي أو خطأ في شبكة ${provider.name}`
      };
    }
  };

  const handlePhoneSubmit = async () => {
    if (!phoneNumber || phoneNumber.length < 11) {
      toast({
        title: "رقم غير صحيح",
        description: "يرجى إدخال رقم هاتف صحيح",
        variant: "destructive"
      });
      return;
    }

    if (!detectedProvider) {
      toast({
        title: "شبكة غير مدعومة",
        description: "الرقم المدخل لا ينتمي لشبكة مدعومة",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      const result = await simulateWalletPayment(
        phoneNumber, 
        getTotalAmount(), 
        detectedProvider,
        isManualMode ? 'manual' : 'auto'
      );

      setSimulationResult(result);
      setTransactionId(result.transactionId);

      if (isManualMode && result.success) {
        setStep('confirmation');
        toast({
          title: "كود التأكيد",
          description: result.message,
        });
      } else if (!isManualMode) {
        if (result.success) {
          setStep('success');
          onSuccess(result.transactionId);
        } else {
          setStep('error');
          onError(result.message);
        }
      }
    } catch (error) {
      console.error('Error in wallet simulation:', error);
      setStep('error');
      onError(`فشل في الاتصال بخدمة ${detectedProvider.serviceName}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmationSubmit = () => {
    if (!confirmationCode || confirmationCode !== simulationResult?.confirmationCode) {
      toast({
        title: "كود خطأ",
        description: "كود التأكيد غير صحيح",
        variant: "destructive"
      });
      return;
    }

    setStep('success');
    onSuccess(transactionId);
    toast({
      title: "تم الدفع بنجاح",
      description: `تم تأكيد عملية الدفع من ${detectedProvider?.serviceName}`,
    });
  };

  const resetPayment = () => {
    setStep('phone');
    setPhoneNumber('');
    setConfirmationCode('');
    setTransactionId('');
    setSimulationResult(null);
    setDetectedProvider(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-blue-600" />
          المحافظ الإلكترونية المصرية
          <Badge variant={isManualMode ? 'outline' : 'default'} className="mr-auto">
            {isManualMode ? 'يدوي' : 'تلقائي'}
          </Badge>
        </CardTitle>
        
        {detectedProvider && (
          <div className={`p-3 rounded-lg ${detectedProvider.color} text-white`}>
            <div className="flex items-center gap-2">
              <span className="text-xl">{detectedProvider.icon}</span>
              <div>
                <div className="font-medium">{detectedProvider.name}</div>
                <div className="text-sm opacity-90">رسوم: {detectedProvider.fees}%</div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Label htmlFor="mode-switch" className="text-sm">
            {isManualMode ? 'وضع يدوي (كود تأكيد)' : 'وضع تلقائي (فوري)'}
          </Label>
          <Switch
            id="mode-switch"
            checked={!isManualMode}
            onCheckedChange={(checked) => setIsManualMode(!checked)}
            disabled={step !== 'phone'}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-center mb-4 space-y-2">
          <div className="text-2xl font-bold text-green-600">{amount.toFixed(2)} ج.م</div>
          <div className="text-sm text-gray-600">المبلغ الأساسي</div>
          
          {detectedProvider && (
            <>
              <div className="text-lg font-semibold text-orange-600">+{calculateFees().toFixed(2)} ج.م</div>
              <div className="text-xs text-gray-500">رسوم {detectedProvider.name}</div>
              <div className="text-xl font-bold text-blue-600 border-t pt-2">
                {getTotalAmount().toFixed(2)} ج.م
              </div>
              <div className="text-sm text-gray-600">إجمالي المبلغ</div>
            </>
          )}
        </div>

        {step === 'phone' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">رقم المحفظة الإلكترونية</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="01xxxxxxxxx"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={11}
                className={detectedProvider ? `border-2 ${detectedProvider.color.replace('bg-', 'border-')}` : ''}
              />
              <p className="text-xs text-gray-500">
                {detectedProvider ? (
                  `سيتم ${isManualMode ? 'إرسال كود تأكيد' : 'الخصم تلقائياً'} من ${detectedProvider.serviceName}`
                ) : (
                  'ادخل رقم هاتف صحيح لأي من الشبكات المدعومة (010, 011, 012, 015)'
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {Object.values(networkProviders).map((provider) => (
                <div key={provider.name} className={`p-2 rounded-lg ${provider.color} text-white text-center`}>
                  <div className="text-lg">{provider.icon}</div>
                  <div className="text-xs">{provider.name}</div>
                  <div className="text-xs opacity-75">{provider.prefixes.join(', ')}</div>
                </div>
              ))}
            </div>

            <Button 
              onClick={handlePhoneSubmit}
              disabled={isProcessing || !phoneNumber || !detectedProvider}
              className={`w-full ${detectedProvider ? detectedProvider.color : 'bg-gray-600'}`}
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  جاري المعالجة...
                </div>
              ) : (
                `${isManualMode ? 'إرسال كود التأكيد' : 'دفع فوري'} - ${detectedProvider ? detectedProvider.serviceName : 'اختر شبكة'}`
              )}
            </Button>
          </div>
        )}

        {step === 'confirmation' && (
          <div className="space-y-4">
            <div className={`text-center p-4 rounded-lg ${detectedProvider?.color} text-white`}>
              <div className="text-sm mb-2">تم إرسال كود التأكيد إلى:</div>
              <div className="font-mono text-lg">{phoneNumber}</div>
              <div className="text-sm opacity-90">عبر {detectedProvider?.serviceName}</div>
              {simulationResult?.confirmationCode && (
                <div className="mt-2 text-xs opacity-75">
                  كود المحاكاة: {simulationResult.confirmationCode}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmation">كود التأكيد</Label>
              <Input
                id="confirmation"
                type="number"
                placeholder="0000"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                maxLength={4}
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleConfirmationSubmit}
                disabled={!confirmationCode}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                تأكيد الدفع
              </Button>
              <Button 
                onClick={resetPayment}
                variant="outline"
                className="flex-1"
              >
                إلغاء
              </Button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-green-600">تم الدفع بنجاح!</h3>
              <p className="text-sm text-gray-600">رقم المعاملة: {transactionId}</p>
              <p className="text-xs text-gray-500">عبر {detectedProvider?.serviceName}</p>
            </div>
            <Button onClick={resetPayment} variant="outline" className="w-full">
              عملية جديدة
            </Button>
          </div>
        )}

        {step === 'error' && (
          <div className="text-center space-y-4">
            <XCircle className="h-16 w-16 text-red-600 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-red-600">فشل في الدفع</h3>
              <p className="text-sm text-gray-600">{simulationResult?.message}</p>
            </div>
            <Button onClick={resetPayment} variant="outline" className="w-full">
              إعادة المحاولة
            </Button>
          </div>
        )}

        {step === 'processing' && (
          <div className="text-center space-y-4">
            <Clock className="h-16 w-16 text-blue-600 mx-auto animate-pulse" />
            <div>
              <h3 className="text-lg font-semibold">جاري المعالجة...</h3>
              <p className="text-sm text-gray-600">يرجى الانتظار</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EgyptianWalletPayment;
