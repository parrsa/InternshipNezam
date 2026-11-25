// // "use client";

// // import { useEffect, useMemo, useRef, useState } from "react";
// // import { Form, Formik } from "formik";
// // import * as Yup from "yup";
// // import {
// //   Settings,
// //   Trash2,
// //   Upload,
// //   FileText,
// //   Eye,
// //   TriangleAlert,
// //   ArrowUpToLine,
// //   Building2,
// //   UserRound,
// // } from "lucide-react";

// // import Loading from "@/app/components/Loading";
// // import { Input, TextArea } from "@/app/components/ui/input";
// // import { Button } from "@/app/components/ui/Button";
// // import SwitchButton from "@/app/components/ui/Button/switchButton";
// // import { Select } from "@/app/components/ui/input/SelectSilde";
// // import { cn } from "@/lib/cn";
// // import JalaliDatePicker from "@/lib/jalaliDatePicker";
// // import { getYesterday, isValidISODate, toISODate } from "@/lib/date-utils";
// // import { toGregorian, toJalaali } from "jalaali-js";
// // import { useRegisterSupervisorReal } from "@/core/services/supervisor/mutation";
// // import {
// //   useGetLegalInfo,
// //   useGetRealInfo,
// // } from "@/core/services/supervisor/queris";

// // /* ============================================================
// //    0) Types & Config
// //    ============================================================ */

// // export type UserType = "User" | "legal";

// // const TOTAL_CAPACITY_BY_USER_TYPE: Record<UserType, number> = {
// //   User: 3,
// //   legal: 5,
// // };

// // /** حداقل مجاز برای سقف پذیرش من (بک‌اند: باید > 1 باشد) */
// // const MIN_ALLOCATED_CAPACITY = 2;

// // interface Item {
// //   value: string;
// //   active: boolean;
// // }

// // interface ResumeFile {
// //   name: string;
// //   size: number;
// //   uploadedAt: string;
// //   url?: string;
// // }

// // interface FormValues {
// //   FullName: string;
// //   CompanyName: string;
// //   LicenseNumber: string;
// //   NationalCode: string;
// //   Birthday: string;
// //   Birthplace: string;
// //   PhoneNumber: string;
// //   Address: string;
// //   NezamRegisterCode: string;
// //   LicenseBase: string;
// //   LicenseYear: string;
// // }

// // const emptyForm: FormValues = {
// //   FullName: "",
// //   CompanyName: "",
// //   LicenseNumber: "",
// //   NationalCode: "",
// //   Birthday: "",
// //   Birthplace: "",
// //   PhoneNumber: "",
// //   Address: "",
// //   NezamRegisterCode: "",
// //   LicenseBase: "",
// //   LicenseYear: "",
// // };

// // const usersType: { id: number; title: string; type: UserType }[] = [
// //   { id: 1, title: "شخص حقیقی", type: "User" },
// //   { id: 2, title: "شخص حقوقی", type: "legal" },
// // ];

// // /* ============================================================
// //    1) Enum نگاشت‌ها (مطابق بک‌اند)
// //    ============================================================ */

// // const fieldOptions: { label: string; value: string }[] = [
// //   { label: "مهندسی مکانیک", value: "1" },
// //   { label: "مهندسی برق", value: "2" },
// //   { label: "مهندسی معماری", value: "4" },
// //   { label: "مهندسی عمران", value: "5" },
// //   { label: "شهرسازی", value: "6" },
// //   { label: "نقشه‌برداری", value: "7" },
// //   { label: "ترافیک", value: "8" },
// //   { label: "جوش", value: "9" },
// //   { label: "خاک و پی", value: "10" },
// // ];

// // const qualificationOptions: { label: string; value: string }[] = [
// //   { label: "نظارت", value: "1" },
// //   { label: "طراحی", value: "2" },
// //   { label: "مجری", value: "3" },
// //   { label: "آزمایشگاه", value: "4" },
// // ];

// // const insuranceOptions = [
// //   { value: "social", label: "بیمه تأمین اجتماعی" },
// //   { value: "none", label: "بدون بیمه" },
// // ];

// // /* ============================================================
// //    2) Helpers — Date / Digits
// //    ============================================================ */

// // const persianToISO = (val: string | null | undefined): string => {
// //   if (!val) return "";
// //   const m = String(val).match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
// //   if (!m) return "";
// //   const [, y, mo, d] = m;
// //   const year = Number(y);
// //   if (year > 1900) {
// //     return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
// //   }
// //   const g = toGregorian(year, Number(mo), Number(d));
// //   return `${g.gy}-${String(g.gm).padStart(2, "0")}-${String(g.gd).padStart(2, "0")}`;
// // };

// // const isoToPersian = (iso: string | null | undefined): string => {
// //   if (!iso) return "";
// //   const m = String(iso).match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
// //   if (!m) return "";
// //   const [, y, mo, d] = m;
// //   const gy = Number(y);
// //   if (gy < 1900) return iso;
// //   const j = toJalaali(gy, Number(mo), Number(d));
// //   return `${j.jy}/${String(j.jm).padStart(2, "0")}/${String(j.jd).padStart(2, "0")}`;
// // };

// // const toEnglishDigits = (value: string) =>
// //   value
// //     .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
// //     .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

// // const onlyDigits = (value: string) => toEnglishDigits(value).replace(/\D/g, "");

// // /* ============================================================
// //    3) Validation schema
// //    ============================================================ */

// // const pastDate = (label: string) =>
// //   Yup.string()
// //     .trim()
// //     .required(`${label} الزامی است`)
// //     .test("is-past-date", `${label} باید قبل از امروز باشد`, (value) => {
// //       if (!value) return true;
// //       return isValidISODate(value) && value < toISODate(new Date());
// //     });

// // const commonShape = {
// //   LicenseNumber: Yup.string().trim().required("شماره پروانه اشتغال الزامی است"),
// //   NationalCode: Yup.string()
// //     .trim()
// //     .required("کد ملی الزامی است")
// //     .matches(/^[0-9۰-۹]{10}$/, "کد ملی باید ۱۰ رقم باشد"),
// //   Birthday: pastDate("تاریخ تولد"),
// //   Birthplace: Yup.string().trim().required("محل تولد الزامی است"),
// //   PhoneNumber: Yup.string()
// //     .trim()
// //     .required("شماره تماس الزامی است")
// //     .matches(/^(09|۰۹)[0-9۰-۹]{9}$/, "شماره تماس معتبر نیست"),
// //   Address: Yup.string().trim().required("آدرس الزامی است"),
// //   NezamRegisterCode: Yup.string()
// //     .trim()
// //     .required("شماره عضویت نظام مهندسی الزامی است"),
// //   LicenseBase: Yup.string()
// //     .trim()
// //     .required("پایه پروانه الزامی است")
// //     .test("valid-base", "پایه پروانه معتبر نیست", (v) => {
// //       const n = Number(v);
// //       return !Number.isNaN(n) && n >= 0 && n <= 4;
// //     }),
// //   LicenseYear: Yup.string()
// //     .trim()
// //     .required("سال صدور پروانه الزامی است")
// //     .matches(/^[0-9۰-۹]{4}$/, "سال باید ۴ رقم باشد"),
// // };

// // const userSchema = Yup.object({
// //   ...commonShape,
// //   FullName: Yup.string()
// //     .trim()
// //     .required("نام و نام خانوادگی الزامی است")
// //     .test(
// //       "full-name",
// //       "نام و نام خانوادگی را کامل وارد کنید",
// //       (v) => (v ?? "").trim().split(/\s+/).filter(Boolean).length >= 2
// //     ),
// // });

// // const legalSchema = Yup.object({
// //   ...commonShape,
// //   CompanyName: Yup.string().trim().required("نام شرکت / موسسه الزامی است"),
// //   NationalCode: Yup.string()
// //     .trim()
// //     .required("شناسه ملی الزامی است")
// //     .matches(/^[0-9۰-۹]{11}$/, "شناسه ملی باید ۱۱ رقم باشد"),
// //   Birthday: pastDate("تاریخ تأسیس"),
// //   Birthplace: Yup.string().trim().required("محل شرکت الزامی است"),
// // });

// // /* ============================================================
// //    4) Pre-fill نگاشت از backendData
// //    ============================================================ */

// // function realInfoToFormValues(data: any): FormValues {
// //   const firstName = data?.firstName ?? "";
// //   const lastName = data?.lastName ?? "";
// //   return {
// //     FullName: `${firstName} ${lastName}`.trim(),
// //     CompanyName: "",
// //     LicenseNumber: data?.licenseNumber ?? "",
// //     NationalCode: data?.nationalCode ?? "",
// //     Birthday: persianToISO(data?.birthDate),
// //     Birthplace: data?.birthPlace ?? "",
// //     PhoneNumber: data?.phoneNumber ?? "",
// //     Address: data?.address ?? "",
// //     NezamRegisterCode: data?.nezamRegisterCode ?? "",
// //     LicenseBase: data?.licenseBase != null ? String(data.licenseBase) : "",
// //     LicenseYear: data?.licenseYear ? String(data.licenseYear) : "",
// //   };
// // }

// // /**
// //  * ⚠️ نام فیلدهای بک‌اند حقوقی حدسی است.
// //  * بعد از دیدن خروجی واقعی GetLegalInfo اصلاح شود.
// //  */
// // function legalInfoToFormValues(data: any): FormValues {
// //   return {
// //     ...emptyForm,
// //     CompanyName: data?.companyName ?? "",
// //     LicenseNumber: data?.licenseNumber ?? "",
// //     NationalCode: data?.nationalId ?? data?.nationalCode ?? "",
// //     Birthday: persianToISO(data?.establishDate ?? data?.birthDate),
// //     Birthplace: data?.companyPlace ?? data?.birthPlace ?? "",
// //     PhoneNumber: data?.phoneNumber ?? "",
// //     Address: data?.address ?? "",
// //     NezamRegisterCode: data?.nezamRegisterCode ?? "",
// //     LicenseBase: data?.licenseBase != null ? String(data.licenseBase) : "",
// //     LicenseYear: data?.licenseYear ? String(data.licenseYear) : "",
// //   };
// // }

// // function realInfoToLicenseStatus(data: any) {
// //   const field =
// //     data?.field != null && data.field > 0
// //       ? [{ value: String(data.field), active: true }]
// //       : [];
// //   const quals = Array.isArray(data?.competenceList)
// //     ? data.competenceList
// //         .filter((c: number) => c > 0)
// //         .map((c: number) => ({ value: String(c), active: true }))
// //     : [];
// //   return {
// //     fields: field as Item[],
// //     qualifications: quals as Item[],
// //     experienceYears:
// //       data?.workExperience != null && data.workExperience > 0
// //         ? String(data.workExperience)
// //         : "",
// //     activeProjects:
// //       data?.activeProjectCount != null && data.activeProjectCount > 0
// //         ? String(data.activeProjectCount)
// //         : "",
// //     summary: data?.experienceSummery ?? "",
// //   };
// // }

// // function realInfoToRegistrationConditions(data: any) {
// //   return {
// //     salary:
// //       data?.traineSalary != null && data.traineSalary > 0
// //         ? String(data.traineSalary)
// //         : "",
// //     insurance: (data?.traineInsurnce ? "social" : "none") as "social" | "none",
// //     weeklyHours:
// //       data?.traineHoursByWeek != null && data.traineHoursByWeek > 0
// //         ? String(data.traineHoursByWeek)
// //         : "",
// //     traineeCertificate: !!data?.traineCertificate,
// //   };
// // }

// // function realInfoToCommitment(data: any, fallbackTotal = 0) {
// //   const backendAcceptance = Number(data?.acceptanceCapacity ?? 0);
// //   const displayTotalCapacity =
// //     backendAcceptance > 1 ? backendAcceptance : Math.max(fallbackTotal, 3);

// //   return {
// //     allocatedCapacity:
// //       data?.assignedCapacity != null && data.assignedCapacity > 0
// //         ? String(data.assignedCapacity)
// //         : "",
// //     minMonthlyHours:
// //       data?.minHoursByMonth != null && data.minHoursByMonth > 0
// //         ? String(data.minHoursByMonth)
// //         : "",
// //     displayTotalCapacity,
// //     payloadTotalCapacity: displayTotalCapacity,
// //   };
// // }

// // /* ============================================================
// //    5) buildPayload & validateBeforeSubmit
// //    ============================================================ */

// // interface BuildPayloadParams {
// //   formValues: FormValues;
// //   fields: Item[];
// //   qualifications: Item[];
// //   experienceYears: string;
// //   activeProjects: string;
// //   summary: string;
// //   salary: string;
// //   insurance: "social" | "none";
// //   weeklyHours: string;
// //   payloadTotalCapacity: number;
// //   allocatedCapacity: string;
// //   minMonthlyHours: string;
// //   traineeCertificate: boolean;
// //   backend: any | null;
// // }

// // function buildSupervisorRealPayload(params: BuildPayloadParams) {
// //   const { formValues, fields, qualifications, backend } = params;

// //   const fullName = (formValues.FullName ?? "").trim();
// //   const [firstName, ...rest] = fullName.split(/\s+/);
// //   const lastName = rest.join(" ");

// //   const activeFields = fields.filter((f) => f.active);
// //   const activeQuals = qualifications.filter((q) => q.active);

// //   return {
// //     fldMemberId: backend?.fldMemberId ?? 0,
// //     memberId: backend?.memberId ?? "00000000-0000-0000-0000-000000000000",
// //     id: backend?.id ?? 0,
// //     firstName: firstName || "",
// //     lastName: lastName || "",
// //     nationalCode: formValues.NationalCode ?? "",
// //     licenseNumber: formValues.LicenseNumber ?? "",
// //     phoneNumber: formValues.PhoneNumber ?? "",
// //     birthDate: isoToPersian(formValues.Birthday),
// //     birthPlace: formValues.Birthplace ?? "",
// //     nezamRegisterCode: formValues.NezamRegisterCode ?? "",
// //     address: formValues.Address ?? "",
// //     competenceList: activeQuals
// //       .map((q) => Number(q.value))
// //       .filter((n) => !Number.isNaN(n) && n > 0),
// //     field: activeFields[0] ? Number(activeFields[0].value) : 0,
// //     licenseBase: Number(formValues.LicenseBase) || 0,
// //     workExperience: Number(params.experienceYears) || 0,
// //     activeProjectCount: Number(params.activeProjects) || 0,
// //     licenseYear: Number(formValues.LicenseYear) || 0,
// //     experienceSummery: params.summary || "",
// //     traineSalary: Number(params.salary) || 0,
// //     traineInsurnce: params.insurance === "social",
// //     traineHoursByWeek: Number(params.weeklyHours) || 0,
// //     traineCertificate: params.traineeCertificate,
// //     acceptanceCapacity: params.payloadTotalCapacity,
// //     assignedCapacity: Number(params.allocatedCapacity) || 0,
// //     minHoursByMonth: Number(params.minMonthlyHours) || 0,
// //     userId: backend?.userId ?? "00000000-0000-0000-0000-000000000000",
// //   };
// // }

// // function validateBeforeSubmit(
// //   payload: ReturnType<typeof buildSupervisorRealPayload>
// // ): string | null {
// //   if (!payload.firstName) return "نام الزامی است";
// //   if (!payload.lastName) return "نام خانوادگی الزامی است";
// //   if (!payload.nationalCode) return "کد ملی الزامی است";
// //   if (!payload.licenseNumber) return "شماره پروانه الزامی است";
// //   if (payload.workExperience <= 0) return "سابقه کار باید بزرگتر از ۰ باشد";
// //   if (payload.field <= 0) return "رشته فعالیت الزامی است";
// //   if (payload.licenseBase <= 0) return "پایه پروانه الزامی است";
// //   if (payload.licenseYear <= 0) return "سال صدور پروانه الزامی است";
// //   if (payload.competenceList.length === 0)
// //     return "حداقل یک صلاحیت انتخاب کنید";
// //   if (payload.traineSalary <= 0) return "حقوق ماهانه الزامی است";
// //   if (payload.traineHoursByWeek <= 0) return "ساعات حضور هفتگی الزامی است";
// //   if (payload.acceptanceCapacity <= 0) return "ظرفیت پذیرش الزامی است";
// //   if (payload.assignedCapacity <= 1)
// //     return "سقف پذیرش من باید حداقل ۲ باشد";
// //   if (payload.minHoursByMonth <= 0) return "حداقل ساعت ماهانه الزامی است";
// //   return null;
// // }

// // /* ============================================================
// //    6) UI Sub-Components
// //    ============================================================ */

// // const labelClassName = "text-2xs font-semibold text-neutral-900";

// // function ChipGroup({
// //   label,
// //   options,
// //   items,
// //   onChange,
// //   multiple,
// // }: {
// //   label: string;
// //   options: { label: string; value: string }[];
// //   items: Item[];
// //   onChange: (items: Item[]) => void;
// //   multiple: boolean;
// // }) {
// //   const isSelected = (value: string) => items.some((i) => i.value === value);

// //   const handleClick = (value: string) => {
// //     if (isSelected(value)) {
// //       onChange(items.filter((i) => i.value !== value));
// //     } else if (multiple) {
// //       onChange([...items, { value, active: true }]);
// //     } else {
// //       onChange([{ value, active: true }]);
// //     }
// //   };

// //   return (
// //     <div className="w-full">
// //       <span className={cn(labelClassName, "mb-3 block")}>{label}</span>
// //       <div className="flex flex-wrap gap-2">
// //         {options.map((option) => {
// //           const selected = isSelected(option.value);
// //           return (
// //             <button
// //               key={option.value}
// //               type="button"
// //               aria-pressed={selected}
// //               onClick={() => handleClick(option.value)}
// //               className={cn(
// //                 "h-9 rounded-lg border px-4 text-2xs transition-colors",
// //                 selected
// //                   ? "border-input-800 bg-input-800 font-semibold text-white"
// //                   : "border-neutral-200 bg-neutral-50 text-neutral-900 hover:bg-neutral-100"
// //               )}
// //             >
// //               {option.label}
// //             </button>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }

// // function ActivationRow({
// //   title,
// //   active,
// //   onToggle,
// // }: {
// //   title: string;
// //   active: boolean;
// //   onToggle: (next: boolean) => void;
// // }) {
// //   return (
// //     <div className="flex items-center justify-between py-3">
// //       <div className="flex items-center gap-3">
// //         <span className="text-2xs font-semibold text-neutral-900">{title}</span>
// //         <span
// //           className={cn(
// //             "flex h-5 items-center rounded-full border px-2 text-3xs",
// //             active
// //               ? "border-emerald-300 bg-emerald-100 text-emerald-800"
// //               : "border-neutral-300 bg-neutral-100 text-neutral-600"
// //           )}
// //         >
// //           {active ? "فعال" : "غیرفعال"}
// //         </span>
// //       </div>
// //       <SwitchButton checked={active} onChange={onToggle} size="lg" />
// //     </div>
// //   );
// // }

// // function LicenseStatus({
// //   stepNumber = "۲",
// //   fields,
// //   setFields,
// //   qualifications,
// //   setQualifications,
// //   experienceYears,
// //   setExperienceYears,
// //   activeProjects,
// //   setActiveProjects,
// //   summary,
// //   setSummary,
// //   experienceYearsError,
// // }: {
// //   stepNumber?: string;
// //   fields: Item[];
// //   setFields: (v: Item[]) => void;
// //   qualifications: Item[];
// //   setQualifications: (v: Item[]) => void;
// //   experienceYears: string;
// //   setExperienceYears: (v: string) => void;
// //   activeProjects: string;
// //   setActiveProjects: (v: string) => void;
// //   summary: string;
// //   setSummary: (v: string) => void;
// //   experienceYearsError?: string;
// // }) {
// //   const labelOf = (options: { label: string; value: string }[], v: string) =>
// //     options.find((o) => o.value === v)?.label ?? v;

// //   const setActive = (
// //     items: Item[],
// //     setItems: (items: Item[]) => void,
// //     value: string,
// //     active: boolean
// //   ) => setItems(items.map((i) => (i.value === value ? { ...i, active } : i)));

// //   const hasSelection = fields.length > 0 || qualifications.length > 0;

// //   return (
// //     <div
// //       dir="rtl"
// //       className="w-full rounded-2xl border-2 border-neutral-200 bg-white p-5 shadow-xs sm:p-7"
// //     >
// //       <div className="mb-8 flex items-center gap-2">
// //         <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef0f8] text-xs text-blue-800">
// //           {stepNumber}
// //         </span>
// //         <h3 className="text-s font-semibold text-neutral-900">
// //           رشته فعالیت، صلاحیت و سوابق
// //         </h3>
// //       </div>

// //       <div className="flex flex-col gap-5">
// //         <ChipGroup
// //           label="رشتهٔ فعالیت"
// //           options={fieldOptions}
// //           items={fields}
// //           onChange={setFields}
// //           multiple={false}
// //         />

// //         <ChipGroup
// //           label="صلاحیت‌ها (چند انتخابی)"
// //           options={qualificationOptions}
// //           items={qualifications}
// //           onChange={setQualifications}
// //           multiple
// //         />

// //         {hasSelection && (
// //           <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-4">
// //             <div className="flex items-center gap-2">
// //               <Settings className="size-4 text-neutral-800" strokeWidth={1.75} />
// //               <h4 className="text-2xs font-semibold text-neutral-900">
// //                 مدیریت فعال‌سازی رشته‌ها و صلاحیت‌ها
// //               </h4>
// //             </div>
// //             <p className="mt-2 text-3xs text-neutral-600">
// //               با غیرفعال کردن یک رشته یا صلاحیت، درخواست کارآموزی جدید برای آن
// //               رشته/صلاحیت برای شما قابل قبول نخواهد بود.
// //             </p>

// //             <div className="mt-2 divide-y divide-neutral-200">
// //               {fields.map((item) => (
// //                 <ActivationRow
// //                   key={`field-${item.value}`}
// //                   title={labelOf(fieldOptions, item.value)}
// //                   active={item.active}
// //                   onToggle={(next) =>
// //                     setActive(fields, setFields, item.value, next)
// //                   }
// //                 />
// //               ))}
// //               {qualifications.map((item) => (
// //                 <ActivationRow
// //                   key={`qualification-${item.value}`}
// //                   title={`صلاحیت ${labelOf(qualificationOptions, item.value)}`}
// //                   active={item.active}
// //                   onToggle={(next) =>
// //                     setActive(
// //                       qualifications,
// //                       setQualifications,
// //                       item.value,
// //                       next
// //                     )
// //                   }
// //                 />
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
// //           <div>
// //             <Input
// //               label="سابقه کار (سال)"
// //               variant="default"
// //               labelClassName={labelClassName}
// //               className="mt-2"
// //               inputSize="sm"
// //               type="number"
// //               min={1}
// //               value={experienceYears}
// //               onChange={(e) => setExperienceYears(e.target.value)}
// //               error={!!experienceYearsError}
// //               errorMessage={experienceYearsError}
// //             />
// //           </div>
// //           <div>
// //             <Input
// //               label="تعداد پروژه فعال"
// //               variant="default"
// //               labelClassName={labelClassName}
// //               className="mt-2"
// //               inputSize="sm"
// //               type="number"
// //               min={0}
// //               value={activeProjects}
// //               onChange={(e) => setActiveProjects(e.target.value)}
// //             />
// //           </div>
// //         </div>

// //         <div className="w-full">
// //           <label
// //             htmlFor="experience-summary"
// //             className={cn(labelClassName, "mb-2 block")}
// //           >
// //             خلاصه سوابق
// //           </label>
// //           <TextArea
// //             id="experience-summary"
// //             variant="default"
// //             rounded="xl"
// //             rows={3}
// //             value={summary}
// //             onChange={(e) => setSummary(e.target.value)}
// //             placeholder="خلاصه‌ای از سوابق حرفه‌ای..."
// //             className="min-h-0 text-xs"
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function RegistrationConditions({
// //   salary,
// //   setSalary,
// //   insurance,
// //   setInsurance,
// //   weeklyHours,
// //   setWeeklyHours,
// //   traineeCertificate,
// //   setTraineeCertificate,
// //   stepNumber = "۴",
// // }: {
// //   salary: string;
// //   setSalary: (v: string) => void;
// //   insurance: "social" | "none";
// //   setInsurance: (v: "social" | "none") => void;
// //   weeklyHours: string;
// //   setWeeklyHours: (v: string) => void;
// //   traineeCertificate: boolean;
// //   setTraineeCertificate: (v: boolean) => void;
// //   stepNumber?: string;
// // }) {
// //   return (
// //     <div
// //       dir="rtl"
// //       className="flex w-full flex-col gap-5 rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6 bg-white"
// //     >
// //       <div className="flex items-center mb-7 gap-2 justify-between w-full">
// //         <div className="flex justify-center items-center gap-2">
// //           <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
// //             {stepNumber}
// //           </span>
// //           <h3 className="text-s font-bold text-gray-800">شرایط پذیرش کارآموز</h3>
// //         </div>
// //         <div>
// //           <span className="px-2 bg-blue-100 text-2xs py-1 rounded-full text-input-900">
// //             قابل ویرایش همیشگی
// //           </span>
// //         </div>
// //       </div>

// //       <div className="w-full flex flex-col gap-5">
// //         <div className="w-full flex flex-col md:flex-row justify-start items-stretch md:items-end gap-4">
// //           <div className="w-full md:w-96">
// //             <Input
// //               label="حقوق ماهانه (تومان)"
// //               variant="default"
// //               labelClassName="mb-2 text-xs"
// //               inputSize="sm"
// //               inputMode="numeric"
// //               isPrice
// //               value={salary}
// //               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
// //                 setSalary(onlyDigits(e.target.value))
// //               }
// //             />
// //           </div>
// //           <div className="w-full md:w-auto">
// //             <span className="text-2xs font-semibold text-gray-900">بیمه</span>
// //             <Select
// //               className="text-nowrap text-xs"
// //               placeholder="انتخاب بیمه"
// //               options={insuranceOptions}
// //               value={insurance}
// //               onChange={(v) => setInsurance(v as "social" | "none")}
// //             />
// //           </div>
// //         </div>

// //         <div className="w-full flex flex-col md:flex-row justify-start items-stretch md:items-end gap-4">
// //           <div className="w-full md:w-1/2">
// //             <Input
// //               label="ساعات حضور هفتگی"
// //               variant="default"
// //               labelClassName="mb-2 text-xs"
// //               inputSize="sm"
// //               inputMode="numeric"
// //               value={weeklyHours}
// //               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
// //                 setWeeklyHours(onlyDigits(e.target.value))
// //               }
// //             />
// //           </div>
// //           <div className="w-full md:w-1/2">
// //             <label className="flex items-center gap-2 cursor-pointer select-none">
// //               <input
// //                 type="checkbox"
// //                 checked={traineeCertificate}
// //                 onChange={(e) => setTraineeCertificate(e.target.checked)}
// //                 className="w-4 h-4"
// //               />
// //               <span className="text-2xs font-semibold text-gray-900">
// //                 گواهی پایان دوره صادر می‌شود
// //               </span>
// //             </label>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="w-full flex justify-start items-center gap-2 p-3 rounded-lg bg-blue-50 border-r-4 border-blue-500 text-blue-900 text-xs">
// //         <span>⚙️</span>
// //         <span>
// //           این بخش در هر زمان پس از ثبت نیز قابل ویرایش است. تغییرات به همه
// //           کارآموزان فعال اطلاع‌رسانی خواهد شد.
// //         </span>
// //       </div>
// //     </div>
// //   );
// // }

// // function CommitmentAgreement({
// //   stepNumber = "۵",
// //   supervisorName,
// //   licenseNumber,
// //   displayTotalCapacity,
// //   allocatedCapacity,
// //   setAllocatedCapacity,
// //   minMonthlyHours,
// //   setMinMonthlyHours,
// //   isSubmitting = false,
// //   onSubmit,
// // }: {
// //   stepNumber?: string;
// //   supervisorName?: string;
// //   licenseNumber?: string;
// //   displayTotalCapacity: number;
// //   allocatedCapacity: string;
// //   setAllocatedCapacity: (v: string) => void;
// //   minMonthlyHours: string;
// //   setMinMonthlyHours: (v: string) => void;
// //   isSubmitting?: boolean;
// //   onSubmit?: () => void;
// // }) {
// //   const [accepted, setAccepted] = useState(false);
// //   const [capacityError, setCapacityError] = useState<string | undefined>();

// //   const MAX_ALLOCATED = Math.max(displayTotalCapacity, MIN_ALLOCATED_CAPACITY);

// //   useEffect(() => {
// //     if (allocatedCapacity === "") return;
// //     const clamped = Math.min(
// //       Math.max(Number(allocatedCapacity) || 0, MIN_ALLOCATED_CAPACITY),
// //       MAX_ALLOCATED
// //     );
// //     if (String(clamped) !== allocatedCapacity) {
// //       setAllocatedCapacity(String(clamped));
// //     }
// //   }, [MAX_ALLOCATED, allocatedCapacity, setAllocatedCapacity]);

// //   const handleAllocatedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const digits = onlyDigits(e.target.value);
// //     if (digits === "") {
// //       setAllocatedCapacity("");
// //       setCapacityError("سقف پذیرش من الزامی است");
// //       return;
// //     }
// //     const n = Number(digits);
// //     if (n < MIN_ALLOCATED_CAPACITY) {
// //       setCapacityError(
// //         `سقف پذیرش من باید حداقل ${MIN_ALLOCATED_CAPACITY} باشد`
// //       );
// //     } else if (n > MAX_ALLOCATED) {
// //       setCapacityError(
// //         `سقف پذیرش من نمی‌تواند بیشتر از ${MAX_ALLOCATED} باشد`
// //       );
// //     } else {
// //       setCapacityError(undefined);
// //     }
// //     setAllocatedCapacity(String(Math.min(n, MAX_ALLOCATED)));
// //   };

// //   return (
// //     <div
// //       dir="rtl"
// //       className="w-full rounded-2xl border-2 shadow-xs border-neutral-200 bg-white p-5 sm:p-6"
// //     >
// //       <div className="flex items-center gap-2 mb-8">
// //         <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
// //           {stepNumber}
// //         </span>
// //         <h3 className="text-s font-bold text-gray-800">
// //           ظرفیت پذیرش و تعهد سرپرستی
// //         </h3>
// //       </div>

// //       <div className="flex flex-col">
// //         <div className="w-full flex flex-col md:flex-row justify-center items-stretch md:items-center gap-3 mb-5">
// //           <div className="w-full md:w-1/3">
// //             <Input
// //               label="ظرفیت کل پذیرش"
// //               variant="default"
// //               labelClassName="mb-2 text-xs"
// //               inputSize="sm"
// //               value={String(displayTotalCapacity)}
// //               readOnly
// //               disabled
// //             />
// //           </div>
// //           <div className="w-full md:w-1/3">
// //             <Input
// //               label="سقف پذیرش من"
// //               variant="default"
// //               labelClassName="mb-2 text-xs"
// //               inputSize="sm"
// //               inputMode="numeric"
// //               value={allocatedCapacity}
// //               onChange={handleAllocatedChange}
// //               error={!!capacityError}
// //               errorMessage={capacityError}
// //             />
// //             <p className="mt-1 text-3xs text-neutral-500">
// //               حداقل {MIN_ALLOCATED_CAPACITY} و حداکثر {MAX_ALLOCATED}
// //             </p>
// //           </div>
// //           <div className="w-full md:w-1/3">
// //             <Input
// //               label="حداقل ساعت ماهانه"
// //               variant="default"
// //               labelClassName="mb-2 text-xs"
// //               inputSize="sm"
// //               inputMode="numeric"
// //               value={minMonthlyHours}
// //               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
// //                 setMinMonthlyHours(onlyDigits(e.target.value))
// //               }
// //             />
// //           </div>
// //         </div>

// //         <div className="rounded-xl border-r-5 border-input-800 bg-slate-50 px-4 py-4 mb-2">
// //           <h4 className="text-xs font-bold text-neutral-800 mb-2">
// //             متن تعهدنامه سرپرستی
// //           </h4>
// //           <p className="text-[11.5px] leading-6 text-gray-700 text-justify">
// //             اینجانب {supervisorName || "..............."} با شماره پروانه{" "}
// //             {licenseNumber || "..............."} متعهد می‌شوم که نظارت فنی و
// //             تخصصی بر کارآموزان زیر نظر خود را به‌طور مستمر انجام دهم،
// //             گزارش‌های ماهانه را در مهلت ۷ روز بررسی و تأیید/رد نمایم و در جلسات
// //             توجیهی سازمان حضور فعال داشته باشم. در غیر این صورت، سازمان نظام
// //             مهندسی تهران می‌تواند صلاحیت سرپرستی مرا معلق یا لغو نماید.
// //           </p>

// //           <div className="border-t border-neutral-300 mt-4 pt-3">
// //             <p className="text-2xs leading-6 text-neutral-600">
// //               <span className="font-bold text-neutral-800">بند ظرفیت: </span>
// //               ظرفیت پذیرش کارآموز توسط سازمان تعیین می‌شود و سرپرست متعهد
// //               می‌گردد از سقف تعیین‌شده فراتر نرود.
// //             </p>
// //           </div>
// //         </div>

// //         <div className="flex mt-2 justify-start items-start md:items-center gap-2 mb-5">
// //           <input
// //             id="commitment-accepted"
// //             type="checkbox"
// //             className="w-4 h-4 mt-0.5 md:mt-0 shrink-0"
// //             checked={accepted}
// //             onChange={(e) => setAccepted(e.target.checked)}
// //           />
// //           <label
// //             htmlFor="commitment-accepted"
// //             className="text-[11.5px] font-medium text-neutral-950 cursor-pointer"
// //           >
// //             مسئولیت تعهدنامه را می‌پذیرم.
// //           </label>
// //         </div>

// //         <div className="flex flex-col md:flex-row items-stretch md:items-center justify-start gap-3">
// //           <Button
// //             type="button"
// //             variant="solid"
// //             color="input"
// //             className="text-sm w-full md:w-auto"
// //             size="xs"
// //             rounded="lg"
// //             disabled={!accepted || isSubmitting || !!capacityError}
// //             onClick={onSubmit}
// //           >
// //             {isSubmitting ? "در حال ارسال..." : "ارسال درخواست ثبت‌نام سرپرستی"}
// //           </Button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // const MAX_FILE_SIZE = 5 * 1024 * 1024;
// // const formatSize = (bytes: number) =>
// //   bytes >= 1024 * 1024
// //     ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
// //     : `${Math.max(1, Math.round(bytes / 1024))} KB`;

// // function ResumeUploader({
// //   initialResume = null,
// //   onChange,
// // }: {
// //   initialResume?: ResumeFile | null;
// //   onChange?: (resume: ResumeFile | null, file?: File) => void;
// // }) {
// //   const [resume, setResume] = useState<ResumeFile | null>(initialResume);
// //   const [isDragging, setIsDragging] = useState(false);
// //   const [error, setError] = useState("");
// //   const fileInputRef = useRef<HTMLInputElement>(null);
// //   const urlRef = useRef<string | undefined>(undefined);

// //   useEffect(() => {
// //     return () => {
// //       if (urlRef.current) URL.revokeObjectURL(urlRef.current);
// //     };
// //   }, []);

// //   const handleFile = (file: File | undefined) => {
// //     if (!file) return;
// //     if (file.type !== "application/pdf") {
// //       setError("فقط فایل PDF مجاز است.");
// //       return;
// //     }
// //     if (file.size > MAX_FILE_SIZE) {
// //       setError("حجم فایل نباید بیشتر از ۵ مگابایت باشد.");
// //       return;
// //     }
// //     if (urlRef.current) URL.revokeObjectURL(urlRef.current);
// //     const url = URL.createObjectURL(file);
// //     urlRef.current = url;

// //     const newResume: ResumeFile = {
// //       name: file.name,
// //       size: file.size,
// //       uploadedAt: new Date().toLocaleDateString("fa-IR", {
// //         year: "numeric",
// //         month: "2-digit",
// //         day: "2-digit",
// //       }),
// //       url,
// //     };

// //     setError("");
// //     setResume(newResume);
// //     onChange?.(newResume, file);
// //   };

// //   const handleDelete = () => {
// //     if (urlRef.current) URL.revokeObjectURL(urlRef.current);
// //     urlRef.current = undefined;
// //     setResume(null);
// //     setError("");
// //     onChange?.(null);
// //   };

// //   return (
// //     <div
// //       dir="rtl"
// //       className="w-full flex flex-col gap-4 mt-4 rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6 bg-white"
// //     >
// //       <div className="flex justify-start items-center gap-2 text-sm font-bold text-black mb-4">
// //         <ArrowUpToLine size={18} />
// //         <span>فایل رزومه</span>
// //       </div>

// //       {resume && (
// //         <div className="w-full flex items-center justify-between gap-3 p-3 rounded-lg border border-neutral-200 bg-neutral-50">
// //           <div className="flex items-center gap-2 min-w-0">
// //             <FileText size={18} className="text-neutral-600 shrink-0" />
// //             <div className="min-w-0">
// //               <p className="text-xs font-semibold text-neutral-900 truncate">
// //                 {resume.name}
// //               </p>
// //               <p className="text-3xs text-neutral-500">
// //                 {formatSize(resume.size)} · {resume.uploadedAt}
// //               </p>
// //             </div>
// //           </div>
// //           <div className="flex items-center gap-3 shrink-0">
// //             {resume.url && (
// //               <button
// //                 type="button"
// //                 onClick={() => window.open(resume.url, "_blank")}
// //                 className="cursor-pointer"
// //                 aria-label="مشاهده رزومه"
// //               >
// //                 <Eye size={17} />
// //               </button>
// //             )}
// //             <button
// //               type="button"
// //               onClick={handleDelete}
// //               className="cursor-pointer"
// //               aria-label="حذف رزومه"
// //             >
// //               <Trash2 size={17} color="red" />
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       <div
// //         onDragOver={(e) => {
// //           e.preventDefault();
// //           setIsDragging(true);
// //         }}
// //         onDragLeave={() => setIsDragging(false)}
// //         onDrop={(e) => {
// //           e.preventDefault();
// //           setIsDragging(false);
// //           handleFile(e.dataTransfer.files?.[0]);
// //         }}
// //         className={`w-full flex flex-col justify-center items-center gap-3 py-8 rounded-xl border-2 border-dashed transition-all duration-300 ${
// //           isDragging
// //             ? "border-input-700 bg-input-50"
// //             : "border-neutral-300 bg-white"
// //         }`}
// //       >
// //         <Upload size={36} className="text-neutral-500" />
// //         <p className="text-xs text-neutral-500">
// //           {resume
// //             ? "برای جایگزینی رزومه، فایل PDF جدید را اینجا رها کنید"
// //             : "فایل PDF رزومه را اینجا رها کنید"}
// //         </p>
// //         <button
// //           type="button"
// //           onClick={() => fileInputRef.current?.click()}
// //           className="px-4 py-2 text-xs font-bold border border-neutral-300 rounded-lg bg-neutral-50 cursor-pointer hover:bg-neutral-100 transition-all duration-300"
// //         >
// //           انتخاب فایل
// //         </button>
// //         <input
// //           ref={fileInputRef}
// //           type="file"
// //           accept="application/pdf"
// //           className="hidden"
// //           onChange={(e) => {
// //             handleFile(e.target.files?.[0]);
// //             e.target.value = "";
// //           }}
// //         />
// //         {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
// //       </div>

// //       <div className="w-full flex justify-start items-center gap-2 p-3 rounded-lg bg-amber-50 border-r-4 border-amber-500 text-amber-800 text-xs">
// //         <TriangleAlert size={14} />
// //         <span>
// //           فایل رزومه برای کارآموزان در زمان انتخاب سرپرست قابل مشاهده خواهد بود.
// //         </span>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ============================================================
// //    7) PersonalInfoForm
// //    ============================================================ */

// // interface PersonalInfoFormSubmitState {
// //   formValues: FormValues;
// //   userType: UserType;
// //   fields: Item[];
// //   qualifications: Item[];
// //   experienceYears: string;
// //   activeProjects: string;
// //   summary: string;
// //   salary: string;
// //   insurance: "social" | "none";
// //   weeklyHours: string;
// //   traineeCertificate: boolean;
// //   allocatedCapacity: string;
// //   minMonthlyHours: string;
// //   payloadTotalCapacity: number;
// //   resume: ResumeFile | null;
// //   resumeFile: File | null;
// // }

// // interface PersonalInfoFormProps {
// //   stepNumber?: string;
// //   userType: UserType;
// //   onUserTypeChange: (t: UserType) => void;
// //   backendData?: any | null;
// //   isTabLoading?: boolean;
// //   isSubmitting?: boolean;
// //   onSubmit?: (state: PersonalInfoFormSubmitState) => void;
// // }

// // function PersonalInfoForm({
// //   stepNumber = "۱",
// //   userType,
// //   onUserTypeChange,
// //   backendData,
// //   isTabLoading = false,
// //   isSubmitting = false,
// //   onSubmit,
// // }: PersonalInfoFormProps) {
// //   const yesterday = useMemo(() => getYesterday(), []);
// //   const isUser = userType === "User";

// //   const [fields, setFields] = useState<Item[]>([]);
// //   const [qualifications, setQualifications] = useState<Item[]>([]);
// //   const [experienceYears, setExperienceYears] = useState("");
// //   const [activeProjects, setActiveProjects] = useState("");
// //   const [summary, setSummary] = useState("");
// //   const [salary, setSalary] = useState("");
// //   const [insurance, setInsurance] = useState<"social" | "none">("none");
// //   const [weeklyHours, setWeeklyHours] = useState("");
// //   const [traineeCertificate, setTraineeCertificate] = useState(false);
// //   const [allocatedCapacity, setAllocatedCapacity] = useState("");
// //   const [minMonthlyHours, setMinMonthlyHours] = useState("");
// //   const [resume, setResume] = useState<ResumeFile | null>(null);
// //   const [resumeFile, setResumeFile] = useState<File | null>(null);
// //   const [experienceYearsError, setExperienceYearsError] = useState<
// //     string | undefined
// //   >(undefined);

// //   // با تغییر دیتای بک‌اند (یا تعویض تب) state های مستقل از Formik را همگام کن
// //   useEffect(() => {
// //     const license = realInfoToLicenseStatus(backendData);
// //     setFields(license.fields);
// //     setQualifications(license.qualifications);
// //     setExperienceYears(license.experienceYears);
// //     setActiveProjects(license.activeProjects);
// //     setSummary(license.summary);

// //     const reg = realInfoToRegistrationConditions(backendData);
// //     setSalary(reg.salary);
// //     setInsurance(reg.insurance);
// //     setWeeklyHours(reg.weeklyHours);
// //     setTraineeCertificate(reg.traineeCertificate);

// //     const commit = realInfoToCommitment(backendData);
// //     setAllocatedCapacity(commit.allocatedCapacity);
// //     setMinMonthlyHours(commit.minMonthlyHours);
// //   }, [backendData]);

// //   const dynamicInitial = useMemo<FormValues>(() => {
// //     if (!backendData) return { ...emptyForm };
// //     return isUser
// //       ? realInfoToFormValues(backendData)
// //       : legalInfoToFormValues(backendData);
// //   }, [backendData, isUser]);

// //   const commitment = useMemo(
// //     () =>
// //       realInfoToCommitment(
// //         backendData,
// //         TOTAL_CAPACITY_BY_USER_TYPE[userType]
// //       ),
// //     [backendData, userType]
// //   );

// //   return (
// //     <Formik
// //       enableReinitialize
// //       initialValues={dynamicInitial}
// //       validationSchema={isUser ? userSchema : legalSchema}
// //       onSubmit={(values) => {
// //         if (!experienceYears || Number(experienceYears) <= 0) {
// //           setExperienceYearsError("سابقه کار باید حداقل ۱ سال باشد");
// //           return;
// //         }
// //         setExperienceYearsError(undefined);

// //         onSubmit?.({
// //           formValues: values,
// //           userType,
// //           fields,
// //           qualifications,
// //           experienceYears,
// //           activeProjects,
// //           summary,
// //           salary,
// //           insurance,
// //           weeklyHours,
// //           traineeCertificate,
// //           allocatedCapacity,
// //           minMonthlyHours,
// //           payloadTotalCapacity: commitment.payloadTotalCapacity,
// //           resume,
// //           resumeFile,
// //         });
// //       }}
// //     >
// //       {({
// //         getFieldProps,
// //         errors,
// //         touched,
// //         values,
// //         setFieldValue,
// //         setFieldTouched,
// //         handleSubmit,
// //         submitCount,
// //       }) => {
// //         const f = (name: keyof FormValues) => ({
// //           name,
// //           field: getFieldProps(name),
// //           error: !!(touched[name] && errors[name]),
// //           errorMessage: errors[name] as string | undefined,
// //         });

// //         const errorList = Object.values(errors).filter(Boolean) as string[];

// //         return (
// //           <Form
// //             onSubmit={handleSubmit}
// //             onKeyDown={(e) => {
// //               if (
// //                 e.key === "Enter" &&
// //                 (e.target as HTMLElement).tagName === "INPUT"
// //               ) {
// //                 e.preventDefault();
// //               }
// //             }}
// //             className={cn(
// //               "w-full flex flex-col justify-center items-center gap-4",
// //               isTabLoading && "pointer-events-none opacity-60"
// //             )}
// //           >
// //             {isTabLoading && (
// //               <div
// //                 dir="rtl"
// //                 className="w-full rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800"
// //               >
// //                 در حال دریافت اطلاعات...
// //               </div>
// //             )}

// //             {/* Card 1: اطلاعات هویتی */}
// //             <div className="w-full rounded-2xl border-2 shadow-xs border-neutral-200 sm:p-6 bg-white px-8 py-7">
// //               <div className="w-full flex justify-between items-center">
// //                 <div className="flex items-center gap-2">
// //                   <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef0f8] text-xs text-blue-800">
// //                     {stepNumber}
// //                   </span>
// //                   <span className="text-s font-semibold text-neutral-900">
// //                     نوع شخص و اطلاعات هویتی
// //                   </span>
// //                 </div>
// //                 <div className="text-xs bg-neutral-100 text-neutral-500 border border-neutral-300 p-1 px-3 rounded-xl">
// //                   <span>الزامی</span>
// //                 </div>
// //               </div>

// //               <div className="mt-8">
// //                 <div className="w-full flex justify-start items-start flex-col gap-3 text-sm">
// //                   <p className="text-3xs text-black font-bold">نوع شخص</p>
// //                   <div className="w-full flex justify-center items-center gap-3">
// //                     {usersType.map((item) => (
// //                       <button
// //                         key={item.id}
// //                         type="button"
// //                         onClick={() => onUserTypeChange(item.type)}
// //                         className={cn(
// //                           "w-1/2 h-11 flex justify-center items-center text-center border rounded-lg text-xs cursor-pointer p-2 transition-all duration-300",
// //                           userType === item.type
// //                             ? "border-blue-700 bg-blue-700 text-white"
// //                             : "border-neutral-300 hover:bg-blue-300 hover:text-white"
// //                         )}
// //                       >
// //                         <p>{item.title}</p>
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 <div className="mt-4 flex flex-col gap-5">
// //                   <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4">
// //                     <div className="w-full md:w-2/3">
// //                       {isUser ? (
// //                         <Input
// //                           key="FullName"
// //                           label="نام و نام خانوادگی"
// //                           variant="default"
// //                           labelClassName="mb-2 text-xs"
// //                           placeholder="مثال: علی رضایی"
// //                           inputSize="sm"
// //                           {...f("FullName")}
// //                         />
// //                       ) : (
// //                         <Input
// //                           key="CompanyName"
// //                           label="نام شرکت / موسسه"
// //                           variant="default"
// //                           labelClassName="mb-2 text-xs"
// //                           placeholder="مثال: شرکت مهندسین مشاور"
// //                           inputSize="sm"
// //                           {...f("CompanyName")}
// //                         />
// //                       )}
// //                     </div>
// //                     <div className="w-full md:w-1/3">
// //                       <Input
// //                         label="شماره پروانه اشتغال"
// //                         variant="default"
// //                         labelClassName="mb-2 text-xs"
// //                         placeholder="012345-6"
// //                         inputSize="sm"
// //                         {...f("LicenseNumber")}
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3">
// //                     <div className="w-full md:w-1/3">
// //                       <Input
// //                         label={isUser ? "کدملی" : "شناسه ملی"}
// //                         variant="default"
// //                         labelClassName="mb-2 text-xs"
// //                         placeholder={isUser ? "0123456789" : "01234567890"}
// //                         inputSize="sm"
// //                         inputMode="numeric"
// //                         {...f("NationalCode")}
// //                       />
// //                     </div>
// //                     <div className="w-full md:w-1/3">
// //                       <JalaliDatePicker
// //                         label={isUser ? "تاریخ تولد" : "تاریخ تأسیس"}
// //                         variant="default"
// //                         labelClassName="mb-2 text-xs"
// //                         placeholder="۱۳۷۰/۰۱/۰۱"
// //                         inputSize="sm"
// //                         name="Birthday"
// //                         value={values.Birthday ?? ""}
// //                         maxDate={yesterday}
// //                         error={!!(touched.Birthday && errors.Birthday)}
// //                         errorMessage={
// //                           touched.Birthday ? errors.Birthday : undefined
// //                         }
// //                         onChange={(iso: string) => {
// //                           setFieldTouched("Birthday", true, false);
// //                           setFieldValue("Birthday", iso, true);
// //                         }}
// //                         onBlur={() => setFieldTouched("Birthday", true, false)}
// //                       />
// //                     </div>
// //                     <div className="w-full md:w-1/3">
// //                       <Input
// //                         label={isUser ? "محل تولد" : "محل شرکت"}
// //                         variant="default"
// //                         labelClassName="mb-2 text-xs"
// //                         placeholder="تهران"
// //                         inputSize="sm"
// //                         {...f("Birthplace")}
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3">
// //                     <div className="w-full md:w-1/3">
// //                       <Input
// //                         label="شماره تماس"
// //                         variant="default"
// //                         labelClassName="mb-2 text-xs"
// //                         placeholder="09123456789"
// //                         inputSize="sm"
// //                         inputMode="numeric"
// //                         {...f("PhoneNumber")}
// //                       />
// //                     </div>
// //                     <div className="w-full md:w-1/3">
// //                       <Input
// //                         label="شماره عضویت نظام مهندسی"
// //                         variant="default"
// //                         labelClassName="mb-2 text-xs"
// //                         placeholder="98765"
// //                         inputSize="sm"
// //                         inputMode="numeric"
// //                         {...f("NezamRegisterCode")}
// //                       />
// //                     </div>
// //                     <div className="w-full md:w-1/3 flex gap-3">
// //                       <div className="w-1/2">
// //                         <Input
// //                           label="پایه پروانه"
// //                           variant="default"
// //                           labelClassName="mb-2 text-xs"
// //                           placeholder="۲"
// //                           inputSize="sm"
// //                           inputMode="numeric"
// //                           {...f("LicenseBase")}
// //                         />
// //                       </div>
// //                       <div className="w-1/2">
// //                         <Input
// //                           label="سال صدور پروانه"
// //                           variant="default"
// //                           labelClassName="mb-2 text-xs"
// //                           placeholder="۱۴۰۰"
// //                           inputSize="sm"
// //                           inputMode="numeric"
// //                           {...f("LicenseYear")}
// //                         />
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="w-full">
// //                     <Input
// //                       label="آدرس"
// //                       variant="default"
// //                       labelClassName="mb-2 text-xs"
// //                       placeholder="تهران، خیابان ..."
// //                       inputSize="sm"
// //                       {...f("Address")}
// //                     />
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             <LicenseStatus
// //               fields={fields}
// //               setFields={setFields}
// //               qualifications={qualifications}
// //               setQualifications={setQualifications}
// //               experienceYears={experienceYears}
// //               setExperienceYears={(v) => {
// //                 setExperienceYears(v);
// //                 if (Number(v) > 0) setExperienceYearsError(undefined);
// //               }}
// //               activeProjects={activeProjects}
// //               setActiveProjects={setActiveProjects}
// //               summary={summary}
// //               setSummary={setSummary}
// //               experienceYearsError={experienceYearsError}
// //             />

// //             <RegistrationConditions
// //               salary={salary}
// //               setSalary={setSalary}
// //               insurance={insurance}
// //               setInsurance={setInsurance}
// //               weeklyHours={weeklyHours}
// //               setWeeklyHours={setWeeklyHours}
// //               traineeCertificate={traineeCertificate}
// //               setTraineeCertificate={setTraineeCertificate}
// //             />

// //             {submitCount > 0 && errorList.length > 0 && (
// //               <div
// //                 dir="rtl"
// //                 className="w-full rounded-xl border border-red-300 bg-red-50 p-4 text-xs text-red-800"
// //               >
// //                 <p className="mb-2 font-bold">لطفاً موارد زیر را اصلاح کنید:</p>
// //                 <ul className="list-disc pr-5 space-y-1">
// //                   {errorList.map((msg, i) => (
// //                     <li key={i}>{msg}</li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             )}

// //             <CommitmentAgreement
// //               supervisorName={values.FullName || values.CompanyName}
// //               licenseNumber={values.LicenseNumber}
// //               displayTotalCapacity={commitment.displayTotalCapacity}
// //               allocatedCapacity={allocatedCapacity}
// //               setAllocatedCapacity={setAllocatedCapacity}
// //               minMonthlyHours={minMonthlyHours}
// //               setMinMonthlyHours={setMinMonthlyHours}
// //               isSubmitting={isSubmitting}
// //               onSubmit={handleSubmit}
// //             />

// //             {/* <ResumeUploader
// //               initialResume={resume}
// //               onChange={(r, file) => {
// //                 setResume(r);
// //                 setResumeFile(file ?? null);
// //               }}
// //             /> */}
// //           </Form>
// //         );
// //       }}
// //     </Formik>
// //   );
// // }

// // /* ============================================================
// //    8) LegalNotFound — حالت «اطلاعات حقوقی ثبت نشده»
// //    ============================================================ */

// // function LegalNotFound({ onBackToReal }: { onBackToReal: () => void }) {
// //   return (
// //     <div
// //       dir="rtl"
// //       className="w-full rounded-2xl border-2 border-neutral-200 bg-white px-6 py-14 shadow-xs sm:px-10"
// //     >
// //       <div className="mx-auto flex max-w-md flex-col items-center text-center">
// //         <div className="relative mb-6">
// //           <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#eef0f8]">
// //             <Building2 className="size-11 text-blue-800" strokeWidth={1.5} />
// //           </div>
// //           <span className="absolute -bottom-1 -left-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-amber-100 text-amber-700">
// //             <TriangleAlert size={16} />
// //           </span>
// //         </div>

// //         <h2 className="text-sm font-bold text-neutral-900">
// //           اطلاعات شخص حقوقی یافت نشد
// //         </h2>

// //         <p className="mt-3 text-xs leading-7 text-neutral-600">
// //           برای حساب کاربری شما هنوز هیچ ثبت‌نام سرپرستی به‌عنوان شخص حقوقی
// //           (شرکت / موسسه) انجام نشده است. می‌توانید به فرم شخص حقیقی بازگردید و
// //           اطلاعات خود را تکمیل کنید.
// //         </p>

// //         <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">
// //           <Button
// //             type="button"
// //             variant="solid"
// //             color="input"
// //             size="xs"
// //             rounded="lg"
// //             className="text-sm"
// //             onClick={onBackToReal}
// //           >
// //             <span className="flex items-center justify-center gap-2">
// //               <UserRound size={16} />
// //               بازگشت به شخص حقیقی
// //             </span>
// //           </Button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ============================================================
// //    9) SupervisorPage
// //    ============================================================ */

// // const isNotFound = (err: any) => err?.response?.status === 404;

// // export default function SupervisorPage() {
// //   const [userType, setUserType] = useState<UserType>("User");
// //   const [clientError, setClientError] = useState<string | null>(null);

// //   // حقیقی: همیشه فعال
// //   const realQuery = useGetRealInfo();

// //   // حقوقی: فقط وقتی روی تب «شخص حقوقی» کلیک شد درخواست می‌رود
// //   const legalQuery = useGetLegalInfo({ enabled: userType === "legal" });

// //   const { mutate: register, isPending } = useRegisterSupervisorReal();

// //   const isLegalTab = userType === "legal";
// //   const activeQuery = isLegalTab ? legalQuery : realQuery;

// //   // ۴۰۴ یعنی کاربر جدید → backendData = null
// //   const backendData = activeQuery.data?.data ?? null;

// //   const activeError = activeQuery.error;
// //   const hasRealError = !!activeError && !isNotFound(activeError);


// //   // کاربر روی تب حقوقی زده ولی اطلاعات حقوقی ندارد (۴۰۴)
// //   const legalNotFound =
// //     isLegalTab && legalQuery.isError && isNotFound(legalQuery.error);

// //   const handleUserTypeChange = (next: UserType) => {
// //     setClientError(null);
// //     setUserType(next);
// //   };

// //   const handleSubmit = (state: PersonalInfoFormSubmitState) => {
// //     setClientError(null);

// //     // TODO: وقتی mutation و payload حقوقی آماده شد اینجا جایگزین شود
// //     if (state.userType === "legal") {
// //       setClientError("ثبت‌نام شخص حقوقی هنوز فعال نشده است.");
// //       return;
// //     }

// //     const payload: any = buildSupervisorRealPayload({
// //       formValues: state.formValues,
// //       fields: state.fields,
// //       qualifications: state.qualifications,
// //       experienceYears: state.experienceYears,
// //       activeProjects: state.activeProjects,
// //       summary: state.summary,
// //       salary: state.salary,
// //       insurance: state.insurance,
// //       weeklyHours: state.weeklyHours,
// //       payloadTotalCapacity: state.payloadTotalCapacity,
// //       allocatedCapacity: state.allocatedCapacity,
// //       minMonthlyHours: state.minMonthlyHours,
// //       traineeCertificate: state.traineeCertificate,
// //       backend: backendData,
// //     });

// //     const validationError = validateBeforeSubmit(payload);
// //     if (validationError) {
// //       setClientError(validationError);
// //       return;
// //     }

// //     register(payload, {
// //       onSuccess: () => {
// //         realQuery.refetch?.();
// //       },
// //       onError: (err: any) => {
// //         const msg =
// //           err?.response?.data?.message ||
// //           "خطا در ثبت اطلاعات سرپرست. لطفاً دوباره تلاش کنید.";
// //         setClientError(msg);
// //       },
// //     });
// //   };

// //   // فقط لود اولیه صفحه، کل صفحه را با Loading عوض می‌کند
// //   if (realQuery.isLoading) return <Loading />;

// //   // if (hasRealError) {
// //   //   return <div>خطا در دریافت اطلاعات سرپرست</div>;
// //   // }

// //   return (
// //     <div className="w-full px-4 md:px-7 py-6">
// //       <div className="mx-auto flex w-full flex-col gap-5">
// //         {clientError && (
// //           <div
// //             dir="rtl"
// //             className="w-full rounded-xl border border-red-300 bg-red-50 p-4 text-xs text-red-800"
// //           >
// //             <p className="font-bold mb-1">خطا در ثبت اطلاعات:</p>
// //             <p>{clientError}</p>
// //           </div>
// //         )}

// //         {legalNotFound ? (
// //           <LegalNotFound onBackToReal={() => handleUserTypeChange("User")} />
// //         ) : (
// //           <PersonalInfoForm
// //             userType={userType}
// //             onUserTypeChange={handleUserTypeChange}
// //             backendData={backendData}
// //             isTabLoading={isLegalTab && legalQuery.isLoading}
// //             isSubmitting={isPending}
// //             onSubmit={handleSubmit}
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import { Form, Formik } from "formik";
// import * as Yup from "yup";
// import {
//   Settings,
//   Trash2,
//   Upload,
//   FileText,
//   Eye,
//   TriangleAlert,
//   ArrowUpToLine,
//   Building2,
//   UserRound,
// } from "lucide-react";

// import Loading from "@/app/components/Loading";
// import { Input, TextArea } from "@/app/components/ui/input";
// import { Button } from "@/app/components/ui/Button";
// import SwitchButton from "@/app/components/ui/Button/switchButton";
// import { Select } from "@/app/components/ui/input/SelectSilde";
// import { cn } from "@/lib/cn";
// import JalaliDatePicker from "@/lib/jalaliDatePicker";
// import { getYesterday, isValidISODate, toISODate } from "@/lib/date-utils";
// import { toGregorian, toJalaali } from "jalaali-js";
// import {
//   useRegisterSupervisorLegal,
//   useRegisterSupervisorReal,
// } from "@/core/services/supervisor/mutation";
// import {
//   useGetLegalInfo,
//   useGetRealInfo,
// } from "@/core/services/supervisor/queris";

// /* ============================================================
//    0) Types & Config
//    ============================================================ */

// export type UserType = "User" | "legal";

// const TOTAL_CAPACITY_BY_USER_TYPE: Record<UserType, number> = {
//   User: 3,
//   legal: 5,
// };

// /** حداقل مجاز برای سقف پذیرش من (بک‌اند: باید > 1 باشد) */
// const MIN_ALLOCATED_CAPACITY = 2;

// interface Item {
//   value: string;
//   active: boolean;
// }

// interface ResumeFile {
//   name: string;
//   size: number;
//   uploadedAt: string;
//   url?: string;
// }

// interface FormValues {
//   FullName: string;
//   CompanyName: string;
//   LicenseNumber: string;
//   NationalCode: string;
//   Birthday: string;
//   Birthplace: string;
//   PhoneNumber: string;
//   Address: string;
//   NezamRegisterCode: string;
//   LicenseBase: string;
//   LicenseYear: string;
// }

// const emptyForm: FormValues = {
//   FullName: "",
//   CompanyName: "",
//   LicenseNumber: "",
//   NationalCode: "",
//   Birthday: "",
//   Birthplace: "",
//   PhoneNumber: "",
//   Address: "",
//   NezamRegisterCode: "",
//   LicenseBase: "",
//   LicenseYear: "",
// };

// const usersType: { id: number; title: string; type: UserType }[] = [
//   { id: 1, title: "شخص حقیقی", type: "User" },
//   { id: 2, title: "شخص حقوقی", type: "legal" },
// ];

// /* ============================================================
//    1) Enum نگاشت‌ها (مطابق بک‌اند)
//    ============================================================ */

// const fieldOptions: { label: string; value: string }[] = [
//   { label: "مهندسی مکانیک", value: "1" },
//   { label: "مهندسی برق", value: "2" },
//   { label: "مهندسی معماری", value: "4" },
//   { label: "مهندسی عمران", value: "5" },
//   { label: "شهرسازی", value: "6" },
//   { label: "نقشه‌برداری", value: "7" },
//   { label: "ترافیک", value: "8" },
//   { label: "جوش", value: "9" },
//   { label: "خاک و پی", value: "10" },
// ];

// const qualificationOptions: { label: string; value: string }[] = [
//   { label: "نظارت", value: "1" },
//   { label: "طراحی", value: "2" },
//   { label: "مجری", value: "3" },
//   { label: "آزمایشگاه", value: "4" },
// ];

// const insuranceOptions = [
//   { value: "social", label: "بیمه تأمین اجتماعی" },
//   { value: "none", label: "بدون بیمه" },
// ];

// /* ============================================================
//    2) Helpers — Date / Digits
//    ============================================================ */

// const persianToISO = (val: string | null | undefined): string => {
//   if (!val) return "";
//   const m = String(val).match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
//   if (!m) return "";
//   const [, y, mo, d] = m;
//   const year = Number(y);
//   if (year > 1900) {
//     return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
//   }
//   const g = toGregorian(year, Number(mo), Number(d));
//   return `${g.gy}-${String(g.gm).padStart(2, "0")}-${String(g.gd).padStart(2, "0")}`;
// };

// const isoToPersian = (iso: string | null | undefined): string => {
//   if (!iso) return "";
//   const m = String(iso).match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
//   if (!m) return "";
//   const [, y, mo, d] = m;
//   const gy = Number(y);
//   if (gy < 1900) return iso;
//   const j = toJalaali(gy, Number(mo), Number(d));
//   return `${j.jy}/${String(j.jm).padStart(2, "0")}/${String(j.jd).padStart(2, "0")}`;
// };

// const toEnglishDigits = (value: string) =>
//   value
//     .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
//     .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

// const onlyDigits = (value: string) => toEnglishDigits(value).replace(/\D/g, "");

// /* ============================================================
//    3) Validation schema
//    ============================================================ */

// const pastDate = (label: string) =>
//   Yup.string()
//     .trim()
//     .required(`${label} الزامی است`)
//     .test("is-past-date", `${label} باید قبل از امروز باشد`, (value) => {
//       if (!value) return true;
//       return isValidISODate(value) && value < toISODate(new Date());
//     });

// const commonShape = {
//   LicenseNumber: Yup.string().trim().required("شماره پروانه اشتغال الزامی است"),
//   NationalCode: Yup.string()
//     .trim()
//     .required("کد ملی الزامی است")
//     .matches(/^[0-9۰-۹]{10}$/, "کد ملی باید ۱۰ رقم باشد"),
//   Birthday: pastDate("تاریخ تولد"),
//   Birthplace: Yup.string().trim().required("محل تولد الزامی است"),
//   PhoneNumber: Yup.string()
//     .trim()
//     .required("شماره تماس الزامی است"),
//   Address: Yup.string().trim().required("آدرس الزامی است"),
//   NezamRegisterCode: Yup.string()
//     .trim()
//     .required("شماره عضویت نظام مهندسی الزامی است"),
//   LicenseBase: Yup.string()
//     .trim()
//     .required("پایه پروانه الزامی است")
//     .test("valid-base", "پایه پروانه معتبر نیست", (v) => {
//       const n = Number(v);
//       return !Number.isNaN(n) && n >= 0 && n <= 4;
//     }),
//   LicenseYear: Yup.string()
//     .trim()
//     .required("سال صدور پروانه الزامی است")
//     .matches(/^[0-9۰-۹]{4}$/, "سال باید ۴ رقم باشد"),
// };

// const userSchema = Yup.object({
//   ...commonShape,
//   FullName: Yup.string()
//     .trim()
//     .required("نام و نام خانوادگی الزامی است")
//     .test(
//       "full-name",
//       "نام و نام خانوادگی را کامل وارد کنید",
//       (v) => (v ?? "").trim().split(/\s+/).filter(Boolean).length >= 2
//     ),
// });

// const legalSchema = Yup.object({
//   ...commonShape,
//   CompanyName: Yup.string().trim().required("نام شرکت / موسسه الزامی است"),
//   NationalCode: Yup.string()
//     .trim()
//     .required("شناسه ملی الزامی است")
//     .matches(/^[0-9۰-۹]{11}$/, "شناسه ملی باید ۱۱ رقم باشد"),
//   Birthday: pastDate("تاریخ تأسیس"),
//   Birthplace: Yup.string().trim().required("محل شرکت الزامی است"),
// });

// /* ============================================================
//    4) Pre-fill نگاشت از backendData
//    ============================================================ */

// function realInfoToFormValues(data: any): FormValues {
//   const firstName = data?.firstName ?? "";
//   const lastName = data?.lastName ?? "";
//   return {
//     FullName: `${firstName} ${lastName}`.trim(),
//     CompanyName: "",
//     LicenseNumber: data?.licenseNumber ?? "",
//     NationalCode: data?.nationalCode ?? "",
//     Birthday: persianToISO(data?.birthDate),
//     Birthplace: data?.birthPlace ?? "",
//     PhoneNumber: data?.phoneNumber ?? "",
//     Address: data?.address ?? "",
//     NezamRegisterCode: data?.nezamRegisterCode ?? "",
//     LicenseBase: data?.licenseBase != null ? String(data.licenseBase) : "",
//     LicenseYear: data?.licenseYear ? String(data.licenseYear) : "",
//   };
// }

// /** نگاشت LegalSupervisorDto → فرم (مطابق DTO بک‌اند) */
// function legalInfoToFormValues(data: any): FormValues {
//   return {
//     ...emptyForm,
//     CompanyName: data?.name ?? "",
//     LicenseNumber: data?.licenseNumber ?? "",
//     NationalCode: data?.nationalId ?? "",
//     Birthday: persianToISO(data?.registerDate),
//     Birthplace: data?.registerPlace ?? "",
//     PhoneNumber: data?.phoneNumber ?? "",
//     Address: data?.address ?? "",
//     NezamRegisterCode: data?.nezamRegisterCode ?? "",
//     LicenseBase: data?.licenseBase != null ? String(data.licenseBase) : "",
//     LicenseYear: data?.licenseYear ? String(data.licenseYear) : "",
//   };
// }

// function realInfoToLicenseStatus(data: any) {
//   // حقوقی: fieldList (آرایه) — حقیقی: field (تکی)
//   const field = Array.isArray(data?.fieldList)
//     ? data.fieldList
//         .filter((x: number) => x > 0)
//         .map((x: number) => ({ value: String(x), active: true }))
//     : data?.field != null && data.field > 0
//       ? [{ value: String(data.field), active: true }]
//       : [];
//   const quals = Array.isArray(data?.competenceList)
//     ? data.competenceList
//         .filter((c: number) => c > 0)
//         .map((c: number) => ({ value: String(c), active: true }))
//     : [];
//   return {
//     fields: field as Item[],
//     qualifications: quals as Item[],
//     experienceYears:
//       data?.workExperience != null && data.workExperience > 0
//         ? String(data.workExperience)
//         : "",
//     activeProjects:
//       data?.activeProjectCount != null && data.activeProjectCount > 0
//         ? String(data.activeProjectCount)
//         : "",
//     summary: data?.experienceSummery ?? "",
//   };
// }

// function realInfoToRegistrationConditions(data: any) {
//   return {
//     salary:
//       data?.traineSalary != null && data.traineSalary > 0
//         ? String(data.traineSalary)
//         : "",
//     insurance: (data?.traineInsurnce ? "social" : "none") as "social" | "none",
//     weeklyHours:
//       data?.traineHoursByWeek != null && data.traineHoursByWeek > 0
//         ? String(data.traineHoursByWeek)
//         : "",
//     traineeCertificate: !!data?.traineCertificate,
//   };
// }

// function realInfoToCommitment(data: any, fallbackTotal = 0) {
//   const backendAcceptance = Number(data?.acceptanceCapacity ?? 0);
//   const displayTotalCapacity =
//     backendAcceptance > 1 ? backendAcceptance : Math.max(fallbackTotal, 3);

//   return {
//     allocatedCapacity:
//       data?.assignedCapacity != null && data.assignedCapacity > 0
//         ? String(data.assignedCapacity)
//         : "",
//     minMonthlyHours:
//       data?.minHoursByMonth != null && data.minHoursByMonth > 0
//         ? String(data.minHoursByMonth)
//         : "",
//     displayTotalCapacity,
//     payloadTotalCapacity: displayTotalCapacity,
//   };
// }

// /* ============================================================
//    5) buildPayload & validateBeforeSubmit
//    ============================================================ */

// interface BuildPayloadParams {
//   formValues: FormValues;
//   fields: Item[];
//   qualifications: Item[];
//   experienceYears: string;
//   activeProjects: string;
//   summary: string;
//   salary: string;
//   insurance: "social" | "none";
//   weeklyHours: string;
//   payloadTotalCapacity: number;
//   allocatedCapacity: string;
//   minMonthlyHours: string;
//   traineeCertificate: boolean;
//   backend: any | null;
// }

// function buildSupervisorRealPayload(params: BuildPayloadParams) {
//   const { formValues, fields, qualifications, backend } = params;

//   const fullName = (formValues.FullName ?? "").trim();
//   const [firstName, ...rest] = fullName.split(/\s+/);
//   const lastName = rest.join(" ");

//   const activeFields = fields.filter((f) => f.active);
//   const activeQuals = qualifications.filter((q) => q.active);

//   return {
//     fldMemberId: backend?.fldMemberId ?? 0,
//     memberId: backend?.memberId ?? "00000000-0000-0000-0000-000000000000",
//     id: backend?.id ?? 0,
//     firstName: firstName || "",
//     lastName: lastName || "",
//     nationalCode: formValues.NationalCode ?? "",
//     licenseNumber: formValues.LicenseNumber ?? "",
//     phoneNumber: formValues.PhoneNumber ?? "",
//     birthDate: isoToPersian(formValues.Birthday),
//     birthPlace: formValues.Birthplace ?? "",
//     nezamRegisterCode: formValues.NezamRegisterCode ?? "",
//     address: formValues.Address ?? "",
//     competenceList: activeQuals
//       .map((q) => Number(q.value))
//       .filter((n) => !Number.isNaN(n) && n > 0),
//     field: activeFields[0] ? Number(activeFields[0].value) : 0,
//     licenseBase: Number(formValues.LicenseBase) || 0,
//     workExperience: Number(params.experienceYears) || 0,
//     activeProjectCount: Number(params.activeProjects) || 0,
//     licenseYear: Number(formValues.LicenseYear) || 0,
//     experienceSummery: params.summary || "",
//     traineSalary: Number(params.salary) || 0,
//     traineInsurnce: params.insurance === "social",
//     traineHoursByWeek: Number(params.weeklyHours) || 0,
//     traineCertificate: params.traineeCertificate,
//     acceptanceCapacity: params.payloadTotalCapacity,
//     assignedCapacity: Number(params.allocatedCapacity) || 0,
//     minHoursByMonth: Number(params.minMonthlyHours) || 0,
//     userId: backend?.userId ?? "00000000-0000-0000-0000-000000000000",
//   };
// }

// function validateBeforeSubmit(
//   payload: ReturnType<typeof buildSupervisorRealPayload>
// ): string | null {
//   if (!payload.firstName) return "نام الزامی است";
//   if (!payload.lastName) return "نام خانوادگی الزامی است";
//   if (!payload.nationalCode) return "کد ملی الزامی است";
//   if (!payload.licenseNumber) return "شماره پروانه الزامی است";
//   if (payload.workExperience <= 0) return "سابقه کار باید بزرگتر از ۰ باشد";
//   if (payload.field <= 0) return "رشته فعالیت الزامی است";
//   if (payload.licenseBase <= 0) return "پایه پروانه الزامی است";
//   if (payload.licenseYear <= 0) return "سال صدور پروانه الزامی است";
//   if (payload.competenceList.length === 0)
//     return "حداقل یک صلاحیت انتخاب کنید";
//   if (payload.traineSalary <= 0) return "حقوق ماهانه الزامی است";
//   if (payload.traineHoursByWeek <= 0) return "ساعات حضور هفتگی الزامی است";
//   if (payload.acceptanceCapacity <= 0) return "ظرفیت پذیرش الزامی است";
//   if (payload.assignedCapacity <= 1)
//     return "سقف پذیرش من باید حداقل ۲ باشد";
//   if (payload.minHoursByMonth <= 0) return "حداقل ساعت ماهانه الزامی است";
//   return null;
// }

// /** payload حقوقی — مطابق POST /api/Supervisor/LegalRegistration */
// function buildSupervisorLegalPayload(params: BuildPayloadParams) {
//   const { formValues, fields, qualifications, backend } = params;

//   const activeFields = fields.filter((f) => f.active);
//   const activeQuals = qualifications.filter((q) => q.active);

//   return {
//     fldMemberId: backend?.fldMemberId ?? 0,
//     memberId: backend?.memberId ?? "00000000-0000-0000-0000-000000000000",
//     id: backend?.id ?? 0,
//     name: (formValues.CompanyName ?? "").trim(),
//     licenseNumber: formValues.LicenseNumber ?? "",
//     nationalId: toEnglishDigits(formValues.NationalCode ?? ""),
//     registerDate: isoToPersian(formValues.Birthday),
//     registerPlace: formValues.Birthplace ?? "",
//     phoneNumber: toEnglishDigits(formValues.PhoneNumber ?? ""),
//     nezamRegisterCode: formValues.NezamRegisterCode ?? "",
//     address: formValues.Address ?? "",
//     fieldList: activeFields
//       .map((f) => Number(f.value))
//       .filter((n) => !Number.isNaN(n) && n > 0),
//     competenceList: activeQuals
//       .map((q) => Number(q.value))
//       .filter((n) => !Number.isNaN(n) && n > 0),
//     licenseBase: Number(formValues.LicenseBase) || 0,
//     workExperience: Number(params.experienceYears) || 0,
//     activeProjectCount: Number(params.activeProjects) || 0,
//     licenseYear: Number(formValues.LicenseYear) || 0,
//     experienceSummery: params.summary || "",
//     traineSalary: Number(params.salary) || 0,
//     traineInsurnce: params.insurance === "social",
//     traineHoursByWeek: Number(params.weeklyHours) || 0,
//     traineCertificate: params.traineeCertificate,
//     acceptanceCapacity: params.payloadTotalCapacity,
//     assignedCapacity: Number(params.allocatedCapacity) || 0,
//     minHoursByMonth: Number(params.minMonthlyHours) || 0,
//     userId: backend?.userId ?? "00000000-0000-0000-0000-000000000000",
//   };
// }

// function validateLegalBeforeSubmit(
//   payload: ReturnType<typeof buildSupervisorLegalPayload>
// ): string | null {
//   if (!payload.name) return "نام شرکت / موسسه الزامی است";
//   if (!payload.nationalId) return "شناسه ملی الزامی است";
//   if (!payload.licenseNumber) return "شماره پروانه الزامی است";
//   if (!payload.registerDate) return "تاریخ ثبت الزامی است";
//   if (!payload.registerPlace) return "محل ثبت الزامی است";
//   if (payload.workExperience <= 0) return "سابقه کار باید بزرگتر از ۰ باشد";
//   if (payload.fieldList.length === 0) return "حداقل یک رشته فعالیت انتخاب کنید";
//   if (payload.licenseBase <= 0) return "پایه پروانه الزامی است";
//   if (payload.licenseYear <= 0) return "سال صدور پروانه الزامی است";
//   if (payload.competenceList.length === 0)
//     return "حداقل یک صلاحیت انتخاب کنید";
//   if (payload.traineSalary <= 0) return "حقوق ماهانه الزامی است";
//   if (payload.traineHoursByWeek <= 0) return "ساعات حضور هفتگی الزامی است";
//   if (payload.acceptanceCapacity <= 0) return "ظرفیت پذیرش الزامی است";
//   if (payload.assignedCapacity <= 1)
//     return "سقف پذیرش من باید حداقل ۲ باشد";
//   if (payload.minHoursByMonth <= 0) return "حداقل ساعت ماهانه الزامی است";
//   return null;
// }

// /* ============================================================
//    6) UI Sub-Components
//    ============================================================ */

// const labelClassName = "text-2xs font-semibold text-neutral-900";

// function ChipGroup({
//   label,
//   options,
//   items,
//   onChange,
//   multiple,
// }: {
//   label: string;
//   options: { label: string; value: string }[];
//   items: Item[];
//   onChange: (items: Item[]) => void;
//   multiple: boolean;
// }) {
//   const isSelected = (value: string) => items.some((i) => i.value === value);

//   const handleClick = (value: string) => {
//     if (isSelected(value)) {
//       onChange(items.filter((i) => i.value !== value));
//     } else if (multiple) {
//       onChange([...items, { value, active: true }]);
//     } else {
//       onChange([{ value, active: true }]);
//     }
//   };

//   return (
//     <div className="w-full">
//       <span className={cn(labelClassName, "mb-3 block")}>{label}</span>
//       <div className="flex flex-wrap gap-2">
//         {options.map((option) => {
//           const selected = isSelected(option.value);
//           return (
//             <button
//               key={option.value}
//               type="button"
//               aria-pressed={selected}
//               onClick={() => handleClick(option.value)}
//               className={cn(
//                 "h-9 rounded-lg border px-4 text-2xs transition-colors",
//                 selected
//                   ? "border-input-800 bg-input-800 font-semibold text-white"
//                   : "border-neutral-200 bg-neutral-50 text-neutral-900 hover:bg-neutral-100"
//               )}
//             >
//               {option.label}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function ActivationRow({
//   title,
//   active,
//   onToggle,
// }: {
//   title: string;
//   active: boolean;
//   onToggle: (next: boolean) => void;
// }) {
//   return (
//     <div className="flex items-center justify-between py-3">
//       <div className="flex items-center gap-3">
//         <span className="text-2xs font-semibold text-neutral-900">{title}</span>
//         <span
//           className={cn(
//             "flex h-5 items-center rounded-full border px-2 text-3xs",
//             active
//               ? "border-emerald-300 bg-emerald-100 text-emerald-800"
//               : "border-neutral-300 bg-neutral-100 text-neutral-600"
//           )}
//         >
//           {active ? "فعال" : "غیرفعال"}
//         </span>
//       </div>
//       <SwitchButton checked={active} onChange={onToggle} size="lg" />
//     </div>
//   );
// }

// function LicenseStatus({
//   stepNumber = "۲",
//   fields,
//   setFields,
//   qualifications,
//   setQualifications,
//   experienceYears,
//   setExperienceYears,
//   activeProjects,
//   setActiveProjects,
//   summary,
//   setSummary,
//   experienceYearsError,
//   multipleFields = false,
// }: {
//   multipleFields?: boolean;
//   stepNumber?: string;
//   fields: Item[];
//   setFields: (v: Item[]) => void;
//   qualifications: Item[];
//   setQualifications: (v: Item[]) => void;
//   experienceYears: string;
//   setExperienceYears: (v: string) => void;
//   activeProjects: string;
//   setActiveProjects: (v: string) => void;
//   summary: string;
//   setSummary: (v: string) => void;
//   experienceYearsError?: string;
// }) {
//   const labelOf = (options: { label: string; value: string }[], v: string) =>
//     options.find((o) => o.value === v)?.label ?? v;

//   const setActive = (
//     items: Item[],
//     setItems: (items: Item[]) => void,
//     value: string,
//     active: boolean
//   ) => setItems(items.map((i) => (i.value === value ? { ...i, active } : i)));

//   const hasSelection = fields.length > 0 || qualifications.length > 0;

//   return (
//     <div
//       dir="rtl"
//       className="w-full rounded-2xl border-2 border-neutral-200 bg-white p-5 shadow-xs sm:p-7"
//     >
//       <div className="mb-8 flex items-center gap-2">
//         <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef0f8] text-xs text-blue-800">
//           {stepNumber}
//         </span>
//         <h3 className="text-s font-semibold text-neutral-900">
//           رشته فعالیت، صلاحیت و سوابق
//         </h3>
//       </div>

//       <div className="flex flex-col gap-5">
//         <ChipGroup
//           label={
//             multipleFields ? "رشته‌های فعالیت (چند انتخابی)" : "رشتهٔ فعالیت"
//           }
//           options={fieldOptions}
//           items={fields}
//           onChange={setFields}
//           multiple={multipleFields}
//         />

//         <ChipGroup
//           label="صلاحیت‌ها (چند انتخابی)"
//           options={qualificationOptions}
//           items={qualifications}
//           onChange={setQualifications}
//           multiple
//         />

//         {hasSelection && (
//           <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-4">
//             <div className="flex items-center gap-2">
//               <Settings className="size-4 text-neutral-800" strokeWidth={1.75} />
//               <h4 className="text-2xs font-semibold text-neutral-900">
//                 مدیریت فعال‌سازی رشته‌ها و صلاحیت‌ها
//               </h4>
//             </div>
//             <p className="mt-2 text-3xs text-neutral-600">
//               با غیرفعال کردن یک رشته یا صلاحیت، درخواست کارآموزی جدید برای آن
//               رشته/صلاحیت برای شما قابل قبول نخواهد بود.
//             </p>

//             <div className="mt-2 divide-y divide-neutral-200">
//               {fields.map((item) => (
//                 <ActivationRow
//                   key={`field-${item.value}`}
//                   title={labelOf(fieldOptions, item.value)}
//                   active={item.active}
//                   onToggle={(next) =>
//                     setActive(fields, setFields, item.value, next)
//                   }
//                 />
//               ))}
//               {qualifications.map((item) => (
//                 <ActivationRow
//                   key={`qualification-${item.value}`}
//                   title={`صلاحیت ${labelOf(qualificationOptions, item.value)}`}
//                   active={item.active}
//                   onToggle={(next) =>
//                     setActive(
//                       qualifications,
//                       setQualifications,
//                       item.value,
//                       next
//                     )
//                   }
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           <div>
//             <Input
//               label="سابقه کار (سال)"
//               variant="default"
//               labelClassName={labelClassName}
//               className="mt-2"
//               inputSize="sm"
//               type="number"
//               min={1}
//               value={experienceYears}
//               onChange={(e) => setExperienceYears(e.target.value)}
//               error={!!experienceYearsError}
//               errorMessage={experienceYearsError}
//             />
//           </div>
//           <div>
//             <Input
//               label="تعداد پروژه فعال"
//               variant="default"
//               labelClassName={labelClassName}
//               className="mt-2"
//               inputSize="sm"
//               type="number"
//               min={0}
//               value={activeProjects}
//               onChange={(e) => setActiveProjects(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="w-full">
//           <label
//             htmlFor="experience-summary"
//             className={cn(labelClassName, "mb-2 block")}
//           >
//             خلاصه سوابق
//           </label>
//           <TextArea
//             id="experience-summary"
//             variant="default"
//             rounded="xl"
//             rows={3}
//             value={summary}
//             onChange={(e) => setSummary(e.target.value)}
//             placeholder="خلاصه‌ای از سوابق حرفه‌ای..."
//             className="min-h-0 text-xs"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// function RegistrationConditions({
//   salary,
//   setSalary,
//   insurance,
//   setInsurance,
//   weeklyHours,
//   setWeeklyHours,
//   traineeCertificate,
//   setTraineeCertificate,
//   stepNumber = "۴",
// }: {
//   salary: string;
//   setSalary: (v: string) => void;
//   insurance: "social" | "none";
//   setInsurance: (v: "social" | "none") => void;
//   weeklyHours: string;
//   setWeeklyHours: (v: string) => void;
//   traineeCertificate: boolean;
//   setTraineeCertificate: (v: boolean) => void;
//   stepNumber?: string;
// }) {
//   return (
//     <div
//       dir="rtl"
//       className="flex w-full flex-col gap-5 rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6 bg-white"
//     >
//       <div className="flex items-center mb-7 gap-2 justify-between w-full">
//         <div className="flex justify-center items-center gap-2">
//           <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
//             {stepNumber}
//           </span>
//           <h3 className="text-s font-bold text-gray-800">شرایط پذیرش کارآموز</h3>
//         </div>
//         <div>
//           <span className="px-2 bg-blue-100 text-2xs py-1 rounded-full text-input-900">
//             قابل ویرایش همیشگی
//           </span>
//         </div>
//       </div>

//       <div className="w-full flex flex-col gap-5">
//         <div className="w-full flex flex-col md:flex-row justify-start items-stretch md:items-end gap-4">
//           <div className="w-full md:w-96">
//             <Input
//               label="حقوق ماهانه (تومان)"
//               variant="default"
//               labelClassName="mb-2 text-xs"
//               inputSize="sm"
//               inputMode="numeric"
//               isPrice
//               value={salary}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                 setSalary(onlyDigits(e.target.value))
//               }
//             />
//           </div>
//           <div className="w-full md:w-auto">
//             <span className="text-2xs font-semibold text-gray-900">بیمه</span>
//             <Select
//               className="text-nowrap text-xs"
//               placeholder="انتخاب بیمه"
//               options={insuranceOptions}
//               value={insurance}
//               onChange={(v) => setInsurance(v as "social" | "none")}
//             />
//           </div>
//         </div>

//         <div className="w-full flex flex-col md:flex-row justify-start items-stretch md:items-end gap-4">
//           <div className="w-full md:w-1/2">
//             <Input
//               label="ساعات حضور هفتگی"
//               variant="default"
//               labelClassName="mb-2 text-xs"
//               inputSize="sm"
//               inputMode="numeric"
//               value={weeklyHours}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                 setWeeklyHours(onlyDigits(e.target.value))
//               }
//             />
//           </div>
//           <div className="w-full md:w-1/2">
//             <label className="flex items-center gap-2 cursor-pointer select-none">
//               <input
//                 type="checkbox"
//                 checked={traineeCertificate}
//                 onChange={(e) => setTraineeCertificate(e.target.checked)}
//                 className="w-4 h-4"
//               />
//               <span className="text-2xs font-semibold text-gray-900">
//                 گواهی پایان دوره صادر می‌شود
//               </span>
//             </label>
//           </div>
//         </div>
//       </div>

//       <div className="w-full flex justify-start items-center gap-2 p-3 rounded-lg bg-blue-50 border-r-4 border-blue-500 text-blue-900 text-xs">
//         <span>⚙️</span>
//         <span>
//           این بخش در هر زمان پس از ثبت نیز قابل ویرایش است. تغییرات به همه
//           کارآموزان فعال اطلاع‌رسانی خواهد شد.
//         </span>
//       </div>
//     </div>
//   );
// }

// function CommitmentAgreement({
//   stepNumber = "۵",
//   supervisorName,
//   licenseNumber,
//   displayTotalCapacity,
//   allocatedCapacity,
//   setAllocatedCapacity,
//   minMonthlyHours,
//   setMinMonthlyHours,
//   isSubmitting = false,
//   onSubmit,
// }: {
//   stepNumber?: string;
//   supervisorName?: string;
//   licenseNumber?: string;
//   displayTotalCapacity: number;
//   allocatedCapacity: string;
//   setAllocatedCapacity: (v: string) => void;
//   minMonthlyHours: string;
//   setMinMonthlyHours: (v: string) => void;
//   isSubmitting?: boolean;
//   onSubmit?: () => void;
// }) {
//   const [accepted, setAccepted] = useState(false);
//   const [capacityError, setCapacityError] = useState<string | undefined>();

//   const MAX_ALLOCATED = Math.max(displayTotalCapacity, MIN_ALLOCATED_CAPACITY);

//   useEffect(() => {
//     if (allocatedCapacity === "") return;
//     const clamped = Math.min(
//       Math.max(Number(allocatedCapacity) || 0, MIN_ALLOCATED_CAPACITY),
//       MAX_ALLOCATED
//     );
//     if (String(clamped) !== allocatedCapacity) {
//       setAllocatedCapacity(String(clamped));
//     }
//   }, [MAX_ALLOCATED, allocatedCapacity, setAllocatedCapacity]);

//   const handleAllocatedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const digits = onlyDigits(e.target.value);
//     if (digits === "") {
//       setAllocatedCapacity("");
//       setCapacityError("سقف پذیرش من الزامی است");
//       return;
//     }
//     const n = Number(digits);
//     if (n < MIN_ALLOCATED_CAPACITY) {
//       setCapacityError(
//         `سقف پذیرش من باید حداقل ${MIN_ALLOCATED_CAPACITY} باشد`
//       );
//     } else if (n > MAX_ALLOCATED) {
//       setCapacityError(
//         `سقف پذیرش من نمی‌تواند بیشتر از ${MAX_ALLOCATED} باشد`
//       );
//     } else {
//       setCapacityError(undefined);
//     }
//     setAllocatedCapacity(String(Math.min(n, MAX_ALLOCATED)));
//   };

//   return (
//     <div
//       dir="rtl"
//       className="w-full rounded-2xl border-2 shadow-xs border-neutral-200 bg-white p-5 sm:p-6"
//     >
//       <div className="flex items-center gap-2 mb-8">
//         <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
//           {stepNumber}
//         </span>
//         <h3 className="text-s font-bold text-gray-800">
//           ظرفیت پذیرش و تعهد سرپرستی
//         </h3>
//       </div>

//       <div className="flex flex-col">
//         <div className="w-full flex flex-col md:flex-row justify-center items-stretch md:items-center gap-3 mb-5">
//           <div className="w-full md:w-1/3">
//             <Input
//               label="ظرفیت کل پذیرش"
//               variant="default"
//               labelClassName="mb-2 text-xs"
//               inputSize="sm"
//               value={String(displayTotalCapacity)}
//               readOnly
//               disabled
//             />
//           </div>
//           <div className="w-full md:w-1/3">
//             <Input
//               label="سقف پذیرش من"
//               variant="default"
//               labelClassName="mb-2 text-xs"
//               inputSize="sm"
//               inputMode="numeric"
//               value={allocatedCapacity}
//               onChange={handleAllocatedChange}
//               error={!!capacityError}
//               errorMessage={capacityError}
//             />
//             <p className="mt-1 text-3xs text-neutral-500">
//               حداقل {MIN_ALLOCATED_CAPACITY} و حداکثر {MAX_ALLOCATED}
//             </p>
//           </div>
//           <div className="w-full md:w-1/3">
//             <Input
//               label="حداقل ساعت ماهانه"
//               variant="default"
//               labelClassName="mb-2 text-xs"
//               inputSize="sm"
//               inputMode="numeric"
//               value={minMonthlyHours}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                 setMinMonthlyHours(onlyDigits(e.target.value))
//               }
//             />
//           </div>
//         </div>

//         <div className="rounded-xl border-r-5 border-input-800 bg-slate-50 px-4 py-4 mb-2">
//           <h4 className="text-xs font-bold text-neutral-800 mb-2">
//             متن تعهدنامه سرپرستی
//           </h4>
//           <p className="text-[11.5px] leading-6 text-gray-700 text-justify">
//             اینجانب {supervisorName || "..............."} با شماره پروانه{" "}
//             {licenseNumber || "..............."} متعهد می‌شوم که نظارت فنی و
//             تخصصی بر کارآموزان زیر نظر خود را به‌طور مستمر انجام دهم،
//             گزارش‌های ماهانه را در مهلت ۷ روز بررسی و تأیید/رد نمایم و در جلسات
//             توجیهی سازمان حضور فعال داشته باشم. در غیر این صورت، سازمان نظام
//             مهندسی تهران می‌تواند صلاحیت سرپرستی مرا معلق یا لغو نماید.
//           </p>

//           <div className="border-t border-neutral-300 mt-4 pt-3">
//             <p className="text-2xs leading-6 text-neutral-600">
//               <span className="font-bold text-neutral-800">بند ظرفیت: </span>
//               ظرفیت پذیرش کارآموز توسط سازمان تعیین می‌شود و سرپرست متعهد
//               می‌گردد از سقف تعیین‌شده فراتر نرود.
//             </p>
//           </div>
//         </div>

//         <div className="flex mt-2 justify-start items-start md:items-center gap-2 mb-5">
//           <input
//             id="commitment-accepted"
//             type="checkbox"
//             className="w-4 h-4 mt-0.5 md:mt-0 shrink-0"
//             checked={accepted}
//             onChange={(e) => setAccepted(e.target.checked)}
//           />
//           <label
//             htmlFor="commitment-accepted"
//             className="text-[11.5px] font-medium text-neutral-950 cursor-pointer"
//           >
//             مسئولیت تعهدنامه را می‌پذیرم.
//           </label>
//         </div>

//         <div className="flex flex-col md:flex-row items-stretch md:items-center justify-start gap-3">
//           <Button
//             type="button"
//             variant="solid"
//             color="input"
//             className="text-sm w-full md:w-auto"
//             size="xs"
//             rounded="lg"
//             disabled={!accepted || isSubmitting || !!capacityError}
//             onClick={onSubmit}
//           >
//             {isSubmitting ? "در حال ارسال..." : "ارسال درخواست ثبت‌نام سرپرستی"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const MAX_FILE_SIZE = 5 * 1024 * 1024;
// const formatSize = (bytes: number) =>
//   bytes >= 1024 * 1024
//     ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
//     : `${Math.max(1, Math.round(bytes / 1024))} KB`;

// function ResumeUploader({
//   initialResume = null,
//   onChange,
// }: {
//   initialResume?: ResumeFile | null;
//   onChange?: (resume: ResumeFile | null, file?: File) => void;
// }) {
//   const [resume, setResume] = useState<ResumeFile | null>(initialResume);
//   const [isDragging, setIsDragging] = useState(false);
//   const [error, setError] = useState("");
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const urlRef = useRef<string | undefined>(undefined);

//   useEffect(() => {
//     return () => {
//       if (urlRef.current) URL.revokeObjectURL(urlRef.current);
//     };
//   }, []);

//   const handleFile = (file: File | undefined) => {
//     if (!file) return;
//     if (file.type !== "application/pdf") {
//       setError("فقط فایل PDF مجاز است.");
//       return;
//     }
//     if (file.size > MAX_FILE_SIZE) {
//       setError("حجم فایل نباید بیشتر از ۵ مگابایت باشد.");
//       return;
//     }
//     if (urlRef.current) URL.revokeObjectURL(urlRef.current);
//     const url = URL.createObjectURL(file);
//     urlRef.current = url;

//     const newResume: ResumeFile = {
//       name: file.name,
//       size: file.size,
//       uploadedAt: new Date().toLocaleDateString("fa-IR", {
//         year: "numeric",
//         month: "2-digit",
//         day: "2-digit",
//       }),
//       url,
//     };

//     setError("");
//     setResume(newResume);
//     onChange?.(newResume, file);
//   };

//   const handleDelete = () => {
//     if (urlRef.current) URL.revokeObjectURL(urlRef.current);
//     urlRef.current = undefined;
//     setResume(null);
//     setError("");
//     onChange?.(null);
//   };

//   return (
//     <div
//       dir="rtl"
//       className="w-full flex flex-col gap-4 mt-4 rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6 bg-white"
//     >
//       <div className="flex justify-start items-center gap-2 text-sm font-bold text-black mb-4">
//         <ArrowUpToLine size={18} />
//         <span>فایل رزومه</span>
//       </div>

//       {resume && (
//         <div className="w-full flex items-center justify-between gap-3 p-3 rounded-lg border border-neutral-200 bg-neutral-50">
//           <div className="flex items-center gap-2 min-w-0">
//             <FileText size={18} className="text-neutral-600 shrink-0" />
//             <div className="min-w-0">
//               <p className="text-xs font-semibold text-neutral-900 truncate">
//                 {resume.name}
//               </p>
//               <p className="text-3xs text-neutral-500">
//                 {formatSize(resume.size)} · {resume.uploadedAt}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3 shrink-0">
//             {resume.url && (
//               <button
//                 type="button"
//                 onClick={() => window.open(resume.url, "_blank")}
//                 className="cursor-pointer"
//                 aria-label="مشاهده رزومه"
//               >
//                 <Eye size={17} />
//               </button>
//             )}
//             <button
//               type="button"
//               onClick={handleDelete}
//               className="cursor-pointer"
//               aria-label="حذف رزومه"
//             >
//               <Trash2 size={17} color="red" />
//             </button>
//           </div>
//         </div>
//       )}

//       <div
//         onDragOver={(e) => {
//           e.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragLeave={() => setIsDragging(false)}
//         onDrop={(e) => {
//           e.preventDefault();
//           setIsDragging(false);
//           handleFile(e.dataTransfer.files?.[0]);
//         }}
//         className={`w-full flex flex-col justify-center items-center gap-3 py-8 rounded-xl border-2 border-dashed transition-all duration-300 ${
//           isDragging
//             ? "border-input-700 bg-input-50"
//             : "border-neutral-300 bg-white"
//         }`}
//       >
//         <Upload size={36} className="text-neutral-500" />
//         <p className="text-xs text-neutral-500">
//           {resume
//             ? "برای جایگزینی رزومه، فایل PDF جدید را اینجا رها کنید"
//             : "فایل PDF رزومه را اینجا رها کنید"}
//         </p>
//         <button
//           type="button"
//           onClick={() => fileInputRef.current?.click()}
//           className="px-4 py-2 text-xs font-bold border border-neutral-300 rounded-lg bg-neutral-50 cursor-pointer hover:bg-neutral-100 transition-all duration-300"
//         >
//           انتخاب فایل
//         </button>
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept="application/pdf"
//           className="hidden"
//           onChange={(e) => {
//             handleFile(e.target.files?.[0]);
//             e.target.value = "";
//           }}
//         />
//         {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
//       </div>

//       <div className="w-full flex justify-start items-center gap-2 p-3 rounded-lg bg-amber-50 border-r-4 border-amber-500 text-amber-800 text-xs">
//         <TriangleAlert size={14} />
//         <span>
//           فایل رزومه برای کارآموزان در زمان انتخاب سرپرست قابل مشاهده خواهد بود.
//         </span>
//       </div>
//     </div>
//   );
// }

// /* ============================================================
//    7) PersonalInfoForm
//    ============================================================ */

// interface PersonalInfoFormSubmitState {
//   formValues: FormValues;
//   userType: UserType;
//   fields: Item[];
//   qualifications: Item[];
//   experienceYears: string;
//   activeProjects: string;
//   summary: string;
//   salary: string;
//   insurance: "social" | "none";
//   weeklyHours: string;
//   traineeCertificate: boolean;
//   allocatedCapacity: string;
//   minMonthlyHours: string;
//   payloadTotalCapacity: number;
//   resume: ResumeFile | null;
//   resumeFile: File | null;
// }

// interface PersonalInfoFormProps {
//   stepNumber?: string;
//   userType: UserType;
//   onUserTypeChange: (t: UserType) => void;
//   backendData?: any | null;
//   isTabLoading?: boolean;
//   isSubmitting?: boolean;
//   onSubmit?: (state: PersonalInfoFormSubmitState) => void;
// }

// function PersonalInfoForm({
//   stepNumber = "۱",
//   userType,
//   onUserTypeChange,
//   backendData,
//   isTabLoading = false,
//   isSubmitting = false,
//   onSubmit,
// }: PersonalInfoFormProps) {
//   const yesterday = useMemo(() => getYesterday(), []);
//   const isUser = userType === "User";

//   const [fields, setFields] = useState<Item[]>([]);
//   const [qualifications, setQualifications] = useState<Item[]>([]);
//   const [experienceYears, setExperienceYears] = useState("");
//   const [activeProjects, setActiveProjects] = useState("");
//   const [summary, setSummary] = useState("");
//   const [salary, setSalary] = useState("");
//   const [insurance, setInsurance] = useState<"social" | "none">("none");
//   const [weeklyHours, setWeeklyHours] = useState("");
//   const [traineeCertificate, setTraineeCertificate] = useState(false);
//   const [allocatedCapacity, setAllocatedCapacity] = useState("");
//   const [minMonthlyHours, setMinMonthlyHours] = useState("");
//   const [resume, setResume] = useState<ResumeFile | null>(null);
//   const [resumeFile, setResumeFile] = useState<File | null>(null);
//   const [experienceYearsError, setExperienceYearsError] = useState<
//     string | undefined
//   >(undefined);

//   // با تغییر دیتای بک‌اند (یا تعویض تب) state های مستقل از Formik را همگام کن
//   useEffect(() => {
//     const license = realInfoToLicenseStatus(backendData);
//     setFields(license.fields);
//     setQualifications(license.qualifications);
//     setExperienceYears(license.experienceYears);
//     setActiveProjects(license.activeProjects);
//     setSummary(license.summary);

//     const reg = realInfoToRegistrationConditions(backendData);
//     setSalary(reg.salary);
//     setInsurance(reg.insurance);
//     setWeeklyHours(reg.weeklyHours);
//     setTraineeCertificate(reg.traineeCertificate);

//     const commit = realInfoToCommitment(backendData);
//     setAllocatedCapacity(commit.allocatedCapacity);
//     setMinMonthlyHours(commit.minMonthlyHours);
//   }, [backendData]);

//   const dynamicInitial = useMemo<FormValues>(() => {
//     if (!backendData) return { ...emptyForm };
//     return isUser
//       ? realInfoToFormValues(backendData)
//       : legalInfoToFormValues(backendData);
//   }, [backendData, isUser]);

//   const commitment = useMemo(
//     () =>
//       realInfoToCommitment(
//         backendData,
//         TOTAL_CAPACITY_BY_USER_TYPE[userType]
//       ),
//     [backendData, userType]
//   );

//   return (
//     <Formik
//       enableReinitialize
//       initialValues={dynamicInitial}
//       validationSchema={isUser ? userSchema : legalSchema}
//       onSubmit={(values) => {
//         if (!experienceYears || Number(experienceYears) <= 0) {
//           setExperienceYearsError("سابقه کار باید حداقل ۱ سال باشد");
//           return;
//         }
//         setExperienceYearsError(undefined);

//         onSubmit?.({
//           formValues: values,
//           userType,
//           fields,
//           qualifications,
//           experienceYears,
//           activeProjects,
//           summary,
//           salary,
//           insurance,
//           weeklyHours,
//           traineeCertificate,
//           allocatedCapacity,
//           minMonthlyHours,
//           payloadTotalCapacity: commitment.payloadTotalCapacity,
//           resume,
//           resumeFile,
//         });
//       }}
//     >
//       {({
//         getFieldProps,
//         errors,
//         touched,
//         values,
//         setFieldValue,
//         setFieldTouched,
//         handleSubmit,
//         submitCount,
//       }) => {
//         const f = (name: keyof FormValues) => ({
//           name,
//           field: getFieldProps(name),
//           error: !!(touched[name] && errors[name]),
//           errorMessage: errors[name] as string | undefined,
//         });

//         const errorList = Object.values(errors).filter(Boolean) as string[];

//         return (
//           <Form
//             onSubmit={handleSubmit}
//             onKeyDown={(e) => {
//               if (
//                 e.key === "Enter" &&
//                 (e.target as HTMLElement).tagName === "INPUT"
//               ) {
//                 e.preventDefault();
//               }
//             }}
//             className={cn(
//               "w-full flex flex-col justify-center items-center gap-4",
//               isTabLoading && "pointer-events-none opacity-60"
//             )}
//           >
//             {isTabLoading && (
//               <div
//                 dir="rtl"
//                 className="w-full rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800"
//               >
//                 در حال دریافت اطلاعات...
//               </div>
//             )}

//             {/* Card 1: اطلاعات هویتی */}
//             <div className="w-full rounded-2xl border-2 shadow-xs border-neutral-200 sm:p-6 bg-white px-8 py-7">
//               <div className="w-full flex justify-between items-center">
//                 <div className="flex items-center gap-2">
//                   <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef0f8] text-xs text-blue-800">
//                     {stepNumber}
//                   </span>
//                   <span className="text-s font-semibold text-neutral-900">
//                     نوع شخص و اطلاعات هویتی
//                   </span>
//                 </div>
//                 <div className="text-xs bg-neutral-100 text-neutral-500 border border-neutral-300 p-1 px-3 rounded-xl">
//                   <span>الزامی</span>
//                 </div>
//               </div>

//               <div className="mt-8">
//                 <div className="w-full flex justify-start items-start flex-col gap-3 text-sm">
//                   <p className="text-3xs text-black font-bold">نوع شخص</p>
//                   <div className="w-full flex justify-center items-center gap-3">
//                     {usersType.map((item) => (
//                       <button
//                         key={item.id}
//                         type="button"
//                         onClick={() => onUserTypeChange(item.type)}
//                         className={cn(
//                           "w-1/2 h-11 flex justify-center items-center text-center border rounded-lg text-xs cursor-pointer p-2 transition-all duration-300",
//                           userType === item.type
//                             ? "border-blue-700 bg-blue-700 text-white"
//                             : "border-neutral-300 hover:bg-blue-300 hover:text-white"
//                         )}
//                       >
//                         <p>{item.title}</p>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="mt-4 flex flex-col gap-5">
//                   <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4">
//                     <div className="w-full md:w-2/3">
//                       {isUser ? (
//                         <Input
//                           key="FullName"
//                           label="نام و نام خانوادگی"
//                           variant="default"
//                           labelClassName="mb-2 text-xs"
//                           placeholder="مثال: علی رضایی"
//                           inputSize="sm"
//                           {...f("FullName")}
//                         />
//                       ) : (
//                         <Input
//                           key="CompanyName"
//                           label="نام شرکت / موسسه"
//                           variant="default"
//                           labelClassName="mb-2 text-xs"
//                           placeholder="مثال: شرکت مهندسین مشاور"
//                           inputSize="sm"
//                           {...f("CompanyName")}
//                         />
//                       )}
//                     </div>
//                     <div className="w-full md:w-1/3">
//                       <Input
//                         label="شماره پروانه اشتغال"
//                         variant="default"
//                         labelClassName="mb-2 text-xs"
//                         placeholder="012345-6"
//                         inputSize="sm"
//                         {...f("LicenseNumber")}
//                       />
//                     </div>
//                   </div>

//                   <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3">
//                     <div className="w-full md:w-1/3">
//                       <Input
//                         label={isUser ? "کدملی" : "شناسه ملی"}
//                         variant="default"
//                         labelClassName="mb-2 text-xs"
//                         placeholder={isUser ? "0123456789" : "01234567890"}
//                         inputSize="sm"
//                         inputMode="numeric"
//                         {...f("NationalCode")}
//                       />
//                     </div>
//                     <div className="w-full md:w-1/3">
//                       <JalaliDatePicker
//                         label={isUser ? "تاریخ تولد" : "تاریخ تأسیس"}
//                         variant="default"
//                         labelClassName="mb-2 text-xs"
//                         placeholder="۱۳۷۰/۰۱/۰۱"
//                         inputSize="sm"
//                         name="Birthday"
//                         value={values.Birthday ?? ""}
//                         maxDate={yesterday}
//                         error={!!(touched.Birthday && errors.Birthday)}
//                         errorMessage={
//                           touched.Birthday ? errors.Birthday : undefined
//                         }
//                         onChange={(iso: string) => {
//                           setFieldTouched("Birthday", true, false);
//                           setFieldValue("Birthday", iso, true);
//                         }}
//                         onBlur={() => setFieldTouched("Birthday", true, false)}
//                       />
//                     </div>
//                     <div className="w-full md:w-1/3">
//                       <Input
//                         label={isUser ? "محل تولد" : "محل شرکت"}
//                         variant="default"
//                         labelClassName="mb-2 text-xs"
//                         placeholder="تهران"
//                         inputSize="sm"
//                         {...f("Birthplace")}
//                       />
//                     </div>
//                   </div>

//                   <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3">
//                     <div className="w-full md:w-1/3">
//                       <Input
//                         label="شماره تماس"
//                         variant="default"
//                         labelClassName="mb-2 text-xs"
//                         placeholder="09123456789"
//                         inputSize="sm"
//                         inputMode="numeric"
//                         {...f("PhoneNumber")}
//                       />
//                     </div>
//                     <div className="w-full md:w-1/3">
//                       <Input
//                         label="شماره عضویت نظام مهندسی"
//                         variant="default"
//                         labelClassName="mb-2 text-xs"
//                         placeholder="98765"
//                         inputSize="sm"
//                         inputMode="numeric"
//                         {...f("NezamRegisterCode")}
//                       />
//                     </div>
//                     <div className="w-full md:w-1/3 flex gap-3">
//                       <div className="w-1/2">
//                         <Input
//                           label="پایه پروانه"
//                           variant="default"
//                           labelClassName="mb-2 text-xs"
//                           placeholder="۲"
//                           inputSize="sm"
//                           inputMode="numeric"
//                           {...f("LicenseBase")}
//                         />
//                       </div>
//                       <div className="w-1/2">
//                         <Input
//                           label="سال صدور پروانه"
//                           variant="default"
//                           labelClassName="mb-2 text-xs"
//                           placeholder="۱۴۰۰"
//                           inputSize="sm"
//                           inputMode="numeric"
//                           {...f("LicenseYear")}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="w-full">
//                     <Input
//                       label="آدرس"
//                       variant="default"
//                       labelClassName="mb-2 text-xs"
//                       placeholder="تهران، خیابان ..."
//                       inputSize="sm"
//                       {...f("Address")}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <LicenseStatus
//               multipleFields={!isUser}
//               fields={fields}
//               setFields={setFields}
//               qualifications={qualifications}
//               setQualifications={setQualifications}
//               experienceYears={experienceYears}
//               setExperienceYears={(v) => {
//                 setExperienceYears(v);
//                 if (Number(v) > 0) setExperienceYearsError(undefined);
//               }}
//               activeProjects={activeProjects}
//               setActiveProjects={setActiveProjects}
//               summary={summary}
//               setSummary={setSummary}
//               experienceYearsError={experienceYearsError}
//             />

//             <RegistrationConditions
//               salary={salary}
//               setSalary={setSalary}
//               insurance={insurance}
//               setInsurance={setInsurance}
//               weeklyHours={weeklyHours}
//               setWeeklyHours={setWeeklyHours}
//               traineeCertificate={traineeCertificate}
//               setTraineeCertificate={setTraineeCertificate}
//             />

//             {submitCount > 0 && errorList.length > 0 && (
//               <div
//                 dir="rtl"
//                 className="w-full rounded-xl border border-red-300 bg-red-50 p-4 text-xs text-red-800"
//               >
//                 <p className="mb-2 font-bold">لطفاً موارد زیر را اصلاح کنید:</p>
//                 <ul className="list-disc pr-5 space-y-1">
//                   {errorList.map((msg, i) => (
//                     <li key={i}>{msg}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <CommitmentAgreement
//               supervisorName={values.FullName || values.CompanyName}
//               licenseNumber={values.LicenseNumber}
//               displayTotalCapacity={commitment.displayTotalCapacity}
//               allocatedCapacity={allocatedCapacity}
//               setAllocatedCapacity={setAllocatedCapacity}
//               minMonthlyHours={minMonthlyHours}
//               setMinMonthlyHours={setMinMonthlyHours}
//               isSubmitting={isSubmitting}
//               onSubmit={handleSubmit}
//             />

//             <ResumeUploader
//               initialResume={resume}
//               onChange={(r, file) => {
//                 setResume(r);
//                 setResumeFile(file ?? null);
//               }}
//             />
//           </Form>
//         );
//       }}
//     </Formik>
//   );
// }

// /* ============================================================
//    8) LegalNotFound — حالت «اطلاعات حقوقی ثبت نشده»
//    ============================================================ */

// function LegalNotFound({
//   onBackToReal,
//   onCreate,
// }: {
//   onBackToReal: () => void;
//   onCreate: () => void;
// }) {
//   return (
//     <div
//       dir="rtl"
//       className="w-full rounded-2xl border-2 border-neutral-200 bg-white px-6 py-14 shadow-xs sm:px-10"
//     >
//       <div className="mx-auto flex max-w-md flex-col items-center text-center">
//         <div className="relative mb-6">
//           <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#eef0f8]">
//             <Building2 className="size-11 text-blue-800" strokeWidth={1.5} />
//           </div>
//           <span className="absolute -bottom-1 -left-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-amber-100 text-amber-700">
//             <TriangleAlert size={16} />
//           </span>
//         </div>

//         <h2 className="text-sm font-bold text-neutral-900">
//           اطلاعات شخص حقوقی یافت نشد
//         </h2>

//         <p className="mt-3 text-xs leading-7 text-neutral-600">
//           برای حساب کاربری شما هنوز هیچ ثبت‌نام سرپرستی به‌عنوان شخص حقوقی
//           (شرکت / موسسه) انجام نشده است. می‌توانید ثبت‌نام شخص حقوقی را ایجاد
//           کنید یا به فرم شخص حقیقی بازگردید.
//         </p>

//         <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">
//           <Button
//             type="button"
//             variant="solid"
//             color="input"
//             size="xs"
//             rounded="lg"
//             className="text-sm"
//             onClick={onCreate}
//           >
//             <span className="flex items-center justify-center gap-2">
//               <Building2 size={16} />
//               ایجاد ثبت‌نام شخص حقوقی
//             </span>
//           </Button>
//           <button
//             type="button"
//             onClick={onBackToReal}
//             className="flex h-10 items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-neutral-50 px-4 text-sm text-neutral-800 transition-colors hover:bg-neutral-100"
//           >
//             <UserRound size={16} />
//             بازگشت به شخص حقیقی
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ============================================================
//    9) SupervisorPage
//    ============================================================ */

// const isNotFound = (err: any) => err?.response?.status === 404;

// export default function SupervisorPage() {
//   const [userType, setUserType] = useState<UserType>("User");
//   const [clientError, setClientError] = useState<string | null>(null);

//   // حقیقی: همیشه فعال
//   const realQuery = useGetRealInfo();

//   // حقوقی: فقط وقتی روی تب «شخص حقوقی» کلیک شد درخواست می‌رود
//   const legalQuery = useGetLegalInfo({ enabled: userType === "legal" });

//   const { mutate: register, isPending } = useRegisterSupervisorReal();
//   const { mutate: registerLegal, isPending: isPendingLegal } =
//     useRegisterSupervisorLegal();

//   // وقتی اطلاعات حقوقی نیست و کاربر «ایجاد» را زده
//   const [legalCreateMode, setLegalCreateMode] = useState(false);

//   const isLegalTab = userType === "legal";
//   const activeQuery = isLegalTab ? legalQuery : realQuery;

//   // ۴۰۴ یعنی کاربر جدید → backendData = null
//   const backendData = activeQuery.data?.data ?? null;

//   const activeError = activeQuery.error;
//   const hasRealError = !!activeError && !isNotFound(activeError);


//   // کاربر روی تب حقوقی زده ولی اطلاعات حقوقی ندارد (۴۰۴)
//   const legalNotFound =
//     isLegalTab &&
//     legalQuery.isError &&
//     isNotFound(legalQuery.error) &&
//     !legalCreateMode;

//   const handleUserTypeChange = (next: UserType) => {
//     setClientError(null);
//     setLegalCreateMode(false);
//     setUserType(next);
//   };

//   const handleSubmit = (state: PersonalInfoFormSubmitState) => {
//     setClientError(null);

//     // ───── شخص حقوقی: POST /api/Supervisor/LegalRegistration ─────
//     if (state.userType === "legal") {
//       const legalPayload: any = buildSupervisorLegalPayload({
//         formValues: state.formValues,
//         fields: state.fields,
//         qualifications: state.qualifications,
//         experienceYears: state.experienceYears,
//         activeProjects: state.activeProjects,
//         summary: state.summary,
//         salary: state.salary,
//         insurance: state.insurance,
//         weeklyHours: state.weeklyHours,
//         payloadTotalCapacity: state.payloadTotalCapacity,
//         allocatedCapacity: state.allocatedCapacity,
//         minMonthlyHours: state.minMonthlyHours,
//         traineeCertificate: state.traineeCertificate,
//         backend: legalQuery.data?.data ?? null,
//       });

//       const legalError = validateLegalBeforeSubmit(legalPayload);
//       if (legalError) {
//         setClientError(legalError);
//         return;
//       }

//       registerLegal(legalPayload, {
//         onSuccess: () => {
//           setLegalCreateMode(false);
//           legalQuery.refetch?.();
//         },
//         onError: (err: any) => {
//           setClientError(
//             err?.response?.data?.message ||
//               "خطا در ثبت اطلاعات شخص حقوقی. لطفاً دوباره تلاش کنید."
//           );
//         },
//       });
//       return;
//     }

//     // ───── شخص حقیقی: POST /api/Supervisor/RealRegistration ─────

//     const payload: any = buildSupervisorRealPayload({
//       formValues: state.formValues,
//       fields: state.fields,
//       qualifications: state.qualifications,
//       experienceYears: state.experienceYears,
//       activeProjects: state.activeProjects,
//       summary: state.summary,
//       salary: state.salary,
//       insurance: state.insurance,
//       weeklyHours: state.weeklyHours,
//       payloadTotalCapacity: state.payloadTotalCapacity,
//       allocatedCapacity: state.allocatedCapacity,
//       minMonthlyHours: state.minMonthlyHours,
//       traineeCertificate: state.traineeCertificate,
//       backend: backendData,
//     });

//     const validationError = validateBeforeSubmit(payload);
//     if (validationError) {
//       setClientError(validationError);
//       return;
//     }

//     register(payload, {
//       onSuccess: () => {
//         realQuery.refetch?.();
//       },
//       onError: (err: any) => {
//         const msg =
//           err?.response?.data?.message ||
//           "خطا در ثبت اطلاعات سرپرست. لطفاً دوباره تلاش کنید.";
//         setClientError(msg);
//       },
//     });
//   };

//   // فقط لود اولیه صفحه، کل صفحه را با Loading عوض می‌کند
//   if (realQuery.isLoading) return  <div
//   dir="rtl"
//   className="w-full rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800"
// >
//   در حال دریافت اطلاعات...
// </div>;

//   // if (hasRealError) {
//   //   return <div>خطا در دریافت اطلاعات سرپرست</div>;
//   // }

//   return (
//     <div className="w-full px-4 md:px-7 py-6">
//       <div className="mx-auto flex w-full flex-col gap-5">
//         {clientError && (
//           <div
//             dir="rtl"
//             className="w-full rounded-xl border border-red-300 bg-red-50 p-4 text-xs text-red-800"
//           >
//             <p className="font-bold mb-1">خطا در ثبت اطلاعات:</p>
//             <p>{clientError}</p>
//           </div>
//         )}

//         {legalNotFound ? (
//           <LegalNotFound
//             onBackToReal={() => handleUserTypeChange("User")}
//             onCreate={() => setLegalCreateMode(true)}
//           />
//         ) : (
//           <PersonalInfoForm
//             userType={userType}
//             onUserTypeChange={handleUserTypeChange}
//             backendData={backendData}
//             isTabLoading={isLegalTab && legalQuery.isLoading}
//             isSubmitting={isPending || isPendingLegal}
//             onSubmit={handleSubmit}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import { Form, Formik } from "formik";
// import * as Yup from "yup";
// import {
//   Settings,
//   Trash2,
//   Upload,
//   FileText,
//   Eye,
//   TriangleAlert,
//   ArrowUpToLine,
//   Building2,
//   UserRound,
// } from "lucide-react";

// import Loading from "@/app/components/Loading";
// import { Input, TextArea } from "@/app/components/ui/input";
// import { Button } from "@/app/components/ui/Button";
// import SwitchButton from "@/app/components/ui/Button/switchButton";
// import { Select } from "@/app/components/ui/input/SelectSilde";
// import { cn } from "@/lib/cn";
// import JalaliDatePicker from "@/lib/jalaliDatePicker";
// import { getYesterday, isValidISODate, toISODate } from "@/lib/date-utils";
// import { toGregorian, toJalaali } from "jalaali-js";
// import {
//   useRegisterSupervisorLegal,
//   useRegisterSupervisorReal,
// } from "@/core/services/supervisor/mutation";
// import {
//   useGetLegalInfo,
//   useGetRealInfo,
// } from "@/core/services/supervisor/queris";

// /* ============================================================
//    0) Types & Config
//    ============================================================ */

// export type UserType = "User" | "legal";

// const TOTAL_CAPACITY_BY_USER_TYPE: Record<UserType, number> = {
//   User: 3,
//   legal: 5,
// };

// /** حداقل مجاز برای سقف پذیرش من (بک‌اند: باید > 1 باشد) */
// const MIN_ALLOCATED_CAPACITY = 2;

// interface Item {
//   value: string;
//   active: boolean;
// }

// interface ResumeFile {
//   name: string;
//   size: number;
//   uploadedAt: string;
//   url?: string;
// }

// interface FormValues {
//   FullName: string;
//   CompanyName: string;
//   LicenseNumber: string;
//   NationalCode: string;
//   Birthday: string;
//   Birthplace: string;
//   PhoneNumber: string;
//   Address: string;
//   NezamRegisterCode: string;
//   LicenseBase: string;
//   LicenseYear: string;
// }

// const emptyForm: FormValues = {
//   FullName: "",
//   CompanyName: "",
//   LicenseNumber: "",
//   NationalCode: "",
//   Birthday: "",
//   Birthplace: "",
//   PhoneNumber: "",
//   Address: "",
//   NezamRegisterCode: "",
//   LicenseBase: "",
//   LicenseYear: "",
// };

// const usersType: { id: number; title: string; type: UserType }[] = [
//   { id: 1, title: "شخص حقیقی", type: "User" },
//   { id: 2, title: "شخص حقوقی", type: "legal" },
// ];

// /* ============================================================
//    1) Enum نگاشت‌ها (مطابق بک‌اند)
//    ============================================================ */

// const fieldOptions: { label: string; value: string }[] = [
//   { label: "مهندسی مکانیک", value: "1" },
//   { label: "مهندسی برق", value: "2" },
//   { label: "مهندسی معماری", value: "4" },
//   { label: "مهندسی عمران", value: "5" },
//   { label: "شهرسازی", value: "6" },
//   { label: "نقشه‌برداری", value: "7" },
//   { label: "ترافیک", value: "8" },
//   { label: "جوش", value: "9" },
//   { label: "خاک و پی", value: "10" },
// ];

// const qualificationOptions: { label: string; value: string }[] = [
//   { label: "نظارت", value: "1" },
//   { label: "طراحی", value: "2" },
//   { label: "مجری", value: "3" },
//   { label: "آزمایشگاه", value: "4" },
// ];

// const insuranceOptions = [
//   { value: "social", label: "بیمه تأمین اجتماعی" },
//   { value: "none", label: "بدون بیمه" },
// ];

// /* ============================================================
//    2) Helpers — Date / Digits / NationalCode
//    ============================================================ */

// const persianToISO = (val: string | null | undefined): string => {
//   if (!val) return "";
//   const m = String(val).match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
//   if (!m) return "";
//   const [, y, mo, d] = m;
//   const year = Number(y);
//   if (year > 1900) {
//     return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
//   }
//   const g = toGregorian(year, Number(mo), Number(d));
//   return `${g.gy}-${String(g.gm).padStart(2, "0")}-${String(g.gd).padStart(2, "0")}`;
// };

// const isoToPersian = (iso: string | null | undefined): string => {
//   if (!iso) return "";
//   const m = String(iso).match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
//   if (!m) return "";
//   const [, y, mo, d] = m;
//   const gy = Number(y);
//   if (gy < 1900) return iso;
//   const j = toJalaali(gy, Number(mo), Number(d));
//   return `${j.jy}/${String(j.jm).padStart(2, "0")}/${String(j.jd).padStart(2, "0")}`;
// };

// const toEnglishDigits = (value: string) =>
//   value
//     .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
//     .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

// const onlyDigits = (value: string) => toEnglishDigits(value).replace(/\D/g, "");

// /** ۱۰ رقم → حقیقی، ۱۱ رقم → حقوقی، در غیر این صورت null */
// function userTypeFromNationalCode(raw: string): UserType | null {
//   const digits = onlyDigits(raw ?? "");
//   if (digits.length === 10) return "User";
//   if (digits.length === 11) return "legal";
//   return null;
// }

// /* ============================================================
//    3) Validation schema
//    ============================================================ */

// const pastDate = (label: string) =>
//   Yup.string()
//     .trim()
//     .required(`${label} الزامی است`)
//     .test("is-past-date", `${label} باید قبل از امروز باشد`, (value) => {
//       if (!value) return true;
//       return isValidISODate(value) && value < toISODate(new Date());
//     });

// const commonShape = {
//   LicenseNumber: Yup.string().trim().required("شماره پروانه اشتغال الزامی است"),
//   Birthday: pastDate("تاریخ تولد"),
//   Birthplace: Yup.string().trim().required("محل تولد الزامی است"),
//   PhoneNumber: Yup.string().trim().required("شماره تماس الزامی است"),
//   Address: Yup.string().trim().required("آدرس الزامی است"),
//   NezamRegisterCode: Yup.string()
//     .trim()
//     .required("شماره عضویت نظام مهندسی الزامی است"),
//   LicenseBase: Yup.string()
//     .trim()
//     .required("پایه پروانه الزامی است")
//     .test("valid-base", "پایه پروانه معتبر نیست", (v) => {
//       const n = Number(v);
//       return !Number.isNaN(n) && n >= 0 && n <= 4;
//     }),
//   LicenseYear: Yup.string()
//     .trim()
//     .required("سال صدور پروانه الزامی است")
//     .matches(/^[0-9۰-۹]{4}$/, "سال باید ۴ رقم باشد"),
// };

// const userSchema = Yup.object({
//   ...commonShape,
//   NationalCode: Yup.string()
//     .trim()
//     .required("کد ملی الزامی است")
//     .matches(/^[0-9۰-۹]{10}$/, "برای شخص حقیقی، کد ملی باید ۱۰ رقم باشد"),
//   FullName: Yup.string()
//     .trim()
//     .required("نام و نام خانوادگی الزامی است")
//     .test(
//       "full-name",
//       "نام و نام خانوادگی را کامل وارد کنید",
//       (v) => (v ?? "").trim().split(/\s+/).filter(Boolean).length >= 2
//     ),
// });

// const legalSchema = Yup.object({
//   ...commonShape,
//   NationalCode: Yup.string()
//     .trim()
//     .required("شناسه ملی الزامی است")
//     .matches(/^[0-9۰-۹]{11}$/, "برای شخص حقوقی، شناسه ملی باید ۱۱ رقم باشد"),
//   CompanyName: Yup.string().trim().required("نام شرکت / موسسه الزامی است"),
//   Birthday: pastDate("تاریخ تأسیس"),
//   Birthplace: Yup.string().trim().required("محل شرکت الزامی است"),
// });

// /* ============================================================
//    4) Pre-fill نگاشت از backendData
//    ============================================================ */

// function realInfoToFormValues(data: any): FormValues {
//   const firstName = data?.firstName ?? "";
//   const lastName = data?.lastName ?? "";
//   return {
//     FullName: `${firstName} ${lastName}`.trim(),
//     CompanyName: "",
//     LicenseNumber: data?.licenseNumber ?? "",
//     NationalCode: data?.nationalCode ?? "",
//     Birthday: persianToISO(data?.birthDate),
//     Birthplace: data?.birthPlace ?? "",
//     PhoneNumber: data?.phoneNumber ?? "",
//     Address: data?.address ?? "",
//     NezamRegisterCode: data?.nezamRegisterCode ?? "",
//     LicenseBase: data?.licenseBase != null ? String(data.licenseBase) : "",
//     LicenseYear: data?.licenseYear ? String(data.licenseYear) : "",
//   };
// }

// /** نگاشت LegalSupervisorDto → فرم (مطابق DTO بک‌اند) */
// function legalInfoToFormValues(data: any): FormValues {
//   return {
//     ...emptyForm,
//     CompanyName: data?.name ?? "",
//     LicenseNumber: data?.licenseNumber ?? "",
//     NationalCode: data?.nationalId ?? "",
//     Birthday: persianToISO(data?.registerDate),
//     Birthplace: data?.registerPlace ?? "",
//     PhoneNumber: data?.phoneNumber ?? "",
//     Address: data?.address ?? "",
//     NezamRegisterCode: data?.nezamRegisterCode ?? "",
//     LicenseBase: data?.licenseBase != null ? String(data.licenseBase) : "",
//     LicenseYear: data?.licenseYear ? String(data.licenseYear) : "",
//   };
// }

// function realInfoToLicenseStatus(data: any) {
//   const field = Array.isArray(data?.fieldList)
//     ? data.fieldList
//         .filter((x: number) => x > 0)
//         .map((x: number) => ({ value: String(x), active: true }))
//     : data?.field != null && data.field > 0
//       ? [{ value: String(data.field), active: true }]
//       : [];
//   const quals = Array.isArray(data?.competenceList)
//     ? data.competenceList
//         .filter((c: number) => c > 0)
//         .map((c: number) => ({ value: String(c), active: true }))
//     : [];
//   return {
//     fields: field as Item[],
//     qualifications: quals as Item[],
//     experienceYears:
//       data?.workExperience != null && data.workExperience > 0
//         ? String(data.workExperience)
//         : "",
//     activeProjects:
//       data?.activeProjectCount != null && data.activeProjectCount > 0
//         ? String(data.activeProjectCount)
//         : "",
//     summary: data?.experienceSummery ?? "",
//   };
// }

// function realInfoToRegistrationConditions(data: any) {
//   return {
//     salary:
//       data?.traineSalary != null && data.traineSalary > 0
//         ? String(data.traineSalary)
//         : "",
//     insurance: (data?.traineInsurnce ? "social" : "none") as "social" | "none",
//     weeklyHours:
//       data?.traineHoursByWeek != null && data.traineHoursByWeek > 0
//         ? String(data.traineHoursByWeek)
//         : "",
//     traineeCertificate: !!data?.traineCertificate,
//   };
// }

// function realInfoToCommitment(data: any, fallbackTotal = 0) {
//   const backendAcceptance = Number(data?.acceptanceCapacity ?? 0);
//   const displayTotalCapacity =
//     backendAcceptance > 1 ? backendAcceptance : Math.max(fallbackTotal, 3);

//   return {
//     allocatedCapacity:
//       data?.assignedCapacity != null && data.assignedCapacity > 0
//         ? String(data.assignedCapacity)
//         : "",
//     minMonthlyHours:
//       data?.minHoursByMonth != null && data.minHoursByMonth > 0
//         ? String(data.minHoursByMonth)
//         : "",
//     displayTotalCapacity,
//     payloadTotalCapacity: displayTotalCapacity,
//   };
// }

// /* ============================================================
//    5) buildPayload & validateBeforeSubmit
//    ============================================================ */

// interface BuildPayloadParams {
//   formValues: FormValues;
//   fields: Item[];
//   qualifications: Item[];
//   experienceYears: string;
//   activeProjects: string;
//   summary: string;
//   salary: string;
//   insurance: "social" | "none";
//   weeklyHours: string;
//   payloadTotalCapacity: number;
//   allocatedCapacity: string;
//   minMonthlyHours: string;
//   traineeCertificate: boolean;
//   backend: any | null;
// }

// function buildSupervisorRealPayload(params: BuildPayloadParams & { cvFile?: File | null }) {
//   const { formValues, fields, qualifications, backend, cvFile } = params;

//   const fullName = (formValues.FullName ?? "").trim();
//   const [firstName, ...rest] = fullName.split(/\s+/);
//   const lastName = rest.join(" ");

//   const activeFields = fields.filter((f) => f.active);
//   const activeQuals = qualifications.filter((q) => q.active);

//   return {
//     fldMemberId: backend?.fldMemberId ?? 0,
//     memberId: backend?.memberId ?? "00000000-0000-0000-0000-000000000000",
//     id: backend?.id ?? 0,
//     firstName: firstName || "",
//     lastName: lastName || "",
//     nationalCode: formValues.NationalCode ?? "",
//     licenseNumber: formValues.LicenseNumber ?? "",
//     phoneNumber: formValues.PhoneNumber ?? "",
//     birthDate: isoToPersian(formValues.Birthday),
//     birthPlace: formValues.Birthplace ?? "",
//     nezamRegisterCode: formValues.NezamRegisterCode ?? "",
//     address: formValues.Address ?? "",
//     competenceList: activeQuals
//       .map((q) => Number(q.value))
//       .filter((n) => !Number.isNaN(n) && n > 0),
//     field: activeFields[0] ? Number(activeFields[0].value) : 0,
//     licenseBase: Number(formValues.LicenseBase) || 0,
//     workExperience: Number(params.experienceYears) || 0,
//     activeProjectCount: Number(params.activeProjects) || 0,
//     licenseYear: Number(formValues.LicenseYear) || 0,
//     experienceSummery: params.summary || "",
//     traineSalary: Number(params.salary) || 0,
//     traineInsurnce: params.insurance === "social",
//     traineHoursByWeek: Number(params.weeklyHours) || 0,
//     traineeCertificate: params.traineeCertificate,
//     acceptanceCapacity: params.payloadTotalCapacity,
//     // ⚠️ Swagger: TraineeCapacity (نه assignedCapacity) و بدون minHoursByMonth
//     traineeCapacity: Number(params.allocatedCapacity) || 0,
//     userId: backend?.userId ?? "00000000-0000-0000-0000-000000000000",
//     cvFile: cvFile ?? undefined,
//   };
// }

// function validateBeforeSubmit(
//   payload: ReturnType<typeof buildSupervisorRealPayload>
// ): string | null {
//   if (!payload.firstName) return "نام الزامی است";
//   if (!payload.lastName) return "نام خانوادگی الزامی است";
//   if (!payload.nationalCode) return "کد ملی الزامی است";
//   if (!payload.licenseNumber) return "شماره پروانه الزامی است";
//   if (payload.workExperience <= 0) return "سابقه کار باید بزرگتر از ۰ باشد";
//   if (payload.field <= 0) return "رشته فعالیت الزامی است";
//   if (payload.licenseBase <= 0) return "پایه پروانه الزامی است";
//   if (payload.licenseYear <= 0) return "سال صدور پروانه الزامی است";
//   if (payload.competenceList.length === 0)
//     return "حداقل یک صلاحیت انتخاب کنید";
//   if (payload.traineSalary <= 0) return "حقوق ماهانه الزامی است";
//   if (payload.traineHoursByWeek <= 0) return "ساعات حضور هفتگی الزامی است";
//   if (payload.acceptanceCapacity <= 0) return "ظرفیت پذیرش الزامی است";
//   if (payload.assignedCapacity <= 1)
//     return "سقف پذیرش من باید حداقل ۲ باشد";
//   if (payload.minHoursByMonth <= 0) return "حداقل ساعت ماهانه الزامی است";
//   return null;
// }

// /** payload حقوقی — مطابق POST /api/Supervisor/LegalRegistration */
// function buildSupervisorLegalPayload(params: BuildPayloadParams) {
//   const { formValues, fields, qualifications, backend } = params;

//   const activeFields = fields.filter((f) => f.active);
//   const activeQuals = qualifications.filter((q) => q.active);

//   return {
//     fldMemberId: backend?.fldMemberId ?? 0,
//     memberId: backend?.memberId ?? "00000000-0000-0000-0000-000000000000",
//     id: backend?.id ?? 0,
//     name: (formValues.CompanyName ?? "").trim(),
//     licenseNumber: formValues.LicenseNumber ?? "",
//     nationalId: toEnglishDigits(formValues.NationalCode ?? ""),
//     registerDate: isoToPersian(formValues.Birthday),
//     registerPlace: formValues.Birthplace ?? "",
//     phoneNumber: toEnglishDigits(formValues.PhoneNumber ?? ""),
//     nezamRegisterCode: formValues.NezamRegisterCode ?? "",
//     address: formValues.Address ?? "",
//     fieldList: activeFields
//       .map((f) => Number(f.value))
//       .filter((n) => !Number.isNaN(n) && n > 0),
//     competenceList: activeQuals
//       .map((q) => Number(q.value))
//       .filter((n) => !Number.isNaN(n) && n > 0),
//     licenseBase: Number(formValues.LicenseBase) || 0,
//     workExperience: Number(params.experienceYears) || 0,
//     activeProjectCount: Number(params.activeProjects) || 0,
//     licenseYear: Number(formValues.LicenseYear) || 0,
//     experienceSummery: params.summary || "",
//     traineSalary: Number(params.salary) || 0,
//     traineInsurnce: params.insurance === "social",
//     traineHoursByWeek: Number(params.weeklyHours) || 0,
//     traineeCertificate: params.traineeCertificate,
//     acceptanceCapacity: params.payloadTotalCapacity,
//     assignedCapacity: Number(params.allocatedCapacity) || 0,
//     minHoursByMonth: Number(params.minMonthlyHours) || 0,
//     userId: backend?.userId ?? "00000000-0000-0000-0000-000000000000",
//   };
// }

// function validateLegalBeforeSubmit(
//   payload: ReturnType<typeof buildSupervisorLegalPayload>
// ): string | null {
//   if (!payload.name) return "نام شرکت / موسسه الزامی است";
//   if (!payload.nationalId) return "شناسه ملی الزامی است";
//   if (!payload.licenseNumber) return "شماره پروانه الزامی است";
//   if (!payload.registerDate) return "تاریخ ثبت الزامی است";
//   if (!payload.registerPlace) return "محل ثبت الزامی است";
//   if (payload.workExperience <= 0) return "سابقه کار باید بزرگتر از ۰ باشد";
//   if (payload.fieldList.length === 0) return "حداقل یک رشته فعالیت انتخاب کنید";
//   if (payload.licenseBase <= 0) return "پایه پروانه الزامی است";
//   if (payload.licenseYear <= 0) return "سال صدور پروانه الزامی است";
//   if (payload.competenceList.length === 0)
//     return "حداقل یک صلاحیت انتخاب کنید";
//   if (payload.traineSalary <= 0) return "حقوق ماهانه الزامی است";
//   if (payload.traineHoursByWeek <= 0) return "ساعات حضور هفتگی الزامی است";
//   if (payload.acceptanceCapacity <= 0) return "ظرفیت پذیرش الزامی است";
//   if (payload.assignedCapacity <= 1)
//     return "سقف پذیرش من باید حداقل ۲ باشد";
//   if (payload.minHoursByMonth <= 0) return "حداقل ساعت ماهانه الزامی است";
//   return null;
// }

// /* ============================================================
//    6) UI Sub-Components
//    ============================================================ */

// const labelClassName = "text-2xs font-semibold text-neutral-900";

// function ChipGroup({
//   label,
//   options,
//   items,
//   onChange,
//   multiple,
// }: {
//   label: string;
//   options: { label: string; value: string }[];
//   items: Item[];
//   onChange: (items: Item[]) => void;
//   multiple: boolean;
// }) {
//   const isSelected = (value: string) => items.some((i) => i.value === value);

//   const handleClick = (value: string) => {
//     if (isSelected(value)) {
//       onChange(items.filter((i) => i.value !== value));
//     } else if (multiple) {
//       onChange([...items, { value, active: true }]);
//     } else {
//       onChange([{ value, active: true }]);
//     }
//   };

//   return (
//     <div className="w-full">
//       <span className={cn(labelClassName, "mb-3 block")}>{label}</span>
//       <div className="flex flex-wrap gap-2">
//         {options.map((option) => {
//           const selected = isSelected(option.value);
//           return (
//             <button
//               key={option.value}
//               type="button"
//               aria-pressed={selected}
//               onClick={() => handleClick(option.value)}
//               className={cn(
//                 "h-9 rounded-lg border px-4 text-2xs transition-colors",
//                 selected
//                   ? "border-input-800 bg-input-800 font-semibold text-white"
//                   : "border-neutral-200 bg-neutral-50 text-neutral-900 hover:bg-neutral-100"
//               )}
//             >
//               {option.label}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function ActivationRow({
//   title,
//   active,
//   onToggle,
// }: {
//   title: string;
//   active: boolean;
//   onToggle: (next: boolean) => void;
// }) {
//   return (
//     <div className="flex items-center justify-between py-3">
//       <div className="flex items-center gap-3">
//         <span className="text-2xs font-semibold text-neutral-900">{title}</span>
//         <span
//           className={cn(
//             "flex h-5 items-center rounded-full border px-2 text-3xs",
//             active
//               ? "border-emerald-300 bg-emerald-100 text-emerald-800"
//               : "border-neutral-300 bg-neutral-100 text-neutral-600"
//           )}
//         >
//           {active ? "فعال" : "غیرفعال"}
//         </span>
//       </div>
//       <SwitchButton checked={active} onChange={onToggle} size="lg" />
//     </div>
//   );
// }

// function LicenseStatus({
//   stepNumber = "۲",
//   fields,
//   setFields,
//   qualifications,
//   setQualifications,
//   experienceYears,
//   setExperienceYears,
//   activeProjects,
//   setActiveProjects,
//   summary,
//   setSummary,
//   experienceYearsError,
//   multipleFields = false,
// }: {
//   multipleFields?: boolean;
//   stepNumber?: string;
//   fields: Item[];
//   setFields: (v: Item[]) => void;
//   qualifications: Item[];
//   setQualifications: (v: Item[]) => void;
//   experienceYears: string;
//   setExperienceYears: (v: string) => void;
//   activeProjects: string;
//   setActiveProjects: (v: string) => void;
//   summary: string;
//   setSummary: (v: string) => void;
//   experienceYearsError?: string;
// }) {
//   const labelOf = (options: { label: string; value: string }[], v: string) =>
//     options.find((o) => o.value === v)?.label ?? v;

//   const setActive = (
//     items: Item[],
//     setItems: (items: Item[]) => void,
//     value: string,
//     active: boolean
//   ) => setItems(items.map((i) => (i.value === value ? { ...i, active } : i)));

//   const hasSelection = fields.length > 0 || qualifications.length > 0;

//   return (
//     <div
//       dir="rtl"
//       className="w-full rounded-2xl border-2 border-neutral-200 bg-white p-5 shadow-xs sm:p-7"
//     >
//       <div className="mb-8 flex items-center gap-2">
//         <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef0f8] text-xs text-blue-800">
//           {stepNumber}
//         </span>
//         <h3 className="text-s font-semibold text-neutral-900">
//           رشته فعالیت، صلاحیت و سوابق
//         </h3>
//       </div>

//       <div className="flex flex-col gap-5">
//         <ChipGroup
//           label={
//             multipleFields ? "رشته‌های فعالیت (چند انتخابی)" : "رشتهٔ فعالیت"
//           }
//           options={fieldOptions}
//           items={fields}
//           onChange={setFields}
//           multiple={multipleFields}
//         />

//         <ChipGroup
//           label="صلاحیت‌ها (چند انتخابی)"
//           options={qualificationOptions}
//           items={qualifications}
//           onChange={setQualifications}
//           multiple
//         />

//         {hasSelection && (
//           <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-4">
//             <div className="flex items-center gap-2">
//               <Settings className="size-4 text-neutral-800" strokeWidth={1.75} />
//               <h4 className="text-2xs font-semibold text-neutral-900">
//                 مدیریت فعال‌سازی رشته‌ها و صلاحیت‌ها
//               </h4>
//             </div>
//             <p className="mt-2 text-3xs text-neutral-600">
//               با غیرفعال کردن یک رشته یا صلاحیت، درخواست کارآموزی جدید برای آن
//               رشته/صلاحیت برای شما قابل قبول نخواهد بود.
//             </p>

//             <div className="mt-2 divide-y divide-neutral-200">
//               {fields.map((item) => (
//                 <ActivationRow
//                   key={`field-${item.value}`}
//                   title={labelOf(fieldOptions, item.value)}
//                   active={item.active}
//                   onToggle={(next) =>
//                     setActive(fields, setFields, item.value, next)
//                   }
//                 />
//               ))}
//               {qualifications.map((item) => (
//                 <ActivationRow
//                   key={`qualification-${item.value}`}
//                   title={`صلاحیت ${labelOf(qualificationOptions, item.value)}`}
//                   active={item.active}
//                   onToggle={(next) =>
//                     setActive(
//                       qualifications,
//                       setQualifications,
//                       item.value,
//                       next
//                     )
//                   }
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           <div>
//             <Input
//               label="سابقه کار (سال)"
//               variant="default"
//               labelClassName={labelClassName}
//               className="mt-2"
//               inputSize="sm"
//               type="number"
//               min={1}
//               value={experienceYears}
//               onChange={(e) => setExperienceYears(e.target.value)}
//               error={!!experienceYearsError}
//               errorMessage={experienceYearsError}
//             />
//           </div>
//           <div>
//             <Input
//               label="تعداد پروژه فعال"
//               variant="default"
//               labelClassName={labelClassName}
//               className="mt-2"
//               inputSize="sm"
//               type="number"
//               min={0}
//               value={activeProjects}
//               onChange={(e) => setActiveProjects(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="w-full">
//           <label
//             htmlFor="experience-summary"
//             className={cn(labelClassName, "mb-2 block")}
//           >
//             خلاصه سوابق
//           </label>
//           <TextArea
//             id="experience-summary"
//             variant="default"
//             rounded="xl"
//             rows={3}
//             value={summary}
//             onChange={(e) => setSummary(e.target.value)}
//             placeholder="خلاصه‌ای از سوابق حرفه‌ای..."
//             className="min-h-0 text-xs"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// function RegistrationConditions({
//   salary,
//   setSalary,
//   insurance,
//   setInsurance,
//   weeklyHours,
//   setWeeklyHours,
//   traineeCertificate,
//   setTraineeCertificate,
//   stepNumber = "۴",
// }: {
//   salary: string;
//   setSalary: (v: string) => void;
//   insurance: "social" | "none";
//   setInsurance: (v: "social" | "none") => void;
//   weeklyHours: string;
//   setWeeklyHours: (v: string) => void;
//   traineeCertificate: boolean;
//   setTraineeCertificate: (v: boolean) => void;
//   stepNumber?: string;
// }) {
//   return (
//     <div
//       dir="rtl"
//       className="flex w-full flex-col gap-5 rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6 bg-white"
//     >
//       <div className="flex items-center mb-7 gap-2 justify-between w-full">
//         <div className="flex justify-center items-center gap-2">
//           <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
//             {stepNumber}
//           </span>
//           <h3 className="text-s font-bold text-gray-800">شرایط پذیرش کارآموز</h3>
//         </div>
//         <div>
//           <span className="px-2 bg-blue-100 text-2xs py-1 rounded-full text-input-900">
//             قابل ویرایش همیشگی
//           </span>
//         </div>
//       </div>

//       <div className="w-full flex flex-col gap-5">
//         <div className="w-full flex flex-col md:flex-row justify-start items-stretch md:items-end gap-4">
//           <div className="w-full md:w-96">
//             <Input
//               label="حقوق ماهانه (تومان)"
//               variant="default"
//               labelClassName="mb-2 text-xs"
//               inputSize="sm"
//               inputMode="numeric"
//               isPrice
//               value={salary}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                 setSalary(onlyDigits(e.target.value))
//               }
//             />
//           </div>
//           <div className="w-full md:w-auto">
//             <span className="text-2xs font-semibold text-gray-900">بیمه</span>
//             <Select
//               className="text-nowrap text-xs"
//               placeholder="انتخاب بیمه"
//               options={insuranceOptions}
//               value={insurance}
//               onChange={(v) => setInsurance(v as "social" | "none")}
//             />
//           </div>
//         </div>

//         <div className="w-full flex flex-col md:flex-row justify-start items-stretch md:items-end gap-4">
//           <div className="w-full md:w-1/2">
//             <Input
//               label="ساعات حضور هفتگی"
//               variant="default"
//               labelClassName="mb-2 text-xs"
//               inputSize="sm"
//               inputMode="numeric"
//               value={weeklyHours}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                 setWeeklyHours(onlyDigits(e.target.value))
//               }
//             />
//           </div>
//           <div className="w-full md:w-1/2">
//             <label className="flex items-center gap-2 cursor-pointer select-none">
//               <input
//                 type="checkbox"
//                 checked={traineeCertificate}
//                 onChange={(e) => setTraineeCertificate(e.target.checked)}
//                 className="w-4 h-4"
//               />
//               <span className="text-2xs font-semibold text-gray-900">
//                 گواهی پایان دوره صادر می‌شود
//               </span>
//             </label>
//           </div>
//         </div>
//       </div>

//       <div className="w-full flex justify-start items-center gap-2 p-3 rounded-lg bg-blue-50 border-r-4 border-blue-500 text-blue-900 text-xs">
//         <span>⚙️</span>
//         <span>
//           این بخش در هر زمان پس از ثبت نیز قابل ویرایش است. تغییرات به همه
//           کارآموزان فعال اطلاع‌رسانی خواهد شد.
//         </span>
//       </div>
//     </div>
//   );
// }

// function CommitmentAgreement({
//   stepNumber = "۵",
//   supervisorName,
//   licenseNumber,
//   displayTotalCapacity,
//   allocatedCapacity,
//   setAllocatedCapacity,
//   minMonthlyHours,
//   setMinMonthlyHours,
//   isSubmitting = false,
//   onSubmit,
// }: {
//   stepNumber?: string;
//   supervisorName?: string;
//   licenseNumber?: string;
//   displayTotalCapacity: number;
//   allocatedCapacity: string;
//   setAllocatedCapacity: (v: string) => void;
//   minMonthlyHours: string;
//   setMinMonthlyHours: (v: string) => void;
//   isSubmitting?: boolean;
//   onSubmit?: () => void;
// }) {
//   const [accepted, setAccepted] = useState(false);
//   const [capacityError, setCapacityError] = useState<string | undefined>();

//   const MAX_ALLOCATED = Math.max(displayTotalCapacity, MIN_ALLOCATED_CAPACITY);

//   useEffect(() => {
//     if (allocatedCapacity === "") return;
//     const clamped = Math.min(
//       Math.max(Number(allocatedCapacity) || 0, MIN_ALLOCATED_CAPACITY),
//       MAX_ALLOCATED
//     );
//     if (String(clamped) !== allocatedCapacity) {
//       setAllocatedCapacity(String(clamped));
//     }
//   }, [MAX_ALLOCATED, allocatedCapacity, setAllocatedCapacity]);

//   const handleAllocatedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const digits = onlyDigits(e.target.value);
//     if (digits === "") {
//       setAllocatedCapacity("");
//       setCapacityError("سقف پذیرش من الزامی است");
//       return;
//     }
//     const n = Number(digits);
//     if (n < MIN_ALLOCATED_CAPACITY) {
//       setCapacityError(
//         `سقف پذیرش من باید حداقل ${MIN_ALLOCATED_CAPACITY} باشد`
//       );
//     } else if (n > MAX_ALLOCATED) {
//       setCapacityError(
//         `سقف پذیرش من نمی‌تواند بیشتر از ${MAX_ALLOCATED} باشد`
//       );
//     } else {
//       setCapacityError(undefined);
//     }
//     setAllocatedCapacity(String(Math.min(n, MAX_ALLOCATED)));
//   };

//   return (
//     <div
//       dir="rtl"
//       className="w-full rounded-2xl border-2 shadow-xs border-neutral-200 bg-white p-5 sm:p-6"
//     >
//       <div className="flex items-center gap-2 mb-8">
//         <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
//           {stepNumber}
//         </span>
//         <h3 className="text-s font-bold text-gray-800">
//           ظرفیت پذیرش و تعهد سرپرستی
//         </h3>
//       </div>

//       <div className="flex flex-col">
//         <div className="w-full flex flex-col md:flex-row justify-center items-stretch md:items-center gap-3 mb-5">
//           <div className="w-full md:w-1/3">
//             <Input
//               label="ظرفیت کل پذیرش"
//               variant="default"
//               labelClassName="mb-2 text-xs"
//               inputSize="sm"
//               value={String(displayTotalCapacity)}
//               readOnly
//               disabled
//             />
//           </div>
//           <div className="w-full md:w-1/3">
//             <Input
//               label="سقف پذیرش من"
//               variant="default"
//               labelClassName="mb-2 text-xs"
//               inputSize="sm"
//               inputMode="numeric"
//               value={allocatedCapacity}
//               onChange={handleAllocatedChange}
//               error={!!capacityError}
//               errorMessage={capacityError}
//             />
//             <p className="mt-1 text-3xs text-neutral-500">
//               حداقل {MIN_ALLOCATED_CAPACITY} و حداکثر {MAX_ALLOCATED}
//             </p>
//           </div>
//           <div className="w-full md:w-1/3">
//             <Input
//               label="حداقل ساعت ماهانه"
//               variant="default"
//               labelClassName="mb-2 text-xs"
//               inputSize="sm"
//               inputMode="numeric"
//               value={minMonthlyHours}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                 setMinMonthlyHours(onlyDigits(e.target.value))
//               }
//             />
//           </div>
//         </div>

//         <div className="rounded-xl border-r-5 border-input-800 bg-slate-50 px-4 py-4 mb-2">
//           <h4 className="text-xs font-bold text-neutral-800 mb-2">
//             متن تعهدنامه سرپرستی
//           </h4>
//           <p className="text-[11.5px] leading-6 text-gray-700 text-justify">
//             اینجانب {supervisorName || "..............."} با شماره پروانه{" "}
//             {licenseNumber || "..............."} متعهد می‌شوم که نظارت فنی و
//             تخصصی بر کارآموزان زیر نظر خود را به‌طور مستمر انجام دهم،
//             گزارش‌های ماهانه را در مهلت ۷ روز بررسی و تأیید/رد نمایم و در جلسات
//             توجیهی سازمان حضور فعال داشته باشم. در غیر این صورت، سازمان نظام
//             مهندسی تهران می‌تواند صلاحیت سرپرستی مرا معلق یا لغو نماید.
//           </p>

//           <div className="border-t border-neutral-300 mt-4 pt-3">
//             <p className="text-2xs leading-6 text-neutral-600">
//               <span className="font-bold text-neutral-800">بند ظرفیت: </span>
//               ظرفیت پذیرش کارآموز توسط سازمان تعیین می‌شود و سرپرست متعهد
//               می‌گردد از سقف تعیین‌شده فراتر نرود.
//             </p>
//           </div>
//         </div>

//         <div className="flex mt-2 justify-start items-start md:items-center gap-2 mb-5">
//           <input
//             id="commitment-accepted"
//             type="checkbox"
//             className="w-4 h-4 mt-0.5 md:mt-0 shrink-0"
//             checked={accepted}
//             onChange={(e) => setAccepted(e.target.checked)}
//           />
//           <label
//             htmlFor="commitment-accepted"
//             className="text-[11.5px] font-medium text-neutral-950 cursor-pointer"
//           >
//             مسئولیت تعهدنامه را می‌پذیرم.
//           </label>
//         </div>

//         <div className="flex flex-col md:flex-row items-stretch md:items-center justify-start gap-3">
//           <Button
//             type="button"
//             variant="solid"
//             color="input"
//             className="text-sm w-full md:w-auto"
//             size="xs"
//             rounded="lg"
//             disabled={!accepted || isSubmitting || !!capacityError}
//             onClick={onSubmit}
//           >
//             {isSubmitting ? "در حال ارسال..." : "ارسال درخواست ثبت‌نام سرپرستی"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const MAX_FILE_SIZE = 5 * 1024 * 1024;
// const formatSize = (bytes: number) =>
//   bytes >= 1024 * 1024
//     ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
//     : `${Math.max(1, Math.round(bytes / 1024))} KB`;

// function ResumeUploader({
//   initialResume = null,
//   onChange,
// }: {
//   initialResume?: ResumeFile | null;
//   onChange?: (resume: ResumeFile | null, file?: File) => void;
// }) {
//   const [resume, setResume] = useState<ResumeFile | null>(initialResume);
//   const [isDragging, setIsDragging] = useState(false);
//   const [error, setError] = useState("");
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const urlRef = useRef<string | undefined>(undefined);

//   useEffect(() => {
//     return () => {
//       if (urlRef.current) URL.revokeObjectURL(urlRef.current);
//     };
//   }, []);

//   const handleFile = (file: File | undefined) => {
//     if (!file) return;
//     if (file.type !== "application/pdf") {
//       setError("فقط فایل PDF مجاز است.");
//       return;
//     }
//     if (file.size > MAX_FILE_SIZE) {
//       setError("حجم فایل نباید بیشتر از ۵ مگابایت باشد.");
//       return;
//     }
//     if (urlRef.current) URL.revokeObjectURL(urlRef.current);
//     const url = URL.createObjectURL(file);
//     urlRef.current = url;

//     const newResume: ResumeFile = {
//       name: file.name,
//       size: file.size,
//       uploadedAt: new Date().toLocaleDateString("fa-IR", {
//         year: "numeric",
//         month: "2-digit",
//         day: "2-digit",
//       }),
//       url,
//     };

//     setError("");
//     setResume(newResume);
//     onChange?.(newResume, file);
//   };

//   const handleDelete = () => {
//     if (urlRef.current) URL.revokeObjectURL(urlRef.current);
//     urlRef.current = undefined;
//     setResume(null);
//     setError("");
//     onChange?.(null);
//   };

//   return (
//     <div
//       dir="rtl"
//       className="w-full flex flex-col gap-4 mt-4 rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6 bg-white"
//     >
//       <div className="flex justify-start items-center gap-2 text-sm font-bold text-black mb-4">
//         <ArrowUpToLine size={18} />
//         <span>فایل رزومه</span>
//       </div>

//       {resume && (
//         <div className="w-full flex items-center justify-between gap-3 p-3 rounded-lg border border-neutral-200 bg-neutral-50">
//           <div className="flex items-center gap-2 min-w-0">
//             <FileText size={18} className="text-neutral-600 shrink-0" />
//             <div className="min-w-0">
//               <p className="text-xs font-semibold text-neutral-900 truncate">
//                 {resume.name}
//               </p>
//               <p className="text-3xs text-neutral-500">
//                 {formatSize(resume.size)} · {resume.uploadedAt}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3 shrink-0">
//             {resume.url && (
//               <button
//                 type="button"
//                 onClick={() => window.open(resume.url, "_blank")}
//                 className="cursor-pointer"
//                 aria-label="مشاهده رزومه"
//               >
//                 <Eye size={17} />
//               </button>
//             )}
//             <button
//               type="button"
//               onClick={handleDelete}
//               className="cursor-pointer"
//               aria-label="حذف رزومه"
//             >
//               <Trash2 size={17} color="red" />
//             </button>
//           </div>
//         </div>
//       )}

//       <div
//         onDragOver={(e) => {
//           e.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragLeave={() => setIsDragging(false)}
//         onDrop={(e) => {
//           e.preventDefault();
//           setIsDragging(false);
//           handleFile(e.dataTransfer.files?.[0]);
//         }}
//         className={`w-full flex flex-col justify-center items-center gap-3 py-8 rounded-xl border-2 border-dashed transition-all duration-300 ${
//           isDragging
//             ? "border-input-700 bg-input-50"
//             : "border-neutral-300 bg-white"
//         }`}
//       >
//         <Upload size={36} className="text-neutral-500" />
//         <p className="text-xs text-neutral-500">
//           {resume
//             ? "برای جایگزینی رزومه، فایل PDF جدید را اینجا رها کنید"
//             : "فایل PDF رزومه را اینجا رها کنید"}
//         </p>
//         <button
//           type="button"
//           onClick={() => fileInputRef.current?.click()}
//           className="px-4 py-2 text-xs font-bold border border-neutral-300 rounded-lg bg-neutral-50 cursor-pointer hover:bg-neutral-100 transition-all duration-300"
//         >
//           انتخاب فایل
//         </button>
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept="application/pdf"
//           className="hidden"
//           onChange={(e) => {
//             handleFile(e.target.files?.[0]);
//             e.target.value = "";
//           }}
//         />
//         {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
//       </div>

//       <div className="w-full flex justify-start items-center gap-2 p-3 rounded-lg bg-amber-50 border-r-4 border-amber-500 text-amber-800 text-xs">
//         <TriangleAlert size={14} />
//         <span>
//           فایل رزومه برای کارآموزان در زمان انتخاب سرپرست قابل مشاهده خواهد بود.
//         </span>
//       </div>
//     </div>
//   );
// }

// /* ============================================================
//    7) PersonalInfoForm
//    ============================================================ */

// interface PersonalInfoFormSubmitState {
//   formValues: FormValues;
//   userType: UserType;
//   fields: Item[];
//   qualifications: Item[];
//   experienceYears: string;
//   activeProjects: string;
//   summary: string;
//   salary: string;
//   insurance: "social" | "none";
//   weeklyHours: string;
//   traineeCertificate: boolean;
//   allocatedCapacity: string;
//   minMonthlyHours: string;
//   payloadTotalCapacity: number;
//   resume: ResumeFile | null;
//   resumeFile: File | null;
// }

// interface PersonalInfoFormProps {
//   stepNumber?: string;
//   userType: UserType;
//   onUserTypeChange: (t: UserType) => void;
//   backendData?: any | null;
//   isTabLoading?: boolean;
//   isSubmitting?: boolean;
//   onSubmit?: (state: PersonalInfoFormSubmitState) => void;
// }

// function PersonalInfoForm({
//   stepNumber = "۱",
//   userType,
//   onUserTypeChange,
//   backendData,
//   isTabLoading = false,
//   isSubmitting = false,
//   onSubmit,
// }: PersonalInfoFormProps) {
//   const yesterday = useMemo(() => getYesterday(), []);
//   const isUser = userType === "User";

//   const [fields, setFields] = useState<Item[]>([]);
//   const [qualifications, setQualifications] = useState<Item[]>([]);
//   const [experienceYears, setExperienceYears] = useState("");
//   const [activeProjects, setActiveProjects] = useState("");
//   const [summary, setSummary] = useState("");
//   const [salary, setSalary] = useState("");
//   const [insurance, setInsurance] = useState<"social" | "none">("none");
//   const [weeklyHours, setWeeklyHours] = useState("");
//   const [traineeCertificate, setTraineeCertificate] = useState(false);
//   const [allocatedCapacity, setAllocatedCapacity] = useState("");
//   const [minMonthlyHours, setMinMonthlyHours] = useState("");
//   const [resume, setResume] = useState<ResumeFile | null>(null);
//   const [resumeFile, setResumeFile] = useState<File | null>(null);
//   const [experienceYearsError, setExperienceYearsError] = useState<
//     string | undefined
//   >(undefined);

//   // با تغییر دیتای بک‌اند (یا تعویض تب) state های مستقل از Formik را همگام کن
//   useEffect(() => {
//     const license = realInfoToLicenseStatus(backendData);
//     setFields(license.fields);
//     setQualifications(license.qualifications);
//     setExperienceYears(license.experienceYears);
//     setActiveProjects(license.activeProjects);
//     setSummary(license.summary);

//     const reg = realInfoToRegistrationConditions(backendData);
//     setSalary(reg.salary);
//     setInsurance(reg.insurance);
//     setWeeklyHours(reg.weeklyHours);
//     setTraineeCertificate(reg.traineeCertificate);

//     const commit = realInfoToCommitment(backendData);
//     setAllocatedCapacity(commit.allocatedCapacity);
//     setMinMonthlyHours(commit.minMonthlyHours);
//   }, [backendData]);

//   const dynamicInitial = useMemo<FormValues>(() => {
//     if (!backendData) return { ...emptyForm };
//     return isUser
//       ? realInfoToFormValues(backendData)
//       : legalInfoToFormValues(backendData);
//   }, [backendData, isUser]);

//   const commitment = useMemo(
//     () =>
//       realInfoToCommitment(
//         backendData,
//         TOTAL_CAPACITY_BY_USER_TYPE[userType]
//       ),
//     [backendData, userType]
//   );

//   return (
//     <Formik
//       enableReinitialize
//       initialValues={dynamicInitial}
//       validationSchema={isUser ? userSchema : legalSchema}
//       onSubmit={(values) => {
//         if (!experienceYears || Number(experienceYears) <= 0) {
//           setExperienceYearsError("سابقه کار باید حداقل ۱ سال باشد");
//           return;
//         }
//         setExperienceYearsError(undefined);

//         // 🔽 گارد نهایی: کد ملی باید با نوع شخص همخوانی داشته باشد
//         const digits = onlyDigits(values.NationalCode ?? "");
//         const typeFromCode = userTypeFromNationalCode(digits);
//         if (typeFromCode === null) {
//           return; // پیام خطای فیلد توسط Yup نمایش داده می‌شود
//         }
//         if (typeFromCode !== userType) {
//           return;
//         }
//         // 🔼

//         onSubmit?.({
//           formValues: values,
//           userType,
//           fields,
//           qualifications,
//           experienceYears,
//           activeProjects,
//           summary,
//           salary,
//           insurance,
//           weeklyHours,
//           traineeCertificate,
//           allocatedCapacity,
//           minMonthlyHours,
//           payloadTotalCapacity: commitment.payloadTotalCapacity,
//           resume,
//           resumeFile,
//         });
//       }}
//     >
//       {({
//         getFieldProps,
//         errors,
//         touched,
//         values,
//         setFieldValue,
//         setFieldTouched,
//         handleSubmit,
//         submitCount,
//       }) => {
//         const f = (name: keyof FormValues) => ({
//           name,
//           field: getFieldProps(name),
//           error: !!(touched[name] && errors[name]),
//           errorMessage: errors[name] as string | undefined,
//         });

//         const errorList = Object.values(errors).filter(Boolean) as string[];

//         // 🔽 تشخیص خودکار نوع شخص بر اساس طول کد ملی
//         const nationalCodeDigits = onlyDigits(values.NationalCode ?? "");
//         const nationalCodeLength = nationalCodeDigits.length;
//         const detectedType = userTypeFromNationalCode(nationalCodeDigits);
//         // 🔼

//         return (
//           <Form
//             onSubmit={handleSubmit}
//             onKeyDown={(e) => {
//               if (
//                 e.key === "Enter" &&
//                 (e.target as HTMLElement).tagName === "INPUT"
//               ) {
//                 e.preventDefault();
//               }
//             }}
//             className={cn(
//               "w-full flex flex-col justify-center items-center gap-4",
//               isTabLoading && "pointer-events-none opacity-60"
//             )}
//           >
//             {isTabLoading && (
//               <div
//                 dir="rtl"
//                 className="w-full rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800"
//               >
//                 در حال دریافت اطلاعات...
//               </div>
//             )}

//             {/* Card 1: اطلاعات هویتی */}
//             <div className="w-full rounded-2xl border-2 shadow-xs border-neutral-200 sm:p-6 bg-white px-8 py-7">
//               <div className="w-full flex justify-between items-center">
//                 <div className="flex items-center gap-2">
//                   <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef0f8] text-xs text-blue-800">
//                     {stepNumber}
//                   </span>
//                   <span className="text-s font-semibold text-neutral-900">
//                     نوع شخص و اطلاعات هویتی
//                   </span>
//                 </div>
//                 <div className="text-xs bg-neutral-100 text-neutral-500 border border-neutral-300 p-1 px-3 rounded-xl">
//                   <span>الزامی</span>
//                 </div>
//               </div>

//               <div className="mt-8">
//                 <div className="w-full flex justify-start items-start flex-col gap-3 text-sm">
//                   <p className="text-3xs text-black font-bold">نوع شخص</p>
//                   <div className="w-full flex justify-center items-center gap-3">
//                     {usersType.map((item) => {
//                       const disabled =
//                         (nationalCodeLength === 10 && item.type === "legal") ||
//                         (nationalCodeLength === 11 && item.type === "User");

//                       return (
//                         <button
//                           key={item.id}
//                           type="button"
//                           disabled={disabled}
//                           onClick={() => onUserTypeChange(item.type)}
//                           className={cn(
//                             "w-1/2 h-11 flex justify-center items-center text-center border rounded-lg text-xs p-2 transition-all duration-300",
//                             userType === item.type
//                               ? "border-blue-700 bg-blue-700 text-white"
//                               : "border-neutral-300 hover:bg-blue-300 hover:text-white",
//                             disabled &&
//                               "opacity-40 cursor-not-allowed hover:bg-transparent hover:text-inherit"
//                           )}
//                         >
//                           <p>{item.title}</p>
//                         </button>
//                       );
//                     })}
//                   </div>

//                   {/* پیام راهنمای نوع شخص بر اساس طول کد ملی */}
//                   {nationalCodeLength > 0 &&
//                     nationalCodeLength !== 10 &&
//                     nationalCodeLength !== 11 && (
//                       <p className="text-3xs text-amber-700">
//                         کد ملی باید ۱۰ رقم (شخص حقیقی) یا ۱۱ رقم (شخص حقوقی)
//                         باشد.
//                       </p>
//                     )}
//                   {nationalCodeLength === 10 && (
//                     <p className="text-3xs text-blue-700">
//                       نوع شخص به‌صورت خودکار «حقیقی» انتخاب شد (کد ملی ۱۰ رقمی).
//                     </p>
//                   )}
//                   {nationalCodeLength === 11 && (
//                     <p className="text-3xs text-blue-700">
//                       نوع شخص به‌صورت خودکار «حقوقی» انتخاب شد (شناسه ملی ۱۱
//                       رقمی).
//                     </p>
//                   )}
//                 </div>

//                 <div className="mt-4 flex flex-col gap-5">
//                   <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4">
//                     <div className="w-full md:w-2/3">
//                       {isUser ? (
//                         <Input
//                           key="FullName"
//                           label="نام و نام خانوادگی"
//                           variant="default"
//                           labelClassName="mb-2 text-xs"
//                           placeholder="مثال: علی رضایی"
//                           inputSize="sm"
//                           {...f("FullName")}
//                         />
//                       ) : (
//                         <Input
//                           key="CompanyName"
//                           label="نام شرکت / موسسه"
//                           variant="default"
//                           labelClassName="mb-2 text-xs"
//                           placeholder="مثال: شرکت مهندسین مشاور"
//                           inputSize="sm"
//                           {...f("CompanyName")}
//                         />
//                       )}
//                     </div>
//                     <div className="w-full md:w-1/3">
//                       <Input
//                         label="شماره پروانه اشتغال"
//                         variant="default"
//                         labelClassName="mb-2 text-xs"
//                         placeholder="012345-6"
//                         inputSize="sm"
//                         {...f("LicenseNumber")}
//                       />
//                     </div>
//                   </div>

//                   <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3">
//                     <div className="w-full md:w-1/3">
//                       <Input
//                         label={isUser ? "کدملی" : "شناسه ملی"}
//                         variant="default"
//                         labelClassName="mb-2 text-xs"
//                         placeholder={isUser ? "0123456789" : "01234567890"}
//                         inputSize="sm"
//                         inputMode="numeric"
//                         maxLength={11}
//                         {...f("NationalCode")}
//                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                           const digits = onlyDigits(e.target.value);
//                           setFieldValue("NationalCode", digits, true);

//                           if (digits.length === 10 && userType !== "User") {
//                             onUserTypeChange("User");
//                           } else if (
//                             digits.length === 11 &&
//                             userType !== "legal"
//                           ) {
//                             onUserTypeChange("legal");
//                           }
//                         }}
//                       />
//                     </div>
//                     <div className="w-full md:w-1/3">
//                       <JalaliDatePicker
//                         label={isUser ? "تاریخ تولد" : "تاریخ تأسیس"}
//                         variant="default"
//                         labelClassName="mb-2 text-xs"
//                         placeholder="۱۳۷۰/۰۱/۰۱"
//                         inputSize="sm"
//                         name="Birthday"
//                         value={values.Birthday ?? ""}
//                         maxDate={yesterday}
//                         error={!!(touched.Birthday && errors.Birthday)}
//                         errorMessage={
//                           touched.Birthday ? errors.Birthday : undefined
//                         }
//                         onChange={(iso: string) => {
//                           setFieldTouched("Birthday", true, false);
//                           setFieldValue("Birthday", iso, true);
//                         }}
//                         onBlur={() => setFieldTouched("Birthday", true, false)}
//                       />
//                     </div>
//                     <div className="w-full md:w-1/3">
//                       <Input
//                         label={isUser ? "محل تولد" : "محل شرکت"}
//                         variant="default"
//                         labelClassName="mb-2 text-xs"
//                         placeholder="تهران"
//                         inputSize="sm"
//                         {...f("Birthplace")}
//                       />
//                     </div>
//                   </div>

//                   <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3">
//                     <div className="w-full md:w-1/3">
//                       <Input
//                         label="شماره تماس"
//                         variant="default"
//                         labelClassName="mb-2 text-xs"
//                         placeholder="09123456789"
//                         inputSize="sm"
//                         inputMode="numeric"
//                         {...f("PhoneNumber")}
//                       />
//                     </div>
//                     <div className="w-full md:w-1/3">
//                       <Input
//                         label="شماره عضویت نظام مهندسی"
//                         variant="default"
//                         labelClassName="mb-2 text-xs"
//                         placeholder="98765"
//                         inputSize="sm"
//                         inputMode="numeric"
//                         {...f("NezamRegisterCode")}
//                       />
//                     </div>
//                     <div className="w-full md:w-1/3 flex gap-3">
//                       <div className="w-1/2">
//                         <Input
//                           label="پایه پروانه"
//                           variant="default"
//                           labelClassName="mb-2 text-xs"
//                           placeholder="۲"
//                           inputSize="sm"
//                           inputMode="numeric"
//                           {...f("LicenseBase")}
//                         />
//                       </div>
//                       <div className="w-1/2">
//                         <Input
//                           label="سال صدور پروانه"
//                           variant="default"
//                           labelClassName="mb-2 text-xs"
//                           placeholder="۱۴۰۰"
//                           inputSize="sm"
//                           inputMode="numeric"
//                           {...f("LicenseYear")}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="w-full">
//                     <Input
//                       label="آدرس"
//                       variant="default"
//                       labelClassName="mb-2 text-xs"
//                       placeholder="تهران، خیابان ..."
//                       inputSize="sm"
//                       {...f("Address")}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <LicenseStatus
//               multipleFields={!isUser}
//               fields={fields}
//               setFields={setFields}
//               qualifications={qualifications}
//               setQualifications={setQualifications}
//               experienceYears={experienceYears}
//               setExperienceYears={(v) => {
//                 setExperienceYears(v);
//                 if (Number(v) > 0) setExperienceYearsError(undefined);
//               }}
//               activeProjects={activeProjects}
//               setActiveProjects={setActiveProjects}
//               summary={summary}
//               setSummary={setSummary}
//               experienceYearsError={experienceYearsError}
//             />

//             <RegistrationConditions
//               salary={salary}
//               setSalary={setSalary}
//               insurance={insurance}
//               setInsurance={setInsurance}
//               weeklyHours={weeklyHours}
//               setWeeklyHours={setWeeklyHours}
//               traineeCertificate={traineeCertificate}
//               setTraineeCertificate={setTraineeCertificate}
//             />

//             {submitCount > 0 && errorList.length > 0 && (
//               <div
//                 dir="rtl"
//                 className="w-full rounded-xl border border-red-300 bg-red-50 p-4 text-xs text-red-800"
//               >
//                 <p className="mb-2 font-bold">لطفاً موارد زیر را اصلاح کنید:</p>
//                 <ul className="list-disc pr-5 space-y-1">
//                   {errorList.map((msg, i) => (
//                     <li key={i}>{msg}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <CommitmentAgreement
//               supervisorName={values.FullName || values.CompanyName}
//               licenseNumber={values.LicenseNumber}
//               displayTotalCapacity={commitment.displayTotalCapacity}
//               allocatedCapacity={allocatedCapacity}
//               setAllocatedCapacity={setAllocatedCapacity}
//               minMonthlyHours={minMonthlyHours}
//               setMinMonthlyHours={setMinMonthlyHours}
//               isSubmitting={isSubmitting}
//               onSubmit={handleSubmit}
//             />
//           </Form>
//         );
//       }}
//     </Formik>
//   );
// }

// /* ============================================================
//    8) LegalNotFound — حالت «اطلاعات حقوقی ثبت نشده»
//    ============================================================ */

// function LegalNotFound({ onBackToReal }: { onBackToReal: () => void }) {
//   return (
//     <div
//       dir="rtl"
//       className="w-full rounded-2xl border-2 border-neutral-200 bg-white px-6 py-14 shadow-xs sm:px-10"
//     >
//       <div className="mx-auto flex max-w-md flex-col items-center text-center">
//         <div className="relative mb-6">
//           <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#eef0f8]">
//             <Building2 className="size-11 text-blue-800" strokeWidth={1.5} />
//           </div>
//           <span className="absolute -bottom-1 -left-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-amber-100 text-amber-700">
//             <TriangleAlert size={16} />
//           </span>
//         </div>

//         <h2 className="text-sm font-bold text-neutral-900">
//           اطلاعات شخص حقوقی یافت نشد
//         </h2>

//         <p className="mt-3 text-xs leading-7 text-neutral-600">
//           برای حساب کاربری شما هنوز هیچ ثبت‌نام سرپرستی به‌عنوان شخص حقوقی
//           (شرکت / موسسه) انجام نشده است. می‌توانید به فرم شخص حقیقی بازگردید و
//           اطلاعات خود را تکمیل کنید.
//         </p>

//         <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">
//           <Button
//             type="button"
//             variant="solid"
//             color="input"
//             size="xs"
//             rounded="lg"
//             className="text-sm"
//             onClick={onBackToReal}
//           >
//             <span className="flex items-center justify-center gap-2">
//               <UserRound size={16} />
//               بازگشت به شخص حقیقی
//             </span>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ============================================================
//    9) SupervisorPage
//    ============================================================ */

// const isNotFound = (err: any) => err?.response?.status === 404;

// export default function SupervisorPage() {
//   const [userType, setUserType] = useState<UserType>("User");
//   const [clientError, setClientError] = useState<string | null>(null);

//   // حقیقی: همیشه فعال
//   const realQuery = useGetRealInfo();

//   // حقوقی: فقط وقتی روی تب «شخص حقوقی» کلیک شد درخواست می‌رود
//   const legalQuery = useGetLegalInfo({ enabled: userType === "legal" });

//   const { mutate: registerReal, isPending: isRealPending } =
//     useRegisterSupervisorReal();
//   const { mutate: registerLegal, isPending: isLegalPending } =
//     useRegisterSupervisorLegal();

//   const isLegalTab = userType === "legal";
//   const activeQuery = isLegalTab ? legalQuery : realQuery;

//   // ۴۰۴ یعنی کاربر جدید → backendData = null
//   const backendData = activeQuery.data?.data ?? null;

//   const activeError = activeQuery.error;
//   const hasRealError = !!activeError && !isNotFound(activeError);

//   // کاربر روی تب حقوقی زده ولی اطلاعات حقوقی ندارد (۴۰۴)
//   const legalNotFound =
//     isLegalTab && legalQuery.isError && isNotFound(legalQuery.error);

//   const handleUserTypeChange = (next: UserType) => {
//     setClientError(null);
//     setUserType(next);
//   };

//   const handleSubmit = (state: PersonalInfoFormSubmitState) => {
//     setClientError(null);

//     // 🔽 گارد نهایی نوع شخص بر اساس طول کد ملی
//     const digits = onlyDigits(state.formValues.NationalCode ?? "");
//     const typeFromCode = userTypeFromNationalCode(digits);

//     if (typeFromCode === null) {
//       setClientError(
//         "کد ملی باید ۱۰ رقم (شخص حقیقی) یا ۱۱ رقم (شخص حقوقی) باشد."
//       );
//       return;
//     }
//     if (typeFromCode !== state.userType) {
//       setClientError(
//         typeFromCode === "User"
//           ? "کد ملی ۱۰ رقمی است؛ ثبت‌نام باید به‌صورت شخص حقیقی انجام شود."
//           : "شناسه ملی ۱۱ رقمی است؛ ثبت‌نام باید به‌صورت شخص حقوقی انجام شود."
//       );
//       return;
//     }
//     // 🔼

//     if (state.userType === "legal") {
//       const payload = buildSupervisorLegalPayload({
//         formValues: state.formValues,
//         fields: state.fields,
//         qualifications: state.qualifications,
//         experienceYears: state.experienceYears,
//         activeProjects: state.activeProjects,
//         summary: state.summary,
//         salary: state.salary,
//         insurance: state.insurance,
//         weeklyHours: state.weeklyHours,
//         payloadTotalCapacity: state.payloadTotalCapacity,
//         allocatedCapacity: state.allocatedCapacity,
//         minMonthlyHours: state.minMonthlyHours,
//         traineeCertificate: state.traineeCertificate,
//         backend: backendData,
//       });

//       const validationError = validateLegalBeforeSubmit(payload);
//       if (validationError) {
//         setClientError(validationError);
//         return;
//       }

//       registerLegal(payload, {
//         onSuccess: () => {
//           legalQuery.refetch?.();
//         },
//         onError: (err: any) => {
//           const msg =
//             err?.response?.data?.message ||
//             "خطا در ثبت اطلاعات سرپرست حقوقی. لطفاً دوباره تلاش کنید.";
//           setClientError(msg);
//         },
//       });
//       return;
//     }

//     const payload = buildSupervisorRealPayload({
//       formValues: state.formValues,
//       fields: state.fields,
//       qualifications: state.qualifications,
//       experienceYears: state.experienceYears,
//       activeProjects: state.activeProjects,
//       summary: state.summary,
//       salary: state.salary,
//       insurance: state.insurance,
//       weeklyHours: state.weeklyHours,
//       payloadTotalCapacity: state.payloadTotalCapacity,
//       allocatedCapacity: state.allocatedCapacity,
//       minMonthlyHours: state.minMonthlyHours,
//       traineeCertificate: state.traineeCertificate,
//       backend: backendData,
//     });

//     const validationError = validateBeforeSubmit(payload);
//     if (validationError) {
//       setClientError(validationError);
//       return;
//     }

//     registerReal(payload, {
//       onSuccess: () => {
//         realQuery.refetch?.();
//       },
//       onError: (err: any) => {
//         const msg =
//           err?.response?.data?.message ||
//           "خطا در ثبت اطلاعات سرپرست. لطفاً دوباره تلاش کنید.";
//         setClientError(msg);
//       },
//     });
//   };

//   // فقط لود اولیه صفحه، کل صفحه را با Loading عوض می‌کند
//   if (realQuery.isLoading) return <Loading />;

//   return (
//     <div className="w-full px-4 md:px-7 py-6">
//       <div className="mx-auto flex w-full flex-col gap-5">
//         {clientError && (
//           <div
//             dir="rtl"
//             className="w-full rounded-xl border border-red-300 bg-red-50 p-4 text-xs text-red-800"
//           >
//             <p className="font-bold mb-1">خطا در ثبت اطلاعات:</p>
//             <p>{clientError}</p>
//           </div>
//         )}

//         {legalNotFound ? (
//           <LegalNotFound onBackToReal={() => handleUserTypeChange("User")} />
//         ) : (
//           <PersonalInfoForm
//             userType={userType}
//             onUserTypeChange={handleUserTypeChange}
//             backendData={backendData}
//             isTabLoading={isLegalTab && legalQuery.isLoading}
//             isSubmitting={isLegalTab ? isLegalPending : isRealPending}
//             onSubmit={handleSubmit}
//           />
//         )}
//       </div>
//     </div>
//   );
// // }
// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import { Form, Formik } from "formik";
// import * as Yup from "yup";
// import {
//   Settings,
//   Trash2,
//   Upload,
//   FileText,
//   Eye,
//   TriangleAlert,
//   ArrowUpToLine,
//   Building2,
//   UserRound,
// } from "lucide-react";

// import Loading from "@/app/components/Loading";
// import { Input, TextArea } from "@/app/components/ui/input";
// import { Button } from "@/app/components/ui/Button";
// import SwitchButton from "@/app/components/ui/Button/switchButton";
// import { Select } from "@/app/components/ui/input/SelectSilde";
// import { cn } from "@/lib/cn";
// import JalaliDatePicker from "@/lib/jalaliDatePicker";
// import { getYesterday, isValidISODate, toISODate } from "@/lib/date-utils";
// import { toGregorian, toJalaali } from "jalaali-js";
// import {
//   useRegisterSupervisorLegal,
//   useRegisterSupervisorReal,
// } from "@/core/services/supervisor/mutation";
// import {
//   useGetLegalInfo,
//   useGetRealInfo,
// } from "@/core/services/supervisor/queris";

// /* ============================================================
//    0) Types & Config
//    ============================================================ */

// export type UserType = "User" | "legal";

// const TOTAL_CAPACITY_BY_USER_TYPE: Record<UserType, number> = {
//   User: 3,
//   legal: 5,
// };

// /** حداقل مجاز برای سقف پذیرش من (بک‌اند: باید > 1 باشد) */
// const MIN_ALLOCATED_CAPACITY = 2;

// interface Item {
//   value: string;
//   active: boolean;
// }

// interface ResumeFile {
//   name: string;
//   size: number;
//   uploadedAt: string;
//   url?: string;
// }

// interface FormValues {
//   FullName: string;
//   CompanyName: string;
//   LicenseNumber: string;
//   NationalCode: string;
//   Birthday: string;
//   Birthplace: string;
//   PhoneNumber: string;
//   Address: string;
//   NezamRegisterCode: string;
//   LicenseBase: string;
//   LicenseYear: string;
// }

// const emptyForm: FormValues = {
//   FullName: "",
//   CompanyName: "",
//   LicenseNumber: "",
//   NationalCode: "",
//   Birthday: "",
//   Birthplace: "",
//   PhoneNumber: "",
//   Address: "",
//   NezamRegisterCode: "",
//   LicenseBase: "",
//   LicenseYear: "",
// };

// const usersType: { id: number; title: string; type: UserType }[] = [
//   { id: 1, title: "شخص حقیقی", type: "User" },
//   { id: 2, title: "شخص حقوقی", type: "legal" },
// ];

// /* ============================================================
//    1) Enum نگاشت‌ها (مطابق بک‌اند)
//    ============================================================ */

// const fieldOptions: { label: string; value: string }[] = [
//   { label: "مهندسی مکانیک", value: "1" },
//   { label: "مهندسی برق", value: "2" },
//   { label: "مهندسی معماری", value: "4" },
//   { label: "مهندسی عمران", value: "5" },
//   { label: "شهرسازی", value: "6" },
//   { label: "نقشه‌برداری", value: "7" },
//   { label: "ترافیک", value: "8" },
//   { label: "جوش", value: "9" },
//   { label: "خاک و پی", value: "10" },
// ];

// const qualificationOptions: { label: string; value: string }[] = [
//   { label: "نظارت", value: "1" },
//   { label: "طراحی", value: "2" },
//   { label: "مجری", value: "3" },
//   { label: "آزمایشگاه", value: "4" },
// ];

// const insuranceOptions = [
//   { value: "social", label: "بیمه تأمین اجتماعی" },
//   { value: "none", label: "بدون بیمه" },
// ];

// /* ============================================================
//    2) Helpers — Date / Digits / NationalCode
//    ============================================================ */

// const persianToISO = (val: string | null | undefined): string => {
//   if (!val) return "";
//   const m = String(val).match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
//   if (!m) return "";
//   const [, y, mo, d] = m;
//   const year = Number(y);
//   if (year > 1900) {
//     return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
//   }
//   const g = toGregorian(year, Number(mo), Number(d));
//   return `${g.gy}-${String(g.gm).padStart(2, "0")}-${String(g.gd).padStart(2, "0")}`;
// };

// const isoToPersian = (iso: string | null | undefined): string => {
//   if (!iso) return "";
//   const m = String(iso).match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
//   if (!m) return "";
//   const [, y, mo, d] = m;
//   const gy = Number(y);
//   if (gy < 1900) return iso;
//   const j = toJalaali(gy, Number(mo), Number(d));
//   return `${j.jy}/${String(j.jm).padStart(2, "0")}/${String(j.jd).padStart(2, "0")}`;
// };

// const toEnglishDigits = (value: string) =>
//   value
//     .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
//     .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

// const onlyDigits = (value: string) => toEnglishDigits(value).replace(/\D/g, "");

// /** ۱۰ رقم → حقیقی، ۱۱ رقم → حقوقی، در غیر این صورت null */
// function userTypeFromNationalCode(raw: string): UserType | null {
//   const digits = onlyDigits(raw ?? "");
//   if (digits.length === 10) return "User";
//   if (digits.length === 11) return "legal";
//   return null;
// }

// /* ============================================================
//    3) Validation schema
//    ============================================================ */

// const pastDate = (label: string) =>
//   Yup.string()
//     .trim()
//     .required(`${label} الزامی است`)
//     .test("is-past-date", `${label} باید قبل از امروز باشد`, (value) => {
//       if (!value) return true;
//       return isValidISODate(value) && value < toISODate(new Date());
//     });

// const commonShape = {
//   LicenseNumber: Yup.string().trim().required("شماره پروانه اشتغال الزامی است"),
//   Birthday: pastDate("تاریخ تولد"),
//   Birthplace: Yup.string().trim().required("محل تولد الزامی است"),
//   PhoneNumber: Yup.string().trim().required("شماره تماس الزامی است"),
//   Address: Yup.string().trim().required("آدرس الزامی است"),
//   NezamRegisterCode: Yup.string()
//     .trim()
//     .required("شماره عضویت نظام مهندسی الزامی است"),
//   LicenseBase: Yup.string()
//     .trim()
//     .required("پایه پروانه الزامی است")
//     .test("valid-base", "پایه پروانه معتبر نیست", (v) => {
//       const n = Number(v);
//       return !Number.isNaN(n) && n >= 0 && n <= 4;
//     }),
//   LicenseYear: Yup.string()
//     .trim()
//     .required("سال صدور پروانه الزامی است")
//     .matches(/^[0-9۰-۹]{4}$/, "سال باید ۴ رقم باشد"),
// };

// const userSchema = Yup.object({
//   ...commonShape,
//   NationalCode: Yup.string()
//     .trim()
//     .required("کد ملی الزامی است")
//     .matches(/^[0-9۰-۹]{10}$/, "برای شخص حقیقی، کد ملی باید ۱۰ رقم باشد"),
//   FullName: Yup.string()
//     .trim()
//     .required("نام و نام خانوادگی الزامی است")
//     .test(
//       "full-name",
//       "نام و نام خانوادگی را کامل وارد کنید",
//       (v) => (v ?? "").trim().split(/\s+/).filter(Boolean).length >= 2
//     ),
// });

// const legalSchema = Yup.object({
//   ...commonShape,
//   NationalCode: Yup.string()
//     .trim()
//     .required("شناسه ملی الزامی است")
//     .matches(/^[0-9۰-۹]{11}$/, "برای شخص حقوقی، شناسه ملی باید ۱۱ رقم باشد"),
//   CompanyName: Yup.string().trim().required("نام شرکت / موسسه الزامی است"),
//   Birthday: pastDate("تاریخ تأسیس"),
//   Birthplace: Yup.string().trim().required("محل شرکت الزامی است"),
// });

// /* ============================================================
//    4) Pre-fill نگاشت از backendData
//    ============================================================ */

// function realInfoToFormValues(data: any): FormValues {
//   const firstName = data?.firstName ?? "";
//   const lastName = data?.lastName ?? "";
//   return {
//     FullName: `${firstName} ${lastName}`.trim(),
//     CompanyName: "",
//     LicenseNumber: data?.licenseNumber ?? "",
//     NationalCode: data?.nationalCode ?? "",
//     Birthday: persianToISO(data?.birthDate),
//     Birthplace: data?.birthPlace ?? "",
//     PhoneNumber: data?.phoneNumber ?? "",
//     Address: data?.address ?? "",
//     NezamRegisterCode: data?.nezamRegisterCode ?? "",
//     LicenseBase: data?.licenseBase != null ? String(data.licenseBase) : "",
//     LicenseYear: data?.licenseYear ? String(data.licenseYear) : "",
//   };
// }

// /** نگاشت LegalSupervisorDto → فرم (مطابق DTO بک‌اند) */
// function legalInfoToFormValues(data: any): FormValues {
//   return {
//     ...emptyForm,
//     CompanyName: data?.name ?? "",
//     LicenseNumber: data?.licenseNumber ?? "",
//     NationalCode: data?.nationalId ?? "",
//     Birthday: persianToISO(data?.registerDate),
//     Birthplace: data?.registerPlace ?? "",
//     PhoneNumber: data?.phoneNumber ?? "",
//     Address: data?.address ?? "",
//     NezamRegisterCode: data?.nezamRegisterCode ?? "",
//     LicenseBase: data?.licenseBase != null ? String(data.licenseBase) : "",
//     LicenseYear: data?.licenseYear ? String(data.licenseYear) : "",
//   };
// }

// function realInfoToLicenseStatus(data: any) {
//   const field = Array.isArray(data?.fieldList)
//     ? data.fieldList
//         .filter((x: number) => x > 0)
//         .map((x: number) => ({ value: String(x), active: true }))
//     : data?.field != null && data.field > 0
//       ? [{ value: String(data.field), active: true }]
//       : [];
//   const quals = Array.isArray(data?.competenceList)
//     ? data.competenceList
//         .filter((c: number) => c > 0)
//         .map((c: number) => ({ value: String(c), active: true }))
//     : [];
//   return {
//     fields: field as Item[],
//     qualifications: quals as Item[],
//     experienceYears:
//       data?.workExperience != null && data.workExperience > 0
//         ? String(data.workExperience)
//         : "",
//     activeProjects:
//       data?.activeProjectCount != null && data.activeProjectCount > 0
//         ? String(data.activeProjectCount)
//         : "",
//     summary: data?.experienceSummery ?? "",
//   };
// }

// function realInfoToRegistrationConditions(data: any) {
//   return {
//     salary:
//       data?.traineSalary != null && data.traineSalary > 0
//         ? String(data.traineSalary)
//         : "",
//     insurance: (data?.traineInsurnce ? "social" : "none") as "social" | "none",
//     weeklyHours:
//       data?.traineHoursByWeek != null && data.traineHoursByWeek > 0
//         ? String(data.traineHoursByWeek)
//         : "",
//     traineeCertificate: !!data?.traineCertificate,
//   };
// }

// function realInfoToCommitment(data: any, fallbackTotal = 0) {
//   const backendAcceptance = Number(data?.acceptanceCapacity ?? 0);
//   const displayTotalCapacity =
//     backendAcceptance > 1 ? backendAcceptance : Math.max(fallbackTotal, 3);

//   return {
//     allocatedCapacity:
//       data?.traineeCapacity != null && data.traineeCapacity > 0
//         ? String(data.traineeCapacity)
//         : data?.assignedCapacity != null && data.assignedCapacity > 0
//           ? String(data.assignedCapacity)
//           : "",
//     minMonthlyHours:
//       data?.minHoursByMonth != null && data.minHoursByMonth > 0
//         ? String(data.minHoursByMonth)
//         : "",
//     displayTotalCapacity,
//     payloadTotalCapacity: displayTotalCapacity,
//   };
// }

// /* ============================================================
//    5) buildPayload & validateBeforeSubmit
//    ============================================================ */

// interface BuildPayloadParams {
//   formValues: FormValues;
//   fields: Item[];
//   qualifications: Item[];
//   experienceYears: string;
//   activeProjects: string;
//   summary: string;
//   salary: string;
//   insurance: "social" | "none";
//   weeklyHours: string;
//   payloadTotalCapacity: number;
//   allocatedCapacity: string;
//   minMonthlyHours: string;
//   traineeCertificate: boolean;
//   backend: any | null;
// }

// function buildSupervisorRealPayload(
//   params: BuildPayloadParams & { cvFile?: File | null }
// ) {
//   const { formValues, fields, qualifications, backend, cvFile } = params;

//   const fullName = (formValues.FullName ?? "").trim();
//   const [firstName, ...rest] = fullName.split(/\s+/);
//   const lastName = rest.join(" ");

//   const activeFields = fields.filter((f) => f.active);
//   const activeQuals = qualifications.filter((q) => q.active);

//   return {
//     fldMemberId: backend?.fldMemberId ?? 0,
//     memberId: backend?.memberId ?? "00000000-0000-0000-0000-000000000000",
//     id: backend?.id ?? 0,
//     firstName: firstName || "",
//     lastName: lastName || "",
//     nationalCode: formValues.NationalCode ?? "",
//     licenseNumber: formValues.LicenseNumber ?? "",
//     phoneNumber: formValues.PhoneNumber ?? "",
//     birthDate: isoToPersian(formValues.Birthday),
//     birthPlace: formValues.Birthplace ?? "",
//     nezamRegisterCode: formValues.NezamRegisterCode ?? "",
//     address: formValues.Address ?? "",
//     competenceList: activeQuals
//       .map((q) => Number(q.value))
//       .filter((n) => !Number.isNaN(n) && n > 0),
//     field: activeFields[0] ? Number(activeFields[0].value) : 0,
//     licenseBase: Number(formValues.LicenseBase) || 0,
//     workExperience: Number(params.experienceYears) || 0,
//     activeProjectCount: Number(params.activeProjects) || 0,
//     licenseYear: Number(formValues.LicenseYear) || 0,
//     experienceSummery: params.summary || "",
//     traineSalary: Number(params.salary) || 0,
//     traineInsurnce: params.insurance === "social",
//     traineHoursByWeek: Number(params.weeklyHours) || 0,
//     traineeCertificate: params.traineeCertificate,
//     acceptanceCapacity: params.payloadTotalCapacity,
//     // Swagger: TraineeCapacity (نه assignedCapacity) و بدون minHoursByMonth
//     traineeCapacity: Number(params.allocatedCapacity) || 0,
//     userId: backend?.userId ?? "00000000-0000-0000-0000-000000000000",
//     cvFile: cvFile ?? undefined,
//   };
// }

// function validateBeforeSubmit(
//   payload: ReturnType<typeof buildSupervisorRealPayload>
// ): string | null {
//   if (!payload.firstName) return "نام الزامی است";
//   if (!payload.lastName) return "نام خانوادگی الزامی است";
//   if (!payload.nationalCode) return "کد ملی الزامی است";
//   if (!payload.licenseNumber) return "شماره پروانه الزامی است";
//   if (payload.workExperience <= 0) return "سابقه کار باید بزرگتر از ۰ باشد";
//   if (payload.field <= 0) return "رشته فعالیت الزامی است";
//   if (payload.licenseBase <= 0) return "پایه پروانه الزامی است";
//   if (payload.licenseYear <= 0) return "سال صدور پروانه الزامی است";
//   if (payload.competenceList.length === 0)
//     return "حداقل یک صلاحیت انتخاب کنید";
//   if (payload.traineSalary <= 0) return "حقوق ماهانه الزامی است";
//   if (payload.traineHoursByWeek <= 0) return "ساعات حضور هفتگی الزامی است";
//   if (payload.acceptanceCapacity <= 0) return "ظرفیت پذیرش الزامی است";
//   if (payload.traineeCapacity <= 1)
//     return "سقف پذیرش من باید حداقل ۲ باشد";
//   if (!payload.cvFile) return "فایل رزومه (PDF) الزامی است";
//   return null;
// }

// /** payload حقوقی — مطابق POST /api/Supervisor/LegalRegistration */
// function buildSupervisorLegalPayload(params: BuildPayloadParams) {
//   const { formValues, fields, qualifications, backend } = params;

//   const activeFields = fields.filter((f) => f.active);
//   const activeQuals = qualifications.filter((q) => q.active);

//   return {
//     fldMemberId: backend?.fldMemberId ?? 0,
//     memberId: backend?.memberId ?? "00000000-0000-0000-0000-000000000000",
//     id: backend?.id ?? 0,
//     name: (formValues.CompanyName ?? "").trim(),
//     licenseNumber: formValues.LicenseNumber ?? "",
//     nationalId: toEnglishDigits(formValues.NationalCode ?? ""),
//     registerDate: isoToPersian(formValues.Birthday),
//     registerPlace: formValues.Birthplace ?? "",
//     phoneNumber: toEnglishDigits(formValues.PhoneNumber ?? ""),
//     nezamRegisterCode: formValues.NezamRegisterCode ?? "",
//     address: formValues.Address ?? "",
//     fieldList: activeFields
//       .map((f) => Number(f.value))
//       .filter((n) => !Number.isNaN(n) && n > 0),
//     competenceList: activeQuals
//       .map((q) => Number(q.value))
//       .filter((n) => !Number.isNaN(n) && n > 0),
//     licenseBase: Number(formValues.LicenseBase) || 0,
//     workExperience: Number(params.experienceYears) || 0,
//     activeProjectCount: Number(params.activeProjects) || 0,
//     licenseYear: Number(formValues.LicenseYear) || 0,
//     experienceSummery: params.summary || "",
//     traineSalary: Number(params.salary) || 0,
//     traineInsurnce: params.insurance === "social",
//     traineHoursByWeek: Number(params.weeklyHours) || 0,
//     traineeCertificate: params.traineeCertificate,
//     acceptanceCapacity: params.payloadTotalCapacity,
//     assignedCapacity: Number(params.allocatedCapacity) || 0,
//     minHoursByMonth: Number(params.minMonthlyHours) || 0,
//     userId: backend?.userId ?? "00000000-0000-0000-0000-000000000000",
//   };
// }

// function validateLegalBeforeSubmit(
//   payload: ReturnType<typeof buildSupervisorLegalPayload>
// ): string | null {
//   if (!payload.name) return "نام شرکت / موسسه الزامی است";
//   if (!payload.nationalId) return "شناسه ملی الزامی است";
//   if (!payload.licenseNumber) return "شماره پروانه الزامی است";
//   if (!payload.registerDate) return "تاریخ ثبت الزامی است";
//   if (!payload.registerPlace) return "محل ثبت الزامی است";
//   if (payload.workExperience <= 0) return "سابقه کار باید بزرگتر از ۰ باشد";
//   if (payload.fieldList.length === 0) return "حداقل یک رشته فعالیت انتخاب کنید";
//   if (payload.licenseBase <= 0) return "پایه پروانه الزامی است";
//   if (payload.licenseYear <= 0) return "سال صدور پروانه الزامی است";
//   if (payload.competenceList.length === 0)
//     return "حداقل یک صلاحیت انتخاب کنید";
//   if (payload.traineSalary <= 0) return "حقوق ماهانه الزامی است";
//   if (payload.traineHoursByWeek <= 0) return "ساعات حضور هفتگی الزامی است";
//   if (payload.acceptanceCapacity <= 0) return "ظرفیت پذیرش الزامی است";
//   if (payload.assignedCapacity <= 1)
//     return "سقف پذیرش من باید حداقل ۲ باشد";
//   if (payload.minHoursByMonth <= 0) return "حداقل ساعت ماهانه الزامی است";
//   return null;
// }

// /* ============================================================
//    6) UI Sub-Components
//    ============================================================ */

// const labelClassName = "text-2xs font-semibold text-neutral-900";

// function ChipGroup({
//   label,
//   options,
//   items,
//   onChange,
//   multiple,
// }: {
//   label: string;
//   options: { label: string; value: string }[];
//   items: Item[];
//   onChange: (items: Item[]) => void;
//   multiple: boolean;
// }) {
//   const isSelected = (value: string) => items.some((i) => i.value === value);

//   const handleClick = (value: string) => {
//     if (isSelected(value)) {
//       onChange(items.filter((i) => i.value !== value));
//     } else if (multiple) {
//       onChange([...items, { value, active: true }]);
//     } else {
//       onChange([{ value, active: true }]);
//     }
//   };

//   return (
//     <div className="w-full">
//       <span className={cn(labelClassName, "mb-3 block")}>{label}</span>
//       <div className="flex flex-wrap gap-2">
//         {options.map((option) => {
//           const selected = isSelected(option.value);
//           return (
//             <button
//               key={option.value}
//               type="button"
//               aria-pressed={selected}
//               onClick={() => handleClick(option.value)}
//               className={cn(
//                 "h-9 rounded-lg border px-4 text-2xs transition-colors",
//                 selected
//                   ? "border-input-800 bg-input-800 font-semibold text-white"
//                   : "border-neutral-200 bg-neutral-50 text-neutral-900 hover:bg-neutral-100"
//               )}
//             >
//               {option.label}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function ActivationRow({
//   title,
//   active,
//   onToggle,
// }: {
//   title: string;
//   active: boolean;
//   onToggle: (next: boolean) => void;
// }) {
//   return (
//     <div className="flex items-center justify-between py-3">
//       <div className="flex items-center gap-3">
//         <span className="text-2xs font-semibold text-neutral-900">{title}</span>
//         <span
//           className={cn(
//             "flex h-5 items-center rounded-full border px-2 text-3xs",
//             active
//               ? "border-emerald-300 bg-emerald-100 text-emerald-800"
//               : "border-neutral-300 bg-neutral-100 text-neutral-600"
//           )}
//         >
//           {active ? "فعال" : "غیرفعال"}
//         </span>
//       </div>
//       <SwitchButton checked={active} onChange={onToggle} size="lg" />
//     </div>
//   );
// }

// function LicenseStatus({
//   stepNumber = "۲",
//   fields,
//   setFields,
//   qualifications,
//   setQualifications,
//   experienceYears,
//   setExperienceYears,
//   activeProjects,
//   setActiveProjects,
//   summary,
//   setSummary,
//   experienceYearsError,
//   multipleFields = false,
// }: {
//   multipleFields?: boolean;
//   stepNumber?: string;
//   fields: Item[];
//   setFields: (v: Item[]) => void;
//   qualifications: Item[];
//   setQualifications: (v: Item[]) => void;
//   experienceYears: string;
//   setExperienceYears: (v: string) => void;
//   activeProjects: string;
//   setActiveProjects: (v: string) => void;
//   summary: string;
//   setSummary: (v: string) => void;
//   experienceYearsError?: string;
// }) {
//   const labelOf = (options: { label: string; value: string }[], v: string) =>
//     options.find((o) => o.value === v)?.label ?? v;

//   const setActive = (
//     items: Item[],
//     setItems: (items: Item[]) => void,
//     value: string,
//     active: boolean
//   ) => setItems(items.map((i) => (i.value === value ? { ...i, active } : i)));

//   const hasSelection = fields.length > 0 || qualifications.length > 0;

//   return (
//     <div
//       dir="rtl"
//       className="w-full rounded-2xl border-2 border-neutral-200 bg-white p-5 shadow-xs sm:p-7"
//     >
//       <div className="mb-8 flex items-center gap-2">
//         <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef0f8] text-xs text-blue-800">
//           {stepNumber}
//         </span>
//         <h3 className="text-s font-semibold text-neutral-900">
//           رشته فعالیت، صلاحیت و سوابق
//         </h3>
//       </div>

//       <div className="flex flex-col gap-5">
//         <ChipGroup
//           label={
//             multipleFields ? "رشته‌های فعالیت (چند انتخابی)" : "رشتهٔ فعالیت"
//           }
//           options={fieldOptions}
//           items={fields}
//           onChange={setFields}
//           multiple={multipleFields}
//         />

//         <ChipGroup
//           label="صلاحیت‌ها (چند انتخابی)"
//           options={qualificationOptions}
//           items={qualifications}
//           onChange={setQualifications}
//           multiple
//         />

//         {hasSelection && (
//           <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-4">
//             <div className="flex items-center gap-2">
//               <Settings className="size-4 text-neutral-800" strokeWidth={1.75} />
//               <h4 className="text-2xs font-semibold text-neutral-900">
//                 مدیریت فعال‌سازی رشته‌ها و صلاحیت‌ها
//               </h4>
//             </div>
//             <p className="mt-2 text-3xs text-neutral-600">
//               با غیرفعال کردن یک رشته یا صلاحیت، درخواست کارآموزی جدید برای آن
//               رشته/صلاحیت برای شما قابل قبول نخواهد بود.
//             </p>

//             <div className="mt-2 divide-y divide-neutral-200">
//               {fields.map((item) => (
//                 <ActivationRow
//                   key={`field-${item.value}`}
//                   title={labelOf(fieldOptions, item.value)}
//                   active={item.active}
//                   onToggle={(next) =>
//                     setActive(fields, setFields, item.value, next)
//                   }
//                 />
//               ))}
//               {qualifications.map((item) => (
//                 <ActivationRow
//                   key={`qualification-${item.value}`}
//                   title={`صلاحیت ${labelOf(qualificationOptions, item.value)}`}
//                   active={item.active}
//                   onToggle={(next) =>
//                     setActive(
//                       qualifications,
//                       setQualifications,
//                       item.value,
//                       next
//                     )
//                   }
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           <div>
//             <Input
//               label="سابقه کار (سال)"
//               variant="default"
//               labelClassName={labelClassName}
//               className="mt-2"
//               inputSize="sm"
//               type="number"
//               min={1}
//               value={experienceYears}
//               onChange={(e) => setExperienceYears(e.target.value)}
//               error={!!experienceYearsError}
//               errorMessage={experienceYearsError}
//             />
//           </div>
//           <div>
//             <Input
//               label="تعداد پروژه فعال"
//               variant="default"
//               labelClassName={labelClassName}
//               className="mt-2"
//               inputSize="sm"
//               type="number"
//               min={0}
//               value={activeProjects}
//               onChange={(e) => setActiveProjects(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="w-full">
//           <label
//             htmlFor="experience-summary"
//             className={cn(labelClassName, "mb-2 block")}
//           >
//             خلاصه سوابق
//           </label>
//           <TextArea
//             id="experience-summary"
//             variant="default"
//             rounded="xl"
//             rows={3}
//             value={summary}
//             onChange={(e) => setSummary(e.target.value)}
//             placeholder="خلاصه‌ای از سوابق حرفه‌ای..."
//             className="min-h-0 text-xs"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// function RegistrationConditions({
//   salary,
//   setSalary,
//   insurance,
//   setInsurance,
//   weeklyHours,
//   setWeeklyHours,
//   traineeCertificate,
//   setTraineeCertificate,
//   stepNumber = "۴",
// }: {
//   salary: string;
//   setSalary: (v: string) => void;
//   insurance: "social" | "none";
//   setInsurance: (v: "social" | "none") => void;
//   weeklyHours: string;
//   setWeeklyHours: (v: string) => void;
//   traineeCertificate: boolean;
//   setTraineeCertificate: (v: boolean) => void;
//   stepNumber?: string;
// }) {
//   return (
//     <div
//       dir="rtl"
//       className="flex w-full flex-col gap-5 rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6 bg-white"
//     >
//       <div className="flex items-center mb-7 gap-2 justify-between w-full">
//         <div className="flex justify-center items-center gap-2">
//           <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
//             {stepNumber}
//           </span>
//           <h3 className="text-s font-bold text-gray-800">شرایط پذیرش کارآموز</h3>
//         </div>
//         <div>
//           <span className="px-2 bg-blue-100 text-2xs py-1 rounded-full text-input-900">
//             قابل ویرایش همیشگی
//           </span>
//         </div>
//       </div>

//       <div className="w-full flex flex-col gap-5">
//         <div className="w-full flex flex-col md:flex-row justify-start items-stretch md:items-end gap-4">
//           <div className="w-full md:w-96">
//             <Input
//               label="حقوق ماهانه (تومان)"
//               variant="default"
//               labelClassName="mb-2 text-xs"
//               inputSize="sm"
//               inputMode="numeric"
//               isPrice
//               value={salary}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                 setSalary(onlyDigits(e.target.value))
//               }
//             />
//           </div>
//           <div className="w-full md:w-auto">
//             <span className="text-2xs font-semibold text-gray-900">بیمه</span>
//             <Select
//               className="text-nowrap text-xs"
//               placeholder="انتخاب بیمه"
//               options={insuranceOptions}
//               value={insurance}
//               onChange={(v) => setInsurance(v as "social" | "none")}
//             />
//           </div>
//         </div>

//         <div className="w-full flex flex-col md:flex-row justify-start items-stretch md:items-end gap-4">
//           <div className="w-full md:w-1/2">
//             <Input
//               label="ساعات حضور هفتگی"
//               variant="default"
//               labelClassName="mb-2 text-xs"
//               inputSize="sm"
//               inputMode="numeric"
//               value={weeklyHours}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                 setWeeklyHours(onlyDigits(e.target.value))
//               }
//             />
//           </div>
//           <div className="w-full md:w-1/2">
//             <label className="flex items-center gap-2 cursor-pointer select-none">
//               <input
//                 type="checkbox"
//                 checked={traineeCertificate}
//                 onChange={(e) => setTraineeCertificate(e.target.checked)}
//                 className="w-4 h-4"
//               />
//               <span className="text-2xs font-semibold text-gray-900">
//                 گواهی پایان دوره صادر می‌شود
//               </span>
//             </label>
//           </div>
//         </div>
//       </div>

//       <div className="w-full flex justify-start items-center gap-2 p-3 rounded-lg bg-blue-50 border-r-4 border-blue-500 text-blue-900 text-xs">
//         <span>⚙️</span>
//         <span>
//           این بخش در هر زمان پس از ثبت نیز قابل ویرایش است. تغییرات به همه
//           کارآموزان فعال اطلاع‌رسانی خواهد شد.
//         </span>
//       </div>
//     </div>
//   );
// }

// function CommitmentAgreement({
//   stepNumber = "۵",
//   supervisorName,
//   licenseNumber,
//   displayTotalCapacity,
//   allocatedCapacity,
//   setAllocatedCapacity,
//   minMonthlyHours,
//   setMinMonthlyHours,
//   isSubmitting = false,
//   onSubmit,
// }: {
//   stepNumber?: string;
//   supervisorName?: string;
//   licenseNumber?: string;
//   displayTotalCapacity: number;
//   allocatedCapacity: string;
//   setAllocatedCapacity: (v: string) => void;
//   minMonthlyHours: string;
//   setMinMonthlyHours: (v: string) => void;
//   isSubmitting?: boolean;
//   onSubmit?: () => void;
// }) {
//   const [accepted, setAccepted] = useState(false);
//   const [capacityError, setCapacityError] = useState<string | undefined>();

//   const MAX_ALLOCATED = Math.max(displayTotalCapacity, MIN_ALLOCATED_CAPACITY);

//   useEffect(() => {
//     if (allocatedCapacity === "") return;
//     const clamped = Math.min(
//       Math.max(Number(allocatedCapacity) || 0, MIN_ALLOCATED_CAPACITY),
//       MAX_ALLOCATED
//     );
//     if (String(clamped) !== allocatedCapacity) {
//       setAllocatedCapacity(String(clamped));
//     }
//   }, [MAX_ALLOCATED, allocatedCapacity, setAllocatedCapacity]);

//   const handleAllocatedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const digits = onlyDigits(e.target.value);
//     if (digits === "") {
//       setAllocatedCapacity("");
//       setCapacityError("سقف پذیرش من الزامی است");
//       return;
//     }
//     const n = Number(digits);
//     if (n < MIN_ALLOCATED_CAPACITY) {
//       setCapacityError(
//         `سقف پذیرش من باید حداقل ${MIN_ALLOCATED_CAPACITY} باشد`
//       );
//     } else if (n > MAX_ALLOCATED) {
//       setCapacityError(
//         `سقف پذیرش من نمی‌تواند بیشتر از ${MAX_ALLOCATED} باشد`
//       );
//     } else {
//       setCapacityError(undefined);
//     }
//     setAllocatedCapacity(String(Math.min(n, MAX_ALLOCATED)));
//   };

//   return (
//     <div
//       dir="rtl"
//       className="w-full rounded-2xl border-2 shadow-xs border-neutral-200 bg-white p-5 sm:p-6"
//     >
//       <div className="flex items-center gap-2 mb-8">
//         <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
//           {stepNumber}
//         </span>
//         <h3 className="text-s font-bold text-gray-800">
//           ظرفیت پذیرش و تعهد سرپرستی
//         </h3>
//       </div>

//       <div className="flex flex-col">
//         <div className="w-full flex flex-col md:flex-row justify-center items-stretch md:items-center gap-3 mb-5">
//           <div className="w-full md:w-1/3">
//             <Input
//               label="ظرفیت کل پذیرش"
//               variant="default"
//               labelClassName="mb-2 text-xs"
//               inputSize="sm"
//               value={String(displayTotalCapacity)}
//               readOnly
//               disabled
//             />
//           </div>
//           <div className="w-full md:w-1/3">
//             <Input
//               label="سقف پذیرش من"
//               variant="default"
//               labelClassName="mb-2 text-xs"
//               inputSize="sm"
//               inputMode="numeric"
//               value={allocatedCapacity}
//               onChange={handleAllocatedChange}
//               error={!!capacityError}
//               errorMessage={capacityError}
//             />
//             <p className="mt-1 text-3xs text-neutral-500">
//               حداقل {MIN_ALLOCATED_CAPACITY} و حداکثر {MAX_ALLOCATED}
//             </p>
//           </div>
//           <div className="w-full md:w-1/3">
//             <Input
//               label="حداقل ساعت ماهانه"
//               variant="default"
//               labelClassName="mb-2 text-xs"
//               inputSize="sm"
//               inputMode="numeric"
//               value={minMonthlyHours}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                 setMinMonthlyHours(onlyDigits(e.target.value))
//               }
//             />
//           </div>
//         </div>

//         <div className="rounded-xl border-r-5 border-input-800 bg-slate-50 px-4 py-4 mb-2">
//           <h4 className="text-xs font-bold text-neutral-800 mb-2">
//             متن تعهدنامه سرپرستی
//           </h4>
//           <p className="text-[11.5px] leading-6 text-gray-700 text-justify">
//             اینجانب {supervisorName || "..............."} با شماره پروانه{" "}
//             {licenseNumber || "..............."} متعهد می‌شوم که نظارت فنی و
//             تخصصی بر کارآموزان زیر نظر خود را به‌طور مستمر انجام دهم،
//             گزارش‌های ماهانه را در مهلت ۷ روز بررسی و تأیید/رد نمایم و در جلسات
//             توجیهی سازمان حضور فعال داشته باشم. در غیر این صورت، سازمان نظام
//             مهندسی تهران می‌تواند صلاحیت سرپرستی مرا معلق یا لغو نماید.
//           </p>

//           <div className="border-t border-neutral-300 mt-4 pt-3">
//             <p className="text-2xs leading-6 text-neutral-600">
//               <span className="font-bold text-neutral-800">بند ظرفیت: </span>
//               ظرفیت پذیرش کارآموز توسط سازمان تعیین می‌شود و سرپرست متعهد
//               می‌گردد از سقف تعیین‌شده فراتر نرود.
//             </p>
//           </div>
//         </div>

//         <div className="flex mt-2 justify-start items-start md:items-center gap-2 mb-5">
//           <input
//             id="commitment-accepted"
//             type="checkbox"
//             className="w-4 h-4 mt-0.5 md:mt-0 shrink-0"
//             checked={accepted}
//             onChange={(e) => setAccepted(e.target.checked)}
//           />
//           <label
//             htmlFor="commitment-accepted"
//             className="text-[11.5px] font-medium text-neutral-950 cursor-pointer"
//           >
//             مسئولیت تعهدنامه را می‌پذیرم.
//           </label>
//         </div>

//         <div className="flex flex-col md:flex-row items-stretch md:items-center justify-start gap-3">
//           <Button
//             type="button"
//             variant="solid"
//             color="input"
//             className="text-sm w-full md:w-auto"
//             size="xs"
//             rounded="lg"
//             disabled={!accepted || isSubmitting || !!capacityError}
//             onClick={onSubmit}
//           >
//             {isSubmitting ? "در حال ارسال..." : "ارسال درخواست ثبت‌نام سرپرستی"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const MAX_FILE_SIZE = 5 * 1024 * 1024;
// const formatSize = (bytes: number) =>
//   bytes >= 1024 * 1024
//     ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
//     : `${Math.max(1, Math.round(bytes / 1024))} KB`;

// function ResumeUploader({
//   initialResume = null,
//   onChange,
//   required = false,
//   errorMessage,
// }: {
//   initialResume?: ResumeFile | null;
//   onChange?: (resume: ResumeFile | null, file?: File) => void;
//   required?: boolean;
//   errorMessage?: string;
// }) {
//   const [resume, setResume] = useState<ResumeFile | null>(initialResume);
//   const [isDragging, setIsDragging] = useState(false);
//   const [error, setError] = useState("");
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const urlRef = useRef<string | undefined>(undefined);

//   useEffect(() => {
//     return () => {
//       if (urlRef.current) URL.revokeObjectURL(urlRef.current);
//     };
//   }, []);

//   const handleFile = (file: File | undefined) => {
//     if (!file) return;
//     if (file.type !== "application/pdf") {
//       setError("فقط فایل PDF مجاز است.");
//       return;
//     }
//     if (file.size > MAX_FILE_SIZE) {
//       setError("حجم فایل نباید بیشتر از ۵ مگابایت باشد.");
//       return;
//     }
//     if (urlRef.current) URL.revokeObjectURL(urlRef.current);
//     const url = URL.createObjectURL(file);
//     urlRef.current = url;

//     const newResume: ResumeFile = {
//       name: file.name,
//       size: file.size,
//       uploadedAt: new Date().toLocaleDateString("fa-IR", {
//         year: "numeric",
//         month: "2-digit",
//         day: "2-digit",
//       }),
//       url,
//     };

//     setError("");
//     setResume(newResume);
//     onChange?.(newResume, file);
//   };

//   const handleDelete = () => {
//     if (urlRef.current) URL.revokeObjectURL(urlRef.current);
//     urlRef.current = undefined;
//     setResume(null);
//     setError("");
//     onChange?.(null);
//   };

//   return (
//     <div
//       dir="rtl"
//       className="w-full flex flex-col gap-4 mt-4 rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6 bg-white"
//     >
//       <div className="flex justify-start items-center gap-2 text-sm font-bold text-black mb-4">
//         <ArrowUpToLine size={18} />
//         <span>
//           فایل رزومه
//           {required && <span className="text-red-600 ml-1">*</span>}
//         </span>
//       </div>

//       {resume && (
//         <div className="w-full flex items-center justify-between gap-3 p-3 rounded-lg border border-neutral-200 bg-neutral-50">
//           <div className="flex items-center gap-2 min-w-0">
//             <FileText size={18} className="text-neutral-600 shrink-0" />
//             <div className="min-w-0">
//               <p className="text-xs font-semibold text-neutral-900 truncate">
//                 {resume.name}
//               </p>
//               <p className="text-3xs text-neutral-500">
//                 {formatSize(resume.size)} · {resume.uploadedAt}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3 shrink-0">
//             {resume.url && (
//               <button
//                 type="button"
//                 onClick={() => window.open(resume.url, "_blank")}
//                 className="cursor-pointer"
//                 aria-label="مشاهده رزومه"
//               >
//                 <Eye size={17} />
//               </button>
//             )}
//             <button
//               type="button"
//               onClick={handleDelete}
//               className="cursor-pointer"
//               aria-label="حذف رزومه"
//             >
//               <Trash2 size={17} color="red" />
//             </button>
//           </div>
//         </div>
//       )}

//       <div
//         onDragOver={(e) => {
//           e.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragLeave={() => setIsDragging(false)}
//         onDrop={(e) => {
//           e.preventDefault();
//           setIsDragging(false);
//           handleFile(e.dataTransfer.files?.[0]);
//         }}
//         className={`w-full flex flex-col justify-center items-center gap-3 py-8 rounded-xl border-2 border-dashed transition-all duration-300 ${
//           isDragging
//             ? "border-input-700 bg-input-50"
//             : errorMessage
//               ? "border-red-400 bg-red-50"
//               : "border-neutral-300 bg-white"
//         }`}
//       >
//         <Upload size={36} className="text-neutral-500" />
//         <p className="text-xs text-neutral-500">
//           {resume
//             ? "برای جایگزینی رزومه، فایل PDF جدید را اینجا رها کنید"
//             : "فایل PDF رزومه را اینجا رها کنید"}
//         </p>
//         <button
//           type="button"
//           onClick={() => fileInputRef.current?.click()}
//           className="px-4 py-2 text-xs font-bold border border-neutral-300 rounded-lg bg-neutral-50 cursor-pointer hover:bg-neutral-100 transition-all duration-300"
//         >
//           انتخاب فایل
//         </button>
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept="application/pdf"
//           className="hidden"
//           onChange={(e) => {
//             handleFile(e.target.files?.[0]);
//             e.target.value = "";
//           }}
//         />
//         {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
//       </div>

//       {errorMessage && (
//         <p className="text-xs text-red-600 font-medium">{errorMessage}</p>
//       )}

//       <div className="w-full flex justify-start items-center gap-2 p-3 rounded-lg bg-amber-50 border-r-4 border-amber-500 text-amber-800 text-xs">
//         <TriangleAlert size={14} />
//         <span>
//           فایل رزومه برای کارآموزان در زمان انتخاب سرپرست قابل مشاهده خواهد بود.
//         </span>
//       </div>
//     </div>
//   );
// }

// /* ============================================================
//    7) PersonalInfoForm
//    ============================================================ */

// interface PersonalInfoFormSubmitState {
//   formValues: FormValues;
//   userType: UserType;
//   fields: Item[];
//   qualifications: Item[];
//   experienceYears: string;
//   activeProjects: string;
//   summary: string;
//   salary: string;
//   insurance: "social" | "none";
//   weeklyHours: string;
//   traineeCertificate: boolean;
//   allocatedCapacity: string;
//   minMonthlyHours: string;
//   payloadTotalCapacity: number;
//   resume: ResumeFile | null;
//   resumeFile: File | null;
// }

// interface PersonalInfoFormProps {
//   stepNumber?: string;
//   userType: UserType;
//   onUserTypeChange: (t: UserType) => void;
//   backendData?: any | null;
//   isTabLoading?: boolean;
//   isSubmitting?: boolean;
//   onSubmit?: (state: PersonalInfoFormSubmitState) => void;
// }

// function PersonalInfoForm({
//   stepNumber = "۱",
//   userType,
//   onUserTypeChange,
//   backendData,
//   isTabLoading = false,
//   isSubmitting = false,
//   onSubmit,
// }: PersonalInfoFormProps) {
//   const yesterday = useMemo(() => getYesterday(), []);
//   const isUser = userType === "User";

//   const [fields, setFields] = useState<Item[]>([]);
//   const [qualifications, setQualifications] = useState<Item[]>([]);
//   const [experienceYears, setExperienceYears] = useState("");
//   const [activeProjects, setActiveProjects] = useState("");
//   const [summary, setSummary] = useState("");
//   const [salary, setSalary] = useState("");
//   const [insurance, setInsurance] = useState<"social" | "none">("none");
//   const [weeklyHours, setWeeklyHours] = useState("");
//   const [traineeCertificate, setTraineeCertificate] = useState(false);
//   const [allocatedCapacity, setAllocatedCapacity] = useState("");
//   const [minMonthlyHours, setMinMonthlyHours] = useState("");
//   const [resume, setResume] = useState<ResumeFile | null>(null);
//   const [resumeFile, setResumeFile] = useState<File | null>(null);
//   const [resumeError, setResumeError] = useState<string | undefined>(undefined);
//   const [experienceYearsError, setExperienceYearsError] = useState<
//     string | undefined
//   >(undefined);

//   // با تغییر دیتای بک‌اند (یا تعویض تب) state های مستقل از Formik را همگام کن
//   useEffect(() => {
//     const license = realInfoToLicenseStatus(backendData);
//     setFields(license.fields);
//     setQualifications(license.qualifications);
//     setExperienceYears(license.experienceYears);
//     setActiveProjects(license.activeProjects);
//     setSummary(license.summary);

//     const reg = realInfoToRegistrationConditions(backendData);
//     setSalary(reg.salary);
//     setInsurance(reg.insurance);
//     setWeeklyHours(reg.weeklyHours);
//     setTraineeCertificate(reg.traineeCertificate);

//     const commit = realInfoToCommitment(backendData);
//     setAllocatedCapacity(commit.allocatedCapacity);
//     setMinMonthlyHours(commit.minMonthlyHours);
//   }, [backendData]);

//   const dynamicInitial = useMemo<FormValues>(() => {
//     if (!backendData) return { ...emptyForm };
//     return isUser
//       ? realInfoToFormValues(backendData)
//       : legalInfoToFormValues(backendData);
//   }, [backendData, isUser]);

//   const commitment = useMemo(
//     () =>
//       realInfoToCommitment(
//         backendData,
//         TOTAL_CAPACITY_BY_USER_TYPE[userType]
//       ),
//     [backendData, userType]
//   );

//   return (
//     <Formik
//       enableReinitialize
//       initialValues={dynamicInitial}
//       validationSchema={isUser ? userSchema : legalSchema}
//       onSubmit={(values) => {
//         if (!experienceYears || Number(experienceYears) <= 0) {
//           setExperienceYearsError("سابقه کار باید حداقل ۱ سال باشد");
//           return;
//         }
//         setExperienceYearsError(undefined);

//         // گارد نهایی: کد ملی باید با نوع شخص همخوانی داشته باشد
//         const digits = onlyDigits(values.NationalCode ?? "");
//         const typeFromCode = userTypeFromNationalCode(digits);
//         if (typeFromCode === null) {
//           return; // پیام خطای فیلد توسط Yup نمایش داده می‌شود
//         }
//         if (typeFromCode !== userType) {
//           return;
//         }

//         // فایل رزومه فقط برای شخص حقیقی الزامی است
//         if (isUser && !resumeFile) {
//           setResumeError("فایل رزومه (PDF) الزامی است");
//           return;
//         }
//         setResumeError(undefined);

//         onSubmit?.({
//           formValues: values,
//           userType,
//           fields,
//           qualifications,
//           experienceYears,
//           activeProjects,
//           summary,
//           salary,
//           insurance,
//           weeklyHours,
//           traineeCertificate,
//           allocatedCapacity,
//           minMonthlyHours,
//           payloadTotalCapacity: commitment.payloadTotalCapacity,
//           resume,
//           resumeFile,
//         });
//       }}
//     >
//       {({
//         getFieldProps,
//         errors,
//         touched,
//         values,
//         setFieldValue,
//         setFieldTouched,
//         handleSubmit,
//         submitCount,
//       }) => {
//         const f = (name: keyof FormValues) => ({
//           name,
//           field: getFieldProps(name),
//           error: !!(touched[name] && errors[name]),
//           errorMessage: errors[name] as string | undefined,
//         });

//         const errorList = Object.values(errors).filter(Boolean) as string[];

//         // تشخیص خودکار نوع شخص بر اساس طول کد ملی
//         const nationalCodeDigits = onlyDigits(values.NationalCode ?? "");
//         const nationalCodeLength = nationalCodeDigits.length;

//         return (
//           <Form
//             onSubmit={handleSubmit}
//             onKeyDown={(e) => {
//               if (
//                 e.key === "Enter" &&
//                 (e.target as HTMLElement).tagName === "INPUT"
//               ) {
//                 e.preventDefault();
//               }
//             }}
//             className={cn(
//               "w-full flex flex-col justify-center items-center gap-4",
//               isTabLoading && "pointer-events-none opacity-60"
//             )}
//           >
//             {isTabLoading && (
//               <div
//                 dir="rtl"
//                 className="w-full rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800"
//               >
//                 در حال دریافت اطلاعات...
//               </div>
//             )}

//             {/* Card 1: اطلاعات هویتی */}
//             <div className="w-full rounded-2xl border-2 shadow-xs border-neutral-200 sm:p-6 bg-white px-8 py-7">
//               <div className="w-full flex justify-between items-center">
//                 <div className="flex items-center gap-2">
//                   <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef0f8] text-xs text-blue-800">
//                     {stepNumber}
//                   </span>
//                   <span className="text-s font-semibold text-neutral-900">
//                     نوع شخص و اطلاعات هویتی
//                   </span>
//                 </div>
//                 <div className="text-xs bg-neutral-100 text-neutral-500 border border-neutral-300 p-1 px-3 rounded-xl">
//                   <span>الزامی</span>
//                 </div>
//               </div>

//               <div className="mt-8">
//                 <div className="w-full flex justify-start items-start flex-col gap-3 text-sm">
//                   <p className="text-3xs text-black font-bold">نوع شخص</p>
//                   <div className="w-full flex justify-center items-center gap-3">
//                     {usersType.map((item) => {
//                       const disabled =
//                         (nationalCodeLength === 10 && item.type === "legal") ||
//                         (nationalCodeLength === 11 && item.type === "User");

//                       return (
//                         <button
//                           key={item.id}
//                           type="button"
//                           disabled={disabled}
//                           onClick={() => onUserTypeChange(item.type)}
//                           className={cn(
//                             "w-1/2 h-11 flex justify-center items-center text-center border rounded-lg text-xs p-2 transition-all duration-300",
//                             userType === item.type
//                               ? "border-blue-700 bg-blue-700 text-white"
//                               : "border-neutral-300 hover:bg-blue-300 hover:text-white",
//                             disabled &&
//                               "opacity-40 cursor-not-allowed hover:bg-transparent hover:text-inherit"
//                           )}
//                         >
//                           <p>{item.title}</p>
//                         </button>
//                       );
//                     })}
//                   </div>

//                   {nationalCodeLength > 0 &&
//                     nationalCodeLength !== 10 &&
//                     nationalCodeLength !== 11 && (
//                       <p className="text-3xs text-amber-700">
//                         کد ملی باید ۱۰ رقم (شخص حقیقی) یا ۱۱ رقم (شخص حقوقی)
//                         باشد.
//                       </p>
//                     )}
//                   {nationalCodeLength === 10 && (
//                     <p className="text-3xs text-blue-700">
//                       نوع شخص به‌صورت خودکار «حقیقی» انتخاب شد (کد ملی ۱۰ رقمی).
//                     </p>
//                   )}
//                   {nationalCodeLength === 11 && (
//                     <p className="text-3xs text-blue-700">
//                       نوع شخص به‌صورت خودکار «حقوقی» انتخاب شد (شناسه ملی ۱۱
//                       رقمی).
//                     </p>
//                   )}
//                 </div>

//                 <div className="mt-4 flex flex-col gap-5">
//                   <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4">
//                     <div className="w-full md:w-2/3">
//                       {isUser ? (
//                         <Input
//                           key="FullName"
//                           label="نام و نام خانوادگی"
//                           variant="default"
//                           labelClassName="mb-2 text-xs"
//                           placeholder="مثال: علی رضایی"
//                           inputSize="sm"
//                           {...f("FullName")}
//                         />
//                       ) : (
//                         <Input
//                           key="CompanyName"
//                           label="نام شرکت / موسسه"
//                           variant="default"
//                           labelClassName="mb-2 text-xs"
//                           placeholder="مثال: شرکت مهندسین مشاور"
//                           inputSize="sm"
//                           {...f("CompanyName")}
//                         />
//                       )}
//                     </div>
//                     <div className="w-full md:w-1/3">
//                       <Input
//                         label="شماره پروانه اشتغال"
//                         variant="default"
//                         labelClassName="mb-2 text-xs"
//                         placeholder="012345-6"
//                         inputSize="sm"
//                         {...f("LicenseNumber")}
//                       />
//                     </div>
//                   </div>

//                   <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3">
//                     <div className="w-full md:w-1/3">
//                       <Input
//                         label={isUser ? "کدملی" : "شناسه ملی"}
//                         variant="default"
//                         labelClassName="mb-2 text-xs"
//                         placeholder={isUser ? "0123456789" : "01234567890"}
//                         inputSize="sm"
//                         inputMode="numeric"
//                         maxLength={11}
//                         {...f("NationalCode")}
//                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                           const digits = onlyDigits(e.target.value);
//                           setFieldValue("NationalCode", digits, true);

//                           if (digits.length === 10 && userType !== "User") {
//                             onUserTypeChange("User");
//                           } else if (
//                             digits.length === 11 &&
//                             userType !== "legal"
//                           ) {
//                             onUserTypeChange("legal");
//                           }
//                         }}
//                       />
//                     </div>
//                     <div className="w-full md:w-1/3">
//                       <JalaliDatePicker
//                         label={isUser ? "تاریخ تولد" : "تاریخ تأسیس"}
//                         variant="default"
//                         labelClassName="mb-2 text-xs"
//                         placeholder="۱۳۷۰/۰۱/۰۱"
//                         inputSize="sm"
//                         name="Birthday"
//                         value={values.Birthday ?? ""}
//                         maxDate={yesterday}
//                         error={!!(touched.Birthday && errors.Birthday)}
//                         errorMessage={
//                           touched.Birthday ? errors.Birthday : undefined
//                         }
//                         onChange={(iso: string) => {
//                           setFieldTouched("Birthday", true, false);
//                           setFieldValue("Birthday", iso, true);
//                         }}
//                         onBlur={() => setFieldTouched("Birthday", true, false)}
//                       />
//                     </div>
//                     <div className="w-full md:w-1/3">
//                       <Input
//                         label={isUser ? "محل تولد" : "محل شرکت"}
//                         variant="default"
//                         labelClassName="mb-2 text-xs"
//                         placeholder="تهران"
//                         inputSize="sm"
//                         {...f("Birthplace")}
//                       />
//                     </div>
//                   </div>

//                   <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3">
//                     <div className="w-full md:w-1/3">
//                       <Input
//                         label="شماره تماس"
//                         variant="default"
//                         labelClassName="mb-2 text-xs"
//                         placeholder="09123456789"
//                         inputSize="sm"
//                         inputMode="numeric"
//                         {...f("PhoneNumber")}
//                       />
//                     </div>
//                     <div className="w-full md:w-1/3">
//                       <Input
//                         label="شماره عضویت نظام مهندسی"
//                         variant="default"
//                         labelClassName="mb-2 text-xs"
//                         placeholder="98765"
//                         inputSize="sm"
//                         inputMode="numeric"
//                         {...f("NezamRegisterCode")}
//                       />
//                     </div>
//                     <div className="w-full md:w-1/3 flex gap-3">
//                       <div className="w-1/2">
//                         <Input
//                           label="پایه پروانه"
//                           variant="default"
//                           labelClassName="mb-2 text-xs"
//                           placeholder="۲"
//                           inputSize="sm"
//                           inputMode="numeric"
//                           {...f("LicenseBase")}
//                         />
//                       </div>
//                       <div className="w-1/2">
//                         <Input
//                           label="سال صدور پروانه"
//                           variant="default"
//                           labelClassName="mb-2 text-xs"
//                           placeholder="۱۴۰۰"
//                           inputSize="sm"
//                           inputMode="numeric"
//                           {...f("LicenseYear")}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="w-full">
//                     <Input
//                       label="آدرس"
//                       variant="default"
//                       labelClassName="mb-2 text-xs"
//                       placeholder="تهران، خیابان ..."
//                       inputSize="sm"
//                       {...f("Address")}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <LicenseStatus
//               multipleFields={!isUser}
//               fields={fields}
//               setFields={setFields}
//               qualifications={qualifications}
//               setQualifications={setQualifications}
//               experienceYears={experienceYears}
//               setExperienceYears={(v) => {
//                 setExperienceYears(v);
//                 if (Number(v) > 0) setExperienceYearsError(undefined);
//               }}
//               activeProjects={activeProjects}
//               setActiveProjects={setActiveProjects}
//               summary={summary}
//               setSummary={setSummary}
//               experienceYearsError={experienceYearsError}
//             />

//             <RegistrationConditions
//               salary={salary}
//               setSalary={setSalary}
//               insurance={insurance}
//               setInsurance={setInsurance}
//               weeklyHours={weeklyHours}
//               setWeeklyHours={setWeeklyHours}
//               traineeCertificate={traineeCertificate}
//               setTraineeCertificate={setTraineeCertificate}
//             />

//             {/* فایل رزومه — فقط برای شخص حقیقی الزامی است */}
//             {isUser && (
//               <ResumeUploader
//                 initialResume={resume}
//                 required
//                 errorMessage={resumeError}
//                 onChange={(r, file) => {
//                   setResume(r);
//                   setResumeFile(file ?? null);
//                   if (file) setResumeError(undefined);
//                 }}
//               />
//             )}

//             {submitCount > 0 && errorList.length > 0 && (
//               <div
//                 dir="rtl"
//                 className="w-full rounded-xl border border-red-300 bg-red-50 p-4 text-xs text-red-800"
//               >
//                 <p className="mb-2 font-bold">لطفاً موارد زیر را اصلاح کنید:</p>
//                 <ul className="list-disc pr-5 space-y-1">
//                   {errorList.map((msg, i) => (
//                     <li key={i}>{msg}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <CommitmentAgreement
//               supervisorName={values.FullName || values.CompanyName}
//               licenseNumber={values.LicenseNumber}
//               displayTotalCapacity={commitment.displayTotalCapacity}
//               allocatedCapacity={allocatedCapacity}
//               setAllocatedCapacity={setAllocatedCapacity}
//               minMonthlyHours={minMonthlyHours}
//               setMinMonthlyHours={setMinMonthlyHours}
//               isSubmitting={isSubmitting}
//               onSubmit={handleSubmit}
//             />
//           </Form>
//         );
//       }}
//     </Formik>
//   );
// }

// /* ============================================================
//    8) LegalNotFound — حالت «اطلاعات حقوقی ثبت نشده»
//    ============================================================ */

// function LegalNotFound({ onBackToReal }: { onBackToReal: () => void }) {
//   return (
//     <div
//       dir="rtl"
//       className="w-full rounded-2xl border-2 border-neutral-200 bg-white px-6 py-14 shadow-xs sm:px-10"
//     >
//       <div className="mx-auto flex max-w-md flex-col items-center text-center">
//         <div className="relative mb-6">
//           <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#eef0f8]">
//             <Building2 className="size-11 text-blue-800" strokeWidth={1.5} />
//           </div>
//           <span className="absolute -bottom-1 -left-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-amber-100 text-amber-700">
//             <TriangleAlert size={16} />
//           </span>
//         </div>

//         <h2 className="text-sm font-bold text-neutral-900">
//           اطلاعات شخص حقوقی یافت نشد
//         </h2>

//         <p className="mt-3 text-xs leading-7 text-neutral-600">
//           برای حساب کاربری شما هنوز هیچ ثبت‌نام سرپرستی به‌عنوان شخص حقوقی
//           (شرکت / موسسه) انجام نشده است. می‌توانید به فرم شخص حقیقی بازگردید و
//           اطلاعات خود را تکمیل کنید.
//         </p>

//         <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">
//           <Button
//             type="button"
//             variant="solid"
//             color="input"
//             size="xs"
//             rounded="lg"
//             className="text-sm"
//             onClick={onBackToReal}
//           >
//             <span className="flex items-center justify-center gap-2">
//               <UserRound size={16} />
//               بازگشت به شخص حقیقی
//             </span>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ============================================================
//    9) SupervisorPage
//    ============================================================ */

// const isNotFound = (err: any) => err?.response?.status === 404;

// export default function SupervisorPage() {
//   const [userType, setUserType] = useState<UserType>("User");
//   const [clientError, setClientError] = useState<string | null>(null);

//   // حقیقی: همیشه فعال
//   const realQuery = useGetRealInfo();

//   // حقوقی: فقط وقتی روی تب «شخص حقوقی» کلیک شد درخواست می‌رود
//   const legalQuery = useGetLegalInfo({ enabled: userType === "legal" });

//   const { mutate: registerReal, isPending: isRealPending } =
//     useRegisterSupervisorReal();
//   const { mutate: registerLegal, isPending: isLegalPending } =
//     useRegisterSupervisorLegal();

//   const isLegalTab = userType === "legal";
//   const activeQuery = isLegalTab ? legalQuery : realQuery;

//   // ۴۰۴ یعنی کاربر جدید → backendData = null
//   const backendData = activeQuery.data?.data ?? null;

//   const activeError = activeQuery.error;
//   const hasRealError = !!activeError && !isNotFound(activeError);

//   // کاربر روی تب حقوقی زده ولی اطلاعات حقوقی ندارد (۴۰۴)
//   const legalNotFound =
//     isLegalTab && legalQuery.isError && isNotFound(legalQuery.error);

//   const handleUserTypeChange = (next: UserType) => {
//     setClientError(null);
//     setUserType(next);
//   };

//   const handleSubmit = (state: PersonalInfoFormSubmitState) => {
//     setClientError(null);

//     // گارد نهایی نوع شخص بر اساس طول کد ملی
//     const digits = onlyDigits(state.formValues.NationalCode ?? "");
//     const typeFromCode = userTypeFromNationalCode(digits);

//     if (typeFromCode === null) {
//       setClientError(
//         "کد ملی باید ۱۰ رقم (شخص حقیقی) یا ۱۱ رقم (شخص حقوقی) باشد."
//       );
//       return;
//     }
//     if (typeFromCode !== state.userType) {
//       setClientError(
//         typeFromCode === "User"
//           ? "کد ملی ۱۰ رقمی است؛ ثبت‌نام باید به‌صورت شخص حقیقی انجام شود."
//           : "شناسه ملی ۱۱ رقمی است؛ ثبت‌نام باید به‌صورت شخص حقوقی انجام شود."
//       );
//       return;
//     }

//     if (state.userType === "legal") {
//       const payload = buildSupervisorLegalPayload({
//         formValues: state.formValues,
//         fields: state.fields,
//         qualifications: state.qualifications,
//         experienceYears: state.experienceYears,
//         activeProjects: state.activeProjects,
//         summary: state.summary,
//         salary: state.salary,
//         insurance: state.insurance,
//         weeklyHours: state.weeklyHours,
//         payloadTotalCapacity: state.payloadTotalCapacity,
//         allocatedCapacity: state.allocatedCapacity,
//         minMonthlyHours: state.minMonthlyHours,
//         traineeCertificate: state.traineeCertificate,
//         backend: backendData,
//       });

//       const validationError = validateLegalBeforeSubmit(payload);
//       if (validationError) {
//         setClientError(validationError);
//         return;
//       }

//       registerLegal(payload, {
//         onSuccess: () => {
//           legalQuery.refetch?.();
//         },
//         onError: (err: any) => {
//           const msg =
//             err?.response?.data?.message ||
//             "خطا در ثبت اطلاعات سرپرست حقوقی. لطفاً دوباره تلاش کنید.";
//           setClientError(msg);
//         },
//       });
//       return;
//     }

//     const payload = buildSupervisorRealPayload({
//       formValues: state.formValues,
//       fields: state.fields,
//       qualifications: state.qualifications,
//       experienceYears: state.experienceYears,
//       activeProjects: state.activeProjects,
//       summary: state.summary,
//       salary: state.salary,
//       insurance: state.insurance,
//       weeklyHours: state.weeklyHours,
//       payloadTotalCapacity: state.payloadTotalCapacity,
//       allocatedCapacity: state.allocatedCapacity,
//       minMonthlyHours: state.minMonthlyHours,
//       traineeCertificate: state.traineeCertificate,
//       backend: backendData,
//       cvFile: state.resumeFile ?? undefined,
//     });

//     const validationError = validateBeforeSubmit(payload);
//     if (validationError) {
//       setClientError(validationError);
//       return;
//     }

//     registerReal(payload, {
//       onSuccess: () => {
//         realQuery.refetch?.();
//       },
//       onError: (err: any) => {
//         const msg =
//           err?.response?.data?.message ||
//           "خطا در ثبت اطلاعات سرپرست. لطفاً دوباره تلاش کنید.";
//         setClientError(msg);
//       },
//     });
//   };

//   // فقط لود اولیه صفحه، کل صفحه را با Loading عوض می‌کند
//   if (realQuery.isLoading) return <Loading />;

//   return (
//     <div className="w-full px-4 md:px-7 py-6">
//       <div className="mx-auto flex w-full flex-col gap-5">
//         {clientError && (
//           <div
//             dir="rtl"
//             className="w-full rounded-xl border border-red-300 bg-red-50 p-4 text-xs text-red-800"
//           >
//             <p className="font-bold mb-1">خطا در ثبت اطلاعات:</p>
//             <p>{clientError}</p>
//           </div>
//         )}

//         {legalNotFound ? (
//           <LegalNotFound onBackToReal={() => handleUserTypeChange("User")} />
//         ) : (
//           <PersonalInfoForm
//             userType={userType}
//             onUserTypeChange={handleUserTypeChange}
//             backendData={backendData}
//             isTabLoading={isLegalTab && legalQuery.isLoading}
//             isSubmitting={isLegalTab ? isLegalPending : isRealPending}
//             onSubmit={handleSubmit}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import {
  Settings,
  Trash2,
  Upload,
  FileText,
  Eye,
  TriangleAlert,
  ArrowUpToLine,
} from "lucide-react";

import Loading from "@/app/components/Loading";
import { Input, TextArea } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/Button";
import SwitchButton from "@/app/components/ui/Button/switchButton";
import { Select } from "@/app/components/ui/input/SelectSilde";
import { cn } from "@/lib/cn";
import JalaliDatePicker from "@/lib/jalaliDatePicker";
import { getYesterday, isValidISODate, toISODate } from "@/lib/date-utils";
import { toGregorian, toJalaali } from "jalaali-js";
import api from "@/core/config/api";
import {
  useRegisterSupervisorLegal,
  useRegisterSupervisorReal,
} from "@/core/services/supervisor/mutation";
import {
  useGetLegalInfo,
  useGetRealInfo,
} from "@/core/services/supervisor/queris";

/* ============================================================
   0) Types & Config
   ============================================================ */

export type UserType = "User" | "legal";

const TOTAL_CAPACITY_BY_USER_TYPE: Record<UserType, number> = {
  User: 3,
  legal: 5,
};

/** حداقل مجاز برای سقف پذیرش من (بک‌اند: باید > 1 باشد) */
const MIN_ALLOCATED_CAPACITY = 2;

interface Item {
  value: string;
  active: boolean;
}

interface ResumeFile {
  name: string;
  size: number;
  uploadedAt: string;
  url?: string;
}

interface FormValues {
  FullName: string;
  CompanyName: string;
  LicenseNumber: string;
  NationalCode: string;
  Birthday: string;
  Birthplace: string;
  PhoneNumber: string;
  Address: string;
  NezamRegisterCode: string;
  LicenseBase: string;
  LicenseYear: string;
}

const emptyForm: FormValues = {
  FullName: "",
  CompanyName: "",
  LicenseNumber: "",
  NationalCode: "",
  Birthday: "",
  Birthplace: "",
  PhoneNumber: "",
  Address: "",
  NezamRegisterCode: "",
  LicenseBase: "",
  LicenseYear: "",
};

const usersType: { id: number; title: string; type: UserType }[] = [
  { id: 1, title: "شخص حقیقی", type: "User" },
  { id: 2, title: "شخص حقوقی", type: "legal" },
];

/* ============================================================
   1) Enum نگاشت‌ها (مطابق بک‌اند)
   ============================================================ */

const fieldOptions: { label: string; value: string }[] = [
  { label: "مهندسی مکانیک", value: "1" },
  { label: "مهندسی برق", value: "2" },
  { label: "مهندسی معماری", value: "4" },
  { label: "مهندسی عمران", value: "5" },
  { label: "شهرسازی", value: "6" },
  { label: "نقشه‌برداری", value: "7" },
  { label: "ترافیک", value: "8" },
  { label: "جوش", value: "9" },
  { label: "خاک و پی", value: "10" },
];

const qualificationOptions: { label: string; value: string }[] = [
  { label: "نظارت", value: "1" },
  { label: "طراحی", value: "2" },
  { label: "مجری", value: "3" },
  { label: "آزمایشگاه", value: "4" },
];

const insuranceOptions = [
  { value: "social", label: "بیمه تأمین اجتماعی" },
  { value: "none", label: "بدون بیمه" },
];

/* ============================================================
   2) Helpers — Date / Digits / NationalCode
   ============================================================ */

const persianToISO = (val: string | null | undefined): string => {
  if (!val) return "";
  const m = String(val).match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
  if (!m) return "";
  const [, y, mo, d] = m;
  const year = Number(y);
  if (year > 1900) {
    return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  const g = toGregorian(year, Number(mo), Number(d));
  return `${g.gy}-${String(g.gm).padStart(2, "0")}-${String(g.gd).padStart(2, "0")}`;
};

const isoToPersian = (iso: string | null | undefined): string => {
  if (!iso) return "";
  const m = String(iso).match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (!m) return "";
  const [, y, mo, d] = m;
  const gy = Number(y);
  if (gy < 1900) return iso;
  const j = toJalaali(gy, Number(mo), Number(d));
  return `${j.jy}/${String(j.jm).padStart(2, "0")}/${String(j.jd).padStart(2, "0")}`;
};

const toEnglishDigits = (value: string) =>
  value
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

const onlyDigits = (value: string) => toEnglishDigits(value).replace(/\D/g, "");

/** ۱۰ رقم → حقیقی، ۱۱ رقم → حقوقی، در غیر این صورت null */
function userTypeFromNationalCode(raw: string): UserType | null {
  const digits = onlyDigits(raw ?? "");
  if (digits.length === 10) return "User";
  if (digits.length === 11) return "legal";
  return null;
}

/* ============================================================
   3) Validation schema
   ============================================================ */

const pastDate = (label: string) =>
  Yup.string()
    .trim()
    .required(`${label} الزامی است`)
    .test("is-past-date", `${label} باید قبل از امروز باشد`, (value) => {
      if (!value) return true;
      return isValidISODate(value) && value < toISODate(new Date());
    });

const commonShape = {
  LicenseNumber: Yup.string().trim().required("شماره پروانه اشتغال الزامی است"),
  Birthday: pastDate("تاریخ تولد"),
  Birthplace: Yup.string().trim().required("محل تولد الزامی است"),
  PhoneNumber: Yup.string().trim().required("شماره تماس الزامی است"),
  Address: Yup.string().trim().required("آدرس الزامی است"),
  NezamRegisterCode: Yup.string()
    .trim()
    .required("شماره عضویت نظام مهندسی الزامی است"),
  LicenseBase: Yup.string()
    .trim()
    .required("پایه پروانه الزامی است")
    .test("valid-base", "پایه پروانه معتبر نیست", (v) => {
      const n = Number(v);
      return !Number.isNaN(n) && n >= 0 && n <= 4;
    }),
  LicenseYear: Yup.string()
    .trim()
    .required("سال صدور پروانه الزامی است")
    .matches(/^[0-9۰-۹]{4}$/, "سال باید ۴ رقم باشد"),
};

const userSchema = Yup.object({
  ...commonShape,
  NationalCode: Yup.string()
    .trim()
    .required("کد ملی الزامی است")
    .matches(/^[0-9۰-۹]{10}$/, "برای شخص حقیقی، کد ملی باید ۱۰ رقم باشد"),
  FullName: Yup.string()
    .trim()
    .required("نام و نام خانوادگی الزامی است")
    .test(
      "full-name",
      "نام و نام خانوادگی را کامل وارد کنید",
      (v) => (v ?? "").trim().split(/\s+/).filter(Boolean).length >= 2
    ),
});

const legalSchema = Yup.object({
  ...commonShape,
  NationalCode: Yup.string()
    .trim()
    .required("شناسه ملی الزامی است")
    .matches(/^[0-9۰-۹]{11}$/, "برای شخص حقوقی، شناسه ملی باید ۱۱ رقم باشد"),
  CompanyName: Yup.string().trim().required("نام شرکت / موسسه الزامی است"),
  Birthday: pastDate("تاریخ تأسیس"),
  Birthplace: Yup.string().trim().required("محل شرکت الزامی است"),
});

/* ============================================================
   4) Pre-fill نگاشت از backendData
   ============================================================ */

function realInfoToFormValues(data: any): FormValues {
  const firstName = data?.firstName ?? "";
  const lastName = data?.lastName ?? "";
  return {
    FullName: `${firstName} ${lastName}`.trim(),
    CompanyName: "",
    LicenseNumber: data?.licenseNumber ?? "",
    NationalCode: data?.nationalCode ?? "",
    Birthday: persianToISO(data?.birthDate),
    Birthplace: data?.birthPlace ?? "",
    PhoneNumber: data?.phoneNumber ?? "",
    Address: data?.address ?? "",
    NezamRegisterCode: data?.nezamRegisterCode ?? "",
    LicenseBase: data?.licenseBase != null ? String(data.licenseBase) : "",
    LicenseYear: data?.licenseYear ? String(data.licenseYear) : "",
  };
}

/** نگاشت LegalSupervisorDto → فرم (مطابق DTO بک‌اند) */
function legalInfoToFormValues(data: any): FormValues {
  return {
    ...emptyForm,
    CompanyName: data?.name ?? "",
    LicenseNumber: data?.licenseNumber ?? "",
    NationalCode: data?.nationalId ?? "",
    Birthday: persianToISO(data?.registerDate),
    Birthplace: data?.registerPlace ?? "",
    PhoneNumber: data?.phoneNumber ?? "",
    Address: data?.address ?? "",
    NezamRegisterCode: data?.nezamRegisterCode ?? "",
    LicenseBase: data?.licenseBase != null ? String(data.licenseBase) : "",
    LicenseYear: data?.licenseYear ? String(data.licenseYear) : "",
  };
}

function realInfoToLicenseStatus(data: any) {
  const field = Array.isArray(data?.fieldList)
    ? data.fieldList
        .filter((x: number) => x > 0)
        .map((x: number) => ({ value: String(x), active: true }))
    : data?.field != null && data.field > 0
      ? [{ value: String(data.field), active: true }]
      : [];
  const quals = Array.isArray(data?.competenceList)
    ? data.competenceList
        .filter((c: number) => c > 0)
        .map((c: number) => ({ value: String(c), active: true }))
    : [];
  return {
    fields: field as Item[],
    qualifications: quals as Item[],
    experienceYears:
      data?.workExperience != null && data.workExperience > 0
        ? String(data.workExperience)
        : "",
    activeProjects:
      data?.activeProjectCount != null && data.activeProjectCount > 0
        ? String(data.activeProjectCount)
        : "",
    summary: data?.experienceSummery ?? "",
  };
}

function realInfoToRegistrationConditions(data: any) {
  return {
    salary:
      data?.traineSalary != null && data.traineSalary > 0
        ? String(data.traineSalary)
        : "",
    insurance: (data?.traineInsurnce ? "social" : "none") as "social" | "none",
    weeklyHours:
      data?.traineHoursByWeek != null && data.traineHoursByWeek > 0
        ? String(data.traineHoursByWeek)
        : "",
    traineeCertificate: !!data?.traineCertificate,
  };
}

function realInfoToCommitment(data: any, fallbackTotal = 0) {
  const backendAcceptance = Number(data?.acceptanceCapacity ?? 0);
  const displayTotalCapacity =
    backendAcceptance > 1 ? backendAcceptance : Math.max(fallbackTotal, 3);

  return {
    allocatedCapacity:
      data?.traineeCapacity != null && data.traineeCapacity > 0
        ? String(data.traineeCapacity)
        : data?.assignedCapacity != null && data.assignedCapacity > 0
          ? String(data.assignedCapacity)
          : "",
    minMonthlyHours:
      data?.minHoursByMonth != null && data.minHoursByMonth > 0
        ? String(data.minHoursByMonth)
        : "",
    displayTotalCapacity,
    payloadTotalCapacity: displayTotalCapacity,
  };
}

/* ============================================================
   5) buildPayload & validateBeforeSubmit
   ============================================================ */

interface BuildPayloadParams {
  formValues: FormValues;
  fields: Item[];
  qualifications: Item[];
  experienceYears: string;
  activeProjects: string;
  summary: string;
  salary: string;
  insurance: "social" | "none";
  weeklyHours: string;
  payloadTotalCapacity: number;
  allocatedCapacity: string;
  minMonthlyHours: string;
  traineeCertificate: boolean;
  backend: any | null;
}

function buildSupervisorRealPayload(
  params: BuildPayloadParams & { cvFile?: File | null }
) {
  const { formValues, fields, qualifications, backend, cvFile } = params;

  const fullName = (formValues.FullName ?? "").trim();
  const [firstName, ...rest] = fullName.split(/\s+/);
  const lastName = rest.join(" ");

  const activeFields = fields.filter((f) => f.active);
  const activeQuals = qualifications.filter((q) => q.active);

  return {
    fldMemberId: backend?.fldMemberId ?? 0,
    memberId: backend?.memberId ?? "00000000-0000-0000-0000-000000000000",
    id: backend?.id ?? 0,
    firstName: firstName || "",
    lastName: lastName || "",
    nationalCode: formValues.NationalCode ?? "",
    licenseNumber: formValues.LicenseNumber ?? "",
    phoneNumber: formValues.PhoneNumber ?? "",
    birthDate: isoToPersian(formValues.Birthday),
    birthPlace: formValues.Birthplace ?? "",
    nezamRegisterCode: formValues.NezamRegisterCode ?? "",
    address: formValues.Address ?? "",
    competenceList: activeQuals
      .map((q) => Number(q.value))
      .filter((n) => !Number.isNaN(n) && n > 0),
    field: activeFields[0] ? Number(activeFields[0].value) : 0,
    licenseBase: Number(formValues.LicenseBase) || 0,
    workExperience: Number(params.experienceYears) || 0,
    activeProjectCount: Number(params.activeProjects) || 0,
    licenseYear: Number(formValues.LicenseYear) || 0,
    experienceSummery: params.summary || "",
    traineSalary: Number(params.salary) || 0,
    traineInsurnce: params.insurance === "social",
    traineHoursByWeek: Number(params.weeklyHours) || 0,
    traineeCertificate: params.traineeCertificate,
    acceptanceCapacity: params.payloadTotalCapacity,
    traineeCapacity: Number(params.allocatedCapacity) || 0,
    userId: backend?.userId ?? "00000000-0000-0000-0000-000000000000",
    cvFile: cvFile ?? undefined,
  };
}

function validateBeforeSubmit(
  payload: ReturnType<typeof buildSupervisorRealPayload>
): string | null {
  if (!payload.firstName) return "نام الزامی است";
  if (!payload.lastName) return "نام خانوادگی الزامی است";
  if (!payload.nationalCode) return "کد ملی الزامی است";
  if (!payload.licenseNumber) return "شماره پروانه الزامی است";
  if (payload.workExperience <= 0) return "سابقه کار باید بزرگتر از ۰ باشد";
  if (payload.field <= 0) return "رشته فعالیت الزامی است";
  if (payload.licenseBase <= 0) return "پایه پروانه الزامی است";
  if (payload.licenseYear <= 0) return "سال صدور پروانه الزامی است";
  if (payload.competenceList.length === 0)
    return "حداقل یک صلاحیت انتخاب کنید";
  if (payload.traineSalary <= 0) return "حقوق ماهانه الزامی است";
  if (payload.traineHoursByWeek <= 0) return "ساعات حضور هفتگی الزامی است";
  if (payload.acceptanceCapacity <= 0) return "ظرفیت پذیرش الزامی است";
  if (payload.traineeCapacity <= 1)
    return "سقف پذیرش من باید حداقل ۲ باشد";
  if (!payload.cvFile) return "فایل رزومه (PDF) الزامی است";
  return null;
}

function buildSupervisorLegalPayload(
  params: BuildPayloadParams & { cvFile?: File | null }
) {
  const { formValues, fields, qualifications, backend, cvFile } = params;

  const activeFields = fields.filter((f) => f.active);
  const activeQuals = qualifications.filter((q) => q.active);

  return {
    fldMemberId: backend?.fldMemberId ?? 0,
    memberId: backend?.memberId ?? "00000000-0000-0000-0000-000000000000",
    id: backend?.id ?? 0,
    name: (formValues.CompanyName ?? "").trim(),
    licenseNumber: formValues.LicenseNumber ?? "",
    nationalId: toEnglishDigits(formValues.NationalCode ?? ""),
    registerDate: isoToPersian(formValues.Birthday),
    registerPlace: formValues.Birthplace ?? "",
    phoneNumber: toEnglishDigits(formValues.PhoneNumber ?? ""),
    nezamRegisterCode: formValues.NezamRegisterCode ?? "",
    address: formValues.Address ?? "",
    fieldList: activeFields
      .map((f) => Number(f.value))
      .filter((n) => !Number.isNaN(n) && n > 0),
    competenceList: activeQuals
      .map((q) => Number(q.value))
      .filter((n) => !Number.isNaN(n) && n > 0),
    licenseBase: Number(formValues.LicenseBase) || 0,
    workExperience: Number(params.experienceYears) || 0,
    activeProjectCount: Number(params.activeProjects) || 0,
    licenseYear: Number(formValues.LicenseYear) || 0,
    experienceSummery: params.summary || "",
    traineSalary: Number(params.salary) || 0,
    traineInsurnce: params.insurance === "social",
    traineHoursByWeek: Number(params.weeklyHours) || 0,
    traineeCertificate: params.traineeCertificate,
    acceptanceCapacity: params.payloadTotalCapacity,
    traineeCapacity: Number(params.allocatedCapacity) || 0,
    userId: backend?.userId ?? "00000000-0000-0000-0000-000000000000",
    cvFile: cvFile ?? undefined,
  };
}

function validateLegalBeforeSubmit(
  payload: ReturnType<typeof buildSupervisorLegalPayload>
): string | null {
  if (!payload.name) return "نام شرکت / موسسه الزامی است";
  if (!payload.nationalId) return "شناسه ملی الزامی است";
  if (!payload.licenseNumber) return "شماره پروانه الزامی است";
  if (!payload.registerDate) return "تاریخ ثبت الزامی است";
  if (!payload.registerPlace) return "محل ثبت الزامی است";
  if (payload.workExperience <= 0) return "سابقه کار باید بزرگتر از ۰ باشد";
  if (payload.fieldList.length === 0) return "حداقل یک رشته فعالیت انتخاب کنید";
  if (payload.licenseBase <= 0) return "پایه پروانه الزامی است";
  if (payload.licenseYear <= 0) return "سال صدور پروانه الزامی است";
  if (payload.competenceList.length === 0)
    return "حداقل یک صلاحیت انتخاب کنید";
  if (payload.traineSalary <= 0) return "حقوق ماهانه الزامی است";
  if (payload.traineHoursByWeek <= 0) return "ساعات حضور هفتگی الزامی است";
  if (payload.acceptanceCapacity <= 0) return "ظرفیت پذیرش الزامی است";
  if (payload.traineeCapacity <= 1)
    return "سقف پذیرش من باید حداقل ۲ باشد";
  if (!payload.cvFile) return "فایل رزومه (PDF) الزامی است";
  return null;
}

/* ============================================================
   6) UI Sub-Components
   ============================================================ */

const labelClassName = "text-2xs font-semibold text-neutral-900";

function ChipGroup({
  label,
  options,
  items,
  onChange,
  multiple,
}: {
  label: string;
  options: { label: string; value: string }[];
  items: Item[];
  onChange: (items: Item[]) => void;
  multiple: boolean;
}) {
  const isSelected = (value: string) => items.some((i) => i.value === value);

  const handleClick = (value: string) => {
    if (isSelected(value)) {
      onChange(items.filter((i) => i.value !== value));
    } else if (multiple) {
      onChange([...items, { value, active: true }]);
    } else {
      onChange([{ value, active: true }]);
    }
  };

  return (
    <div className="w-full">
      <span className={cn(labelClassName, "mb-3 block")}>{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = isSelected(option.value);
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => handleClick(option.value)}
              className={cn(
                "h-9 rounded-lg border px-4 text-2xs transition-colors",
                selected
                  ? "border-input-800 bg-input-800 font-semibold text-white"
                  : "border-neutral-200 bg-neutral-50 text-neutral-900 hover:bg-neutral-100"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ActivationRow({
  title,
  active,
  onToggle,
}: {
  title: string;
  active: boolean;
  onToggle: (next: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <span className="text-2xs font-semibold text-neutral-900">{title}</span>
        <span
          className={cn(
            "flex h-5 items-center rounded-full border px-2 text-3xs",
            active
              ? "border-emerald-300 bg-emerald-100 text-emerald-800"
              : "border-neutral-300 bg-neutral-100 text-neutral-600"
          )}
        >
          {active ? "فعال" : "غیرفعال"}
        </span>
      </div>
      <SwitchButton checked={active} onChange={onToggle} size="lg" />
    </div>
  );
}

function LicenseStatus({
  stepNumber = "۲",
  fields,
  setFields,
  qualifications,
  setQualifications,
  experienceYears,
  setExperienceYears,
  activeProjects,
  setActiveProjects,
  summary,
  setSummary,
  experienceYearsError,
  multipleFields = false,
}: {
  multipleFields?: boolean;
  stepNumber?: string;
  fields: Item[];
  setFields: (v: Item[]) => void;
  qualifications: Item[];
  setQualifications: (v: Item[]) => void;
  experienceYears: string;
  setExperienceYears: (v: string) => void;
  activeProjects: string;
  setActiveProjects: (v: string) => void;
  summary: string;
  setSummary: (v: string) => void;
  experienceYearsError?: string;
}) {
  const labelOf = (options: { label: string; value: string }[], v: string) =>
    options.find((o) => o.value === v)?.label ?? v;

  const setActive = (
    items: Item[],
    setItems: (items: Item[]) => void,
    value: string,
    active: boolean
  ) => setItems(items.map((i) => (i.value === value ? { ...i, active } : i)));

  const hasSelection = fields.length > 0 || qualifications.length > 0;

  return (
    <div
      dir="rtl"
      className="w-full rounded-2xl border-2 border-neutral-200 bg-white p-5 shadow-xs sm:p-7"
    >
      <div className="mb-8 flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef0f8] text-xs text-blue-800">
          {stepNumber}
        </span>
        <h3 className="text-s font-semibold text-neutral-900">
          رشته فعالیت، صلاحیت و سوابق
        </h3>
      </div>

      <div className="flex flex-col gap-5">
        <ChipGroup
          label={
            multipleFields ? "رشته‌های فعالیت (چند انتخابی)" : "رشتهٔ فعالیت"
          }
          options={fieldOptions}
          items={fields}
          onChange={setFields}
          multiple={multipleFields}
        />

        <ChipGroup
          label="صلاحیت‌ها (چند انتخابی)"
          options={qualificationOptions}
          items={qualifications}
          onChange={setQualifications}
          multiple
        />

        {hasSelection && (
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-4">
            <div className="flex items-center gap-2">
              <Settings className="size-4 text-neutral-800" strokeWidth={1.75} />
              <h4 className="text-2xs font-semibold text-neutral-900">
                مدیریت فعال‌سازی رشته‌ها و صلاحیت‌ها
              </h4>
            </div>
            <p className="mt-2 text-3xs text-neutral-600">
              با غیرفعال کردن یک رشته یا صلاحیت، درخواست کارآموزی جدید برای آن
              رشته/صلاحیت برای شما قابل قبول نخواهد بود.
            </p>

            <div className="mt-2 divide-y divide-neutral-200">
              {fields.map((item) => (
                <ActivationRow
                  key={`field-${item.value}`}
                  title={labelOf(fieldOptions, item.value)}
                  active={item.active}
                  onToggle={(next) =>
                    setActive(fields, setFields, item.value, next)
                  }
                />
              ))}
              {qualifications.map((item) => (
                <ActivationRow
                  key={`qualification-${item.value}`}
                  title={`صلاحیت ${labelOf(qualificationOptions, item.value)}`}
                  active={item.active}
                  onToggle={(next) =>
                    setActive(
                      qualifications,
                      setQualifications,
                      item.value,
                      next
                    )
                  }
                />
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Input
              label="سابقه کار (سال)"
              variant="default"
              labelClassName={labelClassName}
              className="mt-2"
              inputSize="sm"
              type="number"
              min={1}
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
              error={!!experienceYearsError}
              errorMessage={experienceYearsError}
            />
          </div>
          <div>
            <Input
              label="تعداد پروژه فعال"
              variant="default"
              labelClassName={labelClassName}
              className="mt-2"
              inputSize="sm"
              type="number"
              min={0}
              value={activeProjects}
              onChange={(e) => setActiveProjects(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full">
          <label
            htmlFor="experience-summary"
            className={cn(labelClassName, "mb-2 block")}
          >
            خلاصه سوابق
          </label>
          <TextArea
            id="experience-summary"
            variant="default"
            rounded="xl"
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="خلاصه‌ای از سوابق حرفه‌ای..."
            className="min-h-0 text-xs"
          />
        </div>
      </div>
    </div>
  );
}

function RegistrationConditions({
  salary,
  setSalary,
  insurance,
  setInsurance,
  weeklyHours,
  setWeeklyHours,
  traineeCertificate,
  setTraineeCertificate,
  stepNumber = "۴",
}: {
  salary: string;
  setSalary: (v: string) => void;
  insurance: "social" | "none";
  setInsurance: (v: "social" | "none") => void;
  weeklyHours: string;
  setWeeklyHours: (v: string) => void;
  traineeCertificate: boolean;
  setTraineeCertificate: (v: boolean) => void;
  stepNumber?: string;
}) {
  return (
    <div
      dir="rtl"
      className="flex w-full flex-col gap-5 rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6 bg-white"
    >
      <div className="flex items-center mb-7 gap-2 justify-between w-full">
        <div className="flex justify-center items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
            {stepNumber}
          </span>
          <h3 className="text-s font-bold text-gray-800">شرایط پذیرش کارآموز</h3>
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
              inputMode="numeric"
              isPrice
              value={salary}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSalary(onlyDigits(e.target.value))
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
              onChange={(v) => setInsurance(v as "social" | "none")}
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
              inputMode="numeric"
              value={weeklyHours}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setWeeklyHours(onlyDigits(e.target.value))
              }
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={traineeCertificate}
                onChange={(e) => setTraineeCertificate(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-2xs font-semibold text-gray-900">
                گواهی پایان دوره صادر می‌شود
              </span>
            </label>
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

function CommitmentAgreement({
  stepNumber = "۵",
  supervisorName,
  licenseNumber,
  displayTotalCapacity,
  allocatedCapacity,
  setAllocatedCapacity,
  minMonthlyHours,
  setMinMonthlyHours,
  isSubmitting = false,
  onSubmit,
}: {
  stepNumber?: string;
  supervisorName?: string;
  licenseNumber?: string;
  displayTotalCapacity: number;
  allocatedCapacity: string;
  setAllocatedCapacity: (v: string) => void;
  minMonthlyHours: string;
  setMinMonthlyHours: (v: string) => void;
  isSubmitting?: boolean;
  onSubmit?: () => void;
}) {
  const [accepted, setAccepted] = useState(false);
  const [capacityError, setCapacityError] = useState<string | undefined>();

  const MAX_ALLOCATED = Math.max(displayTotalCapacity, MIN_ALLOCATED_CAPACITY);

  useEffect(() => {
    if (allocatedCapacity === "") return;
    const clamped = Math.min(
      Math.max(Number(allocatedCapacity) || 0, MIN_ALLOCATED_CAPACITY),
      MAX_ALLOCATED
    );
    if (String(clamped) !== allocatedCapacity) {
      setAllocatedCapacity(String(clamped));
    }
  }, [MAX_ALLOCATED, allocatedCapacity, setAllocatedCapacity]);

  const handleAllocatedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = onlyDigits(e.target.value);
    if (digits === "") {
      setAllocatedCapacity("");
      setCapacityError("سقف پذیرش من الزامی است");
      return;
    }
    const n = Number(digits);
    if (n < MIN_ALLOCATED_CAPACITY) {
      setCapacityError(
        `سقف پذیرش من باید حداقل ${MIN_ALLOCATED_CAPACITY} باشد`
      );
    } else if (n > MAX_ALLOCATED) {
      setCapacityError(
        `سقف پذیرش من نمی‌تواند بیشتر از ${MAX_ALLOCATED} باشد`
      );
    } else {
      setCapacityError(undefined);
    }
    setAllocatedCapacity(String(Math.min(n, MAX_ALLOCATED)));
  };

  return (
    <div
      dir="rtl"
      className="w-full rounded-2xl border-2 shadow-xs border-neutral-200 bg-white p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-8">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
          {stepNumber}
        </span>
        <h3 className="text-s font-bold text-gray-800">
          ظرفیت پذیرش و تعهد سرپرستی
        </h3>
      </div>

      <div className="flex flex-col">
        <div className="w-full flex flex-col md:flex-row justify-center items-stretch md:items-center gap-3 mb-5">
          <div className="w-full md:w-1/3">
            <Input
              label="ظرفیت کل پذیرش"
              variant="default"
              labelClassName="mb-2 text-xs"
              inputSize="sm"
              value={String(displayTotalCapacity)}
              readOnly
              disabled
            />
          </div>
          <div className="w-full md:w-1/3">
            <Input
              label="سقف پذیرش من"
              variant="default"
              labelClassName="mb-2 text-xs"
              inputSize="sm"
              inputMode="numeric"
              value={allocatedCapacity}
              onChange={handleAllocatedChange}
              error={!!capacityError}
              errorMessage={capacityError}
            />
            <p className="mt-1 text-3xs text-neutral-500">
              حداقل {MIN_ALLOCATED_CAPACITY} و حداکثر {MAX_ALLOCATED}
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <Input
              label="حداقل ساعت ماهانه"
              variant="default"
              labelClassName="mb-2 text-xs"
              inputSize="sm"
              inputMode="numeric"
              value={minMonthlyHours}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMinMonthlyHours(onlyDigits(e.target.value))
              }
            />
          </div>
        </div>

        <div className="rounded-xl border-r-5 border-input-800 bg-slate-50 px-4 py-4 mb-2">
          <h4 className="text-xs font-bold text-neutral-800 mb-2">
            متن تعهدنامه سرپرستی
          </h4>
          <p className="text-[11.5px] leading-6 text-gray-700 text-justify">
            اینجانب {supervisorName || "..............."} با شماره پروانه{" "}
            {licenseNumber || "..............."} متعهد می‌شوم که نظارت فنی و
            تخصصی بر کارآموزان زیر نظر خود را به‌طور مستمر انجام دهم،
            گزارش‌های ماهانه را در مهلت ۷ روز بررسی و تأیید/اصلاح نمایم 
          </p>

          <div className="border-t border-neutral-300 mt-4 pt-3">
            <p className="text-2xs leading-6 text-neutral-600">
              <span className="font-bold text-neutral-800">بند ظرفیت: </span>
              ظرفیت پذیرش کارآموز توسط سازمان تعیین می‌شود و سرپرست متعهد
              می‌گردد از سقف تعیین‌شده فراتر نرود.
            </p>
          </div>
        </div>

        <div className="flex mt-2 justify-start items-start md:items-center gap-2 mb-5">
          <input
            id="commitment-accepted"
            type="checkbox"
            className="w-4 h-4 mt-0.5 md:mt-0 shrink-0"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <label
            htmlFor="commitment-accepted"
            className="text-[11.5px] font-medium text-neutral-950 cursor-pointer"
          >
            مسئولیت تعهدنامه را می‌پذیرم.
          </label>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-start gap-3">
          <Button
            type="button"
            variant="solid"
            color="input"
            className="text-sm w-full md:w-auto"
            size="xs"
            rounded="lg"
            disabled={!accepted || isSubmitting || !!capacityError}
            onClick={onSubmit}
          >
            {isSubmitting ? "در حال ارسال..." : "ارسال درخواست ثبت‌نام سرپرستی"}
          </Button>
        </div>
      </div>
    </div>
  );
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const formatSize = (bytes: number) =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

function ResumeUploader({
  initialResume = null,
  onChange,
  required = false,
  errorMessage,
}: {
  initialResume?: ResumeFile | null;
  onChange?: (resume: ResumeFile | null, file?: File) => void;
  required?: boolean;
  errorMessage?: string;
}) {
  const [resume, setResume] = useState<ResumeFile | null>(initialResume);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("فقط فایل PDF مجاز است.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("حجم فایل نباید بیشتر از ۵ مگابایت باشد.");
      return;
    }
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    const url = URL.createObjectURL(file);
    urlRef.current = url;

    const newResume: ResumeFile = {
      name: file.name,
      size: file.size,
      uploadedAt: new Date().toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
      url,
    };

    setError("");
    setResume(newResume);
    onChange?.(newResume, file);
  };

  const handleDelete = () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = undefined;
    setResume(null);
    setError("");
    onChange?.(null);
  };

  return (
    <div
      dir="rtl"
      className="w-full flex flex-col gap-4 mt-4 rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6 bg-white"
    >
      <div className="flex justify-start items-center gap-2 text-sm font-bold text-black mb-4">
        <ArrowUpToLine size={18} />
        <span>
          فایل رزومه
          {required && <span className="text-red-600 ml-1">*</span>}
        </span>
      </div>

      {resume && (
        <div className="w-full flex items-center justify-between gap-3 p-3 rounded-lg border border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-2 min-w-0">
            <FileText size={18} className="text-neutral-600 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-neutral-900 truncate">
                {resume.name}
              </p>
              <p className="text-3xs text-neutral-500">
                {formatSize(resume.size)} · {resume.uploadedAt}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {resume.url && (
              <button
                type="button"
                onClick={() => window.open(resume.url, "_blank")}
                className="cursor-pointer"
                aria-label="مشاهده رزومه"
              >
                <Eye size={17} />
              </button>
            )}
            <button
              type="button"
              onClick={handleDelete}
              className="cursor-pointer"
              aria-label="حذف رزومه"
            >
              <Trash2 size={17} color="red" />
            </button>
          </div>
        </div>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`w-full flex flex-col justify-center items-center gap-3 py-8 rounded-xl border-2 border-dashed transition-all duration-300 ${
          isDragging
            ? "border-input-700 bg-input-50"
            : errorMessage
              ? "border-red-400 bg-red-50"
              : "border-neutral-300 bg-white"
        }`}
      >
        <Upload size={36} className="text-neutral-500" />
        <p className="text-xs text-neutral-500">
          {resume
            ? "برای جایگزینی رزومه، فایل PDF جدید را اینجا رها کنید"
            : "فایل PDF رزومه را اینجا رها کنید"}
        </p>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 text-xs font-bold border border-neutral-300 rounded-lg bg-neutral-50 cursor-pointer hover:bg-neutral-100 transition-all duration-300"
        >
          انتخاب فایل
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            handleFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
        {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
      </div>

      {errorMessage && (
        <p className="text-xs text-red-600 font-medium">{errorMessage}</p>
      )}

      <div className="w-full flex justify-start items-center gap-2 p-3 rounded-lg bg-amber-50 border-r-4 border-amber-500 text-amber-800 text-xs">
        <TriangleAlert size={14} />
        <span>
          فایل رزومه برای کارآموزان در زمان انتخاب سرپرست قابل مشاهده خواهد بود.
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   7) PersonalInfoForm
   ============================================================ */

interface PersonalInfoFormSubmitState {
  formValues: FormValues;
  userType: UserType;
  fields: Item[];
  qualifications: Item[];
  experienceYears: string;
  activeProjects: string;
  summary: string;
  salary: string;
  insurance: "social" | "none";
  weeklyHours: string;
  traineeCertificate: boolean;
  allocatedCapacity: string;
  minMonthlyHours: string;
  payloadTotalCapacity: number;
  resume: ResumeFile | null;
  resumeFile: File | null;
}

interface PersonalInfoFormProps {
  stepNumber?: string;
  userType: UserType;
  /** اگر از روی کدملی حساب کاربری مشخص باشد، نوع شخص قفل است و دکمه‌ی دیگر نمایش داده نمی‌شود */
  lockedType?: UserType | null;
  /** مقادیر پیش‌فرض از CurrentUserInfo (فقط وقتی بک‌اند داده‌ای ندارد) */
  prefill?: Partial<FormValues>;
  onUserTypeChange: (t: UserType) => void;
  backendData?: any | null;
  isTabLoading?: boolean;
  isSubmitting?: boolean;
  onSubmit?: (state: PersonalInfoFormSubmitState) => void;
}

function PersonalInfoForm({
  stepNumber = "۱",
  userType,
  lockedType = null,
  prefill,
  onUserTypeChange,
  backendData,
  isTabLoading = false,
  isSubmitting = false,
  onSubmit,
}: PersonalInfoFormProps) {
  const yesterday = useMemo(() => getYesterday(), []);
  const isUser = userType === "User";
  const isLocked = lockedType !== null;

  const [fields, setFields] = useState<Item[]>([]);
  const [qualifications, setQualifications] = useState<Item[]>([]);
  const [experienceYears, setExperienceYears] = useState("");
  const [activeProjects, setActiveProjects] = useState("");
  const [summary, setSummary] = useState("");
  const [salary, setSalary] = useState("");
  const [insurance, setInsurance] = useState<"social" | "none">("none");
  const [weeklyHours, setWeeklyHours] = useState("");
  const [traineeCertificate, setTraineeCertificate] = useState(false);
  const [allocatedCapacity, setAllocatedCapacity] = useState("");
  const [minMonthlyHours, setMinMonthlyHours] = useState("");
  const [resume, setResume] = useState<ResumeFile | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | undefined>(undefined);
  const [experienceYearsError, setExperienceYearsError] = useState<
    string | undefined
  >(undefined);

  // فقط وقتی نوع شخص قفل نیست: کدملی تایپ‌شده با ریست شدن فرم از بین نرود
  const [typedNationalCode, setTypedNationalCode] = useState("");

  // با تغییر دیتای بک‌اند (یا تعویض تب) state های مستقل از Formik را همگام کن
  useEffect(() => {
    const license = realInfoToLicenseStatus(backendData);
    setFields(license.fields);
    setQualifications(license.qualifications);
    setExperienceYears(license.experienceYears);
    setActiveProjects(license.activeProjects);
    setSummary(license.summary);

    const reg = realInfoToRegistrationConditions(backendData);
    setSalary(reg.salary);
    setInsurance(reg.insurance);
    setWeeklyHours(reg.weeklyHours);
    setTraineeCertificate(reg.traineeCertificate);

    const commit = realInfoToCommitment(backendData);
    setAllocatedCapacity(commit.allocatedCapacity);
    setMinMonthlyHours(commit.minMonthlyHours);
  }, [backendData]);

  const dynamicInitial = useMemo<FormValues>(() => {
    let base: FormValues;

    if (!backendData) {
      // کاربر جدید (۴۰۴ یا بدون داده) → از CurrentUserInfo پیش‌پر کن
      base = { ...emptyForm, ...(prefill ?? {}) };
    } else {
      base = isUser
        ? realInfoToFormValues(backendData)
        : legalInfoToFormValues(backendData);
    }

    // کدملی حساب کاربری همیشه معتبر است
    if (prefill?.NationalCode) {
      return { ...base, NationalCode: prefill.NationalCode };
    }
    return typedNationalCode ? { ...base, NationalCode: typedNationalCode } : base;
  }, [backendData, isUser, prefill, typedNationalCode]);

  const commitment = useMemo(
    () =>
      realInfoToCommitment(
        backendData,
        TOTAL_CAPACITY_BY_USER_TYPE[userType]
      ),
    [backendData, userType]
  );

  return (
    <Formik
      enableReinitialize
      initialValues={dynamicInitial}
      validationSchema={isUser ? userSchema : legalSchema}
      onSubmit={(values) => {
        if (!experienceYears || Number(experienceYears) <= 0) {
          setExperienceYearsError("سابقه کار باید حداقل ۱ سال باشد");
          return;
        }
        setExperienceYearsError(undefined);

        // گارد نهایی: کد ملی باید با نوع شخص همخوانی داشته باشد
        const digits = onlyDigits(values.NationalCode ?? "");
        const typeFromCode = userTypeFromNationalCode(digits);
        if (typeFromCode === null) {
          return; // پیام خطای فیلد توسط Yup نمایش داده می‌شود
        }
        if (typeFromCode !== userType) {
          return;
        }

        // فایل رزومه برای هر دو نوع شخص الزامی است (طبق Swagger: CVFile *)
        if (!resumeFile) {
          setResumeError("فایل رزومه (PDF) الزامی است");
          return;
        }
        setResumeError(undefined);

        onSubmit?.({
          formValues: values,
          userType,
          fields,
          qualifications,
          experienceYears,
          activeProjects,
          summary,
          salary,
          insurance,
          weeklyHours,
          traineeCertificate,
          allocatedCapacity,
          minMonthlyHours,
          payloadTotalCapacity: commitment.payloadTotalCapacity,
          resume,
          resumeFile,
        });
      }}
    >
      {({
        getFieldProps,
        errors,
        touched,
        values,
        setFieldValue,
        setFieldTouched,
        handleSubmit,
        submitCount,
      }) => {
        const f = (name: keyof FormValues) => ({
          name,
          field: getFieldProps(name),
          error: !!(touched[name] && errors[name]),
          errorMessage: errors[name] as string | undefined,
        });

        const errorList = Object.values(errors).filter(Boolean) as string[];

        const nationalCodeDigits = onlyDigits(values.NationalCode ?? "");
        const nationalCodeLength = nationalCodeDigits.length;

        // قفل بر اساس کدملی حساب کاربری؛ در غیر این صورت بر اساس طول کدملی تایپ‌شده
        const visibleTypes = usersType.filter((item) => {
          if (lockedType) return item.type === lockedType;
          if (nationalCodeLength === 10) return item.type === "User";
          if (nationalCodeLength === 11) return item.type === "legal";
          return true;
        });

        return (
          <Form
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                (e.target as HTMLElement).tagName === "INPUT"
              ) {
                e.preventDefault();
              }
            }}
            className={cn(
              "w-full flex flex-col justify-center items-center gap-4",
              isTabLoading && "pointer-events-none opacity-60"
            )}
          >
            {isTabLoading && (
              <div
                dir="rtl"
                className="w-full rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800"
              >
                در حال دریافت اطلاعات...
              </div>
            )}

            {/* Card 1: اطلاعات هویتی */}
            <div className="w-full rounded-2xl border-2 shadow-xs border-neutral-200 sm:p-6 bg-white px-8 py-7">
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef0f8] text-xs text-blue-800">
                    {stepNumber}
                  </span>
                  <span className="text-s font-semibold text-neutral-900">
                    نوع شخص و اطلاعات هویتی
                  </span>
                </div>
                <div className="text-xs bg-neutral-100 text-neutral-500 border border-neutral-300 p-1 px-3 rounded-xl">
                  <span>الزامی</span>
                </div>
              </div>

              <div className="mt-8">
                <div className="w-full flex justify-start items-start flex-col gap-3 text-sm">
                  <p className="text-3xs text-black font-bold">نوع شخص</p>
                  <div className="w-full flex justify-center items-center gap-3">
                    {visibleTypes.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onUserTypeChange(item.type)}
                        className={cn(
                          "h-11 flex justify-center items-center text-center border rounded-lg text-xs p-2 transition-all duration-300",
                          visibleTypes.length === 1 ? "w-full" : "w-1/2",
                          userType === item.type
                            ? "border-blue-700 bg-blue-700 text-white"
                            : "border-neutral-300 hover:bg-blue-300 hover:text-white"
                        )}
                      >
                        <p>{item.title}</p>
                      </button>
                    ))}
                  </div>

                  {isLocked ? (
                    <p className="text-3xs text-blue-700">
                      {lockedType === "User"
                        ? "نوع شخص بر اساس کد ملی حساب شما «حقیقی» است."
                        : "نوع شخص بر اساس شناسه ملی حساب شما «حقوقی» است."}
                    </p>
                  ) : (
                    <>
                      {nationalCodeLength > 0 &&
                        nationalCodeLength !== 10 &&
                        nationalCodeLength !== 11 && (
                          <p className="text-3xs text-amber-700">
                            کد ملی باید ۱۰ رقم (شخص حقیقی) یا ۱۱ رقم (شخص
                            حقوقی) باشد.
                          </p>
                        )}
                      {nationalCodeLength === 10 && (
                        <p className="text-3xs text-blue-700">
                          نوع شخص به‌صورت خودکار «حقیقی» انتخاب شد (کد ملی ۱۰
                          رقمی).
                        </p>
                      )}
                      {nationalCodeLength === 11 && (
                        <p className="text-3xs text-blue-700">
                          نوع شخص به‌صورت خودکار «حقوقی» انتخاب شد (شناسه ملی
                          ۱۱ رقمی).
                        </p>
                      )}
                    </>
                  )}
                </div>

                <div className="mt-4 flex flex-col gap-5">
                  <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4">
                    <div className="w-full md:w-2/3">
                      {isUser ? (
                        <Input
                          key="FullName"
                          label="نام و نام خانوادگی"
                          variant="default"
                          labelClassName="mb-2 text-xs"
                          placeholder="مثال: علی رضایی"
                          inputSize="sm"
                          {...f("FullName")}
                        />
                      ) : (
                        <Input
                          key="CompanyName"
                          label="نام شرکت / موسسه"
                          variant="default"
                          labelClassName="mb-2 text-xs"
                          placeholder="مثال: شرکت مهندسین مشاور"
                          inputSize="sm"
                          {...f("CompanyName")}
                        />
                      )}
                    </div>
                    <div className="w-full md:w-1/3">
                      <Input
                        label="شماره پروانه اشتغال"
                        variant="default"
                        labelClassName="mb-2 text-xs"
                        placeholder="012345-6"
                        inputSize="sm"
                        {...f("LicenseNumber")}
                      />
                    </div>
                  </div>

                  <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3">
                    <div className="w-full md:w-1/3">
                      <Input
                        label={isUser ? "کدملی" : "شناسه ملی"}
                        variant="default"
                        labelClassName="mb-2 text-xs"
                        placeholder={isUser ? "0123456789" : "01234567890"}
                        inputSize="sm"
                        inputMode="numeric"
                        maxLength={11}
                        readOnly={isLocked}
                        {...f("NationalCode")}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (isLocked) return;
                          const digits = onlyDigits(e.target.value).slice(0, 11);
                          setTypedNationalCode(digits);
                          setFieldValue("NationalCode", digits, true);

                          if (digits.length === 10 && userType !== "User") {
                            onUserTypeChange("User");
                          } else if (
                            digits.length === 11 &&
                            userType !== "legal"
                          ) {
                            onUserTypeChange("legal");
                          }
                        }}
                      />
                    </div>
                    <div className="w-full md:w-1/3">
                      <JalaliDatePicker
                        label={isUser ? "تاریخ تولد" : "تاریخ تأسیس"}
                        variant="default"
                        labelClassName="mb-2 text-xs"
                        placeholder="۱۳۷۰/۰۱/۰۱"
                        inputSize="sm"
                        name="Birthday"
                        value={values.Birthday ?? ""}
                        maxDate={yesterday}
                        error={!!(touched.Birthday && errors.Birthday)}
                        errorMessage={
                          touched.Birthday ? errors.Birthday : undefined
                        }
                        onChange={(iso: string) => {
                          setFieldTouched("Birthday", true, false);
                          setFieldValue("Birthday", iso, true);
                        }}
                        onBlur={() => setFieldTouched("Birthday", true, false)}
                      />
                    </div>
                    <div className="w-full md:w-1/3">
                      <Input
                        label={isUser ? "محل تولد" : "محل شرکت"}
                        variant="default"
                        labelClassName="mb-2 text-xs"
                        placeholder="تهران"
                        inputSize="sm"
                        {...f("Birthplace")}
                      />
                    </div>
                  </div>

                  <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3">
                    <div className="w-full md:w-1/3">
                      <Input
                        label="شماره تماس"
                        variant="default"
                        labelClassName="mb-2 text-xs"
                        placeholder="09123456789"
                        inputSize="sm"
                        inputMode="numeric"
                        {...f("PhoneNumber")}
                      />
                    </div>
                    <div className="w-full md:w-1/3">
                      <Input
                        label="شماره عضویت نظام مهندسی"
                        variant="default"
                        labelClassName="mb-2 text-xs"
                        placeholder="98765"
                        inputSize="sm"
                        inputMode="numeric"
                        {...f("NezamRegisterCode")}
                      />
                    </div>
                    <div className="w-full md:w-1/3 flex gap-3">
                      <div className="w-1/2">
                        <Input
                          label="پایه پروانه"
                          variant="default"
                          labelClassName="mb-2 text-xs"
                          placeholder="۲"
                          inputSize="sm"
                          inputMode="numeric"
                          {...f("LicenseBase")}
                        />
                      </div>
                      <div className="w-1/2">
                        <Input
                          label="سال صدور پروانه"
                          variant="default"
                          labelClassName="mb-2 text-xs"
                          placeholder="۱۴۰۰"
                          inputSize="sm"
                          inputMode="numeric"
                          {...f("LicenseYear")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <Input
                      label="آدرس"
                      variant="default"
                      labelClassName="mb-2 text-xs"
                      placeholder="تهران، خیابان ..."
                      inputSize="sm"
                      {...f("Address")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <LicenseStatus
              multipleFields={!isUser}
              fields={fields}
              setFields={setFields}
              qualifications={qualifications}
              setQualifications={setQualifications}
              experienceYears={experienceYears}
              setExperienceYears={(v) => {
                setExperienceYears(v);
                if (Number(v) > 0) setExperienceYearsError(undefined);
              }}
              activeProjects={activeProjects}
              setActiveProjects={setActiveProjects}
              summary={summary}
              setSummary={setSummary}
              experienceYearsError={experienceYearsError}
            />

            <RegistrationConditions
              salary={salary}
              setSalary={setSalary}
              insurance={insurance}
              setInsurance={setInsurance}
              weeklyHours={weeklyHours}
              setWeeklyHours={setWeeklyHours}
              traineeCertificate={traineeCertificate}
              setTraineeCertificate={setTraineeCertificate}
            />

            {/* فایل رزومه — طبق Swagger برای هر دو نوع شخص الزامی است */}
            <ResumeUploader
              initialResume={resume}
              required
              errorMessage={resumeError}
              onChange={(r, file) => {
                setResume(r);
                setResumeFile(file ?? null);
                if (file) setResumeError(undefined);
              }}
            />

            {submitCount > 0 && errorList.length > 0 && (
              <div
                dir="rtl"
                className="w-full rounded-xl border border-red-300 bg-red-50 p-4 text-xs text-red-800"
              >
                <p className="mb-2 font-bold">لطفاً موارد زیر را اصلاح کنید:</p>
                <ul className="list-disc pr-5 space-y-1">
                  {errorList.map((msg, i) => (
                    <li key={i}>{msg}</li>
                  ))}
                </ul>
              </div>
            )}

            <CommitmentAgreement
              supervisorName={values.FullName || values.CompanyName}
              licenseNumber={values.LicenseNumber}
              displayTotalCapacity={commitment.displayTotalCapacity}
              allocatedCapacity={allocatedCapacity}
              setAllocatedCapacity={setAllocatedCapacity}
              minMonthlyHours={minMonthlyHours}
              setMinMonthlyHours={setMinMonthlyHours}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
            />
          </Form>
        );
      }}
    </Formik>
  );
}

/* ============================================================
   8) SupervisorPage
   ============================================================ */

export default function SupervisorPage() {
  const [manualType, setManualType] = useState<UserType>("User");
  const [clientError, setClientError] = useState<string | null>(null);

  /**
   * CurrentUserInfo: نوع شخص از همین‌جا و بلافاصله بعد از لود مشخص می‌شود.
   * کدملی ۱۰ رقم → حقیقی | ۱۱ رقم → حقوقی
   */
  const currentUserQuery = useQuery({
    queryKey: ["currentUserInfo"],
    queryFn: async () => {
      const res = await api.get("/User/CurrentUserInfo");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const isUserReady = currentUserQuery.isSuccess;
  const currentUser = currentUserQuery.data?.data ?? null;

  const accountNationalCode = onlyDigits(currentUser?.nationalCode ?? "");
  const accountType = userTypeFromNationalCode(accountNationalCode);

  // اگر نوع از کدملی حساب مشخص باشد قفل است، وگرنه انتخاب دستی
  const userType: UserType = accountType ?? manualType;
  const isLegalTab = userType === "legal";

  // فقط کوئری مربوط به نوع شخص اجرا می‌شود
  const realQuery = useGetRealInfo({
    enabled: isUserReady && userType === "User",
  });
  const legalQuery = useGetLegalInfo({
    enabled: isUserReady && userType === "legal",
  });

  const { mutate: registerReal, isPending: isRealPending } =
    useRegisterSupervisorReal();
  const { mutate: registerLegal, isPending: isLegalPending } =
    useRegisterSupervisorLegal();

  const activeQuery = isLegalTab ? legalQuery : realQuery;

  // ۴۰۴ یعنی کاربر جدید → backendData = null → فرم خالی (پیش‌پر از CurrentUserInfo)
  const backendData = activeQuery.data?.data ?? null;

  // پیش‌پر کردن فرم کاربر جدید از CurrentUserInfo
  const prefill = useMemo<Partial<FormValues>>(() => {
    if (!currentUser) return {};
    const name = String(
      currentUser.fullName ??
        `${currentUser.firstName ?? ""} ${currentUser.lastName ?? ""}`
    )
      .replace(/\s+/g, " ")
      .trim();

    return {
      NationalCode: accountNationalCode,
      PhoneNumber: currentUser.phoneNumber ?? "",
      ...(userType === "legal" ? { CompanyName: name } : { FullName: name }),
    };
  }, [currentUser, accountNationalCode, userType]);

  const handleUserTypeChange = (next: UserType) => {
    if (accountType) return; // قفل است
    setClientError(null);
    setManualType(next);
  };

  const handleSubmit = (state: PersonalInfoFormSubmitState) => {
    setClientError(null);

    // گارد نهایی نوع شخص بر اساس طول کد ملی
    const digits = onlyDigits(state.formValues.NationalCode ?? "");
    const typeFromCode = userTypeFromNationalCode(digits);

    if (typeFromCode === null) {
      setClientError(
        "کد ملی باید ۱۰ رقم (شخص حقیقی) یا ۱۱ رقم (شخص حقوقی) باشد."
      );
      return;
    }
    if (typeFromCode !== state.userType) {
      setClientError(
        typeFromCode === "User"
          ? "کد ملی ۱۰ رقمی است؛ ثبت‌نام باید به‌صورت شخص حقیقی انجام شود."
          : "شناسه ملی ۱۱ رقمی است؛ ثبت‌نام باید به‌صورت شخص حقوقی انجام شود."
      );
      return;
    }

    if (state.userType === "legal") {
      const payload = buildSupervisorLegalPayload({
        formValues: state.formValues,
        fields: state.fields,
        qualifications: state.qualifications,
        experienceYears: state.experienceYears,
        activeProjects: state.activeProjects,
        summary: state.summary,
        salary: state.salary,
        insurance: state.insurance,
        weeklyHours: state.weeklyHours,
        payloadTotalCapacity: state.payloadTotalCapacity,
        allocatedCapacity: state.allocatedCapacity,
        minMonthlyHours: state.minMonthlyHours,
        traineeCertificate: state.traineeCertificate,
        backend: backendData,
        cvFile: state.resumeFile ?? undefined,
      });

      const validationError = validateLegalBeforeSubmit(payload);
      if (validationError) {
        setClientError(validationError);
        return;
      }

      registerLegal(payload, {
        onSuccess: () => {
          legalQuery.refetch?.();
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message ||
            "خطا در ثبت اطلاعات سرپرست حقوقی. لطفاً دوباره تلاش کنید.";
          setClientError(msg);
        },
      });
      return;
    }

    const payload = buildSupervisorRealPayload({
      formValues: state.formValues,
      fields: state.fields,
      qualifications: state.qualifications,
      experienceYears: state.experienceYears,
      activeProjects: state.activeProjects,
      summary: state.summary,
      salary: state.salary,
      insurance: state.insurance,
      weeklyHours: state.weeklyHours,
      payloadTotalCapacity: state.payloadTotalCapacity,
      allocatedCapacity: state.allocatedCapacity,
      minMonthlyHours: state.minMonthlyHours,
      traineeCertificate: state.traineeCertificate,
      backend: backendData,
      cvFile: state.resumeFile ?? undefined,
    });

    const validationError = validateBeforeSubmit(payload);
    if (validationError) {
      setClientError(validationError);
      return;
    }

    registerReal(payload, {
      onSuccess: () => {
        realQuery.refetch?.();
      },
      onError: (err: any) => {
        const msg =
          err?.response?.data?.message ||
          "خطا در ثبت اطلاعات سرپرست. لطفاً دوباره تلاش کنید.";
        setClientError(msg);
      },
    });
  };

  // لود اولیه CurrentUserInfo
  if (currentUserQuery.isLoading) return <Loading />;

  // اگر گرفتن CurrentUserInfo خطا داد
  if (currentUserQuery.isError) {
    return (
      <div className="w-full px-4 md:px-7 py-6">
        <div
          dir="rtl"
          className="mx-auto w-full max-w-xl rounded-xl border border-red-300 bg-red-50 p-4 text-xs text-red-800"
        >
          <p className="font-bold mb-1">خطا در دریافت اطلاعات کاربر</p>
          <p>لطفاً صفحه را رفرش کنید یا دوباره وارد شوید.</p>
        </div>
      </div>
    );
  }

  // نوع شخص مشخص است: تا رسیدن اطلاعات ثبت‌شده، فرم اشتباه (خالی) نشان داده نشود
  if (accountType && activeQuery.isLoading) return <Loading />;

  return (
    <div className="w-full px-4 md:px-7 py-6">
      <div className="mx-auto flex w-full flex-col gap-5">
        {clientError && (
          <div
            dir="rtl"
            className="w-full rounded-xl border border-red-300 bg-red-50 p-4 text-xs text-red-800"
          >
            <p className="font-bold mb-1">خطا در ثبت اطلاعات:</p>
            <p>{clientError}</p>
          </div>
        )}

        <PersonalInfoForm
          // با تغییر نوع، فرم تمیز remount شود
          key={userType}
          userType={userType}
          lockedType={accountType}
          prefill={prefill}
          onUserTypeChange={handleUserTypeChange}
          backendData={backendData}
          isTabLoading={!accountType && activeQuery.isLoading}
          isSubmitting={isLegalTab ? isLegalPending : isRealPending}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}