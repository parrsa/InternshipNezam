import React from 'react'
import {
    UserPlus,
    CircleCheck,
    Wallet,
    UserRoundCheck,
    Send,
    Newspaper,
    Check,
    ArrowLeft,
} from 'lucide-react'

type StepStatus = 'done' | 'current' | 'pending'

interface Step {
    id: number
    title: string
    status: StepStatus
    icon: React.ElementType
}

interface StepsPartProps {
    requestCode?: string
    registeredAt?: string
}

const steps: Step[] = [
    { id: 1, title: 'ثبت‌نام در سامانه', status: 'done', icon: UserPlus },
    { id: 2, title: 'پرداخت حق دوره', status: 'done', icon: Wallet },
    { id: 3, title: 'انتخاب سرپرست کارآموزی', status: 'current', icon: UserRoundCheck },
    { id: 4, title: 'ارسال درخواست به سرپرست', status: 'pending', icon: Send },
    { id: 5, title: 'تأیید سرپرست و ارسال به سازمان', status: 'pending', icon: CircleCheck },
    { id: 6, title: 'تأیید سازمان و آغاز کارآموزی', status: 'pending', icon: Newspaper },
]

const toPersianDigit = (n: number | string) =>
    n.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])

const cardStyle: Record<StepStatus, string> = {
    done: 'bg-emerald-50 border-emerald-200',
    current: 'bg-indigo-50 border-2 border-input-800 shadow-sm',
    pending: 'bg-neutral-50 border-neutral-200',
}

const statusText: Record<StepStatus, { label: string; className: string }> = {
    done: { label: 'انجام شد ✓', className: 'text-emerald-700' },
    current: { label: 'مرحله فعلی', className: 'text-input-800' },
    pending: { label: 'در انتظار', className: 'text-neutral-500' },
}

function StepCircle({ status, id }: { status: StepStatus; id: number }) {
    if (status === 'done') {
        return (
            <div className="size-7 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                <Check className="size-4 text-white" strokeWidth={3} />
            </div>
        )
    }

    if (status === 'current') {
        return (
            <div className="size-7 rounded-full bg-input-800 flex items-center justify-center shrink-0">
                <span className="text-2xs font-bold text-white">{toPersianDigit(id)}</span>
            </div>
        )
    }

    return (
        <div className="size-7 rounded-full bg-neutral-300 flex items-center justify-center shrink-0">
            <span className="text-2xs font-bold text-white">{toPersianDigit(id)}</span>
        </div>
    )
}

function StepsPart({
    requestCode = 'REQ-1404-9452',
    registeredAt = '1404/04/01',
}: StepsPartProps) {
    const doneCount = steps.filter((s) => s.status === 'done').length
    const percent = (doneCount / steps.length) * 100

    return (
        <section
            dir="rtl"
            className="w-full bg-white rounded-3xl border border-neutral-200 shadow-sm p-6 sm:p-7"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-s font-bold text-neutral-900">
                        فرایند تأیید درخواست کارآموزی
                    </h1>
                    <p className="text-2xs text-neutral-600">
                        کد درخواست: <span dir="ltr">{requestCode}</span> — تاریخ ثبت:{' '}
                        <span dir="ltr">{toPersianDigit(registeredAt)}</span>
                    </p>
                </div>

                <span className="shrink-0 h-7 px-3 rounded-full border border-sky-300 bg-sky-100 text-sky-900 text-2xs flex items-center">
                    {toPersianDigit(doneCount)} از {toPersianDigit(steps.length)} مرحله
                </span>
            </div>

            <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={steps.length}
                aria-valuenow={doneCount}
                className="mt-6 h-2 w-full rounded-full bg-indigo-100 overflow-hidden"
            >
                <div
                    className="h-full rounded-full bg-input-800 transition-all duration-500"
                    style={{ width: `${percent}%` }}
                />
            </div>

            <div className="mt-8 w-full overflow-x-auto pb-2">
                <div className="flex flex-row items-center w-max min-w-full justify-between">
                    {steps.map((step, index) => {
                        const Icon = step.icon
                        const isLast = index === steps.length - 1
                        const status = statusText[step.status]

                        return (
                            <React.Fragment key={step.id}>
                                <div
                                    aria-current={step.status === 'current' ? 'step' : undefined}
                                    className={`w-38 text-nowrap  rounded-xl border px-3 py-3 flex flex-col items-center text-center gap-2 ${cardStyle[step.status]}`}
                                >
                                    <StepCircle status={step.status} id={step.id} />
                                    <Icon
                                        className="size-4 text-neutral-600"
                                        strokeWidth={1.75}
                                    />
                                    <h2 className="text-3xs font-bold text-neutral-900 leading-5">
                                        {step.title}
                                    </h2>
                                    <span className={`text-3xs ${status.className}`}>
                                        {status.label}
                                    </span>
                                </div>

                                {!isLast && (
                                    <ArrowLeft
                                        className="size-5 text-neutral-300 shrink-0 mx-2"
                                        strokeWidth={1.5}
                                        aria-hidden
                                    />
                                )}
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default StepsPart