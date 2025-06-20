
/**
 * مدير المحادثات والذاكرة
 */
export class ConversationManager {
  private context: any = {};
  private conversationHistory: string[] = [];

  /**
   * إضافة رسالة إلى تاريخ المحادثة
   * @param message - الرسالة المراد إضافتها
   */
  addToHistory(message: string): void {
    this.conversationHistory.push(message);
    
    // الاحتفاظ بآخر 50 رسالة فقط
    if (this.conversationHistory.length > 50) {
      this.conversationHistory.shift();
    }
  }

  /**
   * الحصول على ملخص المحادثة
   * @returns ملخص المحادثة الحالية
   */
  getConversationSummary(): string {
    if (this.conversationHistory.length === 0) {
      return 'لا توجد محادثات سابقة';
    }
    
    return 'مناقشة استراتيجيات التسويق الرقمي وتحسين المحتوى';
  }

  /**
   * تعيين قيمة في السياق
   * @param key - المفتاح
   * @param value - القيمة
   */
  setContext(key: string, value: any): void {
    this.context[key] = value;
  }

  /**
   * الحصول على قيمة من السياق
   * @param key - المفتاح المراد البحث عنه
   * @returns القيمة المرتبطة بالمفتاح
   */
  getContext(key: string): any {
    return this.context[key];
  }

  /**
   * مسح السياق بالكامل
   */
  clearContext(): void {
    this.context = {};
    this.conversationHistory = [];
  }
}

export const conversationManager = new ConversationManager();
