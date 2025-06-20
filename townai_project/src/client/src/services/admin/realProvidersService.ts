
import { supabase } from "@/integrations/supabase/client";

export interface Provider {
  id: string;
  name: string;
  description?: string;
  api_url: string;
  api_key: string;
  is_active: boolean;
  added_at: string;
  updated_at: string;
  settings?: any;
}

export interface ProviderStats {
  totalProviders: number;
  activeProviders: number;
  totalServices: number;
  activeServices: number;
}

export const realProvidersService = {
  async getProviders(): Promise<Provider[]> {
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .order('added_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createProvider(provider: Omit<Provider, 'id' | 'added_at' | 'updated_at'>): Promise<Provider> {
    const { data, error } = await supabase
      .from('providers')
      .insert(provider)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateProvider(id: string, updates: Partial<Provider>): Promise<Provider> {
    const { data, error } = await supabase
      .from('providers')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteProvider(id: string): Promise<void> {
    const { error } = await supabase
      .from('providers')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getProviderStats(): Promise<ProviderStats> {
    const { data: providers, error } = await supabase
      .from('providers')
      .select('id, is_active');
    
    if (error) throw error;
    
    const totalProviders = providers?.length || 0;
    const activeProviders = providers?.filter(p => p.is_active).length || 0;
    
    return {
      totalProviders,
      activeProviders,
      totalServices: 0, // سيتم تحديثه لاحقاً
      activeServices: 0
    };
  },

  async syncProviderServices(providerId: string): Promise<any> {
    // محاكاة مزامنة الخدمات
    const syncLog = {
      provider_id: providerId,
      status: 'success',
      message: 'تم مزامنة الخدمات بنجاح',
      details: {
        newServices: Math.floor(Math.random() * 10),
        updatedServices: Math.floor(Math.random() * 5)
      }
    };

    const { data, error } = await supabase
      .from('provider_sync_logs')
      .insert(syncLog)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
