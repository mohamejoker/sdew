
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, CheckCircle, Banknote, Building, Clock, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface BankTransferSimulatorProps {
  amount: number;
  onSuccess: (transactionData: any) => void;
  onError: (error: string) => void;
}

const BankTransferSimulator: React.FC<BankTransferSimulatorProps> = ({
  amount,
  onSuccess,
  onError
}) => {
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [showTransferDetails, setShowTransferDetails] = useState(false);
  const [transferId, setTransferId] = useState('');

  const bankAccounts = [
    {
      id: 'nbe',
      name: 'البنك الأهلي المصري',
      accountNumber: '1234567890123456',
      accountName: 'Town Media Group',
      swiftCode: 'NBEIEGCX',
      color: 'bg-blue-600',
      processingTime: '1-2 ساعة'
    },
    {
      id: 'banque_misr',
      name: 'بنك مصر',
      accountNumber: '9876543210987654',
      accountName: 'Town Media Group',
      swiftCode: 'BMISEGCX',
      color: 'bg-green-600',
      processingTime: '2-4 ساعات'
    },
    {
      id: 'cib',
      name: 'البنك التجاري الدولي',
      accountNumber: '5555444433332222',
      accountName: 'Town Media Group',
      swiftCode: 'CIBKEGCX',
      color: 'bg-purple-600',
      processingTime: '30 دقيقة - 1 ساعة'
    }
  ];

  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
    const newTransferId = `BANK_${Date.now()}`;
    setTransferId(newTransferId);
    setShowTransferDetails(true);
    
    onSuccess({
      transaction_id: newTransferId,
      provider: 'تحويل بنكي',
      bank_name: bankAccounts.find(b => b.id === bankId)?.name,
      amount: amount,
      fees: 0,
      total: amount,
      status: 'pending_transfer'
    });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`تم نسخ ${label}`);
  };

  const selectedBankData = bankAccounts.find(b => b.id === selectedBank);

  if (showTransferDetails && selectedBankData) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-600" />
          <h3 className="text-xl font-bold mb-2">تم إنشاء طلب التحويل</h3>
          <p className="text-gray-600">رقم المرجع: {transferId}</p>
        </div>

        {/* بيانات التحويل */}
        <Card className={`${selectedBankData.color} text-white`}>
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <Building className="h-8 w-8 mx-auto mb-2" />
              <h4 className="text-xl font-bold">{selectedBankData.name}</h4>
            </div>
          </CardContent>
        </Card>

        {/* تفاصيل الحساب */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">رقم الحساب:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(selectedBankData.accountNumber, 'رقم الحساب')}
                className="text-blue-600"
              >
                <Copy className="h-4 w-4 mr-1" />
                نسخ
              </Button>
            </div>
            <div className="font-mono text-lg bg-white p-2 rounded border">
              {selectedBankData.accountNumber}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">اسم المستفيد:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(selectedBankData.accountName, 'اسم المستفيد')}
                className="text-blue-600"
              >
                <Copy className="h-4 w-4 mr-1" />
                نسخ
              </Button>
            </div>
            <div className="font-semibold text-lg bg-white p-2 rounded border">
              {selectedBankData.accountName}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">كود SWIFT:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(selectedBankData.swiftCode, 'كود SWIFT')}
                className="text-blue-600"
              >
                <Copy className="h-4 w-4 mr-1" />
                نسخ
              </Button>
            </div>
            <div className="font-mono text-lg bg-white p-2 rounded border">
              {selectedBankData.swiftCode}
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex justify-between items-center">
              <span className="font-medium">المبلغ المطلوب تحويله:</span>
              <span className="text-2xl font-bold text-yellow-700">{amount.toFixed(2)} ج.م</span>
            </div>
          </div>
        </div>

        {/* تعليمات مهمة */}
        <Alert>
          <Banknote className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <div className="font-semibold">تعليمات مهمة:</div>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>تأكد من كتابة رقم المرجع: <strong>{transferId}</strong> في خانة البيان</li>
                <li>احتفظ بإيصال التحويل كإثبات للدفع</li>
                <li>سيتم تفعيل طلبك خلال {selectedBankData.processingTime}</li>
                <li>في حالة التأخير، اتصل بخدمة العملاء</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>

        {/* وقت المعالجة */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium text-blue-800">وقت المعالجة المتوقع</div>
                <div className="text-blue-600">{selectedBankData.processingTime}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* معلومات الاتصال */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-medium text-green-800">خدمة العملاء</div>
                <div className="text-green-600">16000 - متاح 24/7</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button 
          onClick={() => {
            setShowTransferDetails(false);
            setSelectedBank('');
          }}
          variant="outline"
          className="w-full"
        >
          تحويل جديد
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* معلومات التحويل البنكي */}
      <Alert>
        <Banknote className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-2">
            <div className="font-semibold">مميزات التحويل البنكي:</div>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>بدون رسوم إضافية</li>
              <li>آمن ومضمون 100%</li>
              <li>مناسب للمبالغ الكبيرة</li>
              <li>إثبات رسمي للدفع</li>
            </ul>
          </div>
        </AlertDescription>
      </Alert>

      {/* تفاصيل المبلغ */}
      <div className="bg-green-50 p-4 rounded-lg">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{amount.toFixed(2)} ج.م</div>
          <div className="text-sm text-green-700">المبلغ المطلوب تحويله (بدون رسوم)</div>
        </div>
      </div>

      {/* اختيار البنك */}
      <div>
        <h4 className="font-semibold mb-3">اختر البنك للتحويل إليه:</h4>
        <div className="space-y-3">
          {bankAccounts.map((bank) => (
            <Card 
              key={bank.id}
              className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
              onClick={() => handleBankSelect(bank.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${bank.color} rounded-lg flex items-center justify-center`}>
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">{bank.name}</div>
                      <div className="text-sm text-gray-600">حساب رقم: {bank.accountNumber.slice(-4)}***</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-1">
                      {bank.processingTime}
                    </Badge>
                    <div className="text-xs text-gray-500">وقت المعالجة</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* معلومات إضافية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="font-semibold text-blue-700 mb-1">التحويل داخل نفس البنك</div>
          <div className="text-blue-600">فوري إلى 30 دقيقة</div>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg">
          <div className="font-semibold text-orange-700 mb-1">التحويل بين البنوك</div>
          <div className="text-orange-600">1-4 ساعات عمل</div>
        </div>
      </div>
    </div>
  );
};

export default BankTransferSimulator;
