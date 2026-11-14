const ISO_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})$/;

const pad = (n: number) => String(n).padStart(2, "0");

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

import { toGregorian } from "jalaali-js";

export function jalaliToISO(jalali?: string | null): string {
    if (!jalali) return "";
    const [jy, jm, jd] = jalali.split("/").map(Number);
    if (!jy || !jm || !jd) return "";
    const { gy, gm, gd } = toGregorian(jy, jm, jd);
    return `${gy}-${String(gm).padStart(2, "0")}-${String(gd).padStart(2, "0")}`;
}

export function ageFromISO(iso: string): number {
    const b = new Date(iso);
    const n = new Date();
    let age = n.getFullYear() - b.getFullYear();
    if (n < new Date(n.getFullYear(), b.getMonth(), b.getDate())) age--;
    return age;
}

import { toJalaali } from "jalaali-js";

export function isoToJalali(iso?: string | null): string {
    if (!iso) return "";
    const [y, m, d] = iso.split("-").map(Number);
    if (!y || !m || !d) return "";
    const { jy, jm, jd } = toJalaali(y, m, d);
    return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
}