'use client'
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    ChartOptions,
    Legend,
    LinearScale,
    Tooltip,
} from "chart.js"
import { TrendingUp } from "lucide-react"
import { Bar, Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Legend, Tooltip)

ChartJS.defaults.font.family = "inherit"

const months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"]

const barData = {
    labels: months,
    datasets: [
        {
            label: "کل کارآموزان",
            data: [8, 10, 12, 9, 13, 14],
            backgroundColor: "#94A3B8",
            borderRadius: 2,
        },
        {
            label: "تأیید شده",
            data: [6, 8, 10, 7, 9, 11],
            backgroundColor: "#6366F1",
            borderRadius: 2,
        },
    ],
}

const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
        legend: {
            position: "bottom",
            labels: {
                usePointStyle: true,
                pointStyle: "rect",
                boxWidth: 14,
                boxHeight: 14,
                padding: 16,
                color: "#64748B",
            },
        },
        tooltip: { rtl: true, textDirection: "rtl" },
    },
    scales: {
        x: {
            grid: { display: false },
            border: { color: "#94A3B8" },
            ticks: { color: "#94A3B8", font: { size: 11 } },
        },
        y: {
            min: 0,
            max: 16,
            position: "right",
            border: { display: false },
            grid: { color: "#E2E8F0", borderDash: [4, 4] } as any,
            ticks: { stepSize: 4, color: "#94A3B8", font: { size: 11 } },
        },
    },
}

const doughnutData = {
    labels: ["تأیید شده", "در انتظار", "رد شده"],
    datasets: [
        {
            data: [65, 25, 10],
            backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
            borderColor: "#fff",
            borderWidth: 2,
            hoverOffset: 4,
        },
    ],
}

const doughnutOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "58%",
    plugins: {
        legend: {
            position: "bottom",
            rtl: true,
            labels: {
                usePointStyle: true,
                pointStyle: "circle",
                boxWidth: 12,
                padding: 14,
                color: "#475569",
            },
        },
        tooltip: { rtl: true, textDirection: "rtl" },
    },
}

export default function SupervisorCharts() {
    return (
        <div dir="rtl" className="w-full px-4 mt-5">
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* نمودار میله‌ای */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <p className="text-black font-bold text-sm">
                            کارآموزان و درخواست‌های تأیید شده
                        </p>
                        <span className="flex items-center gap-1 text-2xs text-green-900 bg-green-100 border border-green-300 rounded-xl px-2 py-1">
                            <TrendingUp size={14} />
                            روند صعودی
                        </span>
                    </div>
                    <div className="h-[300px]">
                        <Bar data={barData} options={barOptions} />
                    </div>
                </div>

                {/* نمودار دونات */}
                <div className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col gap-4">
                    <p className="text-black font-bold text-sm">وضعیت درخواست‌ها</p>
                    <div className="h-[300px]">
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>
                </div>
            </div>
        </div>
    )
}