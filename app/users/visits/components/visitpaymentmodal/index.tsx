"use client";

import React from "react";
import {
    CalendarDays,
    Clock3,
    Hourglass,
    CreditCard,
    Check,
} from "lucide-react";
import Modal from "@/app/components/ui/Modal";
import { Button } from "@/app/components/ui/Button";
import { cn } from "@/lib/cn";
import { formatPrice, toFa, VisitItem } from "../visitCard";

export type PaymentMethod = "gateway" | "wallet";

interface VisitPaymentModalProps {
    isOpen: boolean;
    visit: VisitItem | null;
    walletBalance?: string;
    onClose: () => void;
    onConfirm: (method: PaymentMethod) => void;
}

function VisitPaymentModal({
    isOpen,
    visit,
    walletBalance = "۲۵۰,۰۰۰ تومان",
    onClose,
    onConfirm,
}: VisitPaymentModalProps) {
    const [accepted, setAccepted] = React.useState(false);
    const [method, setMethod] = React.useState<PaymentMethod>("gateway");

    React.useEffect(() => {
        if (!isOpen) {
            setAccepted(false);
            setMethod("gateway");
        }
    }, [isOpen]);

    if (!visit) return null;

    const options: { key: PaymentMethod; label: string }[] = [
        { key: "gateway", label: "پرداخت از طریق درگاه بانکی" },
        {
            key: "wallet",
            label: `کسر از اعتبار مالی (موجودی: ${walletBalance})`,
        },
    ];

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

                <div className="mt-5 flex flex-col gap-2 rounded-lg border border-input-400 bg-input-50/80 px-4 py-4">
                    <span className="text-xs text-input-700">
                        مبلغ قابل پرداخت
                    </span>

                    <div className="text-sm font-bold text-input-800">
                        {formatPrice(visit.price)}
                    </div>

                    <div
                        role="radiogroup"
                        className="mt-2 flex flex-col gap-2"
                    >
                        {options.map((option) => {
                            const selected = method === option.key;

                            return (
                                <button
                                    key={option.key}
                                    type="button"
                                    role="radio"
                                    aria-checked={selected}
                                    onClick={() => setMethod(option.key)}
                                    className="flex items-center justify-end gap-2 text-right font-semibold text-xs text-slate-900"
                                >
                                    {option.label}
                                    <span
                                        className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${selected
                                                ? "border-input-800"
                                                : "border-slate-300 bg-white"
                                            }`}
                                    >
                                        {selected && (
                                            <span className="h-2 w-2 rounded-full bg-input-800" />
                                        )}
                                    </span>
                                </button>
                            );
                        })}
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
                        leftIcon={<CreditCard size={16} />}
                        onClick={() => onConfirm(method)}
                        disabled={!accepted}
                        className="h-8 items-center justify-center rounded-lg px-4 text-xs font-semibold"
                    >
                        پرداخت و ثبت‌نام
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default VisitPaymentModal;