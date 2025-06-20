
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { paymentService, Transaction } from '@/services/payment/paymentService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, DollarSign, TrendingUp, Users, Calendar, Filter } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import StatsCards from './Payments/StatsCards';
import FilterControls from './Payments/FilterControls';
import TransactionsTable from './Payments/TransactionsTable';
import TransactionCard from './Payments/TransactionCard';
import { PaymentStat } from './Payments/types';

const PaymentsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const isMobile = useIsMobile();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => paymentService.getTransactions({ limit: 100 }),
  });

  const { data: paymentStats } = useQuery({
    queryKey: ['payment-stats'],
    queryFn: paymentService.getPaymentStats,
  });

  const { data: paymentMethods = [] } = useQuery({
    queryKey: ['payment-methods'],
    queryFn: paymentService.getPaymentMethods,
  });

  const stats: PaymentStat[] = [
    {
      title: 'إجمالي الإيرادات',
      value: `${paymentStats?.totalRevenue?.toLocaleString() || 0} ريال`,
      change: '+12.5%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      trend: 'up'
    },
    {
      title: 'إجمالي المعاملات',
      value: paymentStats?.totalTransactions?.toString() || '0',
      change: '+8.2%',
      icon: CreditCard,
      color: 'from-blue-500 to-cyan-600',
      trend: 'up'
    },
    {
      title: 'المعاملات المعلقة',
      value: paymentStats?.pendingTransactions?.toString() || '0',
      change: '-5.1%',
      icon: Calendar,
      color: 'from-orange-500 to-amber-600',
      trend: 'down'
    },
    {
      title: 'العملاء النشطون',
      value: new Set(transactions.map(t => t.customer_email)).size.toString(),
      change: '+15.3%',
      icon: Users,
      color: 'from-purple-500 to-violet-600',
      trend: 'up'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusMap = {
      completed: { label: 'مكتمل', className: 'bg-green-100 text-green-800' },
      pending: { label: 'معلق', className: 'bg-yellow-100 text-yellow-800' },
      failed: { label: 'فشل', className: 'bg-red-100 text-red-800' },
      refunded: { label: 'مُسترد', className: 'bg-gray-100 text-gray-800' },
      cancelled: { label: 'ملغي', className: 'bg-gray-100 text-gray-800' }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || { label: status, className: 'bg-gray-100 text-gray-800' };
    return <Badge className={statusInfo.className}>{statusInfo.label}</Badge>;
  };

  const getPaymentMethodIcon = (method: string) => {
    const methodMap = {
      'credit_card': { label: 'بطاقة ائتمانية', icon: '💳' },
      'debit_card': { label: 'بطاقة خصم', icon: '💳' },
      'bank_transfer': { label: 'حوالة بنكية', icon: '🏦' },
      'wallet': { label: 'محفظة إلكترونية', icon: '📱' },
      'cash': { label: 'نقدي', icon: '💵' }
    };
    
    const methodInfo = methodMap[method as keyof typeof methodMap] || { label: method, icon: '💳' };
    return (
      <div className="flex items-center gap-2">
        <span>{methodInfo.icon}</span>
        <span className="text-sm">{methodInfo.label}</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>جاري تحميل بيانات المدفوعات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <CreditCard className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold">لوحة تحكم المدفوعات</h1>
      </div>

      <StatsCards stats={stats} />

      <FilterControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>آخر المعاملات</span>
            <Badge variant="outline">{filteredTransactions.length} معاملة</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isMobile ? (
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={{
                    id: transaction.id,
                    customer: transaction.customer_name || 'عميل غير محدد',
                    email: transaction.customer_email || '',
                    amount: `${transaction.amount} ${transaction.currency}`,
                    status: transaction.status,
                    method: transaction.payment_method_name || 'غير محدد',
                    service: transaction.service_name || 'غير محدد',
                    date: new Date(transaction.created_at).toLocaleDateString('ar-SA')
                  }}
                  getStatusBadge={getStatusBadge}
                  getPaymentMethodIcon={getPaymentMethodIcon}
                />
              ))}
            </div>
          ) : (
            <TransactionsTable
              transactions={filteredTransactions.map(transaction => ({
                id: transaction.id,
                customer: transaction.customer_name || 'عميل غير محدد',
                email: transaction.customer_email || '',
                amount: `${transaction.amount} ${transaction.currency}`,
                status: transaction.status,
                method: transaction.payment_method_name || 'غير محدد',
                service: transaction.service_name || 'غير محدد',
                date: new Date(transaction.created_at).toLocaleDateString('ar-SA')
              }))}
              getStatusBadge={getStatusBadge}
              getPaymentMethodIcon={getPaymentMethodIcon}
            />
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>طرق الدفع المتاحة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${method.is_active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="font-medium">{method.name}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    رسوم: {method.fees_percentage}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>الإحصائيات السريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>معدل النجاح</span>
                <span className="font-bold text-green-600">
                  {paymentStats ? Math.round((paymentStats.completedTransactions / paymentStats.totalTransactions) * 100) : 0}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>إجمالي المستردات</span>
                <span className="font-bold text-red-600">{paymentStats?.refundedAmount || 0} ريال</span>
              </div>
              <div className="flex justify-between">
                <span>متوسط قيمة المعاملة</span>
                <span className="font-bold">
                  {paymentStats && paymentStats.totalTransactions > 0 
                    ? Math.round(paymentStats.totalRevenue / paymentStats.totalTransactions) 
                    : 0} ريال
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentsDashboard;
