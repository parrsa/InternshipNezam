"use client"


import { memo } from "react";
import { Line } from "react-chartjs-2";
import {
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import TrendChartPart from "../parentPartofChart";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip);

const FONT_FAMILY = "";
const TICK_COLOR = "#94a3b8";
const AXIS_COLOR = "#94a3b8";
const GRID_COLOR = "#e2e8f0";
const TRAINEE_COLOR = "#6366f1";
const SUPERVISOR_COLOR = "#10b981";
const TICK_FONT = { family: FONT_FAMILY, size: 11 };

const MONTHS = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"];
const TRAINEES = [32, 45, 58, 52, 71, 89];
const SUPERVISORS = [8, 10, 12, 12, 14, 16];

const createDataset = (label: string, values: number[], color: string) => ({
    label,
    data: values,
    borderColor: color,
    borderWidth: 2,
    tension: 0.4,
    pointRadius: 4,
    pointHoverRadius: 5,
    pointBorderWidth: 2,
    pointBorderColor: color,
    pointBackgroundColor: "#ffffff",
});

const data: ChartData<"line"> = {
    labels: MONTHS,
    datasets: [
        createDataset("کارآموزان", TRAINEES, TRAINEE_COLOR),
        createDataset("سرپرستان", SUPERVISORS, SUPERVISOR_COLOR),
    ],
};

const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { top: 4, right: 4 } },
    interaction: { mode: "index", intersect: false },
    plugins: {
        legend: { display: false },
        tooltip: { rtl: true, textDirection: "rtl" },
    },
    scales: {
        x: {
            grid: { display: false, drawTicks: true },
            border: { color: AXIS_COLOR },
            ticks: { color: TICK_COLOR, font: TICK_FONT, padding: 8 },
        },
        y: {
            min: 0,
            max: 100,
            ticks: { stepSize: 25, color: TICK_COLOR, font: TICK_FONT, padding: 8 },
            border: { display: false, dash: [4, 4] },
            grid: { color: GRID_COLOR },
        },
    },
};

const LEGEND = [
    { label: "سرپرستان", color: SUPERVISOR_COLOR },
    { label: "کارآموزان", color: TRAINEE_COLOR },
] as const;

function LegendMarker({ color }: { color: string }) {
    return (
        <svg width="20" height="10" viewBox="0 0 20 10" aria-hidden="true">
            <line x1="0" y1="5" x2="20" y2="5" stroke={color} strokeWidth="2" />
            <circle cx="10" cy="5" r="3" fill="#fff" stroke={color} strokeWidth="2" />
        </svg>
    );
}

function TrendChart() {
    return (
        <TrendChartPart title=" روند رشد کارآموزان و سرپرستان">
            <div dir="ltr" className="mt-6 h-[260px]  w-full">
                <Line data={data} options={options} />
            </div>

            <ul className="mt-3 flex items-center justify-center gap-4 text-xs">
                {LEGEND.map(({ label, color }) => (
                    <li key={label} className="flex items-center gap-1" style={{ color }}>
                        <LegendMarker color={color} />
                        <span>{label}</span>
                    </li>
                ))}
            </ul>
        </TrendChartPart>
    );
}

export default memo(TrendChart);