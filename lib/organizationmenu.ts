import {
  LayoutDashboard,
  Users,
  UserCog,
  BookOpen,
  FileBarChart,
  TrendingUp,
  Award,
  Mail,
  Building2,
  UserPlus,
  FileText,
  UserCheck,
  MonitorPlay,
  Wallet,
  FileCheck,
  Eye,
  Medal,
  UserCircle,
  type LucideIcon,
} from "lucide-react";

export interface OrgMenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export interface AdminMenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export interface UserMenuItem {
  label: string;
  href: string;
  icon: LucideIcon; // یا LucideIcon
  badge?: number;
  tag?: string; // فیلد جدید برای نمایش متن‌هایی مثل "فعال"
}


/*
 * =====================================================
 * منوی سایدبار سازمان
 * =====================================================
 *
 * هر Role سایدبار مخصوص خودش را دارد.
 * این فایل فقط مربوط به Layout سازمان است.
 *
 * badge : عدد نوتیفیکیشن/بج کنار آیتم (اختیاری)
 */

export const ORGANIZATION_MENU: OrgMenuItem[] = [
  {
    label: "داشبورد",
    href: "/organization",
    icon: LayoutDashboard,
  },
  {
    label: "درخواست ها",
    href: "/organization/interns-request",
    icon: Users,
    badge: 4,
  },
  {
    label: "جلسات توجیهی",
    href: "/organization/briefing-sessions",
    icon: UserCog,
  },
  {
    label: "کار اموزان",
    href: "/organization/trainees",
    icon: BookOpen,
    badge: 2,
  },
  {
    label: "سرپرستان",
    href: "/organization/reports",
    icon: FileBarChart,
  },
  {
    label: "دوره ها",
    href: "/organization/courses",
    icon: Building2,
  },
  {
    label: "عملکرد سرپرستان",
    href: "/organization/performance",
    icon: TrendingUp,
  },
  {
    label: "صندوق پیام",
    href: "/organization/messages",
    icon: Mail,
    badge: 5,
  },
  {
    label: "گواهی‌ها",
    href: "/organization/certificates",
    icon: Award,
    badge: 3,
  },
];





/*
 * =====================================================
 * منوی سایدبار سازمان
 * =====================================================
 *
 * هر Role سایدبار مخصوص خودش را دارد.
 * این فایل فقط مربوط به Layout سازمان است.
 *
 * badge : عدد نوتیفیکیشن/بج کنار آیتم (اختیاری)
 */

export const USER_MENU: UserMenuItem[] = [
  {
    label: "داشبورد",
    href: "/users",
    icon: LayoutDashboard,
  },
  {
    label: "ثبت‌نام کارآموزی",
    href: "/users/trainees",
    icon: UserPlus,
  },
  {
    label: "پیگیری درخواست کارآموزی ",
    href: "/users/request-tracking",
    icon: FileText,
    tag: "فعال",
  },
  {
    label: "انتخاب سرپرست",
    href: "/users/select-supervisor",
    icon: UserCheck,
  },
  {
    label: "جلسات توجیهی",
    href: "/users/briefing-sessions",
    icon: MonitorPlay,
    badge: 1,
  },
  {
    label: "اعتبار مالی",
    href: "/users/financial-credit",
    icon: Wallet,
  },
  {
    label: "دوره‌های من",
    href: "/users/my-courses",
    icon: BookOpen,
    badge: 4,
  },
  {
    label: "گزارش ماهانه",
    href: "/users/monthly-report",
    icon: FileBarChart,
    badge: 2,
  },
  {
    label: "گزارش نهایی",
    href: "/users/final-report",
    icon: FileCheck,
  },
  {
    label: "صندوق پیام",
    href: "/users/messages",
    icon: Mail,
    badge: 5,
  },
  {
    label: "بازدیدها",
    href: "/users/visits",
    icon: Eye,
  },
  {
    label: "گواهی‌ها",
    href: "/users/certificates",
    icon: Medal,
    badge: 3,
  },
  {
    label: "پروفایل",
    href: "/users/profile",
    icon: UserCircle,
  },
];





export const ADMIN_MENU: OrgMenuItem[] = [
  {
    label: "داشبورد",
    href: "/supervisor",
    icon: LayoutDashboard,
  },
  {
    label: "ثبت نام سرپرست",
    href: "/supervisor/trainees",
    icon: Users,
    badge: 4,
  },
  {
    label: "پروفایل من",
    href: "/supervisor/profile",
    icon: UserCog,
  },
  {
    label: "درخواست های کارآموزی",
    href: "/supervisor/interns-request",
    icon: BookOpen,
    badge: 2,
  },
  {
    label: "کارآموزان",
    href: "/supervisor/apprentices",
    icon: FileBarChart,
  },
  {
    label: "گزارش های ماهانه",
    href: "/supervisor/monthly-report",
    icon: TrendingUp,
  },
  {
    label: "گزارش های نهایی",
    href: "/supervisor/final-report",
    icon: Award,
    badge: 3,
  },
  {
    label: "صندوق پیام",
    href: "/supervisor/messages",
    icon: Mail,
    badge: 5,
  },
  {
    label: "تنظیمات ظرفیت",
    href: "/supervisor/settings",
    icon: Building2,
  },
];