"use client";

import Loading from "@/app/components/Loading";
import { buildSupervisorRealPayload } from "./hook";
import { useRegisterSupervisorReal } from "@/core/services/supervisor/mutation";
import PersonalInfoForm, {
    type PersonalInfoFormSubmitState,
} from "./components/personalForm";
import { useGetInfoTrainee } from "@/core/services/Trainee/queris";

export default function SupervisorPage() {
    const { data: realInfoRes, isLoading, isError } = useGetInfoTrainee();
    const { mutate: register, isPending } = useRegisterSupervisorReal();
    console.log("iman")
    const backendData = realInfoRes?.data ?? null;
    console.log(backendData)
    // ⬇️ موقت: فقط برای بررسی اینکه backendData فیلدهای هویتی دارد یا نه
    console.log("backendData:", backendData);

    if (isLoading) return <Loading />;
    if (isError) return <div>خطا در دریافت اطلاعات سرپرست</div>;

    const handleSubmit = (state: PersonalInfoFormSubmitState) => {
        const payload = buildSupervisorRealPayload({
            formValues: state.formValues,
            fields: state.fields,
            qualifications: state.qualifications,
            experienceYears: state.experienceYears,
            activeProjects: state.activeProjects,
            summary: state.summary,
            salary: state.salary,
            insurance: state.insurance,
            weeklyHours: state.weeklyHours,
            payloadTotalCapacity: state.payloadTotalCapacity,
            allocatedCapacity: state.allocatedCapacity,
            minMonthlyHours: state.minMonthlyHours,
            traineeCertificate: state.traineeCertificate,
            backend: backendData,
        });

        console.log("RealRegistration payload:", payload);
        register(payload);
    };

    return (
        <PersonalInfoForm
            backendData={backendData}
            isSubmitting={isPending}
            onSubmit={handleSubmit}
        />
    );
}