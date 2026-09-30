'use client'
import Table from "@/app/components/ui/Table"
import { useHeaderAction } from "@/core/provider/HeaderActionProvider/HeaderAction"
import { CircleCheck } from "lucide-react"
import { useEffect } from "react"

const infoData = [
    {
        id: 1,
        title: "در انتظار",
        number: 3
    },
    {
        id: 2,
        title: "تأیید شده",
        number: 9
    }, {
        id: 3,
        title: "رد شده",
        number: 1
    },
]

const tabelRow = [
    {
        intern: "علی محمدی",
        period: "مرداد ۱۴۰۴",
        Time: 168,
        Date: "۱۴۰۴/۰۵/۰۲",
        Status: "pending",
    },
    {
        intern: "زهرا حسینی",
        period: "مرداد ۱۴۰۴",
        Time: 152,
        Date: "۱۴۰۴/۰۵/۰۲",
        Status: "approved",
    },
    {
        intern: "محمد رضایی",
        period: "مرداد ۱۴۰۴",
        Time: 96,
        Date: "۱۴۰۴/۰۵/۰۲",
        Status: "pending",
    },
    {
        intern: "فاطمه کریمی",
        period: "مرداد ۱۴۰۴",
        Time: 48,
        Date: "۱۴۰۴/۰۵/۰۲",
        Status: "rejected",
    },
    {
        intern: "حسین موسوی",
        period: "مرداد ۱۴۰۴",
        Time: 180,
        Date: "۱۴۰۴/۰۵/۰۲",
        Status: "approved",
    },
]

const HandelStatus = (status: any) => {
    switch (status) {
        case "pending":
            return <div className="bg-amber-100 w-fit text-amber-800 px-2 py-1 text-2xs border border-amber-300 rounded-full">در انتظار</div>;
        case "approved":
            return <div className="bg-green-100 w-fit text-green-800 px-2 py-1 text-2xs border border-green-300 rounded-full">تایید شده</div>;
        case "rejected":
            return <div className="bg-red-100 w-fit text-red-800 px-2 py-1 text-2xs border border-red-300 rounded-full">رد شده</div>
    }
}

export default function MonthlyReport() {
    const { setAction } = useHeaderAction()

    const tabelCols = [
        {
            key: "intern",
            label: "کارآموز",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
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
            key: "Date",
            label: "تاریخ",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
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
        {
            key: "asd",
            label: "عملیات",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
            render: (row: any) => (
                <div className="flex justify-center items-center gap-2">
                    <div className="flex justify-center p-1 cursor-pointer hover:bg-input-50 border-neutral-300 transition-all duration-500 items-center gap-2 border rounded-md bg-neutral-50 shadow-lg text-xs">
                        <CircleCheck size={12} />
                        <span>تایید</span>
                    </div>
                    <div className="flex justify-center p-1 cursor-pointer hover:bg-input-50 border-neutral-300 transition-all duration-500 items-center gap-2 border rounded-md bg-neutral-50 shadow-lg text-xs">
                        <span>بازخورد</span>
                    </div>
                </div>
            )
        },

    ]
    useEffect(() => {
        setAction(
            <div className="text-sm flex justify-start items-start flex-col gap-1">
                <p className="text-black font-bold ">گزارش‌های ماهانه</p>
                <p className="text-neutral-500 text-xs font-medium">بازبینی و تأیید گزارش‌ها</p>
            </div>
        )
        return () => {
            setAction(null)
        }
    }, [])

    return (
        <div className="p-4">
            <div className="w-full grid grid-cols-3 grid-rows-[150px] gap-4">
                {infoData.map((item: any) => (
                    <div key={item.id} className="w-full h-full bg-white rounded-2xl shadow-lg border border-neutral-300 flex justify-center items-start p-4 gap-2 flex-col ">
                        <p className="text-neutral-500 font-medium text-xs">{item.title}</p>
                        <p className="text-black font-bold text-xl">{item.number}</p>
                    </div>
                ))}
            </div>

            <div className="w-full bg-white p-5 mt-8 rounded-xl  border border-neutral-300 shadow-lg">
                <div>
                    <p className="text-black text-xs font-bold">گزارش های ماهانه کارآموزان</p>
                </div>

                <div className="mt-8">
                    <Table tableCol={tabelCols} tableRow={tabelRow} />
                </div>
            </div>
        </div>
    )
}