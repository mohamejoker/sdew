
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Smartphone, CheckCircle, XCircle, Clock } from 'lucide-react';
import { paymentService } from '@/services/payment/paymentService';
import { useToast } from '@/hooks/use-toast';

interface VodafoneCashPaymentProps {
  amount: number;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
}

const VodafoneCashPayment: React.FC<VodafoneCashPaymentProps> = ({
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
  const { toast } = useToast();

  const handlePhoneSubmit = async () => {
    if (!phoneNumber || phoneNumber.length < 11) {
      toast({
        title: "رقم غير صحيح",
        description: "يرجى إدخال رقم هاتف صحيح",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      const result = await paymentService.simulateVodafoneCash(
        phoneNumber, 
        amount, 
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
      console.error('Error in Vodafone Cash simulation:', error);
      setStep('error');
      onError('فشل في الاتصال بخدمة فودافون كاش');
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
      description: "تم تأكيد عملية الدفع من فودافون كاش",
    });
  };

  const resetPayment = () => {
    setStep('phone');
    setPhoneNumber('');
    setConfirmationCode('');
    setTransactionId('');
    setSimulationResult(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-red-600" />
          فودافون كاش
          <Badge variant={isManualMode ? 'outline' : 'default'} className="mr-auto">
            {isManualMode ? 'يدوي' : 'تلقائي'}
          </Badge>
        </CardTitle>
        
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
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-green-600">{amount.toFixed(2)} ج.م</div>
          <div className="text-sm text-gray-600">المبلغ المطلوب</div>
        </div>

        {step === 'phone' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">رقم فودافون كاش</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="01xxxxxxxxx"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={11}
              />
              <p className="text-xs text-gray-500">
                {isManualMode 
                  ? 'سيتم إرسال كود تأكيد إلى هذا الرقم'
                  : 'سيتم الخصم تلقائياً من هذا الرقم'
                }
              </p>
            </div>

            <Button 
              onClick={handlePhoneSubmit}
              disabled={isProcessing || !phoneNumber}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  جاري المعالجة...
                </div>
              ) : (
                `${isManualMode ? 'إرسال كود التأكيد' : 'دفع فوري'}`
              )}
            </Button>
          </div>
        )}

        {step === 'confirmation' && (
          <div className="space-y-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-600 mb-2">تم إرسال كود التأكيد إلى:</div>
              <div className="font-mono text-lg">{phoneNumber}</div>
              {simulationResult?.confirmationCode && (
                <div className="mt-2 text-xs text-gray-500">
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

export default VodafoneCashPayment;
