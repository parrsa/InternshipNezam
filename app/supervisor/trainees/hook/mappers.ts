// app/supervisor/hook/mappers.ts

import type { RealSupervisorInfoResponse } from "@/core/services/supervisor/api";
import type { Item } from "../components/licenseStatus";

type BackendData = RealSupervisorInfoResponse["data"];

/* ============ Map کدهای عددی بک‌اند ↔ value فرم ============ */
// ⚠️ این‌ها رو با جدول واقعی بک‌اند چک کن
const FIELD_CODE_TO_VALUE: Record<number, string> = {
    1: "civil",
    2: "architecture",
    3: "electrical",
    4: "mechanical",
    5: "surveying",
};

const COMPETENCE_CODE_TO_VALUE: Record<number, string> = {
    1: "design",
    2: "supervision",
    3: "execution",
};

/* ============ Helpers ============ */

const toEnglishDigits = (value: string) =>
    value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));

/** "1324/01/01" | "1324-01-01" | ISO → ISO "YYYY-MM-DD" */
function toISO(jalali: string | null | undefined): string {
    if (!jalali) return "";
    if (/^\d{4}-\d{2}-\d{2}/.test(jalali)) return jalali;
    const parts = toEnglishDigits(jalali).split(/[\/\-]/);
    if (parts.length !== 3) return "";
    const [y, m, d] = parts;
    return `${y.padStart(4, "0")}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

/* ============ Backend → Form ============ */

export function realInfoToFormValues(backend: BackendData | null) {
    if (!backend) return null;
    return {
        FullName: [backend.firstName, backend.lastName]
            .filter(Boolean)
            .join(" ")
            .trim(),
        CompanyName: "",
        LicenseNumber: backend.licenseNumber ?? "",
        NationalCode: backend.nationalCode ?? "",
        Birthday: toISO(backend.birthDate),
        Birthplace: backend.birthPlace ?? "",
        PhoneNumber: backend.phoneNumber ?? "",
    };
}

export function realInfoToLicenseStatus(backend: BackendData | null) {
    if (!backend) {
        return {
            fields: [] as Item[],
            qualifications: [] as Item[],
            experienceYears: "",
            activeProjects: "",
            summary: "",
        };
    }

    const fieldValue = FIELD_CODE_TO_VALUE[backend.field];
    const fields: Item[] = fieldValue
        ? [{ value: fieldValue, active: true }]
        : [];

    const qualifications: Item[] = (backend.competenceList ?? [])
        .map((code: any) => COMPETENCE_CODE_TO_VALUE[code])
        .filter(Boolean)
        .map((value: any) => ({ value, active: true }));

    return {
        fields,
        qualifications,
        experienceYears: backend.workExperience
            ? String(backend.workExperience)
            : "",
        activeProjects: backend.activeProjectCount
            ? String(backend.activeProjectCount)
            : "",
        summary: backend.experienceSummery ?? "",
    };
}

export function realInfoToRegistrationConditions(backend: BackendData | null) {
    if (!backend) {
        return {
            salary: "",
            insurance: "none" as const,
            weeklyHours: "",
            traineeCertificate: false,
        };
    }
    return {
        salary: backend.traineSalary ? String(backend.traineSalary) : "",
        insurance: backend.traineInsurnce
            ? ("social" as const)
            : ("none" as const),
        weeklyHours: backend.traineHoursByWeek
            ? String(backend.traineHoursByWeek)
            : "",
        traineeCertificate: Boolean(backend.traineCertificate),
    };
}

export function realInfoToCommitment(
    backend: BackendData | null,
    totalCapacityFallback?: number
) {
    const displayTotalCapacity =
        backend?.acceptanceCapacity || totalCapacityFallback || 0;

    return {
        displayTotalCapacity,
        payloadTotalCapacity: displayTotalCapacity,
        allocatedCapacity: backend?.assignedCapacity
            ? String(backend.assignedCapacity)
            : "",
        minMonthlyHours: backend?.minHoursByMonth
            ? String(backend.minHoursByMonth)
            : "",
    };
}

/* ============ Form → Payload ============ */

function valueToFieldCode(value?: string): number {
    if (!value) return 0;
    const entry = Object.entries(FIELD_CODE_TO_VALUE).find(
        ([, v]) => v === value
    );
    return entry ? Number(entry[0]) : 0;
}

function valueToCompetenceCode(value?: string): number | undefined {
    if (!value) return undefined;
    const entry = Object.entries(COMPETENCE_CODE_TO_VALUE).find(
        ([, v]) => v === value
    );
    return entry ? Number(entry[0]) : undefined;
}

export function buildSupervisorRealPayload(args: {
    formValues: any;
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
    backend: BackendData | null;
}) {
    const {
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
    } = args;

    const fullName = (formValues.FullName ?? "").trim().split(/\s+/);
    const firstName = fullName[0] ?? "";
    const lastName = fullName.slice(1).join(" ") ?? "";

    return {
        fldMemberId: backend?.fldMemberId ?? 0,
        memberId: backend?.memberId ?? "00000000-0000-0000-0000-000000000000",
        id: backend?.id ?? 0,
        userId: backend?.userId ?? "00000000-0000-0000-0000-000000000000",

        firstName,
        lastName,
        nationalCode: formValues.NationalCode ?? "",
        licenseNumber: formValues.LicenseNumber ?? "",
        phoneNumber: formValues.PhoneNumber ?? "",
        birthDate: formValues.Birthday ?? "",
        birthPlace: formValues.Birthplace || null,
        address: backend?.address ?? "",
        nezamRegisterCode: backend?.nezamRegisterCode ?? "",

        licenseBase: backend?.licenseBase ?? 1,
        licenseYear: backend?.licenseYear ?? 0,

        field: valueToFieldCode(fields[0]?.value),
        competenceList: qualifications
            .map((q) => valueToCompetenceCode(q.value))
            .filter((n): n is number => n !== undefined),

        workExperience: Number(experienceYears) || 0,
        activeProjectCount: Number(activeProjects) || 0,
        experienceSummery: summary || null,

        traineSalary: Number(salary) || 0,
        traineInsurnce: insurance === "social",
        traineHoursByWeek: Number(weeklyHours) || 0,
        traineeCertificate,

        acceptanceCapacity: payloadTotalCapacity,
        assignedCapacity: Number(allocatedCapacity) || 0,
        minHoursByMonth: Number(minMonthlyHours) || 0,
    };
}