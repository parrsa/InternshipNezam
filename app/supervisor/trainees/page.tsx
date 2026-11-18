"use client";

import { useMemo } from "react";
import Loading from "@/app/components/Loading";
import { buildSupervisorRealPayload } from "./hook";
import { useRegisterSupervisorReal } from "@/core/services/supervisor/mutation";
import {
  useGetLegalInfo,
  useGetRealInfo,
} from "@/core/services/supervisor/queris";
import PersonalInfoForm, {
  type PersonalInfoFormSubmitState,
} from "./components/personalForm";

const isNotFound = (err: any) => err?.response?.status === 404;

export default function SupervisorPage() {
  const realQuery = useGetRealInfo();
  const legalQuery = useGetLegalInfo();
  const { mutate: register, isPending } = useRegisterSupervisorReal();

  const userType = useMemo<"real" | "legal" | "unknown">(() => {
    if (realQuery.isSuccess) return "real";
    if (legalQuery.isSuccess) return "legal";
    return "unknown";
  }, [realQuery.isSuccess, legalQuery.isSuccess]);

  const backendData = realQuery.data?.data ?? null;

  const stillLoading =
    (realQuery.isLoading || legalQuery.isLoading) &&
    !realQuery.isSuccess &&
    !legalQuery.isSuccess;

  if (stillLoading) return <Loading />;

  const bothFailed = realQuery.isError && legalQuery.isError;
  const isNewUser =
    bothFailed && isNotFound(realQuery.error) && isNotFound(legalQuery.error);

  if (bothFailed && !isNewUser) {
    return <div>خطا در دریافت اطلاعات سرپرست</div>;
  }

  if (userType === "legal") {
    return (
      <div className="p-6 text-center space-y-4">
        <p className="text-lg font-semibold">
          شما به عنوان شخص حقوقی ثبت‌نام کرده‌اید.
        </p>
        <p className="text-sm text-gray-600">
          برای تکمیل اطلاعات حقوقی، از بخش مربوطه وارد شوید.
        </p>
        <a
          href="/supervisor/legal"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          رفتن به فرم شخص حقوقی
        </a>
      </div>
    );
  }

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

    console.log("📦 payload:", payload);
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