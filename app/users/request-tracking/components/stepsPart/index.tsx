import React from "react";
import {
    UserPlus,
    CircleCheck,
    Wallet,
    UserRoundCheck,
    Send,
    Newspaper,
    Check,
    ArrowLeft,
} from "lucide-react";

type StepStatus = "done" | "current" | "pending";

interface Step {
    id: number;
    title: string;
    status: StepStatus;
    icon: React.ElementType;
}

interface StepsPartProps {
    step: number;
    requestCode?: string;
    registeredAt?: string;
}

// ProgressOrderEnum
const STEP = {
    Registration: 0,
    PaidPrice: 10,
    SupervisorSelect: 20,
    SendRequestToSupervisor: 30,
    ConfirmedBySupervisor: 40,
    ConfirmedByOrganization: 50,
    Finished: 60,
} as const;

const toPersianDigit = (n: number | string) =>
    n.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

const cardStyle: Record<StepStatus, string> = {
    done: "bg-emerald-50 border-emerald-200",
    current: "bg-indigo-50 border-2 border-input-800 shadow-sm",
    pending: "bg-neutral-50 border-neutral-200",
};

const statusText: Record<StepStatus, { label: string; className: string }> = {
    done: { label: "انجام شد ✓", className: "text-emerald-700" },
    current: { label: "مرحله فعلی", className: "text-input-800" },
    pending: { label: "در انتظار", className: "text-neutral-500" },
};

// تعریف مراحل — doneAt = مرحله بعدی (وقتی step به اون رسید، این مرحله done می‌شه)
const stepDefinitions = [
    {
        id: 1,
        title: "ثبت‌نام در سامانه",
        icon: UserPlus,
        doneAt: STEP.PaidPrice,          // 10
        currentAt: STEP.Registration,    // 0
    },
    {
        id: 2,
        title: "پرداخت حق دوره",
        icon: Wallet,
        doneAt: STEP.SupervisorSelect,   // 20
        currentAt: STEP.PaidPrice,       // 10
    },
    {
        id: 3,
        title: "انتخاب سرپرست کارآموزی",
        icon: UserRoundCheck,
        doneAt: STEP.SendRequestToSupervisor, // 30
        currentAt: STEP.SupervisorSelect,     // 20
    },
    {
        id: 4,
        title: "ارسال درخواست به سرپرست",
        icon: Send,
        doneAt: STEP.ConfirmedBySupervisor,      // 40
        currentAt: STEP.SendRequestToSupervisor, // 30
    },
    {
        id: 5,
        title: "تأیید سرپرست و ارسال به سازمان",
        icon: CircleCheck,
        doneAt: STEP.ConfirmedByOrganization, // 50
        currentAt: STEP.ConfirmedBySupervisor, // 40
    },
    {
        id: 6,
        title: "تأیید سازمان و آغاز کارآموزی",
        icon: Newspaper,
        doneAt: STEP.Finished,                   // 60
        currentAt: STEP.ConfirmedByOrganization, // 50
    },
];

/**
 * محاسبه وضعیت هر مرحله:
 * - step >= doneAt    → done
 * - step >= currentAt → current
 * - وگرنه             → pending
 */
function computeStatus(
    step: number,
    def: (typeof stepDefinitions)[number],
): StepStatus {
    if (step >= def.doneAt) return "done";
    if (step >= def.currentAt) return "current";
    return "pending";
}

function StepCircle({ status, id }: { status: StepStatus; id: number }) {
    if (status === "done") {
        return (
            <div className="size-7 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                <Check className="size-4 text-white" strokeWidth={3} />
            </div>
        );
    }
    if (status === "current") {
        return (
            <div className="size-7 rounded-full bg-input-800 flex items-center justify-center shrink-0">
                <span className="text-2xs font-bold text-white">{toPersianDigit(id)}</span>
            </div>
        );
    }
    return (
        <div className="size-7 rounded-full bg-neutral-300 flex items-center justify-center shrink-0">
            <span className="text-2xs font-bold text-white">{toPersianDigit(id)}</span>
        </div>
    );
}

export default function StepsPart({
    step,
    requestCode = "",
    registeredAt = "",
}: StepsPartProps) {
    const steps: Step[] = stepDefinitions.map((def) => ({
        id: def.id,
        title: def.title,
        icon: def.icon,
        status: computeStatus(step, def),
    }));

    const doneCount = steps.filter((s) => s.status === "done").length;
    const percent = (doneCount / steps.length) * 100;

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
                        {requestCode && (
                            <>
                                کد درخواست:{" "}
                                <span dir="ltr">{requestCode}</span>
                                {registeredAt && " — "}
                            </>
                        )}
                        {registeredAt && (
                            <>
                                تاریخ ثبت:{" "}
                                <span dir="ltr">{toPersianDigit(registeredAt)}</span>
                            </>
                        )}
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
                <div className="flex flex-row items-center min-w-full justify-between">
                    {steps.map((stepItem, index) => {
                        const Icon = stepItem.icon;
                        const isLast = index === steps.length - 1;
                        const status = statusText[stepItem.status];

                        return (
                            <React.Fragment key={stepItem.id}>
                                <div
                                    aria-current={
                                        stepItem.status === "current" ? "step" : undefined
                                    }
                                    className={`w-38 text-nowrap rounded-xl border px-3 py-3 flex flex-col items-center text-center gap-2 ${cardStyle[stepItem.status]}`}
                                >
                                    <StepCircle status={stepItem.status} id={stepItem.id} />
                                    <Icon
                                        className="size-4 text-neutral-600"
                                        strokeWidth={1.75}
                                    />
                                    <h2 className="text-3xs font-bold text-neutral-900 leading-5">
                                        {stepItem.title}
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
                        );
                    })}
                </div>
            </div>
        </section>
    );
}