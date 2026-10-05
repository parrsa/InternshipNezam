'use client'
import { Input } from "@/app/components/ui/input"
import Table from "@/app/components/ui/Table"
import { useHeaderAction } from "@/core/provider/HeaderActionProvider/HeaderAction"
import { ArrowDownToLine } from "lucide-react"
import { useEffect } from "react"

const HandelStatus = (status: any) => {
    switch (status) {
        case "active":
            return <div className="bg-green-100 w-fit text-green-800 px-2 py-1 text-2xs border border-green-300 rounded-full">فعال</div>;
        case "inProgress":
            return <div className="bg-amber-100 w-fit text-amber-800 px-2 py-1 text-2xs border border-amber-300 rounded-full">در حال انجام</div>;
        case "completed":
            return <div className="bg-neutral-100 w-fit text-neutral-600 px-2 py-1 text-2xs border border-neutral-300 rounded-full">تکمیل شده</div>;
    }
}

const tabelRow = [
    {
        name: "علی محمدی",
        period: "مقررات ملی ساختمان",
        Time: 168,
        Start: "۱۴۰۴/۰۴/۰۱",
        progress: 75,
        Status: "active",
    },
    {
        name: "زهرا حسینی",
        period: "مدیریت پیمان",
        Time: 152,
        Start: "۱۴۰۴/۰۳/۱۵",
        progress: 60,
        Status: "active",
    },
    {
        name: "محمد رضایی",
        period: "فولاد ساختمانی",
        Time: 96,
        Start: "۱۴۰۴/۰۴/۱۵",
        progress: 45,
        Status: "inProgress",
    },
    {
        name: "فاطمه کریمی",
        period: "بتن مسلح پیشرفته",
        Time: 48,
        Start: "۱۴۰۴/۰۵/۰۱",
        progress: 20,
        Status: "inProgress",
    },
    {
        name: "حسین موسوی",
        period: "مقررات ملی",
        Time: 180,
        Start: "۱۴۰۴/۰۱/۰۱",
        progress: 100,
        Status: "active",
    },
    {
        name: "سحر احمدی",
        period: "مدیریت پیمان",
        Time: 120,
        Start: "۱۴۰۴/۰۲/۰۱",
        progress: 90,
        Status: "completed",
    },
]

export default function Apprentices() {
    const { setAction } = useHeaderAction()

    const tabelCols = [
        {
            key: "name",
            label: "نام",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
            render: (row: any) => (
                <div className="flex justify-start items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 text-xs flex justify-center items-center">
                        {row.name.charAt(0)}
                    </div>
                    <span className="text-black text-sm font-bold">{row.name}</span>
                </div>
            )
        },
        {
            key: "period",
            label: "دوره",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
        },
        {
            key: "Time",
            label: "ساعت",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
        },
        {
            key: "Start",
            label: "شروع",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
        },
        {
            key: "progress",
            label: "پیشرفت",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
            render: (row: any) => (
                <div className="flex justify-center items-center gap-2" dir="ltr">
                    <span className="text-xs text-neutral-700 w-9 text-left">{row.progress.toLocaleString("fa-IR")}%</span>
                    <div className="w-28 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-800 rounded-full"
                            style={{ width: `${row.progress}%` }}
                        />
                    </div>
                </div>
            )
        },
        {
            key: "Status",
            label: "وضعیت",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
            render: (row: any) => (
                <div className="w-full flex justify-center items-center">
                    {HandelStatus(row.Status)}
                </div>
            )
        },
    ]

    useEffect(() => {
        setAction(
            <div className="text-sm flex justify-start items-start flex-col gap-1">
                <p className="text-black font-bold ">کارآموزان من</p>
                <p className="text-neutral-500 text-xs font-medium">فهرست کارآموزان زیر نظر</p>
            </div>
        )
        return () => {
            setAction(null)
        }
    }, [])

    return (
        <div className="p-4 flex justify-center items-center flex-col gap-4">
            <div className="w-full flex justify-between items-center">
                <div className="w-3/12">
                    <Input
                        variant="rounded"
                        className=""
                        placeholder="جستجوی کارآموز..."
                        rounded="lg"
                        inputSize="sm"
                    />
                </div>
                <div>
                    <div className="flex justify-center text-xs border border-neutral-300 p-2 rounded-lg bg-white font-bold cursor-pointer items-center gap-1">
                        <ArrowDownToLine size={16} />
                        <span>خروجی Excel</span>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden w-full rounded-xl bg-white border border-neutral-300">
                <Table tableCol={tabelCols} tableRow={tabelRow} />
            </div>
        </div>
    )
}