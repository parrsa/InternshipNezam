
// "use client";

// import { useFormikContext } from "formik";
// import { Check } from "lucide-react";
// import { VisitFormValues } from "../visitSchema/visitSchema";
// import { Input } from "@/app/components/ui/input";


// const LABEL =
//   "mb-[9px] block text-[14px] font-semibold leading-5 text-[#111827]";

// const INPUT =
//   "!h-[45px] !rounded-[10px] !border-[#dce2ea] !bg-white !px-[15px] " +
//   "!text-[16px] !font-normal !text-[#111827] " +
//   "!shadow-[0_1px_3px_rgba(16,24,40,0.05)] placeholder:!text-[#718096]";

// function RequirementCheckbox({
//   name,
//   label,
// }: {
//   name: "sendListToManager" | "issueAttendanceCertificate";
//   label: string;
// }) {
//   const { values, setFieldValue } =
//     useFormikContext<VisitFormValues>();

//   const checked = values[name];

//   return (
//     <label className="flex w-fit cursor-pointer items-center gap-[10px] text-[14px] font-medium leading-5 text-[#111827]">
//       <input
//         type="checkbox"
//         name={name}
//         checked={checked}
//         onChange={(event) => {
//           void setFieldValue(name, event.target.checked);
//         }}
//         className="peer sr-only"
//       />

//       <span
//         aria-hidden="true"
//         className={[
//           "flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[5px] border",
//           "peer-focus-visible:ring-2 peer-focus-visible:ring-blue-400",
//           checked
//             ? "border-[#2049bd] bg-[#2049bd] text-white"
//             : "border-[#cbd5e1] bg-white",
//         ].join(" ")}
//       >
//         {checked && <Check size={15} strokeWidth={3} />}
//       </span>

//       {label}
//     </label>
//   );
// }

// export function VisitRequirementsSection() {
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
//       <h2 className="mb-6 text-[16px] font-bold leading-6 text-black">
//         بخش ۴ – الزامات و مدارک
//       </h2>

//       <div className="w-full">
//         <label htmlFor="requirements" className={LABEL}>
//           الزامات شرکت در بازدید
//         </label>

//         <Input
//           id="requirements"
//           name="requirements"
//           value={values.requirements}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           placeholder="مثال: کلاه ایمنی، کفش کار، لباس کار"
//           className={INPUT}
//           variant="default"
//           inputSize="lg"
//         />

//         {touched.requirements &&
//           typeof errors.requirements === "string" && (
//             <p role="alert" className="mt-1.5 text-xs text-red-600">
//               {errors.requirements}
//             </p>
//           )}
//       </div>

//       <div className="mt-[19px] flex flex-col items-start gap-[10px]">
//         <RequirementCheckbox
//           name="sendListToManager"
//           label="ارسال لیست به مسئول پروژه"
//         />

//         <RequirementCheckbox
//           name="issueAttendanceCertificate"
//           label="صدور گواهی حضور"
//         />
//       </div>
//     </section>
//   );
// }
