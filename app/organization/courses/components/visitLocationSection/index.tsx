
// "use client";

// import { useFormikContext } from "formik";
// import { VisitFormValues, VisitOption } from "../visitSchema/visitSchema";
// import { Select } from "@/app/components/ui/input/SelectSilde";
// import { Input } from "@/app/components/ui/input";


// interface VisitLocationSectionProps {
//   movementLocations?: VisitOption[];
// }

// const DEFAULT_LOCATIONS: VisitOption[] = [
//   { label: "پارکینگ سازمان", value: "organization_parking" },
//   { label: "دفتر مرکزی", value: "head_office" },
//   { label: "محل پروژه", value: "project_site" },
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

// export function VisitLocationSection({
//   movementLocations = DEFAULT_LOCATIONS,
// }: VisitLocationSectionProps) {
//   const {
//     values,
//     errors,
//     touched,
//     handleChange,
//     handleBlur,
//     setFieldValue,
//     setFieldTouched,
//   } = useFormikContext<VisitFormValues>();

//   return (
//     <section
//       dir="ltr"
//       aria-labelledby="visit-location-title"
//     >
//       <h2
//         id="visit-location-title"
//         className="mb-[54px] text-[16px] font-bold leading-6 text-black"
//       >
//         بخش ۲ – محل و حرکت
//       </h2>

//       <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-3">
//         <div className="min-w-0">
//           <label className={LABEL_CLASS}>
//             محل حرکت (تجمع کارآموزان) *
//           </label>

//           <div
//             className={SELECT_CLASS}
//             onBlur={(event) => {
//               if (!event.currentTarget.contains(event.relatedTarget)) {
//                 void setFieldTouched("movementLocation", true);
//               }
//             }}
//           >
//             <Select
//               placeholder="انتخاب محل حرکت"
//               options={movementLocations}
//               value={values.movementLocation}
//               onChange={(value) => {
//                 void setFieldValue("movementLocation", value);
//                 void setFieldTouched("movementLocation", true, false);
//               }}
//             />
//           </div>

//           <FieldError name="movementLocation" />
//         </div>

//         <div className="min-w-0 md:col-span-2">
//           <label htmlFor="projectAddress" className={LABEL_CLASS}>
//             آدرس پروژه *
//           </label>

//           <Input
//             id="projectAddress"
//             name="projectAddress"
//             value={values.projectAddress}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             placeholder="آدرس دقیق پروژه"
//             variant="default"
//             inputSize="lg"
//             rounded="lg"
//             className={INPUT_CLASS}
//             error={Boolean(touched.projectAddress && errors.projectAddress)}
//             aria-invalid={Boolean(touched.projectAddress && errors.projectAddress)}
//           />

//           <FieldError name="projectAddress" />
//         </div>

//         <div className="min-w-0 md:col-span-3">
//           <label htmlFor="description" className={LABEL_CLASS}>
//             توضیحات تکمیلی
//           </label>

//           <Input
//             id="description"
//             name="description"
//             value={values.description}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             placeholder="اطلاعات دسترسی، پارکینگ، طبقه و ..."
//             variant="default"
//             inputSize="lg"
//             rounded="lg"
//             className={INPUT_CLASS}
//             error={Boolean(touched.description && errors.description)}
//             aria-invalid={Boolean(touched.description && errors.description)}
//           />

//           <FieldError name="description" />
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import { useFormikContext } from "formik";
import { VisitFormValues, VisitOption } from "../visitSchema/visitSchema";
import { Select } from "@/app/components/ui/input/SelectSilde";
import { Input } from "@/app/components/ui/input";


const LABEL =
  "mb-[9px] block text-[14px] font-semibold leading-5 text-[#111827]";

const INPUT =
  "!h-[45px] !rounded-[10px] !border-[#dce2ea] !bg-white !px-[15px] " +
  "!text-[16px] !font-normal !text-[#111827] " +
  "!shadow-[0_1px_3px_rgba(16,24,40,0.05)] placeholder:!text-[#718096]";

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
  const {
    values,
    setFieldValue,
    handleChange,
    handleBlur,
  } = useFormikContext<VisitFormValues>();

  const locations: VisitOption[] = [
    { label: "پارکینگ سازمان", value: "organization-parking" },
    { label: "درب اصلی سازمان", value: "main-entrance" },
    { label: "محل دیگری", value: "other" },
  ];

  return (
    <section
      dir="rtl"
    >
      <h2 className="mb-[54px] text-[16px] font-bold leading-6 text-black">
        بخش ۲ – محل و حرکت
      </h2>

      <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-3">
        <div className="min-w-0">
          <label className={LABEL}>محل حرکت (تجمع کارآموزان) *</label>
          <Select
            options={locations}
            value={values.meetingLocation}
            placeholder="انتخاب محل حرکت"
            onChange={(value) => {
              void setFieldValue("meetingLocation", value);
            }}
          />
          <FieldError name="meetingLocation" />
        </div>

        <div className="min-w-0 md:col-span-2">
          <label htmlFor="projectAddress" className={LABEL}>
            آدرس پروژه *
          </label>
          <Input
            id="projectAddress"
            name="projectAddress"
            value={values.projectAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="آدرس دقیق پروژه"
            className={INPUT}
            variant="default"
            inputSize="lg"
          />
          <FieldError name="projectAddress" />
        </div>

        <div className="min-w-0 md:col-span-3">
          <label htmlFor="description" className={LABEL}>
            توضیحات تکمیلی
          </label>
          <Input
            id="description"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="اطلاعات دسترسی، پارکینگ، طبقه و ..."
            className={INPUT}
            variant="default"
            inputSize="lg"
          />
          <FieldError name="description" />
        </div>
      </div>
    </section>
  );
}
