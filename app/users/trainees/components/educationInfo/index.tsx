"use client";

import { useState, type ReactNode } from "react";
import { Select } from "@/app/components/ui/input/SelectSilde";
import { Input } from "@/app/components/ui/input";

const degreeOptions = [
    { label: "کارشناسی", value: "bachelor" },
    { label: "کارشناس ارشد", value: "master" },
    { label: "دکتری", value: "phd" },
    { label: "کاردانی", value: "associate" },
];

const majorOptions = [
    { label: "مهندسی عمران", value: "civil" },
    { label: "مهندسی معماری", value: "architecture" },
    { label: "مهندسی برق", value: "electrical" },
    { label: "مهندسی مکانیک", value: "mechanical" },
];

const competenceOptions = [
    { label: "طراحی", value: "design" },
    { label: "نظارت", value: "supervision" },
    { label: "اجرا", value: "execution" },
];

function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="flex w-full flex-col gap-2">
            <span className="text-2xs font-semibold text-neutral-900">{label}</span>
            {children}
        </div>
    );
}

interface EducationInfoProps {
    stepNumber?: string;
}

export default function EducationInfo({ stepNumber = "۲" }: EducationInfoProps) {
    const [degree, setDegree] = useState("");
    const [major, setMajor] = useState("");
    const [university, setUniversity] = useState("");
    const [competence, setCompetence] = useState("");

    return (
        <div
            dir="rtl"
            className="w-full rounded-2xl border-2 border-neutral-200 bg-white p-5 shadow-xs sm:p-7"
        >
            <div className="mb-8 flex items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef0f8] text-xs text-blue-800">
                    {stepNumber}
                </span>
                <h3 className="text-s font-semibold text-neutral-900">
                    اطلاعات تحصیلی و دوره
                </h3>
            </div>

             <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-3">
                <Field label="مقطع تحصیلی">
                    <Select
                        className="w-1/2 text-nowrap text-xs"
                        placeholder="انتخاب مقطع"
                        options={degreeOptions}
                        value={degree}
                        onChange={setDegree}
                    />
                </Field>

                <Field label="رشته تحصیلی">
                    <Select
                        className="w-1/2 text-nowrap text-xs"
                        placeholder="انتخاب رشته"
                        options={majorOptions}
                        value={major}
                        onChange={setMajor}
                    />
                </Field>

                <Field label="نام دانشگاه">
                    <Input
                        variant="default"
                        inputSize="sm"
                        className="placeholder:text-neutral-600 placeholder:text-xs"
                        placeholder="مثال: دانشگاه صنعتی شریف"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                    />
                </Field>

                <Field label="صلاحیت مدنظر برای کارآموزی">
                    <Select
                        className="w-1/2 text-nowrap text-xs"
                        placeholder="انتخاب صلاحیت موردنظر"
                        options={competenceOptions}
                        value={competence}
                        onChange={setCompetence}
                    />
                </Field>

                <div className="hidden sm:block" aria-hidden />

                <Field label="مدت دوره کارآموزی">
                    <div className="flex h-9 w-full items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4">
                        <span className="text-xs font-semibold text-neutral-900">۱ سال</span>
                        <span className="text-2xs text-neutral-500">(دوره استاندارد)</span>
                    </div>
                </Field>
            </div>
        </div>
    );
}