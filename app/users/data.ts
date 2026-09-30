import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
} from "lucide-react";

export type StatCard = {
  title: string;
  value: string;
  badge: string;
  icon: typeof Clock3;
  badgeClass: string;
};

export type ProgressCourse = {
  title: string;
  percent: number;
};

export type MessageItem = {
  name: string;
  message: string;
  date: string;
  avatar: string;
  dateClass: string;
};

export const statCards: StatCard[] = [

 
  {
    title: "گواهی‌ها",
    value: "۳",
    badge: "۱ در حال صدور",
    icon: Award,
    badgeClass:
      "bg-blue-50 text-blue-900 border-blue-200",
  },
  {
    title: "گزارش‌های تأیید شده",
    value: "۱۲",
    badge: "۹۶٪ نرخ تأیید",
    icon: CheckCircle2,
    badgeClass:
      "bg-emerald-50 text-emerald-900 border-emerald-200",
  },
  {
   title: "دوره‌های فعال",
   value: "۳",
   badge: "۳ دوره نزد اتمام",
   icon: BookOpen,
   badgeClass:
     "bg-amber-50 text-amber-900 border-amber-200",
 },
    {
    title: "ساعات کارآموزی",
    value: "۸۲.۰",
    badge: "۴۸ ساعت این ماه",
    icon: Clock3,
    badgeClass:
      "bg-emerald-50 text-emerald-900 border-emerald-200",
  },
];

export const progressCourses: ProgressCourse[] = [
  {
    title: "آموزش ETABS",
    percent: 72,
  },
  {
    title: "بخشنامه‌های جدید",
    percent: 66,
  },
  {
    title: "بازدید برج پارسیان",
    percent: 53,
  },
];

export const messages: MessageItem[] = [
  {
    name: "مهندس رضایی",
    message: "تأیید گزارش مرداد",
    date: "۱۴۰۴/۰۵/۱۰",
    avatar: "ر",
    dateClass:
      "bg-blue-100 text-blue-900 border-blue-200",
  },
  {
    name: "اداره کارآموزی",
    message: "فراخوان جلسه توجیهی",
    date: "۱۴۰۴/۰۵/۰۸",
    avatar: "ک",
    dateClass:
      "bg-blue-100 text-blue-900 border-blue-200",
  },
  {
    name: "مهندس احمدی",
    message: "تسویه حساب دوره",
    date: "۱۴۰۴/۰۵/۰۵",
    avatar: "ا",
    dateClass:
      "bg-slate-100 text-slate-700 border-slate-200",
  },
];

export const monthlyWorkHours = {
  labels: [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
  ],
  values: [120, 145, 96, 170, 135, 180],
};