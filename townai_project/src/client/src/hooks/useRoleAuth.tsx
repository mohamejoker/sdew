
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'admin' | 'user' | 'moderator';

interface RoleAuthHook {
  userRole: UserRole | null;
  isLoading: boolean;
  hasRole: (role: UserRole) => boolean;
}

export const useRoleAuth = (): RoleAuthHook => {
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
        
        // فحص إذا كان المستخدم أدمن من قاعدة البيانات
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .limit(1);

        if (error) {
          console.error('Error fetching user role:', error);
          // في حالة عدم وجود جدول user_roles، نستخدم البريد الإلكتروني
          const adminEmails = ['anamedo1994@gmail.com', 'admin@example.com'];
          setUserRole(adminEmails.includes(user.email || '') ? 'admin' : 'user');
        } else if (!data || data.length === 0) {
          // إذا لم يتم العثور على دور، نحاول إضافة دور أدمن للمستخدم الأول
          const adminEmails = ['anamedo1994@gmail.com', 'admin@example.com'];
          if (adminEmails.includes(user.email || '')) {
            try {
              const { error: insertError } = await supabase
                .from('user_roles')
                .insert({ user_id: user.id, role: 'admin' });
              
              if (!insertError) {
                setUserRole('admin');
                console.log('Successfully added admin role to user');
              } else {
                setUserRole('admin'); // افتراض أنه أدمن حتى لو فشل الإدراج
              }
            } catch (insertError) {
              console.error('Error inserting admin role:', insertError);
              setUserRole('admin'); // افتراض أنه أدمن
            }
          } else {
            setUserRole('user');
          }
        } else {
          const role = data[0].role;
          setUserRole(role as UserRole);
          console.log('User role fetched:', role);
        }
      } catch (error) {
        console.error('Error in fetchUserRole:', error);
        // في حالة الخطأ، نستخدم البريد الإلكتروني للتحقق
        const adminEmails = ['anamedo1994@gmail.com', 'admin@example.com'];
        setUserRole(adminEmails.includes(user.email || '') ? 'admin' : 'user');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, [user, isAuthenticated]);

  const hasRole = (role: UserRole): boolean => {
    if (!userRole) return false;
    
    // الأدمن له جميع الصلاحيات
    if (userRole === 'admin') return true;
    
    // فحص الدور المحدد
    return userRole === role;
  };

  return {
    userRole,
    isLoading,
    hasRole,
  };
};
