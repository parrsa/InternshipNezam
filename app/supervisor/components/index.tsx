// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Building2 } from "lucide-react";

// import { useAuthContext } from "@/core/provider/Auth";
// import { ADMIN_MENU } from "@/lib/organizationmenu";


// const isActivePath = (
//     pathname: string,
//     href: string
// ) => {
//     if (href === "/admin") {
//         return pathname === "/admin";
//     }

//     return (
//         pathname === href ||
//         pathname.startsWith(`${href}/`)
//     );
// };

// export default function SuperVisor() {
//     const pathname = usePathname();
//     const { user } = useAuthContext();

//     return (
//         <aside
//             dir="rtl"
//             className="w-72 shrink-0 h-full bg-[#f4f6ffe9]  flex flex-col border-l  border-neutral-300 overflow-hidden"
//         >
//             <div className=" p-3   h-16  border-b border-neutral-300">
//                 <div className="flex w-full  gap-2 ">
//                     <div className="w-9 h-9  text-sm font-bold rounded-lg bg-[#1b4faf1d] text-input-900 flex items-center justify-center">
//                         ن م
//                     </div>
//                     <div >
//                         <p className="text-xs font-bold text-neutral-800">
//                             سامانه کارآموزی

//                         </p>
//                         <p className="text-2xs text-neutral-400">
//                             سازمان نظام مهندسی تهران
//                         </p>
//                     </div>
//                 </div>

//             </div>

//             <div className=" p-3 border-b border-neutral-300">
//                 <div className="mt-2 rounded-lg bg-[#6a93df1d] px-3 py-1.5 mb-2">
//                     <p className="text-xs font-semibold text-neutral-700 truncate">
//                         {user?.fullName || "کارآموز"}
//                     </p>
//                     <p className="text-2xs text-neutral-400">
//                         کارآموز

//                     </p>
//                 </div>
//             </div>

//             <nav className="flex-1 overflow-y-auto no-scrollbar p-2 flex flex-col gap-1">
//                 {ADMIN_MENU.map((item) => {
//                     const active = isActivePath(pathname, item.href);
//                     const Icon = item.icon;

//                     return (
//                         <Link
//                             key={item.href}
//                             href={item.href}
//                             className={`flex items-center justify-between gap-2 rounded-xl px-2 py-2.5  font-medium text-s transition-colors ${active
//                                 ? "bg-blue-800 py-2.5 text-white text-s"
//                                 : "text-neutral-900  hover:bg-input-100"
//                                 }`}
//                         >
//                             <span className="flex items-center gap-2.5">
//                                 <Icon size={18} />
//                                 {item.label}
//                             </span>

//                             {!!item.badge && (
//                                 <span
//                                     className={`text-2xs w-5 h-5 rounded-full flex items-center justify-center ${active
//                                         ? "bg-white/20 text-white"
//                                         : "bg-orange-100 text-orange-600"
//                                         }`}
//                                 >
//                                     {item.badge}
//                                 </span>
//                             )}
//                             {/* {!!item.tag && (
//                                 <span
//                                     className={`text-3xs w-9 h-5 rounded-full flex items-center justify-center ${active
//                                         ? "bg-white/20 text-white"
//                                         : "bg-input-100 border-indigo-200 border text-input-800"
//                                         }`}
//                                 >
//                                     {item.tag}
//                                 </span>
//                             )} */}
//                         </Link>
//                     );
//                 })}
//             </nav>
//         </aside>
//     );
// }


// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Building2 } from "lucide-react";

// import { useAuthContext } from "@/core/provider/Auth";
// import { ADMIN_MENU } from "@/lib/organizationmenu";


// const matchesPath = (
//     pathname: string,
//     href: string
// ) => {
//     if (href === "/admin") {
//         return pathname === "/admin";
//     }

//     return (
//         pathname === href ||
//         pathname.startsWith(`${href}/`)
//     );
// };

// export default function SuperVisor() {
//     const pathname = usePathname();
//     const { user } = useAuthContext();

//     // فقط طولانی‌ترین href منطبق با مسیر فعلی active می‌شود
//     const activeHref = ADMIN_MENU
//         .filter((item) => matchesPath(pathname, item.href))
//         .sort((a, b) => b.href.length - a.href.length)[0]?.href;

//     return (
//         <aside
//             dir="rtl"
//             className="w-72 shrink-0 h-full bg-[#f4f6ffe9]  flex flex-col border-l  border-neutral-300 overflow-hidden"
//         >
//             <div className=" p-3   h-16  border-b border-neutral-300">
//                 <div className="flex w-full  gap-2 ">
//                     <div className="w-9 h-9  text-sm font-bold rounded-lg bg-[#1b4faf1d] text-input-900 flex items-center justify-center">
//                         ن م
//                     </div>
//                     <div >
//                         <p className="text-xs font-bold text-neutral-800">
//                             سامانه کارآموزی

//                         </p>
//                         <p className="text-2xs text-neutral-400">
//                             سازمان نظام مهندسی تهران
//                         </p>
//                     </div>
//                 </div>

//             </div>

//             <div className=" p-3 border-b border-neutral-300">
//                 <div className="mt-2 rounded-lg bg-[#6a93df1d] px-3 py-1.5 mb-2">
//                     <p className="text-xs  font-semibold text-neutral-700 truncate">
//                         {user?.fullName || "کارآموز"}
//                     </p>
//                     <p className="text-2xs text-neutral-400">
//                         کارآموز

//                     </p>
//                 </div>
//             </div>

//             <nav className="flex-1 overflow-y-auto no-scrollbar p-2 flex flex-col gap-1">
//                 {ADMIN_MENU.map((item) => {
//                     const active = item.href === activeHref;
//                     const Icon = item.icon;

//                     return (
//                         <Link
//                             key={item.href}
//                             href={item.href}
//                             className={`flex items-center justify-between gap-2 rounded-xl px-2 py-2.5  font-medium text-s transition-colors ${active
//                                 ? "bg-blue-800 py-2.5 text-white text-s"
//                                 : "text-neutral-900  hover:bg-input-100"
//                                 }`}
//                         >
//                             <span className="flex items-center gap-2.5">
//                                 <Icon size={18} />
//                                 {item.label}
//                             </span>

//                             {!!item.badge && (
//                                 <span
//                                     className={`text-2xs w-5 h-5 rounded-full flex items-center justify-center ${active
//                                         ? "bg-white/20 text-white"
//                                         : "bg-orange-100 text-orange-600"
//                                         }`}
//                                 >
//                                     {item.badge}
//                                 </span>
//                             )}
//                             {/* {!!item.tag && (
//                                 <span
//                                     className={`text-3xs w-9 h-5 rounded-full flex items-center justify-center ${active
//                                         ? "bg-white/20 text-white"
//                                         : "bg-input-100 border-indigo-200 border text-input-800"
//                                         }`}
//                                 >
//                                     {item.tag}
//                                 </span>
//                             )} */}
//                         </Link>
//                     );
//                 })}
//             </nav>
//         </aside>
//     );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, ChevronLeft } from "lucide-react";
import { useMemo, useState } from "react";

import { useAuthContext } from "@/core/provider/Auth";
import { ADMIN_MENU } from "@/lib/organizationmenu";

/* ----------------------------------------------------------------
   تشخیص آیتم فعال (longest match)
---------------------------------------------------------------- */
const matchesPath = (pathname: string, href: string) => {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
};

export default function SuperVisor() {
  const pathname = usePathname();
  const { user } = useAuthContext();
  const [collapsed, setCollapsed] = useState(false);

  /* ----------------------------------------------------------------
     آیتم فعال: طولانی‌ترین href منطبق
  ---------------------------------------------------------------- */
  const activeHref = useMemo(() => {
    return ADMIN_MENU.filter((item) => matchesPath(pathname, item.href)).sort(
      (a, b) => b.href.length - a.href.length
    )[0]?.href;
  }, [pathname]);

  /* ----------------------------------------------------------------
     نام نمایشی (fallback بر اساس نقش)
  ---------------------------------------------------------------- */
  const displayName = user?.fullName?.trim() || "کاربر";
  // const roleLabel =
  //   user?.role === "supervisor"
  //     ? "سرپرست"
  //     : user?.role === "organization"
  //     ? "سازمان"
  //     : "کارآموز";

  return (
    <aside
      dir="rtl"
      className={[
        "shrink-0 h-full flex flex-col overflow-hidden",
        "bg-[#f4f6ffe9] border-l border-neutral-300",
        "transition-[width] duration-300 ease-in-out",
        collapsed ? "w-[76px]" : "w-72",
      ].join(" ")}
    >
      {/* ================= Header ================= */}
      <div className="h-16 px-3 border-b border-neutral-300 flex items-center">
        <div className="flex items-center gap-2 w-full">
          <div className="w-9 h-9 shrink-0 rounded-lg bg-[#1b4faf1d] text-input-900 text-sm font-bold flex items-center justify-center">
            <Building2 size={18} />
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <p className="text-xs font-bold text-neutral-800 truncate">
                سامانه کارآموزی
              </p>
              <p className="text-2xs text-neutral-400 truncate">
                سازمان نظام مهندسی تهران
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "باز کردن منو" : "بستن منو"}
            className="mr-auto w-7 h-7 shrink-0 rounded-md text-neutral-500 hover:bg-input-100 flex items-center justify-center transition"
          >
            <ChevronLeft
              size={16}
              className={`transition-transform duration-300 ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* ================= User card ================= */}
      <div className="p-3 border-b border-neutral-300">
        {collapsed ? (
          <div className="w-10 h-10 mx-auto rounded-lg bg-[#6a93df1d] text-input-900 flex items-center justify-center text-xs font-bold">
            {displayName.slice(0, 2)}
          </div>
        ) : (
          <div className="rounded-lg bg-[#6a93df1d] px-3 py-2 flex items-center gap-2">
            <div className="w-9 h-9 shrink-0 rounded-full bg-white text-input-900 flex items-center justify-center text-xs font-bold">
              {displayName.slice(0, 2)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-neutral-700 truncate">
                {displayName}
              </p>
              {/* <p className="text-2xs text-neutral-400 truncate">{roleLabel}</p> */}
            </div>
          </div>
        )}
      </div>

      {/* ================= Nav ================= */}
      <nav className="flex-1 overflow-y-auto no-scrollbar p-2 flex flex-col gap-1">
        {ADMIN_MENU.map((item) => {
          const active = item.href === activeHref;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={[
                "group flex items-center rounded-xl px-2 py-2.5 text-[13px] font-medium",
                "transition-colors duration-200",
                active
                  ? "bg-blue-800 text-white shadow-sm"
                  : "text-neutral-900 hover:bg-input-100",
                collapsed ? "justify-center" : "justify-between gap-2",
              ].join(" ")}
            >
              <span
                className={[
                  "flex items-center gap-2.5 min-w-0",
                  collapsed ? "justify-center" : "",
                ].join(" ")}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </span>

              {/* {!collapsed && !!item.badge && (
                <span
                  className={[
                    "text-2xs w-5 h-5 shrink-0 rounded-full flex items-center justify-center",
                    active
                      ? "bg-white/20 text-white"
                      : "bg-orange-100 text-orange-600",
                  ].join(" ")}
                >
                  {item.badge}
                </span>
              )} */}

              {/* نشانگر badge در حالت collapsed */}
              {collapsed && !!item.badge && (
                <span className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-orange-500" />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}