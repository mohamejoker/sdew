
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Building, CheckCircle, RefreshCw, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface FawryPaymentSimulatorProps {
  amount: number;
  onSuccess: (transactionData: any) => void;
  onError: (error: string) => void;
}

const FawryPaymentSimulator: React.FC<FawryPaymentSimulatorProps> = ({
  amount,
  onSuccess,
  onError
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [fawryCode, setFawryCode] = useState('');
  const [showCode, setShowCode] = useState(false);

  const fawryFee = 5; // رسم ثابت 5 جنيه
  const totalAmount = amount + fawryFee;

  const handleGenerateCode = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const code = `FWR${Date.now().toString().slice(-8)}`;
      setFawryCode(code);
      setShowCode(true);
      setIsProcessing(false);
      
      toast.success('تم إنشاء كود فوري بنجاح!');
      
      onSuccess({
        transaction_id: `FAWRY_${Date.now()}`,
        provider: 'فوري',
        fawry_code: code,
        amount: amount,
        fees: fawryFee,
        total: totalAmount,
        instructions: `اذهب لأقرب فرع فوري وادفع ${totalAmount} ج.م باستخدام الكود: ${code}`
      });
    }, 2000);
  };

  const nearbyBranches = [
    { name: 'فوري - شارع التحرير', distance: '0.5 كم', address: 'شارع التحرير، وسط البلد' },
    { name: 'فوري - مول سيتي ستارز', distance: '1.2 كم', address: 'مول سيتي ستارز، مصر الجديدة' },
    { name: 'فوري - محطة مترو السادات', distance: '0.8 كم', address: 'محطة مترو السادات، الدور الأرضي' }
  ];

  if (showCode) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-600" />
          <h3 className="text-xl font-bold mb-2">تم إنشاء كود فوري!</h3>
        </div>

        {/* عرض الكود */}
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-6 text-center">
            <div className="text-sm text-orange-600 mb-2">كود فوري للدفع</div>
            <div className="text-3xl font-bold font-mono bg-white p-4 rounded-lg border-2 border-orange-300 mb-4">
              {fawryCode}
            </div>
            <div className="text-lg font-semibold text-orange-700 mb-2">
              ادفع: {totalAmount.toFixed(2)} ج.م
            </div>
            <div className="text-sm text-gray-600">
              صالح لمدة 24 ساعة
            </div>
          </CardContent>
        </Card>

        {/* تعليمات الدفع */}
        <Alert>
          <Building className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <div className="font-semibold">خطوات الدفع:</div>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>اذهب لأقرب فرع أو ماكينة فوري</li>
                <li>اختر "دفع فواتير" أو "خدمات أخرى"</li>
                <li>أدخل الكود: {fawryCode}</li>
                <li>ادفع المبلغ: {totalAmount.toFixed(2)} ج.م</li>
                <li>احتفظ بإيصال الدفع</li>
              </ol>
            </div>
          </AlertDescription>
        </Alert>

        {/* أقرب الفروع */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            أقرب فروع فوري
          </h4>
          <div className="space-y-2">
            {nearbyBranches.map((branch, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{branch.name}</div>
                      <div className="text-sm text-gray-600">{branch.address}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {branch.distance}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* مؤقت انتهاء الصلاحية */}
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-700">
              <Clock className="h-4 w-4" />
              <span className="text-sm">الكود صالح حتى: </span>
              <span className="font-mono">
                {new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString('ar-EG')}
              </span>
            </div>
          </CardContent>
        </Card>

        <Button 
          onClick={() => setShowCode(false)}
          variant="outline"
          className="w-full"
        >
          إنشاء كود جديد
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* معلومات فوري */}
      <div className="bg-orange-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <Building className="h-5 w-5 text-orange-600" />
          معلومات عن فوري
        </h4>
        <div className="text-sm space-y-1">
          <div>✅ أكثر من 40,000 نقطة دفع في مصر</div>
          <div>✅ متاح 24/7 في معظم الفروع</div>
          <div>✅ دفع آمن ومضمون</div>
          <div>✅ إيصال فوري للدفع</div>
        </div>
      </div>

      {/* تفاصيل المبلغ */}
      <Alert>
        <AlertDescription>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>مبلغ الطلب:</span>
              <span className="font-semibold">{amount.toFixed(2)} ج.م</span>
            </div>
            <div className="flex justify-between">
              <span>رسوم فوري:</span>
              <span className="font-semibold">{fawryFee.toFixed(2)} ج.م</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-bold">إجمالي المبلغ:</span>
              <span className="font-bold text-orange-600">{totalAmount.toFixed(2)} ج.م</span>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* أوقات العمل */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <div className="font-semibold text-green-700">فروع فوري</div>
          <div className="text-green-600">24 ساعة</div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <div className="font-semibold text-blue-700">ماكينات فوري</div>
          <div className="text-blue-600">متاح دائماً</div>
        </div>
      </div>

      <Button 
        onClick={handleGenerateCode}
        disabled={isProcessing}
        className="w-full bg-orange-600 hover:bg-orange-700"
      >
        {isProcessing ? (
          <>
            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
            جاري إنشاء الكود...
          </>
        ) : (
          <>
            <Building className="h-4 w-4 mr-2" />
            إنشاء كود فوري - {totalAmount.toFixed(2)} ج.م
          </>
        )}
      </Button>
    </div>
  );
};

export default FawryPaymentSimulator;
