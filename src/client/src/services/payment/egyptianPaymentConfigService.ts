
import { supabase } from "@/integrations/supabase/client";

export interface EgyptianPaymentConfig {
  id: string;
  provider_name: string;
  display_name: string;
  prefixes: string[];
  fees_percentage: number;
  is_active: boolean;
  manual_mode: boolean;
  auto_mode: boolean;
  confirmation_timeout: number;
  icon_name: string;
  color_class: string;
  settings?: any;
  created_at: string;
  updated_at: string;
}

export const egyptianPaymentConfigService = {
  async getPaymentConfigs(): Promise<EgyptianPaymentConfig[]> {
    const { data, error } = await supabase
      .from('egyptian_payment_config')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createPaymentConfig(config: Omit<EgyptianPaymentConfig, 'id' | 'created_at' | 'updated_at'>): Promise<EgyptianPaymentConfig> {
    const { data, error } = await supabase
      .from('egyptian_payment_config')
      .insert(config)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updatePaymentConfig(id: string, updates: Partial<EgyptianPaymentConfig>): Promise<EgyptianPaymentConfig> {
    const { data, error } = await supabase
      .from('egyptian_payment_config')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deletePaymentConfig(id: string): Promise<void> {
    const { error } = await supabase
      .from('egyptian_payment_config')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
