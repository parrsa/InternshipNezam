

import ActiveCourses from "./components/activeCourses";
import DashboardStatCards from "./components/dashboardStatCards";
import MonthlyWorkChart from "./components/monthlyWorkChart";
import RecentMessages from "./components/recentMessages";


function UserPanel() {
  return (
    <div
      dir="rtl"
      className=" w-full bg-[#F8F9FB] px-7 "
    >
      <div className="mx-auto flex w-full max-w-370 pt-2 flex-col gap-5">
        <DashboardStatCards />

        <div className=" w-full flex gap-2 ">
          <MonthlyWorkChart />
          <ActiveCourses />
        </div>

        <RecentMessages />
      </div>
    </div>
  );
}

export default UserPanel;