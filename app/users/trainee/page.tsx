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

"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
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
                <div className="mx-auto flex w-full  flex-col gap-5">
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
            <div className="w-full px-4 md:px-7 -6">
                <div className="mx-auto flex w-full  flex-col -5">
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

    // 4️⃣ step > 10 → مراحل بعدی
    if (step > STEP.PaidPrice) {
        return (
            <div className="w-full px-4 md:px-7 py-6">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
                    <StepsPart
                        step={step}
                        requestCode={trainee.requestNo ?? ""}
                    />
                </div>
            </div>
        );
    }

    // 5️⃣ step === 0 → فرم
    return (
        <div className="w-full px-4 md:px-7 py-6">
            <div className="mx-auto flex w-full  flex-col gap-5">
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
                            {/* <button
                                type="submit"
                                disabled={isSubmitting || isPending}
                                className="mt-4 h-10 w-48 rounded-lg bg-blue-600 text-xs font-semibold text-white disabled:opacity-50"
                            >
                                {isSubmitting || isPending
                                    ? "در حال ارسال..."
                                    : "ثبت‌نام"}
                            </button> */}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default Trainees;