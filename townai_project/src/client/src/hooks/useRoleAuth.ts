
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'admin' | 'user';

interface UseRoleAuthResult {
  userRole: UserRole | null;
  hasRole: (role: UserRole) => boolean;
  isAdmin: boolean;
  isUser: boolean;
  isLoading: boolean;
}

export const useRoleAuth = (): UseRoleAuthResult => {
  const { user, isAuthenticated } = useAuth();
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user || !isAuthenticated) {
        setUserRole(null);
        setIsLoading(false);
        return;
      }

      try {
        console.log('Fetching user role for:', user.id);
        
        // Check if user has admin role in database
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .limit(1);

        if (error || !data || data.length === 0) {
          // If no role found, try to add admin role for first user
          const { error: insertError } = await supabase
            .from('user_roles')
            .insert({ user_id: user.id, role: 'admin' });
          
          if (!insertError) {
            setUserRole('admin');
            console.log('Successfully added admin role to user');
          } else {
            setUserRole('user'); // Default to user if can't add admin
          }
        } else {
          const role = data[0].role;
          setUserRole(role as UserRole);
          console.log('User role fetched:', role);
        }
      } catch (error) {
        console.error('Error in fetchUserRole:', error);
        setUserRole('user');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, [user, isAuthenticated]);

  const hasRole = (role: UserRole): boolean => {
    if (!userRole) return false;
    
    // Admin has all permissions
    if (userRole === 'admin') return true;
    
    // User only has user permissions
    if (userRole === 'user' && role === 'user') return true;
    
    return false;
  };

  return {
    userRole,
    hasRole,
    isAdmin: userRole === 'admin',
    isUser: userRole === 'user',
    isLoading
  };
};
