
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, CheckCircle, XCircle, Wallet, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CryptoPaymentProps {
  amount: number;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
}

const CryptoPayment: React.FC<CryptoPaymentProps> = ({
  amount,
  onSuccess,
  onError
}) => {
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [cryptoAmount, setCryptoAmount] = useState(0);
  const [walletAddress, setWalletAddress] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'confirming' | 'success' | 'error'>('pending');
  const [transactionHash, setTransactionHash] = useState('');
  const { toast } = useToast();

  const cryptoCurrencies = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: '₿',
      rate: 43000, // USD rate simulation
      wallet: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      color: 'text-orange-500'
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      rate: 2500,
      wallet: '0x742C4B3B7fD3b2c8F5B9c9F12345c67890AbCdEf',
      color: 'text-blue-500'
    },
    {
      id: 'usdt',
      name: 'Tether USDT',
      symbol: 'USDT',
      rate: 1,
      wallet: 'TYDzsYUEpvnYmQk4zGP9sWdRvDw4d8pQzB',
      color: 'text-green-500'
    },
    {
      id: 'usdc',
      name: 'USD Coin',
      symbol: 'USDC',
      rate: 1,
      wallet: '0x8b3192f5eEBD8579568A2Ed41E6FEB402f93f73F',
      color: 'text-blue-600'
    }
  ];

  const selectedCurrency = cryptoCurrencies.find(c => c.id === selectedCrypto);

  useEffect(() => {
    if (selectedCurrency) {
      // Convert EGP to USD (assuming 1 USD = 30 EGP)
      const usdAmount = amount / 30;
      const cryptoAmount = usdAmount / selectedCurrency.rate;
      setCryptoAmount(cryptoAmount);
      setWalletAddress(selectedCurrency.wallet);
    }
  }, [selectedCrypto, amount, selectedCurrency]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "تم النسخ",
      description: `تم نسخ ${label} إلى الحافظة`,
    });
  };

  const simulatePayment = () => {
    setPaymentStatus('confirming');
    
    // محاكاة تأكيد المعاملة
    setTimeout(() => {
      const isSuccess = Math.random() > 0.15; // 85% نسبة نجاح
      const hash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      if (isSuccess) {
        setTransactionHash(hash);
        setPaymentStatus('success');
        onSuccess(hash);
        toast({
          title: "تم تأكيد الدفع",
          description: "تم استلام الدفعة بالعملة الرقمية بنجاح",
        });
      } else {
        setPaymentStatus('error');
        onError('فشل في تأكيد المعاملة على البلوك تشين');
      }
    }, 3000);
  };

  const resetPayment = () => {
    setPaymentStatus('pending');
    setTransactionHash('');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-purple-600" />
          دفع بالعملات الرقمية
          <Badge variant="outline" className="mr-auto">
            <TrendingUp className="h-3 w-3 ml-1" />
            آمن
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-purple-600">{amount.toFixed(2)} ج.م</div>
          <div className="text-sm text-gray-600">المبلغ المطلوب</div>
        </div>

        {paymentStatus === 'pending' && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">اختر العملة الرقمية</label>
              <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cryptoCurrencies.map((crypto) => (
                    <SelectItem key={crypto.id} value={crypto.id}>
                      <div className="flex items-center gap-2">
                        <span className={`text-lg ${crypto.color}`}>{crypto.icon}</span>
                        <span>{crypto.name}</span>
                        <Badge variant="secondary">{crypto.symbol}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCurrency && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${selectedCurrency.color} mb-1`}>
                      {cryptoAmount.toFixed(8)} {selectedCurrency.symbol}
                    </div>
                    <div className="text-sm text-gray-600">
                      بسعر ${selectedCurrency.rate.toLocaleString()} لكل {selectedCurrency.symbol}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">عنوان المحفظة</label>
                  <div className="flex gap-2">
                    <div className="flex-1 p-2 bg-gray-100 rounded text-xs font-mono break-all">
                      {walletAddress}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(walletAddress, 'عنوان المحفظة')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">تعليمات الدفع:</h4>
                  <ol className="text-sm text-blue-700 space-y-1">
                    <li>1. انسخ عنوان المحفظة أعلاه</li>
                    <li>2. أرسل المبلغ المحدد من محفظتك</li>
                    <li>3. انقر على "تأكيد الإرسال" بعد الإرسال</li>
                    <li>4. انتظر تأكيد المعاملة (2-10 دقائق)</li>
                  </ol>
                </div>

                <Button 
                  onClick={simulatePayment}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  تأكيد إرسال {selectedCurrency.symbol}
                </Button>
              </div>
            )}
          </>
        )}

        {paymentStatus === 'confirming' && (
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
            <div>
              <h3 className="text-lg font-semibold">جاري تأكيد المعاملة...</h3>
              <p className="text-sm text-gray-600">يرجى الانتظار بينما نتحقق من البلوك تشين</p>
              <div className="mt-2 text-xs text-purple-600">
                عادة ما يستغرق 2-10 دقائق للتأكيد
              </div>
            </div>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-green-600">تم تأكيد الدفع!</h3>
              <p className="text-sm text-gray-600">
                تم استلام {cryptoAmount.toFixed(8)} {selectedCurrency?.symbol}
              </p>
              {transactionHash && (
                <div className="mt-2">
                  <button
                    onClick={() => copyToClipboard(transactionHash, 'hash المعاملة')}
                    className="text-xs text-blue-600 hover:underline font-mono"
                  >
                    {transactionHash.slice(0, 20)}...
                  </button>
                </div>
              )}
            </div>
            <Button onClick={resetPayment} variant="outline" className="w-full">
              عملية جديدة
            </Button>
          </div>
        )}

        {paymentStatus === 'error' && (
          <div className="text-center space-y-4">
            <XCircle className="h-16 w-16 text-red-600 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-red-600">فشل في التأكيد</h3>
              <p className="text-sm text-gray-600">لم نتمكن من تأكيد استلام المعاملة</p>
            </div>
            <Button onClick={resetPayment} variant="outline" className="w-full">
              إعادة المحاولة
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CryptoPayment;
