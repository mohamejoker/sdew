
/**
 * أدوات الاختبار للخدمات
 */
export class TestUtils {
  /**
   * محاكاة استجابة API
   * @param data - البيانات المراد إرجاعها
   * @param delay - التأخير بالمللي ثانية
   * @returns وعد محاكي
   */
  static mockApiResponse<T>(data: T, delay: number = 1000): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), delay);
    });
  }

  /**
   * محاكاة خطأ API
   * @param message - رسالة الخطأ
   * @param delay - التأخير بالمللي ثانية
   * @returns وعد مرفوض
   */
  static mockApiError(message: string, delay: number = 1000): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error(message)), delay);
    });
  }

  /**
   * اختبار صحة مفتاح API
   * @param key - المفتاح المراد اختباره
   * @returns true إذا كان المفتاح يبدو صالحاً
   */
  static validateApiKey(key: string): boolean {
    if (!key || key.length < 10) return false;
    if (key.includes(' ') || key.includes('\n')) return false;
    return true;
  }

  /**
   * إنشاء بيانات تجريبية للاختبار
   * @param type - نوع البيانات
   * @returns البيانات التجريبية
   */
  static generateMockData(type: 'user' | 'account' | 'analysis'): any {
    switch (type) {
      case 'user':
        return {
          id: 'test-user-' + Date.now(),
          name: 'مستخدم تجريبي',
          email: 'test@example.com',
          createdAt: new Date().toISOString()
        };
      
      case 'account':
        return {
          platform: 'instagram',
          username: 'test_account',
          followers: Math.floor(Math.random() * 10000),
          engagement: Math.random() * 10
        };
      
      case 'analysis':
        return {
          score: Math.floor(Math.random() * 100),
          insights: ['نصيحة تجريبية 1', 'نصيحة تجريبية 2'],
          recommendations: ['توصية تجريبية 1', 'توصية تجريبية 2']
        };
      
      default:
        return {};
    }
  }
}
