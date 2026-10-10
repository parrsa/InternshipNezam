"use client";
import { useState } from "react";
import { cn } from "@/lib/cn";
import Table from "@/app/components/ui/Table";
import SessionFilters from "./components/sessionFilters";
import CardBriefing from "./components/cardBriefing";

type TabKey = "new" | "past";
type SessionStatus = "upcoming" | "held" | "archived";

interface Session {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    participants: string;
    status: SessionStatus;
}

const TABS: { key: TabKey; label: string }[] = [
    { key: "past", label: "ثبت حضور جلسات گذشته" },
    { key: "new", label: "برنامه‌ریزی جلسه جدید" },
];

const STATUS_CONFIG: Record<SessionStatus, { label: string; className: string }> = {
    upcoming: {
        label: "در پیش‌رو",
        className: "bg-orange-100 border-amber-300 text-amber-800",
    },
    held: {
        label: "برگزار شد",
        className: "bg-green-100 border-green-300 text-green-800",
    },
    archived: {
        label: "آرشیو",
        className: "bg-gray-100 border-gray-300 text-gray-700",
    },
};

const SESSIONS: Session[] = [
    {
        id: 1,
        title: "جلسه توجیحی نیمسال پاییز ۱۴۰۴",
        date: "۱۴۰۴/۰۶/۰۵",
        time: "۱۰:۰۰",
        location: "سالن همایش — طبقه ۳",
        participants: "نفر ۲۴",
        status: "upcoming",
    },
    {
        id: 2,
        title: "جلسه توجیحی — آیین‌نامه و مقررات",
        date: "۱۴۰۴/۰۴/۱۸",
        time: "۱۴:۰۰",
        location: "سالن جلسات — طبقه ۲",
        participants: "نفر ۱۸",
        status: "held",
    },
    {
        id: 3,
        title: "جلسه توجیحی نیمسال بهار ۱۴۰۴",
        date: "۱۴۰۴/۰۲/۰۵",
        time: "۱۰:۰۰",
        location: "سالن همایش",
        participants: "نفر ۲۸",
        status: "archived",
    },
];

const TH = "px-3 text-left text-s";
const TD = "px-3 py-2 text-left text-xs text-neutral-900";

const COLUMNS = [

    {
        key: "status",
        label: "وضعیت",
        width: "w-[11%]",
        thClassName: TH,
        className: TD,
        render: (row: Session) => {
            const { label, className } = STATUS_CONFIG[row.status];
            return (
                <span className={cn("inline-block rounded-full border px-2 py-0.5 text-2xs", className)}>
                    {label}
                </span>
            );
        },
    },
    { key: "participants", label: "شرکت‌کنندگان", width: "w-[14%]", thClassName: TH, className: cn(TD, "font-medium text-sm") },
    { key: "location", label: "محل", width: "w-[19.5%]", thClassName: TH, className: cn(TD, "font-medium text-sm") },
    { key: "time", label: "ساعت", width: "w-[8.5%]", thClassName: TH, className: cn(TD, "font-medium text-sm") },
    { key: "date", label: "تاریخ", width: "w-[15%]", thClassName: TH, className: cn(TD, "font-medium text-sm") },
    { key: "title", label: "عنوان جلسه", width: "w-[32%]", thClassName: TH, className: cn(TD, "font-bold") },
];

const TABLE_ROWS = SESSIONS.map((s) => ({ ...s, _rowClassName: "bg-white" }));

function BriefingSeason() {
    const [activeTab, setActiveTab] = useState<TabKey>("new");

    return (
        <div className="w-full flex flex-col gap-3 px-5 p-2 items-center justify-center">
            <div
                className="flex items-center justify-between gap-2 bg-[#e7eef098] p-1 rounded-xl w-full md:w-1/2 self-end"
            >
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.key;
                    return (
                        <button
                            key={tab.key}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => setActiveTab(tab.key)}
                            className={cn(
                                "flex-1 px-4 py-2  rounded-lg text-xs font-bold text-black transition-colors duration-300",
                                isActive && "bg-[#fffdf9] shadow-sm",
                            )}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {activeTab === "past" ? (
                <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="px-6 pt-6 text-left">
                        <h2 className="text-s font-bold text-gray-900">جلسات توجیحی برگزارشده</h2>
                        <p className="mt-3 text-2xs text-gray-600">ثبت حضور کارآموزان در جلسات گذشته.</p>
                    </div>
                    <div className="mt-8">
                        <Table
                            tableRow={TABLE_ROWS}
                            tableCol={COLUMNS}
                            fixed
                            HeaderPY="py-4"
                            minHeight="226px"
                        />
                    </div>
                </div>
            ) : (
                <div className="w-full flex flex-col gap-4">
                     <SessionFilters />
                     <CardBriefing/>
                    {/* <SessionForm /> */}
                    {/* <SessionPreview />  */}
                </div>
            )}
        </div>
    );
}

export default BriefingSeason;