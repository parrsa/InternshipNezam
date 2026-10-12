"use client";

import Table from "@/app/components/ui/Table";
import { Download, RotateCcw } from "lucide-react";

interface CertificateRow {
  id: number;
  trainee: string;
  course: string;
  certCode: string;
  issueDate: string;
  status: "issued" | "pending";
}

const certificatesData: CertificateRow[] = [
  {
    id: 1,
    trainee: "حسین موسوی",
    course: "مقررات ملی ساختمان",
    certCode: "CERT-101-9452",
    issueDate: "۱۴۰۴/۰۴/۲۸",
    status: "issued",
  },
  {
    id: 2,
    trainee: "سحر احمدی",
    course: "مدیریت پیمان",
    certCode: "CERT-203-6721",
    issueDate: "۱۴۰۴/۰۴/۱۵",
    status: "issued",
  },
  {
    id: 3,
    trainee: "علی محمدی",
    course: "مدیریت پیمان",
    certCode: "CERT-203-1180",
    issueDate: "۱۴۰۴/۰۳/۲۰",
    status: "issued",
  },
  {
    id: 4,
    trainee: "زهرا حسینی",
    course: "مقررات ملی ساختمان",
    certCode: "CERT-101-3344",
    issueDate: "۱۴۰۴/۰۲/۱۵",
    status: "issued",
  },
  {
    id: 5,
    trainee: "محمد رضایی",
    course: "فولاد ساختمانی",
    certCode: "CERT-115-9981",
    issueDate: "۱۴۰۴/۰۲/۰۸",
    status: "pending",
  },
];

function StatusBadge({ status }: { status: CertificateRow["status"] }) {
  const isIssued = status === "issued";
  return (
    <span
      className={
        isIssued
          ? "inline-flex items-center justify-center rounded-full bg-emerald-100 px-2 py-0.5  border-green-300 border text-2xs font-medium text-emerald-950"
          : "inline-flex items-center justify-center rounded-full bg-orange-100 px-2 py-0.5 border-orange-300 border text-2xs font-medium text-amber-950"
      }
    >
      {isIssued ? "صادر شده" : "در حال صدور"}
    </span>
  );
}

function ActionButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      className="inline-flex items-center  gap-1.5 rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 active:bg-neutral-100"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

const tableCol = [
  {
    key: "trainee",
    label: "کارآموز",
    className: "font-bold  text-neutral-900",
  },
  {
    key: "course",
    label: "دوره",
    className: "text-neutral-800",
  },
  {
    key: "certCode",
    label: "کد گواهی",
    className: "text-neutral-800",
  },
  {
    key: "issueDate",
    label: "تاریخ صدور",
    className: "text-neutral-800",
  },
  {
    key: "status",
    label: "وضعیت",
    className: "text-neutral-800",
    render: (row: CertificateRow) => <StatusBadge status={row.status} />,
  },
  {
    key: "actions",
    label: "عملیات",
    className: "text-neutral-800",

    render: () => (
      <div className="flex items-center   gap-2">
        <ActionButton
          icon={<Download className="h-3.5 w-3.5" />}
          label="دانلود"
        />
        <ActionButton
          icon={<RotateCcw className="h-0 w-0" />}
          label="یازچاپ"
        />
      </div>
    ),
  },
];

function TablePart() {
  return (
    <div className="w-full  ">
      <div className="w-full text-xs  overflow-hidden rounded-2xl border border-neutral-200  bg-white shadow-sm">
        <Table
          tableRow={certificatesData}
          tableCol={tableCol}
          minHeight="auto"
          HeaderPY="py-7 "
        />
      </div>
    </div>
  );
}

export default TablePart;