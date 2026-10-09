"use client";

import DashboardCardOrg from "./components/dashBoardCardOrg";
import DistributionChart from "./components/distributionChart";
import RecentRequests from "./components/recentRequests";
import TopSupervisors from "./components/topSupervisors";
import TrendChart from "./components/trendChart";


export default function OrganizationDashboardPage() {
  return (
    <div className="w-full flex flex-col gap-4  px-5 p-2 items-center justify-center">
      <DashboardCardOrg />
      <div className=" w-full flex items-center justify-center gap-5">
        <div className="w-[65%]">
          <TrendChart />
        </div>
        <div className="w-[35%]">
          <DistributionChart />

        </div>
      </div>

      <div className=" w-full flex items-center justify-center gap-5">
        <div className="w-1/2">
          <RecentRequests />
        </div>
        <div className="w-1/2">
          <TopSupervisors />
        </div>
      </div>

    </div>
  );
}
