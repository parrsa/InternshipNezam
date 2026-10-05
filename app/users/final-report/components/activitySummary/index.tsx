"use client";
import * as React from "react";
import { useField } from "formik";
import { Input } from "@/app/components/ui/input/Input";
import { TextArea } from "@/app/components/ui/input/TextArea";


function ActivitySummary() {
    const [summary, summaryMeta] = useField("summary");
    const [hours, hoursMeta] = useField("totalHours");
    const [visits, visitsMeta] = useField("technicalVisits");

    return (
        <div className="w-full rounded-2xl border border-neutral-200 bg-white px-8 py-7 shadow-sm">
            <h2 className="mb-8 text-s font-semibold text-neutral-900">خلاصه فعالیت</h2>

            <TextArea
                id="summary"
                {...summary}
                rounded="xl"
                placeholder="خلاصه‌ای از فعالیت‌های انجام شده در دوره کارآموزی..."
                error={summaryMeta.touched && !!summaryMeta.error}
                errorMessage={summaryMeta.error}
                className="h-18 resize-y  border-neutral-200 px-4 py-3 text-sm placeholder:text-xs placeholder:text-neutral-600"
            />

            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Input
                    id="totalHours"
                    name="totalHours"
                    field={hours}
                    inputMode="numeric"
                    variant="default"
                    inputSize="sm"
                    rounded="lg"
                    label="ساعت کل کارآموزی"
                    labelClassName="mb-2 text-2xs font-semibold text-gray-900"
                    error={hoursMeta.touched && !!hoursMeta.error}
                    errorMessage={hoursMeta.error}
                    className=" placeholder:text-neutral-600 placeholder:text-xs "

                />
                <Input
                    id="technicalVisits"
                    name="technicalVisits"
                    variant="default"
                    inputSize="sm"
                    rounded="lg"
                    field={visits}
                    inputMode="numeric"
                    label="تعداد بازدید فنی"
                    labelClassName="mb-2 text-2xs font-semibold text-gray-900"
                    error={visitsMeta.touched && !!visitsMeta.error}
                    errorMessage={visitsMeta.error}
                    className=" placeholder:text-neutral-600 placeholder:text-xs "
                />
            </div>
        </div>
    );
}

export default ActivitySummary;