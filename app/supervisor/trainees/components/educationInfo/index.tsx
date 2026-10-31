// "use client";

// import { Input } from "@/app/components/ui/input";
// import { Select } from "@/app/components/ui/input/SelectSilde";
// import { useState } from "react";

// const degreeOptions = [
//     { label: "مهندسی عمران", value: "bachelor" },
//     { label: " مهندسی معماری", value: "master" },
//     { label: " مهندسی برق", value: "phd" },
//     { label: " مهندسی مکانیک", value: "associate" },
// ];

// const majorOptions = [
//     { label: " طراح", value: "civil" },
//     { label: "ناظر ", value: "architecture" },
//     { label: " مجری", value: "electrical" },
//     { label: " طراح/ناظر/مجری", value: "mechanical" },
// ];

// export default function EducationInfo() {
//     const [degree, setDegree] = useState("");
//     const [major, setMajor] = useState("");

//     return (
//         <div
//             dir="rtl"
//             className="w-full rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6  bg-white px-8 py-7 "
//         >
//             <div className="mb-8  flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                     <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef0f8] text-xs text-blue-800">
//                         ۲
//                     </span>

//                     <span className="text-s font-semibold text-neutral-900">
//                         اطلاعات تحصیلی و دوره
//                     </span>
//                 </div>
//             </div>

//             <div className="flex items-center justify-between w-full">

//                 <div className="w-1/3">
//                     <div className="w-36">
//                         <span className="text-2xs  font-semibold text-gray-900"> رشته فعالیت  </span>
//                         <Select
//                             className=" text-nowrap text-xs"
//                             placeholder="انتخاب رشته    "
//                             options={degreeOptions}
//                             value={degree}
//                             onChange={setDegree}
//                         />
//                     </div>
//                 </div>

//                 <div className="flex justify-start w-1/3">
//                     <div className="w-36">
//                         <span className="text-2xs  font-semibold text-gray-900">صلاحیت</span>
//                         <Select
//                             placeholder="انتخاب صلاحیت"
//                             className=" text-nowrap text-xs"
//                             options={majorOptions}
//                             value={major}
//                             onChange={setMajor}
//                         />
//                     </div>
//                 </div>


//                 <div className="flex justify-start w-1/3">
//                     <div className="w-36">
//                         <span className="text-2xs  font-semibold text-gray-900">رشته تحصیلی</span>
//                         <Select
//                             placeholder="انتخاب رشته"
//                             className=" text-nowrap text-xs"
//                             options={majorOptions}
//                             value={major}
//                             onChange={setMajor}
//                         />
//                     </div>
//                 </div>





//             </div>
//             <div className="w-full flex justify-center items-center gap-3 mt-5">
//                 <div className="w-1/3">
//                     <Input
//                         label="سابقه کار (سال)"
//                         variant="default"
//                         labelClassName="mb-2 text-xs"
//                         placeholder="012345678"
//                         inputSize="sm"
//                     />
//                 </div>
//                 <div className="w-1/3">
//                     <Input
//                         label="تعداد پروژه فعال"
//                         variant="default"
//                         labelClassName="mb-2 text-xs"
//                         placeholder="012345-6"
//                         inputSize="sm"
//                     />
//                 </div>
//                 <div className="w-1/3">
//                     <Input
//                         label="سال اتخاذ پروانه"
//                         variant="default"
//                         labelClassName="mb-2 text-xs"
//                         placeholder="تهران"
//                         inputSize="sm"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }


"use client";

import { Input, TextArea } from "@/app/components/ui/input";
import { Select } from "@/app/components/ui/input/SelectSilde";
import { cn } from "@/lib/cn";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type Option = { label: string; value: string };
type Item = { value: string; active: boolean };

const degreeOptions: Option[] = [
    { label: "مهندسی عمران", value: "bachelor" },
    { label: "مهندسی معماری", value: "master" },
    { label: "مهندسی برق", value: "phd" },
    { label: "مهندسی مکانیک", value: "associate" },
];

const majorOptions: Option[] = [
    { label: "طراح", value: "civil" },
    { label: "ناظر", value: "architecture" },
    { label: "مجری", value: "electrical" },
    { label: "طراح/ناظر/مجری", value: "mechanical" },
];

function ActiveSelect({
    label,
    placeholder,
    options,
    items,
    onChange,
    multiple,
}: {
    label: string;
    placeholder: string;
    options: Option[];
    items: Item[];
    onChange: (items: Item[]) => void;
    multiple: boolean;
}) {
    const labelOf = (v: string) => options.find((o) => o.value === v)?.label ?? v;

    const handleSelect = (value: string) => {
        if (multiple) {
            if (!items.some((i) => i.value === value)) onChange([...items, { value, active: true }]);
        } else {
            onChange([{ value, active: true }]);
        }
    };

    const toggle = (value: string) =>
        onChange(items.map((i) => (i.value === value ? { ...i, active: !i.active } : i)));

    const remove = (value: string) => onChange(items.filter((i) => i.value !== value));

    return (
        <div className="w-full">
            <span className="mb-2 block text-2xs font-semibold text-gray-900">{label}</span>
            <Select
                className="text-nowrap text-xs"
                placeholder={placeholder}
                options={multiple ? options.filter((o) => !items.some((i) => i.value === o.value)) : options}
                value={multiple ? "" : items[0]?.value ?? ""}
                onChange={handleSelect}
            />

            {items.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {items.map((item) => (
                        <div
                            key={item.value}
                            className={cn(
                                "flex items-center gap-2 rounded-lg border px-2 py-1 text-2xs",
                                item.active
                                    ? "border-blue-200 bg-blue-50 text-blue-900"
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
                                    "flex h-4 w-7 items-center rounded-full px-0.5 transition-all",
                                    item.active ? "justify-end bg-blue-700" : "justify-start bg-neutral-300"
                                )}
                            >
                                <span className="h-3 w-3 rounded-full bg-white" />
                            </button>
                            <button type="button" onClick={() => remove(item.value)} className="text-neutral-500 hover:text-red-500">
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function EducationInfo({ userType }: { userType: "User" | "legal" }) {
    const [fields, setFields] = useState<Item[]>([]);
    const [qualifications, setQualifications] = useState<Item[]>([]);

    useEffect(() => {
        if (userType === "User") setFields((f) => f.slice(0, 1));
    }, [userType]);

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
                        رشته فعالیت، صلاحیت و سوابق
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 items-start gap-4">
                <ActiveSelect
                    label="رشته فعالیت"
                    placeholder="انتخاب رشته"
                    options={degreeOptions}
                    items={fields}
                    onChange={setFields}
                    multiple={userType === "legal"}
                />
                <ActiveSelect
                    label="صلاحیت"
                    placeholder="انتخاب صلاحیت"
                    options={majorOptions}
                    items={qualifications}
                    onChange={setQualifications}
                    multiple
                />
            </div>

            <div className="w-full flex justify-center items-center gap-3 mt-5">
                <div className="w-1/2">
                    <Input
                        label="سابقه کار (سال)"
                        variant="default"
                        labelClassName="mb-2 text-xs"
                        placeholder="012345678"
                        inputSize="sm"
                    />
                </div>
                <div className="w-1/2">
                    <Input
                        label="تعداد پروژه فعال"
                        variant="default"
                        labelClassName="mb-2 text-xs"
                        placeholder="012345-6"
                        inputSize="sm"
                    />
                </div>
            </div>

            <div className="mt-5 w-full">
                <span className="mb-2 block text-2xs font-semibold text-gray-900">خلاصه سوابق</span>
                <TextArea
                    variant="default"
                    className="text-xs"
                    placeholder="خلاصه‌ای از سوابق حرفه‌ای، پروژه‌های اجرا شده و تخصص‌های اصلی..."
                    rows={3}
                />
            </div>
        </div>
    );
}