import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import OrdersHeader from '@/components/Admin/Orders/OrdersHeader';
import OrdersStats from '@/components/Admin/Orders/OrdersStats';
import OrdersFilters from '@/components/Admin/Orders/OrdersFilters';
import OrdersList from '@/components/Admin/Orders/OrdersList';

interface Order {
  id: string;
  service_id: string;
  link: string;
  quantity: number;
  original_price: number;
  final_price: number;
  profit: number;
  status: string;
  created_at: string;
  user_profile?: {
    full_name?: string;
    email?: string;
  };
}

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // تحويل البيانات للصيغة المطلوبة مع بيانات وهمية للمستخدمين
      const formattedOrders = (data || []).map(order => ({
        ...order,
        user_profile: {
          full_name: `عميل ${order.id.slice(0, 8)}`,
          email: `user${order.id.slice(0, 6)}@example.com`
        }
      }));
      
      return formattedOrders as Order[];
    }
  });

  const { data: orderStats } = useQuery({
    queryKey: ['order-stats'],
    queryFn: async () => {
      const { count: totalOrders } = await supabase
        .from('service_orders')
        .select('*', { count: 'exact', head: true });

      const { count: pendingOrders } = await supabase
        .from('service_orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      const { count: completedOrders } = await supabase
        .from('service_orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'completed');

      const { count: cancelledOrders } = await supabase
        .from('service_orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'cancelled');

      return {
        totalOrders: totalOrders || 0,
        pendingOrders: pendingOrders || 0,
        completedOrders: completedOrders || 0,
        cancelledOrders: cancelledOrders || 0
      };
    }
  });

  const filteredOrders = orders?.filter(order => {
    const matchesSearch = order.service_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.user_profile?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.link?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <OrdersHeader />
      <OrdersStats stats={orderStats} />
      <OrdersFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onStatusFilterChange={setStatusFilter}
      />
      <OrdersList orders={filteredOrders} />
    </div>
  );
};

export default OrdersPage;
