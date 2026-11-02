"use client";

import {
    CalendarDays,
    Clock3,
    Hourglass,
    CheckCircle2,
    CreditCard,
    ArrowLeft,
} from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export const toFa = (v: string | number) =>
    String(v).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

export const formatPrice = (price: number) =>
    `${toFa(price.toLocaleString("en-US"))} تومان`;

export type VisitCategory = "مسکونی" | "تجاری" | "اداری";

export interface VisitItem {
    id: number;
    title: string;
    category: VisitCategory;

    capacity: number;
    registered: number;

    date: string;
    time: string;
    duration: number;

    departure: string;
    address: string;
    supervisor: string;
    supervisorShort: string;
    projectName: string;
    projectShort: string;

    description: string;
    requirements: string;

    price: number;
}

interface VisitCardProps {
    visit: VisitItem;
    onRegister: (visit: VisitItem) => void;
}

const categoryStyles: Record<VisitCategory, string> = {
    مسکونی: "border-blue-200 bg-blue-100 text-blue-900",
    تجاری: "border-amber-200 bg-orange-100 text-amber-900",
    اداری: "border-emerald-200 bg-emerald-100 text-emerald-900",
};

function VisitCard({ visit, onRegister }: VisitCardProps) {
    const percentage = Math.round((visit.registered / visit.capacity) * 100);
    const isFull = visit.registered >= visit.capacity;
    const isFree = visit.price === 0;

    return (
        <div
            dir="ltr"
            className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white px-5 py-11 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
            <div className="flex items-start justify-between gap-3">
                <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-2xs font-medium ${categoryStyles[visit.category]}`}
                >
                    {visit.category}
                </span>

                <span className="text-2xs text-slate-500">
                    ظرفیت: {toFa(visit.capacity)} نفر
                </span>
            </div>

            <h2 className="mt-3 text-sm font-bold text-slate-900">
                {visit.title}
            </h2>

            <div className="mt-3 grid grid-cols-3 gap-3 text-2xs text-slate-500">
                <div className="flex items-center gap-1.5">
                    <CalendarDays size={14} strokeWidth={1.7} />
                    <span>{visit.date}</span>
                </div>

                <div className="flex items-center gap-1.5">
                    <Clock3 size={14} strokeWidth={1.7} />
                    <span>{visit.time}</span>
                </div>

                <div className="flex items-center gap-1.5">
                    <Hourglass size={14} strokeWidth={1.7} />
                    <span>{toFa(visit.duration)} ساعت</span>
                </div>
            </div>

            <div className="mt-5 flex flex-col gap-1.5 text-xs text-slate-600">
                <p>محل حرکت: {visit.departure}</p>
                <p>آدرس پروژه: {visit.address}</p>
                <p>مسئول پروژه: {visit.supervisor}</p>
            </div>

            <p className="mt-5 mb-3 text-xs leading-6 text-slate-600">
                {visit.description}
            </p>

            <div className="mt-auto">
                <div className="mb-2 flex items-center justify-between text-2xs">
                    <span className="text-slate-500">ثبت‌نام شده</span>

                    <span className="font-medium text-slate-900">
                        {toFa(percentage)}٪ ({toFa(visit.registered)}/
                        {toFa(visit.capacity)})
                    </span>
                </div>

                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#d8e1f4]">
                    <div
                        className="h-full rounded-full bg-[#2047b8] transition-all duration-300"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
                    <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-2xs font-medium ${isFree
                                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                                : "border-amber-200 bg-amber-50 text-amber-700"
                            }`}
                    >
                        {isFree ? (
                            <>
                                <CheckCircle2 size={14} />
                                رایگان
                            </>
                        ) : (
                            <>
                                <CreditCard size={14} />
                                {formatPrice(visit.price)}
                            </>
                        )}
                    </span>

                    {isFull ? (
                        <Button
                            type="button"
                            disabled
                            variant="solid"
                            color="input"
                            size="xs"
                            rounded="lg"
                            className="h-9 items-center rounded-lg bg-slate-100 px-5 text-xs font-medium text-slate-400"
                        >
                            ظرفیت تکمیل
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            variant="solid"
                            color="input"
                            size="xs"
                            rounded="lg"
                            onClick={() => onRegister(visit)}
                            className="h-9 items-center justify-center rounded-lg px-4 text-xs font-semibold"
                        >
                            {isFree ? (
                                "ثبت‌نام"
                            ) : (
                                <span className="flex items-center gap-1.5">
                                    <ArrowLeft size={14} />
                                    ثبت‌نام و پرداخت
                                </span>
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VisitCard;