
import { ServiceConfig, ServiceOrder, ServiceFilters, ServiceStats } from './services/types';
import { serviceCalculator } from './services/serviceCalculator';
import { serviceStorage } from './services/serviceStorage';
import { serviceStatsCalculator } from './services/serviceStatsCalculator';

class ServicesManager {
  private services: ServiceConfig[] = [];
  private orders: ServiceOrder[] = [];
  private profitMargin = 30;

  constructor() {
    this.loadFromStorage();
  }

  addService(serviceData: Omit<ServiceConfig, 'id' | 'finalPrice'>): ServiceConfig {
    const finalPrice = serviceCalculator.calculateFinalPrice(
      serviceData.providerPrice, 
      serviceData.profitMargin || this.profitMargin
    );
    
    const newService: ServiceConfig = {
      ...serviceData,
      id: this.generateId(),
      finalPrice,
      profitMargin: serviceData.profitMargin || this.profitMargin
    };

    this.services.push(newService);
    this.saveToStorage();
    return newService;
  }

  updateService(id: string, updates: Partial<ServiceConfig>): ServiceConfig | null {
    const serviceIndex = this.services.findIndex(s => s.id === id);
    if (serviceIndex === -1) return null;

    const updatedService = { ...this.services[serviceIndex], ...updates };
    
    if (updates.providerPrice || updates.profitMargin) {
      updatedService.finalPrice = serviceCalculator.calculateFinalPrice(
        updatedService.providerPrice, 
        updatedService.profitMargin
      );
    }

    this.services[serviceIndex] = updatedService;
    this.saveToStorage();
    return updatedService;
  }

  deleteService(id: string): boolean {
    const initialLength = this.services.length;
    this.services = this.services.filter(s => s.id !== id);
    
    if (this.services.length < initialLength) {
      this.saveToStorage();
      return true;
    }
    return false;
  }

  getServices(filters?: ServiceFilters): ServiceConfig[] {
    let filteredServices = [...this.services];

    if (filters) {
      if (filters.platform) {
        filteredServices = filteredServices.filter(s => s.platform === filters.platform);
      }
      if (filters.type) {
        filteredServices = filteredServices.filter(s => s.type === filters.type);
      }
      if (filters.isActive !== undefined) {
        filteredServices = filteredServices.filter(s => s.isActive === filters.isActive);
      }
      if (filters.category) {
        filteredServices = filteredServices.filter(s => s.category === filters.category);
      }
    }

    return filteredServices.sort((a, b) => a.platform.localeCompare(b.platform));
  }

  createOrder(orderData: Omit<ServiceOrder, 'id' | 'createdAt' | 'profit' | 'finalPrice'>): ServiceOrder {
    const service = this.services.find(s => s.id === orderData.serviceId);
    if (!service) throw new Error('الخدمة غير موجودة');

    const finalPrice = service.finalPrice * orderData.quantity;
    const profit = serviceCalculator.calculateProfit(
      service.providerPrice, 
      orderData.quantity, 
      service.profitMargin
    );

    const newOrder: ServiceOrder = {
      ...orderData,
      id: this.generateId(),
      finalPrice,
      profit,
      createdAt: new Date()
    };

    this.orders.push(newOrder);
    this.saveOrdersToStorage();
    return newOrder;
  }

  getOrders(userId?: string): ServiceOrder[] {
    return userId 
      ? this.orders.filter(o => o.userId === userId)
      : this.orders;
  }

  updateOrderStatus(orderId: string, status: ServiceOrder['status'], additionalData?: Partial<ServiceOrder>): boolean {
    const orderIndex = this.orders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) return false;

    this.orders[orderIndex] = {
      ...this.orders[orderIndex],
      status,
      ...additionalData,
      ...(status === 'completed' && !this.orders[orderIndex].completedAt ? { completedAt: new Date() } : {})
    };

    this.saveOrdersToStorage();
    return true;
  }

  getStats(): ServiceStats {
    const activeServices = this.services.filter(s => s.isActive).length;
    return serviceStatsCalculator.calculateStats(this.orders, this.services.length, activeServices);
  }

  async syncWithProvider(providerId: string): Promise<ServiceConfig[]> {
    console.log(`مزامنة مع المورد: ${providerId}`);
    return this.services.filter(s => s.providerId === providerId);
  }

  updateGlobalProfitMargin(newMargin: number): void {
    this.profitMargin = newMargin;
    
    this.services.forEach(service => {
      service.profitMargin = newMargin;
      service.finalPrice = serviceCalculator.calculateFinalPrice(service.providerPrice, newMargin);
    });
    
    this.saveToStorage();
  }

  // Provider Management Methods
  async getProviders() {
    // Return mock data for now
    return [
      {
        id: '1',
        name: 'SMM Party',
        api_url: 'https://smmparty.com/api',
        api_key: '••••••••••',
        is_active: true,
        services_count: 150,
        active_services: 142,
        reliability: 98
      }
    ];
  }

  async createProvider(providerData: any) {
    console.log('Creating provider:', providerData);
    return { ...providerData, id: Date.now().toString() };
  }

  async updateProvider(id: string, updates: any) {
    console.log('Updating provider:', id, updates);
    return { id, ...updates };
  }

  async deleteProvider(id: string) {
    console.log('Deleting provider:', id);
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private saveToStorage(): void {
    serviceStorage.saveServices(this.services);
  }

  private saveOrdersToStorage(): void {
    serviceStorage.saveOrders(this.orders);
  }

  private loadFromStorage(): void {
    this.services = serviceStorage.loadServices();
    this.orders = serviceStorage.loadOrders();
  }
}

export const servicesManager = new ServicesManager();
export type { ServiceConfig, ServiceOrder };
