"use client";

import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/app/components/ui/input";
import { useState } from "react";
import { Button } from "@/app/components/ui/Button";
import EducationInfo from "../educationInfo";
import LicenseStatus from "../licenseStatus";
import CommitmentAgreement from "../commitmentAgreement";


const user = {
    FullName: "",
    LicenseNumber: "",
    NationalCode: "",
    Birthday: "",
    Birthplace: "",
    PhoneNumber: ""
}

const legal = {
    CompanyName: "",
    LicenseNumber: "",
    NationalCode: "",
    Birthday: "",
    Birthplace: "",
    PhoneNumber: ""
}

const usersType = [
    {
        id: 1,
        title: "شخص حقیقی",
        type: "User"
    },
    {
        id: 2,
        title: "شخص حقوقی",
        type: "legal"
    },
]

const commonShape = {
    LicenseNumber: Yup.string().trim().required("شماره پروانه اشتغال الزامی است"),
    NationalCode: Yup.string()
        .trim()
        .required("کد ملی الزامی است")
        .matches(/^[0-9۰-۹]{10}$/, "کد ملی باید ۱۰ رقم باشد"),
    Birthday: Yup.string().trim().required("تاریخ تولد الزامی است"),
    Birthplace: Yup.string().trim().required("محل تولد الزامی است"),
    PhoneNumber: Yup.string()
        .trim()
        .required("شماره تماس الزامی است")
        .matches(/^(09|۰۹)[0-9۰-۹]{9}$/, "شماره تماس معتبر نیست"),
};

const userSchema = Yup.object({
    FullName: Yup.string().trim().required("نام و نام خانوادگی الزامی است"),
    ...commonShape,
});

const legalSchema = Yup.object({
    CompanyName: Yup.string().trim().required("نام شرکت / موسسه الزامی است"),
    ...commonShape,
});


const labelClassName = "text-2xs text-neutral-900  font-semibold";


export function PersonalInfoForm({ stepNumber = "۱", onSubmit }: any) {
    const [userType, setUserType] = useState<"legal" | "User">("User")
    return (
        <Formik
            enableReinitialize
            initialValues={userType === "User" ? user : legal}
            validationSchema={userType === "User" ? userSchema : legalSchema}
            onSubmit={(value) => {
                console.log(value)
            }}>
            {({ getFieldProps, errors, touched }) => {
                const f = (name: string) => ({
                    name,
                    field: getFieldProps(name),
                    error: !!((touched as any)[name] && (errors as any)[name]),
                    errorMessage: (errors as any)[name] as string | undefined,
                });

                return (
                    <Form className="w-full flex justify-center items-center flex-col gap-4">
                        <div className="w-full rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6  bg-white px-8 py-7">
                            <div className="w-full flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef0f8] text-xs text-blue-800">
                                        1
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
                                    <div className="w-full flex justify-center items-center gap-3 ">
                                        {usersType.map((item) => (
                                            <div
                                                onClick={() => setUserType(item.type as any)}
                                                className={`w-1/2 h-11 flex justify-center items-center text-center border border-neutral-300 rounded-lg text-xs cursor-pointer p-2 hover:bg-blue-300 transition-all duration-500 hover:text-white ${userType === item.type ? "bg-blue-700 text-white" : ""}`}>
                                                <p>{item.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {userType === "User" ?
                                    <div className="mt-4 flex justify-center items-center gap-5 flex-col">
                                        <div className="w-full flex justify-center items-center gap-4">
                                            <div className="w-2/3">
                                                <Input
                                                    label="نام و نام خانوادگی "
                                                    variant="default"
                                                    labelClassName="mb-2 text-xs"
                                                    placeholder="مثال:مهدس رضایی"
                                                    inputSize="sm"
                                                    {...f("FullName")}
                                                />
                                            </div>
                                            <div className="w-1/3">
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
                                        <div className="w-full flex justify-center items-center gap-3">
                                            <div className="w-1/3">
                                                <Input
                                                    label="کدملی"
                                                    variant="default"
                                                    labelClassName="mb-2 text-xs"
                                                    placeholder="012345678"
                                                    inputSize="sm"
                                                    {...f("NationalCode")}
                                                />
                                            </div>
                                            <div className="w-1/3">
                                                <Input
                                                    label="تاریخ تولد"
                                                    variant="default"
                                                    labelClassName="mb-2 text-xs"
                                                    placeholder="012345-6"
                                                    inputSize="sm"
                                                    {...f("Birthday")}
                                                />
                                            </div>
                                            <div className="w-1/3">
                                                <Input
                                                    label="محل تولد"
                                                    variant="default"
                                                    labelClassName="mb-2 text-xs"
                                                    placeholder="تهران"
                                                    inputSize="sm"
                                                    {...f("Birthplace")}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-start items-start w-full">
                                            <div className="w-1/3">
                                                <Input
                                                    label="شماره تماس"
                                                    variant="default"
                                                    labelClassName="mb-2 text-xs"
                                                    placeholder="0912345678"
                                                    inputSize="sm"
                                                    inputMode="numeric"
                                                    {...f("PhoneNumber")}
                                                />
                                            </div>
                                        </div>
                                    </div> :
                                    <div className="mt-4 flex justify-center items-center gap-5 flex-col">
                                        <div className="w-full flex justify-center items-center gap-4">
                                            <div className="w-2/3">
                                                <Input
                                                    label="نام شرکت / موسسه"
                                                    variant="default"
                                                    labelClassName="mb-2 text-xs"
                                                    placeholder="مثال:شرکت مهندسین مشاور"
                                                    inputSize="sm"
                                                    {...f("CompanyName")}
                                                />
                                            </div>
                                            <div className="w-1/3">
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
                                        <div className="w-full flex justify-center items-center gap-3">
                                            <div className="w-1/3">
                                                <Input
                                                    label="کدملی"
                                                    variant="default"
                                                    labelClassName="mb-2 text-xs"
                                                    placeholder="012345678"
                                                    inputSize="sm"
                                                    {...f("NationalCode")}
                                                />
                                            </div>
                                            <div className="w-1/3">
                                                <Input
                                                    label="تاریخ تولد"
                                                    variant="default"
                                                    labelClassName="mb-2 text-xs"
                                                    placeholder="012345-6"
                                                    inputSize="sm"
                                                    {...f("Birthday")}
                                                />
                                            </div>
                                            <div className="w-1/3">
                                                <Input
                                                    label="محل تولد"
                                                    variant="default"
                                                    labelClassName="mb-2 text-xs"
                                                    placeholder="تهران"
                                                    inputSize="sm"
                                                    {...f("Birthplace")}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-start items-start w-full">
                                            <div className="w-1/3">
                                                <Input
                                                    label="شماره تماس"
                                                    variant="default"
                                                    labelClassName="mb-2 text-xs"
                                                    placeholder="0912345678"
                                                    inputSize="sm"
                                                    inputMode="numeric"
                                                    {...f("PhoneNumber")}
                                                />
                                            </div>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                        <EducationInfo />
                        <LicenseStatus />
                        <CommitmentAgreement />
                    </Form>
                );
            }}
        </Formik>
    )
}

export default PersonalInfoForm;