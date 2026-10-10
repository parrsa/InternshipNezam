
// "use client";

// import { useFormikContext } from "formik";
// import { Clock3 } from "lucide-react";
// import { VisitFormValues, VisitOption } from "../visitSchema/visitSchema";
// import { Select } from "@/app/components/ui/input/SelectSilde";
// import { Input } from "@/app/components/ui/input";




// interface VisitInfoSectionProps {
//   managers: VisitOption[];
//   projectTypes?: VisitOption[];
// }

// const DEFAULT_PROJECT_TYPES: VisitOption[] = [
//   { label: "مسکونی", value: "residential" },
//   { label: "تجاری", value: "commercial" },
//   { label: "اداری", value: "office" },
//   { label: "صنعتی", value: "industrial" },
// ];

// const LABEL_CLASS =
//   "mb-[9px] block text-[14px] font-semibold leading-5 text-[#111827]";

// const INPUT_CLASS =
//   "!h-[45px] !rounded-[10px] !border-[#dce2ea] !bg-white " +
//   "!px-[15px] !text-[16px] !font-normal !text-[#111827] " +
//   "!shadow-[0_1px_3px_rgba(16,24,40,0.05)] " +
//   "placeholder:!text-[#718096]";

// const SELECT_CLASS =
//   "w-full [&>button]:!h-[45px] [&>button]:!rounded-[10px] " +
//   "[&>button]:!border-[#dce2ea] [&>button]:!bg-white " +
//   "[&>button]:!px-[15px] [&>button]:!text-[16px] " +
//   "[&>button]:!text-[#111827] " +
//   "[&>button]:!shadow-[0_1px_3px_rgba(16,24,40,0.05)]";

// function FieldError({
//   name,
// }: {
//   name: keyof VisitFormValues;
// }) {
//   const { errors, touched } = useFormikContext<VisitFormValues>();
//   const error = errors[name];

//   if (!touched[name] || typeof error !== "string") {
//     return null;
//   }

//   return (
//     <p className="mt-1.5 text-xs text-red-600" role="alert">
//       {error}
//     </p>
//   );
// }

// function SelectField({
//   name,
//   label,
//   placeholder,
//   options,
// }: {
//   name: "projectType" | "projectManager";
//   label: string;
//   placeholder: string;
//   options: VisitOption[];
// }) {
//   const { values, setFieldValue, setFieldTouched } =
//     useFormikContext<VisitFormValues>();

//   return (
//     <div className="min-w-0">
//       <label className={LABEL_CLASS}>{label} *</label>

//       <div
//         className={SELECT_CLASS}
//         onBlur={(event) => {
//           if (!event.currentTarget.contains(event.relatedTarget)) {
//             void setFieldTouched(name, true);
//           }
//         }}
//       >
//         <Select
//           placeholder={placeholder}
//           options={options}
//           value={values[name]}
//           onChange={(value) => {
//             void setFieldValue(name, value);
//             void setFieldTouched(name, true, false);
//           }}
//         />
//       </div>

//       <FieldError name={name} />
//     </div>
//   );
// }

// export function VisitInfoSection({
//   managers,
//   projectTypes = DEFAULT_PROJECT_TYPES,
// }: VisitInfoSectionProps) {
//   const {
//     values,
//     errors,
//     touched,
//     handleChange,
//     handleBlur,
//   } = useFormikContext<VisitFormValues>();

//   return (
//     <section
//       dir="ltr"
//     >
//       <h2
//         id="visit-info-title"
//         className="mb-[54px] text-[16px] font-bold leading-6 text-black"
//       >
//         بخش ۱ – اطلاعات بازدید
//       </h2>

//       <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-3">
//         <div className="min-w-0 md:col-span-2">
//           <label htmlFor="title" className={LABEL_CLASS}>
//             عنوان بازدید *
//           </label>

//           <Input
//             id="title"
//             name="title"
//             value={values.title}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             placeholder="مثال: بازدید برج پارسیان"
//             variant="default"
//             inputSize="lg"
//             rounded="lg"
//             className={INPUT_CLASS}
//             error={Boolean(touched.title && errors.title)}
//             aria-invalid={Boolean(touched.title && errors.title)}
//           />

//           <FieldError name="title" />
//         </div>

//         <SelectField
//           name="projectType"
//           label="نوع پروژه"
//           placeholder="انتخاب نوع پروژه"
//           options={projectTypes}
//         />

//         <SelectField
//           name="projectManager"
//           label="مسئول پروژه"
//           placeholder="انتخاب مسئول پروژه"
//           options={managers}
//         />

//         <div className="min-w-0">
//           <label htmlFor="visitDate" className={LABEL_CLASS}>
//             تاریخ بازدید *
//           </label>

//           <Input
//             id="visitDate"
//             name="visitDate"
//             type="date"
//             value={values.visitDate}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             variant="default"
//             inputSize="lg"
//             rounded="lg"
//             className={`${INPUT_CLASS} [direction:ltr]`}
//             error={Boolean(touched.visitDate && errors.visitDate)}
//             aria-invalid={Boolean(touched.visitDate && errors.visitDate)}
//           />

//           <FieldError name="visitDate" />
//         </div>

//         <div className="min-w-0">
//           <label htmlFor="startTime" className={LABEL_CLASS}>
//             ساعت حرکت *
//           </label>

//           <Input
//             id="startTime"
//             name="startTime"
//             type="time"
//             value={values.startTime}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             variant="default"
//             inputSize="lg"
//             rounded="lg"
//             rightIcon={<Clock3 size={16} />}
//             className={`${INPUT_CLASS} [direction:ltr]`}
//             error={Boolean(touched.startTime && errors.startTime)}
//             aria-invalid={Boolean(touched.startTime && errors.startTime)}
//           />

//           <FieldError name="startTime" />
//         </div>

//         <div className="min-w-0">
//           <label htmlFor="duration" className={LABEL_CLASS}>
//             مدت بازدید *
//           </label>

//           <Input
//             id="duration"
//             name="duration"
//             type="number"
//             min={1}
//             max={24}
//             value={values.duration}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             placeholder="مدت زمان به ساعت"
//             variant="default"
//             inputSize="lg"
//             rounded="lg"
//             className={INPUT_CLASS}
//             error={Boolean(touched.duration && errors.duration)}
//             aria-invalid={Boolean(touched.duration && errors.duration)}
//           />

//           <FieldError name="duration" />
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import { useFormikContext } from "formik";
import { VisitFormValues, VisitOption } from "../visitSchema/visitSchema";
import { Input } from "@/app/components/ui/input";
import { Select } from "@/app/components/ui/input/SelectSilde";


interface Props {
  managers: VisitOption[];
}

const LABEL =
  "mb-[9px] block text-[14px] font-semibold leading-5 text-[#111827]";

const INPUT =
  "!h-[45px] !rounded-[10px] !border-[#dce2ea] !bg-white !px-[15px] " +
  "!text-[16px] !font-normal !text-[#111827] " +
  "!shadow-[0_1px_3px_rgba(16,24,40,0.05)] placeholder:!text-[#718096]";

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
    <section
      dir="rtl"
    >
      <h2 className="mb-[54px] text-[16px] font-bold leading-6 text-black">
        بخش ۱ – اطلاعات بازدید
      </h2>

      <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-3">
        <div className="min-w-0 md:col-span-2">
          <label htmlFor="title" className={LABEL}>
            عنوان بازدید *
          </label>
          <Input
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="مثال: بازدید برج پارسیان"
            className={INPUT}
            variant="default"
            inputSize="lg"
          />
          <ErrorMessage name="title" />
        </div>

        <div className="min-w-0">
          <label className={LABEL}>نوع پروژه *</label>
          <Select
            options={projectTypes}
            value={values.projectType}
            placeholder="انتخاب نوع پروژه"
            onChange={(value) => {
              void setFieldValue("projectType", value);
            }}
          />
          <ErrorMessage name="projectType" />
        </div>

        <div className="min-w-0">
          <label className={LABEL}>مسئول پروژه *</label>
          <Select
            options={managers}
            value={values.manager}
            placeholder="انتخاب مسئول پروژه"
            onChange={(value) => {
              void setFieldValue("manager", value);
            }}
          />
          <ErrorMessage name="manager" />
        </div>

        <div className="min-w-0">
          <label htmlFor="visitDate" className={LABEL}>
            تاریخ بازدید *
          </label>
          <Input
            id="visitDate"
            name="visitDate"
            type="date"
            value={values.visitDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${INPUT} [direction:ltr]`}
            variant="default"
            inputSize="lg"
          />
          <ErrorMessage name="visitDate" />
        </div>

        <div className="min-w-0">
          <label htmlFor="visitTime" className={LABEL}>
            ساعت حرکت *
          </label>
          <Input
            id="visitTime"
            name="visitTime"
            type="time"
            value={values.visitTime}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${INPUT} [direction:ltr]`}
            variant="default"
            inputSize="lg"
          />
          <ErrorMessage name="visitTime" />
        </div>

        <div className="min-w-0">
          <label htmlFor="duration" className={LABEL}>
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
            className={INPUT}
            variant="default"
            inputSize="lg"
          />
          <ErrorMessage name="duration" />
        </div>
      </div>
    </section>
  );
}
