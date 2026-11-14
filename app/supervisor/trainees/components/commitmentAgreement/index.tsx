"use client";

import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";
import type { UserType } from "../supervisorConfig";

interface CommitmentAgreementProps {
  userType?: UserType;
  stepNumber?: string;
  supervisorName?: string;
  licenseNumber?: string;
  displayTotalCapacity: number;
  allocatedCapacity: string;
  setAllocatedCapacity: (v: string) => void;
  minMonthlyHours: string;
  setMinMonthlyHours: (v: string) => void;
  isSubmitting?: boolean;
  onSubmit?: () => void;
  onSaveDraft?: () => void;
}

const toEnglishDigits = (value: string) =>
  value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));

const onlyDigits = (value: string) => toEnglishDigits(value).replace(/\D/g, "");

export function CommitmentAgreement({
  stepNumber = "۵",
  supervisorName,
  licenseNumber,
  displayTotalCapacity,
  allocatedCapacity,
  setAllocatedCapacity,
  minMonthlyHours,
  setMinMonthlyHours,
  isSubmitting = false,
  onSubmit,
  onSaveDraft,
}: CommitmentAgreementProps) {
  const [accepted, setAccepted] = useState(false);

  /* مقدار تخصیص‌یافته (حتی بعد از لود بک‌اند) به سقف ظرفیت محدود می‌شود */
  useEffect(() => {
    if (allocatedCapacity === "") return;
    const clamped = Math.min(Number(allocatedCapacity) || 0, displayTotalCapacity);
    if (String(clamped) !== allocatedCapacity) {
      setAllocatedCapacity(String(clamped));
    }
  }, [displayTotalCapacity, allocatedCapacity, setAllocatedCapacity]);

  const handleAllocatedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = onlyDigits(e.target.value);
    setAllocatedCapacity(
      digits === "" ? "" : String(Math.min(Number(digits), displayTotalCapacity))
    );
  };

  return (
    <div
      dir="rtl"
      className="w-full rounded-2xl border-2 shadow-xs border-neutral-200 bg-white p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-8">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
          {stepNumber}
        </span>
        <h3 className="text-s font-bold text-gray-800">
          ظرفیت پذیرش و تعهد سرپرستی
        </h3>
      </div>

      <div className="flex flex-col">
        <div className="w-full flex flex-col md:flex-row justify-center items-stretch md:items-center gap-3 mb-5">
          <div className="w-full md:w-1/3">
            <Input
              label="ظرفیت کل پذیرش"
              variant="default"
              labelClassName="mb-2 text-xs"
              inputSize="sm"
              value={String(displayTotalCapacity)}
              readOnly
              disabled
            />
          </div>
          <div className="w-full md:w-1/3">
            <Input
              label="ظرفیت تخصیص یافته"
              variant="default"
              labelClassName="mb-2 text-xs"
              inputSize="sm"
              inputMode="numeric"
              value={allocatedCapacity}
              onChange={handleAllocatedChange}
            />
          </div>
          <div className="w-full md:w-1/3">
            <Input
              label="حداقل ساعت ماهانه"
              variant="default"
              labelClassName="mb-2 text-xs"
              inputSize="sm"
              inputMode="numeric"
              value={minMonthlyHours}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMinMonthlyHours(onlyDigits(e.target.value))
              }
            />
          </div>
        </div>

        <div className="rounded-xl border-r-5 border-input-800 bg-slate-50 px-4 py-4 mb-2">
          <h4 className="text-xs font-bold text-neutral-800 mb-2">
            متن تعهدنامه سرپرستی
          </h4>
          <p className="text-[11.5px] leading-6 text-gray-700 text-justify">
            اینجانب {supervisorName || "..............."} با شماره پروانه{" "}
            {licenseNumber || "..............."} متعهد می‌شوم که نظارت فنی و
            تخصصی بر کارآموزان زیر نظر خود را به‌طور مستمر انجام دهم،
            گزارش‌های ماهانه را در مهلت ۷ روز بررسی و تأیید/رد نمایم و در جلسات
            توجیهی سازمان حضور فعال داشته باشم. در غیر این صورت، سازمان نظام
            مهندسی تهران می‌تواند صلاحیت سرپرستی مرا معلق یا لغو نماید.
          </p>

          <div className="border-t border-neutral-300 mt-4 pt-3">
            <p className="text-2xs leading-6 text-neutral-600">
              <span className="font-bold text-neutral-800">بند ظرفیت: </span>
              ظرفیت پذیرش کارآموز توسط سازمان تعیین می‌شود و سرپرست متعهد
              می‌گردد از سقف تعیین‌شده فراتر نرود. در صورت تخلف، حق دوره کارآموز
              جدید به سازمان مسترد خواهد شد.
            </p>
          </div>
        </div>

        <div className="flex mt-2 justify-start items-start md:items-center gap-2 mb-5">
          <input
            id="commitment-accepted"
            type="checkbox"
            className="w-4 h-4 mt-0.5 md:mt-0 shrink-0"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <label
            htmlFor="commitment-accepted"
            className="text-[11.5px] font-medium text-neutral-950 cursor-pointer"
          >
            مسئولیت تعهدنامه را می‌پذیرم.
          </label>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-start gap-3">
          <Button
            type="button"
            variant="solid"
            color="input"
            className="text-sm w-full md:w-auto"
            size="xs"
            rounded="lg"
            disabled={!accepted || isSubmitting}
            onClick={onSubmit}
            leftIcon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 3L3 10.5L10.5 13.5M21 3L13.5 21L10.5 13.5M21 3L10.5 13.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            {isSubmitting ? "در حال ارسال..." : "ارسال درخواست ثبت‌نام سرپرستی"}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn(
              "text-xs font-semibold border-neutral-300 bg-[#f7f9f4aa] text-neutral-900 w-full md:w-auto"
            )}
            rounded="lg"
            onClick={onSaveDraft}
          >
            ذخیره پیش‌نویس
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CommitmentAgreement;