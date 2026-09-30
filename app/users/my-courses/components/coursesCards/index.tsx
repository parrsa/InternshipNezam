"use client";

import React from "react";
import {
  CalendarDays,
  Clock3,
  UsersRound,
  CheckCircle2,
  CreditCard,
} from "lucide-react";

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
  نظری: "border-blue-200 bg-blue-50 text-blue-600",
  مهارتی: "border-blue-200 bg-blue-50 text-blue-600",
  "بازدید پروژه": "border-emerald-200 bg-emerald-50 text-emerald-600",
  حقوق: "border-amber-200 bg-amber-50 text-amber-600",
};

const statusStyles: Record<CourseStatus, string> = {
  active: "border-emerald-200 bg-emerald-50 text-emerald-600",
  waiting: "border-amber-200 bg-amber-50 text-amber-600",
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
    <article
      dir="rtl"
      className="
        group
        flex
        min-h-[347px]
        flex-col
        rounded-2xl
        border
        border-slate-200
        bg-white
        px-5
        py-4
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-[1px]
        hover:shadow-md
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <span
          className={`
            inline-flex
            items-center
            rounded-full
            border
            px-3
            py-1
            text-xs
            font-medium
            ${categoryStyles[course.category]}
          `}
        >
          {course.category}
        </span>

        <span
          className={`
            inline-flex
            items-center
            rounded-full
            border
            px-3
            py-1
            text-xs
            font-medium
            ${statusStyles[course.status]}
          `}
        >
          {course.status === "registered"
            ? "ثبت‌نام شده"
            : course.status === "waiting"
              ? "در انتظار"
              : "فعال"}
        </span>
      </div>

      {/* Title */}
      <h2
        className="
          mt-6
          text-[20px]
          font-bold
          leading-8
          text-slate-900
        "
      >
        {course.title}
      </h2>

      {/* Meta */}
      <div
        className="
          mt-4
          grid
          grid-cols-3
          gap-3
          text-xs
          text-slate-500
        "
      >
        <div className="flex items-center gap-1.5">
          <CalendarDays size={16} strokeWidth={1.7} />
          <span>{course.date}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Clock3 size={16} strokeWidth={1.7} />
          <span>{course.duration}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <UsersRound size={16} strokeWidth={1.7} />
          <span>{course.participants}</span>
        </div>
      </div>

      {/* Description */}
      <p
        className="
          mt-5
          min-h-[48px]
          text-sm
          leading-7
          text-slate-600
        "
      >
        {course.description}
      </p>

      {/* Progress */}
      <div className="mt-auto">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            ثبت‌نام شده
          </span>

          <span className="font-medium text-slate-600">
            ({course.registered}/{course.capacity}) {percentage}%
          </span>
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#d8e1f4]">
          <div
            className="
              h-full
              rounded-full
              bg-[#2047b8]
              transition-all
              duration-300
            "
            style={{
              width: `${Math.min(percentage, 100)}%`,
            }}
          />
        </div>

        {/* Bottom */}
        <div className="mt-5 flex items-center justify-between gap-3">
          {course.isRegistered ? (
            <button
              type="button"
              disabled
              className="
                inline-flex
                h-10
                items-center
                gap-1.5
                rounded-lg
                border
                border-emerald-200
                bg-white
                px-4
                text-sm
                font-medium
                text-emerald-600
              "
            >
              <CheckCircle2 size={17} />
              ثبت‌نام شده
            </button>
          ) : course.status === "waiting" || isFull ? (
            <button
              type="button"
              disabled
              className="
                inline-flex
                h-10
                items-center
                rounded-lg
                bg-slate-100
                px-5
                text-sm
                font-medium
                text-slate-400
              "
            >
              در انتظار
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onRegister(course)}
              className="
                inline-flex
                h-10
                items-center
                justify-center
                rounded-lg
                bg-[#1645b5]
                px-5
                text-sm
                font-semibold
                text-white
                transition-colors
                hover:bg-[#123b9d]
                active:scale-[0.98]
              "
            >
              ثبت‌نام
            </button>
          )}

          <span
            className={`
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              px-3
              py-1.5
              text-xs
              font-medium
              ${
                course.isFree
                  ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                  : "border-amber-200 bg-amber-50 text-amber-700"
              }
            `}
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
    </article>
  );
}

export default CourseCard;