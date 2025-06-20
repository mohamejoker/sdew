
import { ServiceConfig, ServiceOrder } from './types';

export class ServiceStorage {
  private readonly SERVICES_KEY = 'smm_services';
  private readonly ORDERS_KEY = 'smm_orders';

  saveServices(services: ServiceConfig[]): void {
    try {
      localStorage.setItem(this.SERVICES_KEY, JSON.stringify(services));
    } catch (error) {
      console.error('خطأ في حفظ الخدمات:', error);
    }
  }

  loadServices(): ServiceConfig[] {
    try {
      const stored = localStorage.getItem(this.SERVICES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('خطأ في تحميل الخدمات:', error);
      return [];
    }
  }

  saveOrders(orders: ServiceOrder[]): void {
    try {
      localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
    } catch (error) {
      console.error('خطأ في حفظ الطلبات:', error);
    }
  }

  loadOrders(): ServiceOrder[] {
    try {
      const stored = localStorage.getItem(this.ORDERS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('خطأ في تحميل الطلبات:', error);
      return [];
    }
  }
}

export const serviceStorage = new ServiceStorage();
