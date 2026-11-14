
// MainServer
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../config/api";
import { getCookie, removeCookie } from "@/lib/cookie";
import { SESSION_COOKIE_NAME, SSO_BASE } from "@/app/components/As";
import { AuthErrorPage } from "@/app/AuthErrorPage";
import { isPublicRoute } from "@/lib/publicRoutes";
import { usePathname } from "next/navigation";

interface User {
  userId: string;
  employeeId?: any;
  fullName: string;
  nationalCode?: number | string;
  userName: string;
  roleCodes: number[];
  permissionCodes: number[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoggingOut: boolean;
  authError: boolean;
  refreshUser: () => Promise<void>;
  Logout: () => void;
  clearAuthError: () => void;
  retryAuth: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isLoggingOut: false,
  authError: false,
  refreshUser: async () => { },
  Logout: () => { },
  clearAuthError: () => { },
  retryAuth: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [authError, setAuthError] = useState(false);
  const pathname = usePathname();

  const fetchUser = async () => {
    setLoading(true);
    if (isPublicRoute(pathname)) {
      setLoading(false);
      return;
    }
    try {
      const sessionId = getCookie(SESSION_COOKIE_NAME);
      if (!sessionId) {
        window.location.href = `${SSO_BASE}/account/login?returnUrl=${encodeURIComponent(
          window.location.href
        )}`;
        return;
      }

      const res = await api.get("/User/CurrentUserInfo");

      if (res.data.isSuccess) {
        const userData = res.data.data;
        setUser({
          userId: userData.userId,
          employeeId: userData.employeeId,
          fullName: userData.fullName,
          nationalCode: userData.nationalCode,
          userName: userData.userName,
          roleCodes: userData.roleCodes || [],
          permissionCodes: userData.permissionCodes || [],
        });
        setAuthError(false);
      } else {
        setAuthError(true);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setAuthError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const refreshUser = async () => {
    await fetchUser();
  };

  const retryAuth = () => {
    setAuthError(false);
    fetchUser();
  };

  const Logout = () => {
    setIsLoggingOut(true);

    removeCookie(SESSION_COOKIE_NAME);
    localStorage.removeItem(SESSION_COOKIE_NAME);
    setUser(null);
    setAuthError(false);

    window.location.href = `${SSO_BASE}/account/login?returnUrl=${encodeURIComponent(
      window.location.href
    )}`;
  };

  const forceLogout = () => {
    removeCookie(SESSION_COOKIE_NAME);
    localStorage.removeItem(SESSION_COOKIE_NAME);
    setUser(null);

    window.location.replace(
      `${SSO_BASE}/account/login?returnUrl=${encodeURIComponent(
        window.location.href
      )}`
    );
  };

  const clearAuthError = () => {
    setAuthError(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoggingOut,
        authError,
        refreshUser,
        Logout,
        clearAuthError,
        retryAuth,
      }}
    >
      {authError ? <AuthErrorPage /> : children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);