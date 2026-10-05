'use client'
import { Button } from "@/app/components/ui/Button"
import { useHeaderAction } from "@/core/provider/HeaderActionProvider/HeaderAction"
import { ArrowDownToLine, Star } from "lucide-react"
import { useEffect } from "react"

export const fakeData = [
    {
        id: 1,
        name: "حسین",
        lastName: "موسوی",
        status: "pending",
        des: "گزارش پایان کارآموزی — پروژه سعادت‌آباد",
        workClock: 820,
        Point: 88,
        Date: "۱۴۰۴/۰۴/۲۸"
    },
    {
        id: 2,
        name: "سحر",
        lastName: "احمدی",
        status: "pending",
        des: "گزارش پایان کارآموزی — مجتمع تجاری کیان",
        workClock: 820,
        Point: 88,
        Date: "۱۴۰۴/۰۴/۲۸"
    },
    {
        id: 1,
        name: "علی",
        lastName: "محمدی",
        status: "accept",
        des: "گزارش پایان کارآموزی — برج پارسیان",
        workClock: 820,
        Point: 88,
        Date: "۱۴۰۴/۰۴/۲۸"
    },

]

const HandelStatus = (status: any) => {
    switch (status) {
        case "pending":
            return <div className="bg-amber-100 text-amber-800 px-2 py-1 text-2xs border border-amber-600 rounded-full">درحال بررسی</div>;
        case "accept":
            return <div className="bg-green-100 text-green-800 px-2 py-1 text-2xs border border-green-600 rounded-full">تایید شده</div>;
    }
}


export default function Certificates() {
    const { setAction } = useHeaderAction()
    useEffect(() => {
        setAction(
            <div className="text-sm flex justify-start items-start flex-col gap-1">
                <p className="text-black font-bold ">داشبورد سرپرست</p>
                <p className="text-neutral-500 text-xs font-medium">خلاصه فعالیت‌های سرپرستی</p>
            </div>
        )

        return () => {
            setAction(null)
        }
    }, [])
    return (
        <div className="w-full grid grid-cols-2 gap-8 p-4">
            {fakeData.map((item: any) => (
                <div className="w-full h-48 flex-col gap-3 flex justify-start items-start bg-white p-4 rounded-xl border border-neutral-300">
                    <div className="w-full flex justify-between items-center">
                        <div className="flex justify-center items-center gap-2 text-xs">
                            <div>
                                <div className="w-10 h-10 rounded-full flex justify-center items-center bg-[#DCE3F3] text-xs">
                                    <span className="text-input-900 font-medium">{item.name[0]}</span>
                                </div>
                            </div>
                            <div className="flex justify-start items-start flex-col gap-1.5">
                                <p className="text-black font-bold">{item.name} {item.lastName}</p>
                                <p className="text-neutral-500 font-medium">{item.Date}</p>
                            </div>
                        </div>

                        <div className="text-xs ">
                            {HandelStatus(item.status)}
                        </div>
                    </div>
                    <div className="w-full flex justify-start items-center text-black text-xs">
                        <p>{item.des}</p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <div className="flex justify-start items start flex-col gap-1">
                            <div className="text-3xs text-neutral-500">
                                <span>امتیاز سرپرست</span>
                            </div>
                            <div className="flex justify-start items-center">
                                <Star size={20} color="#FE9C05" />
                                <span className="text-black font-bold text-sm">{item.Point}</span>
                            </div>
                        </div>
                        <div className="flex justify-center items-center flex-col">
                            <div className="text-3xs text-neutral-500">
                                <span>ساعت کل</span>
                            </div>
                            <div className="flex justify-start items-center">
                                <span className="text-black font-bold text-sm">{item.workClock}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center gap-4">
                        <Button className="w-1/2 h-8 text-xs" variant="solid" color="input"
                            leftIcon={<ArrowDownToLine size={18} />} >
                            دانلود
                        </Button>
                        <div className="w-1/2 h-8 text-xs bg-white border border-neutral-300 text-center flex justify-center items-center rounded-lg cursor-pointer">بازخورد</div>
                    </div>
                </div>
            ))
            }
        </div >
    )
}