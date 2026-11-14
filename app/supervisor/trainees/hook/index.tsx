import { toGregorian, toJalaali } from "jalaali-js";

/* ============================ Helpers ============================ */

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

export const toEnglishDigits = (value: unknown): string =>
    String(value ?? "")
        .replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)))
        .replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)));

const splitFullName = (fullName = "") => {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    return {
        firstName: parts[0] ?? "",
        lastName: parts.slice(1).join(" "),
    };
};

const toNumber = (v: unknown, fallback = 0): number => {
    const cleaned = toEnglishDigits(v).replace(/[^\d.]/g, "");
    if (cleaned === "") return fallback;
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : fallback;
};

/** عدد بک‌اند -> رشتهٔ فرم (۰ و null => خالی) */
const numToField = (v: unknown): string =>
    typeof v === "number" && v > 0 ? String(v) : "";

const pad = (n: number | string) => String(n).padStart(2, "0");

/* ============================ Dates ============================ */

/** شمسی "1353/01/05" یا ISO -> ISO "YYYY-MM-DD" (برای JalaliDatePicker و validation) */
export const toFormDate = (value?: string | null): string => {
    if (!value) return "";
    const v = toEnglishDigits(value).trim();

    if (/^\d{4}-\d{2}-\d{2}/.test(v)) return v.slice(0, 10);

    const m = v.match(/^(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})/);
    if (!m) return "";
    const [jy, jm, jd] = [Number(m[1]), Number(m[2]), Number(m[3])];
    if (jy > 1700) return "";
    const { gy, gm, gd } = toGregorian(jy, jm, jd);
    return `${gy}-${pad(gm)}-${pad(gd)}`;
};

/** ISO یا شمسی -> شمسی "YYYY/MM/DD" با ارقام انگلیسی (برای بک‌اند) */
export const toBackendDate = (value?: string | null): string => {
    if (!value) return "";
    const v = toEnglishDigits(value).trim();

    const iso = v.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (iso) {
        const { jy, jm, jd } = toJalaali(
            Number(iso[1]),
            Number(iso[2]),
            Number(iso[3])
        );
        return `${jy}/${pad(jm)}/${pad(jd)}`;
    }

    const j = v.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})/);
    if (j) return `${j[1]}/${pad(j[2])}/${pad(j[3])}`;

    return "";
};

/* ============ Maps ============ */
/* ⚠️ با بک‌اند تأیید کنید؛ اگر enum از ۰ شروع می‌شود فقط اینجا عوض کنید */

export const COMPETENCE_ID_TO_VALUE: Record<number, string> = {
    1: "design",
    2: "supervision",
    3: "execution",
};
export const VALUE_TO_COMPETENCE_ID: Record<string, number> = {
    design: 1,
    supervision: 2,
    execution: 3,
};
export const FIELD_ID_TO_VALUE: Record<number, string> = {
    1: "civil",
    2: "architecture",
    3: "electrical",
    4: "mechanical",
    5: "surveying",
};
export const VALUE_TO_FIELD_ID: Record<string, number> = {
    civil: 1,
    architecture: 2,
    electrical: 3,
    mechanical: 4,
    surveying: 5,
};

/* ============ Backend -> Form ============ */

export interface PersonalInfoFormValues {
    FullName: string;
    CompanyName: string;
    LicenseNumber: string;
    NationalCode: string;
    Birthday: string; // ISO
    Birthplace: string;
    PhoneNumber: string;
}

export const realInfoToFormValues = (
    data?: any | null
): PersonalInfoFormValues => {
    if (!data) {
        return {
            FullName: "",
            CompanyName: "",
            LicenseNumber: "",
            NationalCode: "",
            Birthday: "",
            Birthplace: "",
            PhoneNumber: "",
        };
    }
    return {
        FullName: `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim(),
        CompanyName: "",
        LicenseNumber: data.licenseNumber ?? "",
        NationalCode: data.nationalCode ?? "",
        Birthday: toFormDate(data.birthDate),
        Birthplace: data.birthPlace ?? "",
        PhoneNumber: data.phoneNumber ?? "",
    };
};

export interface LicenseStatusFromBackend {
    fields: { value: string; active: boolean }[];
    qualifications: { value: string; active: boolean }[];
    experienceYears: string;
    activeProjects: string;
    summary: string;
}

export const realInfoToLicenseStatus = (
    data?: any | null
): LicenseStatusFromBackend => {
    if (!data) {
        return {
            fields: [],
            qualifications: [],
            experienceYears: "",
            activeProjects: "",
            summary: "",
        };
    }

    const fieldValue = FIELD_ID_TO_VALUE[data.field as number];
    const fields = fieldValue ? [{ value: fieldValue, active: true }] : [];

    const qualifications = ((data.competenceList ?? []) as number[])
        .map((id: number) => COMPETENCE_ID_TO_VALUE[id])
        .filter((v): v is string => !!v)
        .map((value) => ({ value, active: true }));

    return {
        fields,
        qualifications,
        experienceYears: numToField(data.workExperience),
        activeProjects: numToField(data.activeProjectCount),
        summary: data.experienceSummery ?? "",
    };
};

export interface RegistrationConditionsFromBackend {
    salary: string;
    insurance: "social" | "none";
    weeklyHours: string;
    traineeCertificate: boolean;
}

export const realInfoToRegistrationConditions = (
    data?: any | null
): RegistrationConditionsFromBackend => {
    if (!data) {
        return {
            salary: "",
            insurance: "none",
            weeklyHours: "",
            traineeCertificate: false,
        };
    }
    return {
        salary: numToField(data.traineSalary),
        insurance: data.traineInsurnce ? "social" : "none",
        weeklyHours: numToField(data.traineHoursByWeek),
        traineeCertificate: !!data.traineCertificate, // یک e
    };
};

export interface CommitmentFromBackend {
    displayTotalCapacity: number;
    payloadTotalCapacity: number;
    allocatedCapacity: string;
    minMonthlyHours: string;
}

export const realInfoToCommitment = (
    data?: any | null,
    fallbackCapacity = 5
): CommitmentFromBackend => {
    const backendCapacity = Number(data?.acceptanceCapacity) || 0;
    const total = backendCapacity > 0 ? backendCapacity : fallbackCapacity;
    return {
        displayTotalCapacity: total,
        payloadTotalCapacity: total,
        allocatedCapacity: numToField(data?.assignedCapacity),
        minMonthlyHours: numToField(data?.minHoursByMonth),
    };
};

/* ============ Form -> Payload ============ */

export interface BuildPayloadInput {
    formValues: {
        FullName?: string;
        CompanyName?: string;
        LicenseNumber?: string;
        NationalCode?: string;
        Birthday?: string; // ISO
        Birthplace?: string;
        PhoneNumber?: string;
    };
    fields: { value: string; active?: boolean }[];
    qualifications: { value: string; active?: boolean }[];
    experienceYears: string | number;
    activeProjects: string | number;
    summary: string;
    salary: string | number;
    insurance: "social" | "none";
    weeklyHours: string | number;
    payloadTotalCapacity: string | number;
    allocatedCapacity: string | number;
    minMonthlyHours: string | number;
    traineeCertificate: boolean;
    backend?: any | null;
}

const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";

export const buildSupervisorRealPayload = ({
    formValues,
    fields,
    qualifications,
    experienceYears,
    activeProjects,
    summary,
    salary,
    insurance,
    weeklyHours,
    payloadTotalCapacity,
    allocatedCapacity,
    minMonthlyHours,
    traineeCertificate,
    backend,
}: BuildPayloadInput): any => {
    const { firstName, lastName } = splitFullName(
        formValues.FullName || formValues.CompanyName || ""
    );

    const activeFields = fields.filter((f) => f.active !== false);
    const activeQualifications = qualifications.filter(
        (q) => q.active !== false
    );

    return {
        fldMemberId: backend?.fldMemberId ?? 0,
        memberId: backend?.memberId ?? EMPTY_GUID,
        id: backend?.id ?? 0,
        firstName,
        lastName,
        nationalCode: toEnglishDigits(formValues.NationalCode).trim(),
        licenseNumber: toEnglishDigits(formValues.LicenseNumber).trim(),
        phoneNumber: toEnglishDigits(formValues.PhoneNumber).trim(),
        birthDate: toBackendDate(formValues.Birthday),
        birthPlace: formValues.Birthplace ?? "",
        nezamRegisterCode: backend?.nezamRegisterCode ?? "",
        address: backend?.address ?? "",
        competenceList: activeQualifications
            .map((q) => VALUE_TO_COMPETENCE_ID[q.value])
            .filter((v): v is number => typeof v === "number"),
        field: VALUE_TO_FIELD_ID[activeFields[0]?.value ?? ""] ?? 0,
        licenseBase: backend?.licenseBase ?? 0,
        workExperience: toNumber(experienceYears),
        activeProjectCount: toNumber(activeProjects),
        licenseYear: backend?.licenseYear ?? 0,
        experienceSummery: summary,
        traineSalary: toNumber(salary),
        traineInsurnce: insurance === "social",
        traineHoursByWeek: toNumber(weeklyHours),
        traineCertificate: !!traineeCertificate, // یک e
        acceptanceCapacity: toNumber(payloadTotalCapacity),
        assignedCapacity: toNumber(allocatedCapacity),
        minHoursByMonth: toNumber(minMonthlyHours),
        userId: backend?.userId ?? EMPTY_GUID,
    };
};