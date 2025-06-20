
interface CRMContact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  socialProfiles: {
    platform: string;
    username: string;
    followers?: number;
  }[];
  orders: string[];
  totalSpent: number;
  lastContact: Date;
  status: 'active' | 'inactive' | 'prospect';
  tags: string[];
  notes: string;
}

interface CRMIntegration {
  name: string;
  apiUrl: string;
  apiKey: string;
  isActive: boolean;
  lastSync: Date;
  features: string[];
}

class CRMIntegrationService {
  private integrations: CRMIntegration[] = [];
  private contacts: CRMContact[] = [];

  // إضافة تكامل CRM
  addIntegration(integration: Omit<CRMIntegration, 'lastSync'>): boolean {
    try {
      const newIntegration: CRMIntegration = {
        ...integration,
        lastSync: new Date()
      };
      
      this.integrations.push(newIntegration);
      this.saveToStorage();
      return true;
    } catch (error) {
      console.error('فشل في إضافة تكامل CRM:', error);
      return false;
    }
  }

  // مزامنة جهات الاتصال
  async syncContacts(crmName: string): Promise<boolean> {
    try {
      const integration = this.integrations.find(i => i.name === crmName);
      if (!integration) return false;

      // محاكاة مزامنة البيانات
      await this.simulateSync();

      const mockContacts: CRMContact[] = [
        {
          id: '1',
          name: 'أحمد محمد',
          email: 'ahmed@example.com',
          phone: '+201234567890',
          socialProfiles: [
            { platform: 'instagram', username: '@ahmed_official', followers: 25000 }
          ],
          orders: ['ORD001', 'ORD002'],
          totalSpent: 2500,
          lastContact: new Date(),
          status: 'active',
          tags: ['vip', 'instagram'],
          notes: 'عميل مهم، يفضل خدمات Instagram'
        },
        {
          id: '2',
          name: 'فاطمة علي',
          email: 'fatima@example.com',
          socialProfiles: [
            { platform: 'tiktok', username: '@fatima_content', followers: 50000 }
          ],
          orders: ['ORD003'],
          totalSpent: 1200,
          lastContact: new Date(),
          status: 'active',
          tags: ['influencer', 'tiktok'],
          notes: 'مؤثرة على TikTok'
        }
      ];

      this.contacts = [...this.contacts, ...mockContacts];
      integration.lastSync = new Date();
      this.saveToStorage();
      return true;
    } catch (error) {
      console.error('فشل في مزامنة جهات الاتصال:', error);
      return false;
    }
  }

  // إنشاء جهة اتصال جديدة
  createContact(contactData: Omit<CRMContact, 'id'>): CRMContact {
    const newContact: CRMContact = {
      id: Date.now().toString(),
      ...contactData
    };

    this.contacts.push(newContact);
    this.saveToStorage();
    return newContact;
  }

  // تحديث جهة اتصال
  updateContact(id: string, updates: Partial<CRMContact>): boolean {
    const index = this.contacts.findIndex(c => c.id === id);
    if (index !== -1) {
      this.contacts[index] = { ...this.contacts[index], ...updates };
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // البحث في جهات الاتصال
  searchContacts(query: string): CRMContact[] {
    const lowercaseQuery = query.toLowerCase();
    return this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowercaseQuery) ||
      contact.email.toLowerCase().includes(lowercaseQuery) ||
      contact.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  // فلترة جهات الاتصال
  filterContacts(filters: {
    status?: CRMContact['status'];
    platform?: string;
    minSpent?: number;
    tags?: string[];
  }): CRMContact[] {
    return this.contacts.filter(contact => {
      if (filters.status && contact.status !== filters.status) return false;
      if (filters.platform && !contact.socialProfiles.some(p => p.platform === filters.platform)) return false;
      if (filters.minSpent && contact.totalSpent < filters.minSpent) return false;
      if (filters.tags && !filters.tags.some(tag => contact.tags.includes(tag))) return false;
      return true;
    });
  }

  // تحليلات جهات الاتصال
  getContactAnalytics(): {
    totalContacts: number;
    activeContacts: number;
    totalRevenue: number;
    averageOrderValue: number;
    topPlatforms: { platform: string; count: number }[];
    topSpenders: CRMContact[];
  } {
    const totalContacts = this.contacts.length;
    const activeContacts = this.contacts.filter(c => c.status === 'active').length;
    const totalRevenue = this.contacts.reduce((sum, c) => sum + c.totalSpent, 0);
    const averageOrderValue = totalRevenue / totalContacts || 0;

    // أهم المنصات
    const platformCounts: { [key: string]: number } = {};
    this.contacts.forEach(contact => {
      contact.socialProfiles.forEach(profile => {
        platformCounts[profile.platform] = (platformCounts[profile.platform] || 0) + 1;
      });
    });

    const topPlatforms = Object.entries(platformCounts)
      .map(([platform, count]) => ({ platform, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const topSpenders = [...this.contacts]
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 10);

    return {
      totalContacts,
      activeContacts,
      totalRevenue,
      averageOrderValue,
      topPlatforms,
      topSpenders
    };
  }

  private async simulateSync(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('crm_data', JSON.stringify({
        integrations: this.integrations,
        contacts: this.contacts
      }));
    } catch (error) {
      console.error('خطأ في حفظ بيانات CRM:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('crm_data');
      if (stored) {
        const data = JSON.parse(stored);
        this.integrations = data.integrations || [];
        this.contacts = data.contacts || [];
      }
    } catch (error) {
      console.error('خطأ في تحميل بيانات CRM:', error);
    }
  }

  getContacts(): CRMContact[] {
    return this.contacts;
  }

  getIntegrations(): CRMIntegration[] {
    return this.integrations;
  }

  constructor() {
    this.loadFromStorage();
  }
}

export const crmIntegration = new CRMIntegrationService();
export type { CRMContact, CRMIntegration };
