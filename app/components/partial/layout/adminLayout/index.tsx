"use client";

import QueryProvider from "@/core/provider/ReactQuery";
import { HeaderActionsProvider, useHeaderAction } from "@/core/provider/HeaderActionProvider/HeaderAction";
import { usePathname } from "next/navigation";
import "@/app/globals.css";
import { HeaderResetOnRouteChange } from "@/core/provider/HeaderActionProvider/HeaderResetOnRouteChange";





const AdminLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const lowerPathname = pathname.toLowerCase();
  const { action } = useHeaderAction();

  const noSideBar = ["/admin/login"];

  const isNoSideBar = noSideBar.includes(lowerPathname);


  if (isNoSideBar) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <div className="flex w-full bg-neutral-100 mx-auto h-screen text-black">

      <div className="flex flex-col gap-2 p-5 relative w-full h-full">
        <div className="flex items-center justify-between bg-white rounded-xl py-3 px-5 h-20 shadow-[0_2px_4px_-1px_#0000000F,0_4px_6px_-1px_#0000001A]">
          <div>
            {action && (
              <div className="flex-1 h-full items-center z-20">
                {action}
              </div>
            )}
          </div>

        </div>

        <div className="w-full rounded-xl mt-2 overflow-auto no-scrollbar flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <HeaderActionsProvider>
        <HeaderResetOnRouteChange />
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </HeaderActionsProvider>
    </QueryProvider>
  );
}