
interface SMMPartyService {
  service: string;
  name: string;
  type: string;
  rate: string;
  min: string;
  max: string;
  dripfeed: boolean;
  refill: boolean;
  cancel: boolean;
  category: string;
}

interface SMMPartyResponse {
  services?: SMMPartyService[];
  error?: string;
}

class SMMPartyProvider {
  private apiUrl = 'https://smmparty.com/api/v2';
  private apiKey = '8b9d9d15570d233646b130210dba475a';

  async getServices(): Promise<SMMPartyService[]> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: this.apiKey,
          action: 'services'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SMMPartyResponse = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      return data.services || [];
    } catch (error) {
      console.error('خطأ في جلب خدمات SMM Party:', error);
      throw error;
    }
  }

  async createOrder(serviceId: string, link: string, quantity: number): Promise<any> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: this.apiKey,
          action: 'add',
          service: serviceId,
          link: link,
          quantity: quantity
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('خطأ في إنشاء الطلب:', error);
      throw error;
    }
  }

  async getOrderStatus(orderId: string): Promise<any> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: this.apiKey,
          action: 'status',
          order: orderId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('خطأ في فحص حالة الطلب:', error);
      throw error;
    }
  }

  async getBalance(): Promise<number> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: this.apiKey,
          action: 'balance'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return parseFloat(data.balance) || 0;
    } catch (error) {
      console.error('خطأ في جلب الرصيد:', error);
      throw error;
    }
  }
}

export const smmPartyProvider = new SMMPartyProvider();
export type { SMMPartyService };
