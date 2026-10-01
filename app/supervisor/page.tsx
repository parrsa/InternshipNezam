'use client'
import { useHeaderAction } from "@/core/provider/HeaderActionProvider/HeaderAction"
import { CircleCheck, ClipboardList, LucideIcon, UserCheck, Users } from "lucide-react"
import { useEffect } from "react"
import SupervisorCharts from "./components/supervisorCharts"
import LowProgressInterns from "./components/lowProgressInterns"

type DashboardItem = {
    id: number
    title: string
    number: number
    des: string
    icon: LucideIcon
    badge: string
}

const dashboardItems: DashboardItem[] = [
    {
        id: 1,
        title: "کارآموزان فعال",
        number: 6,
        des: "۲ نفر جدید این ماه",
        icon: Users,
        badge: "text-green-900 bg-green-100 border-green-300",
    },
    {
        id: 2,
        title: "درخواست‌های در انتظار",
        number: 8,
        des: "۳ فوری",
        icon: ClipboardList,
        badge: "text-amber-900 bg-amber-100 border-amber-300",
    },
    {
        id: 3,
        title: "گزارش‌های تأیید شده",
        number: 14,
        des: "۹۲٪ نرخ تأیید",
        icon: CircleCheck,
        badge: "text-green-900 bg-green-100 border-green-300",
    },
    {
        id: 4,
        title: "ظرفیت باقی‌مانده",
        number: 4,
        des: "از ۱۰ نفر سقف",
        icon: UserCheck,
        badge: "text-blue-900 bg-blue-100 border-blue-300",
    },
]

export default function Supervisor() {
    const { setAction } = useHeaderAction()

    useEffect(() => {
        setAction(
            <div className="text-sm flex flex-col items-start gap-1">
                <p className="text-black font-bold">داشبورد سرپرست</p>
                <p className="text-neutral-500 text-xs font-medium">خلاصه فعالیت‌های سرپرستی</p>
            </div>
        )
        return () => setAction(null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div dir="rtl" className="w-full px-4">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 auto-rows-[120px] gap-5">
                {dashboardItems.map((item) => {
                    const Icon = item.icon
                    return (
                        <div
                            key={item.id}
                            className="w-full h-full flex items-start gap-3 p-5 bg-white rounded-xl border border-neutral-200"
                        >
                            <div className="w-11 h-11 shrink-0 rounded-xl flex justify-center items-center bg-[#E8ECF7]">
                                <Icon size={18} className="text-blue-800" />
                            </div>

                            <div className="flex flex-col items-start gap-1 text-xs">
                                <p className="text-neutral-500 font-medium">{item.title}</p>
                                <p className="text-xl leading-none text-black font-bold">
                                    {item.number.toLocaleString("fa-IR")}
                                </p>
                                <p className={`${item.badge} w-fit text-3xs px-2 py-1 mt-1 rounded-xl border text-center`}>
                                    {item.des}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>

            <SupervisorCharts />
            <LowProgressInterns />
        </div>
    )
}