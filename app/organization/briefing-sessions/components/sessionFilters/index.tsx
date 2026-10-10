import { Input } from '@/app/components/ui/input';
import { Select } from '@/app/components/ui/input/SelectSilde';
import { cn } from '@/lib/cn';
import { Search } from 'lucide-react';
import React, { useState } from 'react'

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
const trueroleOption = [
    { label: " طراحی", value: "civil" },
    { label: "نظارت ", value: "architecture" },
    { label: "اجرا", value: "electrical" },
    { label: " همه صلاحیت ها", value: "mechanical" },
];
function SessionFilters() {
    const [degree, setDegree] = useState("");
    const [major, setMajor] = useState("");
    const [truerole, setTruerole] = useState("")
    return (
        <div
            dir="ltr"
            className="w-full rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6  bg-white px-8 py-7 "
        >
            <div className="mb-3  mt-4  flex items-center justify-between">
                <div className="flex items-center gap-2">

                    <span className="text-xs font-semibold text-neutral-900">
                        فیلترها:


                    </span>
                </div>
            </div>

            <div className="flex items-center mb-6 justify-between ">

                <div>
                    <span className="text-2xs  font-semibold text-neutral-600">رشته </span>
                    <Select
                        placeholder="همه رشته ها"
                        className=" text-nowrap text-xs"
                        options={majorOptions}
                        value={major}
                        onChange={setMajor}
                    />
                </div>

                <div >
                    <span className="text-2xs  font-semibold text-neutral-600"> صلاحیت  </span>
                    <Select
                        className=" text-nowrap text-neutral-900 text-xs"
                        placeholder="همه صلاحیت"
                        options={trueroleOption}
                        value={truerole}
                        onChange={setTruerole}
                    />
                </div>

                <div >
                    <span className="text-2xs  font-semibold text-neutral-600"> مقطع  </span>
                    <Select
                        className=" text-nowrap text-neutral-900 text-xs"
                        placeholder="همه مقاطع"
                        options={degreeOptions}
                        value={degree}
                        onChange={setDegree}
                    />
                </div>

                <div className="w-[25%]">
                    <span className="text-2xs  font-semibold text-neutral-600"> جستوجو  </span>

                    <Input
                        variant="default"
                        color="input"
                        inputSize="sm"
                        placeholder=" جستوجوی نام  کار اموز ..."
                        className={cn("  w-full  border-neutral-300 border  shadow-xs   placeholder:text-neutral-500   placeholder:text-xs ")}
                        rightIcon={
                            <Search size={18}
                                className=" mt-1 text-neutral-500"
                            />
                        }
                    />

                </div>


            </div>
        </div>
    )
}

export default SessionFilters
