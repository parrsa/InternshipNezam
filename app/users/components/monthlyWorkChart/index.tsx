"use client"
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { monthlyWorkHours } from "../../data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
);

const chartData = {
  labels: monthlyWorkHours.labels,

  datasets: [
    {
      data: monthlyWorkHours.values,

      backgroundColor: "#6366F1",

      borderColor: "#6366F1",

      borderWidth: 0,

      borderRadius: 6,

      borderSkipped: false,

      barPercentage: 1.04,

      categoryPercentage: 0.78,
    },
  ],
};

const chartOptions = {
  responsive: true,

  maintainAspectRatio: false,

  animation: {
    duration: 700,
  },

  plugins: {
    legend: {
      display: false,
    },

    tooltip: {
      rtl: true,

      textDirection: "rtl" as const,

      displayColors: false,

      backgroundColor: "#111827",

      titleColor: "#ffffff",

      bodyColor: "#ffffff",

      padding: 10,

      cornerRadius: 8,

      callbacks: {
        label: (context: {
          parsed: {
            y: number | null;
          };
        }) => {
          return `${context.parsed.y ?? 0} ساعت`;
        },
      },
    },
  },

  scales: {
    x: {
      border: {
        display: true,

        color: "#94A3B8",
      },

      grid: {
        display: false,

        drawTicks: true,

        tickLength: 7,

        color: "#CBD5E1",
      },

      ticks: {
        color: "#94A3B8",

        font: {
          family: "Vazirmatn, Tahoma, sans-serif",

          size: 12,
        },

        padding: 8,
      },
    },

    y: {
      min: 0,

      max: 180,

      beginAtZero: true,

      border: {
        display: false,
      },

      grid: {
        color: "#DCE3EF",

        lineWidth: 1,

        drawTicks: false,
      },

      ticks: {
        stepSize: 45,

        color: "#94A3B8",

        padding: 8,

        font: {

          size: 10,
        },
      },
    },
  },
};

function MonthlyWorkChart() {
  return (
    <div
      dir="rtl"
      className="rounded-xl border border-slate-200 bg-white px-7.75 w-[65%] py-5 shadow-sm"
    >
      <div
        className="flex items-center justify-between gap-4"
      >
        <h2
          className="text-s font-bold text-slate-900"
        >
          ساعت کارآموزی ماهانه
        </h2>

        <span
          className="inline-flex items-center gap-1 rounded-full border border-emerald-400 bg-emerald-100 px-2 py-0.5 text-2xs font-medium text-emerald-900"
        >
          <span>↗</span>
          <span>۱۶.۲٪</span>
        </span>
      </div>

      <div
        className="mt-9.75 h-65 w-[95%]"
      >
        <Bar
          data={chartData}
          options={chartOptions}
        />
      </div>
    </div>
  );
}

export default MonthlyWorkChart;