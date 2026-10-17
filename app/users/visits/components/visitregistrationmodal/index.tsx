"use client";

import React from "react";
import {
    CalendarDays,
    Clock3,
    Hourglass,
    CheckCircle2,
    Check,
} from "lucide-react";
import Modal from "@/app/components/ui/Modal";
import { Button } from "@/app/components/ui/Button";
import { cn } from "@/lib/cn";
import { toFa, VisitItem } from "../visitCard";

interface VisitRegistrationModalProps {
    isOpen: boolean;
    visit: VisitItem | null;
    onClose: () => void;
    onConfirm: () => void;
}

function VisitRegistrationModal({
    isOpen,
    visit,
    onClose,
    onConfirm,
}: VisitRegistrationModalProps) {
    const [accepted, setAccepted] = React.useState(false);

    React.useEffect(() => {
        if (!isOpen) {
            setAccepted(false);
        }
    }, [isOpen]);

    if (!visit) return null;

    return (
        <Modal
            isOpen={isOpen}
            title="تایید ثبت‌نام در بازدید پروژه"
            closeModal={onClose}
            size="lg"
        >
            <div dir="rtl" className="flex flex-col">
                <p className="text-xs text-slate-700">
                    قبل از ادامه، اطلاعات بازدید را بررسی کرده و
                    الزامات را بپذیرید.
                </p>

                <h2 className="mt-5 text-right text-sm font-bold text-slate-900">
                    {visit.title}
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <CalendarDays size={14} />
                        <span>{visit.date}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock3 size={14} />
                        <span>{visit.time}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Hourglass size={14} />
                        <span>{toFa(visit.duration)} ساعت</span>
                    </div>
                </div>

                <div className="mt-5 flex flex-col gap-1.5 rounded-lg border-r-4 border-input-400 bg-slate-50 px-4 py-3 text-xs text-slate-700">
                    <p>محل حرکت: {visit.departure}</p>
                    <p>آدرس پروژه: {visit.address}</p>
                    <p>الزامات: {visit.requirements}</p>
                </div>

                <div className="mt-5 flex flex-col gap-2 rounded-xl border border-emerald-300 bg-emerald-50/60 px-4 py-4">
                    <span className="text-xs text-green-900">
                        هزینه شرکت در بازدید
                    </span>
                    <div className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                        رایگان
                        <CheckCircle2 size={16} />
                    </div>
                </div>

                <button
                    type="button"
                    role="checkbox"
                    aria-checked={accepted}
                    onClick={() => setAccepted((prev) => !prev)}
                    className="mt-5 flex items-center gap-2 text-right text-xs font-semibold text-slate-900"
                >
                    <span
                        className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${accepted
                                ? "border-input-800 bg-input-800 text-white"
                                : "border-slate-300 bg-white"
                            }`}
                    >
                        {accepted && <Check size={13} strokeWidth={3} />}
                    </span>
                    با شرایط ثبت‌نام و الزامات بازدید (شامل تجهیزات ایمنی)
                    موافقت می‌کنم.
                </button>

                <div className="mt-6 flex items-center justify-end gap-3">
                    <Button
                        size="xs"
                        rounded="lg"
                        textSize="sm"
                        variant="solid"
                        type="button"
                        onClick={onClose}
                        className={cn(
                            "flex w-[8%] px-3 h-10 items-center justify-center bg-amber-50/40 text-nowrap text-xs font-bold text-neutral-900 transition-colors active:text-neutral-950 active:bg-teal-50 hover:text-neutral-950 hover:bg-teal-50"
                        )}
                    >
                        انصراف
                    </Button>

                    <Button
                        type="button"
                        variant="solid"
                        color="input"
                        size="xs"
                        rounded="lg"
                        leftIcon={<CheckCircle2 size={16} />}
                        onClick={onConfirm}
                        disabled={!accepted}
                        className="h-8 items-center justify-center rounded-lg px-4 text-xs font-semibold"
                    >
                        ثبت‌نام
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default VisitRegistrationModal;