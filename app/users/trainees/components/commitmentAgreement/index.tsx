"use client";

import { Button } from "@/app/components/ui/Button";
import { cn } from "@/lib/cn";
import { useState } from "react";


interface CommitmentAgreementProps {
  stepNumber?: string;
  fullName?: string;
  nationalId?: string;
  monthlyHours?: string;
  onSubmit?: () => void;
  onSaveDraft?: () => void;
}

export function CommitmentAgreement({
  stepNumber = "۴",
  fullName = "{{نام و نام خانوادگی}}",
  nationalId = "{{کد ملی}}",
  monthlyHours = "{{۱۲۰ ساعت}}",
  onSubmit,
  onSaveDraft,
}: CommitmentAgreementProps) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div
      className="w-full rounded-2xl border-2 shadow-xs border-neutral-200 bg-white p-5 sm:p-6"
    >
      <div className="flex items-center  gap-2 mb-13">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
          {stepNumber}
        </span>
        <h3 className="text-s font-bold text-gray-800">متن تعهدنامه</h3>
      </div>

      <div className=" flex flex-col ">
        <div className="rounded-xl border-r-5 border-input-800 bg-slate-50 px-4 py-4 mb-2">
          <h4 className="text-xs font-bold text-neutral-800 mb-2">
            متن تعهدنامه کارآموزی
          </h4>
          <p className="text-[11.5px] leading-6 text-gray-700 text-justify">
            اینجانب «{fullName}» با کد ملی «{nationalId}» متعهد می‌شوم که در طول
            دوره کارآموزی یک‌ساله، حداقل «{monthlyHours}» در ماه حضوری داشته
            باشم و گزارش ماهانه را در مهلت مقرر به سرپرست تحویل دهم. در غیر این
            صورت، سازمان نظام مهندسی تهران می‌تواند مراتب را ثبت نموده و در
            صورت لزوم، حق دوره را قابل استرداد نداند.
          </p>
        </div>

        <div dir="ltr" className="flex  mt-2 justify-end items-end  gap-2 mb-5">
          <p className="text-[11.5px] font-medium text-nowrap text-neutral-950">
            صورت‌مسئول متن تعهدنامه را خوانده و می‌پذیرم.
          </p>
          <input type="checkbox"
            className=" flex items-end  w-4 h-4"
            checked={accepted}
            onChange={setAccepted  as any}
          />

        </div>

        <div className="flex items-center justify-start gap-3">
          <Button
            type="button"
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
            ارسال درخواست ثبت‌نام
          </Button>

          <Button
            type="button"
            variant="outline"           
            size="sm"
            className={cn("text-xs font-semibold  border-neutral-300 bg-[#f7f9f4aa]  text-neutral-900")}
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