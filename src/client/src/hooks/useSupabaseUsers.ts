
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SupaUser {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  email: string | null;
  created_at: string | null;
  roles: string[];
}

export function useSupabaseUsers() {
  return useQuery({
    queryKey: ['supabase-users'],
    queryFn: async (): Promise<SupaUser[]> => {
      try {
        console.log('Fetching users from Supabase...');
        
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url, created_at, email');

        if (profilesError) {
          console.error('Error fetching profiles:', profilesError.message);
          throw new Error(`Failed to fetch profiles: ${profilesError.message}`);
        }

        console.log('Profiles fetched:', profiles);

        const { data: userRoles, error: roleError } = await supabase
          .from('user_roles')
          .select('user_id, role');

        if (roleError) {
          console.error('Error fetching user roles:', roleError);
          // لا نرمي خطأ هنا لأن جدول user_roles قد لا يكون موجوداً
          console.warn('User roles table might not exist, proceeding without roles');
        }

        console.log('User roles fetched:', userRoles);

        return (profiles ?? []).map(profile => ({
          ...(profile as any),
          roles: (userRoles ?? [])
            .filter((r) => r.user_id === profile.id)
            .map((r) => r.role),
        }));
      } catch (error) {
        console.error('Error in useSupabaseUsers:', error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('An unknown error occurred while fetching users.');
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
