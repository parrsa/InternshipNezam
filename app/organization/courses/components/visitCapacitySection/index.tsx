"use client";

import { useFormikContext } from "formik";
import { VisitFormValues } from "../visitSchema/visitSchema";
import { Input } from "@/app/components/ui/input";



function FieldError({ name }: { name: keyof VisitFormValues }) {
  const { errors, touched } = useFormikContext<VisitFormValues>();
  const error = errors[name];

  if (!touched[name] || typeof error !== "string") return null;

  return (
    <p role="alert" className="mt-1.5 text-xs text-red-600">
      {error}
    </p>
  );
}

export function VisitCapacitySection() {
  const {
    values,
    handleChange,
    handleBlur,
  } = useFormikContext<VisitFormValues>();

  return (
    <div
      dir="ltr"
    >
      <h2 className="mb-9 text-xs font-bold leading-6 text-black">
        بخش ۳ – ظرفیت و هزینه
      </h2>

      <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-3">
        <div className="min-w-0">
          <label htmlFor="capacity" className= "mb-2 block text-xs font-semibold leading-5 text-[#111827]">
            ظرفیت *
          </label>
          <Input
            id="capacity"
            name="capacity"
            type="number"
            min={1}
            max={10000}
            value={values.capacity}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="مثال: ۱۵ نفر"
            className="h-9 text-sm"
            variant="default"
            inputSize="lg"
          />
          <FieldError name="capacity" />
        </div>

        <div className="min-w-0">
          <label htmlFor="companyCost" className= "mb-2 block text-xs font-semibold leading-5 text-[#111827]">
            هزینه شرکت (تومان) *
          </label>
          <Input
            id="companyCost"
            name="companyCost"
            type="text"
            inputMode="numeric"
            value={values.companyCost}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="مثال: ۵۰۰۰۰۰"
            className="h-9 text-sm"
            variant="default"
            inputSize="lg"
          />
          <FieldError name="companyCost" />
        </div>

        <div className="min-w-0">
          <label htmlFor="registrationDeadline" className= "mb-2 block text-xs font-semibold leading-5 text-[#111827]">
            مهلت ثبت‌نام *
          </label>
          <Input
            id="registrationDeadline"
            name="registrationDeadline"
            type="date"
            value={values.registrationDeadline}
            onChange={handleChange}
            onBlur={handleBlur}
            className="h-9 text-sm"
            variant="default"
            inputSize="lg"
          />
          <FieldError name="registrationDeadline" />
        </div>
      </div>

      <div className="mt-3.75 flex min-h-13 items-center rounded-[10px] border-r-4 border-[#4b9aff] bg-[#f5f7fa] px-4 py-3 text-[12px] leading-6 text-[#29466c]">
        پرداخت آنلاین برای کارآموزان فعال است. هزینه بازدید در پنل
        کارآموز نمایش داده می‌شود.
      </div>
    </div>
  );
}