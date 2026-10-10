"use client";

import { useFormikContext } from "formik";
import { VisitFormValues, VisitOption } from "../visitSchema/visitSchema";
import { Input } from "@/app/components/ui/input";
import { Select } from "@/app/components/ui/input/SelectSilde";


interface Props {
  managers: VisitOption[];
}


function ErrorMessage({ name }: { name: keyof VisitFormValues }) {
  const { errors, touched } = useFormikContext<VisitFormValues>();
  const error = errors[name];

  if (!touched[name] || typeof error !== "string") return null;

  return (
    <p role="alert" className="mt-1.5 text-xs text-red-600">
      {error}
    </p>
  );
}

export function VisitInfoSection({ managers }: Props) {
  const {
    values,
    setFieldValue,
    handleChange,
    handleBlur,
  } = useFormikContext<VisitFormValues>();

  const projectTypes: VisitOption[] = [
    { label: "مسکونی", value: "residential" },
    { label: "تجاری", value: "commercial" },
    { label: "صنعتی", value: "industrial" },
  ];

  return (
    <div
      dir="ltr"
    >
      <h2 className="mb-12 text-s font-bold leading-6 text-black">
        بخش ۱ – اطلاعات بازدید
      </h2>

      <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-3">
        <div className="min-w-0 md:col-span-2">
          <label htmlFor="title" className="mb-2 block text-xs font-semibold leading-5 text-[#111827]">
            عنوان بازدید *
          </label>
          <Input
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="مثال: بازدید برج پارسیان"
            // className={INPUT}
            variant="default"

            className=" h-9 placeholder:text-xs"
            inputSize="lg"
          />
          <ErrorMessage name="title" />
        </div>


        <div className="w-1/2"
        dir="rtl"
        >          <label className="mb-2 block text-xs text-left font-semibold leading-5 text-[#111827]">نوع پروژه *</label>
          <Select
            options={projectTypes}
            value={values.projectType}
            placeholder="انتخاب نوع پروژه"
            className="h-9 text-sm "

            onChange={(value) => {
              void setFieldValue("projectType", value);
            }}
          />
          <ErrorMessage name="projectType" />
        </div>

        <div className="w-1/2"
        dir="rtl"
        >
          <label className="mb-2 block text-xs text-left font-semibold leading-5 text-[#111827]">مسئول پروژه *</label>
          <Select
            options={managers}
            value={values.manager}
            className="h-9 text-sm  text-nowrap"
            placeholder="انتخاب مسئول پروژه"
            onChange={(value) => {
              void setFieldValue("manager", value);
            }}
          />
          <ErrorMessage name="manager" />
        </div>

        <div className="min-w-0">
          <label htmlFor="visitDate" className="mb-2 block text-xs font-semibold leading-5 text-[#111827]">
            تاریخ بازدید *
          </label>
          <Input
            id="visitDate"
            name="visitDate"
            type="date"
            value={values.visitDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className=" h-9 placeholder:text-xs"

            variant="default"
            inputSize="lg"
          />
          <ErrorMessage name="visitDate" />
        </div>

        <div className="min-w-0">
          <label htmlFor="visitTime" className="mb-2 block text-xs font-semibold leading-5 text-[#111827]">
            ساعت حرکت *
          </label>
          <Input
            id="visitTime"
            name="visitTime"
            type="time"
            value={values.visitTime}
            onChange={handleChange}
            onBlur={handleBlur}
            className=" h-9 placeholder:text-xs"

            variant="default"
            inputSize="lg"
          />
          <ErrorMessage name="visitTime" />
        </div>

        <div className="min-w-0">
          <label htmlFor="duration" className="mb-2 block text-xs font-semibold leading-5 text-[#111827]">
            مدت بازدید *
          </label>
          <Input
            id="duration"
            name="duration"
            type="number"
            min={1}
            max={24}
            value={values.duration}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="مثال: ۴ ساعت"
            // className={INPUT}
            variant="default"

            className=" h-9 placeholder:text-xs"
            inputSize="lg"
          />
          <ErrorMessage name="duration" />
        </div>
      </div>
    </div>
  );
}
