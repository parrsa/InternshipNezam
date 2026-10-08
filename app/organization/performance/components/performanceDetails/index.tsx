import { memo } from "react";
import PerformanceCard from "../performanceCard";

interface SupervisorScore {
    id: number;
    name: string;
    score: number;
}

interface PerformanceDetailsProps {
    scores: readonly SupervisorScore[];
}

const faNumber = new Intl.NumberFormat("fa-IR");

function PerformanceDetails({ scores }: PerformanceDetailsProps) {
    return (
        <PerformanceCard title="جزئیات عملکرد">
            <ul className="mt-8 flex flex-col gap-4">
                {scores.map(({ id, name, score }) => (
                    <li key={id} className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-xs font-medium text-slate-900">
                            <span>{name}</span>
                            <span className="font-bold">{faNumber.format(score)}</span>
                        </div>

                        <div
                            dir="ltr"
                            role="progressbar"
                            aria-label={name}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={score}
                            className="h-2 w-full overflow-hidden rounded-full bg-[#d1d9f0]"
                        >
                            <div
                                className="h-full  bg-[#1b3fae]"
                                style={{ width: `${score}%` }}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </PerformanceCard>
    );
}

export default memo(PerformanceDetails);