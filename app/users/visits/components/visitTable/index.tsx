// "use client";

// import { Button } from "@/app/components/ui/Button";
// import Table from "@/app/components/ui/Table";
// import { cn } from "@/lib/cn";
// import { Plus } from "lucide-react";

// const toFa = (v: string | number) =>
//     String(v).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

// type ReportStatus = "approved" | "pending" | "rejected";

// interface Report {
//     period: string;
//     supervisor: string;
//     hours: number;
//     date: string;
//     status: ReportStatus;
//     _rowClassName?: string;
// }

// const reports: Report[] = [
//     { period: "مرداد 1404", supervisor: "مهندس رضایی", hours: 168, date: "1404/05/01", status: "approved", _rowClassName: "bg-white" },
//     { period: "تیر 1404", supervisor: "مهندس رضایی", hours: 152, date: "1404/04/01", status: "approved", _rowClassName: "bg-white" },
//     { period: "خرداد 1404", supervisor: "مهندس رضایی", hours: 96, date: "1404/03/01", status: "pending", _rowClassName: "bg-white" },
//     { period: "اردیبهشت 1404", supervisor: "مهندس رضایی", hours: 0, date: "1404/02/01", status: "rejected", _rowClassName: "bg-white" },
// ];

// const statusMap: Record<ReportStatus, { label: string; className: string }> = {
//     approved: { label: "تأیید شده", className: "border-green-400 bg-green-100 text-green-900" },
//     pending: { label: "در انتظار", className: "border-amber-300 bg-amber-100 text-amber-900" },
//     rejected: { label: "رد شده", className: "border-red-200 bg-red-100 text-red-700" },
// };

// const TH = "text-xs font-semibold text-black";
// const TD = "text-xs  text-neutral-900";

// const tableCol = [
//     {
//         key: "period",
//         label: "دوره",
//         width: "w-[22%]",
//         thClassName: TH,
//         className: `${TD} font-medium`,
//         render: (row: Report) => toFa(row.period),
//     },
//     {
//         key: "supervisor",
//         label: "سرپرست",
//         width: "w-[22%]",
//         thClassName: TH,
//         className: TD,
//         render: (row: Report) => row.supervisor,
//     },
//     {
//         key: "hours",
//         label: "ساعت",
//         width: "w-[14%]",
//         thClassName: TH,
//         className: TD,
//         render: (row: Report) => toFa(row.hours),
//     },
//     {
//         key: "date",
//         label: "تاریخ",
//         width: "w-[22%]",
//         thClassName: TH,
//         className: TD,
//         render: (row: Report) => toFa(row.date),
//     },
//     {
//         key: "status",
//         label: "وضعیت",
//         width: "w-[20%]",
//         thClassName: TH,
//         className: "",
//         render: (row: Report) => {
//             const s = statusMap[row.status];
//             return (
//                 <span
//                     className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-2xs font-medium leading-4 ${s.className}`}
//                 >
//                     {s.label}
//                 </span>
//             );
//         },
//     },
// ];

// function VisitTable() {
//     return (
//         <div
//             dir="rtl"
//             className="w-full rounded-2xl border border-neutral-200 bg-white px-6 pt-7 pb-5 shadow-sm"
//         >
        
//             <Table
//                 tableRow={reports}
//                 tableCol={tableCol}
//                 minHeight="auto"
//                 HeaderPY="py-2"
//                 fixed
//             />
//         </div>
//     );
// }

// export default VisitTable;


"use client";

import { Button } from "@/app/components/ui/Button";
import Table from "@/app/components/ui/Table";
import { cn } from "@/lib/cn";
import { Plus } from "lucide-react";

const toFa = (v: string | number) =>
    String(v).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

type ReportStatus = "approved" | "pending" | "rejected" | "archived";

interface Report {
    period: string;
    supervisor: string;
    hours: number;
    date: string;
    status: ReportStatus;
    _rowClassName?: string;
}

const reports: Report[] = [
    { period: "برج مسکونی پارسیان", supervisor: "مهندس رضایی", hours: 4, date: "۱۴۰۴/۰۵/۰۴", status: "approved", _rowClassName: "bg-white" },
    { period: "مجتمع تجاری کیان", supervisor: "مهندس کریمی", hours: 6, date: "۱۴۰۴/۰۴/۲۶", status: "approved", _rowClassName: "bg-white" },
    { period: "بیمارستان مهر", supervisor: "مهندس موسوی", hours: 5, date: "۱۴۰۴/۰۴/۱۲", status: "pending", _rowClassName: "bg-white" },
    { period: "مدرسه شهید بهشتی", supervisor: "مهندس رضایی", hours: 3, date: "۱۴۰۴/۰۳/۲۰", status: "approved", _rowClassName: "bg-white" },
    { period: "ویلا مسکونی – نیاوران", supervisor: "مهندس احمدی", hours: 4, date: "۱۴۰۴/۰۳/۰۸", status: "archived", _rowClassName: "bg-white" },
];

const statusMap: Record<ReportStatus, { label: string; className: string }> = {
    approved: { label: "تأیید شده", className: "border-green-400 bg-green-100 text-green-900" },
    pending: { label: "در انتظار", className: "border-amber-300 bg-amber-100 text-amber-900" },
    rejected: { label: "رد شده", className: "border-red-200 bg-red-100 text-red-700" },
    archived: { label: "آرشیو", className: "border-gray-300 bg-gray-100 text-gray-700" },
};

const TH = "text-xs font-semibold text-black";
const TD = "text-xs  text-neutral-950";

const tableCol = [
    {
        key: "period",
        label: "پروژه",
        width: "w-[30%]", 
        thClassName: TH,
        className: `${TD} font-semibold`,
        render: (row: Report) => toFa(row.period),
    },
    {
        key: "supervisor",
        label: "سرپرست",
        width: "w-[20%]",
        thClassName: TH,
        className: TD,
        render: (row: Report) => row.supervisor,
    },
    {
        key: "date",
        label: "تاریخ",
        width: "w-[18%]",
        thClassName: TH,
        className: TD,
        render: (row: Report) => toFa(row.date),
    },
    {
        key: "hours",
        label: "مدت",
        width: "w-[14%]",
        thClassName: TH,
        className: TD,
        render: (row: Report) => `${toFa(row.hours)} ساعت`,
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
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-2xs font-medium leading-4 ${s.className}`}
                >
                    {s.label}
                </span>
            );
        },
    },
];

function VisitTable() {
    return (
        <div
            dir="rtl"
            className="w-full rounded-2xl border border-neutral-200 bg-white px-6 pt-7 pb-5 shadow-sm"
        >
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

export default VisitTable;