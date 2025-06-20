// API client for server communication
import { Service, ServiceOrder, Transaction, Provider, Notification, Profile } from "@shared/schema";

const API_BASE = "";

class ApiClient {
  // عند كل طلب API، أضف التوكن تلقائياً إذا كان موجوداً
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options?.headers,
    };
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Services
  async getServices(): Promise<Service[]> {
    return this.request<Service[]>('/api/services');
  }

  async getService(id: string): Promise<Service> {
    return this.request<Service>(`/api/services/${id}`);
  }

  async createService(service: Partial<Service>): Promise<Service> {
    return this.request<Service>('/api/services', {
      method: 'POST',
      body: JSON.stringify(service),
    });
  }

  async updateService(id: string, service: Partial<Service>): Promise<Service> {
    return this.request<Service>(`/api/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(service),
    });
  }

  async deleteService(id: string): Promise<void> {
    await this.request<void>(`/api/services/${id}`, {
      method: 'DELETE',
    });
  }

  // Service Orders
  async getOrders(): Promise<ServiceOrder[]> {
    return this.request<ServiceOrder[]>('/api/orders');
  }

  async getOrder(id: string): Promise<ServiceOrder> {
    return this.request<ServiceOrder>(`/api/orders/${id}`);
  }

  async createOrder(order: Partial<ServiceOrder>): Promise<ServiceOrder> {
    return this.request<ServiceOrder>('/api/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  async updateOrder(id: string, order: Partial<ServiceOrder>): Promise<ServiceOrder> {
    return this.request<ServiceOrder>(`/api/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(order),
    });
  }

  // Transactions
  async getTransactions(): Promise<Transaction[]> {
    return this.request<Transaction[]>('/api/transactions');
  }

  async createTransaction(transaction: Partial<Transaction>): Promise<Transaction> {
    return this.request<Transaction>('/api/transactions', {
      method: 'POST',
      body: JSON.stringify(transaction),
    });
  }

  // Providers
  async getProviders(): Promise<Provider[]> {
    return this.request<Provider[]>('/api/providers');
  }

  async createProvider(provider: Partial<Provider>): Promise<Provider> {
    return this.request<Provider>('/api/providers', {
      method: 'POST',
      body: JSON.stringify(provider),
    });
  }

  async getProviderServices(): Promise<any[]> {
    return this.request<any[]>('/api/provider-services');
  }

  async getProviderServicesByProvider(providerId: string): Promise<any[]> {
    return this.request<any[]>(`/api/provider-services/provider/${providerId}`);
  }

  // Notifications
  async getNotifications(): Promise<Notification[]> {
    return this.request<Notification[]>('/api/notifications');
  }

  async getNotificationsByUser(userId: string): Promise<Notification[]> {
    return this.request<Notification[]>(`/api/notifications/user/${userId}`);
  }

  async createNotification(notification: Partial<Notification>): Promise<Notification> {
    return this.request<Notification>('/api/notifications', {
      method: 'POST',
      body: JSON.stringify(notification),
    });
  }

  async markNotificationAsRead(id: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/api/notifications/${id}/read`, {
      method: 'PATCH',
    });
  }

  // Activity Logs
  async getActivityLogs(): Promise<any[]> {
    return this.request<any[]>('/api/activity-logs');
  }

  async createActivityLog(log: any): Promise<any> {
    return this.request<any>('/api/activity-logs', {
      method: 'POST',
      body: JSON.stringify(log),
    });
  }

  // Payment Methods
  async getPaymentMethods(): Promise<any[]> {
    return this.request<any[]>('/api/payment-methods');
  }

  // Profiles
  async getProfile(id: string): Promise<Profile> {
    return this.request<Profile>(`/api/profiles/${id}`);
  }

  async createProfile(profile: Partial<Profile>): Promise<Profile> {
    return this.request<Profile>('/api/profiles', {
      method: 'POST',
      body: JSON.stringify(profile),
    });
  }

  async updateProfile(id: string, profile: Partial<Profile>): Promise<Profile> {
    return this.request<Profile>(`/api/profiles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(profile),
    });
  }

  // Dashboard
  async getDashboardStats(): Promise<any> {
    return this.request<any>('/api/dashboard/stats');
  }

  // Users
  async getUser(id: number): Promise<any> {
    return this.request<any>(`/api/users/${id}`);
  }
}

export const apiClient = new ApiClient();