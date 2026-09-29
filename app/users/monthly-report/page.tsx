import React from "react";
import MonthlyTable from "./components/monthlyTable";
import MonthlyCards from "./components/monthlyCards";

function MonthlyPage() {
    return (
        <div className="w-full flex flex-col gap-3 px-5 p-2 items-center justify-center">
            <MonthlyCards />
            <MonthlyTable />
        </div>
    );
}

export default MonthlyPage;