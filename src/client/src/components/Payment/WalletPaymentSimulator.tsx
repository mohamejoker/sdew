
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Smartphone, 
  CheckCircle, 
  XCircle, 
  Clock, 
  RefreshCw,
  Signal,
  Battery,
  Wifi
} from 'lucide-react';
import { toast } from 'sonner';

interface WalletPaymentSimulatorProps {
  amount: number;
  onSuccess: (transactionData: any) => void;
  onError: (error: string) => void;
}

interface NetworkProvider {
  name: string;
  displayName: string;
  color: string;
  icon: string;
  prefixes: string[];
  fees: number;
  successRate: number;
}

const networkProviders: Record<string, NetworkProvider> = {
  vodafone: {
    name: 'vodafone',
    displayName: 'فودافون كاش',
    color: 'bg-red-600',
    icon: '📱',
    prefixes: ['010'],
    fees: 2.5,
    successRate: 95
  },
  etisalat: {
    name: 'etisalat',
    displayName: 'اتصالات كاش',
    color: 'bg-green-600',
    icon: '💳',
    prefixes: ['011'],
    fees: 2.0,
    successRate: 93
  },
  orange: {
    name: 'orange',
    displayName: 'أورانج موني',
    color: 'bg-orange-600',
    icon: '🧡',
    prefixes: ['012'],
    fees: 2.2,
    successRate: 90
  },
  we: {
    name: 'we',
    displayName: 'WE Pay',
    color: 'bg-purple-600',
    icon: '💜',
    prefixes: ['015'],
    fees: 2.3,
    successRate: 88
  }
};

const WalletPaymentSimulator: React.FC<WalletPaymentSimulatorProps> = ({
  amount,
  onSuccess,
  onError
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [step, setStep] = useState<'phone' | 'confirmation' | 'processing' | 'success' | 'error'>('phone');
  const [detectedProvider, setDetectedProvider] = useState<NetworkProvider | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [simulationCode, setSimulationCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [transactionId, setTransactionId] = useState('');
  const [showMobileInterface, setShowMobileInterface] = useState(false);

  // كشف الشبكة تلقائياً
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

  // عداد الوقت للكود
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const calculateFees = () => {
    if (!detectedProvider) return 0;
    return (amount * detectedProvider.fees) / 100;
  };

  const getTotalAmount = () => {
    return amount + calculateFees();
  };

  const handlePhoneSubmit = async () => {
    if (!phoneNumber || phoneNumber.length < 11) {
      toast.error('يرجى إدخال رقم هاتف صحيح');
      return;
    }

    if (!detectedProvider) {
      toast.error('الشبكة غير مدعومة');
      return;
    }

    setIsProcessing(true);
    setStep('processing');

    // محاكاة طلب الكود
    setTimeout(() => {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      const txId = `${detectedProvider.name.toUpperCase()}${Date.now()}`;
      
      setSimulationCode(code);
      setTransactionId(txId);
      setStep('confirmation');
      setCountdown(300); // 5 دقائق
      setIsProcessing(false);
      setShowMobileInterface(true);

      toast.success(`تم إرسال كود التأكيد ${code} إلى ${phoneNumber}`);
    }, 2000);
  };

  const handleConfirmationSubmit = () => {
    if (!confirmationCode) {
      toast.error('يرجى إدخال كود التأكيد');
      return;
    }

    if (confirmationCode !== simulationCode) {
      toast.error('كود التأكيد غير صحيح');
      return;
    }

    // محاكاة معالجة الدفع
    setIsProcessing(true);
    setStep('processing');

    setTimeout(() => {
      const isSuccess = Math.random() * 100 < (detectedProvider?.successRate || 90);
      
      if (isSuccess) {
        setStep('success');
        onSuccess({
          transaction_id: transactionId,
          provider: detectedProvider?.displayName,
          phone_number: phoneNumber,
          amount: amount,
          fees: calculateFees(),
          total: getTotalAmount(),
          confirmation_code: confirmationCode
        });
        toast.success('تم الدفع بنجاح!');
      } else {
        setStep('error');
        onError('فشل في الدفع - رصيد غير كافي أو خطأ في الشبكة');
      }
      setIsProcessing(false);
    }, 3000);
  };

  const resetPayment = () => {
    setStep('phone');
    setPhoneNumber('');
    setConfirmationCode('');
    setSimulationCode('');
    setTransactionId('');
    setCountdown(0);
    setShowMobileInterface(false);
  };

  // واجهة الهاتف المحاكاة
  if (showMobileInterface && step === 'confirmation') {
    return (
      <div className="max-w-sm mx-auto">
        {/* شريط حالة الهاتف */}
        <div className="bg-black text-white px-4 py-2 rounded-t-3xl flex justify-between items-center text-xs">
          <div className="flex items-center gap-1">
            <Signal className="h-3 w-3" />
            <span>{detectedProvider?.displayName}</span>
          </div>
          <div className="font-mono">
            {new Date().toLocaleTimeString('ar-EG', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
          <div className="flex items-center gap-1">
            <Wifi className="h-3 w-3" />
            <Battery className="h-3 w-3" />
            <span>100%</span>
          </div>
        </div>

        {/* شاشة الهاتف */}
        <div className="bg-white border-x-2 border-b-2 border-gray-300 rounded-b-3xl p-6 min-h-96">
          <div className="text-center mb-6">
            <div className={`w-16 h-16 ${detectedProvider?.color} rounded-full flex items-center justify-center text-2xl mx-auto mb-4`}>
              {detectedProvider?.icon}
            </div>
            <h3 className="text-lg font-bold">{detectedProvider?.displayName}</h3>
            <p className="text-sm text-gray-600">رسالة نصية جديدة</p>
          </div>

          {/* محاكاة رسالة SMS */}
          <div className="bg-gray-100 rounded-lg p-4 mb-6 text-right">
            <div className="text-xs text-gray-500 mb-2">
              {detectedProvider?.displayName} - الآن
            </div>
            <div className="text-sm">
              كود التأكيد لعملية الدفع بمبلغ {getTotalAmount().toFixed(2)} ج.م هو:
              <div className="text-xl font-bold text-center my-2 bg-yellow-200 rounded p-2">
                {simulationCode}
              </div>
              صالح لمدة {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>أدخل كود التأكيد</Label>
              <Input
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                placeholder="0000"
                className="text-center text-xl font-mono"
                maxLength={4}
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleConfirmationSubmit}
                disabled={!confirmationCode || isProcessing}
                className="flex-1 bg-green-600"
              >
                {isProcessing ? <RefreshCw className="h-4 w-4 animate-spin" /> : 'تأكيد'}
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
        </div>
      </div>
    );
  }

  // الواجهة العادية
  return (
    <div className="space-y-6">
      {step === 'phone' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {Object.values(networkProviders).map((provider) => (
              <div 
                key={provider.name}
                className={`p-3 rounded-lg text-center text-white ${provider.color} ${
                  detectedProvider?.name === provider.name ? 'ring-4 ring-white' : ''
                }`}
              >
                <div className="text-2xl mb-1">{provider.icon}</div>
                <div className="text-xs font-medium">{provider.displayName}</div>
                <div className="text-xs opacity-75">{provider.prefixes.join(', ')}</div>
                <div className="text-xs">رسوم: {provider.fees}%</div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <Label>رقم المحفظة الإلكترونية</Label>
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="01xxxxxxxxx"
                className="text-center text-lg"
                maxLength={11}
              />
              {detectedProvider && (
                <div className="mt-2 flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">
                    تم اكتشاف {detectedProvider.displayName}
                  </span>
                </div>
              )}
            </div>

            {detectedProvider && (
              <Alert>
                <Smartphone className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <div><strong>المبلغ:</strong> {amount.toFixed(2)} ج.م</div>
                    <div><strong>الرسوم:</strong> {calculateFees().toFixed(2)} ج.م</div>
                    <div><strong>الإجمالي:</strong> {getTotalAmount().toFixed(2)} ج.م</div>
                    <div><strong>معدل النجاح:</strong> {detectedProvider.successRate}%</div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <Button 
              onClick={handlePhoneSubmit}
              disabled={!phoneNumber || !detectedProvider || isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Smartphone className="h-4 w-4 mr-2" />
              )}
              إرسال كود التأكيد
            </Button>
          </div>
        </>
      )}

      {step === 'processing' && (
        <div className="text-center py-8">
          <RefreshCw className="h-16 w-16 animate-spin mx-auto mb-4 text-blue-600" />
          <h3 className="text-lg font-semibold mb-2">جاري المعالجة...</h3>
          <p className="text-gray-600">يرجى الانتظار</p>
        </div>
      )}

      {step === 'success' && (
        <div className="text-center py-8">
          <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-600" />
          <h3 className="text-lg font-semibold text-green-600 mb-2">تم الدفع بنجاح!</h3>
          <p className="text-gray-600 mb-4">رقم المعاملة: {transactionId}</p>
          <Button onClick={resetPayment} variant="outline">
            عملية جديدة
          </Button>
        </div>
      )}

      {step === 'error' && (
        <div className="text-center py-8">
          <XCircle className="h-16 w-16 mx-auto mb-4 text-red-600" />
          <h3 className="text-lg font-semibold text-red-600 mb-2">فشل في الدفع</h3>
          <p className="text-gray-600 mb-4">حدث خطأ أثناء معالجة الدفع</p>
          <Button onClick={resetPayment} variant="outline">
            إعادة المحاولة
          </Button>
        </div>
      )}
    </div>
  );
};

export default WalletPaymentSimulator;
