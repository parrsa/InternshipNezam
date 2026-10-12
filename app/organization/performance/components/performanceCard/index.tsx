import type { ReactNode } from "react";

interface PerformanceCardProps {
    title: string;
    children: ReactNode;
}

function PerformanceCard({ title, children }: PerformanceCardProps) {
    return (
        <section className="w-full rounded-[20px] border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
            <h2 className="mb-5 text-s font-semibold text-slate-900">
                {title}
            </h2>
            {children}
        </section>
    );
}

export default PerformanceCard;