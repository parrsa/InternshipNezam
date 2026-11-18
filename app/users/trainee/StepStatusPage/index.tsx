"use client";

import {
    CheckCircle2,
    Clock,
    CreditCard,
    UserCheck,
    Send,
    Building2,
    Flag,
    LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

const STEP = {
    Registration: 0,
    PaidPrice: 10,
    SupervisorSelect: 20,
    SendRequestToSupervisor: 30,
    ConfirmedBySupervisor: 40,
    ConfirmedByOrganization: 50,
    Finished: 60,
} as const;

type Props = {
    step: number;
    requestNo: string;
};

type StepInfo = {
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    iconColor: string;
};

function getStepInfo(step: number): StepInfo {
    if (step >= STEP.Finished) {
        return {
            title: "کارآموزی به پایان رسید",
            description: "دوره کارآموزی شما با موفقیت به پایان رسید.",
            icon: Flag,
            color: "bg-blue-50",
            iconColor: "text-blue-600",
        };
    }
    if (step >= STEP.ConfirmedByOrganization) {
        return {
            title: "تأیید سازمان — آغاز کارآموزی",
            description: "درخواست شما توسط سازمان تأیید شد و کارآموزی آغاز شده است.",
            icon: Building2,
            color: "bg-blue-50",
            iconColor: "text-blue-600",
        };
    }
    if (step >= STEP.ConfirmedBySupervisor) {
        return {
            title: "تأیید سرپرست — ارسال به سازمان",
            description: "سرپرست شما درخواست را تأیید کرد و برای سازمان ارسال شد.",
            icon: CheckCircle2,
            color: "bg-green-50",
            iconColor: "text-green-600",
        };
    }
    if (step >= STEP.SendRequestToSupervisor) {
        return {
            title: "درخواست به سرپرست ارسال شد",
            description: "در انتظار تأیید سرپرست کارآموزی هستید.",
            icon: Send,
            color: "bg-yellow-50",
            iconColor: "text-yellow-600",
        };
    }
    if (step >= STEP.SupervisorSelect) {
        return {
            title: "در انتظار انتخاب سرپرست",
            description: "پرداخت شما انجام شد. لطفاً سرپرست کارآموزی خود را انتخاب کنید.",
            icon: UserCheck,
            color: "bg-orange-50",
            iconColor: "text-orange-600",
        };
    }
    // step === 10 → در انتظار پرداخت
    return {
        title: "در انتظار پرداخت",
        description:
            "ثبت‌نام شما انجام شد. برای ادامه فرآیند، هزینه دوره کارآموزی را پرداخت کنید.",
        icon: CreditCard,
        color: "bg-purple-50",
        iconColor: "text-purple-600",
    };
}

type RowStatus = "done" | "current" | "pending";

type StepDef = {
    label: string;
    doneAt: number;      // step >= doneAt → done
    currentAt: number;   // step === currentAt (یا >= currentAt و < doneAt) → current
    icon: LucideIcon;
};

const stepDefs: StepDef[] = [
    {
        label: "ثبت‌نام در سامانه",
        doneAt: STEP.PaidPrice, // step >= 10 → done
        currentAt: STEP.Registration, // step === 0 → current
        icon: CheckCircle2,
    },
    {
        label: "پرداخت حق دوره",
        doneAt: STEP.SupervisorSelect, // step >= 20 → done
        currentAt: STEP.PaidPrice, // step === 10 → current
        icon: CreditCard,
    },
    {
        label: "انتخاب سرپرست کارآموزی",
        doneAt: STEP.SendRequestToSupervisor,
        currentAt: STEP.SupervisorSelect,
        icon: UserCheck,
    },
    {
        label: "ارسال درخواست به سرپرست",
        doneAt: STEP.ConfirmedBySupervisor,
        currentAt: STEP.SendRequestToSupervisor,
        icon: Send,
    },
    {
        label: "تأیید سرپرست و ارسال به سازمان",
        doneAt: STEP.ConfirmedByOrganization,
        currentAt: STEP.ConfirmedBySupervisor,
        icon: CheckCircle2,
    },
    {
        label: "تأیید سازمان و آغاز کارآموزی",
        doneAt: STEP.Finished,
        currentAt: STEP.ConfirmedByOrganization,
        icon: Building2,
    },
    {
        label: "پایان کارآموزی",
        doneAt: STEP.Finished + 1, // step >= 60 → done (60 خودش current و هم done؟)
        currentAt: STEP.Finished,
        icon: Flag,
    },
];

function getStatus(step: number, def: StepDef): RowStatus {
    // مرحله آخر: step === 60 → current (نه done)
    if (def.currentAt === STEP.Finished && step === STEP.Finished) {
        return "current";
    }
    if (step >= def.doneAt) return "done";
    if (step >= def.currentAt) return "current";
    return "pending";
}

export default function StepStatusPage({ step, requestNo }: Props) {
    const info = getStepInfo(step);
    const Icon = info.icon;

    const rows = stepDefs.map((def) => ({
        ...def,
        status: getStatus(step, def),
    }));

    const doneCount = rows.filter((r) => r.status === "done").length;
    const percent = (doneCount / rows.length) * 100;

    return (
        <div
            dir="rtl"
            className="flex w-full items-center justify-center px-5 py-10"
        >
            <div className="w-full max-w-2xl rounded-2xl border-2 border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                {/* ── Header ── */}
                <div className="mb-6 flex flex-col items-center text-center">
                    <div
                        className={cn(
                            "mb-4 flex h-16 w-16 items-center justify-center rounded-full",
                            info.color,
                        )}
                    >
                        <Icon className={cn("h-9 w-9", info.iconColor)} />
                    </div>

                    <h1 className="mb-2 text-base font-bold text-neutral-900">
                        {info.title}
                    </h1>
                    <p className="text-xs text-neutral-500 leading-6 max-w-md">
                        {info.description}
                    </p>
                </div>

                {/* ── شماره درخواست ── */}
                {requestNo && (
                    <div className="mb-6 flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                        <span className="text-2xs text-neutral-500">
                            شماره درخواست
                        </span>
                        <span
                            className="text-xs font-semibold text-neutral-900 font-mono"
                            dir="ltr"
                        >
                            {requestNo}
                        </span>
                    </div>
                )}

                {/* ── Progress bar ── */}
                <div className="mb-6">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-2xs font-semibold text-neutral-700">
                            پیشرفت مراحل
                        </span>
                        <span className="text-2xs text-neutral-500">
                            {doneCount} از {rows.length} مرحله
                        </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                        <div
                            className="h-full rounded-full bg-linear-to-l from-blue-500 to-blue-600 transition-all duration-500"
                            style={{ width: `${percent}%` }}
                        />
                    </div>
                </div>

                {/* ── Steps list ── */}
                <div className="space-y-1">
                    {rows.map((row, index) => (
                        <StepRow
                            key={row.label}
                            label={row.label}
                            status={row.status}
                            icon={row.icon}
                            isLast={index === rows.length - 1}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function StepRow({
    label,
    status,
    icon: Icon,
    isLast,
}: {
    label: string;
    status: RowStatus;
    icon: LucideIcon;
    isLast: boolean;
}) {
    const statusStyles = {
        done: {
            circle: "bg-green-500 border-green-500",
            icon: "text-white",
            label: "text-neutral-900 font-semibold",
            line: "bg-green-200",
        },
        current: {
            circle: "bg-blue-50 border-blue-500 ring-4 ring-blue-100",
            icon: "text-blue-600",
            label: "text-blue-700 font-bold",
            line: "bg-neutral-200",
        },
        pending: {
            circle: "bg-neutral-50 border-neutral-200",
            icon: "text-neutral-400",
            label: "text-neutral-400 font-medium",
            line: "bg-neutral-200",
        },
    }[status];

    const statusBadge =
        status === "current" ? (
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-2xs font-semibold text-blue-700">
                مرحله فعلی
            </span>
        ) : status === "done" ? (
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-2xs font-medium text-green-700">
                انجام شد
            </span>
        ) : null;

    return (
        <div className="flex items-start gap-3">
            {/* ── Circle + Line ── */}
            <div className="flex flex-col items-center">
                <div
                    className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                        statusStyles.circle,
                    )}
                >
                    {status === "done" ? (
                        <CheckCircle2 className="h-4 w-4" />
                    ) : (
                        <Icon className={cn("h-4 w-4", statusStyles.icon)} />
                    )}
                </div>
                {!isLast && (
                    <div className={cn("h-7 w-0.5 my-0.5", statusStyles.line)} />
                )}
            </div>

            {/* ── Label ── */}
            <div className="flex flex-1 items-center justify-between gap-2 pt-1.5">
                <span className={cn("text-xs", statusStyles.label)}>{label}</span>
                {statusBadge}
            </div>
        </div>
    );
}