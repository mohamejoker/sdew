
/**
 * مدير الأخطاء للذكاء الاصطناعي
 */
export class AIErrorHandler {
  /**
   * معالجة أخطاء الاتصال بالذكاء الاصطناعي
   * @param error - الخطأ المراد معالجته
   * @param provider - المزود الذي حدث فيه الخطأ
   * @returns رسالة خطأ مفهومة للمستخدم
   */
  handleError(error: any, provider: string): string {
    console.error(`خطأ في ${provider}:`, error);

    if (error.message?.includes('API key')) {
      return `مفتاح ${provider} غير صالح أو منتهي الصلاحية`;
    }

    if (error.message?.includes('quota')) {
      return `تم تجاوز حد الاستخدام لـ ${provider}`;
    }

    if (error.message?.includes('network') || error.message?.includes('fetch')) {
      return 'خطأ في الاتصال بالإنترنت';
    }

    return `حدث خطأ غير متوقع في ${provider}`;
  }

  /**
   * محاولة إعادة التشغيل مع مزود بديل
   * @param originalProvider - المزود الأصلي
   * @param availableProviders - المزودين المتاحين
   * @returns المزود البديل أو null
   */
  getAlternativeProvider(
    originalProvider: string, 
    availableProviders: string[]
  ): string | null {
    const alternatives = availableProviders.filter(p => p !== originalProvider);
    return alternatives.length > 0 ? alternatives[0] : null;
  }
}

export const aiErrorHandler = new AIErrorHandler();
