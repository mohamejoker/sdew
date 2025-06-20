
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  RefreshCw, 
  Search, 
  Clock, 
  CheckCircle, 
  XCircle, 
  DollarSign,
  Calendar,
  Filter
} from 'lucide-react';
import { Transaction, paymentService } from '@/services/payment/paymentService';
import { useToast } from '@/hooks/use-toast';

interface RefundRequest {
  transactionId: string;
  amount: number;
  reason: string;
  transaction: Transaction;
}

const RefundSystem = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [refundAmount, setRefundAmount] = useState<number>(0);
  const [refundReason, setRefundReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const data = await paymentService.getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل المعاملات",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.reference_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer_email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const refundableTransactions = filteredTransactions.filter(t => 
    t.status === 'completed' || t.status === 'pending'
  );

  const handleSelectTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setRefundAmount(transaction.amount);
    setRefundReason('');
  };

  const processRefund = async () => {
    if (!selectedTransaction || !refundAmount || !refundReason.trim()) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    if (refundAmount > selectedTransaction.amount) {
      toast({
        title: "مبلغ خاطئ",
        description: "مبلغ الاسترداد لا يمكن أن يتجاوز مبلغ المعاملة",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // تحديث حالة المعاملة
      await paymentService.updateTransactionStatus(
        selectedTransaction.id, 
        refundAmount === selectedTransaction.amount ? 'refunded' : 'completed',
        {
          metadata: {
            ...selectedTransaction.metadata,
            refund: {
              amount: refundAmount,
              reason: refundReason,
              processed_at: new Date().toISOString(),
              partial: refundAmount < selectedTransaction.amount
            }
          }
        }
      );

      toast({
        title: "تم الاسترداد بنجاح",
        description: `تم استرداد ${refundAmount} ${selectedTransaction.currency}`,
      });

      // إعادة تحديث البيانات
      await fetchTransactions();
      setSelectedTransaction(null);
      setRefundAmount(0);
      setRefundReason('');

    } catch (error) {
      console.error('Error processing refund:', error);
      toast({
        title: "خطأ في الاسترداد",
        description: "فشل في معالجة طلب الاسترداد",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: any } = {
      completed: 'default',
      pending: 'secondary',
      failed: 'destructive',
      refunded: 'outline'
    };

    const labels: { [key: string]: string } = {
      completed: 'مكتمل',
      pending: 'معلق',
      failed: 'فاشل',
      refunded: 'مسترد'
    };

    return (
      <Badge variant={variants[status] || 'secondary'}>
        {labels[status] || status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">نظام الاستردادات</h2>
          <p className="text-gray-600">إدارة طلبات الاسترداد والمرتجعات</p>
        </div>
        <Badge variant="outline">
          {refundableTransactions.length} معاملة قابلة للاسترداد
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* قائمة المعاملات */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              المعاملات القابلة للاسترداد
            </CardTitle>
            
            <div className="flex gap-4 mt-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="البحث بالرقم المرجعي أو اسم العميل..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 ml-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                  <SelectItem value="pending">معلق</SelectItem>
                  <SelectItem value="refunded">مسترد</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : refundableTransactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                لا توجد معاملات قابلة للاسترداد
              </div>
            ) : (
              <div className="space-y-3">
                {refundableTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    onClick={() => handleSelectTransaction(transaction)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedTransaction?.id === transaction.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {transaction.reference_id || transaction.id.slice(0, 8)}
                          </span>
                          {getStatusBadge(transaction.status)}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {transaction.customer_name || 'عميل غير مسجل'}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 font-semibold">
                          <DollarSign className="h-4 w-4" />
                          {transaction.amount.toFixed(2)} {transaction.currency}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {new Date(transaction.created_at).toLocaleDateString('ar-SA')}
                        </div>
                      </div>
                    </div>
                    
                    {transaction.service_name && (
                      <p className="text-sm text-gray-600">{transaction.service_name}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* نموذج الاسترداد */}
        <Card>
          <CardHeader>
            <CardTitle>معالجة الاسترداد</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedTransaction ? (
              <>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">المعاملة المحددة</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>الرقم المرجعي:</span>
                      <span>{selectedTransaction.reference_id || 'غير متوفر'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>المبلغ الأصلي:</span>
                      <span>{selectedTransaction.amount.toFixed(2)} {selectedTransaction.currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>الحالة:</span>
                      {getStatusBadge(selectedTransaction.status)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="refund-amount">مبلغ الاسترداد</Label>
                  <Input
                    id="refund-amount"
                    type="number"
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(Number(e.target.value))}
                    max={selectedTransaction.amount}
                    min={0}
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500">
                    الحد الأقصى: {selectedTransaction.amount.toFixed(2)} {selectedTransaction.currency}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="refund-reason">سبب الاسترداد</Label>
                  <Textarea
                    id="refund-reason"
                    value={refundReason}
                    onChange={(e) => setRefundReason(e.target.value)}
                    placeholder="اكتب سبب الاسترداد..."
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={processRefund}
                  disabled={isProcessing || !refundAmount || !refundReason.trim()}
                  className="w-full"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      جاري المعالجة...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      معالجة الاسترداد
                    </div>
                  )}
                </Button>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                اختر معاملة من القائمة لبدء عملية الاسترداد
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RefundSystem;
