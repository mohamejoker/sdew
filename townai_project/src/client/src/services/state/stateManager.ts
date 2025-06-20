
/**
 * مدير الحالة العام للتطبيق
 */
export class StateManager {
  private static instance: StateManager;
  private state: Record<string, any> = {};
  private listeners: Record<string, ((value: any) => void)[]> = {};

  constructor() {
    if (StateManager.instance) {
      return StateManager.instance;
    }
    StateManager.instance = this;
  }

  /**
   * تعيين قيمة في الحالة
   * @param key - المفتاح
   * @param value - القيمة
   */
  setState(key: string, value: any): void {
    const oldValue = this.state[key];
    this.state[key] = value;
    
    // إشعار المستمعين
    if (this.listeners[key] && oldValue !== value) {
      this.listeners[key].forEach(listener => listener(value));
    }
  }

  /**
   * الحصول على قيمة من الحالة
   * @param key - المفتاح
   * @returns القيمة
   */
  getState(key: string): any {
    return this.state[key];
  }

  /**
   * الاشتراك في تغييرات قيمة معينة
   * @param key - المفتاح
   * @param listener - دالة المستمع
   * @returns دالة إلغاء الاشتراك
   */
  subscribe(key: string, listener: (value: any) => void): () => void {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    
    this.listeners[key].push(listener);
    
    // إرجاع دالة إلغاء الاشتراك
    return () => {
      const index = this.listeners[key].indexOf(listener);
      if (index > -1) {
        this.listeners[key].splice(index, 1);
      }
    };
  }

  /**
   * مسح قيمة من الحالة
   * @param key - المفتاح
   */
  clearState(key: string): void {
    delete this.state[key];
    delete this.listeners[key];
  }

  /**
   * مسح كامل للحالة
   */
  clearAll(): void {
    this.state = {};
    this.listeners = {};
  }
}

export const stateManager = new StateManager();
