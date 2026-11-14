"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { useAuthContext } from "@/core/provider/Auth";
import ProtectedRoute from "@/core/provider/ProtectedRoute";
import Loading from "@/app/components/Loading";
import { isPublicRoute } from "@/lib/publicRoutes";

import UserLayout from "../user";
import AdminLayout from "../adminLayout";
import OrganizationLayout from "../organizationLayout";

interface ClientLayoutSelectorProps {
  children: React.ReactNode;
}

export default function ClientLayoutSelector({
  children,
}: ClientLayoutSelectorProps) {
  const pathname = usePathname();

  const { user, loading, isLoggingOut } = useAuthContext();

  /*
   * --------------------------------------------
   * Public / Home / Login
   * --------------------------------------------
   * صفحات عمومی هیچ Layout داشبوردی ندارند.
   */
  if (isPublicRoute(pathname)) {
    return <>{children}</>;
  }

  /*
   * --------------------------------------------
   * Loading
   * --------------------------------------------
   */
  // if (loading || isLoggingOut) return <Loading />;

  // if (!user) return null;

  /*
   * --------------------------------------------
   * Layout Selection
   * --------------------------------------------
   */
  const renderLayout = () => {
    const isAdminRoute =
      pathname === "/supervisor" ||
      pathname.startsWith("/supervisor/");

    if (isAdminRoute) {
      return <AdminLayout>{children}</AdminLayout>;
    }

    const isUserRoute =
      pathname === "/users" ||
      pathname.startsWith("/users/");

    if (isUserRoute) {
      return <UserLayout>{children}</UserLayout>;
    }

    const isOrganizationRoute =
      pathname === "/organization" ||
      pathname.startsWith("/organization/");

    if (isOrganizationRoute) {
      return (
        <OrganizationLayout>{children}</OrganizationLayout>
      );
    }

    const isSellerRoute =
      pathname === "/seller" ||
      pathname.startsWith("/seller/");

    if (isSellerRoute) {
      return <UserLayout>{children}</UserLayout>;
    }

    return <UserLayout>{children}</UserLayout>;
  };

  return (
      <ProtectedRoute>{renderLayout()}</ProtectedRoute>
  );
}