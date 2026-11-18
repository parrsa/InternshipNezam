import { toGregorian, toJalaali } from "jalaali-js";

const ISO_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})$/;
const pad = (n: number) => String(n).padStart(2, "0");

export const toEnglishDigits = (v: string) =>
    v
        .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
        .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

export function toISODate(date: Date): string {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function isValidISODate(value: string): boolean {
    const match = ISO_DATE_REGEX.exec(value);
    if (!match) return false;
    const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
    const date = new Date(Date.UTC(year, month - 1, day));
    return (
        date.getUTCFullYear() === year &&
        date.getUTCMonth() === month - 1 &&
        date.getUTCDate() === day
    );
}

export function isoToDate(value: string): Date | undefined {
    if (!value || !isValidISODate(value)) return undefined;
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
}

export function getToday(): Date {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
}

export function getYesterday(): Date {
    const date = getToday();
    date.setDate(date.getDate() - 1);
    return date;
}

export function jalaliToISO(jalali?: string | null): string {
    if (!jalali) return "";
    const cleanJalali = toEnglishDigits(String(jalali)).replace(/-/g, "/");
    const [jy, jm, jd] = cleanJalali.split("/").map(Number);
    if (!jy || !jm || !jd) return "";

    // اگر سال کمتر از 1000 بود، احتمالا اشتباه خوانده شده است
    if (jy < 1000) return "";

    const { gy, gm, gd } = toGregorian(jy, jm, jd);
    return `${gy}-${pad(gm)}-${pad(gd)}`;
}

export function isoToJalali(iso?: string | null): string {
    if (!iso) return "";
    const cleanIso = iso.split("T")[0];
    const [y, m, d] = cleanIso.split("-").map(Number);
    if (!y || !m || !d) return "";

    // اگر سال میلادی بود
    const { jy, jm, jd } = toJalaali(y, m, d);
    return `${jy}/${pad(jm)}/${pad(jd)}`;
}

export function ageFromISO(iso: string): number {
    const b = new Date(iso);
    const n = new Date();
    let age = n.getFullYear() - b.getFullYear();
    if (n < new Date(n.getFullYear(), b.getMonth(), b.getDate())) age--;
    return age;
}

/**
 * 🚨 تابع جادویی که هر چیزی رو به ISO میلادی استاندارد تبدیل میکنه
 */
export function normalizeToISO(input: unknown): string {
    if (!input) return "";
    let s = toEnglishDigits(String(input)).trim().split("T")[0];
    s = s.replace(/[\/.]/g, "-"); // یکسان سازی جداکننده ها

    const m = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(s);
    if (!m) return "";

    let [y, mo, d] = [+m[1], +m[2], +m[3]];

    // اگر سال کمتر از ۱۷۰۰ بود، یعنی قطعا تاریخ شمسی است (چون متولد ۱۳۲۴ هستیم)
    if (y < 1700) {
        const g = toGregorian(y, mo, d);
        [y, mo, d] = [g.gy, g.gm, g.gd];
    }
    return `${y}-${pad(mo)}-${pad(d)}`;
}