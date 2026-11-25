// supervisorConfig.ts
export type UserType = "User" | "legal";

export const TOTAL_CAPACITY_BY_USER_TYPE: Record<UserType, number> = {
  User: 3,
  legal: 5,
};

// ✅ مطابق FieldEnum بک‌اند
export const FIELD_ENUM = {
  1: "مهندسی مکانیک",
  2: "مهندسی برق",
  4: "مهندسی معماری",
  5: "مهندسی عمران",
  6: "شهرسازی",
  7: "نقشه‌برداری",
  8: "ترافیک",
  9: "جوش",
  10: "خاک و پی",
} as const;

// ✅ مطابق CompetenceEnum بک‌اند
export const COMPETENCE_ENUM = {
  0: "بدون صلاحیت",
  1: "نظارت",
  2: "طراحی",
  3: "مجری",
  4: "آزمایشگاه",
} as const;

// ✅ مطابق BaseEnum بک‌اند
export const BASE_ENUM = {
  0: "بدون پایه",
  1: "ارشد",
  2: "پایه ۱",
  3: "پایه ۲",
  4: "پایه ۳",
} as const;