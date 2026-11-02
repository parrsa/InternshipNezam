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
    supervisorShort: string;
    hours: number;
    date: string;
    dateShort: string;
    status: ReportStatus;
    _rowClassName?: string;
}

const reports: Report[] = [
    { period: "مرداد 1404", supervisor: "مهندس رضایی", supervisorShort: "م. رضایی", hours: 168, date: "1404/05/01", dateShort: "۰۵/۰۱", status: "approved", _rowClassName: "bg-white" },
    { period: "تیر 1404", supervisor: "مهندس رضایی", supervisorShort: "م. رضایی", hours: 152, date: "1404/04/01", dateShort: "۰۴/۰۱", status: "approved", _rowClassName: "bg-white" },
    { period: "خرداد 1404", supervisor: "مهندس رضایی", supervisorShort: "م. رضایی", hours: 96, date: "1404/03/01", dateShort: "۰۳/۰۱", status: "pending", _rowClassName: "bg-white" },
    { period: "اردیبهشت 1404", supervisor: "مهندس رضایی", supervisorShort: "م. رضایی", hours: 0, date: "1404/02/01", dateShort: "۰۲/۰۱", status: "rejected", _rowClassName: "bg-white" },
];

const statusMap: Record<ReportStatus, { label: string; short: string; className: string }> = {
    approved: { label: "تأیید شده", short: "تأیید", className: "border-green-400 bg-green-100 text-green-900" },
    pending: { label: "در انتظار", short: "انتظار", className: "border-amber-300 bg-amber-100 text-amber-900" },
    rejected: { label: "رد شده", short: "رد", className: "border-red-200 bg-red-100 text-red-700" },
};

const TH = "text-[10px] sm:text-[11px] lg:text-xs font-semibold text-black px-1 sm:px-2 lg:px-3";
const TD = "text-[10px] sm:text-[11px] lg:text-xs text-neutral-900 px-1 sm:px-2 lg:px-3";

const tableCol = [
    {
        key: "period",
        label: "دوره",
        width: "w-[24%] lg:w-[22%]",
        thClassName: TH,
        className: `${TD} font-medium whitespace-nowrap`,
        render: (row: Report) => toFa(row.period),
    },
    {
        key: "supervisor",
        label: "سرپرست",
        width: "w-[24%] lg:w-[22%]",
        thClassName: TH,
        className: `${TD} whitespace-nowrap`,
        render: (row: Report) => (
            <>
                <span className="lg:hidden">{row.supervisorShort}</span>
                <span className="hidden lg:inline">{row.supervisor}</span>
            </>
        ),
    },
    {
        key: "hours",
        label: "ساعت",
        width: "w-[12%] lg:w-[14%]",
        thClassName: TH,
        className: `${TD} whitespace-nowrap`,
        render: (row: Report) => toFa(row.hours),
    },
    {
        key: "date",
        label: "تاریخ",
        width: "w-[22%] lg:w-[22%]",
        thClassName: TH,
        className: `${TD} whitespace-nowrap`,
        render: (row: Report) => (
            <>
                <span className="lg:hidden">{toFa(row.dateShort)}</span>
                <span className="hidden lg:inline">{toFa(row.date)}</span>
            </>
        ),
    },
    {
        key: "status",
        label: "وضعیت",
        width: "w-[18%] lg:w-[20%]",
        thClassName: TH,
        className: "",
        render: (row: Report) => {
            const s = statusMap[row.status];
            return (
                <span
                    className={`inline-flex items-center whitespace-nowrap rounded-full border px-1.5 sm:px-2 lg:px-2.5 py-0.5 text-[9px] sm:text-[10px] lg:text-2xs font-medium leading-4 ${s.className}`}
                >
                    <span className="lg:hidden">{s.short}</span>
                    <span className="hidden lg:inline">{s.label}</span>
                </span>
            );
        },
    },
];

function MonthlyTable() {
    return (
        <div
            dir="rtl"
            className="w-full rounded-2xl border border-neutral-200 bg-white px-3 pt-5 pb-4 shadow-sm sm:px-4 lg:px-6 lg:pt-7 lg:pb-5"
        >
            <div className="mb-6 flex items-center justify-between lg:mb-10">
                <h3 className="text-s font-bold text-neutral-900">گزارش‌های ماهانه</h3>

                <Button
                    variant="solid"
                    color="input"
                    rounded="lg"
                    leftIcon={<Plus size={19} />}
                    textSize="xs"
                    className={cn("h-9 py-0")}
                >
                    <p>گزارش جدید</p>
                </Button>
            </div>

            <div className="w-full overflow-x-auto">
                <Table
                    tableRow={reports}
                    tableCol={tableCol}
                    minHeight="auto"
                    HeaderPY="py-2"
                    fixed
                />
            </div>
        </div>
    );
}

export default MonthlyTable;