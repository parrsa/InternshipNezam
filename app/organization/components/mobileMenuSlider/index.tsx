"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ORGANIZATION_MENU } from "@/lib/organizationmenu";
import { useTouchScroll } from "@/lib/useTouchScroll";

const isActivePath = (pathname: string, href: string) => {
  if (href === "/organization") {
    return pathname === "/organization";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
};

export default function MobileMenuSlider() {
  const pathname = usePathname();
  const { sliderRef, isDragging, startDragging, onDragging, stopDragging } : any = useTouchScroll();

  return (
    <div className="sm:hidden w-full bg-white border-b border-neutral-300 px-2 py-2 overflow-hidden">
      <div
        ref={sliderRef}
        onMouseDown={startDragging}
        onMouseMove={onDragging}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onTouchStart={startDragging}
        onTouchMove={onDragging}
        onTouchEnd={stopDragging}
        className={`flex items-center gap-2 overflow-x-auto no-scrollbar select-none pb-1 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ scrollBehavior: "smooth" }}
      >
        {ORGANIZATION_MENU.map((item) => {
          const active = isActivePath(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onDragStart={(e) => e.preventDefault()}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                active
                  ? "bg-blue-800 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              <Icon size={14} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}