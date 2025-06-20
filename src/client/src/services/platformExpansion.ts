
interface PlatformService {
  id: string;
  platform: 'linkedin' | 'pinterest' | 'tiktok' | 'clubhouse' | 'discord';
  name: string;
  description: string;
  category: 'social' | 'professional' | 'creative' | 'audio' | 'gaming';
  services: Array<{
    type: 'followers' | 'connections' | 'views' | 'likes' | 'saves' | 'shares';
    name: string;
    price: number;
    minOrder: number;
    maxOrder: number;
    deliveryTime: string;
    quality: 'high' | 'premium' | 'standard';
  }>;
  isActive: boolean;
  comingSoon: boolean;
}

class PlatformExpansionService {
  private platforms: PlatformService[] = [
    {
      id: 'linkedin',
      platform: 'linkedin',
      name: 'LinkedIn',
      description: 'الشبكة المهنية الأولى عالمياً',
      category: 'professional',
      services: [
        {
          type: 'connections',
          name: 'اتصالات LinkedIn',
          price: 0.15,
          minOrder: 100,
          maxOrder: 5000,
          deliveryTime: '2-5 أيام',
          quality: 'premium'
        },
        {
          type: 'followers',
          name: 'متابعين LinkedIn',
          price: 0.12,
          minOrder: 100,
          maxOrder: 10000,
          deliveryTime: '1-3 أيام',
          quality: 'high'
        },
        {
          type: 'views',
          name: 'مشاهدات البروفايل',
          price: 0.02,
          minOrder: 1000,
          maxOrder: 50000,
          deliveryTime: '1-2 أيام',
          quality: 'standard'
        }
      ],
      isActive: true,
      comingSoon: false
    },
    {
      id: 'pinterest',
      platform: 'pinterest',
      name: 'Pinterest',
      description: 'منصة الإلهام والأفكار الإبداعية',
      category: 'creative',
      services: [
        {
          type: 'followers',
          name: 'متابعين Pinterest',
          price: 0.08,
          minOrder: 100,
          maxOrder: 10000,
          deliveryTime: '1-3 أيام',
          quality: 'high'
        },
        {
          type: 'saves',
          name: 'حفظ الصور (Pin Saves)',
          price: 0.05,
          minOrder: 100,
          maxOrder: 5000,
          deliveryTime: '1-2 أيام',
          quality: 'premium'
        },
        {
          type: 'views',
          name: 'مشاهدات البين',
          price: 0.01,
          minOrder: 1000,
          maxOrder: 100000,
          deliveryTime: '6-24 ساعة',
          quality: 'standard'
        }
      ],
      isActive: true,
      comingSoon: false
    },
    {
      id: 'clubhouse',
      platform: 'clubhouse',
      name: 'Clubhouse',
      description: 'منصة المحادثات الصوتية الحية',
      category: 'audio',
      services: [
        {
          type: 'followers',
          name: 'متابعين Clubhouse',
          price: 0.25,
          minOrder: 50,
          maxOrder: 2000,
          deliveryTime: '3-7 أيام',
          quality: 'premium'
        }
      ],
      isActive: false,
      comingSoon: true
    },
    {
      id: 'discord',
      platform: 'discord',
      name: 'Discord',
      description: 'منصة التواصل للألعاب والمجتمعات',
      category: 'gaming',
      services: [
        {
          type: 'followers',
          name: 'أعضاء Discord Server',
          price: 0.18,
          minOrder: 100,
          maxOrder: 5000,
          deliveryTime: '2-4 أيام',
          quality: 'high'
        }
      ],
      isActive: false,
      comingSoon: true
    }
  ];

  private designServices = [
    {
      id: 'logo-design',
      name: 'تصميم الشعارات',
      description: 'شعارات احترافية ومميزة',
      price: 150,
      deliveryTime: '3-5 أيام',
      revisions: 3
    },
    {
      id: 'social-media-designs',
      name: 'تصاميم السوشيال ميديا',
      description: 'قوالب وتصاميم للمنصات الاجتماعية',
      price: 80,
      deliveryTime: '2-3 أيام',
      revisions: 2
    },
    {
      id: 'video-editing',
      name: 'مونتاج الفيديوهات',
      description: 'مونتاج احترافي للريلز والفيديوهات',
      price: 120,
      deliveryTime: '4-6 أيام',
      revisions: 2
    }
  ];

  private consultingServices = [
    {
      id: 'social-media-strategy',
      name: 'استراتيجية السوشيال ميديا',
      description: 'خطة شاملة للنمو على المنصات',
      price: 500,
      duration: '60 دقيقة',
      deliverables: ['تحليل الوضع الحالي', 'استراتيجية مخصصة', 'خطة المحتوى']
    },
    {
      id: 'content-planning',
      name: 'تخطيط المحتوى',
      description: 'جدولة وتخطيط المحتوى الشهري',
      price: 300,
      duration: '45 دقيقة',
      deliverables: ['كالندر محتوى', 'أفكار إبداعية', 'استراتيجية النشر']
    },
    {
      id: 'competitor-analysis',
      name: 'تحليل المنافسين',
      description: 'دراسة شاملة للمنافسين والسوق',
      price: 250,
      duration: '30 دقيقة',
      deliverables: ['تقرير تحليل', 'نقاط القوة والضعف', 'توصيات العمل']
    }
  ];

  getPlatforms(filter?: { category?: string; isActive?: boolean }) {
    let filteredPlatforms = [...this.platforms];

    if (filter) {
      if (filter.category) {
        filteredPlatforms = filteredPlatforms.filter(p => p.category === filter.category);
      }
      if (filter.isActive !== undefined) {
        filteredPlatforms = filteredPlatforms.filter(p => p.isActive === filter.isActive);
      }
    }

    return filteredPlatforms;
  }

  getPlatformById(id: string) {
    return this.platforms.find(p => p.id === id);
  }

  getDesignServices() {
    return this.designServices;
  }

  getConsultingServices() {
    return this.consultingServices;
  }

  addNewPlatform(platform: Omit<PlatformService, 'id'>) {
    const newPlatform: PlatformService = {
      ...platform,
      id: Date.now().toString()
    };
    this.platforms.push(newPlatform);
    return newPlatform;
  }

  updatePlatformStatus(id: string, isActive: boolean) {
    const platform = this.platforms.find(p => p.id === id);
    if (platform) {
      platform.isActive = isActive;
      return platform;
    }
    return null;
  }

  getServicesByPlatform(platformId: string) {
    const platform = this.getPlatformById(platformId);
    return platform ? platform.services : [];
  }

  calculateServicePrice(platformId: string, serviceType: string, quantity: number) {
    const platform = this.getPlatformById(platformId);
    if (!platform) return null;

    const service = platform.services.find(s => s.type === serviceType);
    if (!service) return null;

    const basePrice = service.price * quantity;
    const finalPrice = basePrice * 1.3; // 30% profit margin

    return {
      basePrice,
      finalPrice,
      profit: finalPrice - basePrice,
      service
    };
  }

  // محاكاة طلب خدمة جديدة
  createServiceOrder(platformId: string, serviceType: string, quantity: number, targetUrl: string) {
    const pricing = this.calculateServicePrice(platformId, serviceType, quantity);
    if (!pricing) throw new Error('خدمة غير متاحة');

    const order = {
      id: Date.now().toString(),
      platformId,
      serviceType,
      quantity,
      targetUrl,
      pricing,
      status: 'pending' as const,
      createdAt: new Date(),
      estimatedCompletion: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days
    };

    console.log('تم إنشاء طلب جديد:', order);
    return order;
  }

  getExpansionRoadmap() {
    return {
      'Q1 2024': [
        'LinkedIn - خدمات احترافية كاملة',
        'Pinterest - تسويق المحتوى المرئي'
      ],
      'Q2 2024': [
        'Clubhouse - المحادثات الصوتية',
        'Discord - مجتمعات الألعاب'
      ],
      'Q3 2024': [
        'Reddit - المجتمعات المتخصصة',
        'Twitch - البث المباشر'
      ],
      'Q4 2024': [
        'خدمات الذكاء الاصطناعي المتقدمة',
        'منصات ناشئة جديدة'
      ]
    };
  }
}

export const platformExpansion = new PlatformExpansionService();
export type { PlatformService };
