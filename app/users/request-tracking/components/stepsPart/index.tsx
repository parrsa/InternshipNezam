import React from 'react'
import {
    UserPlus,
    Presentation,
    CircleCheck,
    Wallet,
    UserRoundCheck,
    Send,
    Newspaper,
    Check,
} from 'lucide-react'

type StepStatus = 'done' | 'current' | 'pending'

interface Step {
    id: number
    title: string
    description: string
    status: StepStatus
    icon: React.ElementType
}

const steps: Step[] = [
    {
        id: 1,
        title: 'ثبت‌نام در سامانه',
        description: 'اطلاعات هویتی و تحصیلی شما در سامانه ثبت شد.',
        status: 'done',
        icon: UserPlus,
    },
    {
        id: 2,
        title: 'تعیین جلسه توجیحی',
        description: 'کارشناس سازمان جلسه توجیحی نیمسال پاییز ۱۴۰۴ را برای شما تعیین کرد.',
        status: 'done',
        icon: Presentation,
    },
    {
        id: 3,
        title: 'حضور در جلسه توجیحی',
        description: 'حضور شما در جلسه توجیحی ۱۴۰۴/۰۴/۱۸ توسط کارشناس سازمان ثبت شد.',
        status: 'done',
        icon: CircleCheck,
    },
    {
        id: 4,
        title: 'فعال‌سازی پرداخت',
        description: 'پس از حضور در جلسه، امکان پرداخت حق دوره برای شما فعال شد.',
        status: 'done',
        icon: Wallet,
    },
    {
        id: 5,
        title: 'پرداخت حق دوره',
        description: 'حق دوره با موفقیت پرداخت شد — ۱,۵۰۰,۰۰۰ تومان.',
        status: 'done',
        icon: CircleCheck,
    },
    {
        id: 6,
        title: 'انتخاب سرپرست کارآموزی',
        description: 'پروفایل سرپرستان را مشاهده و سرپرست موردنظر را انتخاب کنید.',
        status: 'current',
        icon: UserRoundCheck,
    },
    {
        id: 7,
        title: 'ارسال درخواست به سرپرست',
        description: 'درخواست شما به سرپرست انتخاب‌شده ارسال خواهد شد. منتظر تأیید سرپرست.',
        status: 'pending',
        icon: Send,
    },
    {
        id: 8,
        title: 'تأیید سرپرست و ارسال به سازمان',
        description: 'پس از تأیید سرپرست، درخواست نهایی به همراه اطلاعات شما و سرپرست به سازمان ارسال می‌شود.',
        status: 'pending',
        icon: CircleCheck,
    },
    {
        id: 9,
        title: 'تأیید سازمان و آغاز کارآموزی',
        description: 'سازمان درخواست را نهایی تأیید می‌کند و فرایند کارآموزی آغاز می‌شود.',
        status: 'pending',
        icon: Newspaper,
    },
]

const badgeText: Record<StepStatus, string> = {
    done: 'انجام شد',
    current: 'مرحله فعلی',
    pending: 'در انتظار',
}

const badgeStyle: Record<StepStatus, string> = {
    done: 'bg-emerald-100 border-emerald-600 text-emerald-900',
    current: 'bg-amber-100 border-amber-600 text-amber-900',
    pending: 'bg-neutral-100 border-neutral-400 text-neutral-800',
}

const toPersianDigit = (n: number) =>
    n.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])

function StepCircle({ status, id }: { status: StepStatus; id: number }) {
    if (status === 'done') {
        return (
            <div className="size-7 rounded-full bg-emerald-500 flex items-center justify-center relative z-10">
                <span className="size-3 rounded-full border-[1.5px] border-white flex items-center justify-center">
                    <Check className="size-3 text-white" strokeWidth={3} />
                </span>
            </div>
        )
    }

    if (status === 'current') {
        return (
            <div className="size-7  rounded-full bg-input-800 ring-4 ring-indigo-100 flex items-center justify-center relative z-10">
                <span className="text-2xs font-bold text-white">{toPersianDigit(id)}</span>
            </div>
        )
    }

    return (
        <div className="size-7 rounded-full bg-neutral-300 flex items-center justify-center relative z-10">
            <span className="text-3xs font-bold text-white">{toPersianDigit(id)}</span>
        </div>
    )
}

function StepsPart() {
    return (
        <div className="w-full relative flex flex-col gap-5.5 mt-5 mb-5">

            <div className="absolute right-1.25 top-0 bottom-0 w-0.5 bg-indigo-200" />

            {steps.map((step) => {
                const Icon = step.icon
                return (
                    <div key={step.id} className="w-full flex items-start gap-1">
                        <StepCircle status={step.status} id={step.id} />

                        <div className="flex flex-col gap-1 pt-0.5">
                            <div className="flex items-center gap-2">
                                <Icon className="size-4 text-neutral-800" strokeWidth={1.75} />
                                <h2 className="text-s font-semibold text-neutral-900">
                                    {step.title}
                                </h2>
                                <span
                                    className={`text-3xs h-6 px-2 rounded-full border flex items-center justify-center ${badgeStyle[step.status]}`}
                                >
                                    {badgeText[step.status]}
                                </span>
                            </div>
                            <p className="text-neutral-600 text-2xs">{step.description}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default StepsPart