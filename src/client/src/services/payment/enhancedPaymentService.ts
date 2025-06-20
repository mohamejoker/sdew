
export interface PaymentProvider {
  id: string;
  name: string;
  type: 'gateway' | 'wallet' | 'bank';
  isActive: boolean;
  config: Record<string, any>;
  fees: {
    percentage: number;
    fixed: number;
  };
}

export interface PaymentTransaction {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  providerId: string;
  metadata: Record<string, any>;
  createdAt: Date;
}

export class EnhancedPaymentService {
  private providers: Map<string, PaymentProvider> = new Map();
  private transactions: Map<string, PaymentTransaction> = new Map();

  // إضافة مقدم خدمة دفع
  addProvider(provider: PaymentProvider): void {
    this.providers.set(provider.id, provider);
  }

  // الحصول على مقدم خدمة
  getProvider(id: string): PaymentProvider | undefined {
    return this.providers.get(id);
  }

  // الحصول على جميع مقدمي الخدمة النشطين
  getActiveProviders(): PaymentProvider[] {
    return Array.from(this.providers.values()).filter(p => p.isActive);
  }

  // حساب الرسوم
  calculateFees(amount: number, providerId: string): number {
    const provider = this.getProvider(providerId);
    if (!provider) {
      throw new Error('مقدم الخدمة غير موجود');
    }

    const numAmount = Number(amount);
    const percentageFee = (numAmount * Number(provider.fees.percentage)) / 100;
    const totalFees = percentageFee + Number(provider.fees.fixed);
    
    return Number(totalFees.toFixed(2));
  }

  // معالجة الدفع
  async processPayment(
    amount: number,
    currency: string,
    providerId: string,
    metadata: Record<string, any> = {}
  ): Promise<PaymentTransaction> {
    const provider = this.getProvider(providerId);
    if (!provider || !provider.isActive) {
      throw new Error('مقدم الخدمة غير متاح');
    }

    const transaction: PaymentTransaction = {
      id: this.generateTransactionId(),
      amount: Number(amount),
      currency,
      status: 'pending',
      providerId,
      metadata,
      createdAt: new Date()
    };

    this.transactions.set(transaction.id, transaction);

    try {
      // محاكاة معالجة الدفع
      await this.simulatePaymentProcessing(transaction, provider);
      transaction.status = 'completed';
    } catch (error) {
      transaction.status = 'failed';
      throw error;
    }

    return transaction;
  }

  // محاكاة معالجة الدفع
  private async simulatePaymentProcessing(
    transaction: PaymentTransaction,
    provider: PaymentProvider
  ): Promise<void> {
    // محاكاة تأخير الشبكة
    await new Promise(resolve => setTimeout(resolve, 1000));

    // محاكاة نسبة نجاح 95%
    if (Math.random() < 0.05) {
      throw new Error('فشل في معالجة الدفع');
    }

    console.log(`تم معالجة الدفع ${transaction.id} عبر ${provider.name}`);
  }

  // إنشاء معرف المعاملة
  private generateTransactionId(): string {
    return `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // الحصول على معاملة
  getTransaction(id: string): PaymentTransaction | undefined {
    return this.transactions.get(id);
  }

  // الحصول على جميع المعاملات
  getAllTransactions(): PaymentTransaction[] {
    return Array.from(this.transactions.values());
  }

  // تحديث حالة المعاملة
  updateTransactionStatus(id: string, status: PaymentTransaction['status']): void {
    const transaction = this.getTransaction(id);
    if (transaction) {
      transaction.status = status;
    }
  }

  // استرداد الدفع
  async refundPayment(transactionId: string): Promise<void> {
    const transaction = this.getTransaction(transactionId);
    if (!transaction) {
      throw new Error('المعاملة غير موجودة');
    }

    if (transaction.status !== 'completed') {
      throw new Error('لا يمكن استرداد معاملة غير مكتملة');
    }

    // محاكاة عملية الاسترداد
    await new Promise(resolve => setTimeout(resolve, 500));
    
    transaction.status = 'refunded';
    console.log(`تم استرداد المعاملة ${transactionId}`);
  }

  // إحصائيات الدفع
  getPaymentStatistics(): {
    totalTransactions: number;
    totalAmount: number;
    successRate: number;
    totalFees: number;
  } {
    const transactions = this.getAllTransactions();
    const completedTransactions = transactions.filter(t => t.status === 'completed');
    
    const totalAmount = completedTransactions.reduce((sum, t) => sum + Number(t.amount), 0);
    const totalFees = completedTransactions.reduce((sum, t) => {
      try {
        const fees = this.calculateFees(t.amount, t.providerId);
        return sum + Number(fees);
      } catch {
        return sum;
      }
    }, 0);
    
    const successRate = transactions.length > 0 
      ? (completedTransactions.length / transactions.length) * 100 
      : 0;

    return {
      totalTransactions: transactions.length,
      totalAmount: Number(totalAmount.toFixed(2)),
      successRate: Number(successRate.toFixed(2)),
      totalFees: Number(totalFees.toFixed(2))
    };
  }
}

// إنشاء instance واحد من الخدمة
export const paymentService = new EnhancedPaymentService();

// إضافة بعض مقدمي الخدمة الافتراضيين
paymentService.addProvider({
  id: 'stripe',
  name: 'Stripe',
  type: 'gateway',
  isActive: true,
  config: {},
  fees: {
    percentage: 2.9,
    fixed: 0.30
  }
});

paymentService.addProvider({
  id: 'paypal',
  name: 'PayPal',
  type: 'wallet',
  isActive: true,
  config: {},
  fees: {
    percentage: 3.5,
    fixed: 0.50
  }
});

paymentService.addProvider({
  id: 'mada',
  name: 'مدى',
  type: 'bank',
  isActive: true,
  config: {},
  fees: {
    percentage: 1.5,
    fixed: 0.25
  }
});
