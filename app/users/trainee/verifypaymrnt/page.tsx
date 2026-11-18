"use client";

import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useVerifyPaymentTrainee } from "@/core/services/Trainee/mutate";

export default function PaymentVerifyPage() {
    const searchParams = useSearchParams();
    const { mutate, isPending, isSuccess, data: verifyResult, isError } = useVerifyPaymentTrainee();
    const called = useRef(false);

    // ساخت payload از URL
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

    // فقط یک بار صدا بزن (جلوگیری از double-call در React StrictMode)
    useEffect(() => {
        if (called.current) return;
        called.current = true;
        mutate(payload);
    }, [mutate, payload]);

  
    // ── Error (network) ──
    if (isError) {
        return (
            <ResultCard
                success={false}
                title="خطا در تأیید پرداخت"
                message="ارتباط با سرور برقرار نشد. لطفاً بعداً تلاش کنید."
            />
        );
    }

    // ── Result ──
    const isSuccessResult = verifyResult?.isSuccess === true;
    const isCancelled = payload.respCode === "-1" || payload.respCode === "0";

    return (
        <ResultCard
            success={isSuccessResult}
            title={
                isSuccessResult
                    ? "پرداخت با موفقیت انجام شد"
                    : isCancelled
                      ? "پرداخت لغو شد"
                      : "پرداخت ناموفق بود"
            }
            message={
                verifyResult?.message ||
                payload.respMsg ||
                "نتیجه پرداخت دریافت شد."
            }
        />
    );
}

// ── کامپوننت کارت نتیجه ──
function ResultCard({
    success,
    title,
    message,
}: {
    success: boolean;
    title: string;
    message: string;
}) {
    return (
        <div
            dir="rtl"
            className="flex min-h-[60vh] w-full items-center justify-center px-5 py-10"
        >
            <div className="w-full max-w-xl rounded-2xl border-2 border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 flex flex-col items-center text-center">
                    <div
                        className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
                            success ? "bg-green-50" : "bg-red-50"
                        }`}
                    >
                        {success ? (
                            <CheckCircle2 className="h-9 w-9 text-green-600" />
                        ) : (
                            <XCircle className="h-9 w-9 text-red-600" />
                        )}
                    </div>
                    <h1 className="mb-2 text-base font-bold text-neutral-900">{title}</h1>
                    <p className="text-xs text-neutral-500">{message}</p>
                </div>

                <a
                    href="/"
                    className="flex h-11 w-full items-center justify-center rounded-xl bg-neutral-900 text-xs font-semibold text-white transition-colors hover:bg-neutral-800"
                >
                    بازگشت به صفحه اصلی
                </a>
            </div>
        </div>
    );
}