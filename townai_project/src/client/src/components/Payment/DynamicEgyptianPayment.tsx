
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Smartphone, 
  CreditCard, 
  Wallet, 
  Building, 
  DollarSign,
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw
} from 'lucide-react';
import { egyptianPaymentConfigService, EgyptianPaymentConfig } from '@/services/payment/egyptianPaymentConfigService';
import { toast } from 'sonner';

interface DynamicEgyptianPaymentProps {
  amount: number;
  onPaymentSuccess: (transactionData: any) => void;
  onPaymentError: (error: string) => void;
}

const DynamicEgyptianPayment: React.FC<DynamicEgyptianPaymentProps> = ({
  amount,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [configs, setConfigs] = useState<EgyptianPaymentConfig[]>([]);
  const [selectedConfig, setSelectedConfig] = useState<EgyptianPaymentConfig | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedProvider, setDetectedProvider] = useState<EgyptianPaymentConfig | null>(null);
  const [paymentStep, setPaymentStep] = useState<'select' | 'phone' | 'confirm' | 'success'>('select');
  const [transactionId, setTransactionId] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPaymentConfigs();
  }, []);

  useEffect(() => {
    if (phoneNumber.length >= 3) {
      detectProvider();
    } else {
      setDetectedProvider(null);
    }
  }, [phoneNumber]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const loadPaymentConfigs = async () => {
    try {
      const data = await egyptianPaymentConfigService.getActivePaymentConfigs();
      setConfigs(data);
    } catch (error) {
      console.error('Error loading payment configs:', error);
      onPaymentError('خطأ في تحميل طرق الدفع');
    } finally {
      setLoading(false);
    }
  };

  const detectProvider = async () => {
    try {
      const provider = await egyptianPaymentConfigService.detectWalletProvider(phoneNumber);
      setDetectedProvider(provider);
      if (provider) {
        setSelectedConfig(provider);
      }
    } catch (error) {
      console.error('Error detecting provider:', error);
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons = { Smartphone, CreditCard, Wallet, Building, DollarSign };
    return icons[iconName as keyof typeof icons] || Smartphone;
  };

  const handleConfigSelect = (config: EgyptianPaymentConfig) => {
    setSelectedConfig(config);
    if (config.prefixes.length === 0) {
      // للطرق التي لا تتطلب رقم هاتف (مثل فوري)
      handleDirectPayment(config);
    } else {
      setPaymentStep('phone');
    }
  };

  const handleDirectPayment = async (config: EgyptianPaymentConfig) => {
    setIsProcessing(true);
    try {
      const result = await egyptianPaymentConfigService.simulatePayment(
        '', 
        amount, 
        config.provider_name, 
        'manual'
      );

      if (result.success) {
        setTransactionId(result.transaction_id);
        if (config.provider_name === 'fawry') {
          // للدفع عبر فوري، نعرض كود الدفع مباشرة
          onPaymentSuccess({
            transaction_id: result.transaction_id,
            provider: config.display_name,
            fawry_code: result.confirmation_code,
            amount,
            fees: egyptianPaymentConfigService.calculateFees(amount, config),
            total: egyptianPaymentConfigService.calculateTotalAmount(amount, config)
          });
          setPaymentStep('success');
        } else {
          setPaymentStep('confirm');
          setCountdown(config.confirmation_timeout);
        }
      } else {
        onPaymentError(result.message);
      }
    } catch (error) {
      onPaymentError(error instanceof Error ? error.message : 'حدث خطأ أثناء المعالجة');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePhoneSubmit = async () => {
    if (!selectedConfig || !phoneNumber) {
      toast.error('يرجى إدخال رقم الهاتف');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await egyptianPaymentConfigService.simulatePayment(
        phoneNumber, 
        amount, 
        selectedConfig.provider_name, 
        'manual'
      );

      if (result.success) {
        setTransactionId(result.transaction_id);
        setPaymentStep('confirm');
        setCountdown(selectedConfig.confirmation_timeout);
        toast.success(result.message);
      } else {
        onPaymentError(result.message);
      }
    } catch (error) {
      onPaymentError(error instanceof Error ? error.message : 'حدث خطأ أثناء المعالجة');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmationSubmit = () => {
    if (!confirmationCode) {
      toast.error('يرجى إدخال كود التأكيد');
      return;
    }

    // محاكاة التحقق من كود التأكيد
    const isValidCode = confirmationCode.length === 4 && /^\d+$/.test(confirmationCode);
    
    if (isValidCode) {
      onPaymentSuccess({
        transaction_id: transactionId,
        provider: selectedConfig?.display_name,
        phone_number: phoneNumber,
        confirmation_code: confirmationCode,
        amount,
        fees: selectedConfig ? egyptianPaymentConfigService.calculateFees(amount, selectedConfig) : 0,
        total: selectedConfig ? egyptianPaymentConfigService.calculateTotalAmount(amount, selectedConfig) : amount
      });
      setPaymentStep('success');
      toast.success('تم تأكيد الدفع بنجاح!');
    } else {
      toast.error('كود التأكيد غير صحيح');
    }
  };

  const handleResendCode = async () => {
    if (!selectedConfig || !phoneNumber) return;

    setIsProcessing(true);
    try {
      const result = await egyptianPaymentConfigService.simulatePayment(
        phoneNumber, 
        amount, 
        selectedConfig.provider_name, 
        'manual'
      );

      if (result.success) {
        setCountdown(selectedConfig.confirmation_timeout);
        toast.success('تم إعادة إرسال الكود');
      }
    } catch (error) {
      toast.error('فشل في إعادة إرسال الكود');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-green-500" />
          <span className="mr-2">جاري تحميل طرق الدفع...</span>
        </CardContent>
      </Card>
    );
  }

  if (paymentStep === 'success') {
    return (
      <Card>
        <CardContent className="text-center p-8">
          <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
          <h3 className="text-xl font-bold mb-2 text-green-600">تم الدفع بنجاح!</h3>
          <p className="text-gray-600">رقم المعاملة: {transactionId}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            طرق الدفع المصرية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-800">
              <div><strong>المبلغ:</strong> {amount.toFixed(2)} ج.م</div>
              {selectedConfig && (
                <>
                  <div><strong>الرسوم:</strong> {egyptianPaymentConfigService.calculateFees(amount, selectedConfig).toFixed(2)} ج.م</div>
                  <div><strong>المبلغ الإجمالي:</strong> {egyptianPaymentConfigService.calculateTotalAmount(amount, selectedConfig).toFixed(2)} ج.م</div>
                </>
              )}
            </div>
          </div>

          {paymentStep === 'select' && (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {configs.map((config) => {
                const IconComponent = getIconComponent(config.icon_name);
                return (
                  <Card 
                    key={config.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
                    onClick={() => handleConfigSelect(config)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`p-3 ${config.color_class} rounded-lg mx-auto mb-3 w-fit`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-medium mb-1">{config.display_name}</h3>
                      <div className="text-sm text-gray-600">
                        <div>رسوم: {config.fees_percentage}%</div>
                        {config.prefixes.length > 0 && (
                          <div>البادئات: {config.prefixes.join(', ')}</div>
                        )}
                      </div>
                      <div className="flex justify-center gap-1 mt-2">
                        {config.manual_mode && <Badge variant="outline" className="text-xs">يدوي</Badge>}
                        {config.auto_mode && <Badge variant="outline" className="text-xs">تلقائي</Badge>}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {paymentStep === 'phone' && selectedConfig && (
            <div className="space-y-4">
              <div className="text-center">
                <div className={`p-3 ${selectedConfig.color_class} rounded-lg mx-auto mb-3 w-fit`}>
                  {React.createElement(getIconComponent(selectedConfig.icon_name), { className: "h-6 w-6 text-white" })}
                </div>
                <h3 className="font-medium">{selectedConfig.display_name}</h3>
              </div>

              <div>
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="01xxxxxxxxx"
                  className="text-center text-lg"
                  maxLength={11}
                />
                {detectedProvider && (
                  <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    تم اكتشاف شبكة {detectedProvider.display_name}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setPaymentStep('select')}
                  className="flex-1"
                >
                  رجوع
                </Button>
                <Button 
                  onClick={handlePhoneSubmit}
                  disabled={!phoneNumber || isProcessing}
                  className="flex-1"
                >
                  {isProcessing && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
                  متابعة
                </Button>
              </div>
            </div>
          )}

          {paymentStep === 'confirm' && selectedConfig && (
            <div className="space-y-4">
              <div className="text-center">
                <Clock className="h-12 w-12 mx-auto mb-3 text-orange-500" />
                <h3 className="font-medium mb-2">في انتظار كود التأكيد</h3>
                <p className="text-sm text-gray-600">
                  تم إرسال كود التأكيد إلى {phoneNumber} عبر {selectedConfig.display_name}
                </p>
              </div>

              {countdown > 0 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    انتهاء صلاحية الكود خلال {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="confirmation">كود التأكيد</Label>
                <Input
                  id="confirmation"
                  type="text"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  placeholder="1234"
                  className="text-center text-2xl tracking-widest"
                  maxLength={4}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleResendCode}
                  disabled={isProcessing || countdown > selectedConfig.confirmation_timeout - 60}
                  className="flex-1"
                >
                  {isProcessing ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : <RefreshCw className="h-4 w-4 ml-2" />}
                  إعادة الإرسال
                </Button>
                <Button 
                  onClick={handleConfirmationSubmit}
                  disabled={!confirmationCode || confirmationCode.length !== 4}
                  className="flex-1"
                >
                  تأكيد الدفع
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamicEgyptianPayment;
