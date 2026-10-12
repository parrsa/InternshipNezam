// "use client";

// import { usePathname } from "next/navigation";
// import { Bell } from "lucide-react";

// import QueryProvider from "@/core/provider/ReactQuery";
// import {
//   HeaderActionsProvider,
//   useHeaderAction,
// } from "@/core/provider/HeaderActionProvider/HeaderAction";
// import { HeaderResetOnRouteChange } from "@/core/provider/HeaderActionProvider/HeaderResetOnRouteChange";
// import { useAuthContext } from "@/core/provider/Auth";
// import "@/app/globals.css";
// import { ORGANIZATION_MENU } from "@/lib/organizationmenu";
// import OrganizationSidebar from "@/app/organization/components/organizationSidebar";



// /*
//  * =====================================================
//  * OrganizationLayoutContent
//  * =====================================================
//  *
//  * ساختار دقیقاً هم‌خانواده با AdminLayout است:
//  * QueryProvider + HeaderActionsProvider + Shell خودش
//  *
//  * تفاوت اصلی: Sidebar اختصاصی سازمان اینجا Render می‌شود.
//  */

// const OrganizationLayoutContent = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const pathname = usePathname();
//   const lowerPathname = pathname.toLowerCase();
//   const { action } = useHeaderAction();
//   const { user } = useAuthContext();

//   const noSideBar = ["/organization/login"];
//   const isNoSideBar = noSideBar.includes(lowerPathname);

//   if (isNoSideBar) {
//     return <div className="w-full">{children}</div>;
//   }

//   const activeMenuItem = ORGANIZATION_MENU.find((item) =>
//     item.href === "/organization"
//       ? pathname === "/organization"
//       : pathname === item.href || pathname.startsWith(`${item.href}/`)
//   );

//   return (
//     <div
//       dir="rtl"
//       className="flex w-full bg-neutral-100 mx-auto h-screen text-black gap-2 p-5"
//     >
//       <OrganizationSidebar />

//       <div className="flex flex-col gap-2 relative w-full h-full min-w-0">
//         {/* Header بالای صفحه */}
//         <div className="flex items-center justify-between bg-white rounded-xl py-3 px-5 h-20 shadow-[0_2px_4px_-1px_#0000000F,0_4px_6px_-1px_#0000001A]">
//           <div>
//             <p className="font-bold text-neutral-800">
//               {activeMenuItem?.label || "داشبورد سازمان"}
//             </p>
//             <p className="text-xs text-neutral-400">
//               {user?.fullName || "سازمان"}
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             {action && (
//               <div className="flex-1 h-full items-center z-20">
//                 {action}
//               </div>
//             )}

//             <button
//               type="button"
//               className="relative w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center"
//               aria-label="اعلان‌ها"
//             >
//               <Bell size={18} className="text-neutral-500" />
//               <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
//             </button>

//             <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold">
//               {(user?.fullName || "س").charAt(0)}
//             </div>
//           </div>
//         </div>

//         <div className="w-full rounded-xl mt-2 overflow-auto no-scrollbar flex-1">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function OrganizationLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <QueryProvider>
//       <HeaderActionsProvider>
//         <HeaderResetOnRouteChange />
//         <OrganizationLayoutContent>{children}</OrganizationLayoutContent>
//       </HeaderActionsProvider>
//     </QueryProvider>
//   );
// }





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
import { ORGANIZATION_MENU } from "@/lib/organizationmenu";
import OrganizationSidebar from "@/app/organization/components/organizationSidebar";
import { Input } from "@/app/components/ui/input";




const OrganizationLayoutContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const lowerPathname = pathname.toLowerCase();
  const { action } = useHeaderAction();
  const { user } = useAuthContext();

  const noSideBar = ["/organization/login"];
  const isNoSideBar = noSideBar.includes(lowerPathname);

  if (isNoSideBar) {
    return <div className="w-full">{children}</div>;
  }

  const activeMenuItem = ORGANIZATION_MENU.find((item) =>
    item.href === "/organization"
      ? pathname === "/organization"
      : pathname === item.href || pathname.startsWith(`${item.href}/`)
  );

  return (

    <div
      dir="rtl"
      className="flex w-full bg-neutral-100 mx-auto h-screen text-black "
    >
      <OrganizationSidebar />

      <div className="flex flex-col gap-2 relative w-full h-full min-w-0">
        <div className="flex items-center justify-between border-b bg-white border-b-neutral-300 px-5 h-16 ">
          <div className=" w-[30%] ">
            <p className="font-bold text-base text-neutral-800">
              {activeMenuItem?.label || " داشبورد سازمان"}
            </p>

            <p className="text-xs text-neutral-600">
              {user?.fullName || " اموزان"}
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
                placeholder="جستجو در داشبورد سازمان"
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

        <div className="w-full rounded-xl  overflow-auto no-scrollbar flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <HeaderActionsProvider>
        <HeaderResetOnRouteChange />
        <OrganizationLayoutContent>{children}</OrganizationLayoutContent>
      </HeaderActionsProvider>
    </QueryProvider>
  );
}

