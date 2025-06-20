
import { z } from "zod";

export const providerFormSchema = z.object({
  name: z.string().min(1, "اسم المورد مطلوب"),
  description: z.string().optional(),
  api_url: z.string().url("رابط API غير صحيح"),
  api_key: z.string().min(1, "مفتاح API مطلوب"),
  is_active: z.boolean().default(true),
  settings: z.record(z.any()).optional()
});

export type ProviderFormValues = z.infer<typeof providerFormSchema>;

export const paymentMethodSchema = z.object({
  provider_name: z.string().min(1, "اسم المزود مطلوب"),
  display_name: z.string().min(1, "الاسم المعروض مطلوب"),
  prefixes: z.array(z.string()).or(z.string()),
  fees_percentage: z.number().min(0).max(100),
  is_active: z.boolean().default(true),
  manual_mode: z.boolean().default(true),
  auto_mode: z.boolean().default(false),
  confirmation_timeout: z.number().min(30).max(3600),
  icon_name: z.string().default("CreditCard"),
  color_class: z.string().default("bg-blue-500"),
  settings: z.record(z.any()).optional()
});

export type PaymentMethodFormValues = z.infer<typeof paymentMethodSchema>;
