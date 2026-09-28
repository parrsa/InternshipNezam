"use client";

import Link from "next/link";
import {
  GraduationCap,
  Layers,
  Library,
  UserCog,
  ChevronLeft,
  type LucideIcon,
} from "lucide-react";



interface DashboardCard {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string | null;
  tags: string[];
  viewLabel: string;
  theme: {
    blob: string;
    iconBg: string;
  };
}

const CARDS: DashboardCard[] = [
  {
    title: "داشبورد کارآموز",
    description:
      "۱۰ نمای تعاملی شامل داشبورد، ثبت‌نام، دوره‌ها، گزارش‌ها، اعتبار مالی، صندوق پیام و گواهی‌ها",
    icon: GraduationCap,
    href: "/users",
    tags: ["Tables", "Forms", "KPI Cards"],
    viewLabel: "view ۱۰",
    theme: {
      blob: "bg-emerald-100",
      iconBg: "bg-emerald-500",
    },
  },
  {
    title: "وایرفریم تعاملی",
    description:
      "نمایش ۳۷ اسلاید HTML با sidebar، جستجو، ناوبری کیبورد، کنترل zoom و نمای کلی",
    icon: Layers,
    href: null,
    tags: ["Overview", "Zoom", "Keyboard Nav"],
    viewLabel: "اسلاید ۳۷",
    theme: {
      blob: "bg-violet-100",
      iconBg: "bg-violet-500",
    },
  },
  {
    title: "داشبورد سازمان",
    description:
      "۹ نمای تعاملی شامل کارآموزان، سرپرستان، دوره‌ها، عملکرد سرپرستان و گواهی‌ها",
    icon: Library,
    href: "/organization",
    tags: ["Certificates", "Reports", "Analytics"],
    viewLabel: "view ۹",
    theme: {
      blob: "bg-rose-100",
      iconBg: "bg-rose-500",
    },
  },
  {
    title: "داشبورد سرپرست",
    description:
      "۷ نمای تعاملی شامل درخواست‌ها، کارآموزان، گزارش‌های ماهانه و نهایی، تنظیمات ظرفیت",
    icon: UserCog,
    href: "/admin",
    tags: ["Approvals", "Capacity", "Reports"],
    viewLabel: "view ۷",
    theme: {
      blob: "bg-amber-100",
      iconBg: "bg-amber-500",
    },
  },
];


const DashboardCardItem = ({ card }: { card: DashboardCard }) => {
  const Icon = card.icon;

  const content = (
    <div className="relative bg-white rounded-2xl border border-neutral-100 p-6 overflow-hidden h-full">
      <div
        className={`absolute -top-10 -start-10 w-40 h-40 rounded-full opacity-70 ${card.theme.blob}`}
      />

      <button
        type="button"
        tabIndex={-1}
        className="relative z-10 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-neutral-400"
        aria-hidden="true"
      >
        <ChevronLeft size={16} />
      </button>

      <div className="relative z-10 flex items-start justify-between gap-4 mt-4">
        <div className="flex-1 text-right">
          <h3 className="font-bold text-neutral-800 text-lg mb-1.5">
            {card.title}
          </h3>
          <p className="text-sm text-neutral-500 leading-6">
            {card.description}
          </p>
        </div>

        <div
          className={`w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center text-white ${card.theme.iconBg}`}
        >
          <Icon size={26} />
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-2 mt-5 flex-wrap">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-neutral-500 bg-neutral-100 rounded-full px-3 py-1"
          >
            {tag}
          </span>
        ))}

        <span className="text-xs text-neutral-500 bg-neutral-100 rounded-full px-3 py-1 ms-auto">
          {card.viewLabel}
        </span>
      </div>
    </div>
  );

  if (!card.href) {
    return <div className="h-full">{content}</div>;
  }

  return (
    <Link href={card.href} className="block h-full">
      {content}
    </Link>
  );
};

export default function HomeDashboardCards() {
  return (
    <div
      dir="rtl"
      className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto p-6"
    >
      {CARDS.map((card) => (
        <DashboardCardItem key={card.title} card={card} />
      ))}
    </div>
  );
}
