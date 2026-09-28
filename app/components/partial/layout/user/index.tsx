"use client";

import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";

import QueryProvider from "@/core/provider/ReactQuery";

import {
  HeaderActionsProvider,
  useHeaderAction,
} from "@/core/provider/HeaderActionProvider/HeaderAction";

import { HeaderResetOnRouteChange } from "@/core/provider/HeaderActionProvider/HeaderResetOnRouteChange";

import { useAuthContext } from "@/core/provider/Auth";

import "@/app/globals.css";

import { USER_MENU } from "@/lib/organizationmenu";

import UserPanelSidebar from "@/app/users/components/userPanelSidebar";
import { Input } from "@/app/components/ui/input";

const UserLayoutContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const lowerPathname = pathname.toLowerCase();
  const { action } = useHeaderAction();
  const { user } = useAuthContext();

  const noSideBar = ["/users/login"];
  const isNoSideBar = noSideBar.includes(lowerPathname);

  if (isNoSideBar) {
    return <div className="w-full">{children}</div>;
  }

  const activeMenuItem = USER_MENU.find((item) =>
    item.href === "/users"
      ? pathname === "/users"
      : pathname === item.href ||
      pathname.startsWith(`${item.href}/`)
  );

  return (
    <div
      dir="rtl"
      className="flex w-full bg-neutral-100 mx-auto h-screen text-black "
    >
      <UserPanelSidebar />

      <div className="flex flex-col gap-2 relative w-full h-full min-w-0">
        <div className="flex items-center justify-between border-b bg-white border-b-neutral-300 px-5 h-16 ">
          <div className=" w-[30%] ">
            <p className="font-bold text-base text-neutral-800">
              {activeMenuItem?.label || "داشبورد کار اموزان"}
            </p>

            <p className="text-xs text-neutral-600">
              {user?.fullName || "کار اموزان"}
            </p>
          </div>

          <div className="flex w-[70%] justify-end items-center gap-3">
            {action && (
              <div className="flex-1 h-full items-center z-20">
                {action}
              </div>
            )}
            <div className=" w-[35%] ">

              <Input
                variant="default"
                color="input"
                inputSize="sm"
                placeholder="جستجو در داشبورد کارآموز…"
                className=" mt-2 w-full border-none bg-neutral-50  placeholder:text-neutral-500   placeholder:text-sm "
                rightIcon={
                  <Search size={18}
                    className=" mt-2 text-neutral-500"
                  />
                }
              />
            </div>
            <button
              type="button"
              className="relative w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center"
              aria-label="اعلان‌ها"
            >
              <Bell size={18} className="text-neutral-500" />

              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
            </button>

            <div className="w-10 h-10 text-sm font-bold rounded-full bg-[#0a327d1d] text-input-900 flex items-center justify-center">
              {(user?.fullName || "س").charAt(0)}
            </div>
          </div>
        </div>

        <div className="w-full rounded-xl mt-2 overflow-auto no-scrollbar flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <HeaderActionsProvider>
        <HeaderResetOnRouteChange />
        <UserLayoutContent>{children}</UserLayoutContent>
      </HeaderActionsProvider>
    </QueryProvider>
  );
}



