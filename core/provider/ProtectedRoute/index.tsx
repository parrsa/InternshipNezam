// "use client";

// import { useEffect, useState } from "react";
// import { useAuthContext } from "../Auth";
// import { usePathname, useRouter } from "next/navigation";

// export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
//     const { isAuthenticated, loading, user } = useAuthContext();
//     const router = useRouter();
//     const pathname = usePathname();

//     const [authorized, setAuthorized] = useState(false);

//     useEffect(() => {
//         if (loading) return;

//         const adminPaths = ["/admin", "/adminpanel", "", 'News-Add-New', '/personel', '/Tickets', '/Article-Add-New', '/Course-Add-New'];
//         const teacherPaths = ["/marketer", "/marketerpanel"];
//         const dashboardPath = "/UserPanel";

//         let allow = true;

//         if (!isAuthenticated || !user) {
//             const restrictedPaths = [...adminPaths, ...teacherPaths, dashboardPath];
//             const isRestricted = restrictedPaths.some(path => pathname.startsWith(path));
//             if (isRestricted) {
//                 allow = false;
//                 // router.replace("/");
//             }
//         } else {
//             const role = user.role;

//             if (role === "Admin") {
//                 if (!adminPaths.some(path => pathname.startsWith(path))) {
//                     allow = false;
//                     router.replace("/admin");
//                 }
//             } else if (role === "Marketer") {
//                 if (!teacherPaths.some(path => pathname.startsWith(path))) {
//                     allow = false;
//                     router.replace("/teacher");
//                 }
//             } else if (role === "Customer") {
//                 const isRestricted = [...adminPaths, ...teacherPaths].some(path =>
//                     pathname.startsWith(path)
//                 );
//                 if (isRestricted) {
//                     allow = false;
//                     router.replace("/UserPanel");
//                 }
//             }
//         }

//         setAuthorized(allow);
//     }, [isAuthenticated, loading, user, pathname, router]);

//     // if (loading || !authorized) {
//     //     return (
//     //         <div dir="rtl" className="flex justify-center items-center min-h-screen bg-gray-900">
//     //             <div className="text-white text-lg">در حال بارگذاری...</div>
//     //         </div>
//     //     );
//     // }

//     return <>{children}</>;
// }




















// "use client";

// import { useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";

// import {
//   useAuthContext,
//   UserRole,
// } from "../Auth";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// /* =====================================================
//    Public Routes
// ===================================================== */

// const PUBLIC_ROUTES = [
//   "/",
//   "/Login",
//   "/login",
//   "/about",
//   "/blog",
//   "/contact",
//   "/faq",
//   "/products",
// ];

// /* =====================================================
//    Role Routes
// ===================================================== */

// const ROLE_ROUTES: Record<UserRole, string[]> = {
//   Admin: [
//     "/admin",
//   ],

//   Seller: [
//     "/seller",
//   ],

//   user: [
//     "/user",
//   ],
//   Customer: [
//     "/customer",
//     "/customer-products",
//     "/basket",
//   ],
// };

// /* =====================================================
//    Redirect
// ===================================================== */

// const ROLE_REDIRECT: Record<UserRole, string> = {
//   Admin: "/admin",
//   Seller: "/seller",
//   Customer: "/customer",
//   user: "/user",
// };

// /* =====================================================
//    Route Match
// ===================================================== */

// const matchesPath = (
//   pathname: string,
//   route: string
// ) => {
//   return (
//     pathname === route ||
//     pathname.startsWith(`${route}/`)
//   );
// };

// const isPublicRoute = (
//   pathname: string
// ) => {
//   return PUBLIC_ROUTES.some(
//     (route) =>
//       matchesPath(pathname, route)
//   );
// };

// const getRouteRole = (
//   pathname: string
// ): UserRole | null => {
//   for (const role of Object.keys(
//     ROLE_ROUTES
//   ) as UserRole[]) {
//     const routes = ROLE_ROUTES[role];

//     const matched = routes.some(
//       (route) =>
//         matchesPath(pathname, route)
//     );

//     if (matched) {
//       return role;
//     }
//   }

//   return null;
// };

// /* =====================================================
//    Component
// ===================================================== */

// export default function ProtectedRoute({
//   children,
// }: ProtectedRouteProps) {
//   const {
//     user,
//     loading,
//     isAuthenticated,
//   } = useAuthContext();

//   const router = useRouter();

//   const pathname = usePathname();

//   useEffect(() => {
//     if (loading) {
//       return;
//     }

//     /*
//      * Public route
//      */
//     if (isPublicRoute(pathname)) {
//       /*
//        * اگر Login باشد و User قبلاً Login کرده،
//        * او را به Dashboard خودش بفرست.
//        */

//       if (
//         isAuthenticated &&
//         user &&
//         (pathname === "/Login" ||
//           pathname === "/login")
//       ) {
//         router.replace(
//           ROLE_REDIRECT[user.role]
//         );
//       }

//       return;
//     }

//     /*
//      * Role route
//      */

//     const requiredRole =
//       getRouteRole(pathname);

//     /*
//      * route عمومی یا ناشناخته
//      */

//     if (!requiredRole) {
//       return;
//     }

//     /*
//      * Login نیست
//      */

//     if (!isAuthenticated || !user) {
//       router.replace("/Login");
//       return;
//     }

//     /*
//      * Role اشتباه
//      */

//     if (user.role !== requiredRole) {
//       router.replace(
//         ROLE_REDIRECT[user.role]
//       );
//     }
//   }, [
//     loading,
//     user,
//     isAuthenticated,
//     pathname,
//     router,
//   ]);

//   /*
//    * Loading
//    */

//   if (loading) {
//     return (
//       <div
//         dir="rtl"
//         className="min-h-screen flex items-center justify-center"
//       >
//         در حال بارگذاری...
//       </div>
//     );
//   }

//   /*
//    * جلوگیری از نمایش لحظه‌ای صفحه
//    * قبل از Redirect
//    */

//   const requiredRole =
//     getRouteRole(pathname);

//   if (
//     requiredRole &&
//     (!isAuthenticated ||
//       !user ||
//       user.role !== requiredRole)
//   ) {
//     return null;
//   }

//   return <>{children}</>;
// }



















// "use client";

// import { useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";

// import {
//   useAuthContext,
//   UserRole,
// } from "../Auth";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// /* =====================================================
//    Public Routes
// ===================================================== */

// const PUBLIC_ROUTES = [
//   "/",
//   "/Login",
//   "/login",
//   "/about",
//   "/blog",
//   "/contact",
//   "/faq",
//   "/products",
// ];

// /* =====================================================
//    Role Routes
// ===================================================== */

// const ROLE_ROUTES: Record<UserRole, string[]> = {
//   Admin: [
//     "/admin",
//   ],

//   Seller: [
//     "/seller",
//   ],

//   user: [
//     "/user",
//   ],
//   Customer: [
//     "/customer",
//     "/customer-products",
//     "/basket",
//   ],

//   // + اضافه شد
//   Organization: [
//     "/organization",
//   ],
// };

// /* =====================================================
//    Redirect
// ===================================================== */

// const ROLE_REDIRECT: Record<UserRole, string> = {
//   Admin: "/admin",
//   Seller: "/seller",
//   Customer: "/customer",
//   user: "/user",

//   // + اضافه شد
//   Organization: "/organization",
// };

// /* =====================================================
//    Route Match
// ===================================================== */

// const matchesPath = (
//   pathname: string,
//   route: string
// ) => {
//   return (
//     pathname === route ||
//     pathname.startsWith(`${route}/`)
//   );
// };

// const isPublicRoute = (
//   pathname: string
// ) => {
//   return PUBLIC_ROUTES.some(
//     (route) =>
//       matchesPath(pathname, route)
//   );
// };

// const getRouteRole = (
//   pathname: string
// ): UserRole | null => {
//   for (const role of Object.keys(
//     ROLE_ROUTES
//   ) as UserRole[]) {
//     const routes = ROLE_ROUTES[role];

//     const matched = routes.some(
//       (route) =>
//         matchesPath(pathname, route)
//     );

//     if (matched) {
//       return role;
//     }
//   }

//   return null;
// };

// /* =====================================================
//    Component
// ===================================================== */

// export default function ProtectedRoute({
//   children,
// }: ProtectedRouteProps) {
//   const {
//     user,
//     loading,
//     isAuthenticated,
//   } = useAuthContext();

//   const router = useRouter();

//   const pathname = usePathname();

//   useEffect(() => {
//     if (loading) {
//       return;
//     }

//     /*
//      * Public route
//      */
//     if (isPublicRoute(pathname)) {
//       /*
//        * اگر Login باشد و User قبلاً Login کرده،
//        * او را به Dashboard خودش بفرست.
//        */

//       if (
//         isAuthenticated &&
//         user &&
//         (pathname === "/Login" ||
//           pathname === "/login")
//       ) {
//         router.replace(
//           ROLE_REDIRECT[user.role]
//         );
//       }

//       return;
//     }

//     /*
//      * Role route
//      */

//     const requiredRole =
//       getRouteRole(pathname);

//     /*
//      * route عمومی یا ناشناخته
//      */

//     if (!requiredRole) {
//       return;
//     }

//     /*
//      * Login نیست
//      */

//     if (!isAuthenticated || !user) {
//       router.replace("/Login");
//       return;
//     }

//     /*
//      * Role اشتباه
//      */

//     if (user.role !== requiredRole) {
//       router.replace(
//         ROLE_REDIRECT[user.role]
//       );
//     }
//   }, [
//     loading,
//     user,
//     isAuthenticated,
//     pathname,
//     router,
//   ]);

//   /*
//    * Loading
//    */

//   if (loading) {
//     return (
//       <div
//         dir="rtl"
//         className="min-h-screen flex items-center justify-center"
//       >
//         در حال بارگذاری...
//       </div>
//     );
//   }

//   /*
//    * جلوگیری از نمایش لحظه‌ای صفحه
//    * قبل از Redirect
//    */

//   const requiredRole =
//     getRouteRole(pathname);

//   if (
//     requiredRole &&
//     (!isAuthenticated ||
//       !user ||
//       user.role !== requiredRole)
//   ) {
//     return null;
//   }

//   return <>{children}</>;
// }












"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  useAuthContext,
  UserRole,
} from "../Auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/* =====================================================
   Public Routes
===================================================== */

const PUBLIC_ROUTES = [
  "/",
  "/Login",
  "/login",
  "/about",
  "/blog",
  "/contact",
  "/faq",
  "/products",
];

/* =====================================================
   Role Routes
===================================================== */

const ROLE_ROUTES: Record<UserRole, string[]> = {
  Admin: [
    "/admin",
  ],

  Seller: [
    "/seller",
  ],

  user: [
    "/users",
  ],
  Customer: [
    "/customer",
    "/customer-products",
    "/basket",
  ],

  // + اضافه شد
  Organization: [
    "/organization",
  ],
};

/* =====================================================
   Redirect
===================================================== */

const ROLE_REDIRECT: Record<UserRole, string> = {
  Admin: "/admin",
  Seller: "/seller",
  Customer: "/customer",
  user: "/users",

  // + اضافه شد
  Organization: "/organization",
};

/* =====================================================
   Route Match
===================================================== */

const matchesPath = (
  pathname: string,
  route: string
) => {
  return (
    pathname === route ||
    pathname.startsWith(`${route}/`)
  );
};

const isPublicRoute = (
  pathname: string
) => {
  return PUBLIC_ROUTES.some(
    (route) =>
      matchesPath(pathname, route)
  );
};

const getRouteRole = (
  pathname: string
): UserRole | null => {
  for (const role of Object.keys(
    ROLE_ROUTES
  ) as UserRole[]) {
    const routes = ROLE_ROUTES[role];

    const matched = routes.some(
      (route) =>
        matchesPath(pathname, route)
    );

    if (matched) {
      return role;
    }
  }

  return null;
};

/* =====================================================
   Component
===================================================== */

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const {
    user,
    loading,
    isAuthenticated,
  } = useAuthContext();

  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    if (loading) {
      return;
    }

    /*
     * Public route
     */
    if (isPublicRoute(pathname)) {
      /*
       * اگر Login باشد و User قبلاً Login کرده،
       * او را به Dashboard خودش بفرست.
       */

      if (
        isAuthenticated &&
        user &&
        (pathname === "/Login" ||
          pathname === "/login")
      ) {
        router.replace(
          ROLE_REDIRECT[user.role]
        );
      }

      return;
    }

    /*
     * Role route
     */

    const requiredRole =
      getRouteRole(pathname);

    /*
     * route عمومی یا ناشناخته
     */

    if (!requiredRole) {
      return;
    }

    /*
     * Login نیست
     */

    if (!isAuthenticated || !user) {
      router.replace("/Login");
      return;
    }

    /*
     * Role اشتباه
     */

    if (user.role !== requiredRole) {
      router.replace(
        ROLE_REDIRECT[user.role]
      );
    }
  }, [
    loading,
    user,
    isAuthenticated,
    pathname,
    router,
  ]);

  /*
   * Loading
   */

  if (loading) {
    return (
      <div
        dir="rtl"
        className="min-h-screen flex items-center justify-center"
      >
        در حال بارگذاری...
      </div>
    );
  }

  /*
   * جلوگیری از نمایش لحظه‌ای صفحه
   * قبل از Redirect
   */

  const requiredRole =
    getRouteRole(pathname);

  if (
    requiredRole &&
    (!isAuthenticated ||
      !user ||
      user.role !== requiredRole)
  ) {
    return null;
  }

  return <>{children}</>;
}
