
export class ErrorHandler {
  static logError(error: any, context?: string) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[${context || 'Error'}]:`, error);
    }
    // في الإنتاج، يمكن إرسال الأخطاء لخدمة مراقبة
  }

  static getErrorMessage(error: any): string {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    if (error?.error_description) return error.error_description;
    return 'حدث خطأ غير متوقع';
  }

  static isNetworkError(error: any): boolean {
    return error?.code === 'NETWORK_ERROR' || 
           error?.message?.includes('fetch') ||
           error?.message?.includes('network');
  }

  static isAuthError(error: any): boolean {
    return error?.code === 'UNAUTHORIZED' || 
           error?.status === 401 ||
           error?.message?.includes('auth');
  }

  static isValidationError(error: any): boolean {
    return error?.code === 'VALIDATION_ERROR' ||
           error?.message?.includes('validation') ||
           error?.message?.includes('required');
  }

  static handleApiError(error: any): string {
    if (this.isNetworkError(error)) {
      return 'خطأ في الاتصال بالشبكة';
    }
    
    if (this.isAuthError(error)) {
      return 'خطأ في المصادقة - يرجى تسجيل الدخول مرة أخرى';
    }
    
    if (this.isValidationError(error)) {
      return 'البيانات المدخلة غير صحيحة';
    }
    
    return this.getErrorMessage(error);
  }
}
