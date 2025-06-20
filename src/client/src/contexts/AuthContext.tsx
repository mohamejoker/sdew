import React, { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "@/lib/api";

interface AuthContextType {
  user: any; // قم بتحديث هذا النوع بناءً على هيكل بيانات المستخدم الذي ترسله من الخادم
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // تحقق من وجود توكن عند التحميل
    const token = localStorage.getItem("token");
    if (token) {
      // جلب بيانات المستخدم من السيرفر إذا أردت
      // مثال: apiClient.getUser(...) أو فك التوكن
      setUser({ token });
    }
    setIsLoading(false);
  }, []);

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const login = async (username: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("بيانات الدخول غير صحيحة");
    const data = await res.json();
    localStorage.setItem("token", data.token);
    setUser({ username, token: data.token });
  };

  const register = async (username: string, password: string) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("فشل التسجيل أو المستخدم موجود");
    await login(username, password);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
    login,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
