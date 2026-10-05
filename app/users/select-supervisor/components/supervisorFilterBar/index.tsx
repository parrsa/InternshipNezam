"use client";
import { Search } from "lucide-react";
import { Select, SelectOption } from "@/app/components/ui/input/SelectSilde";
import { useState } from "react";
import { Input } from "@/app/components/ui/input";


interface SupervisorFilterBarProps {
  selectedName?: string;
  fieldValue: string;
  fieldOptions: SelectOption[];
  onFieldChange: (value: string) => void;
}
const gradeOptions = [
  { label: "همه رشته ها", value: "civil" },
  { label: " برق", value: "architecture" },
  { label: "مهندسی عمران", value: "electrical" },
  { label: "معماری", value: "mechanical" },

];
export function SupervisorFilterBar({ selectedName, fieldValue, fieldOptions, onFieldChange, }: SupervisorFilterBarProps) {
  const [grade, setGrade] = useState<string | undefined>();

  return (
    <div className="flex w-full flex-col gap-5">

      <div className="flex w-full items-center justify-between gap-4 rounded-xl border-r-4 border-orange-500 bg-[#FFFBEA] px-5 py-2">
        <p className="text-xs text-gray-700">
          برای ارسال درخواست به سازمان، باید یک سرپرست انتخاب کنید. سرپرست انتخاب‌شده درخواست شما را بررسی و در صورت تأیید، به سازمان ارسال می‌کند.
        </p>
        {selectedName && (
          <span className="rounded-full  bg-sky-100 px-1 py-0.5 border border-input-200 text-3xs text-sky-800">
            سرپرست انتخاب‌شده: {selectedName}
          </span>
        )}
      </div>

      <div className="flex w-1/2 items-center gap-3">
        <div className="flex-1">
          <Input
            variant="default"
            color="input"
            inputSize="sm"
            placeholder=" جستجوی سرپرست بر اساس نام یا رشته "
            className=" mt-2 w-full border-none border-neutral-200 border  shadow-xs bg-neutral-50  placeholder:text-neutral-500   placeholder:text-xs "
            rightIcon={
              <Search size={18}
                className=" mt-2 text-neutral-500"
              />
            }
          />

        </div>
        
        <div className="mt-2">
          <Select
            placeholder="همه رشته ها"
            options={gradeOptions}
            value={grade}
            onChange={setGrade as any}
            className=" h-9 w-40 text-nowrap text-2xs  border-gray-200 bg-[#FCFBF8]"
          />
        </div>
      </div>
    </div>
  );
}