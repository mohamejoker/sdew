
export interface ChatPlan {
  id: string;
  name: string;
  price: number;
  period: 'daily' | 'monthly' | 'yearly';
  features: string[];
  limitations?: string[];
  messagesLimit: number | 'unlimited';
  isActive: boolean;
  trialDays?: number;
}

export interface UserUsage {
  userId: string;
  planId: string;
  messagesUsed: number;
  messagesLimit: number | 'unlimited';
  lastResetDate: Date;
  subscriptionEnd?: Date;
  isActive: boolean;
}

class ChatPlansService {
  private plans: ChatPlan[] = [
    {
      id: 'free',
      name: 'مجاني',
      price: 0,
      period: 'daily',
      features: [
        '5 رسائل يومياً مجاناً',
        'تحليل أساسي للحساب',
        'نصائح تسويقية بسيطة',
        'دعم عبر التليجرام'
      ],
      limitations: [
        'محدود بـ 5 رسائل يومياً',
        'ميزات محدودة',
        'لا يوجد حفظ للمحادثات'
      ],
      messagesLimit: 5,
      isActive: true
    },
    {
      id: 'starter',
      name: 'البداية',
      price: 99,
      period: 'monthly',
      features: [
        '100 رسالة شهرياً',
        'تحليل متقدم للحساب والمنافسين',
        'استراتيجيات تسويقية مخصصة',
        'حفظ وتصدير المحادثات',
        'قوالب محادثة جاهزة',
        'دعم أولوية'
      ],
      messagesLimit: 100,
      isActive: true,
      trialDays: 7
    },
    {
      id: 'professional',
      name: 'الاحتراف',
      price: 299,
      period: 'monthly',
      features: [
        'رسائل غير محدودة',
        'جميع ميزات الذكاء الاصطناعي',
        'تحليل عميق للمنافسين',
        'تصميم المحتوى بـ AI',
        'جدولة المنشورات',
        'تقارير تفصيلية',
        'API مخصص',
        'دعم مباشر 24/7'
      ],
      messagesLimit: 'unlimited',
      isActive: true,
      trialDays: 14
    },
    {
      id: 'enterprise',
      name: 'الشركات',
      price: 899,
      period: 'monthly',
      features: [
        'كل ميزات الخطة الاحترافية',
        'فريق دعم مخصص',
        'تدريب شخصي للفريق',
        'تكامل مع أنظمة CRM',
        'تقارير مخصصة',
        'SLA مضمون',
        'استشارات استراتيجية شهرية',
        'أولوية في الميزات الجديدة'
      ],
      messagesLimit: 'unlimited',
      isActive: true
    }
  ];

  // الحصول على جميع الخطط
  getPlans(): ChatPlan[] {
    return this.plans.filter(plan => plan.isActive);
  }

  // الحصول على خطة محددة
  getPlan(planId: string): ChatPlan | null {
    return this.plans.find(plan => plan.id === planId) || null;
  }

  // فحص صلاحية الاستخدام
  async checkUsageLimit(userId: string, planId: string): Promise<{
    canSend: boolean;
    remainingMessages: number | 'unlimited';
    resetDate?: Date;
    message: string;
  }> {
    const plan = this.getPlan(planId);
    if (!plan) {
      return {
        canSend: false,
        remainingMessages: 0,
        message: 'خطة غير صحيحة'
      };
    }

    // للخطط غير المحدودة
    if (plan.messagesLimit === 'unlimited') {
      return {
        canSend: true,
        remainingMessages: 'unlimited',
        message: 'رسائل غير محدودة'
      };
    }

    // محاكاة بيانات الاستخدام (في التطبيق الحقيقي سيتم جلبها من قاعدة البيانات)
    const usage = this.getUserUsage(userId, planId);
    
    if (usage.messagesUsed >= (plan.messagesLimit as number)) {
      const resetDate = this.getNextResetDate(plan.period);
      return {
        canSend: false,
        remainingMessages: 0,
        resetDate,
        message: `تم استنفاد الرسائل المتاحة. إعادة تعيين في ${resetDate.toLocaleDateString('ar-EG')}`
      };
    }

    const remaining = (plan.messagesLimit as number) - usage.messagesUsed;
    return {
      canSend: true,
      remainingMessages: remaining,
      message: `متبقي ${remaining} رسالة`
    };
  }

  // تسجيل استخدام رسالة
  async recordMessageUsage(userId: string, planId: string): Promise<boolean> {
    const usageCheck = await this.checkUsageLimit(userId, planId);
    
    if (!usageCheck.canSend) {
      return false;
    }

    // في التطبيق الحقيقي سيتم تحديث قاعدة البيانات
    console.log(`Message recorded for user ${userId} on plan ${planId}`);
    return true;
  }

  // الحصول على استخدام المستخدم (محاكاة)
  private getUserUsage(userId: string, planId: string): UserUsage {
    // في التطبيق الحقيقي سيتم جلبها من قاعدة البيانات
    return {
      userId,
      planId,
      messagesUsed: Math.floor(Math.random() * 3), // محاكاة استخدام عشوائي
      messagesLimit: this.getPlan(planId)?.messagesLimit as number,
      lastResetDate: new Date(),
      isActive: true
    };
  }

  // حساب تاريخ إعادة التعيين التالي
  private getNextResetDate(period: 'daily' | 'monthly' | 'yearly'): Date {
    const now = new Date();
    
    switch (period) {
      case 'daily':
        return new Date(now.getTime() + 24 * 60 * 60 * 1000);
      case 'monthly':
        const nextMonth = new Date(now);
        nextMonth.setMonth(now.getMonth() + 1);
        return nextMonth;
      case 'yearly':
        const nextYear = new Date(now);
        nextYear.setFullYear(now.getFullYear() + 1);
        return nextYear;
      default:
        return new Date(now.getTime() + 24 * 60 * 60 * 1000);
    }
  }

  // ترقية الخطة
  async upgradePlan(userId: string, newPlanId: string): Promise<{
    success: boolean;
    message: string;
    redirectToPayment?: boolean;
  }> {
    const newPlan = this.getPlan(newPlanId);
    
    if (!newPlan) {
      return {
        success: false,
        message: 'خطة غير صحيحة'
      };
    }

    if (newPlan.price === 0) {
      // خطة مجانية
      return {
        success: true,
        message: 'تم تفعيل الخطة المجانية بنجاح'
      };
    }

    // خطة مدفوعة - توجيه للدفع
    return {
      success: true,
      message: `سيتم توجيهك لإتمام دفع ${newPlan.price} ج.م لخطة ${newPlan.name}`,
      redirectToPayment: true
    };
  }

  // الحصول على إحصائيات الاستخدام
  getUsageStats(userId: string, planId: string): {
    currentPlan: string;
    messagesUsed: number;
    messagesLimit: number | 'unlimited';
    usagePercentage: number;
    daysUntilReset: number;
  } {
    const plan = this.getPlan(planId);
    const usage = this.getUserUsage(userId, planId);
    
    if (!plan) {
      return {
        currentPlan: 'غير محدد',
        messagesUsed: 0,
        messagesLimit: 0,
        usagePercentage: 0,
        daysUntilReset: 0
      };
    }

    const usagePercentage = plan.messagesLimit === 'unlimited' 
      ? 0 
      : (usage.messagesUsed / (plan.messagesLimit as number)) * 100;

    const resetDate = this.getNextResetDate(plan.period);
    const daysUntilReset = Math.ceil((resetDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

    return {
      currentPlan: plan.name,
      messagesUsed: usage.messagesUsed,
      messagesLimit: plan.messagesLimit,
      usagePercentage,
      daysUntilReset
    };
  }
}

export const chatPlansService = new ChatPlansService();
