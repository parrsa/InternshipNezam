"use client";

import { useState } from "react";

import { cn } from "@/lib/cn";
import { Button } from "@/app/components/ui/Button";
import Table from "@/app/components/ui/Table";
import { CheckIcon, CircleCheckIcon, WalletIcon } from "lucide-react";

type AttendanceStatus = "present" | "absent";

export interface Trainee {
  id: string;
  name: string;
  field: string;
  qualification: string;
  level: string;
  status: AttendanceStatus;
  isActive: boolean;
}

interface TraineeAttendanceListProps {
  initialTrainees?: Trainee[];
  onSubmit?: (presentIds: string[]) => void | Promise<void>;
  onToggleActive?: (id: string, isActive: boolean) => void;
}

const faNumber = new Intl.NumberFormat("fa-IR");

const DEFAULT_TRAINEES: Trainee[] = [
  { id: "1", name: "علی رضایی", field: "عمران", qualification: "طراحی، نظارت", level: "کارشناسی", status: "absent", isActive: false },
  { id: "2", name: "مریم حسینی", field: "معماری", qualification: "نظارت", level: "ارشد", status: "present", isActive: true },
  { id: "3", name: "رضا قاسمی", field: "برق", qualification: "اجرا", level: "کارشناسی", status: "absent", isActive: true },
  { id: "4", name: "فاطمه نوری", field: "عمران", qualification: "طراحی", level: "دکتری", status: "present", isActive: true },
  { id: "5", name: "حسین موسوی", field: "مکانیک", qualification: "نظارت", level: "ارشد", status: "absent", isActive: true },
  { id: "6", name: "سارا احمدی", field: "عمران", qualification: "طراحی", level: "کارشناسی", status: "present", isActive: true },
  { id: "7", name: "کامران حسینی", field: "برق", qualification: "اجرا", level: "کارشناسی", status: "present", isActive: true },
  { id: "8", name: "زهرا کریمی", field: "معماری", qualification: "نظارت", level: "ارشد", status: "present", isActive: true },
];

const DEFAULT_SELECTED_IDS = ["2", "4", "5", "6", "7", "8"];

const TH_BASE = "px-0 text-left text-sm text-neutral-900";
const TD_BASE = "px-0 py-2 text-left text-xs text-neutral-900";

interface AttendanceCheckboxProps {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange: () => void;
}

function AttendanceCheckbox({
  checked,
  disabled = false,
  label,
  onChange,
}: AttendanceCheckboxProps) {
  return (
    <label
      className={cn(
        "relative inline-flex h-5 w-5 ",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
      )}
    >
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        aria-label={label}
      />
      <span
        className={cn(
          "h-5 w-5 rounded-md border border-neutral-200 bg-white transition-colors duration-200",
          "peer-checked:border-input-800 peer-checked:bg-input-800",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-input-300 peer-focus-visible:ring-offset-1",
        )}
      />
      <CheckIcon className="pointer-events-none absolute inset-0 m-auto h-3.5 w-3.5 text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100" />
    </label>
  );
}

type BadgeVariant = AttendanceStatus | "inactive";

const BADGE_STYLES: Record<
  BadgeVariant,
  { label: string; icon?: string; className: string }
> = {
  present: {
    label: "حاضر",
    icon: "✓",
    className: "border-green-300 bg-green-100 text-neutral-900",
  },
  absent: {
    label: "غایب",
    icon: "✗",
    className: "border-red-300 bg-red-100 text-red-900",
  },
  inactive: {
    label: "غیرفعال",
    className: "border-red-300 bg-red-100 text-red-700",
  },
};

function StatusBadge({ variant }: { variant: BadgeVariant }) {
  const { label, icon, className } = BADGE_STYLES[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border text-xs px-2.5 py-1 text-2xs font-medium leading-4",
        className,
      )}
    >
      {label}
      {icon && <span aria-hidden="true">{icon}</span>}
    </span>
  );
}

export default function TraineeAttendanceList({
  initialTrainees = DEFAULT_TRAINEES,
  onSubmit,
  onToggleActive,
}: TraineeAttendanceListProps) {
  const [trainees, setTrainees] = useState<Trainee[]>(initialTrainees);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () =>
      new Set(
        initialTrainees === DEFAULT_TRAINEES
          ? DEFAULT_SELECTED_IDS
          : initialTrainees
              .filter((t) => t.isActive && t.status === "present")
              .map((t) => t.id),
      ),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleActive = (id: string) => {
    const target = trainees.find((t) => t.id === id);
    if (!target) return;

    const nextActive = !target.isActive;

    setTrainees((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isActive: nextActive } : t)),
    );

    if (!nextActive) {
      setSelectedIds((prev) => {
        if (!prev.has(id)) return prev;
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }

    onToggleActive?.(id, nextActive);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await onSubmit?.(Array.from(selectedIds));
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    {
      key: "name",
      label: "نام",
      width: "w-[25%]",
      thClassName: cn(TH_BASE, "pl-[49px]"),
      className: cn(TD_BASE, "pl-2.5"),
      render: (row: Trainee) => (
        <div className="flex items-center gap-5">
          <AttendanceCheckbox
            checked={selectedIds.has(row.id)}
            disabled={!row.isActive}
            label={`ثبت حضور ${row.name}`}
            onChange={() => toggleSelected(row.id)}
          />
          <span className="text-xs font-bold">{row.name}</span>
        </div>
      ),
    },
    {
      key: "field",
      label: "رشته",
      width: "w-[11%]",
      thClassName: cn(TH_BASE, "font-bold"),
      className: TD_BASE,
    },
    {
      key: "qualification",
      label: "صلاحیت",
      width: "w-[18%]",
      thClassName: cn(TH_BASE, "font-bold"),
      className: TD_BASE,
    },
    {
      key: "level",
      label: "مقطع",
      width: "w-[14%]",
      thClassName: cn(TH_BASE, "font-bold"),
      className: TD_BASE,
    },
    {
      key: "status",
      label: "وضعیت",
      width: "w-[15%]",
      thClassName: cn(TH_BASE, "font-bold"),
      className: TD_BASE,
      render: (row: Trainee) => (
        <StatusBadge variant={row.isActive ? row.status : "inactive"} />
      ),
    },
    {
      key: "actions",
      label: "عملیات",
      width: "w-[17%]",
      thClassName: cn(TH_BASE, "font-bold"),
      className: TD_BASE,
      render: (row: Trainee) =>
        row.isActive ? (
          <Button
            variant="soft"
            color="danger"
            size="xs"
            rounded="xl"
            className="border border-red-200 px-3 text-3xs font-bold text-red-800"
            onClick={() => toggleActive(row.id)}
          >
            غیرفعال
          </Button>
        ) : (
          <Button
            variant="soft"
            color="success"
            size="sm"
            textSize="xs"
            rounded="md"
            className="border border-green-200 px-3.5 font-bold"
            onClick={() => toggleActive(row.id)}
          >
            فعال‌سازی
          </Button>
        ),
    },
  ];

  const rows = trainees.map((t) => ({
    ...t,
    _rowClassName: t.isActive ? "bg-white" : "bg-white [&_td]:opacity-40",
  }));

  return (
    <div dir="ltr" className=" mb-5">
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white pb-6 shadow-sm">
        <div className="flex items-center justify-between px-8 pb-10 pt-7">
          <h2 className="text-sm font-bold text-neutral-900">لیست کارآموزان</h2>
          <p dir="rtl" className="text-xs text-neutral-500">
            {faNumber.format(selectedIds.size)} کارآموز حاضر از{" "}
            {faNumber.format(trainees.length)} کارآموز
          </p>
        </div>

        <Table
          tableRow={rows}
          tableCol={columns}
          minHeight="0px"
          HeaderPY="py-[17px]"
          fixed
        />
      </div>

      <div className="mt-5 flex items-center gap-0.5">
        <div className="flex h-11 flex-1 items-center gap-3 rounded-lg border-r-4 border-amber-400 bg-amber-50 px-4 text-xs text-amber-700">
          <WalletIcon className="h-4.5 w-4.5 text-amber-600" />
          <p>پس از ثبت حضور کارآموز در جلسه توجیهی، امکان پرداخت هزینه کارآموز برای کارآموز فعال می‌شود.</p>
        </div>

        <Button
          variant="solid"
          color="input"
          size="md"
          textSize="xs"
          rounded="lg"
          loading={isSubmitting}
          leftIcon={<CircleCheckIcon className="h-4.5 w-4.5" />}
          className="h-9 gap-2.5 px-6 py-0 font-bold"
          onClick={handleSubmit}
        >
          ثبت نهایی حضور
        </Button>
      </div>
    </div>
  );
}