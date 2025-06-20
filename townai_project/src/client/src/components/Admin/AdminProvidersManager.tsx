import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Globe, RefreshCw } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ProviderFormValues } from '@/lib/validators';
import ProviderForm from './Providers/ProviderForm';
import ProvidersTable from './Providers/ProvidersTable';
import ProviderStats from './Providers/ProviderStats';
import { realProvidersService, Provider } from '@/services/admin/realProvidersService';
import AdminProviderServicesManager from './AdminProviderServicesManager';

const AdminProvidersManager = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [syncingProvider, setSyncingProvider] = useState<string | null>(null);
  const [servicesManagerProvider, setServicesManagerProvider] = useState<Provider | null>(null);
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();

  const { data: providers = [], isLoading } = useQuery({
    queryKey: ['providers'],
    queryFn: realProvidersService.getProviders,
  });

  const { data: stats } = useQuery({
    queryKey: ['providerStats'],
    queryFn: realProvidersService.getProviderStats,
  });

  const createMutation = useMutation({
    mutationFn: realProvidersService.createProvider,
    onSuccess: () => {
      toast.success('تم إنشاء المورد بنجاح!');
      queryClient.invalidateQueries({ queryKey: ['providers'] });
      queryClient.invalidateQueries({ queryKey: ['providerStats'] });
      setIsFormOpen(false);
      setSelectedProvider(null);
    },
    onError: (error: Error) => {
      toast.error(`حدث خطأ أثناء إنشاء المورد: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Partial<Provider>) => 
      realProvidersService.updateProvider(id, data),
    onSuccess: () => {
      toast.success('تم تحديث المورد بنجاح!');
      queryClient.invalidateQueries({ queryKey: ['providers'] });
      queryClient.invalidateQueries({ queryKey: ['providerStats'] });
      setIsFormOpen(false);
      setSelectedProvider(null);
    },
    onError: (error: Error) => {
      toast.error(`حدث خطأ أثناء تحديث المورد: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: realProvidersService.deleteProvider,
    onSuccess: () => {
      toast.success('تم حذف المورد بنجاح!');
      queryClient.invalidateQueries({ queryKey: ['providers'] });
      queryClient.invalidateQueries({ queryKey: ['providerStats'] });
    },
    onError: (error: Error) => {
      toast.error(`حدث خطأ أثناء حذف المورد: ${error.message}`);
    },
  });

  const syncMutation = useMutation({
    mutationFn: realProvidersService.syncProviderServices,
    onSuccess: (syncLog) => {
      toast.success(`تم مزامنة الخدمات بنجاح! تم تحديث ${syncLog.details?.updatedServices || 0} خدمة وإضافة ${syncLog.details?.newServices || 0} خدمة جديدة`);
      queryClient.invalidateQueries({ queryKey: ['providerServices'] });
      setSyncingProvider(null);
    },
    onError: (error: Error) => {
      toast.error(`فشل في مزامنة الخدمات: ${error.message}`);
      setSyncingProvider(null);
    },
  });

  const handleFormSubmit = (values: ProviderFormValues) => {
    if (selectedProvider) {
      updateMutation.mutate({ id: selectedProvider.id, ...values });
    } else {
      createMutation.mutate(values);
    }
  };

  const handleEdit = (provider: Provider) => {
    setSelectedProvider(provider);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المورد؟ سيؤدي هذا إلى حذف جميع خدماته أيضاً.')) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleStatus = (provider: Provider) => {
    updateMutation.mutate({ 
      id: provider.id, 
      is_active: !provider.is_active 
    });
  };

  const handleSync = (providerId: string) => {
    setSyncingProvider(providerId);
    syncMutation.mutate(providerId);
  };

  const handleOpenForm = (provider: Provider | null = null) => {
    setSelectedProvider(provider);
    setIsFormOpen(true);
  };

  // تحويل البيانات إلى التنسيق المطلوب للجدول
  const formattedProviders = providers.map(provider => ({
    id: provider.id,
    name: provider.name,
    description: provider.description || 'لا يوجد وصف',
    api_url: provider.api_url,
    api_key: provider.api_key,
    is_active: provider.is_active,
    servicesCount: 0, // سيتم تحديثه من API منفصل
    activeServicesCount: 0, // سيتم تحديثه من API منفصل
    added_at: provider.added_at,
    settings: provider.settings
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl">
              <Globe className="h-6 w-6 text-white" />
            </div>
            إدارة الموردين
          </h1>
          <p className="text-gray-600 mt-2">إضافة وتعديل وإدارة موردي الخدمات.</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => queryClient.invalidateQueries({ queryKey: ['providers'] })}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            تحديث
          </Button>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenForm()} className="bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                مورد جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{selectedProvider ? 'تحرير المورد' : 'إضافة مورد جديد'}</DialogTitle>
              </DialogHeader>
              <ProviderForm
                onSubmit={handleFormSubmit}
                initialData={selectedProvider}
                isLoading={createMutation.isPending || updateMutation.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {stats && <ProviderStats providers={formattedProviders} />}

      <ProvidersTable
        providers={formattedProviders}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onSync={handleSync}
        isMobile={isMobile}
        syncingProvider={syncingProvider}
        isLoading={isLoading}
        onManageServices={setServicesManagerProvider}
      />
      {servicesManagerProvider && (
        <AdminProviderServicesManager
          provider={servicesManagerProvider}
          onClose={() => setServicesManagerProvider(null)}
        />
      )}
    </div>
  );
};

export default AdminProvidersManager;
