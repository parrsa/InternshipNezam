"use client";
import * as React from "react";
import { Formik, useFormikContext } from "formik";
import { Bell, Send } from "lucide-react";
import { cn } from "@/lib/cn";

import {
    DEFAULT_VALUES,
    INSTRUCTOR_OPTIONS,
    PLATFORM_OPTIONS,
    SESSION_TYPE_OPTIONS,
    buildPayload,
    sessionSchema,
    type SessionFieldName,
    type SessionFormValues,
    type SessionPayload,
} from "@/app/organization/briefing-sessions/components/scheduleSession/Sessionschedule"
import { Select, SelectProps } from "@/app/components/ui/input/SelectSilde";
import { RadioOption } from "@/app/components/ui/RadioOption";
import { Input, TextArea } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/Button";
const FIELD_CLASS = "h-9 text-xs border-neutral-300 text-neutral-900";
const LABEL_CLASS = "mb-2 text-xs font-medium leading-5 text-neutral-900";


interface SelectFieldProps extends Pick<SelectProps, "options" | "value" | "onChange"> {
    label: string;
}

function SelectField({ label, ...selectProps }: SelectFieldProps) {
    return (
        <div className="flex w-full flex-col">
            <span className={LABEL_CLASS}>{label}</span>
            <div dir="rtl">
                <Select {...selectProps} />
            </div>
        </div>
    );
}

function SessionTypeField() {
    const labelId = React.useId();
    const { values, setFieldValue } = useFormikContext<SessionFormValues>();

    return (
        <div className="-mb-1.5 flex flex-col">
            <span id={labelId} className={cn(LABEL_CLASS, "mb-1.5")}>
                * نوع جلسه
            </span>
            <div role="radiogroup" aria-labelledby={labelId} className="flex items-center gap-4">
                {SESSION_TYPE_OPTIONS.map(({ value, label }) => {
                    const selected = values.sessionType === value;
                    return (
                        <RadioOption
                            key={value}
                            label={label}
                            value={value}
                            selected={selected}
                            onClick={() => setFieldValue("sessionType", value)}
                            className={cn(
                                "flex-none [&>div]:h-4 [&>div]:w-4",
                                "[&>span]:text-xs font-medium [&>span]:text-neutral-900",
                                selected ? "[&>div]:border-[5px]" : "[&>div]:border-2",
                            )}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function NotificationNotice() {
    return (
        <div
            role="note"
            className="flex items-center gap-2.5 rounded-lg border-r-4 border-[#FAB30A] bg-[#FEFAE8] px-4 py-4 text-[#93370D]"
        >
            <Bell size={20} aria-hidden="true" className="shrink-0 text-[#F79009]" />
            <p dir="rtl" className="text-xs leading-5">
                پس از تایید، نوتیفیکشن از طریق SSO و پیامک برای کارآموزان انتخاب شده ارسال می‌شود.
            </p>
        </div>
    );
}

function SessionFormFields({ onCancel }: { onCancel?: () => void }) {
    const {
        values,
        errors,
        touched,
        getFieldProps,
        setFieldValue,
        handleSubmit,
        resetForm,
        isSubmitting,
    } = useFormikContext<SessionFormValues>();

    const isOnline = values.sessionType === "online";

    const errorOf = (name: SessionFieldName) => (touched[name] ? errors[name] : undefined);

    const inputProps = (name: SessionFieldName) => ({
        id: name,
        name,
        field: getFieldProps(name),
        error: Boolean(errorOf(name)),
        errorMessage: errorOf(name),
        rounded: "lg" as const,
        className: FIELD_CLASS,
        labelClassName: LABEL_CLASS,
    });

    const handleCancel = () => {
        resetForm();
        onCancel?.();
    };

    return (
        <div className="flex flex-col gap-5">
            <SessionTypeField />

            {isOnline ? (
                <div className="flex flex-col gap-5 md:flex-row">
                    <div className="md:w-[49.3%]">
                        <Input
                            variant="default"
                            color="input"
                            {...inputProps("meetingLink")}
                            label="لینک جلسه"
                            inputMode="url"
                            dir="ltr" />
                    </div>
                    <div className="md:w-40  text-xs">
                        <SelectField
                            label="پلتفرم"
                            options={PLATFORM_OPTIONS}
                            value={values.platform}
                            onChange={(value) => setFieldValue("platform", value)}
                        />
                    </div>
                </div>
            ) : (
                <Input
                    variant="default"
                    color="input"
                    {...inputProps("location")}
                    label="محل برگزاری" />
            )}

            <div className="flex flex-col gap-5 md:flex-row">
                <div className="md:w-[32.3%]">
                    <Input
                        variant="default"
                        color="input"
                        {...inputProps("date")}
                        label="* تاریخ جلسه"
                        inputMode="numeric"
                        placeholder="۱۴۰۵/۰۴/۲۰"
                    />
                </div>
                <div className="md:w-[32.3%]">
                    <Input
                        variant="default"
                        color="input"
                        {...inputProps("timeRange")}
                        label="* ساعت شروع — پایان"
                        inputMode="numeric"
                        placeholder="۱۰:۰۰ - ۱۶:۰۰"
                    />
                </div>
                <div className="md:w-41.5 text-xs ">
                    <SelectField
                        label="مدرس/مسئول جلسه"
                        options={INSTRUCTOR_OPTIONS}
                        value={values.instructor}
                        onChange={(value) => setFieldValue("instructor", value)}
                    />
                </div>
            </div>

            <TextArea
                {...getFieldProps("topic")}
                id="topic"
                label="موضوع جلسه"
                rows={2}
                size="lg"
                rounded="lg"
                error={Boolean(errorOf("topic"))}
                errorMessage={errorOf("topic")}
                className=" border-neutral-300 text-sm text-neutral-900"
            />

            <NotificationNotice />

            <div className="flex items-center justify-end gap-6">
                <Button
                    variant="text"
                    color="primary"
                    size="sm"
                    textSize="xs"
                    rounded="lg"
                    disabled={isSubmitting}
                    onClick={handleCancel}
                    className="font-semibold text-neutral-900"
                >
                    انصراف
                </Button>
                <Button
                    variant="solid"
                    color="input"
                    size="md"
                    textSize="xs"
                    rounded="lg"
                    loading={isSubmitting}
                    leftIcon={<Send size={17} aria-hidden="true" />}
                    onClick={() => handleSubmit()}
                    className="font-bold"
                >
                    تایید و ارسال اطلاع‌رسانی
                </Button>
            </div>
        </div>
    );
}


export interface SessionSchedulingFormProps {
    initialValues?: SessionFormValues;
    onSubmit?: (payload: SessionPayload) => void | Promise<void>;
    onCancel?: () => void;
    className?: string;
}

export function SessionSchedulingForm({
    initialValues = DEFAULT_VALUES,
    onSubmit,
    onCancel,
    className,
}: SessionSchedulingFormProps) {
    const titleId = React.useId();

    const handleSubmit = React.useCallback(
        async (values: SessionFormValues) => {
            await onSubmit?.(buildPayload(values));
        },
        [onSubmit],
    );

    return (
        <div
            dir="ltr"
            aria-labelledby={titleId}
            className={cn(
                "w-full rounded-3xl border border-neutral-200 bg-white px-7.5 pb-7.5 pt-8",
                "shadow-[0_1px_3px_rgba(0,0,0,0.06)]",
                className,
            )}
        >
            <h2 id={titleId} className="mb-14 text-sm font-bold leading-5 text-neutral-900">
                برنامه‌ریزی جلسه
            </h2>

            <Formik<SessionFormValues>
                initialValues={initialValues}
                validationSchema={sessionSchema}
                onSubmit={handleSubmit}
            >
                <SessionFormFields onCancel={onCancel} />
            </Formik>
        </div>
    );
}

export default SessionSchedulingForm;