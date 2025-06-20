
import { supabase } from '@/integrations/supabase/client';

export interface EgyptianWalletProvider {
  id: string;
  name: string;
  prefixes: string[];
  fees_percentage: number;
  is_active: boolean;
  service_name: string;
  color: string;
  icon: string;
}

export interface EgyptianPaymentTransaction {
  id: string;
  user_id?: string;
  amount: number;
  fees: number;
  total_amount: number;
  payment_method: string;
  provider_name: string;
  phone_number?: string;
  account_number?: string;
  coupon_code?: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  transaction_reference: string;
  confirmation_code?: string;
  created_at: string;
  processed_at?: string;
  metadata?: any;
}

class EgyptianPaymentService {
  private walletProviders: EgyptianWalletProvider[] = [
    {
      id: 'vodafone',
      name: 'فودافون كاش',
      prefixes: ['010'],
      fees_percentage: 2.5,
      is_active: true,
      service_name: 'Vodafone Cash',
      color: 'bg-red-600',
      icon: '📱'
    },
    {
      id: 'etisalat',
      name: 'اتصالات كاش',
      prefixes: ['011'],
      fees_percentage: 2.0,
      is_active: true,
      service_name: 'Etisalat Cash',
      color: 'bg-green-600',
      icon: '💳'
    },
    {
      id: 'orange',
      name: 'أورانج موني',
      prefixes: ['012'],
      fees_percentage: 2.2,
      is_active: true,
      service_name: 'Orange Money',
      color: 'bg-orange-600',
      icon: '🧡'
    },
    {
      id: 'we',
      name: 'WE Pay',
      prefixes: ['015'],
      fees_percentage: 2.3,
      is_active: true,
      service_name: 'WE Pay',
      color: 'bg-purple-600',
      icon: '💜'
    }
  ];

  // كشف مقدم الخدمة من رقم الهاتف
  detectWalletProvider(phoneNumber: string): EgyptianWalletProvider | null {
    if (phoneNumber.length < 3) return null;
    
    const prefix = phoneNumber.substring(0, 3);
    return this.walletProviders.find(provider => 
      provider.prefixes.includes(prefix) && provider.is_active
    ) || null;
  }

  // حساب الرسوم
  calculateFees(amount: number, provider: EgyptianWalletProvider): number {
    return (amount * provider.fees_percentage) / 100;
  }

  // حساب المبلغ الإجمالي
  calculateTotalAmount(amount: number, provider: EgyptianWalletProvider): number {
    return amount + this.calculateFees(amount, provider);
  }

  // محاكاة دفع المحفظة الإلكترونية
  async simulateWalletPayment(
    phoneNumber: string, 
    amount: number, 
    mode: 'manual' | 'auto' = 'manual'
  ): Promise<{
    success: boolean;
    transaction_id: string;
    confirmation_code?: string;
    message: string;
    provider?: EgyptianWalletProvider;
  }> {
    const provider = this.detectWalletProvider(phoneNumber);
    if (!provider) {
      throw new Error('شبكة غير مدعومة');
    }

    const transactionId = `${provider.id.toUpperCase()}${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    
    if (mode === 'manual') {
      const confirmationCode = Math.floor(1000 + Math.random() * 9000).toString();
      return {
        success: true,
        transaction_id: transactionId,
        confirmation_code: confirmationCode,
        message: `تم إرسال كود التأكيد ${confirmationCode} إلى ${phoneNumber} عبر ${provider.service_name}`,
        provider
      };
    } else {
      // في الوضع التلقائي، نحاكي نجاح/فشل عشوائي
      const isSuccess = Math.random() > 0.1; // 90% نسبة نجاح
      return {
        success: isSuccess,
        transaction_id: transactionId,
        message: isSuccess 
          ? `تم الدفع بنجاح من ${provider.service_name} ${phoneNumber}`
          : `فشل في الدفع - رصيد غير كافي أو خطأ في شبكة ${provider.name}`,
        provider
      };
    }
  }

  // محاكاة دفع فوري
  async simulateFawryPayment(amount: number): Promise<{
    success: boolean;
    transaction_id: string;
    fawry_code: string;
    message: string;
  }> {
    const fawryCode = `FWR${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const transactionId = `FAWRY${Date.now()}`;
    
    return {
      success: true,
      transaction_id: transactionId,
      fawry_code: fawryCode,
      message: `كود فوري: ${fawryCode} - ادفع ${amount + 5} ج.م في أي فرع فوري`
    };
  }

  // محاكاة دفع PayMob
  async simulatePayMobPayment(cardNumber: string, amount: number): Promise<{
    success: boolean;
    transaction_id: string;
    message: string;
  }> {
    if (!cardNumber || cardNumber.length < 16) {
      throw new Error('رقم بطاقة غير صحيح');
    }

    const transactionId = `PMB${Date.now()}`;
    const isSuccess = Math.random() > 0.15; // 85% نسبة نجاح
    
    return {
      success: isSuccess,
      transaction_id: transactionId,
      message: isSuccess 
        ? `تم الدفع بنجاح من البطاقة المنتهية بـ ${cardNumber.slice(-4)}`
        : 'فشل في الدفع - تحقق من بيانات البطاقة أو الرصيد'
    };
  }

  // التحقق من الكوبون
  async validateCoupon(code: string, amount: number): Promise<{
    valid: boolean;
    discount_amount: number;
    final_amount: number;
    message: string;
  }> {
    // كوبونات تجريبية
    const testCoupons = {
      'SAVE20': { discount: 20, min_amount: 50 },
      'DISCOUNT50': { discount: 50, min_amount: 100 },
      'WELCOME100': { discount: 100, min_amount: 200 }
    };

    const coupon = testCoupons[code as keyof typeof testCoupons];
    
    if (!coupon) {
      return {
        valid: false,
        discount_amount: 0,
        final_amount: amount,
        message: 'كود الكوبون غير صحيح'
      };
    }

    if (amount < coupon.min_amount) {
      return {
        valid: false,
        discount_amount: 0,
        final_amount: amount,
        message: `الحد الأدنى للطلب ${coupon.min_amount} ج.م لاستخدام هذا الكوبون`
      };
    }

    const discountAmount = Math.min(coupon.discount, amount);
    const finalAmount = amount - discountAmount;

    return {
      valid: true,
      discount_amount: discountAmount,
      final_amount: finalAmount,
      message: `تم تطبيق خصم ${discountAmount} ج.م`
    };
  }

  // محاكاة دفع من الرصيد الداخلي
  async simulateBalancePayment(userId: string, amount: number): Promise<{
    success: boolean;
    transaction_id: string;
    current_balance: number;
    new_balance: number;
    message: string;
  }> {
    // محاكاة رصيد المستخدم (في التطبيق الحقيقي سيتم جلبه من قاعدة البيانات)
    const currentBalance = 150.00;
    
    if (currentBalance < amount) {
      return {
        success: false,
        transaction_id: '',
        current_balance: currentBalance,
        new_balance: currentBalance,
        message: `رصيدك الحالي ${currentBalance} ج.م غير كافي للدفع`
      };
    }

    const transactionId = `BAL${Date.now()}`;
    const newBalance = currentBalance - amount;

    return {
      success: true,
      transaction_id: transactionId,
      current_balance: currentBalance,
      new_balance: newBalance,
      message: `تم خصم ${amount} ج.م من رصيدك. الرصيد الجديد: ${newBalance} ج.م`
    };
  }

  // حفظ المعاملة (في التطبيق الحقيقي سيتم حفظها في قاعدة البيانات)
  async saveTransaction(transaction: Omit<EgyptianPaymentTransaction, 'id' | 'created_at'>): Promise<EgyptianPaymentTransaction> {
    const newTransaction: EgyptianPaymentTransaction = {
      ...transaction,
      id: `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date().toISOString()
    };

    // في التطبيق الحقيقي سيتم حفظها في Supabase
    console.log('Transaction saved:', newTransaction);
    
    return newTransaction;
  }

  // إحصائيات المدفوعات المصرية
  getPaymentStats(): {
    total_methods: number;
    active_wallet_providers: number;
    coverage_percentage: number;
    popular_methods: string[];
  } {
    return {
      total_methods: 6,
      active_wallet_providers: this.walletProviders.filter(p => p.is_active).length,
      coverage_percentage: 100,
      popular_methods: ['فودافون كاش', 'اتصالات كاش', 'فوري', 'أورانج موني']
    };
  }

  // الحصول على جميع مقدمي المحافظ
  getWalletProviders(): EgyptianWalletProvider[] {
    return this.walletProviders.filter(provider => provider.is_active);
  }

  // تحديث إعدادات مقدم الخدمة
  updateWalletProvider(providerId: string, updates: Partial<EgyptianWalletProvider>): boolean {
    const providerIndex = this.walletProviders.findIndex(p => p.id === providerId);
    if (providerIndex === -1) return false;

    this.walletProviders[providerIndex] = {
      ...this.walletProviders[providerIndex],
      ...updates
    };

    return true;
  }
}

export const egyptianPaymentService = new EgyptianPaymentService();
