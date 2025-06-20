export interface APIKey {
  id: string;
  name: string;
  service: 'openai' | 'google' | 'grok' | 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'facebook';
  isActive: boolean;
  usageCount: number;
  dailyLimit?: number;
  lastUsed?: string;
  createdAt: string;
}

class APIKeyService {
  private apiKeys: Map<string, string> = new Map();
  private keyDetails: Map<string, APIKey> = new Map();

  // تخزين مفاتيح API للمزودين المختلفين
  setApiKey(provider: 'openai' | 'google' | 'grok', key: string): void {
    this.apiKeys.set(provider, key);
    // حفظ في التخزين المحلي مع التشفير
    localStorage.setItem(`apiKey_${provider}`, btoa(key));
  }

  getApiKey(provider: 'openai' | 'google' | 'grok'): string | null {
    // محاولة الحصول على المفتاح من الذاكرة
    let key = this.apiKeys.get(provider);
    
    if (!key) {
      // محاولة الحصول على المفتاح من التخزين المحلي
      const storedKey = localStorage.getItem(`apiKey_${provider}`);
      if (storedKey) {
        try {
          key = atob(storedKey);
          this.apiKeys.set(provider, key);
        } catch (error) {
          console.error('خطأ في فك تشفير مفتاح API:', error);
          return null;
        }
      }
    }
    
    return key || null;
  }

  hasApiKey(provider: 'openai' | 'google' | 'grok'): boolean {
    return this.getApiKey(provider) !== null;
  }

  removeApiKey(provider: 'openai' | 'google' | 'grok'): void {
    this.apiKeys.delete(provider);
    localStorage.removeItem(`apiKey_${provider}`);
  }

  getAllProviders(): ('openai' | 'google' | 'grok')[] {
    return ['openai', 'google', 'grok'];
  }

  getActiveProviders(): ('openai' | 'google' | 'grok')[] {
    return this.getAllProviders().filter(provider => this.hasApiKey(provider));
  }

  // الطرق الجديدة للواجهة المتقدمة
  getAllKeys(): Omit<APIKey, 'key'>[] {
    const keys: Omit<APIKey, 'key'>[] = [];
    
    // إضافة المفاتيح المخزنة
    this.getAllProviders().forEach(provider => {
      if (this.hasApiKey(provider)) {
        const stored = this.keyDetails.get(provider);
        keys.push({
          id: provider,
          name: stored?.name || provider.toUpperCase(),
          service: provider as APIKey['service'],
          isActive: stored?.isActive ?? true,
          usageCount: stored?.usageCount ?? 0,
          dailyLimit: stored?.dailyLimit,
          lastUsed: stored?.lastUsed,
          createdAt: stored?.createdAt || new Date().toISOString()
        });
      }
    });
    
    return keys;
  }

  addApiKey(name: string, service: APIKey['service'], key: string): void {
    if (['openai', 'google', 'grok'].includes(service)) {
      this.setApiKey(service as 'openai' | 'google' | 'grok', key);
      
      const keyDetail: APIKey = {
        id: service,
        name,
        service,
        isActive: true,
        usageCount: 0,
        createdAt: new Date().toISOString()
      };
      
      this.keyDetails.set(service, keyDetail);
      localStorage.setItem(`keyDetail_${service}`, JSON.stringify(keyDetail));
    }
  }

  deleteKey(id: string): void {
    if (['openai', 'google', 'grok'].includes(id)) {
      this.removeApiKey(id as 'openai' | 'google' | 'grok');
      this.keyDetails.delete(id);
      localStorage.removeItem(`keyDetail_${id}`);
    }
  }

  updateKeyStatus(id: string, isActive: boolean): void {
    const keyDetail = this.keyDetails.get(id);
    if (keyDetail) {
      keyDetail.isActive = isActive;
      this.keyDetails.set(id, keyDetail);
      localStorage.setItem(`keyDetail_${id}`, JSON.stringify(keyDetail));
    }
  }

  incrementUsage(provider: string): void {
    const keyDetail = this.keyDetails.get(provider);
    if (keyDetail) {
      keyDetail.usageCount++;
      keyDetail.lastUsed = new Date().toISOString();
      this.keyDetails.set(provider, keyDetail);
      localStorage.setItem(`keyDetail_${provider}`, JSON.stringify(keyDetail));
    }
  }

  // تحديث المفتاح مع التحقق من صحته
  async validateAndSetKey(provider: 'openai' | 'google' | 'grok', key: string): Promise<boolean> {
    try {
      // التحقق من صحة المفتاح حسب المزود
      let isValid = false;
      
      switch (provider) {
        case 'openai':
          isValid = await this.validateOpenAIKey(key);
          break;
        case 'google':
          isValid = await this.validateGoogleKey(key);
          break;
        case 'grok':
          isValid = await this.validateGrokKey(key);
          break;
      }
      
      if (isValid) {
        this.setApiKey(provider, key);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error(`خطأ في التحقق من مفتاح ${provider}:`, error);
      return false;
    }
  }

  private async validateOpenAIKey(key: string): Promise<boolean> {
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${key}`
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  private async validateGoogleKey(key: string): Promise<boolean> {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
      return response.ok;
    } catch {
      return false;
    }
  }

  private async validateGrokKey(key: string): Promise<boolean> {
    try {
      const response = await fetch('https://api.x.ai/v1/models', {
        headers: {
          'Authorization': `Bearer ${key}`
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const apiKeyService = new APIKeyService();
