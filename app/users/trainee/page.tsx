// "use client";

// import { useState } from "react";
// import { Formik, Form } from "formik";
// import { useGetInfoTrainee } from "@/core/services/Trainee/queris";
// import { useRegistrationTrainee } from "@/core/services/Trainee/mutate";
// import CommitmentAgreement from "./components/commitmentAgreement";
// import EducationInfo from "./components/educationInfo";
// import LicenseStatus from "./components/licenseStatus";
// import PersonalInfoForm from "./components/personalForm";
// import PaymentSuccessPage from "./components/PaymentSuccessPage";
// import StepStatusPage from "./StepStatusPage";
// import {
//     buildInitialValues,
//     buildPayload,
//     validationSchema,
// } from "./components/formConfig";

// const STEP = {
//     Registration: 0,
//     PaidPrice: 10,
//     SupervisorSelect: 20,
//     SendRequestToSupervisor: 30,
//     ConfirmedBySupervisor: 40,
//     ConfirmedByOrganization: 50,
//     Finished: 60,
// } as const;

// type SuccessData = {
//     traineeId: number;
//     requestNo: string;
//     competences: number[];
// };

// function Trainees() {
//     const { data: info, isLoading } = useGetInfoTrainee();
//     const { mutate, isPending } = useRegistrationTrainee();
//     const trainee = info?.data;

//     const [successData, setSuccessData] = useState<SuccessData | null>(null);

//     // 1️⃣ بعد از ثبت‌نام موفق
//     if (successData) {
//         return (
//             <div className="w-full px-4 md:px-7 py-6">
//                 <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
//                     <PaymentSuccessPage
//                         traineeId={successData.traineeId}
//                         requestNo={successData.requestNo}
//                         competences={successData.competences}
//                     />
//                 </div>
//             </div>
//         );
//     }

//     // 2️⃣ لود
//     if (isLoading || !trainee) {
//         return (
//             <div className="w-full p-5 text-center text-xs">
//                 در حال دریافت اطلاعات...
//             </div>
//         );
//     }

//     const step: number = trainee.step ?? 0;

//     // 3️⃣ step === 10 → در انتظار پرداخت
//     if (step === STEP.PaidPrice) {
//         // ✅ رفع خطای 7006: تایپ صریح برای n
//         const competences: number[] = Array.isArray(trainee.competences)
//             ? trainee.competences
//                   .map((c: unknown) => Number(c))
//                   .filter((n: number) => n > 0)
//             : [];

//         return (
//             <div className="w-full px-4 md:px-7 py-6">
//                 <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
//                     {/* ✅ رفع خطای 2322: requestNo به‌جای requestCode */}
//                     <StepStatusPage
//                         step={step}
//                         requestNo={trainee.requestNo ?? ""}
//                     />
//                     <PaymentSuccessPage
//                         traineeId={trainee.id}
//                         requestNo={trainee.requestNo ?? ""}
//                         competences={competences}
//                         variant="pending-payment"
//                     />
//                 </div>
//             </div>
//         );
//     }

//     // 4️⃣ step > 10 → مراحل بعدی
//     if (step > STEP.PaidPrice) {
//         return (
//             <div className="w-full px-4 md:px-7 py-6">
//                 <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
//                     {/* ✅ رفع خطای 2322: requestNo به‌جای requestCode */}
//                     <StepStatusPage
//                         step={step}
//                         requestNo={trainee.requestNo ?? ""}
//                     />
//                 </div>
//             </div>
//         );
//     }

//     // 5️⃣ step === 0 → فرم
//     return (
//         <div className="w-full px-4 md:px-7 py-6">
//             <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
//                 <Formik
//                     initialValues={buildInitialValues(trainee)}
//                     validationSchema={validationSchema}
//                     onSubmit={(values, { setSubmitting }) => {
//                         const payload = buildPayload(values, trainee);

//                         mutate(payload as any, {
//                             onSuccess: (response: any) => {
//                                 setSubmitting(false);

//                                 if (
//                                     response?.isSuccess &&
//                                     response?.data?.traineeId &&
//                                     response?.data?.requestNo
//                                 ) {
//                                     setSuccessData({
//                                         traineeId: Number(response.data.traineeId),
//                                         requestNo: String(response.data.requestNo),
//                                         competences: Array.isArray(
//                                             response.data.competences,
//                                         )
//                                             ? response.data.competences.map(
//                                                   (c: unknown) => Number(c),
//                                               )
//                                             : [],
//                                     });
//                                 }
//                             },
//                             onError: () => setSubmitting(false),
//                         });
//                     }}
//                 >
//                     {({ isSubmitting }) => (
//                         <Form
//                             noValidate
//                             className="w-full flex flex-col gap-4 items-center justify-center"
//                         >
//                             <PersonalInfoForm />
//                             <EducationInfo />
//                             <LicenseStatus />

//                             {/* ✅ رفع خطای 2322: CommitmentAgreement پراپ isSubmitting نداره */}
//                             <CommitmentAgreement />

//                             <button
//                                 type="submit"
//                                 disabled={isSubmitting || isPending}
//                                 className="mt-4 h-10 w-48 rounded-lg bg-blue-600 text-xs font-semibold text-white disabled:opacity-50"
//                             >
//                                 {isSubmitting || isPending
//                                     ? "در حال ارسال..."
//                                     : "ثبت‌نام"}
//                             </button>
//                         </Form>
//                     )}
//                 </Formik>
//             </div>
//         </div>
//     );
// }

// export default Trainees;

// "use client";

// import { useState } from "react";
// import { Formik, Form } from "formik";
// import { useGetInfoTrainee } from "@/core/services/Trainee/queris";
// import { useRegistrationTrainee } from "@/core/services/Trainee/mutate";
// import CommitmentAgreement from "./components/commitmentAgreement";
// import EducationInfo from "./components/educationInfo";
// import LicenseStatus from "./components/licenseStatus";
// import PersonalInfoForm from "./components/personalForm";
// import PaymentSuccessPage from "./components/PaymentSuccessPage";
// import StepsPart from "../request-tracking/components/stepsPart";
// import {
//     buildInitialValues,
//     buildPayload,
//     validationSchema,
// } from "./components/formConfig";

// const STEP = {
//     Registration: 0,
//     PaidPrice: 10,
//     SupervisorSelect: 20,
//     SendRequestToSupervisor: 30,
//     ConfirmedBySupervisor: 40,
//     ConfirmedByOrganization: 50,
//     Finished: 60,
// } as const;

// type SuccessData = {
//     traineeId: number;
//     requestNo: string;
//     competences: number[];
// };

// function Trainees() {
//     const { data: info, isLoading } = useGetInfoTrainee();
//     const { mutate, isPending } = useRegistrationTrainee();
//     const trainee = info?.data;

//     const [successData, setSuccessData] = useState<SuccessData | null>(null);

//     // 1️⃣ بعد از ثبت‌نام موفق
//     if (successData) {
//         return (
//             <div className="w-full px-4 md:px-7 py-6">
//                 <div className="mx-auto flex w-full  flex-col gap-5">
//                     <PaymentSuccessPage
//                         traineeId={successData.traineeId}
//                         requestNo={successData.requestNo}
//                         competences={successData.competences}
//                     />
//                 </div>
//             </div>
//         );
//     }

//     // 2️⃣ لود
//     if (isLoading || !trainee) {
//         return (
//             <div className="w-full p-5 text-center text-xs">
//                 در حال دریافت اطلاعات...
//             </div>
//         );
//     }

//     const step: number = trainee.step ?? 0;

//     // 3️⃣ step === 10 → در انتظار پرداخت
//     if (step === STEP.PaidPrice) {
//         const competences: number[] = Array.isArray(trainee.competences)
//             ? trainee.competences
//                   .map((c: unknown) => Number(c))
//                   .filter((n: number) => n > 0)
//             : [];

//         return (
//             <div className="w-full px-4 md:px-7 -6">
//                 <div className=" flex w-full  flex-col -5">
//                     <StepsPart
//                         step={step}
//                         requestCode={trainee.requestNo ?? ""}
//                     />
//                     <PaymentSuccessPage
//                         traineeId={trainee.id}
//                         requestNo={trainee.requestNo ?? ""}
//                         competences={competences}
//                         variant="pending-payment"
//                     />
//                 </div>
//             </div>
//         );
//     }

//     // 4️⃣ step > 10 → مراحل بعدی
//     if (step > STEP.PaidPrice) {
//         return (
//             <div className="w-full px-4 md:px-7 py-6">
//                 <div className="mx-auto flex w-full  flex-col gap-5">
//                     <StepsPart
//                         step={step}
//                         requestCode={trainee.requestNo ?? ""}
//                     />
//                 </div>
//             </div>
//         );
//     }

//     // 5️⃣ step === 0 → فرم
//     return (
//         <div className="w-full px-4 md:px-7 py-6">
//             <div className="mx-auto flex w-full  flex-col gap-5">
//                 <Formik
//                     initialValues={buildInitialValues(trainee)}
//                     validationSchema={validationSchema}
//                     onSubmit={(values, { setSubmitting }) => {
//                         const payload = buildPayload(values, trainee);

//                         mutate(payload as any, {
//                             onSuccess: (response: any) => {
//                                 setSubmitting(false);
//                                 if (
//                                     response?.isSuccess &&
//                                     response?.data?.traineeId &&
//                                     response?.data?.requestNo
//                                 ) {
//                                     setSuccessData({
//                                         traineeId: Number(response.data.traineeId),
//                                         requestNo: String(response.data.requestNo),
//                                         competences: Array.isArray(response.data.competences)
//                                             ? response.data.competences.map(
//                                                   (c: unknown) => Number(c),
//                                               )
//                                             : [],
//                                     });
//                                 }
//                             },
//                             onError: () => setSubmitting(false),
//                         });
//                     }}
//                 >
//                     {({ isSubmitting }) => (
//                         <Form
//                             noValidate
//                             className="w-full flex flex-col gap-4 items-center justify-center"
//                         >
//                             <PersonalInfoForm />
//                             <EducationInfo />
//                             <LicenseStatus />
//                             <CommitmentAgreement />
//                             {/* <button
//                                 type="submit"
//                                 disabled={isSubmitting || isPending}
//                                 className="mt-4 h-10 w-48 rounded-lg bg-blue-600 text-xs font-semibold text-white disabled:opacity-50"
//                             >
//                                 {isSubmitting || isPending
//                                     ? "در حال ارسال..."
//                                     : "ثبت‌نام"}
//                             </button> */}
//                         </Form>
//                     )}
//                 </Formik>
//             </div>
//         </div>
//     );
// }

// export default Trainees;

"use client";

import { useState } from "react";
import Link from "next/link";
import { Formik, Form } from "formik";
import { ArrowLeft, UserRoundCheck, Info } from "lucide-react";
import { useGetInfoTrainee } from "@/core/services/Trainee/queris";
import { useRegistrationTrainee } from "@/core/services/Trainee/mutate";
import CommitmentAgreement from "./components/commitmentAgreement";
import EducationInfo from "./components/educationInfo";
import LicenseStatus from "./components/licenseStatus";
import PersonalInfoForm from "./components/personalForm";
import PaymentSuccessPage from "./components/PaymentSuccessPage";
import StepsPart from "../request-tracking/components/stepsPart";
import {
    buildInitialValues,
    buildPayload,
    validationSchema,
} from "./components/formConfig";

const STEP = {
    Registration: 0,
    PaidPrice: 10,
    SupervisorSelect: 20,
    SendRequestToSupervisor: 30,
    ConfirmedBySupervisor: 40,
    ConfirmedByOrganization: 50,
    Finished: 60,
} as const;

type SuccessData = {
    traineeId: number;
    requestNo: string;
    competences: number[];
};

function Trainees() {
    const { data: info, isLoading } = useGetInfoTrainee();
    const { mutate, isPending } = useRegistrationTrainee();
    const trainee = info?.data;

    const [successData, setSuccessData] = useState<SuccessData | null>(null);

    // 1️⃣ بعد از ثبت‌نام موفق
    if (successData) {
        return (
            <div className="w-full px-4 md:px-7 py-6">
                <div className="mx-auto flex w-full flex-col gap-5">
                    <PaymentSuccessPage
                        traineeId={successData.traineeId}
                        requestNo={successData.requestNo}
                        competences={successData.competences}
                    />
                </div>
            </div>
        );
    }

    // 2️⃣ لود
    if (isLoading || !trainee) {
        return (
            <div className="w-full p-5 text-center text-xs">
                در حال دریافت اطلاعات...
            </div>
        );
    }

    const step: number = trainee.step ?? 0;

    // 3️⃣ step === 10 → در انتظار پرداخت
    if (step === STEP.PaidPrice) {
        const competences: number[] = Array.isArray(trainee.competences)
            ? trainee.competences
                .map((c: unknown) => Number(c))
                .filter((n: number) => n > 0)
            : [];

        return (
            <div className="w-full px-4 md:px-7 py-6">
                <div className="flex w-full flex-col gap-5">
                    <StepsPart
                        step={step}
                        requestCode={trainee.requestNo ?? ""}
                    />
                    <PaymentSuccessPage
                        traineeId={trainee.id}
                        requestNo={trainee.requestNo ?? ""}
                        competences={competences}
                        variant="pending-payment"
                    />
                </div>
            </div>
        );
    }

    // 4️⃣ step === 20 → پرداخت انجام شده، باید سرپرست انتخاب کند
    if (step === STEP.SupervisorSelect) {
        return (
            <div className="w-full px-4 md:px-7 py-6">
                <div className="mx-auto flex w-full flex-col gap-5">
                    <StepsPart
                        step={step}
                        requestCode={trainee.requestNo ?? ""}
                    />

                    {/* ── راهنمای انتخاب سرپرست ── */}
                    <section
                        dir="rtl"
                        className="w-full rounded-3xl border border-indigo-200 bg-indigo-50/60 p-6 sm:p-7"
                    >
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full ring-8 ring-indigo-100" />
                                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                                    <UserRoundCheck className="h-8 w-8 text-indigo-600" />
                                </div>
                            </div>

                            <div>
                                <h2 className="text-sm font-bold text-neutral-900">
                                    مرحله بعدی: انتخاب سرپرست کارآموزی
                                </h2>
                                <p className="mt-2 max-w-md text-xs leading-6 text-neutral-600">
                                    پرداخت حق دوره با موفقیت انجام شد. اکنون
                                    باید سرپرست کارآموزی خود را از میان
                                    اساتید تأییدشده انتخاب کنید تا درخواست
                                    شما برای بررسی ارسال شود.
                                </p>
                            </div>

                            <div className="flex items-start gap-2 rounded-xl border border-indigo-200 bg-white/70 p-3 text-right">
                                <Info className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                                <p className="text-2xs leading-5 text-neutral-600">
                                    پس از انتخاب سرپرست، درخواست شما به‌صورت
                                    خودکار برای ایشان ارسال می‌شود و می‌توانید
                                    وضعیت را از همین صفحه پیگیری کنید.
                                </p>
                            </div>

                            <Link
                                href="/users/select-supervisor"
                                className="mt-2 flex h-11 w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-neutral-900 text-xs font-semibold text-white transition-all hover:bg-neutral-800"
                            >
                                <UserRoundCheck className="h-4 w-4" />
                                انتخاب سرپرست کارآموزی
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        );
    }

    // 5️⃣ step > 20 → مراحل بعدی (ارسال به سرپرست، تأیید و ...)
    if (step > STEP.SupervisorSelect) {
        return (
            <div className="w-full px-4 md:px-7 py-6">
                <div className="mx-auto flex w-full flex-col gap-5">
                    <StepsPart
                        step={step}
                        requestCode={trainee.requestNo ?? ""}
                    />

                    {/* ── راهنمای هر مرحله بعدی ── */}
                    <NextStepBanner step={step} />
                </div>
            </div>
        );
    }

    // 6️⃣ step === 0 → فرم ثبت‌نام
    return (
        <div className="w-full px-4 md:px-7 py-6">
            <div className="mx-auto flex w-full flex-col gap-5">
                <Formik
                    initialValues={buildInitialValues(trainee)}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        const payload = buildPayload(values, trainee);

                        mutate(payload as any, {
                            onSuccess: (response: any) => {
                                setSubmitting(false);
                                if (
                                    response?.isSuccess &&
                                    response?.data?.traineeId &&
                                    response?.data?.requestNo
                                ) {
                                    setSuccessData({
                                        traineeId: Number(response.data.traineeId),
                                        requestNo: String(response.data.requestNo),
                                        competences: Array.isArray(response.data.competences)
                                            ? response.data.competences.map(
                                                (c: unknown) => Number(c),
                                            )
                                            : [],
                                    });
                                }
                            },
                            onError: () => setSubmitting(false),
                        });
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form
                            noValidate
                            className="w-full flex flex-col gap-4 items-center justify-center"
                        >
                            <PersonalInfoForm />
                            <EducationInfo />
                            <LicenseStatus />
                            <CommitmentAgreement />
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default Trainees;

/* ──────────────────────────────────────────────────────────── */
/* ── بنر راهنمای مراحل بعد از انتخاب سرپرست ── */
/* ──────────────────────────────────────────────────────────── */

const NEXT_STEP_INFO: Record<
    number,
    { title: string; description: string }
> = {
    [STEP.SendRequestToSupervisor]: {
        title: "در انتظار تأیید سرپرست",
        description:
            "درخواست شما برای سرپرست انتخاب‌شده ارسال شده است. پس از تأیید ایشان، درخواست به سازمان ارسال می‌شود.",
    },
    [STEP.ConfirmedBySupervisor]: {
        title: "در انتظار تأیید سازمان",
        description:
            "سرپرست شما درخواست را تأیید کرده است. اکنون سازمان در حال بررسی نهایی درخواست شماست.",
    },
    [STEP.ConfirmedByOrganization]: {
        title: "در انتظار آغاز کارآموزی",
        description:
            "سازمان درخواست شما را تأیید کرده است. به‌زودی کارآموزی شما آغاز می‌شود.",
    },
    [STEP.Finished]: {
        title: "کارآموزی آغاز شد",
        description:
            "فرایند تأیید به‌طور کامل انجام شد. می‌توانید کارآموزی خود را شروع کنید.",
    },
};

function NextStepBanner({ step }: { step: number }) {
    const info = NEXT_STEP_INFO[step];
    if (!info) return null;

    return (
        <section
            dir="rtl"
            className="w-full rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
        >
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                    <Info className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                    <h3 className="text-xs font-bold text-neutral-900">
                        {info.title}
                    </h3>
                    <p className="mt-1 text-2xs leading-6 text-neutral-600">
                        {info.description}
                    </p>
                </div>
            </div>
        </section>
    );
}