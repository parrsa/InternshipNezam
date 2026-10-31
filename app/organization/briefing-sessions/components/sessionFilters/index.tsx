// import { Input } from '@/app/components/ui/input';
// import { Select } from '@/app/components/ui/input/SelectSilde';
// import { cn } from '@/lib/cn';
// import { Search } from 'lucide-react';
// import React, { useState } from 'react'

// const degreeOptions = [
//     { label: "کارشناسی", value: "bachelor" },
//     { label: "کارشناس ارشد", value: "master" },
//     { label: "دکتری", value: "phd" },
//     { label: "کاردانی", value: "associate" },
// ];

// const majorOptions = [
//     { label: "مهندسی عمران", value: "civil" },
//     { label: "مهندسی معماری", value: "architecture" },
//     { label: "مهندسی برق", value: "electrical" },
//     { label: "مهندسی مکانیک", value: "mechanical" },
// ];
// const trueroleOption = [
//     { label: " طراحی", value: "civil" },
//     { label: "نظارت ", value: "architecture" },
//     { label: "اجرا", value: "electrical" },
//     { label: " همه صلاحیت ها", value: "mechanical" },
// ];
// function SessionFilters() {
//     const [degree, setDegree] = useState("");
//     const [major, setMajor] = useState("");
//     const [truerole, setTruerole] = useState("")
//     return (
//         <div
//             dir="ltr"
//             className="w-full rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6  bg-white px-8 py-7 "
//         >
//             <div className="mb-3  mt-4  flex items-center justify-between">
//                 <div className="flex items-center gap-2">

//                     <span className="text-xs font-semibold text-neutral-900">
//                         فیلترها:


//                     </span>
//                 </div>
//             </div>

//             <div className="flex items-center mb-6 justify-between ">

//                 <div>
//                     <span className="text-2xs  font-semibold text-neutral-600">رشته </span>
//                     <Select
//                         placeholder="همه رشته ها"
//                         className=" text-nowrap text-xs"
//                         options={majorOptions}
//                         value={major}
//                         onChange={setMajor}
//                     />
//                 </div>

//                 <div >
//                     <span className="text-2xs  font-semibold text-neutral-600"> صلاحیت  </span>
//                     <Select
//                         className=" text-nowrap text-neutral-900 text-xs"
//                         placeholder="همه صلاحیت"
//                         options={trueroleOption}
//                         value={truerole}
//                         onChange={setTruerole}
//                     />
//                 </div>

//                 <div >
//                     <span className="text-2xs  font-semibold text-neutral-600"> مقطع  </span>
//                     <Select
//                         className=" text-nowrap text-neutral-900 text-xs"
//                         placeholder="همه مقاطع"
//                         options={degreeOptions}
//                         value={degree}
//                         onChange={setDegree}
//                     />
//                 </div>

//                 <div className="w-[25%]">
//                     <span className="text-2xs  font-semibold text-neutral-600"> جستوجو  </span>

//                     <Input
//                         variant="default"
//                         color="input"
//                         inputSize="sm"
//                         placeholder=" جستوجوی نام  کار اموز ..."
//                         className={cn("  w-full  border-neutral-300 border  shadow-xs   placeholder:text-neutral-500   placeholder:text-xs ")}
//                         rightIcon={
//                             <Search size={18}
//                                 className=" mt-1 text-neutral-500"
//                             />
//                         }
//                     />

//                 </div>


//             </div>
//         </div>
//     )
// }

// export default SessionFilters







"use client";

import { Input } from '@/app/components/ui/input';
import { Select } from '@/app/components/ui/input/SelectSilde';
import { cn } from '@/lib/cn';
import { Search, X } from 'lucide-react';
import React, { useState } from 'react'

type Option = { label: string; value: string };
type Item = { value: string; active: boolean };

const degreeOptions = [
    { label: "کارشناسی", value: "bachelor" },
    { label: "کارشناس ارشد", value: "master" },
    { label: "دکتری", value: "phd" },
    { label: "کاردانی", value: "associate" },
];

const majorOptions: Option[] = [
    { label: "مهندسی عمران", value: "civil" },
    { label: "مهندسی معماری", value: "architecture" },
    { label: "مهندسی برق", value: "electrical" },
    { label: "مهندسی مکانیک", value: "mechanical" },
];
const trueroleOption: Option[] = [
    { label: " طراحی", value: "civil" },
    { label: "نظارت ", value: "architecture" },
    { label: "اجرا", value: "electrical" },
    { label: " همه صلاحیت ها", value: "mechanical" },
];

function ChipSelect({
    label,
    placeholder,
    options,
    items,
    onChange,
    selectClassName,
}: {
    label: string;
    placeholder: string;
    options: Option[];
    items: Item[];
    onChange: (items: Item[]) => void;
    selectClassName?: string;
}) {
    const labelOf = (v: string) => options.find((o) => o.value === v)?.label ?? v;

    const handleSelect = (value: string) => {
        if (!items.some((i) => i.value === value)) onChange([...items, { value, active: true }]);
    };

    const toggle = (value: string) =>
        onChange(items.map((i) => (i.value === value ? { ...i, active: !i.active } : i)));

    const remove = (value: string) => onChange(items.filter((i) => i.value !== value));

    return (
        <div>
            <span className="text-2xs  font-semibold text-neutral-600">{label}</span>
            <Select
                placeholder={placeholder}
                className={selectClassName}
                options={options.filter((o) => !items.some((i) => i.value === o.value))}
                value=""
                onChange={handleSelect}
            />

            {items.length > 0 && (
                <div dir="rtl" className="mt-3 flex flex-wrap gap-2">
                    {items.map((item) => (
                        <div
                            key={item.value}
                            className={cn(
                                "flex items-center gap-3 rounded-lg border px-3 py-2 text-xs",
                                item.active
                                    ? "border-blue-200 bg-blue-50 text-neutral-800"
                                    : "border-neutral-200 bg-neutral-100 text-neutral-400"
                            )}
                        >
                            <span className={cn(!item.active && "line-through")}>{labelOf(item.value)}</span>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={item.active}
                                dir="ltr"
                                onClick={() => toggle(item.value)}
                                className={cn(
                                    "flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full px-0.5 transition-all",
                                    item.active ? "justify-end bg-blue-700" : "justify-start bg-neutral-300"
                                )}
                            >
                                <span className="h-4 w-4 rounded-full bg-white shadow-sm" />
                            </button>
                            <button
                                type="button"
                                onClick={() => remove(item.value)}
                                className="cursor-pointer text-neutral-500 hover:text-red-500"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function SessionFilters() {
    const [degree, setDegree] = useState("");
    const [majors, setMajors] = useState<Item[]>([]);
    const [trueroles, setTrueroles] = useState<Item[]>([]);
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

            <div className="flex items-start mb-6 justify-between ">

                <ChipSelect
                    label="رشته "
                    placeholder="همه رشته ها"
                    selectClassName=" text-nowrap text-xs"
                    options={majorOptions}
                    items={majors}
                    onChange={setMajors}
                />

                <ChipSelect
                    label=" صلاحیت  "
                    placeholder="همه صلاحیت"
                    selectClassName=" text-nowrap text-neutral-900 text-xs"
                    options={trueroleOption}
                    items={trueroles}
                    onChange={setTrueroles}
                />

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
