"use client";

import Table from "@/app/components/ui/Table";

const toFa = (v: string | number) =>
    String(v).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

type ReportStatus = "approved" | "pending" | "rejected" | "archived";

interface Report {
    period: string;
    periodShort: string;
    supervisor: string;
    supervisorShort: string;
    hours: number;
    date: string;
    dateShort: string;
    status: ReportStatus;
    _rowClassName?: string;
}

const reports: Report[] = [
    { period: "برج مسکونی پارسیان", periodShort: "برج پارسیان", supervisor: "مهندس رضایی", supervisorShort: "م. رضایی", hours: 4, date: "۱۴۰۴/۰۵/۰۴", dateShort: "۰۵/۰۴", status: "approved", _rowClassName: "bg-white" },
    { period: "مجتمع تجاری کیان", periodShort: "مجتمع کیان", supervisor: "مهندس کریمی", supervisorShort: "م. کریمی", hours: 6, date: "۱۴۰۴/۰۴/۲۶", dateShort: "۰۴/۲۶", status: "approved", _rowClassName: "bg-white" },
    { period: "بیمارستان مهر", periodShort: "بیمارستان مهر", supervisor: "مهندس موسوی", supervisorShort: "م. موسوی", hours: 5, date: "۱۴۰۴/۰۴/۱۲", dateShort: "۰۴/۱۲", status: "pending", _rowClassName: "bg-white" },
    { period: "مدرسه شهید بهشتی", periodShort: "مدرسه بهشتی", supervisor: "مهندس رضایی", supervisorShort: "م. رضایی", hours: 3, date: "۱۴۰۴/۰۳/۲۰", dateShort: "۰۳/۲۰", status: "approved", _rowClassName: "bg-white" },
    { period: "ویلا مسکونی – نیاوران", periodShort: "ویلا نیاوران", supervisor: "مهندس احمدی", supervisorShort: "م. احمدی", hours: 4, date: "۱۴۰۴/۰۳/۰۸", dateShort: "۰۳/۰۸", status: "archived", _rowClassName: "bg-white" },
];

const statusMap: Record<ReportStatus, { label: string; short: string; className: string }> = {
    approved: { label: "تأیید شده", short: "تأیید", className: "border-green-400 bg-green-100 text-green-900" },
    pending: { label: "در انتظار", short: "انتظار", className: "border-amber-300 bg-amber-100 text-amber-900" },
    rejected: { label: "رد شده", short: "رد", className: "border-red-200 bg-red-100 text-red-700" },
    archived: { label: "آرشیو", short: "آرشیو", className: "border-gray-300 bg-gray-100 text-gray-700" },
};

const TH = "text-[10px] sm:text-[11px] lg:text-xs font-semibold text-black px-1 sm:px-2 lg:px-3";
const TD = "text-[10px] sm:text-[11px] lg:text-xs text-neutral-950 px-1 sm:px-2 lg:px-3";

const tableCol = [
    {
        key: "period",
        label: "پروژه",
        width: "w-[30%]",
        thClassName: TH,
        className: `${TD} font-semibold whitespace-nowrap`,
        render: (row: Report) => (
            <>
                <span className="lg:hidden">{toFa(row.periodShort)}</span>
                <span className="hidden lg:inline">{toFa(row.period)}</span>
            </>
        ),
    },
    {
        key: "supervisor",
        label: "سرپرست",
        width: "w-[20%]",
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
        key: "date",
        label: "تاریخ",
        width: "w-[18%]",
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
        key: "hours",
        label: "مدت",
        width: "w-[14%]",
        thClassName: TH,
        className: `${TD} whitespace-nowrap`,
        render: (row: Report) => (
            <>
                <span className="lg:hidden">{toFa(row.hours)}</span>
                <span className="hidden lg:inline">{`${toFa(row.hours)} ساعت`}</span>
            </>
        ),
    },
    {
        key: "status",
        label: "وضعیت",
        width: "w-[18%]",
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

function VisitTable() {
    return (
        <div
            dir="rtl"
            className="w-full rounded-2xl border border-neutral-200 bg-white px-3 pt-5 pb-4 shadow-sm sm:px-4 lg:px-6 lg:pt-7 lg:pb-5"
        >
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

export default VisitTable;