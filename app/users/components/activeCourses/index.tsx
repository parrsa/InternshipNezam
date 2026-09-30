import React from "react";
import { progressCourses } from "../../data";
import { Button } from "@/app/components/ui/Button";
import { cn } from "@/lib/cn";

function ActiveCourses() {
  return (
    <div
      dir="rtl"
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        px-7.5
        w-[35%]
        py-7.75
        shadow-sm
      "
    >
      <h2
        className="
          text-s
          font-bold
          text-slate-900
        "
      >
        دوره‌های در حال انجام
      </h2>

      <div className="mt-9.75 space-y-3.75">
        {progressCourses.map((course) => (
          <div key={course.title}>
            <div
              className="
                mb-1.75
                flex
                items-center
                justify-between
                gap-3
              "
            >
              <span
                className="
                  text-2xs
                  font-semibold
                  text-slate-900
                "
              >
                {course.title}
              </span>

              <span
                className="
                  
                  justify-center
                  rounded-full
                  border
                  border-emerald-700
                  bg-emerald-100
                  px-2
                  py-0.5
                  text-3xs
                  font-medium
                  text-emerald-800
                "
              >
                {course.percent}٪
              </span>
            </div>

            <div
              className="
                h-2
                flex
                justify-end
                w-full
                overflow-hidden
                rounded-full
                bg-indigo-100
              "
              role="progressbar"
              aria-label={`پیشرفت ${course.title}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={course.percent}
            >
              <div
                className="
                  h-full
                  bg-input-800
                  transition-[width]
                  duration-500
                "
                style={{
                  width: `${course.percent}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        size="xs"
        variant="solid"
        type="button"
        className={cn("flex w-full mt-5 items-center justify-center gap-2 h-8.75 rounded-xl border border-gray-200 bg-amber-50/40  text-nowrap text-xs font-bold text-neutral-900 transition-colors active:text-neutral-950 active:bg-teal-50 hover:text-neutral-950 hover:bg-teal-50")}
      >
        مشاهده همه
      </Button>
     
    </div>
  );
}

export default ActiveCourses;