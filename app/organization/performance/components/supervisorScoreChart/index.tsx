"use client"
import { memo, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    Tooltip,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import PerformanceCard from "../performanceCard";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

interface SupervisorScore {
    id: number;
    shortName: string;
    score: number;
}

interface SupervisorScoreChartProps {
    scores: readonly SupervisorScore[];
}

const FONT_FAMILY = "";
const TICK_COLOR = "#94a3b8";
const AXIS_COLOR = "#94a3b8";
const GRID_COLOR = "#e2e8f0";
const BAR_COLOR = "#6366f1";
const TICK_FONT = { family: FONT_FAMILY, size: 11 };

const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { top: 4 } },
    plugins: {
        legend: { display: false },
        tooltip: { rtl: true, textDirection: "rtl" },
    },
    scales: {
        x: {
            grid: { display: false },
            border: { color: AXIS_COLOR },
            ticks: { color: TICK_COLOR, font: TICK_FONT, padding: 10 },
        },
        y: {
            min: 0,
            max: 100,
            ticks: { stepSize: 25, color: TICK_COLOR, font: TICK_FONT, padding: 10 },
           border: { display: false, dash: [4, 4] },
            grid: { color: GRID_COLOR },
        },
    },
};

function SupervisorScoreChart({ scores }: SupervisorScoreChartProps) {
    const data = useMemo<ChartData<"bar">>(
        () => ({
            labels: scores.map((item) => item.shortName),
            datasets: [
                {
                    data: scores.map((item) => item.score),
                    backgroundColor: BAR_COLOR,
                    borderRadius: { topLeft: 8, topRight: 8, bottomLeft: 2, bottomRight: 2 },
                    borderSkipped: false,
                    categoryPercentage: 1,
                    barPercentage: 0.8,
                },
            ],
        }),
        [scores]
    );

    return (
        <PerformanceCard title="امتیاز عملکرد سرپرستان">
            <div dir="ltr" className="mt-6 h-72.5 w-full">
                <Bar data={data} options={options} />
            </div>
        </PerformanceCard>
    );
}

export default memo(SupervisorScoreChart);