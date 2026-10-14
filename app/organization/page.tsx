"use client";

import DashboardCardOrg from "./components/dashBoardCardOrg";
import DistributionChart from "./components/distributionChart";
import RecentRequests from "./components/recentRequests";
import TopSupervisors from "./components/topSupervisors";
import TrendChart from "./components/trendChart";

export default function OrganizationDashboardPage() {
  return (
    <div className="w-full flex flex-col gap-4 px-0 sm:px-5 p-2 items-center justify-center">
      <DashboardCardOrg />
      <div className="w-full lg:flex-row flex-col flex items-center justify-center gap-5">
        <div className=" w-full  lg:w-[65%]">
          <TrendChart />
        </div>
        <div className=" w-full sm:mt-0 mt-3 lg:w-[35%]">
          <DistributionChart />
        </div>
      </div>

      <div className="w-full lg:flex-row flex-col flex items-center justify-center gap-5">
        <div className=" w-full lg:w-1/2">
          <RecentRequests />
        </div>
        <div className=" w-full lg:w-1/2">
          <TopSupervisors />
        </div>
      </div>
    </div>
  );
}