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
      closeModal={onClose}
      title="تایید ثبت‌نام در دوره/بازدید"
      size="lg"
      className="max-w-[600px]"
    >
      <div
        dir="rtl"
        className="flex flex-col"
      >
        {/* Description */}
        <p className="text-sm leading-7 text-slate-500">
          قبل از ادامه، اطلاعات دوره را بررسی کرده و
          شرایط را بپذیرید.
        </p>

        {/* Course title */}
        <h2
          className="
            mt-5
            text-right
            text-lg
            font-bold
            text-slate-900
          "
        >
          {course.title}
        </h2>

        {/* Course meta */}
        <div
          className="
            mt-4
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-3
          "
        >
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays size={17} />
            <span>{course.date}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock3 size={17} />
            <span>{course.duration}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin size={17} />
            <span>سالن اجتماعات سازمان</span>
          </div>
        </div>

        {/* Price */}
        <div
          className="
            mt-5
            flex
            items-center
            justify-between
            rounded-xl
            border
            border-emerald-300
            bg-emerald-50/60
            px-4
            py-4
          "
        >
          <span className="text-sm text-slate-600">
            مبلغ قابل پرداخت
          </span>

          <div className="flex items-center gap-2 text-base font-bold text-emerald-600">
            <CheckCircle2 size={19} />
            {course.isFree
              ? "رایگان (کارآموز فعال)"
              : course.price}
          </div>
        </div>

        {/* Agreement */}
        <div className="mt-5">
          <CustomCheckbox
            checked={accepted}
            onChange={setAccepted}
            label="با شرایط ثبت‌نام و الزامات دوره/بازدید موافقت می‌کنم."
            LableClassName="text-sm font-medium text-slate-700"
            className="gap-3"
          />
        </div>

        {/* Actions */}
        <div
          className="
            mt-6
            flex
            items-center
            justify-start
            gap-3
          "
        >
          <button
            type="button"
            onClick={onConfirm}
            disabled={!accepted}
            className="
              h-10
              rounded-lg
              bg-[#1645b5]
              px-5
              text-sm
              font-semibold
              text-white
              transition-all
              disabled:cursor-not-allowed
              disabled:bg-[#9db1df]
              hover:bg-[#123b9d]
              disabled:hover:bg-[#9db1df]
            "
          >
            ثبت‌نام
          </button>

          <button
            type="button"
            onClick={onClose}
            className="
              h-10
              rounded-lg
              px-4
              text-sm
              font-medium
              text-slate-700
              transition-colors
              hover:bg-slate-100
            "
          >
            انصراف
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default CourseRegistrationModal;