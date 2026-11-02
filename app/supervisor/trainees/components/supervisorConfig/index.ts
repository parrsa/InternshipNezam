export type UserType = "User" | "legal";

/** ظرفیت کل پذیرش کارآموز؛ توسط سازمان تعیین می‌شود و سرپرست نمی‌تواند تغییرش دهد */
export const TOTAL_CAPACITY_BY_USER_TYPE: Record<UserType, number> = {
  User: 5,
  legal: 20,
};