// // "use client";

// // import type { ReactNode } from "react";
// // import { useFormikContext } from "formik";
// // import { Select } from "@/app/components/ui/input/SelectSilde";
// // import { Input } from "@/app/components/ui/input";
// // import type { FormValues } from "../formConfig";

// // // مقدارها باید با enum بک‌اند یکی باشند (این‌ها فرضی‌اند)
// // const degreeOptions = [
// //     { label: "کارشناسی", value: "0" },
// //     { label: "کارشناس ارشد", value: "1" },
// //     { label: "دکتری", value: "2" },
// //     { label: "کاردانی", value: "3" },
// // ];

// // const majorOptions = [
// //     { label: "مهندسی عمران", value: "0" },
// //     { label: "مهندسی معماری", value: "1" },
// //     { label: "مهندسی برق", value: "2" },
// //     { label: "مهندسی مکانیک", value: "3" },
// // ];

// // const competenceOptions = [
// //     { label: "طراحی", value: "0" },
// //     { label: "نظارت", value: "1" },
// //     { label: "اجرا", value: "2" },
// // ];

// // function Field({ label, children }: { label: string; children: ReactNode }) {
// //     return (
// //         <div className="flex w-full flex-col gap-2">
// //             <span className="text-2xs font-semibold text-neutral-900">{label}</span>
// //             {children}
// //         </div>
// //     );
// // }

// // export default function EducationInfo({ stepNumber = "۲" }: { stepNumber?: string }) {
// //     const { values, setFieldValue, getFieldProps } = useFormikContext<FormValues>();

// //     return (
// //         <div
// //             dir="rtl"
// //             className="w-full rounded-2xl border-2 border-neutral-200 bg-white p-5 shadow-xs sm:p-7"
// //         >
// //             <div className="mb-8 flex items-center gap-2">
// //                 <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef0f8] text-xs text-blue-800">
// //                     {stepNumber}
// //                 </span>
// //                 <h3 className="text-s font-semibold text-neutral-900">اطلاعات تحصیلی و دوره</h3>
// //             </div>

// //             <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-3">
// //                 <Field label="مقطع تحصیلی">
// //                     <Select
// //                         className="w-1/2 text-nowrap text-xs"
// //                         placeholder="انتخاب مقطع"
// //                         options={degreeOptions}
// //                         value={values.degree || undefined}
// //                         onChange={(v: string) => setFieldValue("degree", v)}
// //                     />
// //                 </Field>

// //                 <Field label="رشته تحصیلی">
// //                     <Select
// //                         className="w-1/2 text-nowrap text-xs"
// //                         placeholder="انتخاب رشته"
// //                         options={majorOptions}
// //                         value={values.field || undefined}
// //                         onChange={(v: string) => setFieldValue("field", v)}
// //                     />
// //                 </Field>

// //                 <Field label="نام دانشگاه">
// //                     <Input
// //                         variant="default"
// //                         inputSize="sm"
// //                         className="placeholder:text-neutral-600 placeholder:text-xs"
// //                         placeholder="مثال: دانشگاه صنعتی شریف"
// //                         {...getFieldProps("university")}
// //                     />
// //                 </Field>

// //                 <Field label="صلاحیت مدنظر برای کارآموزی">
// //                     <Select
// //                         className="w-1/2 text-nowrap text-xs"
// //                         placeholder="انتخاب صلاحیت موردنظر"
// //                         options={competenceOptions}
// //                         value={values.competence || undefined}
// //                         onChange={(v: string) => setFieldValue("competence", v)}
// //                     />
// //                 </Field>

// //                 <div className="hidden sm:block" aria-hidden />

// //                 <Field label="مدت دوره کارآموزی">
// //                     <div className="flex h-9 w-full items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4">
// //                         <span className="text-xs font-semibold text-neutral-900">۱ سال</span>
// //                         <span className="text-2xs text-neutral-500">(دوره استاندارد)</span>
// //                     </div>
// //                 </Field>
// //             </div>
// //         </div>
// //     );
// // }

// "use client";

// import type { ReactNode } from "react";
// import { useFormikContext } from "formik";
// import { Select } from "@/app/components/ui/input/SelectSilde";
// import { Input } from "@/app/components/ui/input";
// import type { FormValues } from "../formConfig";

// const degreeOptions = [
//     { label: "کاردانی", value: "1" },
//     { label: "کارشناسی", value: "2" },
//     { label: "کارشناسی ارشد", value: "3" },
//     { label: "دکتری", value: "4" },
// ];

// const majorOptions = [
//     { label: "مهندسی مکانیک", value: "1" },
//     { label: "مهندسی برق", value: "2" },
//     { label: "مهندسی معماری", value: "4" },
//     { label: "مهندسی عمران", value: "5" },
// ];

// const competenceOptions = [
//     { label: "نظارت", value: "1" },
//     { label: "طراحی", value: "2" },
//     { label: "مجری", value: "3" },
// ];

// function Field({ label, children }: { label: string; children: ReactNode }) {
//     return (
//         <div className="flex w-full flex-col gap-2">
//             <span className="text-2xs font-semibold text-neutral-900">{label}</span>
//             {children}
//         </div>
//     );
// }

// // مقدار 0 یعنی «انتخاب نشده» → باید undefined بشه تا placeholder بیاد
// function toSelectValue(v: unknown): string | undefined {
//     const n = Number(v);
//     return !Number.isFinite(n) || n === 0 ? undefined : String(n);
// }

// export default function EducationInfo({ stepNumber = "۲" }: { stepNumber?: string }) {
//     const { values, setFieldValue, getFieldProps } = useFormikContext<FormValues>();

//     // اگر competences آرایه است، اولین عضو غیرصفر را بردار
//     const competencesArr = Array.isArray(values.competences) ? values.competences : [];
//     const firstCompetence = competencesArr.find((c) => Number(c) > 0);

//     return (
//         <div
//             dir="rtl"
//             className="w-full rounded-2xl border-2 border-neutral-200 bg-white p-5 shadow-xs sm:p-7"
//         >
//             <div className="mb-8 flex items-center gap-2">
//                 <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef0f8] text-xs text-blue-800">
//                     {stepNumber}
//                 </span>
//                 <h3 className="text-s font-semibold text-neutral-900">اطلاعات تحصیلی و دوره</h3>
//             </div>

//             <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-3">
//                 <Field label="مقطع تحصیلی">
//                     <Select
//                         className="w-1/2 text-nowrap text-xs"
//                         placeholder="انتخاب مقطع"
//                         options={degreeOptions}
//                         value={toSelectValue(values.degree)}
//                         onChange={(v: string) => setFieldValue("degree", Number(v))}
//                     />
//                 </Field>

//                 <Field label="رشته تحصیلی">
//                     <Select
//                         className="w-1/2 text-nowrap text-xs"
//                         placeholder="انتخاب رشته"
//                         options={majorOptions}
//                         value={toSelectValue(values.field)}
//                         onChange={(v: string) => setFieldValue("field", Number(v))}
//                     />
//                 </Field>

//                 <Field label="نام دانشگاه">
//                     <Input
//                         variant="default"
//                         inputSize="sm"
//                         className="placeholder:text-neutral-600 placeholder:text-xs"
//                         placeholder="مثال: دانشگاه صنعتی شریف"
//                         {...getFieldProps("university")}
//                     />
//                 </Field>

//                 <Field label="صلاحیت مدنظر برای کارآموزی">
//                     <Select
//                         className="w-1/2 text-nowrap text-xs"
//                         placeholder="انتخاب صلاحیت موردنظر"
//                         options={competenceOptions}
//                         value={toSelectValue(firstCompetence)}
//                         onChange={(v: string) => setFieldValue("competences", [Number(v)])}
//                     />
//                 </Field>

//                 <div className="hidden sm:block" aria-hidden />

//                 <Field label="مدت دوره کارآموزی">
//                     <div className="flex h-9 w-full items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4">
//                         <span className="text-xs font-semibold text-neutral-900">۱ سال</span>
//                         <span className="text-2xs text-neutral-500">(دوره استاندارد)</span>
//                     </div>
//                 </Field>
//             </div>
//         </div>
//     );
// }"use client";

import type { ReactNode } from "react";
import { useFormikContext } from "formik";
import { Select } from "@/app/components/ui/input/SelectSilde";
import type { FormValues } from "../formConfig";

const degreeOptions = [
    { label: "کارشناسی", value: "2" },
    { label: "کارشناسی ارشد", value: "3" },
    { label: "دکتری", value: "4" },
];

const majorOptions = [
    { label: "مهندسی مکانیک", value: "1" },
    { label: "مهندسی برق", value: "2" },
    { label: "مهندسی معماری", value: "4" },
    { label: "مهندسی عمران", value: "5" },
];

const competenceOptions = [
    { label: "نظارت", value: "1" },
    { label: "طراحی", value: "2" },
    { label: "مجری", value: "3" },
];

function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="flex w-full flex-col gap-2">
            <span className="text-2xs font-semibold text-neutral-900">{label}</span>
            {children}
        </div>
    );
}

function filterOptions(
    options: { label: string; value: string }[],
    current: string | undefined | null,
): { label: string; value: string }[] {
    if (current === null || current === undefined || current === "") return options;
    const found = options.find((o) => o.value === String(current));
    return found ? [found] : options;
}

function toSelectValue(v: string | undefined | null): string | undefined {
    if (v === null || v === undefined || v === "" || v === "0") return undefined;
    return v;
}

export default function EducationInfo({ stepNumber = "۲" }: { stepNumber?: string }) {
    const { values, setFieldValue } = useFormikContext<FormValues>();

    const firstCompetence =
        Array.isArray(values.competences) && values.competences.length > 0
            ? values.competences[0]
            : "";

    return (
        <div
            dir="rtl"
            className="w-full rounded-2xl border-2 border-neutral-200 bg-white p-5 shadow-xs sm:p-7"
        >
            {/* ── Header ── */}
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef0f8] text-xs text-blue-800">
                        {stepNumber}
                    </span>
                    <h3 className="text-s font-semibold text-neutral-900">
                        اطلاعات تحصیلی و دوره
                    </h3>
                </div>

                <span className="rounded-full border border-neutral-300 bg-neutral-100 px-2.5 py-0.5 text-2xs font-medium text-neutral-600">
                    الزامی
                </span>
            </div>

            {/* ── Fields ── */}
            <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-3">
                <Field label="مقطع تحصیلی">
                    <Select
                        className="w-full text-nowrap text-xs"
                        placeholder="انتخاب مقطع"
                        options={filterOptions(degreeOptions, values.degree)}
                        value={toSelectValue(values.degree)}
                        onChange={(v: string) => setFieldValue("degree", v)}
                    />
                </Field>

                <Field label="رشته تحصیلی">
                    <Select
                        className="w-full text-nowrap text-xs"
                        placeholder="انتخاب رشته"
                        options={filterOptions(majorOptions, values.field)}
                        value={toSelectValue(values.field)}
                        onChange={(v: string) => setFieldValue("field", v)}
                    />
                </Field>

                <Field label="صلاحیت مدنظر برای کارآموزی">
                    <Select
                        className="w-full text-nowrap text-xs"
                        placeholder="انتخاب صلاحیت"
                        options={filterOptions(competenceOptions, firstCompetence)}
                        value={toSelectValue(firstCompetence)}
                        onChange={(v: string) => setFieldValue("competences", [v])}
                    />
                </Field>

                {/* مدت دوره — تمام عرض */}
                <div className="sm:col-span-3">
                    <Field label="مدت دوره کارآموزی">
                        <div className="flex h-9 w-full items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4">
                            <span className="text-xs font-semibold text-neutral-900">۱ سال</span>
                            <span className="text-2xs text-neutral-500">
                                (دوره استاندارد)
                            </span>
                        </div>
                    </Field>
                </div>
            </div>
        </div>
    );
}