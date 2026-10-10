"use client";

import * as React from "react";
import { Form, Formik, useField, useFormikContext } from "formik";
import { CircleCheck, Send } from "lucide-react";

import { cn } from "@/lib/cn";
import { Input, InputProps, TextArea,  } from "@/app/components/ui/input";
import { VisitOption } from "../visitSchema/visitSchema";
import SwitchButton from "@/app/components/ui/Button/switchButton";
import { Button } from "@/app/components/ui/Button";
import { COURSE_INSTRUCTORS, COURSE_STATUSES, COURSE_TYPES, CourseFormValues, courseValidationSchema, extractNumber, initialCourseValues, TARGET_GROUPS } from "../coursesChema";
import { Select } from "@/app/components/ui/input/SelectSilde";


type FieldName = keyof CourseFormValues & string;

const formatToman = (value: string) =>
    new Intl.NumberFormat("fa-IR").format(Number(value || 0));


function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="w-full rounded-[18px] border border-[#d7dee7] bg-white p-8 shadow-sm">
            <h2 className="mb-12 text-s font-bold text-neutral-900">{title}</h2>
            {children}
        </section>
    );
}

interface FieldShellProps {
    name: string;
    label: string;
    required?: boolean;
    error?: string;
    className?: string;
    children: React.ReactNode;
}

function FieldShell({ name, label, required, error, className, children }: FieldShellProps) {
    return (
        <div className={cn("flex min-w-0 flex-col gap-2", className)}>
            <label htmlFor={name} className="text-xs font-semibold text-neutral-900">
                {label}
                {required && " *"}
            </label>
            {children}
            {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
    );
}


type TextFieldProps = {
    name: FieldName;
    label: string;
    required?: boolean;
    className?: string;
} & Omit<InputProps, "name" | "value" | "onChange" | "label" | "className">;

function TextField({ name, label, required, className, ...inputProps }: TextFieldProps) {
    const [field, meta, helpers] = useField<string>(name);
    const error = meta.touched ? meta.error : undefined;

    return (
        <FieldShell name={name} label={label} required={required} error={error} className={className}>
            <Input
                {...inputProps}
                id={name}
                name={name}
                variant="default"
                inputSize="lg"
                className="h-9 placeholder:text-sm border-gray-200"
                value={field.value}
                onChange={(e) => helpers.setValue(e.target.value)}
                onBlur={field.onBlur}
                error={Boolean(error)}
            />
        </FieldShell>
    );
}

interface SelectFieldProps {
    name: FieldName;
    label: string;
    options: VisitOption[];
    required?: boolean;
    className?: string;
}

function SelectField({ name, label, options, required, className }: SelectFieldProps) {
    const [field, meta, helpers] = useField<string>(name);
    const error = meta.touched ? meta.error : undefined;

    return (
        <FieldShell name={name} label={label} required={required} error={error} className={className}>
            <div dir="rtl" className="w-[60%]  text-xs text-nowrap">
                <Select
                    options={options}
                    value={field.value}
                    onChange={(v) => helpers.setValue(v)}
                />
            </div>
        </FieldShell>
    );
}

interface TextareaFieldProps {
    name: FieldName;
    label: string;
    placeholder?: string;
}

function TextareaField({ name, label, placeholder }: TextareaFieldProps) {
    const [field, meta] = useField<string>(name);
    const error = meta.touched ? meta.error : undefined;

    return (
        <FieldShell name={name} label={label} error={error}>
            <TextArea
                {...field}
                id={name}
                placeholder={placeholder}
                aria-invalid={Boolean(error)}
                className={cn(
                    "min-h-20 w-full resize-y rounded-lg border bg-white px-4 py-3 text-base text-gray-800",
                    "outline-none transition-colors duration-200 placeholder:text-gray-500",
                    "focus:border-input-600 focus:ring-3 ",
                    error ? "border-red-500" : "border-gray-200"
                )}
            />
        </FieldShell>
    );
}


function PricingPolicy() {
    const { values, setFieldValue } = useFormikContext<CourseFormValues>();
    const amount = formatToman(values.cost);
    const isOn = values.freeForActiveInterns;

    return (
        <div className="rounded-xl border border-blue-300 bg-blue-50 p-5">
            <div className="flex items-center justify-between gap-4">
                <h3 className="text-base font-bold text-blue-900">سیاست قیمت‌گذاری دوره</h3>
                <div
                    dir="rtl"
                    className={cn(!isOn && "")}
                >
                    <SwitchButton
                        size="lg"
                        checked={isOn}
                        onChange={(checked) => setFieldValue("freeForActiveInterns", checked)}
                    />
                </div>
            </div>

            <p className="mt-2 text-xs leading-5 text-blue-800">
                با فعال‌سازی این گزینه، این دوره برای کارآموزانی که در حال گذراندن دوره کارآموزی هستند
                رایگان خواهد بود. سایر کاربران باید مبلغ {amount} تومان را پرداخت کنند.
            </p>

            {isOn && (
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4">
                        <p className="text-xs leading-5 text-emerald-800">کارآموزان فعال</p>
                        <p className="mt-2 flex items-center gap-2 text-base font-bold text-emerald-700">
                            رایگان
                            <CircleCheck size={18} aria-hidden />
                        </p>
                    </div>

                    <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
                        <p className="text-xs leading-5 text-amber-800">سایر کاربران</p>
                        <p className="mt-2 text-base font-bold text-amber-700">{amount} تومان</p>
                    </div>
                </div>
            )}
        </div>
    );
}

function FormActions({ onSaveDraft }: { onSaveDraft: (values: CourseFormValues) => void }) {
    const { values, isSubmitting } = useFormikContext<CourseFormValues>();

    return (
        <div className="flex items-center justify-end gap-2">
            <Button
                variant="text"
                color="input"
                size="sm"
                textSize="sm"
                className="font-bold hover:bg-teal-50  text-neutral-800"
                onClick={() => onSaveDraft(values)}
            >
                ذخیره پیش‌نویس
            </Button>

            <Button
                type="submit"
                variant="solid"
                color="input"
                size="sm"
                textSize="sm"
                rounded="lg"
                loading={isSubmitting}
                className="h-10 font-bold"
                leftIcon={<Send size={16} aria-hidden />}
            >
                انتشار دوره
            </Button>
        </div>
    );
}


export function CourseForm() {
    function normalize(values: CourseFormValues) {
        return {
            ...values,
            title: values.title.trim(),
            location: values.location.trim(),
            prerequisites: values.prerequisites.trim(),
            description: values.description.trim(),
            duration: extractNumber(values.duration),
            capacity: extractNumber(values.capacity),
            cost: Number(values.cost),
        };
    }

    async function handleSubmit(values: CourseFormValues) {
        console.log("Course payload:", normalize(values));
    }

    function handleSaveDraft(values: CourseFormValues) {
        console.log("Course draft:", normalize(values));
    }

    return (
        <Formik<CourseFormValues>
            initialValues={initialCourseValues}
            validationSchema={courseValidationSchema}
            validateOnBlur
            validateOnChange={false}
            onSubmit={handleSubmit}
        >
            <Form dir="ltr" noValidate className="flex  w-full min-w-0 flex-col gap-5">
                <Section title="بخش ۱ — اطلاعات کلی" >
                    <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
                        <TextField
                            name="title"
                            label="عنوان دوره"
                            required
                            placeholder="مثال: آموزش ETABS"
                            className="sm:col-span-2"
                        />
                        <SelectField name="type" label="نوع دوره" required options={COURSE_TYPES} />
                        <SelectField name="instructor" label="مدرس دوره" options={COURSE_INSTRUCTORS} />

                        <TextField name="date" label="تاریخ برگزاری" required type="date" />
                        <TextField name="startTime" label="ساعت شروع" required type="time" />
                        <TextField name="duration" label="مدت دوره" required />
                        <TextField name="location" label="محل برگزاری" placeholder="سالن اجتماعات سازمان" />

                        <TextField name="capacity" label="ظرفیت" required />
                    </div>
                </Section>

                <Section title="بخش ۲ — هزینه و ثبت‌نام">
                    <div className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-3">
                            <TextField name="cost" label="هزینه شرکت (تومان)" required isPrice inputMode="numeric" />
                            <TextField name="deadline" label="مهلت ثبت‌نام" required type="date" />
                            <SelectField name="status" label="وضعیت" options={COURSE_STATUSES} />
                        </div>

                        <PricingPolicy />
                    </div>
                </Section>

                <Section title="بخش ۳ — توضیحات و پیش‌نیازها">
                    <div className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 items-start gap-x-5 gap-y-5 sm:grid-cols-2">
                            <TextField
                                name="prerequisites"
                                label="پیش‌نیازها"
                                placeholder="مثال: آشنایی با مبانی تحلیل سازه‌ای"
                            />
                            <SelectField name="targetGroup" label="گروه هدف" options={TARGET_GROUPS} />
                        </div>

                        <TextareaField
                            name="description"
                            label="شرح دوره"
                            placeholder="معرفی اهداف و محتوای دوره..."
                        />
                    </div>
                </Section>

                <FormActions onSaveDraft={handleSaveDraft} />
            </Form>
        </Formik>
    );
}