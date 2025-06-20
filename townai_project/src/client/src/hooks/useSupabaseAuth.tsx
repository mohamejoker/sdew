import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import { apiClient } from "@/lib/api";

interface UseSupabaseAuthResult {
  user: any; // قم بتحديث النوع وفقًا لواجهة المستخدم الخاصة بك
  session: any; // قم بتحديث النوع وفقًا لواجهة الجلسة الخاصة بك
  isLoading: boolean;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
}

const SupabaseAuthContext = createContext<UseSupabaseAuthResult | undefined>(undefined);

export const SupabaseAuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<any>(null); // قم بتحديث النوع وفقًا لواجهة الجلسة الخاصة بك
  const [user, setUser] = useState<any>(null); // قم بتحديث النوع وفقًا لواجهة المستخدم الخاصة بك
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // استمع لتغييرات المصادقة
    const unsubscribe = apiClient.auth.onAuthStateChanged((user) => {
      setUser(user);
      setSession(user ? { jwt: user.getIdToken() } : null); // قم بتحديث الجلسة بناءً على واجهة JWT الخاصة بك
      setIsLoading(false);
    });

    // احصل على الجلسة الحالية عند التحميل
    apiClient.auth.getSession().then((session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value: UseSupabaseAuthResult = {
    user,
    session,
    isLoading,
    logout: async () => {
      await apiClient.auth.signOut();
      setSession(null);
      setUser(null);
    },
    login: async (email: string, password: string) => {
      setIsLoading(true);
      try {
        await apiClient.auth.signInWithEmailAndPassword(email, password);
      } catch (error) {
        console.error("Error signing in:", error);
      } finally {
        setIsLoading(false);
      }
    },
    register: async (email: string, password: string, name?: string) => {
      setIsLoading(true);
      try {
        await apiClient.auth.signUp({
          email,
          password,
          // أضف أي خيارات أخرى تحتاجها هنا
        });
      } catch (error) {
        console.error("Error signing up:", error);
      } finally {
        setIsLoading(false);
      }
    },
  };

  return (
    <SupabaseAuthContext.Provider value={value}>
      {children}
    </SupabaseAuthContext.Provider>
  );
};

export const useSupabaseAuth = () => {
  const context = useContext(SupabaseAuthContext);
  if (context === undefined) {
    throw new Error("useSupabaseAuth must be used within a SupabaseAuthProvider");
  }
  return context;
};

// تم إلغاء كل ما يخص supabase auth نهائياً، ويجب حذف هذا الملف أو استبداله بالكامل بالاعتماد على AuthContext الجديد فقط.
