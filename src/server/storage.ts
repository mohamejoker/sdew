import { db } from "./db";
import { 
  User, InsertUser, Profile, InsertProfile, Service, InsertService, 
  ServiceOrder, InsertServiceOrder, Transaction, InsertTransaction,
  Provider, ProviderService, Notification, InsertNotification, ActivityLog,
  users, profiles, services, serviceOrders, transactions, providers, 
  providerServices, notifications, activityLogs, paymentMethods
} from "../shared/schema";
import { eq, desc, and, or, like, count } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Profile operations
  getProfile(id: string): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(id: string, profile: Partial<InsertProfile>): Promise<Profile | undefined>;
  
  // Service operations
  getServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: string): Promise<boolean>;
  
  // Service order operations
  getServiceOrders(): Promise<ServiceOrder[]>;
  getServiceOrder(id: string): Promise<ServiceOrder | undefined>;
  createServiceOrder(order: InsertServiceOrder): Promise<ServiceOrder>;
  updateServiceOrder(id: string, order: Partial<InsertServiceOrder>): Promise<ServiceOrder | undefined>;
  
  // Transaction operations
  getTransactions(): Promise<Transaction[]>;
  getTransaction(id: string): Promise<Transaction | undefined>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  updateTransaction(id: string, transaction: Partial<InsertTransaction>): Promise<Transaction | undefined>;
  
  // Provider operations
  getProviders(): Promise<Provider[]>;
  getProvider(id: string): Promise<Provider | undefined>;
  createProvider(provider: Partial<Provider>): Promise<Provider>;
  updateProvider(id: string, provider: Partial<Provider>): Promise<Provider | undefined>;
  
  // Provider service operations
  getProviderServices(): Promise<ProviderService[]>;
  getProviderServicesByProvider(providerId: string): Promise<ProviderService[]>;
  
  // Notification operations
  getNotifications(): Promise<Notification[]>;
  getNotificationsByUser(userId: string): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: string): Promise<boolean>;
  
  // Activity log operations
  getActivityLogs(): Promise<ActivityLog[]>;
  createActivityLog(log: Partial<ActivityLog>): Promise<ActivityLog>;
  
  // Payment method operations
  getPaymentMethods(): Promise<any[]>;
  
  // Analytics operations
  getDashboardStats(): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Profile operations
  async getProfile(id: string): Promise<Profile | undefined> {
    const result = await db.select().from(profiles).where(eq(profiles.id, id));
    return result[0];
  }

  async createProfile(profile: InsertProfile): Promise<Profile> {
    const result = await db.insert(profiles).values({
      id: crypto.randomUUID(),
      ...profile
    }).returning();
    return result[0];
  }

  async updateProfile(id: string, profile: Partial<InsertProfile>): Promise<Profile | undefined> {
    const result = await db.update(profiles).set(profile).where(eq(profiles.id, id)).returning();
    return result[0];
  }

  // Service operations
  async getServices(): Promise<Service[]> {
    return await db.select().from(services).orderBy(desc(services.createdAt));
  }

  async getService(id: string): Promise<Service | undefined> {
    const result = await db.select().from(services).where(eq(services.id, id));
    return result[0];
  }

  async createService(service: InsertService): Promise<Service> {
    const result = await db.insert(services).values(service).returning();
    return result[0];
  }

  async updateService(id: string, service: Partial<InsertService>): Promise<Service | undefined> {
    const result = await db.update(services).set(service).where(eq(services.id, id)).returning();
    return result[0];
  }

  async deleteService(id: string): Promise<boolean> {
    const result = await db.delete(services).where(eq(services.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Service order operations
  async getServiceOrders(): Promise<ServiceOrder[]> {
    return await db.select().from(serviceOrders).orderBy(desc(serviceOrders.createdAt));
  }

  async getServiceOrder(id: string): Promise<ServiceOrder | undefined> {
    const result = await db.select().from(serviceOrders).where(eq(serviceOrders.id, id));
    return result[0];
  }

  async createServiceOrder(order: InsertServiceOrder): Promise<ServiceOrder> {
    const result = await db.insert(serviceOrders).values(order).returning();
    return result[0];
  }

  async updateServiceOrder(id: string, order: Partial<InsertServiceOrder>): Promise<ServiceOrder | undefined> {
    const result = await db.update(serviceOrders).set(order).where(eq(serviceOrders.id, id)).returning();
    return result[0];
  }

  // Transaction operations
  async getTransactions(): Promise<Transaction[]> {
    return await db.select().from(transactions).orderBy(desc(transactions.createdAt));
  }

  async getTransaction(id: string): Promise<Transaction | undefined> {
    const result = await db.select().from(transactions).where(eq(transactions.id, id));
    return result[0];
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const result = await db.insert(transactions).values(transaction).returning();
    return result[0];
  }

  async updateTransaction(id: string, transaction: Partial<InsertTransaction>): Promise<Transaction | undefined> {
    const result = await db.update(transactions).set(transaction).where(eq(transactions.id, id)).returning();
    return result[0];
  }

  // Provider operations
  async getProviders(): Promise<Provider[]> {
    return await db.select().from(providers).orderBy(desc(providers.addedAt));
  }

  async getProvider(id: string): Promise<Provider | undefined> {
    const result = await db.select().from(providers).where(eq(providers.id, id));
    return result[0];
  }

  async createProvider(provider: Partial<Provider>): Promise<Provider> {
    const result = await db.insert(providers).values(provider as any).returning();
    return result[0];
  }

  async updateProvider(id: string, provider: Partial<Provider>): Promise<Provider | undefined> {
    const result = await db.update(providers).set(provider).where(eq(providers.id, id)).returning();
    return result[0];
  }

  // Provider service operations
  async getProviderServices(): Promise<ProviderService[]> {
    return await db.select().from(providerServices).orderBy(desc(providerServices.syncedAt));
  }

  async getProviderServicesByProvider(providerId: string): Promise<ProviderService[]> {
    return await db.select().from(providerServices).where(eq(providerServices.providerId, providerId));
  }

  // Notification operations
  async getNotifications(): Promise<Notification[]> {
    return await db.select().from(notifications).orderBy(desc(notifications.createdAt));
  }

  async getNotificationsByUser(userId: string): Promise<Notification[]> {
    return await db.select().from(notifications)
      .where(eq(notifications.recipientId, userId))
      .orderBy(desc(notifications.createdAt));
  }

  async createNotification(notification: InsertNotification): Promise<Notification> {
    const result = await db.insert(notifications).values(notification).returning();
    return result[0];
  }

  async markNotificationAsRead(id: string): Promise<boolean> {
    const result = await db.update(notifications)
      .set({ isRead: true, readAt: new Date() })
      .where(eq(notifications.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Activity log operations
  async getActivityLogs(): Promise<ActivityLog[]> {
    return await db.select().from(activityLogs).orderBy(desc(activityLogs.createdAt));
  }

  async createActivityLog(log: Partial<ActivityLog>): Promise<ActivityLog> {
    const result = await db.insert(activityLogs).values(log as any).returning();
    return result[0];
  }

  // Payment method operations
  async getPaymentMethods(): Promise<any[]> {
    return await db.select().from(paymentMethods).where(eq(paymentMethods.isActive, true));
  }

  // Analytics operations
  async getDashboardStats(): Promise<any> {
    const [
      totalUsers,
      totalOrders,
      totalTransactions,
      totalServices
    ] = await Promise.all([
      db.select({ count: count() }).from(profiles),
      db.select({ count: count() }).from(serviceOrders),
      db.select({ count: count() }).from(transactions),
      db.select({ count: count() }).from(services)
    ]);

    return {
      totalUsers: totalUsers[0]?.count || 0,
      totalOrders: totalOrders[0]?.count || 0,
      totalTransactions: totalTransactions[0]?.count || 0,
      totalServices: totalServices[0]?.count || 0
    };
  }
}

export const storage = new DatabaseStorage();
