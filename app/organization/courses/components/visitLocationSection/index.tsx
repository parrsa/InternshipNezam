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

export function VisitLocationSection() {
  const { values, handleChange, handleBlur } =
    useFormikContext<VisitFormValues>();

  return (
    <section dir="ltr">
      <h2 className="mb-9 text-xs font-bold leading-6 text-black">
        بخش ۲ – محل و حرکت
      </h2>

      <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-3">
        <div className="min-w-0">
          <label
            htmlFor="meetingLocation"
            className="mb-2 block text-xs font-semibold leading-5 text-[#111827]"
          >
            محل حرکت (تجمع کارآموزان) *
          </label>
          <Input
            id="meetingLocation"
            name="meetingLocation"
            value={values.meetingLocation}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="محل حرکت را وارد کنید"
            className="h-9 placeholder:text-xs"
            variant="default"
            inputSize="lg"
          />
          <FieldError name="meetingLocation" />
        </div>

        <div className="min-w-0 md:col-span-2">
          <label
            htmlFor="projectAddress"
            className="mb-2 block text-xs font-semibold leading-5 text-[#111827]"
          >
            آدرس پروژه *
          </label>
          <Input
            id="projectAddress"
            name="projectAddress"
            value={values.projectAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="آدرس دقیق پروژه"
            className="h-9 placeholder:text-xs"
            variant="default"
            inputSize="lg"
          />
          <FieldError name="projectAddress" />
        </div>

        <div className="min-w-0 md:col-span-3">
          <label
            htmlFor="description"
            className="mb-2 block text-xs font-semibold leading-5 text-[#111827]"
          >
            توضیحات تکمیلی
          </label>
          <Input
            id="description"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="اطلاعات دسترسی، پارکینگ، طبقه و ..."
            className="h-9 placeholder:text-xs"
            variant="default"
            inputSize="lg"
          />
          <FieldError name="description" />
        </div>
      </div>
    </section>
  );
}