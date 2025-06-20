import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Package, Plus, Search, Edit, Trash2, 
  Eye, EyeOff, TrendingUp, Star,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ServiceForm from '@/components/Admin/ServiceForm';
import { toast } from 'sonner';

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const queryClient = useQueryClient();

  const { data: services, isLoading } = useQuery({
    queryKey: ['admin-services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  const { data: serviceStats } = useQuery({
    queryKey: ['service-stats'],
    queryFn: async () => {
      const { count: totalServices } = await supabase
        .from('services')
        .select('*', { count: 'exact', head: true });

      const { count: activeServices } = await supabase
        .from('services')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      const { count: popularServices } = await supabase
        .from('services')
        .select('*', { count: 'exact', head: true })
        .eq('is_popular', true);

      return {
        totalServices: totalServices || 0,
        activeServices: activeServices || 0,
        popularServices: popularServices || 0,
        inactiveServices: (totalServices || 0) - (activeServices || 0)
      };
    }
  });

  const toggleServiceStatus = useMutation({
    mutationFn: async ({ id, is_active }: { id: string, is_active: boolean }) => {
      const { error } = await supabase
        .from('services')
        .update({ is_active })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      queryClient.invalidateQueries({ queryKey: ['service-stats'] });
      toast.success('تم تحديث حالة الخدمة بنجاح');
    },
    onError: () => {
      toast.error('حدث خطأ أثناء تحديث الخدمة');
    }
  });

  const deleteService = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      queryClient.invalidateQueries({ queryKey: ['service-stats'] });
      toast.success('تم حذف الخدمة بنجاح');
    },
    onError: () => {
      toast.error('حدث خطأ أثناء حذف الخدمة');
    }
  });

  const filteredServices = services?.filter(service =>
    service.title?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleEdit = (service: any) => {
    setSelectedService(service);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
      deleteService.mutate(id);
    }
  };

  const handleToggleStatus = (id: string, currentStatus: boolean) => {
    toggleServiceStatus.mutate({ id, is_active: !currentStatus });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* العنوان والإحصائيات */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة الخدمات</h1>
          <p className="text-gray-600 mt-2">إدارة وتحرير جميع الخدمات المتاحة</p>
        </div>
        <Button 
          onClick={() => {
            setSelectedService(null);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          إضافة خدمة جديدة
        </Button>
      </div>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الخدمات</p>
                <p className="text-3xl font-bold text-gray-900">{serviceStats?.totalServices || 0}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">خدمات نشطة</p>
                <p className="text-3xl font-bold text-green-600">{serviceStats?.activeServices || 0}</p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">خدمات شائعة</p>
                <p className="text-3xl font-bold text-purple-600">{serviceStats?.popularServices || 0}</p>
              </div>
              <Star className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">خدمات معطلة</p>
                <p className="text-3xl font-bold text-orange-600">{serviceStats?.inactiveServices || 0}</p>
              </div>
              <EyeOff className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* البحث */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="البحث عن الخدمات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* قائمة الخدمات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
                  <p className="text-2xl font-bold text-green-600">{service.price}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant={service.is_active ? "default" : "secondary"}>
                    {service.is_active ? 'نشط' : 'معطل'}
                  </Badge>
                  {service.is_popular && (
                    <Badge variant="outline" className="border-yellow-500 text-yellow-600">
                      <Star className="h-3 w-3 mr-1" />
                      شائع
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {service.features?.slice(0, 3).map((feature: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {service.features?.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{service.features.length - 3}
                    </Badge>
                  )}
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t">
                  <p className="text-xs text-gray-500">
                    آخر تحديث: {new Date(service.updated_at).toLocaleDateString('ar-SA')}
                  </p>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleEdit(service)}>
                        <Edit className="h-4 w-4 mr-2" />
                        تحرير
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleStatus(service.id, service.is_active)}>
                        {service.is_active ? (
                          <>
                            <EyeOff className="h-4 w-4 mr-2" />
                            إلغاء التفعيل
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            تفعيل
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(service.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        حذف
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* نموذج إضافة/تحرير الخدمة */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedService ? 'تحرير الخدمة' : 'إضافة خدمة جديدة'}
            </DialogTitle>
          </DialogHeader>
          <ServiceForm
            service={selectedService}
            onClose={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesPage;
