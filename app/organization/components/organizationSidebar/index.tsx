"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2 } from "lucide-react";

import { useAuthContext } from "@/core/provider/Auth";
import { ORGANIZATION_MENU } from "@/lib/organizationmenu";


const isActivePath = (
  pathname: string,
  href: string
) => {
  if (href === "/organization") {
    return pathname === "/organization";
  }

  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
};

export default function OrganizationSidebar() {
  const pathname = usePathname();
  const { user } = useAuthContext();

  return (
    <aside
      dir="rtl"
      className="w-72 shrink-0 h-full bg-white rounded-xl shadow-[0_2px_4px_-1px_#0000000F,0_4px_6px_-1px_#0000001A] flex flex-col overflow-hidden"
    >
      <div className="px-5 pt-5 pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center">
            <Building2 size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-neutral-800">
              پنل سازمان
            </p>
            <p className="text-xs text-neutral-400">
              داشبورد مدیریت سازمان
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-neutral-50 px-3 py-2.5">
          <p className="text-sm font-semibold text-neutral-700 truncate">
            {user?.fullName || "سازمان"}
          </p>
          <p className=" text-2xs text-neutral-400">
            سازمان
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto no-scrollbar px-3 py-3 flex flex-col gap-1">
        {ORGANIZATION_MENU.map((item) => {
          const active = isActivePath(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-blue-800 text-white font-semibold"
                  : "text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Icon size={18} />
                {item.label}
              </span>

              {!!item.badge && (
                <span
                  className={` text-2xs w-5 h-5 rounded-full flex items-center justify-center ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
