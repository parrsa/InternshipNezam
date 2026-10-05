"use client";

import { Formik, Form } from "formik";
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
    fullName: Yup.string().required("نام و نام خانوادگی الزامی است"),
    membershipNumber: Yup.string().required("شماره عضویت الزامی است"),
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
    birthPlace: Yup.string().required("محل تولد الزامی است"),
    address: Yup.string().required("نشانی الزامی است"),
});

interface PersonalInfoFormProps {
    stepNumber?: string;
    onSubmit?: (values: PersonalInfoValues) => void;
}

const labelClassName = "text-2xs text-neutral-900  font-semibold";

export function PersonalInfoForm({ stepNumber = "۱", onSubmit }: PersonalInfoFormProps) {
    return (
        <Formik<PersonalInfoValues>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => onSubmit?.(values)}
        >
            {({ errors, touched, getFieldProps }) => {
                const bind = (name: keyof PersonalInfoValues) => ({
                    ...getFieldProps(name),
                    error: !!(errors[name] && touched[name]),
                    errorMessage: touched[name] ? errors[name] : undefined,
                });

                return (
                    <Form
                        dir="rtl"
                        noValidate
                        className=" w-full rounded-2xl border-2 shadow-xs border-neutral-200 bg-white p-5 sm:p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
                                    {stepNumber}
                                </span>
                                <h3 className="text-s font-bold text-gray-800">اطلاعات شخصی</h3>
                            </div>

                            <span className="rounded-full bg-gray-100 px-2 py-1 text-2xs border border-neutral-400 font-medium text-gray-600">
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
                                        label="نام و نام خانوادگی"
                                        placeholder="مثال: علی محمدی"
                                        {...bind("fullName")}
                                    />
                                    
                                </div>
                                <div className="w-[35%]">
                                    <Input
                                        labelClassName={labelClassName}
                                        className=" mt-2   placeholder:text-neutral-600  placeholder:text-xs "
                                        variant="default"
                                        inputSize="sm"
                                        label="شماره عضویت"
                                        placeholder="ST-1404-0..."
                                        {...bind("membershipNumber")}
                                    />
                                    
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <Input
                                    labelClassName={labelClassName}
                                    className=" mt-2   placeholder:text-neutral-600  placeholder:text-xs "
                                    variant="default"
                                    inputSize="sm"
                                    label="کد ملی"
                                    placeholder="0012345678"
                                    {...bind("nationalId")}
                                />
                                
                                <Input
                                    labelClassName={labelClassName}
                                    className=" mt-2   placeholder:text-neutral-600  placeholder:text-xs "
                                    variant="default"
                                    inputSize="sm"
                                    type="date"
                                    label="تاریخ تولد"
                                    {...bind("birthDate")}
                                />
                                
                                <Input
                                    labelClassName={labelClassName}
                                    className=" mt-2   placeholder:text-neutral-600  placeholder:text-xs "
                                    variant="default"
                                    inputSize="sm"
                                    type="number"
                                    label="سن (سال)"
                                    placeholder="۲۴"
                                    {...bind("age")}
                                />
                                
                                <Input
                                    labelClassName={labelClassName}
                                    className=" mt-2   placeholder:text-neutral-600  placeholder:text-xs  "
                                    variant="default"
                                    inputSize="sm"
                                    label="محل تولد"
                                    placeholder="تهران"
                                    {...bind("birthPlace")}
                                />
                                
                                <Input
                                    labelClassName={labelClassName}
                                    variant="default"
                                    inputSize="sm"
                                    label="شماره تماس"
                                    className=" mt-2   placeholder:text-neutral-600  placeholder:text-xs "
                                    placeholder="09123456789"
                                    {...bind("phone")}
                                />
                                
                            </div>

                            <Input
                                labelClassName={labelClassName}
                                variant="default"
                                inputSize="sm"
                                className=" mt-2  w-[66%]  placeholder:text-neutral-600  placeholder:text-xs "
                                label="نشانی"
                                placeholder="تهران، خیابان ولیعصر، کوچه ..."
                                {...bind("address")}
                            />
                            
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default PersonalInfoForm;