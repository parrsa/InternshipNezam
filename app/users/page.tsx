"use client";

import ActiveCourses from "./components/activeCourses";
import DashboardStatCards from "./components/dashboardStatCards";
import MonthlyWorkChart from "./components/monthlyWorkChart";
import RecentMessages from "./components/recentMessages";
import StepsPart from "./request-tracking/components/stepsPart";
import { useGetInfoTrainee } from "@/core/services/Trainee/queris";

function UserPanel() {
    const { data: info, isLoading } = useGetInfoTrainee();
    const trainee = info?.data;
    const step: number = trainee?.step ?? 0;

    return (
        <div dir="rtl" className="w-full px-4 md:px-7">
            <div className="mx-auto flex w-full pt-2 flex-col gap-5">
                <StepsPart
                    step={step}
                    requestCode={trainee?.requestNo ?? ""}
                    registeredAt={trainee?.registeredAt ?? ""}
                />

                <DashboardStatCards />

                <div className="w-full max-sm:flex-col flex gap-3 py-4">
                    <MonthlyWorkChart />
                    <ActiveCourses />
                </div>

                <RecentMessages />
            </div>
        </div>
    );
}

export default UserPanel;