"use client";

import { Select } from "@/app/components/ui/input/SelectSilde";
import * as React from "react";

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
    const [degree, setDegree] = React.useState("");
    const [major, setMajor] = React.useState("");

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

            <div className="flex items-center justify-between ">

                <div >
                    <span className="text-2xs  font-semibold text-gray-900"> مقطع تحصیلی </span>
                    <Select
                        className=" text-nowrap text-xs"
                        placeholder="انتخاب مقطع"
                        options={degreeOptions}
                        value={degree}
                        onChange={setDegree}
                    />
                </div>

                <div>
                    <span className="text-2xs  font-semibold text-gray-900">رشته تحصیلی</span>
                    <Select
                        placeholder="انتخاب رشته"
                        className=" text-nowrap text-xs"
                        options={majorOptions}
                        value={major}
                        onChange={setMajor}
                    />
                </div>



                <div className="flex flex-col gap-1 mt-1  w-[35%]">

                    <span className="text-2xs font-semibold text-gray-900">
                        مدت دوره کارآموزی
                    </span>

                    <div className="flex h-9 w-full items-center  gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4">
                        <span className="text-xs font-semibold text-neutral-900">
                            ۱ سال
                        </span>

                        <span className="text-2xs text-neutral-500">
                            (دوره استاندارد)
                        </span>
                    </div>
                </div>



            </div>
        </div>
    );
}