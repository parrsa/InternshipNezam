
"use client";

import { Input } from "@/app/components/ui/input";
import { Select } from "@/app/components/ui/input/SelectSilde";
import { useState } from "react";

const insuranceOptions = [
  { value: "social", label: "بیمه تأمین اجتماعی" },
  { value: "none", label: "بدون بیمه" },
];

const CERTIFICATE_LABEL = "صادر می‌شود ";

export default function RegistrationCOnditions() {
  const [salary, setSalary] = useState("3000000");
  const [insurance, setInsurance] = useState("social");
  const [weeklyHours, setWeeklyHours] = useState("30");

  return (
    <div
      dir="rtl"
      className="flex w-full flex-col gap-5 rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6 bg-white"
    >
      <div className="flex items-center mb-7 gap-2 justify-between w-full">
        <div className="flex justify-center items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
            4
          </span>
          <h3 className="text-s font-bold text-gray-800">
            شرایط پذیرش کارآموز
          </h3>
        </div>
        <div>
          <span className="px-2 bg-blue-100 text-2xs py-1 rounded-full text-input-900">
            قابل ویرایش همیشگی
          </span>
        </div>
      </div>

      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex flex-col md:flex-row justify-start items-stretch md:items-end gap-4">
          <div className="w-full md:w-96">
            <Input
              label="حقوق ماهانه (تومان)"
              variant="default"
              labelClassName="mb-2 text-xs"
              inputSize="sm"
              value={salary}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSalary(e.target.value)
              }
            />
          </div>
          <div className="w-full md:w-auto">
            <span className="text-2xs font-semibold text-gray-900">بیمه</span>
            <Select
              className="text-nowrap text-xs"
              placeholder="انتخاب بیمه"
              options={insuranceOptions}
              value={insurance}
              onChange={setInsurance}
            />
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-start items-stretch md:items-end gap-4">
          <div className="w-full md:w-1/2">
            <Input
              label="ساعات حضور هفتگی"
              variant="default"
              labelClassName="mb-2 text-xs"
              inputSize="sm"
              value={weeklyHours}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setWeeklyHours(e.target.value)
              }
            />
          </div>
          <div className="w-full md:w-1/2">
            <Input
              className=" bg-neutral-100"
              label="گواهی پایان دوره"
              variant="default"
              labelClassName="mb-2 text-xs"
              inputSize="sm"
              value={CERTIFICATE_LABEL}
              readOnly
              disabled
            />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-start items-center gap-2 p-3 rounded-lg bg-blue-50 border-r-4 border-blue-500 text-blue-900 text-xs">
        <span>⚙️</span>
        <span>
          این بخش در هر زمان پس از ثبت نیز قابل ویرایش است. تغییرات به همه
          کارآموزان فعال اطلاع‌رسانی خواهد شد.
        </span>
      </div>
    </div>
  );
}