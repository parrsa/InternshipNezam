import PerformanceDetails from "./components/performanceDetails";
import PerformanceTrendChart from "./components/performanceTrendChart";
import SupervisorScoreChart from "./components/supervisorScoreChart";


const SUPERVISOR_SCORES = [
    { id: 1, name: "مهندس رضایی", shortName: "رضایی", score: 95 },
    { id: 2, name: "مهندس احمدی", shortName: "احمدی", score: 92 },
    { id: 3, name: "مهندس کریمی", shortName: "کریمی", score: 88 },
    { id: 4, name: "مهندس موسوی", shortName: "موسوی", score: 84 },
    { id: 5, name: "مهندس جوادی", shortName: "جوادی", score: 78 },
    { id: 6, name: "مهندس صادقی", shortName: "صادقی", score: 0 },
];

function Performance() {
    return (
        <div
            dir="rtl"
            className="w-full flex flex-col gap-5 px-5 p-2 items-center justify-center"
        >
            <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
                <SupervisorScoreChart scores={SUPERVISOR_SCORES} />
                <PerformanceDetails scores={SUPERVISOR_SCORES} />
            </div>

            <PerformanceTrendChart />
        </div>
    );
}

export default Performance