'use client'
import { useHeaderAction } from "@/core/provider/HeaderActionProvider/HeaderAction"
import { ClipboardList, Clock, List, User, Users } from "lucide-react"
import { useEffect } from "react"


export default function Supervisor() {
    const { setAction } = useHeaderAction()

    const intoDashbord = [
        {
            id: 1,
            title: "کارآموزان فعال",
            number: 6,
            des: "۲ نفر جدید این ماه",
            icon: Users,
            bg: "text-green-900 bg-green-50 border-green-500"
        },
        {
            id: 2,
            title: "درخواست‌های در انتظار",
            number: 8,
            des: "۳ فوری",
            icon: ClipboardList,
            bg: "text-amber-900 bg-amber-50 border- "
        },
        {
            id: 3,
            title: "گزارش‌های تأیید شده",
            number: 14,
            des: "۹۲٪ نرخ تأیید",
            icon: Clock,
            bg: "text-green-900 bg-green-50 border-"
        },
        {
            id: 4,
            title: "ظرفیت باقی‌مانده",
            number: 4,
            des: "از ۱۰ نفر سقف",
            icon: User,
            bg: "bg-[#D4EBFF] border-"
        },
    ]

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
        <div className="w-full px-4">
            <div className="w-full grid grid-cols-4 grid-rows-[120px] justify-between gap-5">
                {intoDashbord.map((item: any) => {
                    const Icon = item.icon;
                    return (
                        <div key={item.id} className="w-full gap-3 flex h-full justify-start items-start p-5 bg-white rounded-xl">
                            <div className="w-10 h-10 rounded-md flex justify-center items-center bg-[#E8ECF7]">
                                <Icon size={18} color="blue" />
                            </div>
                            <div className="text-xs flex justify-start items-start flex-col gap-1">
                                <p className="text-neutral-500 font-medium">{item.title}</p>
                                <p className="text-lg text-black font-bold">{item.number}</p>
                                <p className={`${item.bg} p-1 w-fit px-2 rounded-xl  text-center border`}>{item.des}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}