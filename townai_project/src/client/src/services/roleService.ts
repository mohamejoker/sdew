
import { supabase } from '@/integrations/supabase/client';
import { auditService } from '@/services/audit/auditService';

export type UserRole = 'admin' | 'user';

class RoleService {
  async updateUserRole(userId: string, newRole: UserRole): Promise<{ success: boolean; error?: any }> {
    try {
      const { data, error } = await supabase.functions.invoke('update-user-role', {
        body: { userId, newRole },
      });

      if (error) {
        console.error('Error invoking edge function:', error);
        throw error;
      }
      
      if (data.error) {
        console.error('Error from edge function:', data.error);
        throw new Error(data.error);
      }
      
      await auditService.logAction({
        action: 'role_change',
        table_name: 'user_roles',
        record_id: userId,
        new_values: { role: newRole }
      });
      
      return { success: true };

    } catch (error) {
      console.error('Error in updateUserRole service:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { success: false, error: { message: errorMessage } };
    }
  }
}

export const roleService = new RoleService();
