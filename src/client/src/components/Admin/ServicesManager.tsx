
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceService, Service } from '@/services/serviceService';
import { ServiceFormValues } from '@/lib/validators';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Package, Plus, Edit, Trash2, Eye, EyeOff, Star, Loader2, BarChart3 } from 'lucide-react';
import ServiceForm from './ServiceForm';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const ServicesManager = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const queryClient = useQueryClient();

  const { data: services = [], isLoading, isError } = useQuery({
    queryKey: ['services'],
    queryFn: serviceService.getServices,
  });

  const { data: stats } = useQuery({
    queryKey: ['serviceStats'],
    queryFn: serviceService.getServiceStats,
  });

  const mutationOptions = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['serviceStats'] });
      queryClient.invalidateQueries({ queryKey: ['activeServices'] });
      setIsFormOpen(false);
      setSelectedService(null);
    },
    onError: (error: Error) => {
      toast.error(`حدث خطأ: ${error.message}`);
    },
  };

  const createMutation = useMutation({
    mutationFn: serviceService.createService,
    onSuccess: () => {
      toast.success('تم إنشاء الخدمة بنجاح!');
      mutationOptions.onSuccess();
    },
    onError: mutationOptions.onError,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: Partial<ServiceFormValues> }) => serviceService.updateService(id, values),
    onSuccess: () => {
      toast.success('تم تحديث الخدمة بنجاح!');
      mutationOptions.onSuccess();
    },
    onError: mutationOptions.onError,
  });

  const deleteMutation = useMutation({
    mutationFn: serviceService.deleteService,
    onSuccess: () => {
      toast.success('تم حذف الخدمة بنجاح!');
      mutationOptions.onSuccess();
    },
    onError: mutationOptions.onError,
  });

  const handleFormSubmit = (values: ServiceFormValues) => {
    if (selectedService) {
      updateMutation.mutate({ id: selectedService.id, values });
    } else {
      createMutation.mutate(values);
    }
  };
  
  const handleOpenForm = (service: Service | null = null) => {
    setSelectedService(service);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedService(null);
  };

  const isMutating = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
              <Package className="h-6 w-6 text-white" />
            </div>
            إدارة الخدمات
          </h1>
          <p className="text-gray-600 mt-2">إضافة وتعديل وحذف خدمات المنصة.</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenForm()} className="bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              خدمة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedService ? 'تحرير الخدمة' : 'إنشاء خدمة جديدة'}</DialogTitle>
            </DialogHeader>
            <ServiceForm
              onSubmit={handleFormSubmit}
              onClose={handleCloseForm}
              initialData={selectedService}
              isLoading={createMutation.isPending || updateMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الخدمات</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الخدمات النشطة</CardTitle>
              <Eye className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الخدمات المميزة</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.popular}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {isLoading && <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-indigo-500" /></div>}
      {isError && <div className="text-red-500 text-center p-4">حدث خطأ أثناء جلب الخدمات.</div>}

      {/* Services Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="shadow-sm hover:shadow-lg transition-shadow flex flex-col">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span className="text-lg font-semibold text-gray-800">{service.title}</span>
                 <Badge variant={service.is_active ? "default" : "secondary"} className={service.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {service.is_active ? 'نشط' : 'مخفي'}
                </Badge>
              </CardTitle>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-indigo-600">{service.price}</p>
                {service.is_popular && <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1"><Star className="h-3 w-3"/>مميزة</Badge>}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {service.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <div className="w-1 h-1 bg-indigo-500 rounded-full"></div>
                    {feature}
                  </li>
                ))}
                {service.features.length > 3 && (
                  <li className="text-sm text-gray-400">+ {service.features.length - 3} ميزة أخرى</li>
                )}
              </ul>
            </CardContent>
            <CardFooter className="flex gap-2 pt-4">
              <Button size="sm" variant="outline" onClick={() => handleOpenForm(service)} className="flex-1">
                <Edit className="h-4 w-4 ml-1" /> تحرير
              </Button>
               <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="destructive" className="flex-1 bg-red-500 hover:bg-red-600">
                    <Trash2 className="h-4 w-4 ml-1" /> حذف
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>هل أنت متأكد تماماً؟</AlertDialogTitle>
                    <AlertDialogDescription>
                      هذا الإجراء لا يمكن التراجع عنه. سيؤدي هذا إلى حذف الخدمة بشكل دائم.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteMutation.mutate(service.id)} className="bg-red-600 hover:bg-red-700">
                      نعم، قم بالحذف
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button size="sm" variant="outline" onClick={() => updateMutation.mutate({ id: service.id, values: { is_active: !service.is_active } })}>
                {service.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button size="sm" variant="outline" onClick={() => updateMutation.mutate({ id: service.id, values: { is_popular: !service.is_popular } })}>
                <Star className={`h-4 w-4 ${service.is_popular ? 'text-yellow-500 fill-current' : ''}`} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServicesManager;
