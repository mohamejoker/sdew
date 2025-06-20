
import { supabase } from '@/integrations/supabase/client';

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'wallet' | 'bank' | 'crypto';
  icon: string;
  fees_percentage: number;
  is_active: boolean;
  processing_time: string;
  config: any;
  manual_mode?: boolean;
  auto_mode?: boolean;
}

export interface Transaction {
  id: string;
  user_id?: string;
  customer_name?: string;
  customer_email?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled';
  payment_method_id?: string;
  payment_method_name?: string;
  service_name?: string;
  description?: string;
  reference_id?: string;
  stripe_session_id?: string;
  stripe_payment_intent_id?: string;
  fees: number;
  net_amount?: number;
  metadata?: any;
  processed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  description?: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_amount: number;
  max_uses?: number;
  current_uses: number;
  category?: string;
  is_active: boolean;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentSetting {
  id: string;
  key: string;
  value?: string;
  description?: string;
  category: string;
  is_encrypted: boolean;
  updated_by?: string;
  updated_at: string;
}

class PaymentService {
  // طرق الدفع
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const { data, error } = await supabase
      .from('payment_methods')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Error fetching payment methods:', error);
      throw error;
    }

    return (data || []).map(item => ({
      ...item,
      type: item.type as 'card' | 'wallet' | 'bank' | 'crypto'
    }));
  }

  async createPaymentMethod(method: Omit<PaymentMethod, 'id' | 'created_at' | 'updated_at'>): Promise<PaymentMethod> {
    const { data, error } = await supabase
      .from('payment_methods')
      .insert([method])
      .select()
      .single();

    if (error) {
      console.error('Error creating payment method:', error);
      throw error;
    }

    return {
      ...data,
      type: data.type as 'card' | 'wallet' | 'bank' | 'crypto'
    };
  }

  async updatePaymentMethod(id: string, updates: Partial<PaymentMethod>): Promise<PaymentMethod> {
    const { data, error } = await supabase
      .from('payment_methods')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating payment method:', error);
      throw error;
    }

    return {
      ...data,
      type: data.type as 'card' | 'wallet' | 'bank' | 'crypto'
    };
  }

  // المعاملات
  async getTransactions(filters?: {
    user_id?: string;
    status?: string;
    limit?: number;
    offset?: number;
  }): Promise<Transaction[]> {
    let query = supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.user_id) {
      query = query.eq('user_id', filters.user_id);
    }

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }

    return (data || []).map(item => ({
      ...item,
      status: item.status as 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled'
    }));
  }

  async createTransaction(transaction: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transactions')
      .insert([{
        ...transaction,
        net_amount: transaction.amount - transaction.fees
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }

    return {
      ...data,
      status: data.status as 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled'
    };
  }

  async updateTransactionStatus(
    id: string, 
    status: Transaction['status'], 
    additionalData?: Partial<Transaction>
  ): Promise<Transaction> {
    const updates = {
      status,
      ...additionalData,
      updated_at: new Date().toISOString(),
      ...(status === 'completed' ? { processed_at: new Date().toISOString() } : {})
    };

    const { data, error } = await supabase
      .from('transactions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }

    return {
      ...data,
      status: data.status as 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled'
    };
  }

  // الكوبونات
  async getCoupons(activeOnly = false): Promise<Coupon[]> {
    let query = supabase
      .from('coupons')
      .select('*')
      .order('created_at', { ascending: false });

    if (activeOnly) {
      query = query
        .eq('is_active', true)
        .or('expires_at.is.null,expires_at.gt.' + new Date().toISOString());
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching coupons:', error);
      throw error;
    }

    return (data || []).map(item => ({
      ...item,
      discount_type: item.discount_type as 'percentage' | 'fixed'
    }));
  }

  async validateCoupon(code: string, amount: number): Promise<Coupon | null> {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return null;
    }

    // التحقق من انتهاء الصلاحية
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      return null;
    }

    // التحقق من الحد الأدنى للمبلغ
    if (amount < data.min_amount) {
      return null;
    }

    // التحقق من عدد الاستخدامات
    if (data.max_uses && data.current_uses >= data.max_uses) {
      return null;
    }

    return {
      ...data,
      discount_type: data.discount_type as 'percentage' | 'fixed'
    };
  }

  async useCoupon(couponId: string, userId: string, transactionId: string, discountAmount: number): Promise<void> {
    const { error: usageError } = await supabase
      .from('coupon_usages')
      .insert([{
        coupon_id: couponId,
        user_id: userId,
        transaction_id: transactionId,
        discount_amount: discountAmount
      }]);

    if (usageError) {
      console.error('Error creating coupon usage:', usageError);
      throw usageError;
    }

    // تحديث عدد الاستخدامات يدوياً
    const { data: currentCoupon } = await supabase
      .from('coupons')
      .select('current_uses')
      .eq('id', couponId)
      .single();

    if (currentCoupon) {
      const { error: updateError } = await supabase
        .from('coupons')
        .update({ 
          current_uses: currentCoupon.current_uses + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', couponId);

      if (updateError) {
        console.error('Error updating coupon usage count:', updateError);
        throw updateError;
      }
    }
  }

  async createCoupon(coupon: Omit<Coupon, 'id' | 'current_uses' | 'created_at' | 'updated_at'>): Promise<Coupon> {
    const { data, error } = await supabase
      .from('coupons')
      .insert([{ ...coupon, current_uses: 0 }])
      .select()
      .single();

    if (error) {
      console.error('Error creating coupon:', error);
      throw error;
    }

    return {
      ...data,
      discount_type: data.discount_type as 'percentage' | 'fixed'
    };
  }

  // الإعدادات
  async getPaymentSettings(): Promise<PaymentSetting[]> {
    const { data, error } = await supabase
      .from('payment_settings')
      .select('*')
      .order('category', { ascending: true });

    if (error) {
      console.error('Error fetching payment settings:', error);
      throw error;
    }

    return data || [];
  }

  async updatePaymentSetting(key: string, value: string): Promise<void> {
    const { error } = await supabase
      .from('payment_settings')
      .update({ 
        value, 
        updated_at: new Date().toISOString() 
      })
      .eq('key', key);

    if (error) {
      console.error('Error updating payment setting:', error);
      throw error;
    }
  }

  // الإحصائيات
  async getPaymentStats(): Promise<{
    totalRevenue: number;
    totalTransactions: number;
    pendingTransactions: number;
    completedTransactions: number;
    refundedAmount: number;
  }> {
    const { data: transactions, error } = await supabase
      .from('transactions')
      .select('amount, status');

    if (error) {
      console.error('Error fetching payment stats:', error);
      throw error;
    }

    const stats = {
      totalRevenue: 0,
      totalTransactions: transactions?.length || 0,
      pendingTransactions: 0,
      completedTransactions: 0,
      refundedAmount: 0
    };

    transactions?.forEach(tx => {
      if (tx.status === 'completed') {
        stats.totalRevenue += tx.amount;
        stats.completedTransactions += 1;
      } else if (tx.status === 'pending') {
        stats.pendingTransactions += 1;
      } else if (tx.status === 'refunded') {
        stats.refundedAmount += tx.amount;
      }
    });

    return stats;
  }

  // محاكاة فودافون كاش
  async simulateVodafoneCash(phoneNumber: string, amount: number, mode: 'manual' | 'auto'): Promise<{
    success: boolean;
    confirmationCode?: string;
    transactionId: string;
    message: string;
  }> {
    const transactionId = `VF${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    
    if (mode === 'manual') {
      // في الوضع اليدوي، نعطي كود تأكيد للمستخدم
      const confirmationCode = Math.floor(1000 + Math.random() * 9000).toString();
      return {
        success: true,
        confirmationCode,
        transactionId,
        message: `تم إرسال كود التأكيد ${confirmationCode} إلى ${phoneNumber}`
      };
    } else {
      // في الوضع التلقائي، نحاكي نجاح/فشل عشوائي
      const isSuccess = Math.random() > 0.1; // 90% نسبة نجاح
      return {
        success: isSuccess,
        transactionId,
        message: isSuccess 
          ? `تم الدفع بنجاح من محفظة فودافون كاش ${phoneNumber}`
          : `فشل في الدفع - رصيد غير كافي أو خطأ في الشبكة`
      };
    }
  }

  // حساب الخصم
  calculateDiscount(amount: number, coupon: Coupon): number {
    if (coupon.discount_type === 'percentage') {
      return (amount * coupon.discount_value) / 100;
    } else {
      return Math.min(coupon.discount_value, amount);
    }
  }

  // حساب الرسوم
  calculateFees(amount: number, paymentMethod: PaymentMethod): number {
    return (amount * paymentMethod.fees_percentage) / 100;
  }
}

export const paymentService = new PaymentService();
