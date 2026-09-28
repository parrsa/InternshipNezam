// "use client";
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { getCookie, removeCookie } from "@/lib/cookie";

// interface User {
//   id: number;
//   fullName: string;
//   profilePicture: string | null;
//   role: "Admin" | "Customer" | "Marketer";
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   error: string | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   refreshUser: () => Promise<void>;
//   AccessToken: string | null;
//   Logout?: any;
// }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true,
//   error: null,
//   token: null,
//   isAuthenticated: false,
//   AccessToken: null,
//   refreshUser: async () => {},
//   Logout: false,
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [fetchError, setFetchError] = useState<string | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [AccessToken, setAccessToken] = useState<string | null>(null);
//   const decodeToken = (token: string | null): User | null => {
//     if (!token) return null;
//     try {
//       const decoded = atob(token);
//       const parsed = JSON.parse(decoded);
//       return {
//         id: +parsed.Id,
//         fullName: parsed.FullName,
//         profilePicture: parsed.ProfilePicture || null,
//         role: parsed.Roles[0] || null,
//       };
//     } catch (err) {
//       console.error("Invalid token decode", err);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const initializeAuth = async () => {
//       setLoading(true);
//       try {
//         const stamp = getCookie("stamp");
//         const accessToken = getCookie("accessToken");
//         setToken(stamp);
//         setAccessToken(accessToken);
//         const userData = decodeToken(stamp);
//         if (!userData) throw new Error("Invalid or missing stamp");

//         setUser(userData);
//         setFetchError(null);
//       } catch (err: any) {
//         setUser(null);
//         setFetchError(err.message || "Unknown error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     initializeAuth();
//   }, []);

//   const refreshUser = async () => {
//     setLoading(true);
//     try {
//       const stamp = getCookie("stamp");
//       const accessToken = getCookie("accessToken");
//       setToken(stamp);
//       setAccessToken(accessToken);

//       const userData = decodeToken(stamp);
//       if (!userData) throw new Error("Invalid token");

//       setUser(userData);
//       setFetchError(null);
//     } catch (err: any) {
//       setUser(null);
//       setFetchError(err.message || "Unknown error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const Logout = () => {
//     removeCookie("stamp");
//     removeCookie("PhoneNumbers");
//     removeCookie("Date_Send_Request_Login");
//     removeCookie("accessToken");
//     localStorage.removeItem("accessToken");
//     refreshUser();
//     return;
//   };
//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         loading,
//         error: fetchError,
//         isAuthenticated: !!user,
//         refreshUser,
//         Logout,
//         AccessToken,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = () => useContext(AuthContext);





// "use client";

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { getCookie, removeCookie } from "@/lib/cookie";

// export type UserRole =
//   | "Admin"
//   | "Seller"
//   | "user"
//   | "Customer";



// export interface User {
//   id: number;
//   fullName: string;
//   profilePicture: string | null;
//   phoneNumber: string;
//   role: UserRole;
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   error: string | null;

//   token: string | null;
//   AccessToken: string | null;

//   isAuthenticated: boolean;

//   refreshUser: () => Promise<void>;
//   Logout: () => void;

//   /**
//    * Fake login
//    * بعداً می‌توان این را با API واقعی جایگزین کرد
//    */
//   fakeLogin: (phoneNumber: string) => Promise<User>;

//   /**
//    * فقط برای تست Role
//    */
//   setFakeRole: (role: UserRole) => void;
// }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true,
//   error: null,

//   token: null,
//   AccessToken: null,

//   isAuthenticated: false,

//   refreshUser: async () => { },
//   Logout: () => { },

//   fakeLogin: async () => {
//     throw new Error("AuthProvider is not initialized");
//   },

//   setFakeRole: () => { },
// });

// /* =====================================================
//    Fake Users
// ===================================================== */

// const FAKE_USERS: User[] = [
//   {
//     id: 1,
//     fullName: "مدیر سیستم",
//     profilePicture: null,
//     phoneNumber: "09111111111",
//     role: "Admin",
//   },

//   {
//     id: 2,
//     fullName: "فروشنده تستی",
//     profilePicture: null,
//     phoneNumber: "09222222222",
//     role: "Seller",
//   },

//   {
//     id: 3,
//     fullName: "مشتری تستی",
//     profilePicture: null,
//     phoneNumber: "09333333333",
//     role: "Customer",
//   },

//   {
//     id: 4,
//     fullName: "علی محمدی",
//     profilePicture: null,
//     phoneNumber: "09444444444",
//     role: "user",
//   },
// ];

// /* =====================================================
//    Storage Keys
// ===================================================== */

// const FAKE_USER_KEY = "fake-auth-user";

// /* =====================================================
//    Provider
// ===================================================== */

// export const AuthProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [user, setUser] = useState<User | null>(null);

//   const [loading, setLoading] = useState(true);

//   const [fetchError, setFetchError] = useState<string | null>(
//     null
//   );

//   const [token, setToken] = useState<string | null>(null);

//   const [AccessToken, setAccessToken] = useState<string | null>(
//     null
//   );

//   /* =====================================================
//      Load Auth
//   ===================================================== */

//   const loadAuth = async () => {
//     setLoading(true);

//     try {
//       /*
//        * ---------------------------------------------
//        * FAKE AUTH
//        * ---------------------------------------------
//        */

//       const storedUser = localStorage.getItem(FAKE_USER_KEY);

//       if (storedUser) {
//         const parsedUser: User = JSON.parse(storedUser);

//         setUser(parsedUser);

//         setToken("fake-token");
//         setAccessToken("fake-access-token");

//         setFetchError(null);

//         return;
//       }

//       /*
//        * ---------------------------------------------
//        * BACKEND AUTH
//        * ---------------------------------------------
//        *
//        * فعلاً استفاده نمی‌شود.
//        * بعداً این قسمت را با API واقعی پر می‌کنیم.
//        */

//       const stamp = getCookie("stamp");
//       const accessToken = getCookie("accessToken");

//       setToken(stamp);
//       setAccessToken(accessToken);

//       /*
//        * چون فعلاً Backend نداریم،
//        * اگر Fake User نداشتیم یعنی Login نیست.
//        */

//       setUser(null);
//       setFetchError(null);
//     } catch (error: any) {
//       console.error("Auth initialization error:", error);

//       setUser(null);

//       setFetchError(
//         error?.message || "خطا در احراز هویت"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =====================================================
//      Initial Auth
//   ===================================================== */

//   useEffect(() => {
//     loadAuth();
//   }, []);

//   /* =====================================================
//      Fake Login
//   ===================================================== */

//   const fakeLogin = async (
//     phoneNumber: string
//   ): Promise<User> => {
//     setLoading(true);
//     setFetchError(null);

//     try {
//       const normalizedPhone = phoneNumber.replace(/\s/g, "");

//       const fakeUser = FAKE_USERS.find(
//         (item) => item.phoneNumber === normalizedPhone
//       );

//       if (!fakeUser) {
//         throw new Error(
//           "این شماره در دیتای تستی وجود ندارد"
//         );
//       }

//       localStorage.setItem(
//         FAKE_USER_KEY,
//         JSON.stringify(fakeUser)
//       );

//       setUser(fakeUser);

//       setToken("fake-token");
//       setAccessToken("fake-access-token");

//       return fakeUser;
//     } catch (error: any) {
//       setUser(null);

//       setFetchError(
//         error?.message || "خطا در ورود"
//       );

//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =====================================================
//      Change Fake Role
//   ===================================================== */

//   const setFakeRole = (role: UserRole) => {
//     const fakeUser = FAKE_USERS.find(
//       (item) => item.role === role
//     );

//     if (!fakeUser) return;

//     localStorage.setItem(
//       FAKE_USER_KEY,
//       JSON.stringify(fakeUser)
//     );

//     setUser(fakeUser);
//   };

//   /* =====================================================
//      Refresh User
//   ===================================================== */

//   const refreshUser = async () => {
//     await loadAuth();
//   };

//   /* =====================================================
//      Logout
//   ===================================================== */

//   const Logout = () => {
//     localStorage.removeItem(FAKE_USER_KEY);
//     localStorage.removeItem("accessToken");

//     removeCookie("stamp");
//     removeCookie("PhoneNumbers");
//     removeCookie("Date_Send_Request_Login");
//     removeCookie("accessToken");

//     setUser(null);
//     setToken(null);
//     setAccessToken(null);
//     setFetchError(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,

//         error: fetchError,

//         token,
//         AccessToken,

//         isAuthenticated: !!user,

//         refreshUser,
//         Logout,

//         fakeLogin,
//         setFakeRole,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };













// "use client";

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { getCookie, removeCookie } from "@/lib/cookie";

// export type UserRole =
//   | "Admin"
//   | "Seller"
//   | "user"
//   | "Customer"
//   | "Organization"; // + اضافه شد



// export interface User {
//   id: number;
//   fullName: string;
//   profilePicture: string | null;
//   phoneNumber: string;
//   role: UserRole;
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   error: string | null;

//   token: string | null;
//   AccessToken: string | null;

//   isAuthenticated: boolean;

//   refreshUser: () => Promise<void>;
//   Logout: () => void;

//   /**
//    * Fake login
//    * بعداً می‌توان این را با API واقعی جایگزین کرد
//    */
//   fakeLogin: (phoneNumber: string) => Promise<User>;

//   /**
//    * فقط برای تست Role
//    */
//   setFakeRole: (role: UserRole) => void;
// }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true,
//   error: null,

//   token: null,
//   AccessToken: null,

//   isAuthenticated: false,

//   refreshUser: async () => { },
//   Logout: () => { },

//   fakeLogin: async () => {
//     throw new Error("AuthProvider is not initialized");
//   },

//   setFakeRole: () => { },
// });

// /* =====================================================
//    Fake Users
// ===================================================== */

// const FAKE_USERS: User[] = [
//   {
//     id: 1,
//     fullName: "مدیر سیستم",
//     profilePicture: null,
//     phoneNumber: "09111111111",
//     role: "Admin",
//   },

//   {
//     id: 2,
//     fullName: "فروشنده تستی",
//     profilePicture: null,
//     phoneNumber: "09222222222",
//     role: "Seller",
//   },

//   {
//     id: 3,
//     fullName: "مشتری تستی",
//     profilePicture: null,
//     phoneNumber: "09333333333",
//     role: "Customer",
//   },

//   {
//     id: 4,
//     fullName: "علی محمدی",
//     profilePicture: null,
//     phoneNumber: "09444444444",
//     role: "user",
//   },

//   // + اضافه شد: کاربر تستی نقش سازمان
//   {
//     id: 5,
//     fullName: "سازمان نظام مهندسی تهران",
//     profilePicture: null,
//     phoneNumber: "09555555555",
//     role: "Organization",
//   },
// ];

// /* =====================================================
//    Storage Keys
// ===================================================== */

// const FAKE_USER_KEY = "fake-auth-user";

// /* =====================================================
//    Provider
// ===================================================== */

// export const AuthProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [user, setUser] = useState<User | null>(null);

//   const [loading, setLoading] = useState(true);

//   const [fetchError, setFetchError] = useState<string | null>(
//     null
//   );

//   const [token, setToken] = useState<string | null>(null);

//   const [AccessToken, setAccessToken] = useState<string | null>(
//     null
//   );

//   /* =====================================================
//      Load Auth
//   ===================================================== */

//   const loadAuth = async () => {
//     setLoading(true);

//     try {
//       /*
//        * ---------------------------------------------
//        * FAKE AUTH
//        * ---------------------------------------------
//        */

//       const storedUser = localStorage.getItem(FAKE_USER_KEY);

//       if (storedUser) {
//         const parsedUser: User = JSON.parse(storedUser);

//         setUser(parsedUser);

//         setToken("fake-token");
//         setAccessToken("fake-access-token");

//         setFetchError(null);

//         return;
//       }

//       /*
//        * ---------------------------------------------
//        * BACKEND AUTH
//        * ---------------------------------------------
//        *
//        * فعلاً استفاده نمی‌شود.
//        * بعداً این قسمت را با API واقعی پر می‌کنیم.
//        */

//       const stamp = getCookie("stamp");
//       const accessToken = getCookie("accessToken");

//       setToken(stamp);
//       setAccessToken(accessToken);

//       /*
//        * چون فعلاً Backend نداریم،
//        * اگر Fake User نداشتیم یعنی Login نیست.
//        */

//       setUser(null);
//       setFetchError(null);
//     } catch (error: any) {
//       console.error("Auth initialization error:", error);

//       setUser(null);

//       setFetchError(
//         error?.message || "خطا در احراز هویت"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =====================================================
//      Initial Auth
//   ===================================================== */

//   useEffect(() => {
//     loadAuth();
//   }, []);

//   /* =====================================================
//      Fake Login
//   ===================================================== */

//   const fakeLogin = async (
//     phoneNumber: string
//   ): Promise<User> => {
//     setLoading(true);
//     setFetchError(null);

//     try {
//       const normalizedPhone = phoneNumber.replace(/\s/g, "");

//       const fakeUser = FAKE_USERS.find(
//         (item) => item.phoneNumber === normalizedPhone
//       );

//       if (!fakeUser) {
//         throw new Error(
//           "این شماره در دیتای تستی وجود ندارد"
//         );
//       }

//       localStorage.setItem(
//         FAKE_USER_KEY,
//         JSON.stringify(fakeUser)
//       );

//       setUser(fakeUser);

//       setToken("fake-token");
//       setAccessToken("fake-access-token");

//       return fakeUser;
//     } catch (error: any) {
//       setUser(null);

//       setFetchError(
//         error?.message || "خطا در ورود"
//       );

//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =====================================================
//      Change Fake Role
//   ===================================================== */

//   const setFakeRole = (role: UserRole) => {
//     const fakeUser = FAKE_USERS.find(
//       (item) => item.role === role
//     );

//     if (!fakeUser) return;

//     localStorage.setItem(
//       FAKE_USER_KEY,
//       JSON.stringify(fakeUser)
//     );

//     setUser(fakeUser);
//   };

//   /* =====================================================
//      Refresh User
//   ===================================================== */

//   const refreshUser = async () => {
//     await loadAuth();
//   };

//   /* =====================================================
//      Logout
//   ===================================================== */

//   const Logout = () => {
//     localStorage.removeItem(FAKE_USER_KEY);
//     localStorage.removeItem("accessToken");

//     removeCookie("stamp");
//     removeCookie("PhoneNumbers");
//     removeCookie("Date_Send_Request_Login");
//     removeCookie("accessToken");

//     setUser(null);
//     setToken(null);
//     setAccessToken(null);
//     setFetchError(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,

//         error: fetchError,

//         token,
//         AccessToken,

//         isAuthenticated: !!user,

//         refreshUser,
//         Logout,

//         fakeLogin,
//         setFakeRole,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };












// "use client";

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { getCookie, removeCookie } from "@/lib/cookie";

// export type UserRole =
//   | "Admin"
//   | "Seller"
//   | "user"
//   | "Customer"
//   | "Organization"; // + اضافه شد



// export interface User {
//   id: number;
//   fullName: string;
//   profilePicture: string | null;
//   phoneNumber: string;
//   role: UserRole;
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   error: string | null;

//   token: string | null;
//   AccessToken: string | null;

//   isAuthenticated: boolean;

//   refreshUser: () => Promise<void>;
//   Logout: () => void;

//   /**
//    * Fake login
//    * بعداً می‌توان این را با API واقعی جایگزین کرد
//    */
//   fakeLogin: (phoneNumber: string) => Promise<User>;

//   /**
//    * فقط برای تست Role
//    */
//   setFakeRole: (role: UserRole) => void;
// }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true,
//   error: null,

//   token: null,
//   AccessToken: null,

//   isAuthenticated: false,

//   refreshUser: async () => { },
//   Logout: () => { },

//   fakeLogin: async () => {
//     throw new Error("AuthProvider is not initialized");
//   },

//   setFakeRole: () => { },
// });

// /* =====================================================
//    Fake Users
// ===================================================== */

// const FAKE_USERS: User[] = [
//   {
//     id: 1,
//     fullName: "مدیر سیستم",
//     profilePicture: null,
//     phoneNumber: "09111111111",
//     role: "Admin",
//   },

//   {
//     id: 2,
//     fullName: "فروشنده تستی",
//     profilePicture: null,
//     phoneNumber: "09222222222",
//     role: "Seller",
//   },

//   {
//     id: 3,
//     fullName: "مشتری تستی",
//     profilePicture: null,
//     phoneNumber: "09333333333",
//     role: "Customer",
//   },

//   {
//     id: 4,
//     fullName: "علی محمدی",
//     profilePicture: null,
//     phoneNumber: "09444444444",
//     role: "user",
//   },

//   // + اضافه شد: کاربر تستی نقش سازمان
//   {
//     id: 5,
//     fullName: "سازمان نظام مهندسی تهران",
//     profilePicture: null,
//     phoneNumber: "09555555555",
//     role: "Organization",
//   },
// ];

// /* =====================================================
//    Storage Keys
// ===================================================== */

// const FAKE_USER_KEY = "fake-auth-user";

// /* =====================================================
//    Provider
// ===================================================== */

// export const AuthProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [user, setUser] = useState<User | null>(null);

//   const [loading, setLoading] = useState(true);

//   const [fetchError, setFetchError] = useState<string | null>(
//     null
//   );

//   const [token, setToken] = useState<string | null>(null);

//   const [AccessToken, setAccessToken] = useState<string | null>(
//     null
//   );

//   /* =====================================================
//      Load Auth
//   ===================================================== */

//   const loadAuth = async () => {
//     setLoading(true);

//     try {
//       /*
//        * ---------------------------------------------
//        * FAKE AUTH
//        * ---------------------------------------------
//        */

//       const storedUser = localStorage.getItem(FAKE_USER_KEY);

//       if (storedUser) {
//         const parsedUser: User = JSON.parse(storedUser);

//         setUser(parsedUser);

//         setToken("fake-token");
//         setAccessToken("fake-access-token");

//         setFetchError(null);

//         return;
//       }

//       /*
//        * ---------------------------------------------
//        * BACKEND AUTH
//        * ---------------------------------------------
//        *
//        * فعلاً استفاده نمی‌شود.
//        * بعداً این قسمت را با API واقعی پر می‌کنیم.
//        */

//       const stamp = getCookie("stamp");
//       const accessToken = getCookie("accessToken");

//       setToken(stamp);
//       setAccessToken(accessToken);

//       /*
//        * چون فعلاً Backend نداریم،
//        * اگر Fake User نداشتیم یعنی Login نیست.
//        */

//       setUser(null);
//       setFetchError(null);
//     } catch (error: any) {
//       console.error("Auth initialization error:", error);

//       setUser(null);

//       setFetchError(
//         error?.message || "خطا در احراز هویت"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =====================================================
//      Initial Auth
//   ===================================================== */

//   useEffect(() => {
//     loadAuth();
//   }, []);

//   /* =====================================================
//      Fake Login
//   ===================================================== */

//   const fakeLogin = async (
//     phoneNumber: string
//   ): Promise<User> => {
//     setLoading(true);
//     setFetchError(null);

//     try {
//       const normalizedPhone = phoneNumber.replace(/\s/g, "");

//       const fakeUser = FAKE_USERS.find(
//         (item) => item.phoneNumber === normalizedPhone
//       );

//       if (!fakeUser) {
//         throw new Error(
//           "این شماره در دیتای تستی وجود ندارد"
//         );
//       }

//       localStorage.setItem(
//         FAKE_USER_KEY,
//         JSON.stringify(fakeUser)
//       );

//       setUser(fakeUser);

//       setToken("fake-token");
//       setAccessToken("fake-access-token");

//       return fakeUser;
//     } catch (error: any) {
//       setUser(null);

//       setFetchError(
//         error?.message || "خطا در ورود"
//       );

//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =====================================================
//      Change Fake Role
//   ===================================================== */

//   const setFakeRole = (role: UserRole) => {
//     const fakeUser = FAKE_USERS.find(
//       (item) => item.role === role
//     );

//     if (!fakeUser) return;

//     localStorage.setItem(
//       FAKE_USER_KEY,
//       JSON.stringify(fakeUser)
//     );

//     setUser(fakeUser);
//   };

//   /* =====================================================
//      Refresh User
//   ===================================================== */

//   const refreshUser = async () => {
//     await loadAuth();
//   };

//   /* =====================================================
//      Logout
//   ===================================================== */

//   const Logout = () => {
//     localStorage.removeItem(FAKE_USER_KEY);
//     localStorage.removeItem("accessToken");

//     removeCookie("stamp");
//     removeCookie("PhoneNumbers");
//     removeCookie("Date_Send_Request_Login");
//     removeCookie("accessToken");

//     setUser(null);
//     setToken(null);
//     setAccessToken(null);
//     setFetchError(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,

//         error: fetchError,

//         token,
//         AccessToken,

//         isAuthenticated: !!user,

//         refreshUser,
//         Logout,

//         fakeLogin,
//         setFakeRole,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };














"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCookie, removeCookie } from "@/lib/cookie";

export type UserRole =
  | "Admin"
  | "Seller"
  | "user"
  | "Customer"
  | "Organization";

export interface User {
  id: number;
  fullName: string;
  profilePicture: string | null;
  phoneNumber: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;

  token: string | null;
  AccessToken: string | null;

  isAuthenticated: boolean;

  refreshUser: () => Promise<void>;
  Logout: () => void;

  fakeLogin: (phoneNumber: string) => Promise<User>;

  setFakeRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,

  token: null,
  AccessToken: null,

  isAuthenticated: false,

  refreshUser: async () => {},
  Logout: () => {},

  fakeLogin: async () => {
    throw new Error("AuthProvider is not initialized");
  },

  setFakeRole: () => {},
});

/* =====================================================
   Fake Users
===================================================== */

const FAKE_USERS: User[] = [
  {
    id: 1,
    fullName: "مدیر سیستم",
    profilePicture: null,
    phoneNumber: "09111111111",
    role: "Admin",
  },

  {
    id: 2,
    fullName: "فروشنده تستی",
    profilePicture: null,
    phoneNumber: "09222222222",
    role: "Seller",
  },

  {
    id: 3,
    fullName: "مشتری تستی",
    profilePicture: null,
    phoneNumber: "09333333333",
    role: "Customer",
  },

  {
    id: 4,
    fullName: "علی محمدی",
    profilePicture: null,
    phoneNumber: "09444444444",
    role: "user",
  },

  {
    id: 5,
    fullName: "سازمان نظام مهندسی تهران",
    profilePicture: null,
    phoneNumber: "09555555555",
    role: "Organization",
  },
];

/* =====================================================
   Storage Keys
===================================================== */

const FAKE_USER_KEY = "fake-auth-user";

/* =====================================================
   Provider
===================================================== */

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const [fetchError, setFetchError] = useState<string | null>(
    null
  );

  const [token, setToken] = useState<string | null>(null);

  const [AccessToken, setAccessToken] = useState<string | null>(
    null
  );

  /* =====================================================
     Load Auth
  ===================================================== */

  const loadAuth = async () => {
    setLoading(true);

    try {
      const storedUser =
        localStorage.getItem(FAKE_USER_KEY);

      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);

        setUser(parsedUser);

        setToken("fake-token");
        setAccessToken("fake-access-token");

        setFetchError(null);

        return;
      }

      const stamp = getCookie("stamp");
      const accessToken = getCookie("accessToken");

      setToken(stamp);
      setAccessToken(accessToken);

      setUser(null);
      setFetchError(null);
    } catch (error: any) {
      console.error(
        "Auth initialization error:",
        error
      );

      setUser(null);

      setFetchError(
        error?.message ||
          "خطا در احراز هویت"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     Initial Auth
  ===================================================== */

  useEffect(() => {
    loadAuth();
  }, []);

  /* =====================================================
     Fake Login
  ===================================================== */

  const fakeLogin = async (
    phoneNumber: string
  ): Promise<User> => {
    setLoading(true);
    setFetchError(null);

    try {
      const normalizedPhone =
        phoneNumber.replace(/\s/g, "");

      const fakeUser = FAKE_USERS.find(
        (item) =>
          item.phoneNumber === normalizedPhone
      );

      if (!fakeUser) {
        throw new Error(
          "این شماره در دیتای تستی وجود ندارد"
        );
      }

      localStorage.setItem(
        FAKE_USER_KEY,
        JSON.stringify(fakeUser)
      );

      setUser(fakeUser);

      setToken("fake-token");
      setAccessToken("fake-access-token");

      return fakeUser;
    } catch (error: any) {
      setUser(null);

      setFetchError(
        error?.message ||
          "خطا در ورود"
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     Change Fake Role
  ===================================================== */

  const setFakeRole = (role: UserRole) => {
    const fakeUser = FAKE_USERS.find(
      (item) => item.role === role
    );

    if (!fakeUser) {
      return;
    }

    localStorage.setItem(
      FAKE_USER_KEY,
      JSON.stringify(fakeUser)
    );

    setUser(fakeUser);

    /*
     * Fake Auth State
     */

    setToken("fake-token");
    setAccessToken("fake-access-token");

    setFetchError(null);
  };

  /* =====================================================
     Refresh User
  ===================================================== */

  const refreshUser = async () => {
    await loadAuth();
  };

  /* =====================================================
     Logout
  ===================================================== */

  const Logout = () => {
    localStorage.removeItem(FAKE_USER_KEY);
    localStorage.removeItem("accessToken");

    removeCookie("stamp");
    removeCookie("PhoneNumbers");
    removeCookie("Date_Send_Request_Login");
    removeCookie("accessToken");

    setUser(null);
    setToken(null);
    setAccessToken(null);
    setFetchError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,

        error: fetchError,

        token,
        AccessToken,

        isAuthenticated: !!user,

        refreshUser,
        Logout,

        fakeLogin,
        setFakeRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};