

import ActiveCourses from "./components/activeCourses";
import DashboardStatCards from "./components/dashboardStatCards";
import MonthlyWorkChart from "./components/monthlyWorkChart";
import RecentMessages from "./components/recentMessages";


function UserPanel() {
  return (
    <div
      dir="rtl"
      className=" w-full px-7 "
    >
      <div className="mx-auto flex w-full pt-2 flex-col gap-5">
        <DashboardStatCards />

        <div className=" w-full flex gap-3 ">
          <MonthlyWorkChart />
          <ActiveCourses />
        </div>

        <RecentMessages />
      </div>
    </div>
  );
}

export default UserPanel;