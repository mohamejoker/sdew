
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';
import { ordersService, ServiceOrder, OrderStats } from '@/services/admin/ordersService';
import { toast } from 'sonner';

const OrdersManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders', statusFilter],
    queryFn: () => ordersService.getOrders(statusFilter !== 'all' ? { status: statusFilter } : {}),
  });

  const { data: stats } = useQuery({
    queryKey: ['orderStats'],
    queryFn: ordersService.getOrderStats,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: ServiceOrder['status'] }) => 
      ordersService.updateOrderStatus(orderId, status),
    onSuccess: () => {
      toast.success('تم تحديث حالة الطلب بنجاح!');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['orderStats'] });
    },
    onError: (error: Error) => {
      toast.error(`حدث خطأ أثناء تحديث الطلب: ${error.message}`);
    },
  });

  const deleteOrderMutation = useMutation({
    mutationFn: ordersService.deleteOrder,
    onSuccess: () => {
      toast.success('تم حذف الطلب بنجاح!');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['orderStats'] });
    },
    onError: (error: Error) => {
      toast.error(`حدث خطأ أثناء حذف الطلب: ${error.message}`);
    },
  });

  const bulkUpdateMutation = useMutation({
    mutationFn: ({ orderIds, status }: { orderIds: string[]; status: ServiceOrder['status'] }) => 
      ordersService.bulkUpdateOrderStatus(orderIds, status),
    onSuccess: () => {
      toast.success('تم تحديث الطلبات المحددة بنجاح!');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['orderStats'] });
      setSelectedOrders([]);
    },
    onError: (error: Error) => {
      toast.error(`حدث خطأ أثناء تحديث الطلبات: ${error.message}`);
    },
  });

  const getStatusBadge = (status: ServiceOrder['status']) => {
    const statusConfig = {
      pending: { label: 'في الانتظار', variant: 'secondary' as const, icon: Clock },
      processing: { label: 'قيد التنفيذ', variant: 'default' as const, icon: Loader2 },
      completed: { label: 'مكتمل', variant: 'default' as const, icon: CheckCircle },
      partial: { label: 'جزئي', variant: 'secondary' as const, icon: Clock },
      cancelled: { label: 'ملغي', variant: 'destructive' as const, icon: XCircle },
      failed: { label: 'فاشل', variant: 'destructive' as const, icon: XCircle }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = !searchTerm || 
      order.link.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.service?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.provider_order_id?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            إدارة الطلبات
          </h1>
          <p className="text-gray-600 mt-2">متابعة وإدارة جميع طلبات العملاء.</p>
        </div>
      </div>

      {/* إحصائيات الطلبات */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الطلبات المكتملة</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completedOrders}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.totalRevenue.toFixed(2)} ج.م</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الأرباح</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.totalProfit.toFixed(2)} ج.م</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* فلاتر البحث */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            تصفية الطلبات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="البحث في الطلبات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="md:w-48">
                <SelectValue placeholder="فلترة بحسب الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">في الانتظار</SelectItem>
                <SelectItem value="processing">قيد التنفيذ</SelectItem>
                <SelectItem value="completed">مكتمل</SelectItem>
                <SelectItem value="partial">جزئي</SelectItem>
                <SelectItem value="cancelled">ملغي</SelectItem>
                <SelectItem value="failed">فاشل</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedOrders.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-blue-800">تم اختيار {selectedOrders.length} طلب</span>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => bulkUpdateMutation.mutate({ orderIds: selectedOrders, status: 'processing' })}
                  >
                    تحديد كـ "قيد التنفيذ"
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => bulkUpdateMutation.mutate({ orderIds: selectedOrders, status: 'completed' })}
                  >
                    تحديد كـ "مكتمل"
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => bulkUpdateMutation.mutate({ orderIds: selectedOrders, status: 'cancelled' })}
                  >
                    إلغاء المحدد
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* جدول الطلبات */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الطلبات ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="mr-2">جاري تحميل الطلبات...</span>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center p-8">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">لا توجد طلبات</h3>
              <p className="text-sm text-gray-500">لم يتم العثور على طلبات تطابق معايير البحث.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-right p-3">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedOrders(filteredOrders.map(o => o.id));
                          } else {
                            setSelectedOrders([]);
                          }
                        }}
                        checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                      />
                    </th>
                    <th className="text-right p-3">الخدمة</th>
                    <th className="text-right p-3">العميل</th>
                    <th className="text-right p-3">الرابط</th>
                    <th className="text-right p-3">الكمية</th>
                    <th className="text-right p-3">السعر</th>
                    <th className="text-right p-3">الحالة</th>
                    <th className="text-right p-3">تاريخ الطلب</th>
                    <th className="text-center p-3">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedOrders([...selectedOrders, order.id]);
                            } else {
                              setSelectedOrders(selectedOrders.filter(id => id !== order.id));
                            }
                          }}
                        />
                      </td>
                      <td className="p-3">
                        <div className="font-medium">{order.service?.title}</div>
                        <div className="text-sm text-gray-500">{order.service?.price}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium">{order.user?.full_name || 'غير محدد'}</div>
                        <div className="text-sm text-gray-500">{order.user?.email}</div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm text-blue-600 max-w-xs truncate">
                          <a href={order.link} target="_blank" rel="noopener noreferrer">
                            {order.link}
                          </a>
                        </div>
                      </td>
                      <td className="p-3">{order.quantity.toLocaleString()}</td>
                      <td className="p-3">{order.final_price.toFixed(2)} ج.م</td>
                      <td className="p-3">{getStatusBadge(order.status)}</td>
                      <td className="p-3">
                        <div className="text-sm">
                          {new Date(order.created_at).toLocaleDateString('ar-EG')}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-1">
                          <Select onValueChange={(status) => updateStatusMutation.mutate({ orderId: order.id, status: status as ServiceOrder['status'] })}>
                            <SelectTrigger className="w-32 h-8">
                              <SelectValue placeholder="تحديث" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">في الانتظار</SelectItem>
                              <SelectItem value="processing">قيد التنفيذ</SelectItem>
                              <SelectItem value="completed">مكتمل</SelectItem>
                              <SelectItem value="partial">جزئي</SelectItem>
                              <SelectItem value="cancelled">ملغي</SelectItem>
                              <SelectItem value="failed">فاشل</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => {
                              if (confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
                                deleteOrderMutation.mutate(order.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersManager;
