// "use client";

// import { CheckCircle2, Receipt, CreditCard } from "lucide-react";
// import { usePaymentTrainee } from "@/core/services/Trainee/mutate";

// type Props = {
//     traineeId: number;
//     requestNo: string;
// };

// export default function PaymentSuccessPage({ traineeId, requestNo }: Props) {
//     const { mutate, isPending } = usePaymentTrainee();

//     return (
//         <div
//             dir="rtl"
//             className="flex w-full min-h-[60vh] items-center justify-center px-5 py-10"
//         >
//             <div className="w-full max-w-xl rounded-2xl border-2 border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
//                 {/* آیکون موفقیت */}
//                 <div className="mb-6 flex flex-col items-center text-center">
//                     <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
//                         <CheckCircle2 className="h-9 w-9 text-green-600" strokeWidth={2} />
//                     </div>

//                     <h1 className="mb-2 text-base font-bold text-neutral-900">
//                         ثبت‌نام با موفقیت انجام شد
//                     </h1>
//                     <p className="text-xs text-neutral-500">
//                         اطلاعات شما با موفقیت در سامانه ثبت شد. برای تکمیل فرآیند،
//                         نسبت به پرداخت هزینه اقدام کنید.
//                     </p>
//                 </div>

//                 {/* اطلاعات درخواست */}
//                 <div className="mb-6 space-y-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2 text-2xs text-neutral-500">
//                             <Receipt className="h-3.5 w-3.5" />
//                             <span>شماره درخواست</span>
//                         </div>
//                         <span className="text-xs font-semibold text-neutral-900" dir="ltr">
//                             {requestNo}
//                         </span>
//                     </div>

//                     <div className="h-px w-full bg-neutral-200" />

//                     <div className="flex items-center justify-between">
//                         <span className="text-2xs text-neutral-500">شناسه کارآموز</span>
//                         <span className="text-xs font-semibold text-neutral-900" dir="ltr">
//                             {traineeId}
//                         </span>
//                     </div>
//                 </div>

//                 {/* دکمه پرداخت */}
//                 <button
//                     type="button"
//                     onClick={() => mutate(traineeId)}
//                     disabled={isPending}
//                     className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-green-600 text-xs font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                     <CreditCard className="h-4 w-4" />
//                     {isPending ? "در حال انتقال به درگاه..." : "پرداخت هزینه"}
//                 </button>

//                 <p className="mt-4 text-center text-2xs text-neutral-400">
//                     پس از کلیک، به درگاه پرداخت امن شاپرک منتقل می‌شوید.
//                 </p>
//             </div>
//         </div>
//     );
// }

// "use client";

// import { CheckCircle2, Receipt, CreditCard } from "lucide-react";
// import { usePaymentTrainee } from "@/core/services/Trainee/mutate";

// type Props = {
//     traineeId: number;
//     requestNo: string;
//     competences: number[]; // 🆕
//     variant?: "success" | "pending-payment";
// };

// export default function PaymentSuccessPage({
//     traineeId,
//     requestNo,
//     competences,
//     variant = "success",
// }: Props) {
//     const { mutate, isPending } = usePaymentTrainee();

//     return (
//         <div
//             dir="rtl"
//             className="flex w-full min-h-[60vh] items-center justify-center px-5 py-10"
//         >
//             <div className="w-full max-w-xl rounded-2xl border-2 border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
//                 <div className="mb-6 flex flex-col items-center text-center">
//                     <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
//                         <CheckCircle2 className="h-9 w-9 text-green-600" strokeWidth={2} />
//                     </div>

//                     <h1 className="mb-2 text-base font-bold text-neutral-900">
//                         {variant === "pending-payment"
//                             ? "در انتظار پرداخت"
//                             : "ثبت‌نام با موفقیت انجام شد"}
//                     </h1>
//                     <p className="text-xs text-neutral-500">
//                         {variant === "pending-payment"
//                             ? "برای تکمیل فرآیند ثبت‌نام، هزینه دوره را پرداخت کنید."
//                             : "اطلاعات شما با موفقیت ثبت شد. برای تکمیل فرآیند، نسبت به پرداخت هزینه اقدام کنید."}
//                     </p>
//                 </div>

//                 {/* اطلاعات درخواست */}
//                 <div className="mb-6 space-y-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2 text-2xs text-neutral-500">
//                             <Receipt className="h-3.5 w-3.5" />
//                             <span>شماره درخواست</span>
//                         </div>
//                         <span
//                             className="text-xs font-semibold text-neutral-900"
//                             dir="ltr"
//                         >
//                             {requestNo}
//                         </span>
//                     </div>

//                     <div className="h-px w-full bg-neutral-200" />

//                     <div className="flex items-center justify-between">
//                         <span className="text-2xs text-neutral-500">شناسه کارآموز</span>
//                         <span
//                             className="text-xs font-semibold text-neutral-900"
//                             dir="ltr"
//                         >
//                             {traineeId}
//                         </span>
//                     </div>
//                 </div>

//                 {/* دکمه پرداخت */}
//                 <button
//                     type="button"
//                     onClick={() => mutate({ traineeId, competences })}
//                     disabled={isPending}
//                     className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-green-600 text-xs font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                     <CreditCard className="h-4 w-4" />
//                     {isPending ? "در حال انتقال به درگاه..." : "پرداخت هزینه"}
//                 </button>

//                 <p className="mt-4 text-center text-2xs text-neutral-400">
//                     پس از کلیک، به درگاه پرداخت امن شاپرک منتقل می‌شوید.
//                 </p>
//             </div>
//         </div>
//     );
// }

"use client";

import { CheckCircle2, Receipt, CreditCard, Sparkles } from "lucide-react";
import { usePaymentTrainee } from "@/core/services/Trainee/mutate";

type Props = {
    traineeId: number;
    requestNo: string;
    competences: number[];
    variant?: "success" | "pending-payment";
};

export default function PaymentSuccessPage({
    traineeId,
    requestNo,
    competences,
    variant = "success",
}: Props) {
    const { mutate, isPending } = usePaymentTrainee();
    const isPendingPayment = variant === "pending-payment";

    return (
        <div
            dir="rtl"
            className="flex w-full min-h-[60vh] items-center justify-center px- py-10"
        >
            <div className="w-full max-w- rounded-2xl border-2 border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                {/* ── Header ── */}
                <div className="mb-6 flex flex-col items-center text-center">
                    <div
                        className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${isPendingPayment ? "bg-purple-50" : "bg-green-50"
                            }`}
                    >
                        {isPendingPayment ? (
                            <Sparkles className="h-9 w-9 text-purple-600" />
                        ) : (
                            <CheckCircle2 className="h-9 w-9 text-green-600" />
                        )}
                    </div>

                    <h1 className="mb-2 text-base font-bold text-neutral-900">
                        {isPendingPayment
                            ? "یک قدم تا شروع کارآموزی"
                            : "ثبت‌نام با موفقیت انجام شد"}
                    </h1>

                    <p className="text-xs text-neutral-500 leading-6 max-w-md">
                        {isPendingPayment
                            ? "ثبت‌نام شما ثبت شد! با پرداخت هزینه دوره، اولین قدم را برای شروع کارآموزی بردارید."
                            : "اطلاعات شما با موفقیت ثبت شد. برای تکمیل فرآیند، نسبت به پرداخت هزینه اقدام کنید."}
                    </p>
                </div>

                {/* ── اطلاعات درخواست ── */}
                <div className="mb-6 space-y-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-2xs text-neutral-500">
                            <Receipt className="h-3.5 w-3.5" />
                            <span>شماره درخواست</span>
                        </div>
                        <span
                            className="text-xs font-semibold text-neutral-900 font-mono"
                            dir="ltr"
                        >
                            {requestNo}
                        </span>
                    </div>

                    <div className="h-px w-full bg-neutral-200" />

                    <div className="flex items-center justify-between">
                        <span className="text-2xs text-neutral-500">
                            شناسه کارآموز
                        </span>
                        <span
                            className="text-xs font-semibold text-neutral-900 font-mono"
                            dir="ltr"
                        >
                            {traineeId}
                        </span>
                    </div>
                </div>

                {/* ── دکمه پرداخت ── */}
                <button
                    type="button"
                    onClick={() => mutate({ traineeId, competences })}
                    disabled={isPending}
                    className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${isPendingPayment
                            ? "bg-purple-600 hover:bg-purple-700"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                >
                    <CreditCard className="h-4 w-4" />
                    {isPending
                        ? "در حال انتقال به درگاه..."
                        : isPendingPayment
                            ? "پرداخت هزینه دوره"
                            : "پرداخت هزینه"}
                </button>

                <p className="mt-4 text-center text-2xs text-neutral-400">
                    پس از کلیک، به درگاه پرداخت امن شاپرک منتقل می‌شوید.
                </p>
            </div>
        </div>
    );
}