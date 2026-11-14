// "use client";
// import { useFormikContext } from "formik";
// import { cn } from "@/lib/cn";
// import { Select } from "@/app/components/ui/input/SelectSilde";
// import { Input } from "@/app/components/ui/input";
// import { Button } from "@/app/components/ui/Button";
// import type { FormValues } from "../formConfig";

// const gradeOptions = [
//     { label: "پایه ۱", value: "1" },
//     { label: "پایه ۲", value: "2" },
//     { label: "پایه ۳", value: "3" },
// ];

// export default function LicenseStatus() {
//     const { values, setFieldValue, getFieldProps } = useFormikContext<FormValues>();
//     const hasLicense = values.haveLicense;

//     return (
//         <div
//             dir="rtl"
//             className="flex w-full flex-col gap-5 rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6 bg-white"
//         >
//             <div className="flex items-center mb-7 gap-2">
//                 <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
//                     ۳
//                 </span>
//                 <h3 className="text-s font-bold text-gray-800">
//                     وضعیت پروانه اشتغال و کارت‌های صلاحیت
//                 </h3>
//             </div>

//             <div className="flex w-full max-sm:flex-col max-lg:flex-col items-start gap-6">
//                 <div className="flex max-sm:w-full flex-col gap-1.5">
//                     <span className="text-2xs font-semibold text-gray-900">وضعیت پروانه اشتغال</span>
//                     <div className="flex w-full max-sm:w-full items-center gap-2">
//                         <Button
//                             type="button"
//                             size="sm"
//                             variant="solid"
//                             color="input"
//                             onClick={() => setFieldValue("haveLicense", true)}
//                             className={cn(
//                                 "h-9 rounded-lg w-48 text-xs font-medium transition-colors",
//                                 hasLicense
//                                     ? "text-white"
//                                     : "border border-gray-200 hover:text-neutral-600 bg-white text-gray-400 hover:bg-gray-50"
//                             )}
//                         >
//                             دارای پروانه
//                         </Button>
//                         <Button
//                             type="button"
//                             size="sm"
//                             variant="solid"
//                             color="input"
//                             onClick={() => setFieldValue("haveLicense", false)}
//                             className={cn(
//                                 "h-9 rounded-lg w-48 text-xs font-medium transition-colors",
//                                 !hasLicense
//                                     ? "text-white"
//                                     : "border border-gray-200 hover:text-neutral-600 bg-white text-gray-400 hover:bg-gray-50"
//                             )}
//                         >
//                             فاقد پروانه
//                         </Button>
//                     </div>
//                 </div>

//                 {hasLicense && (
//                     <div className="flex justify-between max-sm:w-full w-[75%]">
//                         <div className="w-1/2">
//                             <span className="text-2xs font-semibold text-gray-900">پایه صلاحیت</span>
//                             <Select
//                                 className="w-30 text-nowrap text-s"
//                                 placeholder="انتخاب پایه"
//                                 options={gradeOptions}
//                                 value={values.base || undefined}
//                                 onChange={(v: string) => setFieldValue("base", v)}
//                             />
//                         </div>

//                         <div className="w-1/2">
//                             <span className="text-2xs font-semibold text-gray-900">شماره پروانه</span>
//                             <Input
//                                 variant="default"
//                                 color="input"
//                                 inputSize="sm"
//                                 placeholder="۰۱۲۳۴۵۶-۷"
//                                 className="placeholder:text-neutral-600 placeholder:text-xs"
//                                 {...getFieldProps("licenseNumber")}
//                             />
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// "use client";
// import { useFormikContext } from "formik";
// import { cn } from "@/lib/cn";
// import { Select } from "@/app/components/ui/input/SelectSilde";
// import { Input } from "@/app/components/ui/input";
// import { Button } from "@/app/components/ui/Button";
// import type { FormValues } from "../formConfig";

// // مطابق BaseEnum بک‌اند
// const gradeOptions = [
//     { label: "ارشد", value: "1" },
//     { label: "پایه ۱", value: "2" },
//     { label: "پایه ۲", value: "3" },
//     { label: "پایه ۳", value: "4" },
//     { label: "بدون پایه", value: "5" },
// ];

// export default function LicenseStatus() {
//     const { values, setFieldValue, getFieldProps } = useFormikContext<FormValues>();
//     const hasLicense = values.haveLicense;

//     return (
//         <div
//             dir="rtl"
//             className="flex w-full flex-col gap-5 rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6 bg-white"
//         >
//             <div className="flex items-center mb-7 gap-2">
//                 <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
//                     ۳
//                 </span>
//                 <h3 className="text-s font-bold text-gray-800">
//                     وضعیت پروانه اشتغال و کارت‌های صلاحیت
//                 </h3>
//             </div>

//             <div className="flex w-full max-sm:flex-col max-lg:flex-col items-start gap-6">
//                 <div className="flex max-sm:w-full flex-col gap-1.5">
//                     <span className="text-2xs font-semibold text-gray-900">وضعیت پروانه اشتغال</span>
//                     <div className="flex w-full max-sm:w-full items-center gap-2">
//                         <Button
//                             type="button"
//                             size="sm"
//                             variant="solid"
//                             color="input"
//                             onClick={() => setFieldValue("haveLicense", true)}
//                             className={cn(
//                                 "h-9 rounded-lg w-48 text-xs font-medium transition-colors",
//                                 hasLicense
//                                     ? "text-white"
//                                     : "border border-gray-200 hover:text-neutral-600 bg-white text-gray-400 hover:bg-gray-50"
//                             )}
//                         >
//                             دارای پروانه
//                         </Button>
//                         <Button
//                             type="button"
//                             size="sm"
//                             variant="solid"
//                             color="input"
//                             onClick={() => setFieldValue("haveLicense", false)}
//                             className={cn(
//                                 "h-9 rounded-lg w-48 text-xs font-medium transition-colors",
//                                 !hasLicense
//                                     ? "text-white"
//                                     : "border border-gray-200 hover:text-neutral-600 bg-white text-gray-400 hover:bg-gray-50"
//                             )}
//                         >
//                             فاقد پروانه
//                         </Button>
//                     </div>
//                 </div>

//                 {hasLicense && (
//                     <div className="flex justify-between max-sm:w-full w-[75%]">
//                         <div className="w-1/2">
//                             <span className="text-2xs font-semibold text-gray-900">پایه صلاحیت</span>
//                             <Select
//                                 className="w-30 text-nowrap text-s"
//                                 placeholder="انتخاب پایه"
//                                 options={gradeOptions}
//                                 value={values.base != null ? String(values.base) : undefined}
//                                 onChange={(v: string) => setFieldValue("base", Number(v))}
//                             />
//                         </div>

//                         <div className="w-1/2">
//                             <span className="text-2xs font-semibold text-gray-900">شماره پروانه</span>
//                             <Input
//                                 variant="default"
//                                 color="input"
//                                 inputSize="sm"
//                                 placeholder="۰۱۲۳۴۵۶-۷"
//                                 className="placeholder:text-neutral-600 placeholder:text-xs"
//                                 {...getFieldProps("licenseNumber")}
//                             />
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

"use client";
import { useFormikContext } from "formik";
import { cn } from "@/lib/cn";
import { Select } from "@/app/components/ui/input/SelectSilde";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/Button";
import type { FormValues } from "../formConfig";

// BaseEnum: 1=ارشد, 2=پایه۱, 3=پایه۲, 4=پایه۳, 5=بدون پایه
const gradeOptions = [
    { label: "ارشد", value: "1" },
    { label: "پایه ۱", value: "2" },
    { label: "پایه ۲", value: "3" },
    { label: "پایه ۳", value: "4" },
    { label: "بدون پایه", value: "5" },
];

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

export default function LicenseStatus() {
    const { values, setFieldValue, getFieldProps } = useFormikContext<FormValues>();
    const hasLicense = values.haveLicense;

    return (
        <div
            dir="rtl"
            className="flex w-full flex-col gap-5 rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6 bg-white"
        >
            <div className="flex items-center mb-7 gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
                    ۳
                </span>
                <h3 className="text-s font-bold text-gray-800">
                    وضعیت پروانه اشتغال و کارت‌های صلاحیت
                </h3>
            </div>

            <div className="flex w-full max-sm:flex-col max-lg:flex-col items-start gap-6">
                <div className="flex max-sm:w-full flex-col gap-1.5">
                    <span className="text-2xs font-semibold text-gray-900">وضعیت پروانه اشتغال</span>
                    <div className="flex w-full max-sm:w-full items-center gap-2">
                        <Button
                            type="button"
                            size="sm"
                            variant="solid"
                            color="input"
                            onClick={() => setFieldValue("haveLicense", true)}
                            className={cn(
                                "h-9 rounded-lg w-48 text-xs font-medium transition-colors",
                                hasLicense
                                    ? "text-white"
                                    : "border border-gray-200 hover:text-neutral-600 bg-white text-gray-400 hover:bg-gray-50"
                            )}
                        >
                            دارای پروانه
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant="solid"
                            color="input"
                            onClick={() => {
                                setFieldValue("haveLicense", false);
                                setFieldValue("base", "");
                                setFieldValue("licenseNumber", "");
                                setFieldValue("licenseYear", "");
                            }}
                            className={cn(
                                "h-9 rounded-lg w-48 text-xs font-medium transition-colors",
                                !hasLicense
                                    ? "text-white"
                                    : "border border-gray-200 hover:text-neutral-600 bg-white text-gray-400 hover:bg-gray-50"
                            )}
                        >
                            فاقد پروانه
                        </Button>
                    </div>
                </div>

                {hasLicense && (
                    <div className="flex max-sm:flex-col max-sm:w-full w-[75%] gap-4">
                        <div className="w-1/3 max-sm:w-full">
                            <span className="text-2xs font-semibold text-gray-900">پایه صلاحیت</span>
                            <Select
                                className="w-full text-nowrap text-s"
                                placeholder="انتخاب پایه"
                                options={filterOptions(gradeOptions, values.base)}
                                value={toSelectValue(values.base)}
                                onChange={(v: string) => setFieldValue("base", v)}
                            />
                        </div>

                        <div className="w-1/3 max-sm:w-full">
                            <span className="text-2xs font-semibold text-gray-900">شماره پروانه</span>
                            <Input
                                variant="default"
                                color="input"
                                inputSize="sm"
                                placeholder="۰۱۲۳۴۵۶-۷"
                                className="placeholder:text-neutral-600 placeholder:text-xs"
                                {...getFieldProps("licenseNumber")}
                            />
                        </div>

                        <div className="w-1/3 max-sm:w-full">
                            <span className="text-2xs font-semibold text-gray-900">سال صدور پروانه</span>
                            <Input
                                variant="default"
                                color="input"
                                inputSize="sm"
                                type="number"
                                placeholder="مثال: ۱۴۰۰"
                                className="placeholder:text-neutral-600 placeholder:text-xs"
                                {...getFieldProps("licenseYear")}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}