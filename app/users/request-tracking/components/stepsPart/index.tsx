import React from 'react'
import {
    UserPlus,
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
        title: 'فعال‌سازی پرداخت',
        description: 'امکان پرداخت حق دوره برای شما فعال شد.',
        status: 'done',
        icon: Wallet,
    },
    {
        id: 3,
        title: 'پرداخت حق دوره',
        description: 'حق دوره با موفقیت پرداخت شد — ۱,۵۰۰,۰۰۰ تومان.',
        status: 'done',
        icon: CircleCheck,
    },
    {
        id: 4,
        title: 'انتخاب سرپرست کارآموزی',
        description: 'پروفایل سرپرستان را مشاهده و سرپرست موردنظر را انتخاب کنید.',
        status: 'current',
        icon: UserRoundCheck,
    },
    {
        id: 5,
        title: 'ارسال درخواست به سرپرست',
        description: 'درخواست شما به سرپرست انتخاب‌شده ارسال خواهد شد. منتظر تأیید سرپرست.',
        status: 'pending',
        icon: Send,
    },
    {
        id: 6,
        title: 'تأیید سرپرست و ارسال به سازمان',
        description: 'پس از تأیید سرپرست، درخواست نهایی به همراه اطلاعات شما و سرپرست به سازمان ارسال می‌شود.',
        status: 'pending',
        icon: CircleCheck,
    },
    {
        id: 7,
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
            <div className="size-7 rounded-full bg-emerald-500 flex items-center justify-center relative z-10 shrink-0">
                <span className="size-3 rounded-full border-[1.5px] border-white flex items-center justify-center">
                    <Check className="size-3 text-white" strokeWidth={3} />
                </span>
            </div>
        )
    }

    if (status === 'current') {
        return (
            <div className="size-7 rounded-full bg-input-800 ring-4 ring-indigo-100 flex items-center justify-center relative z-10 shrink-0">
                <span className="text-2xs font-bold text-white">{toPersianDigit(id)}</span>
            </div>
        )
    }

    return (
        <div className="size-7 rounded-full bg-neutral-300 flex items-center justify-center relative z-10 shrink-0">
            <span className="text-3xs font-bold text-white">{toPersianDigit(id)}</span>
        </div>
    )
}

function StepsPart() {
    return (
        <div className="w-full" dir="rtl">
            <h1 className="text-s font-bold text-neutral-900 mb-4">
                فرایند تأیید درخواست کارآموزی
            </h1>

            <div className="w-full overflow-x-auto pb-3">
                <div className="flex flex-row w-max min-w-full">
                    {steps.map((step, index) => {
                        const Icon = step.icon
                        const isFirst = index === 0
                        const isLast = index === steps.length - 1
                        const prevDone = !isFirst && steps[index - 1].status === 'done'
                        const thisDone = step.status === 'done'

                        return (
                            <div
                                key={step.id}
                                className="w-48 shrink-0 flex flex-col items-center text-center"
                            >
                                <div className="w-full flex items-center">
                                    <div
                                        className={`h-0.5 flex-1 ${
                                            isFirst
                                                ? 'bg-transparent'
                                                : prevDone
                                                  ? 'bg-emerald-500'
                                                  : 'bg-indigo-200'
                                        }`}
                                    />
                                    <StepCircle status={step.status} id={step.id} />
                                    <div
                                        className={`h-0.5 flex-1 ${
                                            isLast
                                                ? 'bg-transparent'
                                                : thisDone
                                                  ? 'bg-emerald-500'
                                                  : 'bg-indigo-200'
                                        }`}
                                    />
                                </div>

                                <div className="flex flex-col items-center gap-2 mt-3 px-2">
                                    <Icon className="size-4 text-neutral-800" strokeWidth={1.75} />
                                    <h2 className="text-s font-semibold text-neutral-900">
                                        {step.title}
                                    </h2>
                                    <span
                                        className={`text-3xs h-6 px-2 rounded-full border flex items-center justify-center ${badgeStyle[step.status]}`}
                                    >
                                        {badgeText[step.status]}
                                    </span>
                                    <p className="text-neutral-600 text-2xs">{step.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default StepsPart