"use client";

import { useState } from "react";
import { Eye, Building2, Star } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { cn } from "@/lib/cn";
import { Engineer, EngineerStatus } from "../../types";
import { EngineerProfileModal } from "../engineerProfileModal";

const toPersianDigits = (value: string | number) =>
  String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);

const getProgress = (completed: number, total: number) => {
  if (!total || total <= 0) return 0;
  return Math.min(Math.max((completed / total) * 100, 0), 100);
};

const statusConfig: Record<EngineerStatus, { label: string; className: string }> = {
  active: {
    label: "فعال",
    className: "border-emerald-300 bg-emerald-100 text-emerald-900",
  },
  inactive: {
    label: "غیرفعال",
    className: "border-slate-300 bg-slate-100 text-slate-600",
  },
  review: {
    label: "نیازمند بررسی",
    className: "border-amber-300 bg-orange-100 text-orange-900",
  },
};

interface EngineerReportCardProps {
  engineer: Engineer;
  onViewProfile?: (id: number) => void;
}

export function EngineerReportCard({
  engineer,
  onViewProfile,
}: EngineerReportCardProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  const { id, initial, name, field, specialties, level, rating, completed, total, status, type } =
    engineer;

  const isLegal = type === "legal";
  const progress = getProgress(completed, total);
  const currentStatus = statusConfig[status];

  return (
    <div className="w-full rounded-[18px] border border-slate-200 bg-white px-5 pb-5 pt-11 shadow-sm">
      <div className="flex justify-center">
        <div
          className="flex h-15 w-15 items-center justify-center rounded-full bg-[#e5ebf8] text-[22px] font-medium text-[#0645b5]"
          aria-hidden="true"
        >
          {isLegal ? <Building2 size={36} /> : initial}
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-xs font-bold leading-7 text-slate-950">{name}</h2>
        <p className="mt-0.5 text-xs font-normal leading-6 text-slate-500">
          رشته: {field}
        </p>
        <p className="text-3xs font-normal leading-6 text-slate-500">
          {specialties} — پایه {toPersianDigits(level)}
        </p>
      </div>

      <div className="mt-2.5 flex items-center justify-center gap-1 text-xs font-medium text-slate-950">
       <Star color="orange" size={15}/>
        <span>{toPersianDigits(rating)}</span>
      </div>

      <div className="my-4 h-px w-full bg-slate-200" />

      <div className="flex items-center justify-between text-xs leading-5 text-slate-600">
        <span>کارآموزان</span>
        <span dir="ltr" className="font-medium text-slate-900">
          {toPersianDigits(total)}
          {" / "}
          {toPersianDigits(completed)}
        </span>
      </div>


      <div
      dir="ltr"
        className="mt-1.75 h-1.75 w-full overflow-hidden rounded-l-full bg-[#d7e0f3]"
        role="progressbar"
        aria-label={`پیشرفت کارآموزان ${name}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div
          className="h-full  bg-[#1747b8] transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-3 flex justify-center">
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-full border px-3 text-2xs font-medium leading-5",
            currentStatus.className
          )}
        >
          {currentStatus.label}
        </span>
      </div>

      <Button
        variant="outline"
        color="input"
        leftIcon={<Eye size={18} />}
        textSize="xs"
        type="button"
        onClick={() => {
          setProfileOpen(true);
          onViewProfile?.(id);
        }}
        className="mt-4 h-9 w-full border-gray-200 bg-[#FDFCF8] font-semibold text-gray-900  hover:border-neutral-300 hover:bg-teal-100"
      >
        مشاهده پروفایل
      </Button>

      <EngineerProfileModal
        engineer={engineer}
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </div>
  );
}