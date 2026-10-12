"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const LABELS = ["عمران", "معماری", "برق", "مکانیک"];
const VALUES = [38, 24, 18, 9];
const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"];

const AXIS_COLOR = "#94a3b8";
const FONT_FAMILY = "inherit";

const data: ChartData<"bar"> = {
  labels: LABELS,
  datasets: [
    {
      data: VALUES,
      backgroundColor: COLORS,
      borderRadius: { topLeft: 0, bottomLeft: 0, topRight: 8, bottomRight: 8 },
      borderSkipped: false,
      barPercentage: 0.88,
      categoryPercentage: 1,
    },
  ],
};

const options: ChartOptions<"bar"> = {
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: 0 },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#ffffff",
      titleColor: "#111827",
      bodyColor: "#111827",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      displayColors: false,
      titleFont: { family: FONT_FAMILY, size: 13, weight: "normal" },
      bodyFont: { family: FONT_FAMILY, size: 13 },
      callbacks: {
        label: (ctx) => `value : ${ctx.parsed.x}`,
      },
    },
  },
  scales: {
    x: {
      min: 0,
      max: 40,
      ticks: {
        stepSize: 10,
        color: AXIS_COLOR,
        font: { family: FONT_FAMILY, size: 12 },
      },
      grid: { display: false },
      border: { color: AXIS_COLOR },
    },
    y: {
      ticks: {
        color: AXIS_COLOR,
        font: { family: FONT_FAMILY, size: 12 },
        padding: 8,
      },
      grid: { display: false },
      border: { color: AXIS_COLOR },
    },
  },
};

export default function DistributionChart() {
  return (
    <section className="h-full rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
      <h2 className="text-right text-base font-bold text-gray-900">
        توزیع رشته‌ای
      </h2>

      <div dir="ltr" className="mt-10 h-65 w-full">
        <Bar data={data} options={options} />
      </div>
    </section>
  );
}