"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "@/app/components/ui/input";
import { getYesterday, isValidISODate, toISODate } from "@/lib/date-utils";
import JalaliDatePicker from "@/lib/jalaliDatePicker";

interface PersonalInfoValues {
    fullName: string;
    membershipNumber: string;
    nationalId: string;
    birthDate: string;
    age: string;
    phone: string;
    birthPlace: string;
    address: string;
}

const initialValues: PersonalInfoValues = {
    fullName: "",
    membershipNumber: "",
    nationalId: "",
    birthDate: "",
    age: "",
    phone: "",
    birthPlace: "",
    address: "",
};

const validationSchema = Yup.object({
    fullName: Yup.string().required("نام و نام خانوادگی الزامی است"),
    membershipNumber: Yup.string().required("شماره عضویت الزامی است"),
    nationalId: Yup.string()
        .matches(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد")
        .required("کد ملی الزامی است"),
    birthDate: Yup.string()
        .required("تاریخ تولد الزامی است")
        .test("is-past-date", "تاریخ تولد باید قبل از امروز باشد", (value) => {
            if (!value) return true;
            return isValidISODate(value) && value < toISODate(new Date());
        }),
    age: Yup.number()
        .typeError("سن باید عدد باشد")
        .positive("سن معتبر نیست")
        .required("سن الزامی است"),
    phone: Yup.string()
        .matches(/^09\d{9}$/, "شماره تماس معتبر نیست")
        .required("شماره تماس الزامی است"),
    birthPlace: Yup.string().required("محل تولد الزامی است"),
    address: Yup.string().required("نشانی الزامی است"),
});

interface PersonalInfoFormProps {
    stepNumber?: string;
    onSubmit?: (values: PersonalInfoValues) => void;
}

const labelClassName = "text-2xs font-semibold text-neutral-900";
const inputClassName = "mt-2 placeholder:text-neutral-600 placeholder:text-xs";

export function PersonalInfoForm({ stepNumber = "۱", onSubmit }: PersonalInfoFormProps) {
    const yesterday = getYesterday();

    return (
        <Formik<PersonalInfoValues>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => onSubmit?.(values)}
        >
            {({ errors, touched, values, getFieldProps, setFieldValue, setFieldTouched }) => {
                const bind = (name: keyof PersonalInfoValues) => ({
                    ...getFieldProps(name),
                    error: !!(errors[name] && touched[name]),
                    errorMessage: touched[name] ? errors[name] : undefined,
                });

                const common = {
                    labelClassName,
                    className: inputClassName,
                    variant: "default" as const,
                    inputSize: "sm" as const,
                };

                return (
                    <Form
                        dir="rtl"
                        noValidate
                        className="w-full rounded-2xl border-2 border-neutral-200 bg-white p-5 shadow-xs sm:p-7"
                    >
                        <div className="mb-8 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef0f8] text-xs text-blue-800">
                                    {stepNumber}
                                </span>
                                <h3 className="text-s font-semibold text-neutral-900">
                                    اطلاعات شخصی
                                </h3>
                            </div>

                            <span className="rounded-full border border-neutral-300 bg-neutral-100 px-2.5 py-0.5 text-2xs font-medium text-neutral-600">
                                الزامی
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-3">
                            <div className="sm:col-span-2">
                                <Input
                                    {...common}
                                    label="نام و نام خانوادگی"
                                    placeholder="مثال: علی محمدی"
                                    {...bind("fullName")}
                                />
                            </div>

                            <Input
                                {...common}
                                label="شماره عضویت"
                                placeholder="ST-1404-0..."
                                {...bind("membershipNumber")}
                            />

                            <Input
                                {...common}
                                label="کد ملی"
                                placeholder="0012345678"
                                {...bind("nationalId")}
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
                                onChange={(iso) => {
                                    setFieldTouched("birthDate", true, false);
                                    setFieldValue("birthDate", iso, true);
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

                            <Input
                                {...common}
                                label="محل تولد"
                                placeholder="تهران"
                                {...bind("birthPlace")}
                            />

                            <Input
                                {...common}
                                label="شماره تماس"
                                placeholder="09123456789"
                                {...bind("phone")}
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
                    </Form>
                );
            }}
        </Formik>
    );
}

export default PersonalInfoForm;