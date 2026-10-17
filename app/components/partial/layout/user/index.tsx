"use client";

import Link from "next/link";
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
import { useTouchScroll } from "@/lib/useTouchScroll";

const UserLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const lowerPathname = pathname.toLowerCase();
  const { action } = useHeaderAction();
  const { user } = useAuthContext();
  const { sliderRef, startDragging, onDragging, stopDragging } = useTouchScroll();

  const noSideBar = ["/users/login"];
  const isNoSideBar = noSideBar.includes(lowerPathname);

  if (isNoSideBar) {
    return <div className="w-full">{children}</div>;
  }

  const isActive = (href: string) =>
    href === "/users"
      ? pathname === "/users"
      : pathname === href || pathname.startsWith(`${href}/`);

  const activeMenuItem = USER_MENU.find((item) => isActive(item.href));

  return (
    <div
      dir="rtl"
      className="flex w-full bg-neutral-100 mx-auto h-screen text-black "
    >
      <UserPanelSidebar />

      <div className="flex flex-col gap-2 relative w-full h-full min-w-0">
        <div className="md:hidden bg-white border-b border-neutral-300">
          <div className="flex items-center justify-between px-4 h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 text-sm font-bold rounded-xl bg-[#0a327d1d] text-input-900 flex items-center justify-center">
                ن م
              </div>
              <div>
                <p className="font-bold text-base text-neutral-800">
                  {activeMenuItem?.label || "داشبورد کارآموزان"}
                </p>
                <p className="text-xs text-neutral-600">خلاصه فعالیت‌های اخیر</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="relative w-10 h-10 flex items-center justify-center"
                aria-label="اعلان‌ها"
              >
                <Bell size={20} className="text-neutral-500" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
              </button>
              <div className="w-10 h-10 text-sm font-bold rounded-full bg-[#0a327d1d] text-input-900 flex items-center justify-center">
                {(user?.fullName || "س").charAt(0)}
              </div>
            </div>
          </div>

          <div
            ref={sliderRef}
            onMouseDown={startDragging}
            onMouseMove={onDragging}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            className="flex gap-2 overflow-x-auto no-scrollbar px-3 py-2 cursor-grab"
          >
            {USER_MENU.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs whitespace-nowrap transition-colors ${active
                      ? "bg-blue-800 border-blue-800 text-white"
                      : "bg-input-50 border-neutral-100 text-neutral-600 font-medium"
                    }`}
                >
                  <Icon size={14} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="hidden md:flex items-center justify-between border-b bg-white border-b-neutral-300 px-5 h-16 ">
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
              <div className="flex-1 h-full items-center z-20">{action}</div>
            )}
            <div className=" w-[35%] ">
              <Input
                variant="default"
                color="input"
                className=" mt-2 w-full border-none bg-neutral-50  placeholder:text-neutral-500   placeholder:text-sm "
                inputSize="sm"
                placeholder="جستجو در داشبورد کارآموز..."
                rightIcon={<Search size={18} className=" mt-2 text-neutral-500" />}
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

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <HeaderActionsProvider>
        <HeaderResetOnRouteChange />
        <UserLayoutContent>{children}</UserLayoutContent>
      </HeaderActionsProvider>
    </QueryProvider>
  );
}