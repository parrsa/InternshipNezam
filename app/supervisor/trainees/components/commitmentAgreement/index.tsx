"use client";

import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/lib/cn";
import { useState } from "react";

interface CommitmentAgreementProps {
  stepNumber?: string;
  supervisorName?: string;
  licenseNumber?: string;
  onSubmit?: () => void;
  onSaveDraft?: () => void;
}

export function CommitmentAgreement({
  stepNumber = "۵",
  supervisorName = "{{نام سرپرست}}",
  licenseNumber = "{{شماره پروانه}}",
  onSubmit,
  onSaveDraft,
}: CommitmentAgreementProps) {
  const [accepted, setAccepted] = useState(false);
  const [totalCapacity, setTotalCapacity] = useState("10");
  const [allocatedCapacity, setAllocatedCapacity] = useState("6");
  const [minMonthlyHours, setMinMonthlyHours] = useState("120");

  return (
    <div
      dir="rtl"
      className="w-full rounded-2xl border-2 shadow-xs border-neutral-200 bg-white p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-8">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
          {stepNumber}
        </span>
        <h3 className="text-s font-bold text-gray-800">ظرفیت پذیرش و تعهد سرپرستی</h3>
      </div>

      <div className="flex flex-col">
        <div className="w-full flex justify-center items-center gap-3 mb-5">
          <div className="w-1/3">
            <Input
              label="ظرفیت کل پذیرش"
              variant="default"
              labelClassName="mb-2 text-xs"
              inputSize="sm"
              value={totalCapacity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTotalCapacity(e.target.value)}
            />
          </div>
          <div className="w-1/3">
            <Input
              label="ظرفیت تخصیص یافته"
              variant="default"
              labelClassName="mb-2 text-xs"
              inputSize="sm"
              value={allocatedCapacity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAllocatedCapacity(e.target.value)}
            />
          </div>
          <div className="w-1/3">
            <Input
              label="حداقل ساعت ماهانه"
              variant="default"
              labelClassName="mb-2 text-xs"
              inputSize="sm"
              value={minMonthlyHours}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinMonthlyHours(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-xl border-r-5 border-input-800 bg-slate-50 px-4 py-4 mb-2">
          <h4 className="text-xs font-bold text-neutral-800 mb-2">
            متن تعهدنامه سرپرستی
          </h4>
          <p className="text-[11.5px] leading-6 text-gray-700 text-justify">
            اینجانب {supervisorName} با شماره پروانه {licenseNumber} متعهد
            می‌شوم که نظارت فنی و تخصصی بر کارآموزان زیر نظر خود را به‌طور
            مستمر انجام دهم، گزارش‌های ماهانه را در مهلت ۷ روز بررسی و
            تأیید/رد نمایم و در جلسات توجیهی سازمان حضور فعال داشته باشم. در
            غیر این صورت، سازمان نظام مهندسی تهران می‌تواند صلاحیت سرپرستی مرا
            معلق یا لغو نماید.
          </p>

          <div className="border-t border-neutral-300 mt-4 pt-3">
            <p className="text-[11px] leading-6 text-neutral-600">
              <span className="font-bold text-neutral-800">بند ظرفیت: </span>
              ظرفیت پذیرش کارآموز توسط سازمان تعیین می‌شود و سرپرست متعهد
              می‌گردد از سقف تعیین‌شده فراتر نرود. در صورت تخلف، حق دوره
              کارآموز جدید به سازمان مسترد خواهد شد.
            </p>
          </div>
        </div>

        <div className="flex mt-2 justify-start items-center gap-2 mb-5">
          <input
            type="checkbox"
            className="w-4 h-4"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <p className="text-[11.5px] font-medium text-nowrap text-neutral-950">
            صورت‌مسئول تعهدنامه و بند ظرفیت را می‌پذیرم.
          </p>
        </div>

        <div className="flex items-center justify-start gap-3">
          <Button
            type="submit"
            variant="solid"
            color="input"
            className="text-sm"
            size="xs"
            rounded="lg"
            disabled={!accepted}
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
            ارسال درخواست ثبت‌نام سرپرستی
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn("text-xs font-semibold border-neutral-300 bg-[#f7f9f4aa] text-neutral-900")}
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