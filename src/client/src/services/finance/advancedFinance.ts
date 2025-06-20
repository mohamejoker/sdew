
interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'refund' | 'commission';
  amount: number;
  currency: 'SAR' | 'USD' | 'EUR';
  description: string;
  category: string;
  orderId?: string;
  userId?: string;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  createdAt: Date;
  processedAt?: Date;
  fees: number;
  netAmount: number;
  exchangeRate?: number;
}

interface FinancialReport {
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  transactionCount: number;
  averageOrderValue: number;
  topCategories: { category: string; amount: number }[];
  paymentMethodsBreakdown: { method: string; amount: number; percentage: number }[];
}

interface TaxData {
  period: string;
  taxableIncome: number;
  vatAmount: number;
  vatRate: number;
  exemptIncome: number;
  deductions: number;
  netTaxable: number;
}

class AdvancedFinanceService {
  private transactions: Transaction[] = [];
  private exchangeRates: { [currency: string]: number } = {
    'USD': 3.75,
    'EUR': 4.10,
    'SAR': 1.00
  };

  // إضافة معاملة جديدة
  addTransaction(transactionData: Omit<Transaction, 'id' | 'createdAt' | 'netAmount'>): Transaction {
    const transaction: Transaction = {
      id: Date.now().toString(),
      createdAt: new Date(),
      netAmount: transactionData.amount - transactionData.fees,
      ...transactionData
    };

    this.transactions.push(transaction);
    this.saveToStorage();
    return transaction;
  }

  // معالجة الدفع
  async processPayment(
    amount: number,
    currency: string,
    paymentMethod: string,
    orderId: string
  ): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    try {
      // محاكاة معالجة الدفع
      await this.simulatePaymentProcessing();

      const fees = this.calculateFees(amount, paymentMethod);
      const convertedAmount = this.convertCurrency(amount, currency, 'SAR');

      const transaction = this.addTransaction({
        type: 'income',
        amount: convertedAmount,
        currency: 'SAR',
        description: `دفع طلب ${orderId}`,
        category: 'خدمات التسويق',
        orderId,
        paymentMethod,
        status: 'completed',
        processedAt: new Date(),
        fees,
        exchangeRate: currency !== 'SAR' ? this.exchangeRates[currency] : undefined
      });

      return { success: true, transactionId: transaction.id };
    } catch (error) {
      console.error('فشل في معالجة الدفع:', error);
      return { success: false, error: 'فشل في معالجة الدفع' };
    }
  }

  // حساب الرسوم
  private calculateFees(amount: number, paymentMethod: string): number {
    const feeRates: { [method: string]: number } = {
      'credit_card': 0.029, // 2.9%
      'paypal': 0.035, // 3.5%
      'bank_transfer': 0.01, // 1%
      'wallet': 0.02, // 2%
      'crypto': 0.015 // 1.5%
    };

    const rate = feeRates[paymentMethod] || 0.025;
    return amount * rate;
  }

  // تحويل العملة
  private convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
    if (fromCurrency === toCurrency) return amount;
    
    const fromRate = this.exchangeRates[fromCurrency] || 1;
    const toRate = this.exchangeRates[toCurrency] || 1;
    
    return (amount / fromRate) * toRate;
  }

  // إنشاء تقرير مالي
  generateReport(
    period: FinancialReport['period'],
    startDate: Date,
    endDate: Date
  ): FinancialReport {
    const periodTransactions = this.transactions.filter(t =>
      t.createdAt >= startDate && t.createdAt <= endDate
    );

    const totalRevenue = periodTransactions
      .filter(t => t.type === 'income' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = periodTransactions
      .filter(t => t.type === 'expense' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    const netProfit = totalRevenue - totalExpenses;
    const transactionCount = periodTransactions.length;
    const averageOrderValue = totalRevenue / transactionCount || 0;

    // أهم الفئات
    const categoryTotals: { [category: string]: number } = {};
    periodTransactions.forEach(t => {
      if (t.status === 'completed') {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
      }
    });

    const topCategories = Object.entries(categoryTotals)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 10);

    // توزيع طرق الدفع
    const paymentMethodTotals: { [method: string]: number } = {};
    periodTransactions.forEach(t => {
      if (t.type === 'income' && t.status === 'completed') {
        paymentMethodTotals[t.paymentMethod] = (paymentMethodTotals[t.paymentMethod] || 0) + t.amount;
      }
    });

    const paymentMethodsBreakdown = Object.entries(paymentMethodTotals)
      .map(([method, amount]) => ({
        method,
        amount,
        percentage: (amount / totalRevenue) * 100
      }))
      .sort((a, b) => b.amount - a.amount);

    return {
      period,
      startDate,
      endDate,
      totalRevenue,
      totalExpenses,
      netProfit,
      transactionCount,
      averageOrderValue,
      topCategories,
      paymentMethodsBreakdown
    };
  }

  // حساب الضريبة
  calculateTax(period: string): TaxData {
    const periodStart = new Date();
    const periodEnd = new Date();
    
    // تحديد فترة الضريبة (شهرية)
    if (period === 'monthly') {
      periodStart.setMonth(periodStart.getMonth() - 1);
    }

    const periodTransactions = this.transactions.filter(t =>
      t.createdAt >= periodStart && 
      t.createdAt <= periodEnd &&
      t.status === 'completed'
    );

    const totalRevenue = periodTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = periodTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const taxableIncome = totalRevenue - totalExpenses;
    const vatRate = 0.15; // 15% ضريبة القيمة المضافة في السعودية
    const vatAmount = taxableIncome * vatRate;

    return {
      period,
      taxableIncome,
      vatAmount,
      vatRate,
      exemptIncome: 0,
      deductions: totalExpenses,
      netTaxable: taxableIncome
    };
  }

  // تصدير البيانات المالية
  exportFinancialData(format: 'csv' | 'excel' | 'pdf'): string {
    if (format === 'csv') {
      let csv = 'ID,Type,Amount,Currency,Description,Category,Payment Method,Status,Date\n';
      
      this.transactions.forEach(t => {
        csv += `${t.id},${t.type},${t.amount},${t.currency},${t.description},${t.category},${t.paymentMethod},${t.status},${t.createdAt.toISOString()}\n`;
      });
      
      return csv;
    }
    
    return JSON.stringify(this.transactions, null, 2);
  }

  // إحصائيات الدخل
  getIncomeStats(): {
    totalIncome: number;
    monthlyIncome: number;
    averageDailyIncome: number;
    incomeGrowth: number;
    topPaymentMethods: { method: string; amount: number }[];
  } {
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const totalIncome = this.transactions
      .filter(t => t.type === 'income' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyIncome = this.transactions
      .filter(t => 
        t.type === 'income' && 
        t.status === 'completed' && 
        t.createdAt >= thisMonth
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const lastMonthIncome = this.transactions
      .filter(t => 
        t.type === 'income' && 
        t.status === 'completed' && 
        t.createdAt >= lastMonth && 
        t.createdAt < thisMonth
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const averageDailyIncome = monthlyIncome / daysInMonth;

    const incomeGrowth = lastMonthIncome > 0 
      ? ((monthlyIncome - lastMonthIncome) / lastMonthIncome) * 100 
      : 0;

    // أهم طرق الدفع
    const paymentMethodTotals: { [method: string]: number } = {};
    this.transactions
      .filter(t => t.type === 'income' && t.status === 'completed')
      .forEach(t => {
        paymentMethodTotals[t.paymentMethod] = (paymentMethodTotals[t.paymentMethod] || 0) + t.amount;
      });

    const topPaymentMethods = Object.entries(paymentMethodTotals)
      .map(([method, amount]) => ({ method, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    return {
      totalIncome,
      monthlyIncome,
      averageDailyIncome,
      incomeGrowth,
      topPaymentMethods
    };
  }

  // إدارة المصروفات
  addExpense(
    amount: number,
    description: string,
    category: string,
    paymentMethod: string
  ): Transaction {
    return this.addTransaction({
      type: 'expense',
      amount,
      currency: 'SAR',
      description,
      category,
      paymentMethod,
      status: 'completed',
      processedAt: new Date(),
      fees: 0
    });
  }

  // محاكاة معالجة الدفع
  private async simulatePaymentProcessing(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1500));
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('finance_data', JSON.stringify({
        transactions: this.transactions,
        exchangeRates: this.exchangeRates
      }));
    } catch (error) {
      console.error('خطأ في حفظ البيانات المالية:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('finance_data');
      if (stored) {
        const data = JSON.parse(stored);
        this.transactions = data.transactions || [];
        this.exchangeRates = data.exchangeRates || this.exchangeRates;
      }
    } catch (error) {
      console.error('خطأ في تحميل البيانات المالية:', error);
    }
  }

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  getExchangeRates(): { [currency: string]: number } {
    return this.exchangeRates;
  }

  constructor() {
    this.loadFromStorage();
  }
}

export const advancedFinance = new AdvancedFinanceService();
export type { Transaction, FinancialReport, TaxData };
