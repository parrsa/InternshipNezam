// "use client";

// import { useEffect, useMemo, useRef } from "react";
// import { useSearchParams } from "next/navigation";
// import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
// import { useVerifyPaymentTrainee } from "@/core/services/Trainee/mutate";

// export default function PaymentVerifyPage() {
//     const searchParams = useSearchParams();
//     const { mutate, isPending, isSuccess, data: verifyResult, isError } = useVerifyPaymentTrainee();
//     const called = useRef(false);

//     // ساخت payload از URL
//     const payload = useMemo(() => {
//         const get = (key: string) => searchParams.get(key) ?? "";

//         return {
//             terminalId: Number(get("terminalid")) || 0,
//             invoiceId: get("invoiceid"),
//             amount: Number(get("amount")) || 0,
//             cardnumber: get("cardnumber"),
//             payload: get("payload"),
//             hash: get("hash"),
//             rrn: get("rrn"),
//             traceNumber: get("tracenumber"),
//             digitalReceipt: get("digitalreceipt"),
//             datePaid: get("datepaid"),
//             respCode: get("respcode"),
//             respMsg: get("respmsg"),
//             issuerBan: get("issuerban"),
//         };
//     }, [searchParams]);

//     // فقط یک بار صدا بزن (جلوگیری از double-call در React StrictMode)
//     useEffect(() => {
//         if (called.current) return;
//         called.current = true;
//         mutate(payload);
//     }, [mutate, payload]);

  
//     // ── Error (network) ──
//     if (isError) {
//         return (
//             <ResultCard
//                 success={false}
//                 title="خطا در تأیید پرداخت"
//                 message="ارتباط با سرور برقرار نشد. لطفاً بعداً تلاش کنید."
//             />
//         );
//     }

//     // ── Result ──
//     const isSuccessResult = verifyResult?.isSuccess === true;
//     const isCancelled = payload.respCode === "-1" || payload.respCode === "0";

//     return (
//         <ResultCard
//             success={isSuccessResult}
//             title={
//                 isSuccessResult
//                     ? "پرداخت با موفقیت انجام شد"
//                     : isCancelled
//                       ? "پرداخت لغو شد"
//                       : "پرداخت ناموفق بود"
//             }
//             message={
//                 verifyResult?.message ||
//                 payload.respMsg ||
//                 "نتیجه پرداخت دریافت شد."
//             }
//         />
//     );
// }

// // ── کامپوننت کارت نتیجه ──
// function ResultCard({
//     success,
//     title,
//     message,
// }: {
//     success: boolean;
//     title: string;
//     message: string;
// }) {
//     return (
//         <div
//             dir="rtl"
//             className="flex min-h-[60vh] w-full items-center justify-center px-5 py-10"
//         >
//             <div className="w-full max-w-xl rounded-2xl border-2 border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
//                 <div className="mb-6 flex flex-col items-center text-center">
//                     <div
//                         className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
//                             success ? "bg-green-50" : "bg-red-50"
//                         }`}
//                     >
//                         {success ? (
//                             <CheckCircle2 className="h-9 w-9 text-green-600" />
//                         ) : (
//                             <XCircle className="h-9 w-9 text-red-600" />
//                         )}
//                     </div>
//                     <h1 className="mb-2 text-base font-bold text-neutral-900">{title}</h1>
//                     <p className="text-xs text-neutral-500">{message}</p>
//                 </div>

//                 <a
//                     href="/"
//                     className="flex h-11 w-full items-center justify-center rounded-xl bg-neutral-900 text-xs font-semibold text-white transition-colors hover:bg-neutral-800"
//                 >
//                     بازگشت به صفحه اصلی
//                 </a>
//             </div>
//         </div>
//     );
// // }
// "use client";

// import { Suspense, useEffect, useMemo, useRef } from "react";
// import { useSearchParams } from "next/navigation";
// import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
// import { useVerifyPaymentTrainee } from "@/core/services/Trainee/mutate";

// // ── کامپوننت داخلی که useSearchParams را صدا می‌زند ──
// function PaymentVerifyContent() {
//     const searchParams = useSearchParams();
//     const { mutate, isPending, isSuccess, data: verifyResult, isError } = useVerifyPaymentTrainee();
//     const called = useRef(false);

//     // ساخت payload از URL
//     const payload = useMemo(() => {
//         const get = (key: string) => searchParams.get(key) ?? "";

//         return {
//             terminalId: Number(get("terminalid")) || 0,
//             invoiceId: get("invoiceid"),
//             amount: Number(get("amount")) || 0,
//             cardnumber: get("cardnumber"),
//             payload: get("payload"),
//             hash: get("hash"),
//             rrn: get("rrn"),
//             traceNumber: get("tracenumber"),
//             digitalReceipt: get("digitalreceipt"),
//             datePaid: get("datepaid"),
//             respCode: get("respcode"),
//             respMsg: get("respmsg"),
//             issuerBan: get("issuerban"),
//         };
//     }, [searchParams]);

//     // فقط یک بار صدا بزن (جلوگیری از double-call در React StrictMode)
//     useEffect(() => {
//         if (called.current) return;
//         called.current = true;
//         mutate(payload);
//     }, [mutate, payload]);

//     // ── Error (network) ──
//     if (isError) {
//         return (
//             <ResultCard
//                 success={false}
//                 title="خطا در تأیید پرداخت"
//                 message="ارتباط با سرور برقرار نشد. لطفاً بعداً تلاش کنید."
//             />
//         );
//     }

//     // ── Result ──
//     const isSuccessResult = verifyResult?.isSuccess === true;
//     const isCancelled = payload.respCode === "-1" || payload.respCode === "0";

//     return (
//         <ResultCard
//             success={isSuccessResult}
//             title={
//                 isSuccessResult
//                     ? "پرداخت با موفقیت انجام شد"
//                     : isCancelled
//                       ? "پرداخت لغو شد"
//                       : "پرداخت ناموفق بود"
//             }
//             message={
//                 verifyResult?.message ||
//                 payload.respMsg ||
//                 "نتیجه پرداخت دریافت شد."
//             }
//         />
//     );
// }

// // ── کامپوننت صفحه با Suspense ──
// export default function PaymentVerifyPage() {
//     return (
//         <Suspense fallback={<PaymentVerifySkeleton />}>
//             <PaymentVerifyContent />
//         </Suspense>
//     );
// }

// // ── fallback هنگام بارگذاری ──
// function PaymentVerifySkeleton() {
//     return (
//         <div
//             dir="rtl"
//             className="flex min-h-[60vh] w-full items-center justify-center px-5 py-10"
//         >
//             <div className="flex flex-col items-center gap-3">
//                 <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
//                 <p className="text-xs text-neutral-500">در حال بررسی پرداخت...</p>
//             </div>
//         </div>
//     );
// }

// // ── کامپوننت کارت نتیجه ──
// function ResultCard({
//     success,
//     title,
//     message,
// }: {
//     success: boolean;
//     title: string;
//     message: string;
// }) {
//     return (
//         <div
//             dir="rtl"
//             className="flex min-h-[60vh] w-full items-center justify-center px-5 py-10"
//         >
//             <div className="w-full max-w-xl rounded-2xl border-2 border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
//                 <div className="mb-6 flex flex-col items-center text-center">
//                     <div
//                         className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
//                             success ? "bg-green-50" : "bg-red-50"
//                         }`}
//                     >
//                         {success ? (
//                             <CheckCircle2 className="h-9 w-9 text-green-600" />
//                         ) : (
//                             <XCircle className="h-9 w-9 text-red-600" />
//                         )}
//                     </div>
//                     <h1 className="mb-2 text-base font-bold text-neutral-900">{title}</h1>
//                     <p className="text-xs text-neutral-500">{message}</p>
//                 </div>

//                 <a
//                     href="/"
//                     className="flex h-11 w-full items-center justify-center rounded-xl bg-neutral-900 text-xs font-semibold text-white transition-colors hover:bg-neutral-800"
//                 >
//                     بازگشت به صفحه اصلی
//                 </a>
//             </div>
//         </div>
//     );
// }

// "use client";

// import { Suspense, useEffect, useMemo, useRef } from "react";
// import { useSearchParams } from "next/navigation";
// import {
//     CheckCircle2,
//     XCircle,
//     Loader2,
//     Receipt,
//     CreditCard,
//     ArrowLeft,
//     ShieldCheck,
//     AlertTriangle,
// } from "lucide-react";
// import { useVerifyPaymentTrainee } from "@/core/services/Trainee/mutate";

// // ── پیغام‌های استاندارد شاپرک بر اساس respcode ──
// const RESP_CODE_MESSAGES: Record<string, string> = {
//     "-1": "تراکنش توسط کاربر لغو شد.",
//     "0": "تراکنش ناموفق بود.",
// };

// // ── کامپوننت داخلی ──
// function PaymentVerifyContent() {
//     const searchParams = useSearchParams();
//     const { mutate, data: verifyResult, isError } = useVerifyPaymentTrainee();
//     const called = useRef(false);

//     const payload = useMemo(() => {
//         const get = (key: string) => searchParams.get(key) ?? "";
//         return {
//             terminalId: Number(get("terminalid")) || 0,
//             invoiceId: get("invoiceid"),
//             amount: Number(get("amount")) || 0,
//             cardnumber: get("cardnumber"),
//             payload: get("payload"),
//             hash: get("hash"),
//             rrn: get("rrn"),
//             traceNumber: get("tracenumber"),
//             digitalReceipt: get("digitalreceipt"),
//             datePaid: get("datepaid"),
//             respCode: get("respcode"),
//             respMsg: get("respmsg"),
//             issuerBan: get("issuerban"),
//         };
//     }, [searchParams]);

//     useEffect(() => {
//         if (called.current) return;
//         called.current = true;
//         mutate(payload);
//     }, [mutate, payload]);

//     // ── 1️⃣ لغو/ناموفق از روی respCode ──
//     const isCancelled = payload.respCode === "-1" || payload.respCode === "0";
//     if (isCancelled) {
//         return (
//             <ResultScreen
//                 variant="cancelled"
//                 title="پرداخت لغو شد"
//                 message={
//                     payload.respMsg?.trim() ||
//                     RESP_CODE_MESSAGES[payload.respCode] ||
//                     "تراکنش توسط کاربر لغو شد."
//                 }
//                 invoiceId={payload.invoiceId}
//                 amount={payload.amount}
//             />
//         );
//     }

//     // ── 2️⃣ خطای شبکه ──
//     if (isError) {
//         return (
//             <ResultScreen
//                 variant="error"
//                 title="خطا در تأیید پرداخت"
//                 message={
//                     payload.respMsg?.trim() ||
//                     "ارتباط با سرور برقرار نشد. لطفاً بعداً تلاش کنید."
//                 }
//                 invoiceId={payload.invoiceId}
//                 amount={payload.amount}
//             />
//         );
//     }

//     // ── 3️⃣ نتیجه بر اساس پاسخ API ──
//     const isSuccessResult = verifyResult?.isSuccess === true;
//     return (
//         <ResultScreen
//             variant={isSuccessResult ? "success" : "failed"}
//             title={
//                 isSuccessResult
//                     ? "پرداخت با موفقیت انجام شد"
//                     : "پرداخت ناموفق بود"
//             }
//             message={
//                 isSuccessResult
//                     ? verifyResult?.message?.trim() ||
//                       "پرداخت شما با موفقیت ثبت شد."
//                     : payload.respMsg?.trim() ||
//                       verifyResult?.message?.trim() ||
//                       "پرداخت ناموفق بود."
//             }
//             invoiceId={payload.invoiceId}
//             amount={payload.amount}
//         />
//     );
// }

// // ── صفحه با Suspense ──
// export default function PaymentVerifyPage() {
//     return (
//         <Suspense fallback={<PaymentVerifySkeleton />}>
//             <PaymentVerifyContent />
//         </Suspense>
//     );
// }

// // ── Skeleton ──
// function PaymentVerifySkeleton() {
//     return (
//         <div
//             dir="rtl"
//             className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-neutral-50 to-neutral-100 px-4 py-10"
//         >
//             <div className="flex flex-col items-center gap-4">
//                 <div className="relative flex h-20 w-20 items-center justify-center">
//                     <div className="absolute inset-0 animate-ping rounded-full bg-purple-100 opacity-60" />
//                     <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
//                         <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
//                     </div>
//                 </div>
//                 <div className="text-center">
//                     <p className="text-sm font-semibold text-neutral-800">
//                         در حال بررسی پرداخت...
//                     </p>
//                     <p className="mt-1 text-2xs text-neutral-500">
//                         لطفاً صفحه را نبندید
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // ── کارت نتیجه ──
// type Variant = "success" | "failed" | "cancelled" | "error";

// const VARIANT_CONFIG: Record<
//     Variant,
//     {
//         icon: typeof CheckCircle2;
//         iconColor: string;
//         iconBg: string;
//         ringColor: string;
//         badgeBg: string;
//         badgeText: string;
//         badgeLabel: string;
//         buttonClass: string;
//         barClass: string;
//     }
// > = {
//     success: {
//         icon: CheckCircle2,
//         iconColor: "text-green-600",
//         iconBg: "bg-green-50",
//         ringColor: "ring-green-100",
//         badgeBg: "bg-green-50",
//         badgeText: "text-green-700",
//         badgeLabel: "موفق",
//         buttonClass: "bg-neutral-900 hover:bg-neutral-800",
//         barClass: "bg-gradient-to-l from-green-400 to-emerald-500",
//     },
//     failed: {
//         icon: XCircle,
//         iconColor: "text-red-600",
//         iconBg: "bg-red-50",
//         ringColor: "ring-red-100",
//         badgeBg: "bg-red-50",
//         badgeText: "text-red-700",
//         badgeLabel: "ناموفق",
//         buttonClass: "bg-neutral-900 hover:bg-neutral-800",
//         barClass: "bg-gradient-to-l from-red-400 to-rose-500",
//     },
//     cancelled: {
//         icon: AlertTriangle,
//         iconColor: "text-amber-600",
//         iconBg: "bg-amber-50",
//         ringColor: "ring-amber-100",
//         badgeBg: "bg-amber-50",
//         badgeText: "text-amber-700",
//         badgeLabel: "لغو شده",
//         buttonClass: "bg-neutral-900 hover:bg-neutral-800",
//         barClass: "bg-gradient-to-l from-amber-400 to-orange-500",
//     },
//     error: {
//         icon: XCircle,
//         iconColor: "text-red-600",
//         iconBg: "bg-red-50",
//         ringColor: "ring-red-100",
//         badgeBg: "bg-red-50",
//         badgeText: "text-red-700",
//         badgeLabel: "خطا",
//         buttonClass: "bg-neutral-900 hover:bg-neutral-800",
//         barClass: "bg-gradient-to-l from-red-400 to-rose-500",
//     },
// };

// function ResultScreen({
//     variant,
//     title,
//     message,
//     invoiceId,
//     amount,
// }: {
//     variant: Variant;
//     title: string;
//     message: string;
//     invoiceId?: string;
//     amount?: number;
// }) {
//     const cfg = VARIANT_CONFIG[variant];
//     const Icon = cfg.icon;
//     const hasDetails = Boolean(invoiceId) || Boolean(amount);

//     return (
//         <div
//             dir="rtl"
//             className="flex min-h- w-full items-center justify-center  px-4 py-10"
//         >
//             <div className="w-full max-w-md">
//                 <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl shadow-neutral-200/50">
//                     {/* ── نوار رنگی بالای کارت ── */}
//                     <div className={`h-1.5 w-full ${cfg.barClass}`} />

//                     <div className="p-6 sm:p-8">
//                         {/* ── آیکون با حلقه ── */}
//                         <div className="mb-6 flex flex-col items-center text-center">
//                             <div className="relative mb-5">
//                                 <div
//                                     className={`absolute inset-0 rounded-full ${cfg.ringColor} ring-8`}
//                                 />
//                                 <div
//                                     className={`relative flex h-20 w-20 items-center justify-center rounded-full ${cfg.iconBg}`}
//                                 >
//                                     <Icon className={`h-10 w-10 ${cfg.iconColor}`} />
//                                 </div>
//                             </div>

//                             {/* ── بج وضعیت ── */}
//                             <span
//                                 className={`mb-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-2xs font-semibold ${cfg.badgeBg} ${cfg.badgeText}`}
//                             >
//                                 <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                                 {cfg.badgeLabel}
//                             </span>

//                             <h1 className="mb-2 text-base font-bold text-neutral-900">
//                                 {title}
//                             </h1>
//                             <p className="max-w-xs text-xs leading-6 text-neutral-500">
//                                 {message}
//                             </p>
//                         </div>

//                         {/* ── جزئیات تراکنش ── */}
//                         {hasDetails && (
//                             <div className="mb-6 space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4">
//                                 {invoiceId && (
//                                     <div className="flex items-center justify-between">
//                                         <div className="flex items-center gap-2 text-2xs text-neutral-500">
//                                             <Receipt className="h-3.5 w-3.5" />
//                                             <span>شماره فاکتور</span>
//                                         </div>
//                                         <span
//                                             className="font-mono text-xs font-semibold text-neutral-900"
//                                             dir="ltr"
//                                         >
//                                             {invoiceId}
//                                         </span>
//                                     </div>
//                                 )}

//                                 {invoiceId && amount && (
//                                     <div className="h-px w-full bg-neutral-200" />
//                                 )}

//                                 {amount && (
//                                     <div className="flex items-center justify-between">
//                                         <div className="flex items-center gap-2 text-2xs text-neutral-500">
//                                             <CreditCard className="h-3.5 w-3.5" />
//                                             <span>مبلغ تراکنش</span>
//                                         </div>
//                                         <span className="text-xs font-bold text-neutral-900">
//                                             {amount.toLocaleString("fa-IR")}{" "}
//                                             <span className="text-2xs font-normal text-neutral-500">
//                                                 ریال
//                                             </span>
//                                         </span>
//                                     </div>
//                                 )}
//                             </div>
//                         )}

//                         {/* ── دکمه بازگشت ── */}
//                         <a
//                             href="/"
//                             className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold text-white transition-all ${cfg.buttonClass}`}
//                         >
//                             <ArrowLeft className="h-4 w-4" />
//                             بازگشت به صفحه اصلی
//                         </a>

//                         {/* ── فوتر امنیت ── */}
//                         <div className="mt-5 flex items-center justify-center gap-1.5 text-2xs text-neutral-400">
//                             <ShieldCheck className="h-3.5 w-3.5" />
//                             <span>پرداخت امن از طریق درگاه شاپرک</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* ── متن پایین کارت ── */}
//                 <p className="mt-4 text-center text-2xs text-neutral-400">
//                     در صورت وجود هرگونه مشکل با پشتیبانی تماس بگیرید.
//                 </p>
//             </div>
//         </div>
//     );
// }

"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
    CheckCircle2,
    XCircle,
    Loader2,
    Receipt,
    CreditCard,
    ArrowLeft,
    ShieldCheck,
    AlertTriangle,
} from "lucide-react";
import { useVerifyPaymentTrainee } from "@/core/services/Trainee/mutate";

// ── پیغام‌های استاندارد شاپرک بر اساس respcode ──
// respcode = 0 یعنی «موفق»؛ فقط -1 لغو واقعی است.
const RESP_CODE_MESSAGES: Record<string, string> = {
    "-1": "تراکنش توسط کاربر لغو شد.",
};

// ── کامپوننت داخلی ──
function PaymentVerifyContent() {
    const searchParams = useSearchParams();
    const { mutate, data: verifyResult, isError, isPending } =
        useVerifyPaymentTrainee();
    const called = useRef(false);

    const payload = useMemo(() => {
        const get = (key: string) => searchParams.get(key) ?? "";
        return {
            terminalId: Number(get("terminalid")) || 0,
            invoiceId: get("invoiceid"),
            amount: Number(get("amount")) || 0,
            cardnumber: get("cardnumber"),
            payload: get("payload"),
            hash: get("hash"),
            rrn: get("rrn"),
            traceNumber: get("tracenumber"),
            digitalReceipt: get("digitalreceipt"),
            datePaid: get("datepaid"),
            respCode: get("respcode"),
            respMsg: get("respmsg"),
            issuerBan: get("issuerban"),
        };
    }, [searchParams]);

    useEffect(() => {
        if (called.current) return;
        called.current = true;
        mutate(payload);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payload]);

    // ── 1️⃣ لغو واقعی: فقط respCode = -1 ──
    if (payload.respCode === "-1") {
        return (
            <ResultScreen
                variant="cancelled"
                title="پرداخت لغو شد"
                message={
                    payload.respMsg?.trim() ||
                    RESP_CODE_MESSAGES[payload.respCode] ||
                    "تراکنش توسط کاربر لغو شد."
                }
                referenceNo={payload.rrn}
                amount={payload.amount}
            />
        );
    }

    // ── 2️⃣ خطای شبکه (verify API) ──
    if (isError) {
        return (
            <ResultScreen
                variant="error"
                title="خطا در تأیید پرداخت"
                message={
                    payload.respMsg?.trim() ||
                    "ارتباط با سرور برقرار نشد. لطفاً بعداً تلاش کنید."
                }
                referenceNo={payload.rrn}
                amount={payload.amount}
            />
        );
    }

    // ── 3️⃣ در حال انتظار برای پاسخ verify API ──
    if (isPending || !verifyResult) {
        return <PaymentVerifySkeleton />;
    }

    // ── 4️⃣ نتیجهٔ نهایی بر اساس پاسخ API ──
    const isSuccessResult = verifyResult.isSuccess === true;
    return (
        <ResultScreen
            variant={isSuccessResult ? "success" : "failed"}
            title={
                isSuccessResult
                    ? "پرداخت با موفقیت انجام شد"
                    : "پرداخت ناموفق بود"
            }
            message={
                isSuccessResult
                    ? verifyResult.message?.trim() ||
                      payload.respMsg?.trim() ||
                      "پرداخت شما با موفقیت ثبت شد."
                    : verifyResult.message?.trim() ||
                      payload.respMsg?.trim() ||
                      "پرداخت ناموفق بود."
            }
            referenceNo={payload.rrn}
            amount={payload.amount}
        />
    );
}

// ── صفحه با Suspense ──
export default function PaymentVerifyPage() {
    return (
        <Suspense fallback={<PaymentVerifySkeleton />}>
            <PaymentVerifyContent />
        </Suspense>
    );
}

// ── Skeleton / Loading ──
function PaymentVerifySkeleton() {
    return (
        <div
            dir="rtl"
            className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-neutral-50 to-neutral-100 px-4 py-10"
        >
            <div className="flex flex-col items-center gap-4">
                <div className="relative flex h-20 w-20 items-center justify-center">
                    <div className="absolute inset-0 animate-ping rounded-full bg-purple-100 opacity-60" />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
                        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-sm font-semibold text-neutral-800">
                        در حال بررسی پرداخت...
                    </p>
                    <p className="mt-1 text-2xs text-neutral-500">
                        لطفاً صفحه را نبندید
                    </p>
                </div>
            </div>
        </div>
    );
}

// ── کارت نتیجه ──
type Variant = "success" | "failed" | "cancelled" | "error";

const VARIANT_CONFIG: Record<
    Variant,
    {
        icon: typeof CheckCircle2;
        iconColor: string;
        iconBg: string;
        ringColor: string;
        badgeBg: string;
        badgeText: string;
        badgeLabel: string;
        buttonClass: string;
        barClass: string;
    }
> = {
    success: {
        icon: CheckCircle2,
        iconColor: "text-green-600",
        iconBg: "bg-green-50",
        ringColor: "ring-green-100",
        badgeBg: "bg-green-50",
        badgeText: "text-green-700",
        badgeLabel: "موفق",
        buttonClass: "bg-neutral-900 hover:bg-neutral-800",
        barClass: "bg-gradient-to-l from-green-400 to-emerald-500",
    },
    failed: {
        icon: XCircle,
        iconColor: "text-red-600",
        iconBg: "bg-red-50",
        ringColor: "ring-red-100",
        badgeBg: "bg-red-50",
        badgeText: "text-red-700",
        badgeLabel: "ناموفق",
        buttonClass: "bg-neutral-900 hover:bg-neutral-800",
        barClass: "bg-gradient-to-l from-red-400 to-rose-500",
    },
    cancelled: {
        icon: AlertTriangle,
        iconColor: "text-amber-600",
        iconBg: "bg-amber-50",
        ringColor: "ring-amber-100",
        badgeBg: "bg-amber-50",
        badgeText: "text-amber-700",
        badgeLabel: "لغو شده",
        buttonClass: "bg-neutral-900 hover:bg-neutral-800",
        barClass: "bg-gradient-to-l from-amber-400 to-orange-500",
    },
    error: {
        icon: XCircle,
        iconColor: "text-red-600",
        iconBg: "bg-red-50",
        ringColor: "ring-red-100",
        badgeBg: "bg-red-50",
        badgeText: "text-red-700",
        badgeLabel: "خطا",
        buttonClass: "bg-neutral-900 hover:bg-neutral-800",
        barClass: "bg-gradient-to-l from-red-400 to-rose-500",
    },
};

function ResultScreen({
    variant,
    title,
    message,
    referenceNo,
    amount,
}: {
    variant: Variant;
    title: string;
    message: string;
    referenceNo?: string;
    amount?: number;
}) {
    const cfg = VARIANT_CONFIG[variant];
    const Icon = cfg.icon;
    const hasDetails = Boolean(referenceNo) || Boolean(amount);

    return (
        <div
            dir="rtl"
            className="flex min-h-screen w-full items-center justify-center px-4 py-10"
        >
            <div className="w-full max-w-md">
                <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl shadow-neutral-200/50">
                    {/* ── نوار رنگی بالای کارت ── */}
                    <div className={`h-1.5 w-full ${cfg.barClass}`} />

                    <div className="p-6 sm:p-8">
                        {/* ── آیکون با حلقه ── */}
                        <div className="mb-6 flex flex-col items-center text-center">
                            <div className="relative mb-5">
                                <div
                                    className={`absolute inset-0 rounded-full ${cfg.ringColor} ring-8`}
                                />
                                <div
                                    className={`relative flex h-20 w-20 items-center justify-center rounded-full ${cfg.iconBg}`}
                                >
                                    <Icon className={`h-10 w-10 ${cfg.iconColor}`} />
                                </div>
                            </div>

                            {/* ── بج وضعیت ── */}
                            <span
                                className={`mb-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-2xs font-semibold ${cfg.badgeBg} ${cfg.badgeText}`}
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                {cfg.badgeLabel}
                            </span>

                            <h1 className="mb-2 text-base font-bold text-neutral-900">
                                {title}
                            </h1>
                            <p className="max-w-xs text-xs leading-6 text-neutral-500">
                                {message}
                            </p>
                        </div>

                        {/* ── جزئیات تراکنش ── */}
                        {hasDetails && (
                            <div className="mb-6 space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4">
                                {referenceNo && (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-2xs text-neutral-500">
                                            <Receipt className="h-3.5 w-3.5" />
                                            <span>شماره  پیگیری</span>
                                        </div>
                                        <span
                                            className="font-mono text-xs font-semibold text-neutral-900"
                                            dir="ltr"
                                        >
                                            {referenceNo}
                                        </span>
                                    </div>
                                )}

                                {referenceNo && amount && (
                                    <div className="h-px w-full bg-neutral-200" />
                                )}

                                {amount && (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-2xs text-neutral-500">
                                            <CreditCard className="h-3.5 w-3.5" />
                                            <span>مبلغ تراکنش</span>
                                        </div>
                                        <span className="text-xs font-bold text-neutral-900">
                                            {amount.toLocaleString("fa-IR")}{" "}
                                            <span className="text-2xs font-normal text-neutral-500">
                                                ریال
                                            </span>
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ── دکمه بازگشت ── */}
                        <a
                            href="/"
                            className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold text-white transition-all ${cfg.buttonClass}`}
                        >
                            <ArrowLeft className="h-4 w-4" />
                            بازگشت به صفحه اصلی
                        </a>

                        {/* ── فوتر امنیت ── */}
                        <div className="mt-5 flex items-center justify-center gap-1.5 text-2xs text-neutral-400">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            <span>پرداخت امن از طریق درگاه شاپرک</span>
                        </div>
                    </div>
                </div>

                {/* ── متن پایین کارت ── */}
                <p className="mt-4 text-center text-2xs text-neutral-400">
                    در صورت وجود هرگونه مشکل با پشتیبانی تماس بگیرید.
                </p>
            </div>
        </div>
    );
}


