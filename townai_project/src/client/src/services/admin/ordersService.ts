
import { supabase } from '@/integrations/supabase/client';

export interface ServiceOrder {
  id: string;
  user_id?: string;
  service_id: string;
  provider_service_id?: string;
  link: string;
  quantity: number;
  original_price: number;
  final_price: number;
  profit: number;
  status: 'pending' | 'processing' | 'completed' | 'partial' | 'cancelled' | 'failed';
  start_count?: number;
  remains?: number;
  provider_order_id?: string;
  notes?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
  completed_at?: string;
  // Relations
  service?: {
    title: string;
    price: string;
  };
  user?: {
    full_name?: string;
    email?: string;
  };
}

export interface OrderStatusHistory {
  id: string;
  order_id: string;
  old_status?: string;
  new_status: string;
  reason?: string;
  changed_by?: string;
  changed_at: string;
  metadata?: Record<string, any>;
}

export interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  totalProfit: number;
  avgOrderValue: number;
}

class OrdersService {
  async getOrders(filters?: {
    status?: string;
    userId?: string;
    serviceId?: string;
    limit?: number;
    offset?: number;
  }): Promise<ServiceOrder[]> {
    let query = supabase
      .from('service_orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.userId) {
      query = query.eq('user_id', filters.userId);
    }

    if (filters?.serviceId) {
      query = query.eq('service_id', filters.serviceId);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }

    return (data || []) as ServiceOrder[];
  }

  async getOrder(id: string): Promise<ServiceOrder | null> {
    const { data, error } = await supabase
      .from('service_orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching order:', error);
      return null;
    }

    return data as ServiceOrder;
  }

  async createOrder(order: Omit<ServiceOrder, 'id' | 'created_at' | 'updated_at' | 'service' | 'user'>): Promise<ServiceOrder> {
    const { data, error } = await supabase
      .from('service_orders')
      .insert([order])
      .select('*')
      .single();

    if (error) {
      console.error('Error creating order:', error);
      throw error;
    }

    return data as ServiceOrder;
  }

  async updateOrderStatus(
    orderId: string, 
    status: ServiceOrder['status'], 
    additionalData?: Partial<ServiceOrder>
  ): Promise<ServiceOrder> {
    const updates = {
      status,
      ...additionalData,
      ...(status === 'completed' ? { completed_at: new Date().toISOString() } : {})
    };

    const { data, error } = await supabase
      .from('service_orders')
      .update(updates)
      .eq('id', orderId)
      .select('*')
      .single();

    if (error) {
      console.error('Error updating order status:', error);
      throw error;
    }

    return data as ServiceOrder;
  }

  async deleteOrder(id: string): Promise<void> {
    const { error } = await supabase
      .from('service_orders')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }

  async getOrderStatusHistory(orderId: string): Promise<OrderStatusHistory[]> {
    const { data, error } = await supabase
      .from('order_status_history')
      .select('*')
      .eq('order_id', orderId)
      .order('changed_at', { ascending: false });

    if (error) {
      console.error('Error fetching order status history:', error);
      throw error;
    }

    return (data || []) as OrderStatusHistory[];
  }

  async getOrderStats(): Promise<OrderStats> {
    const { data: orders, error } = await supabase
      .from('service_orders')
      .select('status, final_price, profit');

    if (error) {
      console.error('Error fetching order stats:', error);
      throw error;
    }

    const stats: OrderStats = {
      totalOrders: orders?.length || 0,
      pendingOrders: 0,
      processingOrders: 0,
      completedOrders: 0,
      cancelledOrders: 0,
      totalRevenue: 0,
      totalProfit: 0,
      avgOrderValue: 0
    };

    orders?.forEach((order: any) => {
      switch (order.status) {
        case 'pending':
          stats.pendingOrders++;
          break;
        case 'processing':
          stats.processingOrders++;
          break;
        case 'completed':
          stats.completedOrders++;
          stats.totalRevenue += order.final_price;
          stats.totalProfit += order.profit;
          break;
        case 'cancelled':
        case 'failed':
          stats.cancelledOrders++;
          break;
      }
    });

    if (stats.completedOrders > 0) {
      stats.avgOrderValue = stats.totalRevenue / stats.completedOrders;
    }

    return stats;
  }

  async getUserOrders(userId: string): Promise<ServiceOrder[]> {
    return this.getOrders({ userId });
  }

  async getServiceOrders(serviceId: string): Promise<ServiceOrder[]> {
    return this.getOrders({ serviceId });
  }

  async searchOrders(searchTerm: string): Promise<ServiceOrder[]> {
    const { data, error } = await supabase
      .from('service_orders')
      .select('*')
      .or(`link.ilike.%${searchTerm}%,provider_order_id.ilike.%${searchTerm}%,notes.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error searching orders:', error);
      throw error;
    }

    return (data || []) as ServiceOrder[];
  }

  async bulkUpdateOrderStatus(orderIds: string[], status: ServiceOrder['status']): Promise<void> {
    const { error } = await supabase
      .from('service_orders')
      .update({ 
        status,
        ...(status === 'completed' ? { completed_at: new Date().toISOString() } : {})
      })
      .in('id', orderIds);

    if (error) {
      console.error('Error bulk updating order status:', error);
      throw error;
    }
  }
}

export const ordersService = new OrdersService();
