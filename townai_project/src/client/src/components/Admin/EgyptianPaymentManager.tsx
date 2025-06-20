
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, CreditCard, Loader2, RefreshCw } from 'lucide-react';
import { egyptianPaymentConfigService, EgyptianPaymentConfig } from '@/services/payment/egyptianPaymentConfigService';
import { toast } from 'sonner';
import EgyptianPaymentCard from './Payments/EgyptianPaymentCard';
import PaymentMethodForm from './Payments/PaymentMethodForm';

const EgyptianPaymentManager = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<EgyptianPaymentConfig | null>(null);
  const queryClient = useQueryClient();

  const { data: configs = [], isLoading, error, refetch } = useQuery({
    queryKey: ['egyptianPaymentConfigs'],
    queryFn: egyptianPaymentConfigService.getPaymentConfigs,
    retry: 3,
    refetchOnWindowFocus: false
  });

  const createMutation = useMutation({
    mutationFn: egyptianPaymentConfigService.createPaymentConfig,
    onSuccess: () => {
      toast.success('تم إنشاء طريقة الدفع بنجاح!');
      queryClient.invalidateQueries({ queryKey: ['egyptianPaymentConfigs'] });
      queryClient.invalidateQueries({ queryKey: ['egyptianPaymentStats'] });
      handleCloseForm();
    },
    onError: (error: Error) => {
      console.error('Error creating payment config:', error);
      toast.error(`حدث خطأ أثناء إنشاء طريقة الدفع: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Partial<EgyptianPaymentConfig>) => 
      egyptianPaymentConfigService.updatePaymentConfig(id, data),
    onSuccess: () => {
      toast.success('تم تحديث طريقة الدفع بنجاح!');
      queryClient.invalidateQueries({ queryKey: ['egyptianPaymentConfigs'] });
      queryClient.invalidateQueries({ queryKey: ['egyptianPaymentStats'] });
      handleCloseForm();
    },
    onError: (error: Error) => {
      console.error('Error updating payment config:', error);
      toast.error(`حدث خطأ أثناء تحديث طريقة الدفع: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: egyptianPaymentConfigService.deletePaymentConfig,
    onSuccess: () => {
      toast.success('تم حذف طريقة الدفع بنجاح!');
      queryClient.invalidateQueries({ queryKey: ['egyptianPaymentConfigs'] });
      queryClient.invalidateQueries({ queryKey: ['egyptianPaymentStats'] });
    },
    onError: (error: Error) => {
      console.error('Error deleting payment config:', error);
      toast.error(`حدث خطأ أثناء حذف طريقة الدفع: ${error.message}`);
    },
  });

  const handleEdit = (config: EgyptianPaymentConfig) => {
    setSelectedConfig(config);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف طريقة الدفع هذه؟')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (data: any) => {
    const configData = {
      ...data,
      prefixes: typeof data.prefixes === 'string' 
        ? data.prefixes.split(',').map((p: string) => p.trim()).filter((p: string) => p)
        : data.prefixes || [],
      fees_percentage: Number(data.fees_percentage) || 0,
      confirmation_timeout: Number(data.confirmation_timeout) || 300
    };

    if (selectedConfig) {
      updateMutation.mutate({ id: selectedConfig.id, ...configData });
    } else {
      createMutation.mutate(configData);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedConfig(null);
  };

  const handleAddNew = () => {
    setSelectedConfig(null);
    setIsFormOpen(true);
  };

  if (error) {
    return (
      <div className="text-center p-8">
        <CreditCard className="h-16 w-16 mx-auto mb-4 text-red-300" />
        <h3 className="text-lg font-medium mb-2 text-red-600">حدث خطأ في تحميل البيانات</h3>
        <p className="text-sm text-gray-500 mb-4">تعذر تحميل طرق الدفع المصرية</p>
        <Button onClick={() => refetch()} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          إعادة المحاولة
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">طرق الدفع المصرية</h2>
          <p className="text-gray-600 mt-1">تخصيص وإدارة طرق الدفع المحلية المصرية</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => refetch()}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            تحديث
          </Button>
          <Button 
            onClick={handleAddNew}
            className="bg-gradient-to-r from-green-500 to-teal-600 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            طريقة دفع جديدة
          </Button>
        </div>
      </div>

      {/* قائمة طرق الدفع */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-green-500" />
            <span className="mr-2">جاري تحميل طرق الدفع...</span>
          </div>
        ) : configs.length === 0 ? (
          <div className="col-span-full text-center p-8">
            <CreditCard className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">لا توجد طرق دفع</h3>
            <p className="text-sm text-gray-500 mb-4">قم بإضافة أول طريقة دفع مصرية.</p>
            <Button onClick={handleAddNew}>
              <Plus className="h-4 w-4 mr-2" />
              إضافة طريقة دفع
            </Button>
          </div>
        ) : (
          configs.map((config) => (
            <EgyptianPaymentCard
              key={config.id}
              config={config}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* نموذج إضافة/تحرير */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedConfig ? 'تحرير طريقة الدفع' : 'إضافة طريقة دفع جديدة'}
            </DialogTitle>
          </DialogHeader>
          <PaymentMethodForm
            method={selectedConfig}
            onSubmit={handleSubmit}
            onCancel={handleCloseForm}
            isLoading={createMutation.isPending || updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EgyptianPaymentManager;
