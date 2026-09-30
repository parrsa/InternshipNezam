"use client";
import { Award, Edit, Pen, Pencil, Plus, Trash2, Truck } from "lucide-react";
import { cn } from "@/lib/cn";
import { Select } from "@/app/components/ui/input/SelectSilde";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/Button";
import { useState } from "react";
import Table from "@/app/components/ui/Table";

const rowsTabel = [
    {
        list: "1",
        ProjectName: "برج مسکونی پارسیان",
        role: "مدیر پروژه",
        area: 12000,
        time: 24,
        year: 1403,
        status: "اتمام یافته",
    },
    {
        list: "2",
        ProjectName: "مجتمع تجاری کیان",
        role: "ناظر رشته برق",
        area: 8500,
        time: 18,
        year: 1402,
        status: "اتمام یافته",
    },
    {
        list: "3",
        ProjectName: "برج مسکونی پارسیان",
        role: "مدیر پروژه",
        area: 12000,
        time: 30,
        year: 1402,
        status: "اتمام یافته",
    },

]




export default function LicenseStatus() {
    const [hasLicense, setHasLicense] = useState(true);
    const [licenseNumber, setLicenseNumber] = useState("");
    const [grade, setGrade] = useState<string | undefined>();

    const colTabel = [
        {
            key: "list",
            label: "ردیف",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
        },
        {
            key: "ProjectName",
            label: "نام پروژ",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
        },
        {
            key: "role",
            label: "نقش",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
        },
        {
            key: "area",
            label: "مساحت",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
        },
        {
            key: "time",
            label: "زمان",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
        },
        {
            key: "year",
            label: "سال",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
        },
        {
            key: "status",
            label: "وضعیت",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
        },
        {
            key: "Operation",
            label: "عملیات",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
            render: (row: any) => (
                <div className="flex justify-center items-center gap-4">
                    <div className="cursor-pointer">
                        <Pencil size={17} />
                    </div>
                    <div className="cursor-pointer">
                        <Trash2 size={17} color="red" />
                    </div>
                </div>
            )
        },

    ]

    return (
        <div dir="rtl" className="flex w-full flex-col gap-5 rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6  bg-white ">

            <div className="flex items-center mb-7 gap-2 justify-between w-full">
                <div className="flex justify-center items-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
                        ۳
                    </span>
                    <h3 className="text-s font-bold text-gray-800">
                        پروژه‌های اجرا شده
                    </h3>
                </div>
                <div>
                    <Button className="w-28 text-nowrap h-8 text-2xs" rounded="lg" color="input" leftIcon={<Plus />}>افزودن پروژه</Button>
                </div>
            </div>

            <div>
                <Table minHeight="100px" tableCol={colTabel} tableRow={rowsTabel} />
            </div>


        </div >
    );
}
