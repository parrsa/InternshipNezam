"use client";

import { Input } from "@/app/components/ui/input";
import { Select } from "@/app/components/ui/input/SelectSilde";
import { useState } from "react";

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

export default function EducationInfo() {
    const [degree, setDegree] = useState("");
    const [major, setMajor] = useState("");

    return (
        <div
            dir="rtl"
            className="w-full rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6  bg-white px-8 py-7 "
        >
            <div className="mb-8  flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef0f8] text-xs text-blue-800">
                        ۲
                    </span>

                    <span className="text-s font-semibold text-neutral-900">
                        اطلاعات تحصیلی و دوره
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-between w-full">

                <div className="w-1/3">
                    <div className="w-36">
                        <span className="text-2xs  font-semibold text-gray-900"> مقطع تحصیلی </span>
                        <Select
                            className=" text-nowrap text-xs"
                            placeholder="انتخاب مقطع"
                            options={degreeOptions}
                            value={degree}
                            onChange={setDegree}
                        />
                    </div>
                </div>

                <div className="flex justify-start w-1/3">
                    <div className="w-36">
                        <span className="text-2xs  font-semibold text-gray-900">رشته تحصیلی</span>
                        <Select
                            placeholder="انتخاب رشته"
                            className=" text-nowrap text-xs"
                            options={majorOptions}
                            value={major}
                            onChange={setMajor}
                        />
                    </div>
                </div>


                <div className="flex justify-start w-1/3">
                    <div className="w-36">
                        <span className="text-2xs  font-semibold text-gray-900">رشته تحصیلی</span>
                        <Select
                            placeholder="انتخاب رشته"
                            className=" text-nowrap text-xs"
                            options={majorOptions}
                            value={major}
                            onChange={setMajor}
                        />
                    </div>
                </div>





            </div>
            <div className="w-full flex justify-center items-center gap-3 mt-5">
                <div className="w-1/3">
                    <Input
                        label="سابقه کار (سال)"
                        variant="default"
                        labelClassName="mb-2 text-xs"
                        placeholder="012345678"
                        inputSize="sm"
                    />
                </div>
                <div className="w-1/3">
                    <Input
                        label="تعداد پروژه فعال"
                        variant="default"
                        labelClassName="mb-2 text-xs"
                        placeholder="012345-6"
                        inputSize="sm"
                    />
                </div>
                <div className="w-1/3">
                    <Input
                        label="سال اتخاذ پروانه"
                        variant="default"
                        labelClassName="mb-2 text-xs"
                        placeholder="تهران"
                        inputSize="sm"
                    />
                </div>
            </div>
        </div>
    );
}