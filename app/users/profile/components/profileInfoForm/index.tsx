"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CircleCheck } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/Button";

export interface ProfileInfoValues {
    fullName: string;
    nationalId: string;
    university: string;
    major: string;
    phone: string;
    email: string;
}

interface FieldConfig {
    name: keyof ProfileInfoValues;
    label: string;
    type?: string;
}

const fields: FieldConfig[] = [
    { name: "fullName", label: "نام و نام خانوادگی" },
    { name: "nationalId", label: "کد ملی" },
    { name: "university", label: "دانشگاه" },
    { name: "major", label: "رشته" },
    { name: "phone", label: "شماره تماس" },
    { name: "email", label: "ایمیل", type: "email" },
];

const validationSchema = Yup.object({
    fullName: Yup.string().required("نام و نام خانوادگی الزامی است"),
    nationalId: Yup.string()
        .matches(/^[0-9۰-۹]{10}$/, "کد ملی باید ۱۰ رقم باشد")
        .required("کد ملی الزامی است"),
    university: Yup.string().required("دانشگاه الزامی است"),
    major: Yup.string().required("رشته الزامی است"),
    phone: Yup.string()
        .matches(/^(09|۰۹)[0-9۰-۹]{9}$/, "شماره تماس معتبر نیست")
        .required("شماره تماس الزامی است"),
    email: Yup.string()
        .email("ایمیل معتبر نیست")
        .required("ایمیل الزامی است"),
});

const initialValues: ProfileInfoValues = {
    fullName: "",
    nationalId: "",
    university: "",
    major: "",
    phone: "",
    email: "",
};


interface ProfileInfoFormProps {
    onSubmit: (values: ProfileInfoValues) => void;
}

export function ProfileInfoForm({ onSubmit }: ProfileInfoFormProps) {
    return (
        <Formik<ProfileInfoValues>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => onSubmit(values)}
        >
            {({ errors, touched, getFieldProps }) => (
                <Form
                    dir="rtl"
                    noValidate
                    className=" rounded-2xl border   border-neutral-200 bg-white p-5 shadow-sm lg:col-span-2"
                >
                    <h3 className="mb-6 p-1 text-s font-bold text-neutral-900">اطلاعات شخصی</h3>

                    <div className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                            {fields.map(({ name, label, type }) => (
                                <Input
                                    key={name}
                                    labelClassName= "text-2xs text-neutral-900 font-semibold"
                                    className="mt-2  placeholder:text-neutral-600 placeholder:text-xs"
                                    variant="default"
                                    inputSize="sm"
                                    type={type}
                                    label={label}
                                    {...getFieldProps(name)}
                                    error={!!(errors[name] && touched[name])}
                                    errorMessage={touched[name] ? errors[name] : undefined}
                                />
                            ))}
                        </div>

                        <Button
                            type="submit"
                            color="input"
                            variant="solid"
                            leftIcon={<CircleCheck size={16} />}
                            className="flex  w-fit items-center justify-center gap-2 rounded-lg px-4 text-xs font-bold text-white "
                        >
                            ذخیره تغییرات
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default ProfileInfoForm;