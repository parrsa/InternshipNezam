import ActiveCourses from "./components/activeCourses";
import DashboardStatCards from "./components/dashboardStatCards";
import MonthlyWorkChart from "./components/monthlyWorkChart";
import RecentMessages from "./components/recentMessages";
import StepsPart from "./request-tracking/components/stepsPart";


function UserPanel() {
  return (
    <div
      dir="rtl"
      className="w-full px-4 md:px-7"
    >
      <div className="mx-auto flex w-full pt-2 flex-col gap-5">
        <StepsPart />
        <DashboardStatCards />

        <div className=" w-full  max-sm:flex-col flex gap-3 py-4 ">
          <MonthlyWorkChart />
          <ActiveCourses />
        </div>
        <RecentMessages />
      </div>
    </div>
  );
}

export default UserPanel;