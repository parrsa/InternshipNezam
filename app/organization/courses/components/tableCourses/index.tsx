
"use client";

import { useCallback } from "react";
import { Download } from "lucide-react";
import Table from "@/app/components/ui/Table";

type CourseType = "مهارتی" | "حقوقی" | "بازدید" | "نظری";
type CourseStatus = "فعال" | "در انتظار";

interface Course {
  id: string;
  title: string;
  code: string;
  type: CourseType;
  date: string;
  capacity: string;
  registered: string;
  cost: string;
  registrationLabel?: string;
  status: CourseStatus;
}

const courses: Course[] = [
  {
    id: "ET-201",
    title: "آموزش ETABS",
    code: "ET-201",
    type: "مهارتی",
    date: "۱۴۰۵/۰۵/۱۵",
    capacity: "۲۵",
    registered: "۱۸",
    cost: "رایگان فعالان",
    registrationLabel: "free",
    status: "فعال",
  },
  {
    id: "RG-110",
    title: "بخشنامه‌های جدید",
    code: "RG-110",
    type: "حقوقی",
    date: "۱۴۰۵/۰۵/۲۰",
    capacity: "۵۰",
    registered: "۳۲",
    cost: "۱۰۰,۰۰۰ تومان",
    status: "فعال",
  },
  {
    id: "VS-305",
    title: "بازدید برج پارسیان",
    code: "VS-305",
    type: "بازدید",
    date: "۱۴۰۵/۰۵/۲۵",
    capacity: "۱۵",
    registered: "۸",
    cost: "۵۰,۰۰۰ تومان",
    status: "فعال",
  },
  {
    id: "SF-101",
    title: "ایمنی کارگاه",
    code: "SF-101",
    type: "نظری",
    date: "۱۴۰۵/۰۶/۰۱",
    capacity: "۳۰",
    registered: "۰",
    cost: "رایگان فعالان",
    registrationLabel: "free",
    status: "در انتظار",
  },
  {
    id: "MR-101",
    title: "مقررات ملی ساختمان",
    code: "MR-101",
    type: "نظری",
    date: "۱۴۰۵/۰۵/۱۰",
    capacity: "۳۰",
    registered: "۲۴",
    cost: "۱۵۰,۰۰۰ تومان",
    status: "فعال",
  },
  {
    id: "PM-203",
    title: "مدیریت پیمان",
    code: "PM-203",
    type: "حقوقی",
    date: "۱۴۰۵/۰۵/۱۸",
    capacity: "۲۵",
    registered: "۱۸",
    cost: "۱۲۰,۰۰۰ تومان",
    status: "فعال",
  },
];

const badgeStyles: Record<string, string> = {
  مهارتی: "border-[#A8D0FF] bg-[#DCEBFF] text-[#0757A6]",
  نظری: "border-[#A8D0FF] bg-[#DCEBFF] text-[#0757A6]",
  حقوقی: "border-[#F6CB87] bg-[#FFE8C2] text-[#854400]",
  بازدید: "border-[#9CD8B5] bg-[#CFF0DC] text-[#176B45]",
  فعال: "border-[#91D3AE] bg-[#CFF0DC] text-[#176B45]",
  "در انتظار": "border-[#F4C77F] bg-[#FFE7C1] text-[#854400]",
};

function Badge({
  label,
  variant,
}: {
  label: string;
  variant: string;
}) {
  return (
    <span
      className={[
        "inline-flex min-h-[27px] items-center justify-center",
        "whitespace-nowrap rounded-full border px-3 py-1",
        "text-xs font-medium leading-4",
        variant,
      ].join(" ")}
    >
      {label}
    </span>
  );
}

function exportCourses() {
  const headers = [
    "عنوان دوره",
    "نوع",
    "تاریخ",
    "ظرفیت",
    "ثبت‌نام",
    "هزینه",
    "وضعیت",
  ];

  const rows = courses.map((course) => [
    course.title,
    course.type,
    course.date,
    course.capacity,
    course.registered,
    course.cost,
    course.status,
  ]);

  // Prevent spreadsheet formula injection in exported values.
  const escapeCell = (value: string) => {
    const safeValue = /^[\s]*[=+\-@]/.test(value)
      ? `'${value}`
      : value;

    return `"${safeValue.replace(/"/g, '""')}"`;
  };

  const csv = [headers, ...rows]
    .map((row) => row.map(escapeCell).join(","))
    .join("\r\n");

  const blob = new Blob(["\uFEFF", csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "defined-courses.csv";
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

export default function TableCoursesPage() {
  const handleExport = useCallback(() => {
    exportCourses();
  }, []);

  const columns = [
    {
      key: "title",
      label: "عنوان دوره",
      width: "w-[21%]",
      className: "text-right",
      thClassName: "text-right",
      render: (course: Course) => (
        <div className="flex min-w-0 flex-col items-start gap-0">
          <span className="text-sm font-medium leading-5 text-[#111827]">
            {course.title}
          </span>
          <span
            dir="ltr"
            className="text-xs leading-[18px] text-[#6B7280]"
          >
            {course.code}
          </span>
        </div>
      ),
    },
    {
      key: "type",
      label: "نوع",
      width: "w-[10%]",
      className: "text-center",
      thClassName: "text-center",
      render: (course: Course) => (
        <Badge
          label={course.type}
          variant={badgeStyles[course.type]}
        />
      ),
    },
    {
      key: "date",
      label: "تاریخ",
      width: "w-[14%]",
      className: "text-center tabular-nums",
      thClassName: "text-center",
    },
    {
      key: "capacity",
      label: "ظرفیت",
      width: "w-[9%]",
      className: "text-center tabular-nums",
      thClassName: "text-center",
    },
    {
      key: "registered",
      label: "ثبت‌نام",
      width: "w-[10%]",
      className: "text-center tabular-nums",
      thClassName: "text-center",
    },
    {
      key: "cost",
      label: "هزینه",
      width: "w-[19%]",
      className: "text-center",
      thClassName: "text-center",
      render: (course: Course) =>
        course.registrationLabel === "free" ? (
          <Badge
            label={course.cost}
            variant="border-[#8DECCF] bg-[#F0FFF9] text-[#009B76]"
          />
        ) : (
          <span className="font-medium text-[#111827]">
            {course.cost}
          </span>
        ),
    },
    {
      key: "status",
      label: "وضعیت",
      width: "w-[9%]",
      className: "text-center",
      thClassName: "text-center",
      render: (course: Course) => (
        <Badge
          label={course.status}
          variant={badgeStyles[course.status]}
        />
      ),
    },
  ];

  return (
    <main
      dir="rtl"
      className=" bg-[#F5F6F8] "
    >
      <section className="mx-auto  h-127.5 w-full rounded-[18px] border border-[#D9DEE7] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.10)]">
        <div className="flex h-[100px] items-start justify-between px-[30px] pt-[30px]">
          <h1 className="pt-[10px] text-[14px] font-bold leading-5 text-[#111827]">
            دوره‌های تعریف‌شده
          </h1>

          <button
            type="button"
            onClick={handleExport}
            className={[
              "inline-flex h-[40px] items-center justify-center gap-2",
              "rounded-[11px] border border-[#D9DEE7] bg-white",
              "px-3 text-sm font-medium text-[#111827]",
              "shadow-[0_1px_2px_rgba(15,23,42,0.05)]",
              "transition-colors hover:bg-[#F9FAFB]",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-blue-500 focus-visible:ring-offset-2",
            ].join(" ")}
          >
            <span>خروجی</span>
            <Download aria-hidden="true" size={17} strokeWidth={1.8} />
          </button>
        </div>

        {/* Table */}
        <div className="w-full">
          <Table
            tableRow={courses}
            tableCol={columns}
            minHeight="390px"
            HeaderPY="py-[17px]"
            rowPY="py-[14px]"
            fixed
            className="[&_thead_th]:text-[14px] [&_tbody_td]:text-[14px]"
          />
        </div>
      </section>
    </main>
  );
}
