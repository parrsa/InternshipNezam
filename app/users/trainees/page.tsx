// "use client";
// import { Formik, Form } from "formik";
// import { useGetInfoTrainee } from "@/core/services/Trainee/queris";
// import { useRegistrationTrainee } from "@/core/services/Trainee/mutate";
// import CommitmentAgreement from "./components/commitmentAgreement";
// import EducationInfo from "./components/educationInfo";
// import LicenseStatus from "./components/licenseStatus";
// import PersonalInfoForm from "./components/personalForm";
// import { buildInitialValues, buildPayload, validationSchema } from "./components/formConfig";

// function Trainees() {
//     const { data: info, isLoading } = useGetInfoTrainee();
//     const { mutate } = useRegistrationTrainee();
//     const trainee = info?.data;

//     if (isLoading || !trainee) {
//         return <div className="w-full p-5 text-center text-xs">در حال دریافت اطلاعات...</div>;
//     }

//     return (
//         <Formik
//             initialValues={buildInitialValues(trainee)}
//             validationSchema={validationSchema}
//             onSubmit={(values) => mutate(buildPayload(values, trainee) as any)}
//         >
//             <Form
//                 noValidate
//                 className="w-full flex flex-col gap-4 px-5 p-2 items-center justify-center"
//             >
//                 <PersonalInfoForm />
//                 <EducationInfo />
//                 <LicenseStatus />
//                 <CommitmentAgreement />
//             </Form>
//         </Formik>
//     );
// }

// export default Trainees;

"use client";
import { Formik, Form } from "formik";
import { useGetInfoTrainee } from "@/core/services/Trainee/queris";
import { useRegistrationTrainee } from "@/core/services/Trainee/mutate";
import CommitmentAgreement from "./components/commitmentAgreement";
import EducationInfo from "./components/educationInfo";
import LicenseStatus from "./components/licenseStatus";
import PersonalInfoForm from "./components/personalForm";
import { buildInitialValues, buildPayload, validationSchema } from "./components/formConfig";

function Trainees() {
    const { data: info, isLoading } = useGetInfoTrainee();
    const { mutate } = useRegistrationTrainee();
    const trainee = info?.data;

    if (isLoading || !trainee) {
        return <div className="w-full p-5 text-center text-xs">در حال دریافت اطلاعات...</div>;
    }

    return (
        <Formik
            initialValues={buildInitialValues(trainee)}
            validationSchema={validationSchema}
            onSubmit={(values) => mutate(buildPayload(values, trainee) as any)}
        >
            <Form
                noValidate
                className="w-full flex flex-col gap-4 px-5 p-2 items-center justify-center"
            >
                <PersonalInfoForm />
                <EducationInfo />
                <LicenseStatus />
                <CommitmentAgreement />
            </Form>
        </Formik>
    );
}

export default Trainees;