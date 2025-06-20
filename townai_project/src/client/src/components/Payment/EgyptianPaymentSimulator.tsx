
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  CreditCard, 
  Banknote, 
  Building, 
  Wallet,
  QrCode
} from 'lucide-react';
import WalletPaymentSimulator from './WalletPaymentSimulator';
import FawryPaymentSimulator from './FawryPaymentSimulator';
import CardPaymentSimulator from './CardPaymentSimulator';
import BankTransferSimulator from './BankTransferSimulator';
import BalancePaymentSimulator from './BalancePaymentSimulator';

interface EgyptianPaymentSimulatorProps {
  amount: number;
  onPaymentSuccess: (transactionData: any) => void;
  onPaymentError: (error: string) => void;
}

const EgyptianPaymentSimulator: React.FC<EgyptianPaymentSimulatorProps> = ({
  amount,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [selectedMethod, setSelectedMethod] = useState('wallet');
  const [stats, setStats] = useState({
    totalTransactions: 0,
    successfulTransactions: 0,
    failedTransactions: 0
  });

  const paymentMethods = [
    {
      id: 'wallet',
      name: 'المحافظ الإلكترونية',
      icon: Smartphone,
      description: 'فودافون، اتصالات، أورانج، WE',
      color: 'bg-blue-600',
      popularity: 95
    },
    {
      id: 'fawry',
      name: 'فوري',
      icon: Building,
      description: 'دفع نقدي في الفروع',
      color: 'bg-orange-600',
      popularity: 85
    },
    {
      id: 'card',
      name: 'البطاقات الائتمانية',
      icon: CreditCard,
      description: 'فيزا وماستركارد',
      color: 'bg-purple-600',
      popularity: 70
    },
    {
      id: 'bank',
      name: 'تحويل بنكي',
      icon: Banknote,
      description: 'من البنك مباشرة',
      color: 'bg-green-600',
      popularity: 60
    },
    {
      id: 'balance',
      name: 'الرصيد الداخلي',
      icon: Wallet,
      description: 'من رصيدك في الموقع',
      color: 'bg-indigo-600',
      popularity: 80
    }
  ];

  const handleMethodSuccess = (transactionData: any) => {
    setStats(prev => ({
      ...prev,
      totalTransactions: prev.totalTransactions + 1,
      successfulTransactions: prev.successfulTransactions + 1
    }));
    onPaymentSuccess({
      ...transactionData,
      method: selectedMethod,
      timestamp: new Date().toISOString()
    });
  };

  const handleMethodError = (error: string) => {
    setStats(prev => ({
      ...prev,
      totalTransactions: prev.totalTransactions + 1,
      failedTransactions: prev.failedTransactions + 1
    }));
    onPaymentError(error);
  };

  return (
    <div className="space-y-6">
      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalTransactions}</div>
            <div className="text-sm text-gray-600">إجمالي المعاملات</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.successfulTransactions}</div>
            <div className="text-sm text-gray-600">نجحت</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.failedTransactions}</div>
            <div className="text-sm text-gray-600">فشلت</div>
          </CardContent>
        </Card>
      </div>

      {/* معلومات المبلغ */}
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{amount.toFixed(2)} ج.م</div>
            <div className="text-sm text-gray-600">المبلغ المطلوب دفعه</div>
          </div>
        </CardContent>
      </Card>

      {/* اختيار طريقة الدفع */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            اختر طريقة الدفع
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedMethod} onValueChange={setSelectedMethod}>
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
              {paymentMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <TabsTrigger 
                    key={method.id} 
                    value={method.id}
                    className="flex flex-col gap-2 h-20 relative"
                  >
                    <IconComponent className="h-6 w-6" />
                    <span className="text-xs text-center leading-tight">{method.name}</span>
                    <Badge variant="secondary" className="absolute -top-1 -right-1 text-xs px-1">
                      {method.popularity}%
                    </Badge>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <div className="mt-6">
              {paymentMethods.map((method) => (
                <TabsContent key={method.id} value={method.id}>
                  <Card>
                    <CardHeader>
                      <div className={`flex items-center gap-3 text-white p-4 rounded-lg ${method.color}`}>
                        <method.icon className="h-6 w-6" />
                        <div className="flex-1">
                          <div className="font-semibold">{method.name}</div>
                          <div className="text-sm opacity-90">{method.description}</div>
                        </div>
                        <Badge variant="secondary" className="bg-white/20 text-white">
                          شائع {method.popularity}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {method.id === 'wallet' && (
                        <WalletPaymentSimulator 
                          amount={amount}
                          onSuccess={handleMethodSuccess}
                          onError={handleMethodError}
                        />
                      )}
                      {method.id === 'fawry' && (
                        <FawryPaymentSimulator 
                          amount={amount}
                          onSuccess={handleMethodSuccess}
                          onError={handleMethodError}
                        />
                      )}
                      {method.id === 'card' && (
                        <CardPaymentSimulator 
                          amount={amount}
                          onSuccess={handleMethodSuccess}
                          onError={handleMethodError}
                        />
                      )}
                      {method.id === 'bank' && (
                        <BankTransferSimulator 
                          amount={amount}
                          onSuccess={handleMethodSuccess}
                          onError={handleMethodError}
                        />
                      )}
                      {method.id === 'balance' && (
                        <BalancePaymentSimulator 
                          amount={amount}
                          onSuccess={handleMethodSuccess}
                          onError={handleMethodError}
                        />
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EgyptianPaymentSimulator;
