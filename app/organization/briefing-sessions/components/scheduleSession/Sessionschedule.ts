import * as Yup from "yup";


export type SessionType = "in_person" | "online";

export interface SessionFormValues {
  sessionType: SessionType;
  location: string;
  meetingLink: string;
  platform: string;
  date: string;
  timeRange: string;
  instructor: string;
  topic: string;
}

export type SessionFieldName = keyof SessionFormValues;

export type SessionPayload = Omit<
  SessionFormValues,
  "location" | "meetingLink" | "platform"
> &
  Partial<Pick<SessionFormValues, "location" | "meetingLink" | "platform">>;

export interface Option {
  label: string;
  value: string;
}

export const DEFAULT_VALUES: SessionFormValues = {
  sessionType: "in_person",
  location: "سالن اجتماعات سازمان، طبقه",
  meetingLink: "https://meet.google.com/abc-defg-hij",
  platform: "google_meet",
  date: "۱۴۰۵/۰۴/۲۰",
  timeRange: "۱۰:۰۰ - ۱۶:۰۰",
  instructor: "ahmadi",
  topic: "معرفی فرایند کارآموزی، بخشنامه‌ها و تکالیف",
};

export const SESSION_TYPE_OPTIONS: ReadonlyArray<{ value: SessionType; label: string }> = [
  { value: "in_person", label: "حضوری" },
  { value: "online", label: "آنلاین" },
];

export const PLATFORM_OPTIONS: Option[] = [
  { value: "google_meet", label: "Google Meet" },
  { value: "zoom", label: "Zoom" },
  { value: "ms_teams", label: "Microsoft Teams" },
];

export const INSTRUCTOR_OPTIONS: Option[] = [
  { value: "ahmadi", label: "مهندس احمدی" },
  { value: "rezaei", label: "مهندس رضایی" },
  { value: "karimi", label: "دکتر کریمی" },
];


const DATE_PATTERN = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/;
const TIME_RANGE_PATTERN =
  /^([01]\d|2[0-3]):([0-5]\d)\s*[-–—]\s*([01]\d|2[0-3]):([0-5]\d)$/;

export const toEnglishDigits = (value: string): string =>
  value
    .replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660));

const parseTimeRange = (value: string): [start: number, end: number] | null => {
  const match = TIME_RANGE_PATTERN.exec(toEnglishDigits(value).trim());
  if (!match) return null;
  const [, h1, m1, h2, m2] = match;
  return [Number(h1) * 60 + Number(m1), Number(h2) * 60 + Number(m2)];
};

export const sessionSchema = Yup.object({
  sessionType: Yup.mixed<SessionType>()
    .oneOf(["in_person", "online"])
    .required("نوع جلسه را انتخاب کنید"),
  location: Yup.string().trim().max(200, "حداکثر ۲۰۰ کاراکتر مجاز است"),
  meetingLink: Yup.string()
    .trim()
    .when("sessionType", {
      is: "online",
      then: (schema) => schema.url("لینک جلسه معتبر نیست"),
    }),
  platform: Yup.string(),
  date: Yup.string()
    .trim()
    .required("تاریخ جلسه را وارد کنید")
    .test("date-format", "تاریخ را به شکل ۱۴۰۵/۰۴/۲۰ وارد کنید", (value) =>
      DATE_PATTERN.test(toEnglishDigits(value ?? "")),
    ),
  timeRange: Yup.string()
    .trim()
    .required("ساعت شروع و پایان را وارد کنید")
    .test("time-format", "ساعت را به شکل ۱۰:۰۰ - ۱۶:۰۰ وارد کنید", (value) =>
      parseTimeRange(value ?? "") !== null,
    )
    .test("time-order", "ساعت پایان باید بعد از ساعت شروع باشد", (value) => {
      const range = parseTimeRange(value ?? "");
      return range === null || range[0] < range[1];
    }),
  instructor: Yup.string(),
  topic: Yup.string().trim().max(500, "حداکثر ۵۰۰ کاراکتر مجاز است"),
});


export const buildPayload = (values: SessionFormValues): SessionPayload => {
  const { location, meetingLink, platform, ...common } = values;
  const base = {
    ...common,
    date: common.date.trim(),
    timeRange: common.timeRange.trim(),
    topic: common.topic.trim(),
  };

  return values.sessionType === "online"
    ? { ...base, meetingLink: meetingLink.trim(), platform }
    : { ...base, location: location.trim() };
};