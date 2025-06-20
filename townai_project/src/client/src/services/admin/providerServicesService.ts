
import { supabase } from "@/integrations/supabase/client";

export const providerServicesService = {
  async getProviderServices(provider_id: string) {
    const { data, error } = await supabase
      .from("provider_services")
      .select("*")
      .eq("provider_id", provider_id)
      .order("synced_at", { ascending: false });
    if (error) throw error;
    return data;
  },
  async updateService(id: string, updates: any) {
    const { data, error } = await supabase
      .from("provider_services")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}
