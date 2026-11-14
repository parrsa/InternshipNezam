// import * as Yup from "yup";
// import { ageFromISO, isoToJalali, isValidISODate, jalaliToISO, toISODate } from "@/lib/date-utils";

// export interface FormValues {
//     firstName: string;
//     lastName: string;
//     nezamRegisterNo: string;
//     nationalCode: string;
//     birthDate: string; // ISO میلادی
//     age: string;
//     phoneNumber: string;
//     birthPlace: string;
//     address: string;
//     degree: string;
//     field: string;
//     university: string;
//     competence: string;
//     haveLicense: boolean;
//     base: string;
//     licenseNumber: string;
//     accepted: boolean;
// }

// export function buildInitialValues(t: any): FormValues {
//     const birthISO = jalaliToISO(t?.birthDate);
//     return {
//         firstName: t?.firstName ?? "",
//         lastName: t?.lastName ?? "",
//         nezamRegisterNo: t?.nezamRegisterNo ?? "",
//         nationalCode: t?.nationalCode ?? "",
//         birthDate: birthISO,
//         age: birthISO ? String(ageFromISO(birthISO)) : "",
//         phoneNumber: t?.phoneNumber ?? "",
//         birthPlace: "",
//         address: t?.address ?? "",
//         degree: t?.degree != null ? String(t.degree) : "",
//         field: t?.field != null ? String(t.field) : "",
//         university: "",
//         competence: t?.competences?.length ? String(t.competences[0]) : "",
//         haveLicense: t?.haveLicense ?? false,
//         base: t?.base ? String(t.base) : "",
//         licenseNumber: t?.licenseNumber ?? "",
//         accepted: false,
//     };
// }

// export const validationSchema = Yup.object({
//     firstName: Yup.string().required("نام الزامی است"),
//     lastName: Yup.string().required("نام خانوادگی الزامی است"),
//     nezamRegisterNo: Yup.string().required("شماره عضویت الزامی است"),
//     nationalCode: Yup.string()
//         .matches(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد")
//         .required("کد ملی الزامی است"),
//     birthDate: Yup.string()
//         .required("تاریخ تولد الزامی است")
//         .test("is-past-date", "تاریخ تولد باید قبل از امروز باشد", (value) => {
//             if (!value) return true;
//             return isValidISODate(value) && value < toISODate(new Date());
//         }),
//     age: Yup.number()
//         .typeError("سن باید عدد باشد")
//         .positive("سن معتبر نیست")
//         .required("سن الزامی است"),
//     phoneNumber: Yup.string()
//         .matches(/^09\d{9}$/, "شماره تماس معتبر نیست")
//         .required("شماره تماس الزامی است"),
//     address: Yup.string().required("نشانی الزامی است"),
//     accepted: Yup.boolean().oneOf([true], "پذیرش تعهدنامه الزامی است"),
// });

// export function buildPayload(v: any, t: any) {
//     const originalFirst = t?.competences?.length ? String(t.competences[0]) : "";
//     const competences =
//         v.competence === "" ? [] : v.competence === originalFirst ? t.competences : [Number(v.competence)];

//     return {
//         fldMemberId: t.fldMemberId ?? 0,
//         memberId: t.memberId,
//         id: t.id ?? 0,
//         userId: t.userId,
//         requestNo: t.requestNo ?? "",
//         firstName: v.firstName.trim(),
//         lastName: v.lastName.trim(),
//         nationalCode: v.nationalCode,
//         nezamRegisterNo: v.nezamRegisterNo,
//         phoneNumber: v.phoneNumber,
//         birthDate: isoToJalali(v.birthDate),
//         address: v.address,
//         degree: Number(v.degree),
//         field: Number(v.field),
//         duration: t.duration ?? 1,
//         haveLicense: v.haveLicense,
//         competences,
//         base: v.haveLicense && v.base ? Number(v.base) : 0,
//         licenseNumber: v.haveLicense ? v.licenseNumber : "",
//         licenseYear: t.licenseYear ?? 0,
//     };
// }
import * as Yup from "yup";
import { ageFromISO, isoToJalali, isValidISODate, jalaliToISO, toISODate } from "@/lib/date-utils";

// فقط فیلدهایی که بک‌اند می‌گیره + accepted (فقط UI)
export interface FormValues {
    firstName: string;
    lastName: string;
    nezamRegisterNo: string;
    nationalCode: string;
    birthDate: string; // ISO میلادی
    age: string;       // فقط برای نمایش/اعتبارسنجی، به بک‌اند نمی‌ره
    phoneNumber: string;
    address: string;
    degree: string;        // "" = انتخاب نشده, "1".."4"
    field: string;         // "" = انتخاب نشده, "1","2","4","5"
    competences: string[]; // آرایه انتخاب‌شده‌ها, "1".."3"
    haveLicense: boolean;
    base: string;          // "" = انتخاب نشده, "1".."5"
    licenseNumber: string;
    licenseYear: string;   // "" = انتخاب نشده, "1300".."1500"
    accepted: boolean;     // فقط UI، به بک‌اند نمی‌ره
}

// ─────────────────────────── Initial Values ───────────────────────────

export function buildInitialValues(t: any): FormValues {
    const birthISO = jalaliToISO(t?.birthDate);

    const degreeStr =
        t?.degree != null && Number(t.degree) > 0 ? String(t.degree) : "";

    const fieldStr =
        t?.field != null && Number(t.field) > 0 ? String(t.field) : "";

    const baseStr =
        t?.base != null && Number(t.base) > 0 ? String(t.base) : "";

    const licenseYearStr =
        t?.licenseYear != null && Number(t.licenseYear) >= 1300
            ? String(t.licenseYear)
            : "";

    // competences آرایه است — همه اعضای معتبر رو نگه دار
    const competencesArr: string[] = Array.isArray(t?.competences)
        ? t.competences
              .map((c: any) => Number(c))
              .filter((n: number) => n > 0)
              .map((n: number) => String(n))
        : [];

    return {
        firstName: t?.firstName ?? "",
        lastName: t?.lastName ?? "",
        nezamRegisterNo: t?.nezamRegisterNo ?? "",
        nationalCode: t?.nationalCode ?? "",
        birthDate: birthISO,
        age: birthISO ? String(ageFromISO(birthISO)) : "",
        phoneNumber: t?.phoneNumber ?? "",
        address: t?.address ?? "",
        degree: degreeStr,
        field: fieldStr,
        competences: competencesArr,
        haveLicense: t?.haveLicense ?? false,
        base: baseStr,
        licenseNumber: t?.licenseNumber ?? "",
        licenseYear: licenseYearStr,
        accepted: false,
    };
}

// ─────────────────────────── Validation ───────────────────────────

export const validationSchema = Yup.object({
    firstName: Yup.string().required("نام الزامی است"),
    lastName: Yup.string().required("نام خانوادگی الزامی است"),
    nezamRegisterNo: Yup.string().required("شماره عضویت الزامی است"),
    nationalCode: Yup.string()
        .matches(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد")
        .required("کد ملی الزامی است"),
    birthDate: Yup.string()
        .required("تاریخ تولد الزامی است")
        .test("is-past-date", "تاریخ تولد باید قبل از امروز باشد", (value) => {
            if (!value) return true;
            return isValidISODate(value) && value < toISODate(new Date());
        }),
    age: Yup.number()
        .typeError("سن باید عدد باشد")
        .positive("سن معتبر نیست")
        .required("سن الزامی است"),
    phoneNumber: Yup.string()
        .matches(/^09\d{9}$/, "شماره تماس معتبر نیست")
        .required("شماره تماس الزامی است"),
    address: Yup.string().required("نشانی الزامی است"),

    degree: Yup.string().required("مقطع تحصیلی را انتخاب کنید"),
    field: Yup.string().required("رشته تحصیلی را انتخاب کنید"),
    competences: Yup.array()
        .of(Yup.string())
        .min(1, "حداقل یک صلاحیت را انتخاب کنید")
        .required("صلاحیت موردنظر را انتخاب کنید"),

    haveLicense: Yup.boolean(),

    base: Yup.string().when("haveLicense", {
        is: true,
        then: (s) => s.required("پایه صلاحیت را انتخاب کنید"),
    }),

    licenseNumber: Yup.string().when("haveLicense", {
        is: true,
        then: (s) => s.required("شماره پروانه الزامی است"),
    }),

    licenseYear: Yup.string().when("haveLicense", {
        is: true,
        then: (s) =>
            s
                .required("سال صدور پروانه الزامی است")
                .test("is-valid-year", "سال باید بین ۱۳۰۰ تا ۱۵۰۰ باشد", (val) => {
                    if (!val) return false;
                    const n = Number(val);
                    return Number.isFinite(n) && n >= 1300 && n <= 1500;
                }),
    }),

    accepted: Yup.boolean().oneOf([true], "پذیرش تعهدنامه الزامی است"),
});

// ─────────────────────────── Payload ───────────────────────────

export function buildPayload(v: FormValues, t: any) {
    // licenseYear: فقط اگر پروانه داره و سال معتبره → عدد، وگرنه null
    let licenseYear: number | null = null;
    if (v.haveLicense && v.licenseYear) {
        const n = Number(v.licenseYear);
        if (Number.isFinite(n) && n >= 1300 && n <= 1500) {
            licenseYear = n;
        }
    }

    // competences: آرایه اعداد
    const competences = Array.isArray(v.competences)
        ? v.competences
              .map((c) => Number(c))
              .filter((n) => n > 0)
        : [];

    return {
        fldMemberId: t.fldMemberId ?? 0,
        memberId: t.memberId,
        id: t.id ?? 0,
        userId: t.userId,
        requestNo: t.requestNo ?? null,     // ← null (نه "")
        firstName: v.firstName.trim(),
        lastName: v.lastName.trim(),
        nationalCode: v.nationalCode,
        nezamRegisterNo: v.nezamRegisterNo,
        phoneNumber: v.phoneNumber,
        birthDate: isoToJalali(v.birthDate),
        address: v.address,
        degree: v.degree ? Number(v.degree) : 0,
        field: v.field ? Number(v.field) : 0,
        duration: t.duration ?? 1,
        haveLicense: v.haveLicense,
        competences,
        base: v.haveLicense && v.base ? Number(v.base) : 0,
        licenseNumber: v.haveLicense ? v.licenseNumber : "",
        licenseYear,
        // ⚠️ university, birthPlace, age اصلاً فرستاده نمی‌شن چون بک‌اند نمی‌گیره
    };
}