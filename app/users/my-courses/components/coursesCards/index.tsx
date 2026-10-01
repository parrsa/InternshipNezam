"use client";

import {
    CalendarDays,
    Clock3,
    UsersRound,
    CheckCircle2,
    CreditCard,
} from "lucide-react";
import { Button } from "@/app/components/ui/Button";



export type CourseCategory =
    | "نظری"
    | "مهارتی"
    | "بازدید پروژه"
    | "حقوق";

export type CourseStatus =
    | "active"
    | "waiting"
    | "registered";

export interface Course {
    id: number;
    title: string;
    category: CourseCategory;
    status: CourseStatus;

    date: string;
    duration: string;
    participants: string;

    description: string;

    registered: number;
    capacity: number;

    price: string;

    isRegistered?: boolean;
    isFree?: boolean;
}

interface CourseCardProps {
    course: Course;
    onRegister: (course: Course) => void;
}

const categoryStyles: Record<CourseCategory, string> = {
    نظری: "border-blue-600 bg-blue-100 text-blue-900",
    مهارتی: "border-blue-600 bg-blue-100 text-blue-900",
    "بازدید پروژه": "border-emerald-200 bg-emerald-50 text-emerald-600",
    حقوق: "border-amber-600 bg-orange-100 text-amber-900",
};

const statusStyles: Record<CourseStatus, string> = {
    active: "border-emerald-600 bg-emerald-100 text-emerald-900",
    waiting: "border-amber-200 bg-orange-100 text-amber-900",
    registered: "border-emerald-200 bg-emerald-50 text-emerald-600",
};

function CourseCard({
    course,
    onRegister,
}: CourseCardProps) {
    const percentage = Math.round(
        (course.registered / course.capacity) * 100
    );

    const isFull = course.registered >= course.capacity;

    return (
        <div
            dir="rtl"
            className="flex flex-col rounded-2xl border border-slate-200 bg-white px-5 py-11 shadow-sm transition-all duration-500 hover:shadow-md"
        >
            <div className="flex items-start justify-between gap-3">
                <span
                    className={`items-center rounded-full border px-1.5 py-0.5 text-2xs font-medium ${categoryStyles[course.category]}`}
                >
                    {course.category}
                </span>

                <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-2xs font-medium ${statusStyles[course.status]}`}
                >
                    {course.status === "registered"
                        ? "ثبت‌نام شده"
                        : course.status === "waiting"
                            ? "در انتظار"
                            : "فعال"}
                </span>
            </div>

            <h2
                className="mt-3 text-sm font-bold text-slate-900"
            >
                {course.title}
            </h2>

            <div
                className="mt-3 grid grid-cols-3 gap-3 text-2xs text-slate-500"
            >
                <div className="flex items-center gap-1.5">
                    <CalendarDays size={14} strokeWidth={1.7} />
                    <span>{course.date}</span>
                </div>

                <div className="flex items-center gap-1.5">
                    <Clock3 size={14} strokeWidth={1.7} />
                    <span>{course.duration}</span>
                </div>

                <div className="flex items-center gap-1.5">
                    <UsersRound size={14} strokeWidth={1.7} />
                    <span>{course.participants}</span>
                </div>
            </div>

            <p
                className="mt-5 text-3xs mb-3 text-slate-600"
            >
                {course.description}
            </p>

            <div className="mt-3">
                <div className="mb-2 flex items-center justify-between text-2xs">
                    <span className="text-slate-500">
                        ثبت‌نام شده
                    </span>

                    <span className="font-medium text-slate-900">
                        {percentage}% ({course.capacity} /{course.registered})
                    </span>
                </div>

                <div className="h-1.5 w-full  flex justify-end overflow-hidden rounded-full bg-[#d8e1f4]">
                    <div
                        className="h-full bg-[#2047b8] transition-all duration-300"
                        style={{
                            width: `${Math.min(percentage, 100)}%`,
                        }}
                    />
                </div>

                <div dir="ltr" className="mt-5 flex items-center justify-between gap-3">
                    {course.isRegistered ? (
                        <Button
                            type="button"
                            variant="solid"
                            color="input"
                            size="xs"
                            rounded="lg"
                            rightIcon={
                                <CheckCircle2 size={15} />
                            }
                            disabled
                            className="h-8 items-center gap-1.5 rounded-lg bg-neutral-100 px-4 text-xs font-medium text-neutral-400"
                        >
                            ثبت‌نام شده
                        </Button>
                    ) : course.status === "waiting" || isFull ? (
                        <Button
                            type="button"
                            disabled
                            variant="solid"
                            color="input"
                            size="xs"
                            rounded="lg"
                            className="h-8 items-center rounded-lg bg-slate-100 px-5 text-xs font-medium text-slate-400"
                        >
                            در انتظار
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            variant="solid"
                            color="input"
                            size="xs"
                            rounded="lg"
                            onClick={() => onRegister(course)}
                            className="h-8 items-center justify-center rounded-lg px-4 text-xs font-semibold"
                        >
                            ثبت‌نام
                        </Button>
                    )}

                    <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${course.isFree
                                ? "border-emerald-200 py-1.25 text-3xs bg-emerald-50 text-emerald-800"
                                : "border-amber-200 bg-amber-50 text-amber-700"
                            }`}
                    >
                        {course.isFree ? (
                            <>
                                <CheckCircle2 size={14} />
                                رایگان (کارآموز فعال)
                            </>
                        ) : (
                            <>
                                <CreditCard size={14} />
                                {course.price}
                            </>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;