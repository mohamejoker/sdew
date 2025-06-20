interface Provider {
  id: string;
  name: string;
  apiUrl: string;
  apiKey: string;
  isActive: boolean;
  description: string;
  reliability: number;
  speed: 'fast' | 'medium' | 'slow';
  supportedPlatforms: string[];
  lastSync: Date;
}

interface ServiceItem {
  id: string;
  providerId: string;
  serviceId: string;
  name: string;
  type: 'followers' | 'likes' | 'views' | 'comments' | 'shares';
  platform: 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'snapchat';
  category: string;
  rate: number;
  minOrder: number;
  maxOrder: number;
  description: string;
  isActive: boolean;
  quality: 'high' | 'medium' | 'low';
  refillEnabled: boolean;
  cancelEnabled: boolean;
  averageTime: string;
}

import { smmPartyProvider, type SMMPartyService } from './smmPartyProvider';

class ProviderService {
  private providers: Provider[] = [
    {
      id: '1',
      name: 'SMM Party',
      apiUrl: 'https://smmparty.com/api/v2',
      apiKey: '8b9d9d15570d233646b130210dba475a',
      isActive: true,
      description: 'مورد خدمات سوشيال ميديا عالي الجودة - SMM Party',
      reliability: 96,
      speed: 'fast',
      supportedPlatforms: ['instagram', 'tiktok', 'youtube', 'twitter', 'facebook'],
      lastSync: new Date()
    },
    {
      id: '2', 
      name: 'SMM Provider 2',
      apiUrl: 'https://example-smm-2.com/api',
      apiKey: 'demo-key-2',
      isActive: true,
      description: 'متخصص في خدمات انستغرام وتيك توك',
      reliability: 88,
      speed: 'medium',
      supportedPlatforms: ['instagram', 'tiktok'],
      lastSync: new Date()
    }
  ];

  private services: ServiceItem[] = [
    {
      id: '1',
      providerId: '1',
      serviceId: 'svc_001',
      name: 'متابعين انستغرام - جودة عالية',
      type: 'followers',
      platform: 'instagram',
      category: 'Instagram Followers',
      rate: 0.5,
      minOrder: 100,
      maxOrder: 100000,
      description: 'متابعين حقيقيين وآمنين للحساب',
      isActive: true,
      quality: 'high',
      refillEnabled: true,
      cancelEnabled: false,
      averageTime: '12-24 ساعة'
    },
    {
      id: '2',
      providerId: '2',
      serviceId: 'svc_002',
      name: 'لايكات انستغرام سريعة',
      type: 'likes',
      platform: 'instagram',
      category: 'Instagram Likes',
      rate: 0.1,
      minOrder: 50,
      maxOrder: 50000,
      description: 'لايكات سريعة وآمنة للبوستات',
      isActive: true,
      quality: 'medium',
      refillEnabled: false,
      cancelEnabled: true,
      averageTime: '1-6 ساعات'
    }
  ];

  getProviders(): Provider[] {
    return this.providers;
  }

  addProvider(providerData: Omit<Provider, 'id' | 'lastSync'>): Provider {
    const newProvider: Provider = {
      ...providerData,
      id: Date.now().toString(),
      lastSync: new Date()
    };
    this.providers.push(newProvider);
    return newProvider;
  }

  updateProvider(id: string, updates: Partial<Provider>): Provider | null {
    const index = this.providers.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    this.providers[index] = { ...this.providers[index], ...updates };
    return this.providers[index];
  }

  deleteProvider(id: string): boolean {
    const index = this.providers.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    this.providers.splice(index, 1);
    this.services = this.services.filter(s => s.providerId !== id);
    return true;
  }

  async syncProviderServices(providerId: string): Promise<ServiceItem[]> {
    const provider = this.providers.find(p => p.id === providerId);
    if (!provider) throw new Error('Provider not found');
    
    try {
      if (provider.name === 'SMM Party') {
        // استخدام API الحقيقي لـ SMM Party
        const smmServices = await smmPartyProvider.getServices();
        
        // تحويل خدمات SMM Party إلى تنسيق النظام
        const convertedServices: ServiceItem[] = smmServices.map((service: SMMPartyService) => ({
          id: `smm_${service.service}`,
          providerId: providerId,
          serviceId: service.service,
          name: service.name,
          type: this.mapServiceType(service.type),
          platform: this.mapPlatform(service.category),
          category: service.category,
          rate: parseFloat(service.rate),
          minOrder: parseInt(service.min),
          maxOrder: parseInt(service.max),
          description: service.name,
          isActive: true,
          quality: 'high',
          refillEnabled: service.refill,
          cancelEnabled: service.cancel,
          averageTime: '1-24 ساعة'
        }));

        // تحديث الخدمات المحلية
        this.services = this.services.filter(s => s.providerId !== providerId);
        this.services.push(...convertedServices);
        
        provider.lastSync = new Date();
        return convertedServices;
      } else {
        // محاكاة للموردين الآخرين
        await new Promise(resolve => setTimeout(resolve, 1000));
        provider.lastSync = new Date();
        return this.services.filter(s => s.providerId === providerId);
      }
    } catch (error) {
      console.error('فشل في مزامنة الخدمات:', error);
      throw new Error('فشل في مزامنة الخدمات');
    }
  }

  private mapServiceType(type: string): 'followers' | 'likes' | 'views' | 'comments' | 'shares' {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('follow')) return 'followers';
    if (lowerType.includes('like')) return 'likes';
    if (lowerType.includes('view')) return 'views';
    if (lowerType.includes('comment')) return 'comments';
    if (lowerType.includes('share')) return 'shares';
    return 'likes'; // افتراضي
  }

  private mapPlatform(category: string): 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'snapchat' {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('instagram')) return 'instagram';
    if (lowerCategory.includes('tiktok')) return 'tiktok';
    if (lowerCategory.includes('youtube')) return 'youtube';
    if (lowerCategory.includes('twitter')) return 'twitter';
    if (lowerCategory.includes('snapchat')) return 'snapchat';
    return 'instagram'; // افتراضي
  }

  async createOrder(serviceId: string, link: string, quantity: number): Promise<any> {
    const service = this.services.find(s => s.id === serviceId);
    if (!service) throw new Error('الخدمة غير موجودة');

    const provider = this.providers.find(p => p.id === service.providerId);
    if (!provider) throw new Error('المورد غير موجود');

    if (provider.name === 'SMM Party') {
      return await smmPartyProvider.createOrder(service.serviceId, link, quantity);
    } else {
      // محاكاة للموردين الآخرين
      return {
        order: Date.now().toString(),
        status: 'Pending'
      };
    }
  }

  async getOrderStatus(orderId: string, providerId: string): Promise<any> {
    const provider = this.providers.find(p => p.id === providerId);
    if (!provider) throw new Error('المورد غير موجود');

    if (provider.name === 'SMM Party') {
      return await smmPartyProvider.getOrderStatus(orderId);
    } else {
      // محاكاة للموردين الآخرين
      return {
        order: orderId,
        status: 'Completed',
        charge: '10.00',
        start_count: '1000',
        remains: '0'
      };
    }
  }

  async getProviderBalance(providerId: string): Promise<number> {
    const provider = this.providers.find(p => p.id === providerId);
    if (!provider) throw new Error('المورد غير موجود');

    if (provider.name === 'SMM Party') {
      return await smmPartyProvider.getBalance();
    } else {
      // محاكاة للموردين الآخرين
      return 100.50;
    }
  }

  getProviderServices(providerId?: string): ServiceItem[] {
    if (providerId) {
      return this.services.filter(s => s.providerId === providerId);
    }
    return this.services;
  }

  addService(serviceData: Omit<ServiceItem, 'id'>): ServiceItem {
    const newService: ServiceItem = {
      ...serviceData,
      id: Date.now().toString()
    };
    this.services.push(newService);
    return newService;
  }

  updateService(id: string, updates: Partial<ServiceItem>): ServiceItem | null {
    const index = this.services.findIndex(s => s.id === id);
    if (index === -1) return null;
    
    this.services[index] = { ...this.services[index], ...updates };
    return this.services[index];
  }

  deleteService(id: string): boolean {
    const index = this.services.findIndex(s => s.id === id);
    if (index === -1) return false;
    
    this.services.splice(index, 1);
    return true;
  }
}

export const providerService = new ProviderService();
