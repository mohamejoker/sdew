
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useActivityLogs = (filters?: any) => {
  const queryClient = useQueryClient();

  const { data: logs, isLoading } = useQuery({
    queryKey: ['activity-logs', filters],
    queryFn: async () => {
      let query = supabase
        .from('activity_logs')
        .select(`
          *,
          profiles(full_name, email)
        `)
        .order('created_at', { ascending: false });

      if (filters?.action_type) {
        query = query.eq('action_type', filters.action_type);
      }
      if (filters?.resource_type) {
        query = query.eq('resource_type', filters.resource_type);
      }
      if (filters?.user_id) {
        query = query.eq('user_id', filters.user_id);
      }

      const { data, error } = await query.limit(100);
      if (error) throw error;
      return data;
    }
  });

  const logActivity = useMutation({
    mutationFn: async (activity: {
      action_type: string;
      resource_type: string;
      resource_id?: string;
      description?: string;
      metadata?: any;
    }) => {
      const { data, error } = await supabase
        .from('activity_logs')
        .insert([{
          ...activity,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activity-logs'] });
    }
  });

  return { logs, isLoading, logActivity };
};
