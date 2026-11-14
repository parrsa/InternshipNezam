"use client";

import { useFormikContext } from "formik";
import { Input } from "@/app/components/ui/input";
import { ageFromISO, getYesterday, isValidISODate } from "@/lib/date-utils";
import JalaliDatePicker from "@/lib/jalaliDatePicker";
import type { FormValues } from "../formConfig";

const labelClassName = "text-2xs font-semibold text-neutral-900";
const inputClassName = "mt-2 placeholder:text-neutral-600 placeholder:text-xs";

export function PersonalInfoForm({ stepNumber = "۱" }: { stepNumber?: string }) {
    const yesterday = getYesterday();
    const { errors, touched, values, getFieldProps, setFieldValue, setFieldTouched } =
        useFormikContext<FormValues>();

    const bind = (name: keyof FormValues) => ({
        ...getFieldProps(name),
        error: !!(errors[name] && touched[name]),
        errorMessage: touched[name] ? (errors[name] as string | undefined) : undefined,
    });

    const common = {
        labelClassName,
        className: inputClassName,
        variant: "default" as const,
        inputSize: "sm" as const,
    };

    return (
        <div
            dir="rtl"
            className="w-full rounded-2xl border-2 border-neutral-200 bg-white p-5 shadow-xs sm:p-7"
        >
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef0f8] text-xs text-blue-800">
                        {stepNumber}
                    </span>
                    <h3 className="text-s font-semibold text-neutral-900">اطلاعات شخصی</h3>
                </div>

                <span className="rounded-full border border-neutral-300 bg-neutral-100 px-2.5 py-0.5 text-2xs font-medium text-neutral-600">
                    الزامی
                </span>
            </div>

            <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-3">
                <Input {...common} label="نام" placeholder="مثال: علی" {...bind("firstName")} />

                <Input
                    {...common}
                    label="نام خانوادگی"
                    placeholder="مثال: محمدی"
                    {...bind("lastName")}
                />

                <Input
                    {...common}
                    label="شماره عضویت"
                    placeholder="ST-1404-0..."
                    {...bind("nezamRegisterNo")}
                />

                <Input
                    {...common}
                    label="کد ملی"
                    placeholder="0012345678"
                    {...bind("nationalCode")}
                />

                <JalaliDatePicker
                    {...common}
                    label="تاریخ تولد"
                    placeholder="۱۳۷۰/۰۱/۰۱"
                    name="birthDate"
                    value={values.birthDate}
                    maxDate={yesterday}
                    error={!!(errors.birthDate && touched.birthDate)}
                    errorMessage={touched.birthDate ? errors.birthDate : undefined}
                    onChange={(iso: string) => {
                        setFieldTouched("birthDate", true, false);
                        setFieldValue("birthDate", iso, true);
                        setFieldValue(
                            "age",
                            iso && isValidISODate(iso) ? String(ageFromISO(iso)) : "",
                            true
                        );
                    }}
                    onBlur={() => setFieldTouched("birthDate", true, false)}
                />

                <Input
                    {...common}
                    type="number"
                    label="سن (سال)"
                    placeholder="۲۴"
                    {...bind("age")}
                />

                {/* ❌ محل تولد حذف شد — بک‌اند نمی‌گیره */}

                <Input
                    {...common}
                    label="شماره تماس"
                    placeholder="09123456789"
                    {...bind("phoneNumber")}
                />

                <div className="hidden sm:block" aria-hidden />

                <div className="sm:col-span-2">
                    <Input
                        {...common}
                        label="نشانی"
                        placeholder="تهران، خیابان ولیعصر، کوچه ..."
                        {...bind("address")}
                    />
                </div>
            </div>
        </div>
    );
}

export default PersonalInfoForm;