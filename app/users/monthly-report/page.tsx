// import React from "react";
// import MonthlyTable from "./components/monthlyTable";
// import MonthlyCards from "./components/monthlyCards";
// import AllInformation from "../final-report/components/allInformation";
// import ActivitySummary from "../final-report/components/activitySummary";

// function MonthlyPage() {
//     return (
//         <div className="w-full flex flex-col gap-3 px-5 p-2 items-center justify-center">
//             <MonthlyCards />
            
//             <MonthlyTable />
//         </div>
//     );
// }

// export default MonthlyPage;



import MonthlyTable from "./components/monthlyTable";
import MonthlyCards from "./components/monthlyCards";
import FinalReport from "../final-report/page";

function MonthlyPage() {
    return (
        <div className="w-full flex flex-col gap-3 px-5 p-2 items-center justify-center">
            <MonthlyCards />

            <MonthlyTable />

            <FinalReport />
        </div>
    );
}

export default MonthlyPage;