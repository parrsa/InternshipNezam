"use client";

const toFa = (v: string | number) =>
    String(v).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

const stats = [
    { key: "pending", label: "در انتظار", value: 2 },
    { key: "approved", label: "تأیید شده", value: 9 },
    { key: "rejected", label: "رد شده", value: 1 },
];

function MonthlyCards() {
    return (
        <div dir="rtl" className="grid w-full grid-cols-3 gap-4 ">
            {stats.map((item) => (
                <div
                    key={item.key}
                    className="flex h-34 flex-col items-start justify-center rounded-2xl border-2 shadow-xs border-neutral-200 bg-white p-5 sm:p-6"
                >
                    <span className="text-2xs font-normal text-neutral-500">
                        {item.label}
                    </span>
                    <span className="mt-1 text-2xl font-bold leading-tight text-black">
                        {toFa(item.value)}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default MonthlyCards;