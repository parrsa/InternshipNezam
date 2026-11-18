// ============================================================
// همه Enumهای سامانه کارآموزی — مطابق ApprenticeshipCore.Enums
// ============================================================

// ---------- AppSettingTypeEnum ----------
export const AppSettingTypeEnum = {
    TraineeCost: 0,
    TraineeActive: 1,
    TraineeDuration: 2,
    RealSupervisorCapacity: 3,
    LegalSupervisorCapacity: 4,
} as const;
export type AppSettingTypeEnum =
    (typeof AppSettingTypeEnum)[keyof typeof AppSettingTypeEnum];

// ---------- BaseEnum ----------
export const BaseEnum = {
    None: 0,
    Arshad: 1,
    Base1: 2,
    Base2: 3,
    Base3: 4,
} as const;
export type BaseEnum = (typeof BaseEnum)[keyof typeof BaseEnum];

export const BASE_LABELS: Record<number, string> = {
    0: "بدون پایه",
    1: "ارشد",
    2: "پایه ۱",
    3: "پایه ۲",
    4: "پایه ۳",
};

// ---------- CompetenceEnum ----------
export const CompetenceEnum = {
    None: 0,
    Observer: 1,
    Designer: 2,
    Builder: 3,
    Labratory: 4,
} as const;
export type CompetenceEnum = (typeof CompetenceEnum)[keyof typeof CompetenceEnum];

export const COMPETENCE_LABELS: Record<number, string> = {
    0: "بدون صلاحیت",
    1: "نظارت",
    2: "طراحی",
    3: "مجری",
    4: "آزمایشگاه",
};

// ---------- DegreeEnum ----------
export const DegreeEnum = {
    None: 0,
    BE: 2,
    MBE: 3,
    PHD: 4,
} as const;
export type DegreeEnum = (typeof DegreeEnum)[keyof typeof DegreeEnum];

export const DEGREE_LABELS: Record<number, string> = {
    0: "نامشخص",
    2: "کارشناسی",
    3: "کارشناسی ارشد",
    4: "دکتری",
};

// ---------- FieldEnum ----------
export const FieldEnum = {
    None: 0,
    Mechanic: 1,
    Electric: 2,
    Architecture: 4,
    Civil: 5,
    Urban: 6,
    Mapping: 7,
    Trafic: 8,
    Weld: 9,
    KhakVaPay: 10,
} as const;
export type FieldEnum = (typeof FieldEnum)[keyof typeof FieldEnum];

export const FIELD_LABELS: Record<number, string> = {
    0: "نامشخص",
    1: "مهندسی مکانیک",
    2: "مهندسی برق",
    4: "مهندسی معماری",
    5: "مهندسی عمران",
    6: "شهرسازی",
    7: "نقشه‌برداری",
    8: "ترافیک",
    9: "جوش",
    10: "خاک و پی",
};

// ---------- InternshipStatusEnum ----------
export const InternshipStatusEnum = {
    Draft: 1,
    Active: 2,
    Closed: 3,
} as const;

// ---------- InternshipTypeEnum ----------
export const InternshipTypeEnum = {
    AmozeshMaharati: 1,
    Kargah: 2,
    Seminar: 3,
} as const;

// ---------- MemberTypeEnum ----------
export const MemberTypeEnum = {
    Undefined: 0,
    System: 1,
    Trainee: 2,
    RealSupervisor: 3,
    LegalSupervisor: 4,
    Expert: 5,
} as const;

// ---------- MonthEnum ----------
export const MonthEnum = {
    Farvardin: 1,
    Ordibehesht: 2,
    Khordad: 3,
    Tir: 4,
    Mordad: 5,
    Shahrivar: 6,
    Mehr: 7,
    Aban: 8,
    Azar: 9,
    Day: 10,
    Bahman: 11,
    Esfand: 12,
} as const;

export const MONTH_LABELS: Record<number, string> = {
    1: "فروردین",
    2: "اردیبهشت",
    3: "خرداد",
    4: "تیر",
    5: "مرداد",
    6: "شهریور",
    7: "مهر",
    8: "آبان",
    9: "آذر",
    10: "دی",
    11: "بهمن",
    12: "اسفند",
};

// ---------- ProgressOrderEnum ----------
export const ProgressOrderEnum = {
    Registration: 0,
    PaidPrice: 10,
    SupervisorSelect: 20,
    SendRequestToSupervisor: 30,
    ConfirmedBySupervisor: 40,
    ConfirmedByOrganization: 50,
    Finished: 60,
} as const;
export type ProgressOrderEnum =
    (typeof ProgressOrderEnum)[keyof typeof ProgressOrderEnum];

// ---------- ProjectTypeEnum ----------
export const ProjectTypeEnum = {
    Residential: 1,
    Commercial: 2,
    Industrial: 3,
} as const;

export const PROJECT_TYPE_LABELS: Record<number, string> = {
    1: "مسکونی",
    2: "تجاری",
    3: "صنعتی",
};

// ---------- SupervisorTraineeProgressStatusEnum ----------
export const SupervisorTraineeProgressStatusEnum = {
    Pending: 0,
    RejectedBySupervisor: 1,
    RejectedByExpert: 2,
    ConfirmedBySupervisor: 3,
    ConfirmedByExpert: 4,
} as const;

// ---------- TargetGroupEnum ----------
export const TargetGroupEnum = {
    Trainees: 1,
    Engineers: 2,
    Students: 3,
} as const;

// ---------- TraineeReportStatusEnum ----------
export const TraineeReportStatusEnum = {
    Draft: 0,
    AwaitingForReview: 1,
    Revision: 2,
    Approved: 3,
} as const;

// ---------- TransactionReferenceTypeEnum ----------
export const TransactionReferenceTypeEnum = {
    Deposit: 0,
    OrderPayment: 1,
    Refund: 2,
    AdminAdjustment: 3,
    Withdrawal: 4,
} as const;

// ---------- TransactionTypeEnum ----------
export const TransactionTypeEnum = {
    Credit: 0,
    Debit: 1,
} as const;

// ---------- WalletStatusEnum ----------
export const WalletStatusEnum = {
    Active: 0,
    Frozen: 1,
    Closed: 2,
} as const;

// ============================================================
// Helper: تبدیل label به value و برعکس
// ============================================================

export function toOptions<T extends Record<number, string>>(labels: T) {
    return Object.entries(labels).map(([value, label]) => ({
        value,
        label,
    }));
}