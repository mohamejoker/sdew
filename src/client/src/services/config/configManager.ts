
import { apiKeyService } from '../apiKeyService';

export class ConfigManager {
  private static instance: ConfigManager;
  private config: Map<string, any> = new Map();
  private listeners: Map<string, Function[]> = new Map();

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  // إعداد التكوين الأولي
  initialize() {
    this.loadFromStorage();
    this.setupAPIKeysValidation();
  }

  // تحميل الإعدادات من التخزين المحلي
  private loadFromStorage() {
    try {
      const stored = localStorage.getItem('app-config');
      if (stored) {
        const parsed = JSON.parse(stored);
        Object.entries(parsed).forEach(([key, value]) => {
          this.config.set(key, value);
        });
      }
    } catch (error) {
      console.error('خطأ في تحميل الإعدادات:', error);
    }
  }

  // حفظ الإعدادات في التخزين المحلي
  private saveToStorage() {
    try {
      const configObj = Object.fromEntries(this.config);
      localStorage.setItem('app-config', JSON.stringify(configObj));
    } catch (error) {
      console.error('خطأ في حفظ الإعدادات:', error);
    }
  }

  // تعيين قيمة في التكوين
  set(key: string, value: any) {
    this.config.set(key, value);
    this.saveToStorage();
    this.notifyListeners(key, value);
  }

  // الحصول على قيمة من التكوين
  get(key: string, defaultValue?: any) {
    return this.config.get(key) ?? defaultValue;
  }

  // الاستماع للتغييرات
  onChange(key: string, callback: Function) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, []);
    }
    this.listeners.get(key)!.push(callback);
  }

  // إشعار المستمعين بالتغييرات
  private notifyListeners(key: string, value: any) {
    const callbacks = this.listeners.get(key) || [];
    callbacks.forEach(callback => callback(value));
  }

  // التحقق من صحة مفاتيح API
  private setupAPIKeysValidation() {
    const providers = ['openai', 'google', 'grok'] as const;
    
    providers.forEach(provider => {
      const key = apiKeyService.getApiKey(provider);
      if (key) {
        this.validateAPIKey(provider, key);
      }
    });
  }

  // التحقق من صحة مفتاح API
  async validateAPIKey(provider: string, key: string): Promise<boolean> {
    try {
      const isValid = await apiKeyService.validateAndSetKey(provider as any, key);
      this.set(`api_${provider}_valid`, isValid);
      return isValid;
    } catch (error) {
      console.error(`خطأ في التحقق من مفتاح ${provider}:`, error);
      this.set(`api_${provider}_valid`, false);
      return false;
    }
  }

  // الحصول على حالة التطبيق
  getAppStatus() {
    const providers = ['openai', 'google', 'grok'];
    const apiStatus = providers.map(provider => ({
      provider,
      hasKey: apiKeyService.hasApiKey(provider as any),
      isValid: this.get(`api_${provider}_valid`, false)
    }));

    return {
      apiKeys: apiStatus,
      hasValidAPI: apiStatus.some(p => p.hasKey && p.isValid),
      totalProviders: providers.length,
      activeProviders: apiStatus.filter(p => p.hasKey && p.isValid).length
    };
  }
}

export const configManager = ConfigManager.getInstance();
