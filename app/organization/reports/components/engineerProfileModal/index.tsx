"use client";

import { Star, FileText, Download, Building2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/app/components/ui/Button";
import Modal from "@/app/components/ui/Modal";
import Table from "@/app/components/ui/Table";
import { Engineer, EngineerProject, EngineerResume } from "../../types";

const fa = (n: number) => new Intl.NumberFormat("fa-IR").format(n);

interface EngineerProfileModalProps {
  engineer: Engineer;
  isOpen: boolean;
  onClose: () => void;
}

function StatusBadge({ status }: { status: EngineerProject["status"] }) {
  const running = status === "running";
  return (
    <span
      className={cn(
        "inline-block rounded-full border px-3 py-0.5 text-2xs font-medium",
        running
          ? "border-amber-500 bg-amber-100 text-amber-900"
          : "border-green-500 bg-green-100 text-green-900"
      )}
    >
      {running ? "در حال اجرا" : "اتمام یافته"}
    </span>
  );
}

function StatCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl bg-neutral-50 py-4">
      <span className="text-3xs text-gray-500">{label}</span>
      <div className="flex items-center gap-1 text-md font-bold text-gray-900">
        {children}
      </div>
    </div>
  );
}

const tableCol = [
  {
    key: "name",
    label: "نام پروژه",
    className: "text-2xs text-gray-900 font-semibold",
  },
  { key: "role", label: "نقش", className: "text-2xs text-gray-900 font-normal" },
  {
    key: "area",
    label: "مساحت",
    className: "text-2xs text-gray-900 font-normal",
    render: (r: EngineerProject) => `${fa(r.area)} مترمربع`,
  },
  {
    key: "year",
    label: "سال",
    className: "text-2xs text-gray-900 font-normal",
    render: (r: EngineerProject) =>
      new Intl.NumberFormat("fa-IR", { useGrouping: false }).format(r.year),
  },
  {
    key: "status",
    label: "وضعیت",
    className: "text-xs",
    render: (r: EngineerProject) => <StatusBadge status={r.status} />,
  },
];

const defaultProjects: EngineerProject[] = [
  { id: 1, name: "برج مسکونی پارسیان", role: "مدیر پروژه", area: 12000, year: 1403, status: "running" },
  { id: 2, name: "مجتمع تجاری کیان", role: "ناظر رشته عمران", area: 8500, year: 1402, status: "done" },
  { id: 3, name: "بیمارستان مهر", role: "طراح سازه", area: 15000, year: 1401, status: "done" },
  { id: 4, name: "مدرسه شهید بهشتی", role: "مجری", area: 4200, year: 1400, status: "done" },
];

const defaultResume: EngineerResume = {
  fileName: "resume.pdf",
  description: "فایل رزومه شخصی — ۱.۲ مگابایت",
};

export function EngineerProfileModal({
  engineer: e,
  isOpen,
  onClose,
}: EngineerProfileModalProps) {
  const isLegal = e.type === "legal";
  const projects = e.projects ?? defaultProjects;
  const resume = e.resume ?? defaultResume;

  const tableRow = projects.map((p) => ({ ...p, _rowClassName: "odd:bg-white " }));

  const header = (
    <div className="flex items-center gap-4 py-1">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-base text-indigo-700">
        {isLegal ? <Building2 size={28} /> : e.initial}
      </div>
      <div className="flex flex-col gap-1.5">
        <h2 className="text-sm font-bold text-gray-900">{e.name}</h2>
        <p className="text-2xs text-gray-500">
          {e.field} — {e.specialties} — پایه {fa(e.level)}
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      closeModal={onClose}
      title={header as any}
      size="xl"
      className="sm:max-w-175 no-scrollbar"
    >
      <div className="mt-2 flex gap-4">
        <StatCard label="امتیاز">
          <Star size={17} className="text-amber-500" />
          <span>{fa(e.rating)}</span>
        </StatCard>
        <StatCard label="سابقه">
          <span>{fa(e.experience)} سال</span>
        </StatCard>
        <StatCard label="ظرفیت">
          <span dir="ltr">
            {fa(e.completed)}/{fa(e.total)}
          </span>
        </StatCard>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-2xs text-gray-500">
          پروژه‌های فعال: <b className="text-gray-900">{fa(e.activeProjects)}</b>
        </span>
        <span
          className={cn(
            "rounded-full border px-2 py-0.5 text-2xs",
            isLegal
              ? "border-sky-200 bg-sky-100 text-sky-700"
              : "border-gray-200 bg-gray-100 text-gray-600"
          )}
        >
          {isLegal ? "شخص حقوقی" : "شخص حقیقی"}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-gray-900">
        <FileText size={16} />
        <span>پروژه‌های اجرا شده</span>
      </div>

      <Table
        tableRow={tableRow}
        tableCol={tableCol}
        minHeight="0px"
        HeaderPY="py-2"
      />

      <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-gray-900">
        <Download size={16} />
        <span>رزومه آپلود شده</span>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-neutral-200 p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-2xs font-bold text-rose-500">
            PDF
          </div>
          <div className="flex flex-col">
            <span className="text-right text-s font-medium text-gray-900">
              {resume.fileName}
            </span>
            <span className="text-3xs text-gray-500">{resume.description}</span>
          </div>
        </div>

        <Button
          leftIcon={<Download size={18} />}
          size="xs"
          variant="solid"
          type="button"
          onClick={() => resume.url && window.open(resume.url, "_blank")}
          className="flex h-8.75 items-center justify-center gap-2 text-nowrap rounded-xl border border-gray-200 bg-amber-50/40 px-4 text-xs font-bold text-neutral-900 transition-colors hover:bg-teal-50 hover:text-neutral-950 active:bg-teal-50 active:text-neutral-950"
        >
          دانلود
        </Button>
      </div>

      <div className="mt-3 flex items-center justify-center border-t border-neutral-200 pt-4">
        <Button
          size="xs"
          type="button"
          onClick={onClose}
          className="flex h-8.75 items-center justify-center gap-2 text-nowrap rounded-xl bg-amber-50/40 px-4 text-xs font-bold text-neutral-900 transition-colors hover:bg-teal-50 hover:text-neutral-950 active:bg-teal-50 active:text-neutral-950"
        >
          بستن
        </Button>
      </div>
    </Modal>
  );
}