import * as Yup from "yup";

import type { VisitOption } from "../visitSchema/visitSchema";

export interface CourseFormValues {
  title: string;
  type: string;
  instructor: string;
  date: string;
  startTime: string;
  duration: string;
  location: string;
  capacity: string;
  cost: string;
  deadline: string;
  status: string;
  freeForActiveInterns: boolean;
  prerequisites: string;
  targetGroup: string;
  description: string;
}

export const COURSE_TYPES: VisitOption[] = [
  { label: "آموزش مهارتی", value: "skill" },
  { label: "کارگاه", value: "workshop" },
  { label: "سمینار", value: "seminar" },
];

export const COURSE_INSTRUCTORS: VisitOption[] = [
  { label: "مهندس رضایی", value: "instructor-1" },
  { label: "مهندس احمدی", value: "instructor-2" },
];

export const COURSE_STATUSES: VisitOption[] = [
  { label: "فعال برای ثبت‌نام", value: "open" },
  { label: "بسته", value: "closed" },
  { label: "پیش‌نویس", value: "draft" },
];

export const TARGET_GROUPS: VisitOption[] = [
  { label: "کارآموزان", value: "interns" },
  { label: "مهندسان", value: "engineers" },
  { label: "دانشجویان", value: "students" },
];

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

export function digitsToEnglish(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)));
}

export function extractNumber(value: string | undefined): number {
  const digits = digitsToEnglish(value ?? "").replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}

export const initialCourseValues: CourseFormValues = {
  title: "",
  type: COURSE_TYPES[0].value,
  instructor: COURSE_INSTRUCTORS[0].value,
  date: "2026-07-15",
  startTime: "09:00",
  duration: "ساعت ۸",
  location: "",
  capacity: "نفر ۲۵",
  cost: "200000",
  deadline: "2026-07-10",
  status: COURSE_STATUSES[0].value,
  freeForActiveInterns: false,
  prerequisites: "",
  targetGroup: TARGET_GROUPS[0].value,
  description: "",
};

export const courseValidationSchema: Yup.ObjectSchema<CourseFormValues> =
  Yup.object({
    title: Yup.string()
      .trim()
      .min(3, "عنوان دوره باید حداقل ۳ حرف باشد")
      .required("عنوان دوره را وارد کنید"),
    type: Yup.string()
      .oneOf(
        COURSE_TYPES.map((o) => o.value),
        "نوع دوره معتبر نیست"
      )
      .required("نوع دوره را انتخاب کنید"),
    instructor: Yup.string().defined(),
    date: Yup.string().required("تاریخ برگزاری را وارد کنید"),
    startTime: Yup.string().required("ساعت شروع را وارد کنید"),
    duration: Yup.string()
      .required("مدت دوره را وارد کنید")
      .test(
        "duration-positive",
        "مدت دوره معتبر نیست",
        (v) => extractNumber(v) > 0
      ),
    location: Yup.string().trim().defined(),
    capacity: Yup.string()
      .required("ظرفیت را وارد کنید")
      .test(
        "capacity-positive",
        "ظرفیت معتبر نیست",
        (v) => extractNumber(v) > 0
      ),
    cost: Yup.string()
      .required("هزینه شرکت را وارد کنید")
      .matches(/^\d+$/, "هزینه معتبر نیست"),
    deadline: Yup.string()
      .required("مهلت ثبت‌نام را وارد کنید")
      .test(
        "deadline-before-date",
        "مهلت ثبت‌نام باید قبل از تاریخ برگزاری باشد",
        function (value) {
          const { date } = this.parent as CourseFormValues;
          return !value || !date || value <= date; 
        }
      ),
    status: Yup.string()
      .oneOf(
        COURSE_STATUSES.map((o) => o.value),
        "وضعیت معتبر نیست"
      )
      .required("وضعیت را انتخاب کنید"),
    freeForActiveInterns: Yup.boolean().required(),
    prerequisites: Yup.string()
      .trim()
      .max(200, "حداکثر ۲۰۰ حرف مجاز است")
      .defined(),
    targetGroup: Yup.string()
      .oneOf(
        TARGET_GROUPS.map((o) => o.value),
        "گروه هدف معتبر نیست"
      )
      .required("گروه هدف را انتخاب کنید"),
    description: Yup.string()
      .trim()
      .max(1000, "حداکثر ۱۰۰۰ حرف مجاز است")
      .defined(),
  });