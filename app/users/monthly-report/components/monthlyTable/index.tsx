"use client";

import { Button } from "@/app/components/ui/Button";
import Table from "@/app/components/ui/Table";
import { cn } from "@/lib/cn";
import { Plus } from "lucide-react";

const toFa = (v: string | number) =>
    String(v).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

type ReportStatus = "approved" | "pending" | "rejected";

interface Report {
    period: string;
    supervisor: string;
    hours: number;
    date: string;
    status: ReportStatus;
    _rowClassName?: string;
}

const reports: Report[] = [
    { period: "مرداد 1404", supervisor: "مهندس رضایی", hours: 168, date: "1404/05/01", status: "approved", _rowClassName: "bg-white" },
    { period: "تیر 1404", supervisor: "مهندس رضایی", hours: 152, date: "1404/04/01", status: "approved", _rowClassName: "bg-white" },
    { period: "خرداد 1404", supervisor: "مهندس رضایی", hours: 96, date: "1404/03/01", status: "pending", _rowClassName: "bg-white" },
    { period: "اردیبهشت 1404", supervisor: "مهندس رضایی", hours: 0, date: "1404/02/01", status: "rejected", _rowClassName: "bg-white" },
];

const statusMap: Record<ReportStatus, { label: string; className: string }> = {
    approved: { label: "تأیید شده", className: "border-green-400 bg-green-100 text-green-900" },
    pending: { label: "در انتظار", className: "border-amber-300 bg-amber-100 text-amber-900" },
    rejected: { label: "رد شده", className: "border-red-200 bg-red-100 text-red-700" },
};

const TH = "text-xs font-semibold text-black";
const TD = "text-xs  text-neutral-900";

const tableCol = [
    {
        key: "period",
        label: "دوره",
        width: "w-[22%]",
        thClassName: TH,
        className: `${TD} font-medium`,
        render: (row: Report) => toFa(row.period),
    },
    {
        key: "supervisor",
        label: "سرپرست",
        width: "w-[22%]",
        thClassName: TH,
        className: TD,
        render: (row: Report) => row.supervisor,
    },
    {
        key: "hours",
        label: "ساعت",
        width: "w-[14%]",
        thClassName: TH,
        className: TD,
        render: (row: Report) => toFa(row.hours),
    },
    {
        key: "date",
        label: "تاریخ",
        width: "w-[22%]",
        thClassName: TH,
        className: TD,
        render: (row: Report) => toFa(row.date),
    },
    {
        key: "status",
        label: "وضعیت",
        width: "w-[20%]",
        thClassName: TH,
        className: "",
        render: (row: Report) => {
            const s = statusMap[row.status];
            return (
                <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-2xs font-medium leading-4 ${s.className}`}
                >
                    {s.label}
                </span>
            );
        },
    },
];

function MonthlyTable() {
    return (
        <div
            dir="rtl"
            className="w-full rounded-2xl border border-neutral-200 bg-white px-6 pt-7 pb-5 shadow-sm"
        >
            <div className="mb-10 flex items-center justify-between">
                <h3 className="text-s font-bold text-neutral-900">گزارش‌های ماهانه</h3>

                <Button
                    variant="solid"
                    color="input"
                    rounded="lg"
                    leftIcon={<Plus size={19} />}
                    textSize="xs"
                    className={cn(
                        "h-9  py-0"
                    )}
                >
                    <p>گزارش جدید</p>
                </Button>

            </div>

            <Table
                tableRow={reports}
                tableCol={tableCol}
                minHeight="auto"
                HeaderPY="py-2"
                fixed
            />
        </div>
    );
}

export default MonthlyTable;