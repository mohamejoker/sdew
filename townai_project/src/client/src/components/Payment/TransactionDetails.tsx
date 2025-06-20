
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Receipt, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  Download,
  ArrowLeft,
  User,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Transaction, paymentService } from '@/services/payment/paymentService';
import { useToast } from '@/hooks/use-toast';

interface TransactionDetailsProps {
  transactionId: string;
  onBack?: () => void;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({ transactionId, onBack }) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefunding, setIsRefunding] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTransactionDetails();
  }, [transactionId]);

  const fetchTransactionDetails = async () => {
    try {
      setLoading(true);
      const transactions = await paymentService.getTransactions({ limit: 1 });
      const foundTransaction = transactions.find(t => t.id === transactionId);
      
      if (foundTransaction) {
        setTransaction(foundTransaction);
      } else {
        toast({
          title: "خطأ",
          description: "لم يتم العثور على المعاملة",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error fetching transaction:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل تفاصيل المعاملة",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefund = async () => {
    if (!transaction) return;

    setIsRefunding(true);
    try {
      await paymentService.updateTransactionStatus(transaction.id, 'refunded');
      
      toast({
        title: "تم الاسترداد",
        description: "تم استرداد المبلغ بنجاح",
      });
      
      await fetchTransactionDetails();
    } catch (error) {
      console.error('Error processing refund:', error);
      toast({
        title: "خطأ في الاسترداد",
        description: "فشل في معالجة الاسترداد",
        variant: "destructive"
      });
    } finally {
      setIsRefunding(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'refunded':
        return <RefreshCw className="h-5 w-5 text-blue-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: any } = {
      completed: 'default',
      pending: 'secondary',
      failed: 'destructive',
      refunded: 'outline',
      cancelled: 'secondary'
    };

    const labels: { [key: string]: string } = {
      completed: 'مكتمل',
      pending: 'معلق',
      failed: 'فاشل',
      refunded: 'مسترد',
      cancelled: 'ملغي'
    };

    return (
      <Badge variant={variants[status] || 'secondary'}>
        {labels[status] || status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="text-center p-8">
        <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">المعاملة غير موجودة</h3>
        <p className="text-gray-600">لم يتم العثور على المعاملة المطلوبة</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Button>
          )}
          <div>
            <h2 className="text-2xl font-bold">تفاصيل المعاملة</h2>
            <p className="text-gray-600">رقم المرجع: {transaction.reference_id || transaction.id}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {getStatusIcon(transaction.status)}
          {getStatusBadge(transaction.status)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* معلومات المعاملة الأساسية */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              معلومات المعاملة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">المبلغ الإجمالي</label>
                <p className="text-lg font-semibold">{transaction.amount.toFixed(2)} {transaction.currency}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">الرسوم</label>
                <p className="text-lg">{transaction.fees.toFixed(2)} {transaction.currency}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">المبلغ الصافي</label>
                <p className="text-lg font-semibold text-green-600">
                  {(transaction.net_amount || (transaction.amount - transaction.fees)).toFixed(2)} {transaction.currency}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">طريقة الدفع</label>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>{transaction.payment_method_name || 'غير محدد'}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">الخدمة</label>
                <p>{transaction.service_name || 'غير محدد'}</p>
              </div>
              
              {transaction.description && (
                <div>
                  <label className="text-sm font-medium text-gray-600">الوصف</label>
                  <p>{transaction.description}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* معلومات العميل والتوقيت */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                معلومات العميل
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {transaction.customer_name && (
                <div>
                  <label className="text-sm font-medium text-gray-600">الاسم</label>
                  <p>{transaction.customer_name}</p>
                </div>
              )}
              
              {transaction.customer_email && (
                <div>
                  <label className="text-sm font-medium text-gray-600">البريد الإلكتروني</label>
                  <p>{transaction.customer_email}</p>
                </div>
              )}
              
              {!transaction.customer_name && !transaction.customer_email && (
                <p className="text-gray-500">لا توجد معلومات عميل</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                التوقيت
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">تاريخ الإنشاء</label>
                <p>{new Date(transaction.created_at).toLocaleString('ar-SA')}</p>
              </div>
              
              {transaction.processed_at && (
                <div>
                  <label className="text-sm font-medium text-gray-600">تاريخ المعالجة</label>
                  <p>{new Date(transaction.processed_at).toLocaleString('ar-SA')}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* إجراءات */}
          <Card>
            <CardHeader>
              <CardTitle>الإجراءات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 ml-2" />
                تحميل الفاتورة
              </Button>
              
              {transaction.status === 'completed' && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <RefreshCw className="h-4 w-4 ml-2" />
                      طلب استرداد
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>تأكيد الاسترداد</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p>هل أنت متأكد من رغبتك في استرداد هذه المعاملة؟</p>
                      <div className="flex gap-2">
                        <Button 
                          variant="destructive" 
                          onClick={handleRefund}
                          disabled={isRefunding}
                          className="flex-1"
                        >
                          {isRefunding ? 'جاري المعالجة...' : 'تأكيد الاسترداد'}
                        </Button>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="flex-1">
                            إلغاء
                          </Button>
                        </DialogTrigger>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
