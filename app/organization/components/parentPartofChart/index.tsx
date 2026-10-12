import type { ReactNode } from "react";

interface ParentPartofChartProps {
    title: string;
    badge?: ReactNode;
    children: ReactNode;
}

function ParentPartofChart({ title, badge, children }: ParentPartofChartProps) {
    return (
        <div className="w-full rounded-[20px] border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
            <div dir="rtl" className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
                {badge}
            </div>
            {children}
        </div>
    );
}

export default ParentPartofChart;