"use client";

import Table from "@/app/components/ui/Table";

const toFa = (v: string | number) =>
    String(v).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

const formatAmount = (n: number) =>
    toFa(n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

type TxType = "deduct" | "deposit";

interface Transaction {
    date: string;
    title: string;
    amount: number;
    type: TxType;
}

const transactions: Transaction[] = [
    { date: "1404/05/12", title: "پرداخت حق دوره — مقررات ملی", amount: 1500000, type: "deduct" },
    { date: "1404/04/28", title: "واریز کمک‌هزینه کارآموزی", amount: 3000000, type: "deposit" },
    { date: "1404/04/09", title: "پرداخت حق دوره — مدیریت پیمان", amount: 1200000, type: "deduct" },
    { date: "1404/03/22", title: "واریز کمک‌هزینه کارآموزی", amount: 3000000, type: "deposit" },
    { date: "1404/03/08", title: "هزینه صدور گواهی", amount: 200000, type: "deduct" },
];


const tableCol = [
    {
        key: "date",
        label: "تاریخ",
        width: "w-[22%] text-right",
        className: "text-right text-xs font-semibold text-neutral-900",
        render: (row: Transaction) => toFa(row.date),
    },
    {
        key: "title",
        label: "شرح",
        width: "w-[45%] text-right",
        className: "text-right  text-xs font-semibold text-neutral-800",
        render: (row: Transaction) => row.title,
    },
    {
        key: "amount",
        label: "مبلغ",
        width: "w-[21%] text-right",
        className: "text-right ",
        render: (row: Transaction) => {
            const isDeposit = row.type === "deposit";
            return (
                <span
                    dir="rtl"
                    className={`inline-flex items-center text-sm font-semibold ${isDeposit ? "text-emerald-600" : "text-rose-600"
                        }`}
                >
                    <span>{isDeposit ? "+" : "-"}</span>
                    <span>{formatAmount(row.amount)}</span>
                </span>
            );
        },
    },
    {
        key: "type",
        label: "نوع",
        width: "w-[12%] text-right",
        className: "text-right",
        render: (row: Transaction) =>
            row.type === "deposit" ? (
                <span className="inline-flex items-center rounded-full border border-green-300 bg-green-100 px-2 py-1  text-2xs  font-medium leading-4 text-green-800">
                    واریز
                </span>
            ) : (
                <span className="inline-flex items-center rounded-full border border-red-200 bg-red-100 px-2 py-1 text-2xs font-medium leading-4 text-red-700">
                    کسر
                </span>
            ),
    },
];

function RecentTransactions() {
    return (
        <div className="w-full rounded-2xl border border-neutral-200 bg-white px-7 pt-7 pb-5 mb-5 shadow-sm">
            <h3 className="mb-10 text-sm font-bold text-neutral-900">تراکنش‌های اخیر</h3>
            <div
                className="
          [&_thead]:border-neutral-200
          [&_th]:font-semibold [&_th]:text-xs [&_th]:text-black
          [&_tbody_tr]:bg-white!
          [&_tbody_tr:last-child]:border-b-0
          [&_td]:py-1.5 
        "
            >
                <Table
                    tableRow={transactions}
                    tableCol={tableCol}
                    minHeight="auto"
                    HeaderPY="py-4"
                />
            </div>
        </div>
    );
}

export default RecentTransactions;