
import type { SocialAccount } from '../types/socialTypes';

/**
 * خدمة جلب بيانات الحسابات الاجتماعية
 */
export class DataFetcher {
  // تم إزالة مفاتيح API الخارجية - يتم استخدام البيانات التجريبية

  /**
   * جلب بيانات الحساب من API المنصة
   */
  async fetchAccountData(platform: string, username: string): Promise<SocialAccount> {
    // في التطبيق الحقيقي، ستتم مناداة APIs الحقيقية للمنصات
    await this.simulateApiCall();

    const mockData: SocialAccount = {
      platform: platform as any,
      username,
      url: this.buildProfileUrl(platform, username),
      isValid: true,
      isPublic: true,
      isVerified: Math.random() > 0.7,
      followers: Math.floor(Math.random() * 100000) + 1000,
      following: Math.floor(Math.random() * 5000) + 100,
      posts: Math.floor(Math.random() * 1000) + 50,
      engagement: {
        rate: Math.random() * 10 + 1,
        avgLikes: Math.floor(Math.random() * 1000) + 50,
        avgComments: Math.floor(Math.random() * 100) + 10,
        avgViews: platform === 'youtube' || platform === 'tiktok' ? Math.floor(Math.random() * 10000) + 1000 : undefined
      },
      profile: {
        name: `حساب ${username}`,
        bio: 'هذا وصف تجريبي للحساب',
        avatar: 'https://via.placeholder.com/150',
        category: this.getRandomCategory(),
        location: 'السعودية',
        website: 'https://example.com'
      },
      lastUpdate: new Date(),
      isActive: Math.random() > 0.2,
      growthRate: {
        daily: Math.random() * 2 - 1,
        weekly: Math.random() * 10 - 5,
        monthly: Math.random() * 20 - 10
      }
    };

    return mockData;
  }

  /**
   * بناء رابط الملف الشخصي
   */
  private buildProfileUrl(platform: string, username: string): string {
    switch (platform) {
      case 'instagram': return `https://instagram.com/${username}`;
      case 'tiktok': return `https://tiktok.com/@${username}`;
      case 'youtube': return `https://youtube.com/@${username}`;
      case 'twitter': return `https://twitter.com/${username}`;
      case 'facebook': return `https://facebook.com/${username}`;
      default: return '';
    }
  }

  /**
   * إنتاج فئة عشوائية
   */
  private getRandomCategory(): string {
    const categories = [
      'مؤثر', 'علامة تجارية', 'مطعم', 'أزياء', 'تقنية', 
      'رياضة', 'موسيقى', 'فن', 'تعليم', 'صحة'
    ];
    return categories[Math.floor(Math.random() * categories.length)];
  }

  /**
   * محاكاة API call
   */
  private simulateApiCall(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1500));
  }

  /**
   * التحقق من توفر مفاتيح API
   */
  checkApiKeysAvailability(): { [key: string]: boolean } {
    return {
      instagram: true, // يستخدم البيانات التجريبية
      youtube: true,
      twitter: true,
      tiktok: true
    };
  }
}

export const dataFetcher = new DataFetcher();
