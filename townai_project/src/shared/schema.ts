import { pgTable, text, serial, integer, boolean, uuid, timestamp, decimal, jsonb, inet, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export const appRoleEnum = pgEnum("app_role", ["admin", "editor", "viewer"]);

// Core tables
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userRoles = pgTable("user_roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  role: appRoleEnum("role").notNull(),
  assignedAt: timestamp("assigned_at").defaultNow(),
});

export const services = pgTable("services", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  price: text("price").notNull(),
  features: text("features").array().notNull(),
  buttonText: text("button_text").notNull().default("اطلب الآن"),
  gradientClass: text("gradient_class").default("from-sky-400 to-blue-500"),
  isPopular: boolean("is_popular").default(false),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const serviceOrders = pgTable("service_orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id"),
  serviceId: text("service_id").notNull(),
  providerServiceId: text("provider_service_id"),
  link: text("link").notNull(),
  quantity: integer("quantity").notNull(),
  originalPrice: decimal("original_price", { precision: 12, scale: 2 }).notNull(),
  finalPrice: decimal("final_price", { precision: 12, scale: 2 }).notNull(),
  profit: decimal("profit", { precision: 12, scale: 2 }).notNull().default("0"),
  status: text("status").notNull().default("pending"),
  startCount: integer("start_count"),
  remains: integer("remains"),
  providerOrderId: text("provider_order_id"),
  notes: text("notes"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const paymentMethods = pgTable("payment_methods", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  icon: text("icon"),
  feesPercentage: decimal("fees_percentage", { precision: 5, scale: 4 }).default("0.0"),
  isActive: boolean("is_active").default(true),
  processingTime: text("processing_time"),
  config: jsonb("config").default({}),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id"),
  customerName: text("customer_name"),
  customerEmail: text("customer_email"),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: text("currency").default("SAR"),
  status: text("status").notNull().default("pending"),
  paymentMethodId: uuid("payment_method_id"),
  paymentMethodName: text("payment_method_name"),
  serviceName: text("service_name"),
  description: text("description"),
  referenceId: text("reference_id"),
  stripeSessionId: text("stripe_session_id"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  fees: decimal("fees", { precision: 12, scale: 2 }).default("0.0"),
  netAmount: decimal("net_amount", { precision: 12, scale: 2 }),
  metadata: jsonb("metadata").default({}),
  processedAt: timestamp("processed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const providers = pgTable("providers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  apiUrl: text("api_url").notNull(),
  apiKey: text("api_key").notNull(),
  isActive: boolean("is_active").default(true),
  logoUrl: text("logo_url"),
  settings: jsonb("settings").default({}),
  addedAt: timestamp("added_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const providerServices = pgTable("provider_services", {
  id: uuid("id").primaryKey().defaultRandom(),
  providerId: uuid("provider_id"),
  externalServiceId: text("external_service_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  platform: text("platform").notNull(),
  category: text("category"),
  description: text("description"),
  rate: decimal("rate"),
  minOrder: integer("min_order"),
  maxOrder: integer("max_order"),
  isActive: boolean("is_active").default(true),
  quality: text("quality"),
  refillEnabled: boolean("refill_enabled").default(false),
  cancelEnabled: boolean("cancel_enabled").default(false),
  averageTime: text("average_time"),
  meta: jsonb("meta").default({}),
  syncedAt: timestamp("synced_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull().default("info"),
  priority: text("priority").notNull().default("medium"),
  recipientId: uuid("recipient_id"),
  isRead: boolean("is_read").default(false),
  isSystem: boolean("is_system").default(false),
  metadata: jsonb("metadata").default({}),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
  readAt: timestamp("read_at"),
});

export const activityLogs = pgTable("activity_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id"),
  actionType: text("action_type").notNull(),
  resourceType: text("resource_type").notNull(),
  resourceId: text("resource_id"),
  description: text("description"),
  ipAddress: inet("ip_address"),
  userAgent: text("user_agent"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProfileSchema = createInsertSchema(profiles).omit({
  id: true,
  createdAt: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertServiceOrderSchema = createInsertSchema(serviceOrders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  completedAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  processedAt: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
  readAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type ServiceOrder = typeof serviceOrders.$inferSelect;
export type InsertServiceOrder = z.infer<typeof insertServiceOrderSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Provider = typeof providers.$inferSelect;
export type ProviderService = typeof providerServices.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type ActivityLog = typeof activityLogs.$inferSelect;
