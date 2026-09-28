// "use client";;
// import React from "react";
// import UserLayout from "../user";
// import ProtectedRoute from "@/core/provider/ProtectedRoute";
// import { useAuthContext } from "@/core/provider/Auth";
// import AdminLayout from "../admin";

// interface ClientLayoutSelectorProps {
//     children: React.ReactNode;
// }

// export default function ClientLayoutSelector({ children }: ClientLayoutSelectorProps) {
//     const { user, loading } = useAuthContext();

//     const renderLayout = () => {
//         if (loading) return <div>در حال بارگذاری...</div>;

//         if (user?.role === "Admin") return <AdminLayout>{children}</AdminLayout>;
//         // if (user?.role === "Marketer") return <MarketerLayout>{children}</MarketerLayout>;
//         return <UserLayout>{children}</UserLayout>;
//     };

//     return <ProtectedRoute>{renderLayout()}</ProtectedRoute>;
// }





// "use client";

// import React from "react";
// import { usePathname } from "next/navigation";

// import { useAuthContext } from "@/core/provider/Auth";
// import ProtectedRoute from "@/core/provider/ProtectedRoute";

// import UserLayout from "../user";
// import AdminLayout from "../adminLayout";
// // import SellerLayout from "../seller";

// interface ClientLayoutSelectorProps {
//   children: React.ReactNode;
// }

// export default function ClientLayoutSelector({
//   children,
// }: ClientLayoutSelectorProps) {
//   const pathname = usePathname();

//   const { loading } = useAuthContext();

//   /*
//    * --------------------------------------------
//    * Login
//    * --------------------------------------------
//    *
//    * Login صفحه مستقل است و
//    * Header / Footer عمومی ندارد.
//    */
//   const isLoginPage =
//     pathname === "/Login" ||
//     pathname === "/login";

//   if (isLoginPage) {
//     return <>{children}</>;
//   }

//   /*
//    * --------------------------------------------
//    * Loading
//    * --------------------------------------------
//    */
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         در حال بارگذاری...
//       </div>
//     );
//   }

//   /*
//    * --------------------------------------------
//    * Admin
//    * --------------------------------------------
//    *
//    * فقط مسیرهایی که با /admin شروع می‌شوند
//    * AdminLayout می‌گیرند.
//    */
//   const isAdminRoute =
//     pathname === "/admin" ||
//     pathname.startsWith("/admin/");

//   if (isAdminRoute) {
//     return (
//       <ProtectedRoute>
//         <AdminLayout>
//           {children}
//         </AdminLayout>
//       </ProtectedRoute>
//     );
//   }

//   const isUserRoute =
//     pathname === "/user" ||
//     pathname.startsWith("/user/");

//   if (isUserRoute) {
//     return (
//       <ProtectedRoute>
//         <UserLayout>
//           {children}
//         </UserLayout>
//       </ProtectedRoute>
//     );
//   }

//   /*
//    * --------------------------------------------
//    * Seller
//    * --------------------------------------------
//    *
//    * فعلاً چون SellerLayout جدا نداری،
//    * می‌توانی موقتاً UserLayout استفاده کنی.
//    */
//   const isSellerRoute =
//     pathname === "/seller" ||
//     pathname.startsWith("/seller/");

//   if (isSellerRoute) {
//     return (
//       <ProtectedRoute>
//         <UserLayout>
//           {children}
//         </UserLayout>
//       </ProtectedRoute>
//     );
//   }

//   /*
//    * --------------------------------------------
//    * Public / Customer
//    * --------------------------------------------
//    *
//    * همه مسیرهای دیگر Layout عمومی دارند:
//    *
//    * Header
//    * Footer
//    * SupportWidget
//    */
//   return (
//     <UserLayout>
//       {children}
//     </UserLayout>
//   );
// }














// "use client";

// import React from "react";
// import { usePathname } from "next/navigation";

// import { useAuthContext } from "@/core/provider/Auth";
// import ProtectedRoute from "@/core/provider/ProtectedRoute";

// import UserLayout from "../user";
// import AdminLayout from "../adminLayout";
// import OrganizationLayout from "../organizationLayout";
// // import SellerLayout from "../seller";

// interface ClientLayoutSelectorProps {
//   children: React.ReactNode;
// }

// export default function ClientLayoutSelector({
//   children,
// }: ClientLayoutSelectorProps) {
//   const pathname = usePathname();

//   const { loading } = useAuthContext();

//   /*
//    * --------------------------------------------
//    * Login
//    * --------------------------------------------
//    *
//    * Login صفحه مستقل است و
//    * Header / Footer عمومی ندارد.
//    */
//   const isLoginPage =
//     pathname === "/Login" ||
//     pathname === "/login";

//   if (isLoginPage) {
//     return <>{children}</>;
//   }

//   /*
//    * --------------------------------------------
//    * Loading
//    * --------------------------------------------
//    */
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         در حال بارگذاری...
//       </div>
//     );
//   }

//   /*
//    * --------------------------------------------
//    * Admin
//    * --------------------------------------------
//    *
//    * فقط مسیرهایی که با /admin شروع می‌شوند
//    * AdminLayout می‌گیرند.
//    */
//   const isAdminRoute =
//     pathname === "/admin" ||
//     pathname.startsWith("/admin/");

//   if (isAdminRoute) {
//     return (
//       <ProtectedRoute>
//         <AdminLayout>
//           {children}
//         </AdminLayout>
//       </ProtectedRoute>
//     );
//   }

//   const isUserRoute =
//     pathname === "/user" ||
//     pathname.startsWith("/user/");

//   if (isUserRoute) {
//     return (
//       <ProtectedRoute>
//         <UserLayout>
//           {children}
//         </UserLayout>
//       </ProtectedRoute>
//     );
//   }

//   /*
//    * --------------------------------------------
//    * Organization (سازمان)
//    * --------------------------------------------
//    *
//    * فقط مسیرهایی که با /organization شروع می‌شوند
//    * OrganizationLayout می‌گیرند.
//    */
//   const isOrganizationRoute =
//     pathname === "/organization" ||
//     pathname.startsWith("/organization/");

//   if (isOrganizationRoute) {
//     return (
//       <ProtectedRoute>
//         <OrganizationLayout>
//           {children}
//         </OrganizationLayout>
//       </ProtectedRoute>
//     );
//   }

//   /*
//    * --------------------------------------------
//    * Seller
//    * --------------------------------------------
//    *
//    * فعلاً چون SellerLayout جدا نداری،
//    * می‌توانی موقتاً UserLayout استفاده کنی.
//    */
//   const isSellerRoute =
//     pathname === "/seller" ||
//     pathname.startsWith("/seller/");

//   if (isSellerRoute) {
//     return (
//       <ProtectedRoute>
//         <UserLayout>
//           {children}
//         </UserLayout>
//       </ProtectedRoute>
//     );
//   }

//   /*
//    * --------------------------------------------
//    * Public / Customer
//    * --------------------------------------------
//    *
//    * همه مسیرهای دیگر Layout عمومی دارند:
//    *
//    * Header
//    * Footer
//    * SupportWidget
//    */
//   return (
//     <UserLayout>
//       {children}
//     </UserLayout>
//   );
// }



















// "use client";

// import React from "react";
// import { usePathname } from "next/navigation";

// import { useAuthContext } from "@/core/provider/Auth";
// import ProtectedRoute from "@/core/provider/ProtectedRoute";

// import UserLayout from "../user";
// import AdminLayout from "../adminLayout";
// import OrganizationLayout from "../organizationLayout";
// // import SellerLayout from "../seller";

// interface ClientLayoutSelectorProps {
//   children: React.ReactNode;
// }

// export default function ClientLayoutSelector({
//   children,
// }: ClientLayoutSelectorProps) {
//   const pathname = usePathname();

//   const { loading } = useAuthContext();

//   /*
//    * --------------------------------------------
//    * Login
//    * --------------------------------------------
//    *
//    * Login صفحه مستقل است و
//    * Header / Footer عمومی ندارد.
//    */
//   const isLoginPage =
//     pathname === "/Login" ||
//     pathname === "/login";

//   if (isLoginPage) {
//     return <>{children}</>;
//   }

//   /*
//    * --------------------------------------------
//    * Loading
//    * --------------------------------------------
//    */
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         در حال بارگذاری...
//       </div>
//     );
//   }

//   /*
//    * --------------------------------------------
//    * Admin
//    * --------------------------------------------
//    *
//    * فقط مسیرهایی که با /admin شروع می‌شوند
//    * AdminLayout می‌گیرند.
//    */
//   const isAdminRoute =
//     pathname === "/admin" ||
//     pathname.startsWith("/admin/");

//   if (isAdminRoute) {
//     /*
//      * فعلاً بدون ProtectedRoute (طبق درخواست):
//      * کلیک روی کارت "ادمین" باید مستقیم Layout بره، بدون Login.
//      */
//     return (
//       <AdminLayout>
//         {children}
//       </AdminLayout>
//     );
//   }

//   const isUserRoute =
//     pathname === "/users" ||
//     pathname.startsWith("/users/");

//   if (isUserRoute) {
//     /*
//      * فعلاً بدون ProtectedRoute (طبق درخواست):
//      * کلیک روی کارت "کارآموز" باید مستقیم Layout بره، بدون Login.
//      */
//     return (
//       <UserLayout>
//         {children}
//       </UserLayout>
//     );
//   }

//   /*
//    * --------------------------------------------
//    * Organization (سازمان)
//    * --------------------------------------------
//    *
//    * فقط مسیرهایی که با /organization شروع می‌شوند
//    * OrganizationLayout می‌گیرند.
//    */
//   const isOrganizationRoute =
//     pathname === "/organization" ||
//     pathname.startsWith("/organization/");

//   if (isOrganizationRoute) {
//     /*
//      * فعلاً بدون ProtectedRoute:
//      * کلیک روی کارت "سازمان" توی Home باید مستقیم
//      * Layout + Sidebar سازمان رو نشون بده، بدون نیاز به Login.
//      *
//      * وقتی Login واقعی آماده شد، کافیه دوباره <ProtectedRoute> رو
//      * دور OrganizationLayout بذاری.
//      */
//     return (
//       <OrganizationLayout>
//         {children}
//       </OrganizationLayout>
//     );
//   }

//   /*
//    * --------------------------------------------
//    * Seller
//    * --------------------------------------------
//    *
//    * فعلاً چون SellerLayout جدا نداری،
//    * می‌توانی موقتاً UserLayout استفاده کنی.
//    */
//   const isSellerRoute =
//     pathname === "/seller" ||
//     pathname.startsWith("/seller/");

//   if (isSellerRoute) {
//     return (
//       <ProtectedRoute>
//         <UserLayout>
//           {children}
//         </UserLayout>
//       </ProtectedRoute>
//     );
//   }

//   /*
//    * --------------------------------------------
//    * Public / Customer
//    * --------------------------------------------
//    *
//    * همه مسیرهای دیگر Layout عمومی دارند:
//    *
//    * Header
//    * Footer
//    * SupportWidget
//    */
//   return (
//     <UserLayout>
//       {children}
//     </UserLayout>
//   );
// }











// "use client";

// import React from "react";
// import { usePathname } from "next/navigation";

// import { useAuthContext } from "@/core/provider/Auth";
// import ProtectedRoute from "@/core/provider/ProtectedRoute";

// import UserLayout from "../user";
// import AdminLayout from "../adminLayout";
// import OrganizationLayout from "../organizationLayout";

// interface ClientLayoutSelectorProps {
//   children: React.ReactNode;
// }

// export default function ClientLayoutSelector({
//   children,
// }: ClientLayoutSelectorProps) {
//   const pathname = usePathname();

//   const { loading } = useAuthContext();

//   /*
//    * =====================================================
//    * Home / Login
//    * =====================================================
//    *
//    * Homepage و Login نباید هیچ Layout داشبوردی داشته باشند.
//    *
//    * /
//    * /login
//    * /Login
//    *
//    * فقط خود children نمایش داده می‌شود.
//    */

//   const isHomePage = pathname === "/";

//   const isLoginPage =
//     pathname === "/login" ||
//     pathname === "/Login";

//   if (isHomePage || isLoginPage) {
//     return <>{children}</>;
//   }

//   /*
//    * =====================================================
//    * Loading
//    * =====================================================
//    *
//    * برای مسیرهای داشبورد، تا زمانی که Auth مشخص نشده
//    * است، Loading نمایش داده می‌شود.
//    */

//   if (loading) {
//     return (
//       <div
//         dir="rtl"
//         className="min-h-screen flex items-center justify-center bg-neutral-100"
//       >
//         <div className="text-sm text-neutral-600">
//           در حال بارگذاری...
//         </div>
//       </div>
//     );
//   }

//   /*
//    * =====================================================
//    * Admin
//    * =====================================================
//    *
//    * /admin
//    * /admin/...
//    *
//    * تمام این مسیرها AdminLayout می‌گیرند.
//    */

//   const isAdminRoute =
//     pathname === "/admin" ||
//     pathname.startsWith("/admin/");

//   if (isAdminRoute) {
//     return (
//       <AdminLayout>
//         {children}
//       </AdminLayout>
//     );
//   }

//   /*
//    * =====================================================
//    * User / Trainee
//    * =====================================================
//    *
//    * /users
//    * /users/...
//    *
//    * تمام مسیرهای کارآموز داخل UserLayout هستند.
//    */

//   const isUserRoute =
//     pathname === "/users" ||
//     pathname.startsWith("/users/");

//   if (isUserRoute) {
//     return (
//       <UserLayout>
//         {children}
//       </UserLayout>
//     );
//   }

//   /*
//    * =====================================================
//    * Organization
//    * =====================================================
//    *
//    * /organization
//    * /organization/...
//    *
//    * تمام مسیرهای سازمان داخل OrganizationLayout هستند.
//    */

//   const isOrganizationRoute =
//     pathname === "/organization" ||
//     pathname.startsWith("/organization/");

//   if (isOrganizationRoute) {
//     return (
//       <OrganizationLayout>
//         {children}
//       </OrganizationLayout>
//     );
//   }

//   /*
//    * =====================================================
//    * Seller
//    * =====================================================
//    *
//    * /seller
//    * /seller/...
//    *
//    * فعلاً چون SellerLayout جدا نداریم،
//    * از UserLayout استفاده می‌کنیم.
//    */

//   const isSellerRoute =
//     pathname === "/seller" ||
//     pathname.startsWith("/seller/");

//   if (isSellerRoute) {
//     return (
//       <ProtectedRoute>
//         <UserLayout>
//           {children}
//         </UserLayout>
//       </ProtectedRoute>
//     );
//   }

//   /*
//    * =====================================================
//    * Public / Customer
//    * =====================================================
//    *
//    * اگر مسیر هیچ‌کدام از موارد بالا نبود،
//    * فعلاً UserLayout نمایش داده می‌شود.
//    *
//    * توجه:
//    * Homepage اینجا نمی‌رسد چون بالاتر جدا شده است.
//    */

//   return (
//     <UserLayout>
//       {children}
//     </UserLayout>
//   );
// }











"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  useAuthContext,
  UserRole,
} from "@/core/provider/Auth";

import UserLayout from "../user";
import AdminLayout from "../adminLayout";
import OrganizationLayout from "../organizationLayout";

interface ClientLayoutSelectorProps {
  children: React.ReactNode;
}

const DEMO_ROUTE_ROLES: {
  prefix: string;
  role: UserRole;
}[] = [
  {
    prefix: "/users",
    role: "user",
  },
  {
    prefix: "/organization",
    role: "Organization",
  },
  {
    prefix: "/admin",
    role: "Admin",
  },
  {
    prefix: "/seller",
    role: "Seller",
  },
];

const getDemoRoleFromPath = (
  pathname: string
): UserRole | null => {
  const matchedRoute = DEMO_ROUTE_ROLES.find(
    (item) =>
      pathname === item.prefix ||
      pathname.startsWith(`${item.prefix}/`)
  );

  return matchedRoute?.role || null;
};

export default function ClientLayoutSelector({
  children,
}: ClientLayoutSelectorProps) {
  const pathname = usePathname();

  const {
    user,
    loading,
    setFakeRole,
  } = useAuthContext();

  const [demoRoleReady, setDemoRoleReady] =
    useState(false);

  useEffect(() => {
    const demoRole = getDemoRoleFromPath(pathname);

    if (!demoRole) {
      setDemoRoleReady(true);
      return;
    }

    if (!user || user.role !== demoRole) {
      setFakeRole(demoRole);
    }

    setDemoRoleReady(true);
  }, [
    pathname,
    user,
    setFakeRole,
  ]);

  const isHomePage = pathname === "/";

  const isLoginPage =
    pathname === "/login" ||
    pathname === "/Login";

  if (isHomePage || isLoginPage) {
    return <>{children}</>;
  }

  if (loading || !demoRoleReady) {
    return (
      <div
        dir="rtl"
        className="min-h-screen flex items-center justify-center bg-neutral-100"
      >
        <div className="text-sm text-neutral-600">
          در حال بارگذاری...
        </div>
      </div>
    );
  }

  const isAdminRoute =
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  if (isAdminRoute) {
    return (
      <AdminLayout>
        {children}
      </AdminLayout>
    );
  }

  const isUserRoute =
    pathname === "/users" ||
    pathname.startsWith("/users/");

  if (isUserRoute) {
    return (
      <UserLayout>
        {children}
      </UserLayout>
    );
  }

  const isOrganizationRoute =
    pathname === "/organization" ||
    pathname.startsWith("/organization/");

  if (isOrganizationRoute) {
    return (
      <OrganizationLayout>
        {children}
      </OrganizationLayout>
    );
  }

  const isSellerRoute =
    pathname === "/seller" ||
    pathname.startsWith("/seller/");

  if (isSellerRoute) {
    return (
      <UserLayout>
        {children}
      </UserLayout>
    );
  }

  return <>{children}</>;
}
