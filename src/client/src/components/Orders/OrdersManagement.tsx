
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  RefreshCw,
  Plus
} from 'lucide-react';

const OrdersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const orders = [
    {
      id: 'ORD-001',
      service: 'متابعين انستغرام عرب',
      customer: 'أحمد محمد',
      quantity: 1000,
      price: 0.50,
      total: 5.00,
      status: 'completed',
      progress: 100,
      created: '2024-01-15',
      completed: '2024-01-16',
      link: 'https://instagram.com/user123'
    },
    {
      id: 'ORD-002',
      service: 'لايكات انستغرام',
      customer: 'فاطمة أحمد',
      quantity: 500,
      price: 0.20,
      total: 1.00,
      status: 'in_progress',
      progress: 65,
      created: '2024-01-16',
      completed: null,
      link: 'https://instagram.com/p/ABC123'
    },
    {
      id: 'ORD-003',
      service: 'مشاهدات يوتيوب',
      customer: 'محمد علي',
      quantity: 5000,
      price: 0.30,
      total: 15.00,
      status: 'pending',
      progress: 0,
      created: '2024-01-17',
      completed: null,
      link: 'https://youtube.com/watch?v=xyz'
    },
    {
      id: 'ORD-004',
      service: 'تعليقات انستغرام',
      customer: 'سارة خالد',
      quantity: 50,
      price: 1.50,
      total: 75.00,
      status: 'failed',
      progress: 0,
      created: '2024-01-17',
      completed: null,
      link: 'https://instagram.com/p/DEF456'
    },
    {
      id: 'ORD-005',
      service: 'متابعين تويتر',
      customer: 'يوسف أحمد',
      quantity: 2000,
      price: 0.80,
      total: 16.00,
      status: 'processing',
      progress: 25,
      created: '2024-01-18',
      completed: null,
      link: 'https://twitter.com/user456'
    }
  ];

  const statusLabels = {
    all: 'جميع الطلبات',
    pending: 'في الانتظار',
    processing: 'قيد المعالجة',
    in_progress: 'قيد التنفيذ',
    completed: 'مكتمل',
    failed: 'فاشل',
    cancelled: 'ملغي'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in_progress': return RefreshCw;
      case 'processing': return Clock;
      case 'pending': return AlertCircle;
      case 'failed': return XCircle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalStats = {
    total: orders.length,
    completed: orders.filter(o => o.status === 'completed').length,
    in_progress: orders.filter(o => o.status === 'in_progress' || o.status === 'processing').length,
    pending: orders.filter(o => o.status === 'pending').length,
    failed: orders.filter(o => o.status === 'failed').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة الطلبات</h1>
          <p className="text-gray-600 mt-1">متابعة وإدارة جميع الطلبات</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          طلب جديد
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{totalStats.total}</div>
              <div className="text-sm text-gray-600">إجمالي الطلبات</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalStats.completed}</div>
              <div className="text-sm text-gray-600">مكتملة</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalStats.in_progress}</div>
              <div className="text-sm text-gray-600">قيد التنفيذ</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{totalStats.pending}</div>
              <div className="text-sm text-gray-600">في الانتظار</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{totalStats.failed}</div>
              <div className="text-sm text-gray-600">فاشلة</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث برقم الطلب، اسم العميل، أو الخدمة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                فلترة متقدمة
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                تصدير
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الطلبات ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const StatusIcon = getStatusIcon(order.status);
              return (
                <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-sm font-medium text-blue-600">{order.id}</span>
                        <Badge className={getStatusColor(order.status)}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusLabels[order.status as keyof typeof statusLabels]}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{order.service}</h3>
                      <p className="text-sm text-gray-600">العميل: {order.customer}</p>
                      <p className="text-sm text-gray-600">الكمية: {order.quantity.toLocaleString()}</p>
                    </div>
                    
                    <div className="flex-1">
                      <div className="text-sm text-gray-600 mb-2">
                        تاريخ الطلب: {order.created}
                        {order.completed && <span className="block">تاريخ الإكمال: {order.completed}</span>}
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        ${order.total.toFixed(2)}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="text-sm text-gray-600 mb-2">التقدم: {order.progress}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${order.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        تفاصيل
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد طلبات</h3>
              <p className="text-gray-500">لم يتم العثور على طلبات تطابق معايير البحث</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersManagement;
