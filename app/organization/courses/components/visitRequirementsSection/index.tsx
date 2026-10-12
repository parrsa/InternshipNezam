"use client";

import { useFormikContext } from "formik";
import { VisitFormValues } from "../visitSchema/visitSchema";
import { Input } from "@/app/components/ui/input";


function RequirementCheckbox({
  name,
  label,
}: {
  name: "sendListToManager" | "issueAttendanceCertificate";
  label: string;
}) {
  const { values, setFieldValue } =
    useFormikContext<VisitFormValues>();

  const checked = values[name];

  return (
    <label className="flex  cursor-pointer items-center gap-3 text-[14px] font-medium leading-5 text-[#111827]">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(event) => {
          void setFieldValue(name, event.target.checked);
        }}
      />

      {label}
    </label>
  );
}

export function VisitRequirementsSection() {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
  } = useFormikContext<VisitFormValues>();

  return (
    <div
      dir="ltr"
    >
      <h2 className="mb-6 text-xs font-bold leading-6 text-black">
        بخش ۴ – الزامات و مدارک
      </h2>

      <div className="w-full">
        <label htmlFor="requirements" className= "mb-2 block text-xs font-semibold leading-5 text-[#111827]">
          الزامات شرکت در بازدید
        </label>

        <Input
          id="requirements"
          name="requirements"
          value={values.requirements}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="مثال: کلاه ایمنی، کفش کار، لباس کار"
          color="input"
          variant="default"
          inputSize="lg"
          className="h-9 placeholder:text-xs"
        />

        {touched.requirements &&
          typeof errors.requirements === "string" && (
            <p role="alert" className="mt-1.5 text-xs text-red-600">
              {errors.requirements}
            </p>
          )}
      </div>

      <div className="mt-4.75 flex flex-col items-start gap-2.5">
        <RequirementCheckbox
          name="sendListToManager"
          label="ارسال لیست به مسئول پروژه"
        />

        <RequirementCheckbox
          name="issueAttendanceCertificate"
          label="صدور گواهی حضور"
        />
      </div>
    </div>
  );
}