
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

// Define correct payload type for provider insert
export type ProviderInsert = {
  name: string;
  description?: string;
  api_url: string;
  api_key: string;
  is_active?: boolean;
  logo_url?: string;
  settings?: Json; // تحديث هنا!
  // Do not include id, added_at, updated_at (auto-generated)
};

export const providersService = {
  async getProviders() {
    const { data, error } = await supabase
      .from("providers")
      .select("*")
      .order("added_at", { ascending: false });
    if (error) throw error;
    return data;
  },
  async addProvider(payload: ProviderInsert) {
    // تأكد أن settings هو من نوع JSON فقط
    const fixedPayload = payload.settings
      ? { ...payload, settings: payload.settings as Json }
      : { ...payload };

    const { data, error } = await supabase
      .from("providers")
      .insert([fixedPayload])
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  async updateProvider(id: string, updates: Partial<ProviderInsert>) {
    // تأكد أن settings هو من نوع JSON فقط
    const fixedUpdates = updates.settings
      ? { ...updates, settings: updates.settings as Json }
      : { ...updates };

    const { data, error } = await supabase
      .from("providers")
      .update(fixedUpdates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  async deleteProvider(id: string) {
    const { error } = await supabase.from("providers").delete().eq("id", id);
    if (error) throw error;
    return true;
  }
}
