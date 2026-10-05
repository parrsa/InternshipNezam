
import { Button } from "@/app/components/ui/Button"
import { cn } from "@/lib/cn"
import { CheckCircle2, Presentation } from "lucide-react"

type Status = "upcoming" | "registered"

interface Session {
    id: number
    title: string
    location: string
    date: string
    time: string
    assigner: string
    status: Status
    description: string
}

const sessions: Session[] = [
    {
        id: 1,
        title: "جلسه توجیهی کارآموزی — نیمسال پاییز ۱۴۰۴",
        location: "سالن همایش — طبقه ۳",
        date: "۱۴۰۴/۰۶/۰۵",
        time: "۱۰:۰۰",
        assigner: "کارشناس سازمان",
        status: "upcoming",
        description:
            "حضور الزامی است. پس از حضور، امکان پرداخت حق دوره فعال می‌شود.",
    },
    {
        id: 2,
        title: "جلسه توجیهی — آیین‌نامه و مقررات",
        location: "سالن جلسات — طبقه ۲",
        date: "۱۴۰۴/۰۴/۱۸",
        time: "۱۴:۰۰",
        assigner: "کارشناس سازمان",
        status: "registered",
        description: "حضور ثبت شد. امکان پرداخت فعال است.",
    },
]

const statusConfig: Record<Status, { label: string; className: string }> = {
    upcoming: {
        label: "در پیش‌رو",
        className: "bg-amber-100 border-amber-300 text-amber-800",
    },
    registered: {
        label: "حضور ثبت شد",
        className: "bg-emerald-100 border-emerald-300 text-emerald-900",
    },
}

function Briefing() {
    return (
        <div
            className="w-full flex flex-col gap-5 px-5 p-2 items-center justify-center"
        >
            <div className="w-full rounded-xl border-r-4 border-input-500 bg-blue-50 px-5 py-2 text-xs leading-6 text-input-900">
                جلسات توجیهی توسط کارشناس سازمان نظام مهندسی برای شما تعیین
                می‌شود. پس از حضور در جلسه، امکان پرداخت حق دوره برای شما فعال
                می‌گردد.
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                {sessions.map((session) => {
                    const status = statusConfig[session.status]

                    return (
                        <div
                            key={session.id}
                            className="flex flex-col gap-3.5 rounded-2xl border border-gray-200 bg-white px-5 py-9 shadow-sm"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11  items-center justify-center rounded-xl bg-indigo-50 text-blue-800">
                                        <Presentation
                                            size={20}
                                            strokeWidth={2}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <h3 className="text-s font-bold leading-6 text-slate-900">
                                            {session.title}
                                        </h3>
                                        <span className="text-2xs text-slate-500">
                                            {session.location}
                                        </span>
                                    </div>
                                </div>

                                <span
                                    className={` rounded-full border px-2 py-0.5 text-2xs font-medium ${status.className}`}
                                >
                                    {status.label}
                                </span>
                            </div>

                            <div className="mt-1 flex items-center justify-between text-slate-500">
                                <span className="text-xs">
                                    {session.date} — {session.time}
                                </span>
                                <span className="text-3xs">
                                    تعیین‌کننده: {session.assigner}
                                </span>
                            </div>

                            <div className="rounded-xl bg-neutral-50 px-4 py-2 text-2xs leading-6 text-slate-700">
                                {session.description}
                            </div>

                            {session.status === "upcoming" && (

                                <Button
                                    leftIcon={
                                        <CheckCircle2 size={18} strokeWidth={1.75} />
                                    }
                                    size="xs"
                                    variant="solid"
                                    type="button"
                                    className={cn("flex w-full items-center justify-center gap-2 h-8.75 rounded-xl border border-gray-200 bg-amber-50/40  text-nowrap text-xs font-bold text-neutral-900 transition-colors active:text-neutral-950 active:bg-teal-50 hover:text-neutral-950 hover:bg-teal-50")}
                                >
                                    ثبت حضور
                                </Button>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Briefing