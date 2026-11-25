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

// "use client";

// import { CheckCircle2, Receipt, CreditCard, Sparkles } from "lucide-react";
// import { usePaymentTrainee } from "@/core/services/Trainee/mutate";

// type Props = {
//     traineeId: number;
//     requestNo: string;
//     competences: number[];
//     variant?: "success" | "pending-payment";
// };

// export default function PaymentSuccessPage({
//     traineeId,
//     requestNo,
//     competences,
//     variant = "success",
// }: Props) {
//     const { mutate, isPending } = usePaymentTrainee();
//     const isPendingPayment = variant === "pending-payment";

//     return (
//         <div
//             dir="rtl"
//             className="flex w-full min-h-[60vh] items-center justify-center px- py-10"
//         >
//             <div className="w-full max-w- rounded-2xl border-2 border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
//                 {/* ── Header ── */}
//                 <div className="mb-6 flex flex-col items-center text-center">
//                     <div
//                         className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${isPendingPayment ? "bg-purple-50" : "bg-green-50"
//                             }`}
//                     >
//                         {isPendingPayment ? (
//                             <Sparkles className="h-9 w-9 text-purple-600" />
//                         ) : (
//                             <CheckCircle2 className="h-9 w-9 text-green-600" />
//                         )}
//                     </div>

//                     <h1 className="mb-2 text-base font-bold text-neutral-900">
//                         {isPendingPayment
//                             ? "یک قدم تا شروع کارآموزی"
//                             : "ثبت‌نام با موفقیت انجام شد"}
//                     </h1>

//                     <p className="text-xs text-neutral-500 leading-6 max-w-md">
//                         {isPendingPayment
//                             ? "ثبت‌نام شما ثبت شد! با پرداخت هزینه دوره، اولین قدم را برای شروع کارآموزی بردارید."
//                             : "اطلاعات شما با موفقیت ثبت شد. برای تکمیل فرآیند، نسبت به پرداخت هزینه اقدام کنید."}
//                     </p>
//                 </div>

//                 {/* ── اطلاعات درخواست ── */}
//                 <div className="mb-6 space-y-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2 text-2xs text-neutral-500">
//                             <Receipt className="h-3.5 w-3.5" />
//                             <span>شماره درخواست</span>
//                         </div>
//                         <span
//                             className="text-xs font-semibold text-neutral-900 font-mono"
//                             dir="ltr"
//                         >
//                             {requestNo}
//                         </span>
//                     </div>

//                     <div className="h-px w-full bg-neutral-200" />

//                     <div className="flex items-center justify-between">
//                         <span className="text-2xs text-neutral-500">
//                             شناسه کارآموز
//                         </span>
//                         <span
//                             className="text-xs font-semibold text-neutral-900 font-mono"
//                             dir="ltr"
//                         >
//                             {traineeId}
//                         </span>
//                     </div>
//                 </div>

//                 {/* ── دکمه پرداخت ── */}
//                 <button
//                     type="button"
//                     onClick={() => mutate({ traineeId, competences })}
//                     disabled={isPending}
//                     className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${isPendingPayment
//                             ? "bg-purple-600 hover:bg-purple-700"
//                             : "bg-green-600 hover:bg-green-700"
//                         }`}
//                 >
//                     <CreditCard className="h-4 w-4" />
//                     {isPending
//                         ? "در حال انتقال به درگاه..."
//                         : isPendingPayment
//                             ? "پرداخت هزینه دوره"
//                             : "پرداخت هزینه"}
//                 </button>

//                 <p className="mt-4 text-center text-2xs text-neutral-400">
//                     پس از کلیک، به درگاه پرداخت امن شاپرک منتقل می‌شوید.
//                 </p>
//             </div>
//         </div>
//     );
// }

// "use client";

// import { useState } from "react";
// import { CheckCircle2, Receipt, CreditCard, Sparkles, X } from "lucide-react";
// import { usePaymentTrainee } from "@/core/services/Trainee/mutate";

// type Props = {
//     traineeId: number;
//     requestNo: string;
//     competences: number[];
//     variant?: "success" | "pending-payment";
// };

// export default function PaymentSuccessPage({
//     traineeId,
//     requestNo,
//     competences,
//     variant = "success",
// }: Props) {
//     const { mutate, isPending } = usePaymentTrainee();
//     const isPendingPayment = variant === "pending-payment";

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [amount, setAmount] = useState<number | null>(null);
//     const [isFetchingAmount, setIsFetchingAmount] = useState(false);

//     // گرفتن مبلغ از API قبل از باز کردن مودال
//     const handleOpenModal = async () => {
//         setIsModalOpen(true);
//         setIsFetchingAmount(true);
//         try {
//             const res = await fetch(
//                 `https://karamoozi-api.tceo.ir/api/Trainee/Payment?traineeId=${traineeId}`,
//             );
//             const json = await res.json();
//             if (json?.isSuccess && json?.data?.amount) {
//                 setAmount(Number(json.data.amount));
//             }
//         } catch {
//             // در صورت خطا، مبلغ نامشخص می‌ماند و دکمه تأیید غیرفعال می‌شود
//         } finally {
//             setIsFetchingAmount(false);
//         }
//     };

//     const handleConfirmPayment = () => {
//         setIsModalOpen(false);
//         mutate({ traineeId, competences });
//     };

//     return (
//         <div
//             dir="rtl"
//             className="flex w-full min-h-[60vh] items-center justify-center px-4 py-10"
//         >
//             <div className="w-full max-w-md rounded-2xl border-2 border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
//                 {/* ── Header ── */}
//                 <div className="mb-6 flex flex-col items-center text-center">
//                     <div
//                         className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
//                             isPendingPayment ? "bg-purple-50" : "bg-green-50"
//                         }`}
//                     >
//                         {isPendingPayment ? (
//                             <Sparkles className="h-9 w-9 text-purple-600" />
//                         ) : (
//                             <CheckCircle2 className="h-9 w-9 text-green-600" />
//                         )}
//                     </div>

//                     <h1 className="mb-2 text-base font-bold text-neutral-900">
//                         {isPendingPayment
//                             ? "یک قدم تا شروع کارآموزی"
//                             : "ثبت‌نام با موفقیت انجام شد"}
//                     </h1>

//                     <p className="text-xs text-neutral-500 leading-6 max-w-md">
//                         {isPendingPayment
//                             ? "ثبت‌نام شما ثبت شد! با پرداخت هزینه دوره، اولین قدم را برای شروع کارآموزی بردارید."
//                             : "اطلاعات شما با موفقیت ثبت شد. برای تکمیل فرآیند، نسبت به پرداخت هزینه اقدام کنید."}
//                     </p>
//                 </div>

//                 {/* ── اطلاعات درخواست (بدون شناسه کارآموز) ── */}
//                 <div className="mb-6 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2 text-2xs text-neutral-500">
//                             <Receipt className="h-3.5 w-3.5" />
//                             <span>شماره درخواست</span>
//                         </div>
//                         <span
//                             className="text-xs font-semibold text-neutral-900 font-mono"
//                             dir="ltr"
//                         >
//                             {requestNo}
//                         </span>
//                     </div>
//                 </div>

//                 {/* ── دکمه پرداخت ── */}
//                 <button
//                     type="button"
//                     onClick={handleOpenModal}
//                     disabled={isPending}
//                     className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
//                         isPendingPayment
//                             ? "bg-purple-600 hover:bg-purple-700"
//                             : "bg-green-600 hover:bg-green-700"
//                     }`}
//                 >
//                     <CreditCard className="h-4 w-4" />
//                     {isPendingPayment ? "پرداخت هزینه دوره" : "پرداخت هزینه"}
//                 </button>

//                 <p className="mt-4 text-center text-2xs text-neutral-400">
//                     پس از کلیک، به درگاه پرداخت امن شاپرک منتقل می‌شوید.
//                 </p>
//             </div>

//             {/* ── مودال تأیید پرداخت ── */}
//             {isModalOpen && (
//                 <div
//                     dir="rtl"
//                     className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
//                     onClick={() => !isPending && setIsModalOpen(false)}
//                 >
//                     <div
//                         className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <div className="mb-4 flex items-center justify-between">
//                             <h2 className="text-sm font-bold text-neutral-900">
//                                 تأیید پرداخت
//                             </h2>
//                             <button
//                                 type="button"
//                                 onClick={() => setIsModalOpen(false)}
//                                 className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
//                             >
//                                 <X className="h-4 w-4" />
//                             </button>
//                         </div>

//                         <div className="space-y-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
//                             <div className="flex items-center justify-between">
//                                 <span className="text-2xs text-neutral-500">
//                                     شماره درخواست
//                                 </span>
//                                 <span
//                                     className="text-xs font-semibold font-mono text-neutral-900"
//                                     dir="ltr"
//                                 >
//                                     {requestNo}
//                                 </span>
//                             </div>
//                             <div className="h-px w-full bg-neutral-200" />
//                             <div className="flex items-center justify-between">
//                                 <span className="text-2xs text-neutral-500">
//                                     مبلغ قابل پرداخت
//                                 </span>
//                                 <span className="text-sm font-bold text-purple-600">
//                                     {isFetchingAmount
//                                         ? "در حال دریافت..."
//                                         : amount != null
//                                           ? `${amount.toLocaleString("fa-IR")} ریال`
//                                           : "نامشخص"}
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="mt-5 flex gap-2">
//                             <button
//                                 type="button"
//                                 onClick={() => setIsModalOpen(false)}
//                                 disabled={isPending}
//                                 className="h-10 flex-1 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-600 hover:bg-neutral-50 disabled:opacity-50"
//                             >
//                                 انصراف
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={handleConfirmPayment}
//                                 disabled={isPending || isFetchingAmount || amount == null}
//                                 className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-purple-600 text-xs font-semibold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
//                             >
//                                 <CreditCard className="h-4 w-4" />
//                                 {isPending ? "در حال انتقال..." : "تأیید و پرداخت"}
//                             </button>
//                         </div>

//                         <p className="mt-3 text-center text-2xs text-neutral-400">
//                             با تأیید، به درگاه پرداخت امن شاپرک منتقل می‌شوید.
//                         </p>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

"use client";

import { useState } from "react";
import { CheckCircle2, Receipt, CreditCard, Sparkles, X } from "lucide-react";
import { useGetPaymentToken } from "@/core/services/Trainee/mutate";
import { redirectToShaparak } from "@/core/services/Trainee/mutate";

type Props = {
    traineeId: number;
    requestNo: string;
    tracenumber?: number | string
    competences: number[];
    variant?: "success" | "pending-payment";
};

type PaymentInfo = {
    amount: number;
    accessToken: string;
    terminalId: number | string;
};

export default function PaymentSuccessPage({
    traineeId,
    requestNo,
    tracenumber,
    competences,
    variant = "success",
}: Props) {
    const { mutate, isPending } = useGetPaymentToken();
    const isPendingPayment = variant === "pending-payment";

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);

    // فقط یک بار API می‌زنیم؛ هم مبلغ هم توکن از همان پاسخ می‌آید
    const handleOpenModal = () => {
        setIsModalOpen(true);
        mutate(
            { traineeId, competences },
            {
                onSuccess: (response: any) => {
                    if (
                        response?.isSuccess &&
                        response?.data?.accessToken &&
                        response?.data?.terminalId
                    ) {
                        setPaymentInfo({
                            amount: Number(response.data.amount) || 0,
                            accessToken: response.data.accessToken,
                            terminalId: response.data.terminalId,
                        });
                    } else {
                        setIsModalOpen(false);
                    }
                },
                onError: () => setIsModalOpen(false),
            },
        );
    };

    const handleConfirmPayment = () => {
        if (!paymentInfo) return;
        setIsModalOpen(false);
        redirectToShaparak(paymentInfo.accessToken, paymentInfo.terminalId);
    };

    return (
        <div
            dir="rtl"
            className="flex w-full min-h-[60vh] items-center justify-center px-4 py-5"
        >
            <div className="w-full max-w- rounded-2xl border-2 border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                {/* Header */}
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

                {/* اطلاعات درخواست (بدون شناسه کارآموز) */}
                <div className="mb-6 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
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
                </div>

                <button
                    type="button"
                    onClick={handleOpenModal}
                    disabled={isPending}
                    className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${isPendingPayment
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "bg-green-600 hover:bg-green-700"
                        }`}
                >
                    <CreditCard className="h-4 w-4" />
                    {isPending
                        ? "در حال دریافت اطلاعات..."
                        : isPendingPayment
                            ? "پرداخت هزینه دوره"
                            : "پرداخت هزینه"}
                </button>

                <p className="mt-4 text-center text-2xs text-neutral-400">
                    پس از کلیک، به درگاه پرداخت امن شاپرک منتقل می‌شوید.
                </p>
            </div>

            {/* مودال */}
            {isModalOpen && (
                <div
                    dir="rtl"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    onClick={() => !isPending && setIsModalOpen(false)}
                >
                    <div
                        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-sm font-bold text-neutral-900">
                                تأیید پرداخت
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                disabled={isPending}
                                className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 disabled:opacity-50"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="space-y-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-2xs text-neutral-500">
                                    شماره درخواست
                                </span>
                                <span
                                    className="text-xs font-semibold font-mono text-neutral-900"
                                    dir="ltr"
                                >
                                    {requestNo}
                                </span>
                            </div>
                            <div className="h-px w-full bg-neutral-200" />
                            <div className="flex items-center justify-between">
                                <span className="text-2xs text-neutral-500">
                                    مبلغ قابل پرداخت
                                </span>
                                <span className="text-sm font-bold text-purple-600">
                                    {isPending
                                        ? "در حال دریافت..."
                                        : paymentInfo
                                            ? `${paymentInfo.amount.toLocaleString("fa-IR")} ریال`
                                            : "نامشخص"}
                                </span>
                            </div>
                        </div>

                        <div className="mt-5 flex gap-2">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                disabled={isPending}
                                className="h-10 flex-1 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-600 hover:bg-neutral-50 disabled:opacity-50"
                            >
                                انصراف
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmPayment}
                                disabled={isPending || !paymentInfo}
                                className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-purple-600 text-xs font-semibold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <CreditCard className="h-4 w-4" />
                                تأیید و پرداخت
                            </button>
                        </div>

                        <p className="mt-3 text-center text-2xs text-neutral-400">
                            با تأیید، به درگاه پرداخت امن شاپرک منتقل می‌شوید.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}