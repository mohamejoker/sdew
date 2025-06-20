
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useGoogleAuth = () => {
  const { toast } = useToast();

  const loginWithGoogle = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/admin`
        }
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (error: any) {
      console.error('Google Auth Error:', error);
      toast({
        title: "خطأ في المصادقة",
        description: error.message || "فشل في تسجيل الدخول باستخدام Google",
        variant: "destructive"
      });
      throw error;
    }
  }, [toast]);

  return {
    loginWithGoogle
  };
};
