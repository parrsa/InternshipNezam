"use client";

import { useCallback, useMemo, useState } from "react";
import { Download } from "lucide-react";
import { cn } from "@/lib/cn";
import Table from "@/app/components/ui/Table";
import { Input } from "@/app/components/ui/input";

type TraineeStatus = "active" | "review" | "inactive";

interface Trainee {
    id: number;
    name: string;
    supervisor: string;
    course: string;
    hours: number;
    status: TraineeStatus;
}

const INITIAL_TRAINEES: Trainee[] = [
    { id: 1, name: "علی محمدی", supervisor: "مهندس رضایی", course: "مقررات ملی", hours: 168, status: "active" },
    { id: 2, name: "زهرا حسینی", supervisor: "مهندس احمدی", course: "مدیریت پیمان", hours: 152, status: "active" },
    { id: 3, name: "محمد رضایی", supervisor: "مهندس کریمی", course: "فولاد ساختمانی", hours: 96, status: "review" },
    { id: 4, name: "فاطمه کریمی", supervisor: "مهندس موسوی", course: "بتن مسلح", hours: 48, status: "review" },
    { id: 5, name: "حسین موسوی", supervisor: "مهندس رضایی", course: "مقررات ملی", hours: 180, status: "active" },
    { id: 6, name: "سحر احمدی", supervisor: "مهندس احمدی", course: "مدیریت پیمان", hours: 120, status: "inactive" },
];

const STATUS_BADGE: Record<TraineeStatus, { label: string; className: string }> = {
    active: { label: "فعال", className: "border-green-500 bg-primary-100 text-green-950" },
    review: { label: "نیازمند بررسی", className: "border-orange-300 bg-orange-100 text-orange-900" },
    inactive: { label: "غیرفعال", className: "border-red-500 bg-red-100 text-red-950" },
};

const CELL_CLASSES = {
    className: "px-2.5 py-2",
    thClassName: "px-2.5 text-s",
};

const hoursFormatter = new Intl.NumberFormat("fa-IR", { useGrouping: false });

const normalize = (value: string) =>
    value.replace(/ي/g, "ی").replace(/ك/g, "ک").toLowerCase();

const fade = (row: Trainee) =>
    cn("transition", row.status === "inactive" && "opacity-50");

function Trainees() {
    const [trainees, setTrainees] = useState<Trainee[]>(INITIAL_TRAINEES);
    const [query, setQuery] = useState("");

    const toggleStatus = useCallback((id: number) => {
        setTrainees((prev) =>
            prev.map((t) =>
                t.id === id
                    ? { ...t, status: t.status === "inactive" ? "active" : "inactive" }
                    : t,
            ),
        );
    }, []);

    const columns = useMemo(
        () => [
            {
                key: "name",
                label: "نام",
                width: "w-[24%]",
                ...CELL_CLASSES,
                render: (row: Trainee) => (
                    <div className={cn("flex items-center gap-3", fade(row))}>
                        <span className="flex size-10  items-center justify-center rounded-full bg-indigo-100 text-sm font-medium text-blue-700">
                            {row.name.charAt(0)}
                        </span>
                        <span className="text-s font-bold text-neutral-900">{row.name}</span>
                    </div>
                ),
            },
            {
                key: "supervisor",
                label: "سرپرست",
                width: "w-[18%]",
                ...CELL_CLASSES,
                render: (row: Trainee) => (
                    <span className={cn("text-sm text-neutral-800", fade(row))}>
                        {row.supervisor}
                    </span>
                ),
            },
            {
                key: "course",
                label: "دوره",
                width: "w-[18%]",
                ...CELL_CLASSES,
                render: (row: Trainee) => (
                    <span className={cn("text-sm text-neutral-800", fade(row))}>
                        {row.course}
                    </span>
                ),
            },
            {
                key: "hours",
                label: "ساعت",
                width: "w-[9%]",
                ...CELL_CLASSES,
                render: (row: Trainee) => (
                    <span className={cn("text-sm text-neutral-800", fade(row))}>
                        {hoursFormatter.format(row.hours)}
                    </span>
                ),
            },
            {
                key: "status",
                label: "وضعیت",
                width: "w-[24%]",
                ...CELL_CLASSES,
                render: (row: Trainee) => {
                    const badge = STATUS_BADGE[row.status];
                    return (
                        <span
                            className={cn(
                                "inline-flex items-center rounded-full border px-2 py-0.5 text-2xs font-medium",
                                badge.className,
                                fade(row),
                            )}
                        >
                            {badge.label}
                        </span>
                    );
                },
            },
            {
                key: "actions",
                label: "عملیات",
                width: "w-[92px]",
                ...CELL_CLASSES,
                render: (row: Trainee) => {
                    const isInactive = row.status === "inactive";
                    return (
                        <button
                            type="button"
                            onClick={() => toggleStatus(row.id)}
                            className={cn(
                                "cursor-pointer rounded-lg border px-3 py-1.5 text-3xs font-bold",
                                isInactive
                                    ? "border-emerald-200 bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                    : "border-red-300 bg-red-100 text-red-700 hover:bg-red-200",
                                fade(row),
                            )}
                        >
                            {isInactive ? "فعال‌سازی" : "غیرفعال"}
                        </button>
                    );
                },
            },
        ],
        [toggleStatus],
    );

    const rows = useMemo(() => {
        const q = normalize(query);
        return trainees
            .filter((t) => !q || normalize(t.name).includes(q))
            .map((t) => ({
                ...t,
                _rowClassName: "transition-colors hover:bg-neutral-50",
            }));
    }, [trainees, query]);

    return (
        <div dir="rtl" className="flex w-full flex-col gap-5 px-5 p-2">
            <div className="flex items-center justify-between gap-4">
                <Input
                    variant="default"
                    color="input"
                    className=" mt-2 w-1/3 border-none bg-neutral-50  placeholder:text-neutral-500   placeholder:text-sm "
                    inputSize="sm"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="جستجوی کارآموز..."
                    aria-label="جستجوی کارآموز"
                />

                <button
                    type="button"
                    className="flex h-8 font-semibold justify-center cursor-pointer items-center text-nowrap gap-2 rounded-lg border border-neutral-200 bg-white px-3 text-s text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50"
                >
                    <Download className="size-4.5" aria-hidden />
                    <span>خروجی Excel</span>
                </button>
            </div>

            <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white pb-5.5 pt-6 shadow-sm">
                <Table
                    tableRow={rows}
                    tableCol={columns}
                    HeaderPY="py-[18px]"
                    fixed
                />
            </div>
        </div>
    );
}

export default Trainees;