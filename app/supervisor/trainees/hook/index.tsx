const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";

type Item = { value: string; active: boolean };

// ⚠️ مقدارهای عددی رو با enum واقعی بک‌اند چک کن (حدسی‌ان)
export const FIELD_CODE: Record<string, number> = {
  civil: 1,
  architecture: 2,
  electrical: 3,
  mechanical: 4,
  surveying: 5,
};

export const COMPETENCE_CODE: Record<string, number> = {
  design: 1,
  supervision: 2,
  execution: 3,
};

const invert = (m: Record<string, number>) =>
  Object.fromEntries(Object.entries(m).map(([k, v]) => [v, k])) as Record<number, string>;

const FIELD_BY_CODE = invert(FIELD_CODE);
const COMPETENCE_BY_CODE = invert(COMPETENCE_CODE);

const toEnglishDigits = (value: string) =>
  value
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

const toNumber = (v: string | number | null | undefined) =>
  Number(toEnglishDigits(String(v ?? "")).replace(/\D/g, "")) || 0;

const toDigits = (v?: string) => toEnglishDigits((v ?? "").trim());

const str = (v: unknown) =>
  v === null || v === undefined || v === 0 ? "" : String(v);

const splitFullName = (full?: string) => {
  const parts = (full ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { firstName: parts[0] ?? "", lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
};

/* ================= backend → form ================= */

export function realInfoToFormValues(b?: any | null) {
  if (!b) return null;
  return {
    FullName: `${b.firstName ?? ""} ${b.lastName ?? ""}`.trim(),
    CompanyName: "",
    LicenseNumber: str(b.licenseNumber),
    NationalCode: str(b.nationalCode),
    Birthday: str(b.birthDate).slice(0, 10),
    Birthplace: str(b.birthPlace),
    PhoneNumber: str(b.phoneNumber),
    Address: str(b.address),
    NezamRegisterCode: str(b.nezamRegisterCode),
    LicenseBase: str(b.licenseBase),
    LicenseYear: str(b.licenseYear),
  };
}

export function realInfoToLicenseStatus(b?: any | null): {
  fields: Item[];
  qualifications: Item[];
  experienceYears: string;
  activeProjects: string;
  summary: string;
} {
  const fieldValue = b?.field ? FIELD_BY_CODE[b.field] : undefined;
  return {
    fields: fieldValue ? [{ value: fieldValue, active: true }] : [],
    qualifications: ((b?.competenceList ?? []) as number[])
      .map((c) => COMPETENCE_BY_CODE[c])
      .filter(Boolean)
      .map((value) => ({ value, active: true })),
    experienceYears: str(b?.workExperience),
    activeProjects: str(b?.activeProjectCount),
    summary: str(b?.experienceSummery),
  };
}

export function realInfoToRegistrationConditions(b?: any | null): {
  salary: string;
  insurance: "social" | "none";
  weeklyHours: string;
  traineeCertificate: boolean;
} {
  return {
    salary: str(b?.traineSalary),
    insurance: b?.traineInsurnce ? "social" : "none",
    weeklyHours: str(b?.traineHoursByWeek),
    traineeCertificate: !!b?.traineCertificate,
  };
}

export function realInfoToCommitment(b?: any | null, totalCapacity?: number) {
  const total = (totalCapacity ?? b?.acceptanceCapacity ?? 0) as number;
  return {
    allocatedCapacity: str(b?.assignedCapacity),
    minMonthlyHours: str(b?.minHoursByMonth),
    payloadTotalCapacity: total,
    displayTotalCapacity: total,
  };
}

/* ================= form → backend ================= */

interface BuildInput {
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
  backend?: any | null;
}

export function buildSupervisorRealPayload(input: BuildInput) {
  const { formValues: v, backend } = input;
  const { firstName, lastName } = splitFullName(v.FullName);

  return {
    fldMemberId: backend?.fldMemberId ?? 0,
    memberId: backend?.memberId ?? EMPTY_GUID,
    id: backend?.id ?? 0,

    firstName,
    lastName,
    nationalCode: toDigits(v.NationalCode),
    licenseNumber: toDigits(v.LicenseNumber),
    phoneNumber: toDigits(v.PhoneNumber),
    birthDate: v.Birthday ?? "",
    birthPlace: (v.Birthplace ?? "").trim(),
    nezamRegisterCode: toDigits(v.NezamRegisterCode),
    address: (v.Address ?? "").trim(),

    field: FIELD_CODE[input.fields[0]?.value ?? ""] ?? 0,
    competenceList: input.qualifications
      .map((q) => COMPETENCE_CODE[q.value])
      .filter((c): c is number => typeof c === "number"),
    licenseBase: toNumber(v.LicenseBase),
    licenseYear: toNumber(v.LicenseYear),

    workExperience: toNumber(input.experienceYears),
    activeProjectCount: toNumber(input.activeProjects),
    experienceSummery: input.summary.trim(),

    traineSalary: toNumber(input.salary),
    traineInsurnce: input.insurance === "social",
    traineHoursByWeek: toNumber(input.weeklyHours),
    traineCertificate: input.traineeCertificate,

    acceptanceCapacity: input.payloadTotalCapacity,
    assignedCapacity: toNumber(input.allocatedCapacity),
    minHoursByMonth: toNumber(input.minMonthlyHours),

    userId: backend?.userId ?? EMPTY_GUID,
  };
}