
import React, { ReactNode } from "react";
import { AuthProvider as AuthContextProvider } from "@/contexts/AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};
