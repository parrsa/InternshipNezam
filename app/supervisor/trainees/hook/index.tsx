// src/app/supervisor/hook/index.ts
import type { Item } from "../components/licenseStatus";
import { TOTAL_CAPACITY_BY_USER_TYPE, type UserType } from "../supervisorConfig";

/* ============================================================
   تبدیل تاریخ شمسی "1328/01/01" به ISO میلادی
   ============================================================ */
const persianToISO = (val: string | null | undefined): string => {
  if (!val) return "";
  const m = String(val).match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
  if (!m) return "";
  const [, y, mo, d] = m;
  const year = Number(y);
  // اگر قبلاً ISO میلادی بود
  if (year > 1900) {
    return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  // تبدیل شمسی به میلادی (تقریبی برای DatePicker)
  const gy = year + 621;
  return `${gy}-${String(Number(mo)).padStart(2, "0")}-${String(Number(d)).padStart(2, "0")}`;
};

/* ============================================================
   ISO میلادی → شمسی "YYYY/MM/DD"
   ============================================================ */
const isoToPersian = (iso: string | null | undefined): string => {
  if (!iso) return "";
  const m = String(iso).match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (!m) return "";
  const [, y, mo, d] = m;
  const gy = Number(y);
  if (gy < 1900) return iso; // قبلاً شمسی بود
  const jy = gy - 621;
  return `${jy}/${String(Number(mo)).padStart(2, "0")}/${String(Number(d)).padStart(2, "0")}`;
};

/* ============================================================
   نگاشت داده بک‌اند → مقادیر فرم
   ============================================================ */
export const realInfoToFormValues = (data: any) => {
  const firstName = data?.firstName ?? "";
  const lastName = data?.lastName ?? "";
  return {
    FullName: `${firstName} ${lastName}`.trim(),
    CompanyName: "",
    LicenseNumber: data?.licenseNumber ?? "",
    NationalCode: data?.nationalCode ?? "",
    Birthday: persianToISO(data?.birthDate),
    Birthplace: data?.birthPlace ?? "",
    PhoneNumber: data?.phoneNumber ?? "",
    Address: data?.address ?? "",
    NezamRegisterCode: data?.nezamRegisterCode ?? "",
    LicenseBase: data?.licenseBase != null ? String(data.licenseBase) : "",
    LicenseYear: data?.licenseYear ? String(data.licenseYear) : "",
  };
};

export const realInfoToLicenseStatus = (data: any) => {
  const field =
    data?.field != null && data.field > 0
      ? [{ value: String(data.field), active: true }]
      : [];
  const quals = Array.isArray(data?.competenceList)
    ? data.competenceList.map((c: number) => ({ value: String(c), active: true }))
    : [];

  return {
    fields: field as Item[],
    qualifications: quals as Item[],
    experienceYears: data?.workExperience ? String(data.workExperience) : "",
    activeProjects: data?.activeProjectCount
      ? String(data.activeProjectCount)
      : "",
    summary: data?.experienceSummery ?? "",
  };
};

export const realInfoToRegistrationConditions = (data: any) => ({
  salary: data?.traineSalary ? String(data.traineSalary) : "",
  insurance: (data?.traineInsurnce ? "social" : "none") as "social" | "none",
  weeklyHours: data?.traineHoursByWeek ? String(data.traineHoursByWeek) : "",
  traineeCertificate: !!data?.traineCertificate,
});

export const realInfoToCommitment = (data: any, totalCapacity = 0) => {
  const backendAcceptance = data?.acceptanceCapacity ?? 0;
  const displayTotalCapacity = backendAcceptance > 0 ? backendAcceptance : totalCapacity;
  return {
    allocatedCapacity: data?.assignedCapacity
      ? String(data.assignedCapacity)
      : "",
    minMonthlyHours: data?.minHoursByMonth ? String(data.minHoursByMonth) : "",
    displayTotalCapacity,
    payloadTotalCapacity: displayTotalCapacity,
  };
};

/* ============================================================
   ساخت Payload نهایی برای POST /api/Supervisor/RealRegistration
   ============================================================ */
export interface BuildPayloadParams {
  formValues: {
    FullName?: string;
    CompanyName?: string;
    LicenseNumber?: string;
    NationalCode?: string;
    Birthday?: string;
    Birthplace?: string;
    PhoneNumber?: string;
    Address?: string;
    NezamRegisterCode?: string;
    LicenseBase?: string;
    LicenseYear?: string;
  };
  fields: Item[];
  qualifications: Item[];
  experienceYears: string;
  activeProjects: string;
  summary: string;
  salary: string;
  insurance: "social" | "none";
  weeklyHours: string;
  payloadTotalCapacity: number;
  allocatedCapacity: string;
  minMonthlyHours: string;
  traineeCertificate: boolean;
  backend: any | null;
}

export function buildSupervisorRealPayload(params: BuildPayloadParams) {
  const { formValues, fields, qualifications, backend } = params;

  const fullName = (formValues.FullName ?? "").trim();
  const [firstName, ...rest] = fullName.split(/\s+/);
  const lastName = rest.join(" ");

  // فقط آیتم‌های فعال ارسال می‌شوند
  const activeFields = fields.filter((f) => f.active);
  const activeQuals = qualifications.filter((q) => q.active);

  return {
    fldMemberId: backend?.fldMemberId ?? 0,
    memberId: backend?.memberId ?? "00000000-0000-0000-0000-000000000000",
    id: backend?.id ?? 0,
    firstName: firstName || "",
    lastName: lastName || "",
    nationalCode: formValues.NationalCode ?? "",
    licenseNumber: formValues.LicenseNumber ?? "",
    phoneNumber: formValues.PhoneNumber ?? "",
    birthDate: isoToPersian(formValues.Birthday),
    birthPlace: formValues.Birthplace ?? "",
    nezamRegisterCode: formValues.NezamRegisterCode ?? "",
    address: formValues.Address ?? "",
    competenceList: activeQuals
      .map((q) => Number(q.value))
      .filter((n) => !Number.isNaN(n) && n > 0),
    field: activeFields[0] ? Number(activeFields[0].value) : 0,
    licenseBase: Number(formValues.LicenseBase) || 0,
    workExperience: Number(params.experienceYears) || 0,
    activeProjectCount: Number(params.activeProjects) || 0,
    licenseYear: Number(formValues.LicenseYear) || 0,
    experienceSummery: params.summary || "",
    traineSalary: Number(params.salary) || 0,
    traineInsurnce: params.insurance === "social",
    traineHoursByWeek: Number(params.weeklyHours) || 0,
    traineCertificate: params.traineeCertificate,
    acceptanceCapacity: params.payloadTotalCapacity,
    assignedCapacity: Number(params.allocatedCapacity) || 0,
    minHoursByMonth: Number(params.minMonthlyHours) || 0,
    userId: backend?.userId ?? "00000000-0000-0000-0000-000000000000",
  };
}

/* ============================================================
   اعتبارسنجی قبل از ارسال (برای جلوگیری از خطای 500)
   ============================================================ */
export function validateBeforeSubmit(
  payload: ReturnType<typeof buildSupervisorRealPayload>
): string | null {
  if (!payload.firstName) return "نام الزامی است";
  if (!payload.lastName) return "نام خانوادگی الزامی است";
  if (!payload.nationalCode) return "کد ملی الزامی است";
  if (!payload.licenseNumber) return "شماره پروانه الزامی است";
  if (payload.workExperience <= 0) return "سابقه کار باید بزرگتر از ۰ باشد";
  if (payload.field <= 0) return "رشته فعالیت الزامی است";
  if (payload.licenseBase <= 0) return "پایه پروانه الزامی است";
  if (payload.licenseYear <= 0) return "سال صدور پروانه الزامی است";
  if (payload.competenceList.length === 0) return "حداقل یک صلاحیت انتخاب کنید";
  if (payload.traineSalary <= 0) return "حقوق ماهانه الزامی است";
  if (payload.traineHoursByWeek <= 0) return "ساعات حضور هفتگی الزامی است";
  if (payload.acceptanceCapacity <= 0) return "ظرفیت پذیرش الزامی است";
  if (payload.assignedCapacity <= 0) return "ظرفیت تخصیص یافته الزامی است";
  if (payload.minHoursByMonth <= 0) return "حداقل ساعت ماهانه الزامی است";
  return null;
}