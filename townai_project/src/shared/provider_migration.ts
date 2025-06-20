import { pgTable, uuid, text, boolean, timestamp, serial } from "drizzle-orm/pg-core";

// جدول الموزعين
export const providers = pgTable("providers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  apiUrl: text("api_url").notNull(),
  apiKey: text("api_key"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// جدول الخدمات المسحوبة من الموزعين
export const providerServices = pgTable("provider_services", {
  id: uuid("id").primaryKey().defaultRandom(),
  providerId: uuid("provider_id").notNull(),
  externalId: text("external_id").notNull(),
  name: text("name").notNull(),
  category: text("category"),
  price: text("price").notNull(),
  isActive: boolean("is_active").default(true),
  lastSync: timestamp("last_sync").defaultNow(),
});

// مثال: يمكن إضافة المزيد من الجداول حسب الحاجة
