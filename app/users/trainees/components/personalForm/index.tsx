"use client";

import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/app/components/ui/input";

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
    fullName: Yup.string()
        .required("نام و نام خانوادگی الزامی است"),
    membershipNumber: Yup.string()
        .required("شماره عضویت الزامی است"),
    nationalId: Yup.string()
        .matches(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد")
        .required("کد ملی الزامی است"),
    birthDate: Yup.date()
        .typeError("تاریخ تولد معتبر نیست")
        .required("تاریخ تولد الزامی است"),
    age: Yup.number()
        .typeError("سن باید عدد باشد")
        .positive("سن معتبر نیست")
        .required("سن الزامی است"),
    phone: Yup.string()
        .matches(/^09\d{9}$/, "شماره تماس معتبر نیست")
        .required("شماره تماس الزامی است"),
    birthPlace: Yup.string()
        .required("محل تولد الزامی است"),
    address: Yup.string()
        .required("نشانی الزامی است"),
});

interface PersonalInfoFormProps {
    stepNumber?: string;
    onSubmit?: (values: PersonalInfoValues) => void;
}

const labelClassName = "text-2xs text-neutral-900  font-semibold";


export function PersonalInfoForm({ stepNumber = "۱", onSubmit }: PersonalInfoFormProps) {
    const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
        useFormik<PersonalInfoValues>({
            initialValues,
            validationSchema,
            onSubmit: (values) => {
                onSubmit?.(values);
            },
        });

    return (
        <form
            dir="rtl"
            onSubmit={handleSubmit}
            className=" w-full rounded-2xl border-2 shadow-xs border-neutral-200 bg-white p-5 sm:p-6"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
                        {stepNumber}
                    </span>
                    <h3 className="text-s font-bold text-gray-800">اطلاعات شخصی</h3>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    الزامی
                </span>
            </div>

            <div className="flex  flex-col gap-5">

                <div className=" flex gap-5">
                    <div className="w-[70%]">
                        <Input
                            labelClassName={labelClassName}
                            className=" mt-2 placeholder:text-neutral-600   placeholder:text-xs "
                            variant="default"
                            inputSize="sm"
                            name="fullName"
                            label="نام و نام خانوادگی"
                            placeholder="مثال: علی محمدی"
                            value={values.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!(errors.fullName && touched.fullName)}
                            errorMessage={errors.fullName}
                        />
                    </div>
                    <div className="w-[35%]">
                        <Input

                            labelClassName={labelClassName}

                            className=" mt-2   placeholder:text-neutral-600  placeholder:text-xs "

                            variant="default"
                            inputSize="sm"
                            name="membershipNumber"
                            label="شماره عضویت"
                            placeholder="ST-1404-0..."
                            value={values.membershipNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!(errors.membershipNumber && touched.membershipNumber)}
                            errorMessage={errors.membershipNumber}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input


                        labelClassName={labelClassName}
                        className=" mt-2   placeholder:text-neutral-600  placeholder:text-xs "

                        variant="default"
                        inputSize="sm"
                        name="nationalId"
                        label="کد ملی"
                        placeholder="0012345678"
                        value={values.nationalId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(errors.nationalId && touched.nationalId)}
                        errorMessage={errors.nationalId}
                    />
                    <Input


                        labelClassName={labelClassName}
                        className=" mt-2   placeholder:text-neutral-600  placeholder:text-xs "

                        variant="default"
                        inputSize="sm"
                        type="date"
                        name="birthDate"
                        label="تاریخ تولد"
                        value={values.birthDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(errors.birthDate && touched.birthDate)}
                        errorMessage={errors.birthDate}
                    />
                    <Input


                        labelClassName={labelClassName}
                        className=" mt-2   placeholder:text-neutral-600  placeholder:text-xs "

                        variant="default"
                        inputSize="sm"
                        type="number"
                        name="age"
                        label="سن (سال)"
                        placeholder="۲۴"
                        value={values.age}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(errors.age && touched.age)}
                        errorMessage={errors.age}
                    />
                    <Input


                        labelClassName={labelClassName}
                        className=" mt-2   placeholder:text-neutral-600  placeholder:text-xs  "

                        variant="default"
                        inputSize="sm"
                        name="birthPlace"
                        label="محل تولد"
                        placeholder="تهران"
                        value={values.birthPlace}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(errors.birthPlace && touched.birthPlace)}
                        errorMessage={errors.birthPlace}
                    />
                    <Input


                        labelClassName={labelClassName}
                        variant="default"
                        inputSize="sm"
                        name="phone"
                        label="شماره تماس"
                        className=" mt-2   placeholder:text-neutral-600  placeholder:text-xs "
                        placeholder="09123456789"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(errors.phone && touched.phone)}
                        errorMessage={errors.phone}
                    />
                </div>

                <Input

                    labelClassName={labelClassName}
                    variant="default"
                    inputSize="sm"
                    className=" mt-2  w-[66%]  placeholder:text-neutral-600  placeholder:text-xs "
                    name="address"
                    label="نشانی"
                    placeholder="تهران، خیابان ولیعصر، کوچه ..."
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!(errors.address && touched.address)}
                    errorMessage={errors.address}
                />
            </div>
        </form>
    );
}

export default PersonalInfoForm;