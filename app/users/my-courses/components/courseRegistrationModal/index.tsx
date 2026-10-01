"use client";

import React from "react";
import {
    CalendarDays,
    Clock3,
    MapPin,
    CheckCircle2,
} from "lucide-react";
import { Course } from "../coursesCards";
import Modal from "@/app/components/ui/Modal";
import { CustomCheckbox } from "@/app/components/ui/input/Checkbox";
import { Button } from "@/app/components/ui/Button";
import { cn } from "@/lib/cn";



interface CourseRegistrationModalProps {
    isOpen: boolean;
    course: Course | null;
    onClose: () => void;
    onConfirm: () => void;
}

function CourseRegistrationModal({
    isOpen,
    course,
    onClose,
    onConfirm,
}: CourseRegistrationModalProps) {
    const [accepted, setAccepted] = React.useState(false);

    React.useEffect(() => {
        if (!isOpen) {
            setAccepted(false);
        }
    }, [isOpen]);

    if (!course) return null;

    return (
        <Modal
            isOpen={isOpen}
            title="تایید ثبت‌نام در دوره/بازدید"
            closeModal={onClose}
            size="lg"
        >
            <div
                dir="rtl"
                className="flex flex-col"
            >
                <p className="text-xs text-slate-700">
                    قبل از ادامه، اطلاعات دوره را بررسی کرده و
                    شرایط را بپذیرید.
                </p>

                <h2
                    className="mt-5 text-right text-s font-bold text-slate-900"
                >
                    {course.title}
                </h2>

                <div
                    className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3"
                >
                    <div className="flex items-center gap-2 text-2xs text-slate-500">
                        <CalendarDays size={14} />
                        <span>{course.date}</span>
                    </div>

                    <div className="flex items-center gap-2 text-2xs text-slate-500">
                        <Clock3 size={14} />
                        <span>{course.duration}</span>
                    </div>

                    <div className="flex items-center gap-2 text-2xs text-slate-500">
                        <MapPin size={14} />
                        <span>سالن اجتماعات سازمان</span>
                    </div>
                </div>

                <div
                    className="mt-5 gap-2 flex flex-col rounded-xl border border-emerald-300 bg-emerald-50/60 px-4 py-4"
                >
                    <span className="text-2xs text-green-900">
                        مبلغ قابل پرداخت
                    </span>
                    <div className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                        {course.isFree
                            ? "رایگان (کارآموز فعال)"
                            : course.price}
                        <CheckCircle2 size={15} />
                    </div>

                </div>

                <div className="mt-5">
                    <CustomCheckbox
                        checked={accepted}
                        onChange={setAccepted}
                        label="با شرایط ثبت‌نام و الزامات دوره/بازدید موافقت می‌کنم."
                        LableClassName="text-xs font-semibold text-slate-900"
                        className="gap-2 "
                    />
                </div>

                <div
                    className="mt-6 flex items-center justify-end gap-3"
                >
                    <Button
                        size="xs"
                        rounded="lg"
                        textSize="sm"
                        variant="solid"
                        type="button"
                        className={cn("flex w-[8%]  px-3   h-10 items-center justify-center bg-amber-50/40  text-nowrap text-xs font-bold text-neutral-900 transition-colors active:text-neutral-950 active:bg-teal-50 hover:text-neutral-950 hover:bg-teal-50")}
                    >
                        انصراف

                    </Button>

                    <Button
                        type="button"
                        variant="solid"
                        color="input"
                        size="xs"
                        rounded="lg"
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

export default CourseRegistrationModal;