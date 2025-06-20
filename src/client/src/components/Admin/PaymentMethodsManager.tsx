
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  CreditCard, Plus, Edit, Trash2, Eye, EyeOff, 
  Settings, DollarSign, Clock, Smartphone, Wallet
} from 'lucide-react';
import { toast } from 'sonner';
import PaymentMethodForm from './Payments/PaymentMethodForm';

const PaymentMethodsManager = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<any>(null);
  const queryClient = useQueryClient();

  // جلب طرق الدفع
  const { data: paymentMethods = [], isLoading } = useQuery({
    queryKey: ['payment-methods-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // إضافة/تحديث طريقة دفع
  const saveMethodMutation = useMutation({
    mutationFn: async (methodData: any) => {
      if (selectedMethod) {
        const { data, error } = await supabase
          .from('payment_methods')
          .update({
            ...methodData,
            updated_at: new Date().toISOString()
          })
          .eq('id', selectedMethod.id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('payment_methods')
          .insert(methodData)
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods-admin'] });
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      toast.success(selectedMethod ? 'تم تحديث طريقة الدفع' : 'تم إضافة طريقة الدفع');
      setIsFormOpen(false);
      setSelectedMethod(null);
    },
    onError: (error) => {
      toast.error(`خطأ: ${error.message}`);
    }
  });

  // حذف طريقة دفع
  const deleteMethodMutation = useMutation({
    mutationFn: async (methodId: string) => {
      const { error } = await supabase
        .from('payment_methods')
        .delete()
        .eq('id', methodId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods-admin'] });
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      toast.success('تم حذف طريقة الدفع');
    },
    onError: (error) => {
      toast.error(`خطأ في الحذف: ${error.message}`);
    }
  });

  // تغيير حالة طريقة الدفع
  const toggleStatusMutation = useMutation({
    mutationFn: async (method: any) => {
      const { error } = await supabase
        .from('payment_methods')
        .update({ 
          is_active: !method.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', method.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods-admin'] });
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      toast.success('تم تحديث حالة طريقة الدفع');
    },
    onError: (error) => {
      toast.error(`خطأ: ${error.message}`);
    }
  });

  const handleOpenForm = (method: any = null) => {
    setSelectedMethod(method);
    setIsFormOpen(true);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'card': return <CreditCard className="h-5 w-5" />;
      case 'wallet': return <Smartphone className="h-5 w-5" />;
      case 'bank': return <DollarSign className="h-5 w-5" />;
      default: return <Wallet className="h-5 w-5" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'card': return 'بطاقة';
      case 'wallet': return 'محفظة';
      case 'bank': return 'بنك';
      case 'crypto': return 'عملة رقمية';
      default: return type;
    }
  };

  if (isLoading) {
    return <div className="text-center p-8">جاري تحميل طرق الدفع...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            إدارة طرق الدفع
          </h1>
          <p className="text-gray-600 mt-2">إدارة وتكوين طرق الدفع المتاحة</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenForm()} className="bg-gradient-to-r from-green-500 to-emerald-600 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              طريقة دفع جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedMethod ? 'تحرير طريقة الدفع' : 'إضافة طريقة دفع جديدة'}
              </DialogTitle>
            </DialogHeader>
            <PaymentMethodForm
              method={selectedMethod}
              onSubmit={(data) => saveMethodMutation.mutate(data)}
              onCancel={() => setIsFormOpen(false)}
              isLoading={saveMethodMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الطرق</p>
                <p className="text-3xl font-bold text-gray-900">{paymentMethods.length}</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الطرق النشطة</p>
                <p className="text-3xl font-bold text-green-600">
                  {paymentMethods.filter(m => m.is_active).length}
                </p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط الرسوم</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {paymentMethods.length > 0 
                    ? (paymentMethods.reduce((sum, m) => sum + (m.fees_percentage || 0), 0) / paymentMethods.length).toFixed(1)
                    : 0}%
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المعطلة</p>
                <p className="text-3xl font-bold text-red-600">
                  {paymentMethods.filter(m => !m.is_active).length}
                </p>
              </div>
              <EyeOff className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* قائمة طرق الدفع */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="shadow-sm hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(method.type)}
                  <span>{method.name}</span>
                </div>
                <Badge className={method.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                  {method.is_active ? 'نشط' : 'معطل'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">النوع:</span>
                  <span className="font-medium ml-1">{getTypeName(method.type)}</span>
                </div>
                <div>
                  <span className="text-gray-500">الرسوم:</span>
                  <span className="font-medium ml-1">{method.fees_percentage}%</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">وقت المعالجة:</span>
                  <span className="font-medium ml-1">{method.processing_time}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button size="sm" variant="outline" onClick={() => handleOpenForm(method)} className="flex-1">
                  <Edit className="h-3 w-3 mr-1" />
                  تحرير
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => toggleStatusMutation.mutate(method)}
                >
                  {method.is_active ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => deleteMethodMutation.mutate(method.id)}
                  className="text-red-600"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {paymentMethods.length === 0 && (
        <Card className="text-center p-8">
          <CardContent>
            <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد طرق دفع</h3>
            <p className="text-gray-600 mb-4">ابدأ بإضافة طريقة دفع جديدة</p>
            <Button onClick={() => handleOpenForm()} className="bg-gradient-to-r from-green-500 to-emerald-600">
              <Plus className="h-4 w-4 mr-2" />
              إضافة طريقة دفع
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaymentMethodsManager;
