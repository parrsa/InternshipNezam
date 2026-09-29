"use client";
import { Star, FileText, Download, CircleCheck, UserCheck, Building2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/app/components/ui/Button";
import Modal from "@/app/components/ui/Modal";
import Table from "@/app/components/ui/Table";
import { Supervisor } from "../supervisorCard";

const fa = (n: number) => new Intl.NumberFormat("fa-IR").format(n);

export interface SupervisorProject {
    id: string | number;
    name: string;
    role: string;
    area: number;
    year: number;
    status: "done" | "running";
}

export interface SupervisorResume {
    fileName: string;
    description: string;
    url?: string;
}

interface SupervisorProfileModalProps {
    supervisor: Supervisor;
    isOpen: boolean;
    active: boolean;
    onClose: () => void;
    onSelect: (id: string) => void;
    projects?: SupervisorProject[];
    resume?: SupervisorResume;
}

const defaultProjects: SupervisorProject[] = [
    { id: 1, name: "برج مسکونی پارسیان", role: "مدیر پروژه", area: 12000, year: 1403, status: "running" },
    { id: 2, name: "مجتمع تجاری کیان", role: "ناظر رشته عمران", area: 8500, year: 1402, status: "done" },
    { id: 3, name: "بیمارستان مهر", role: "طراح سازه", area: 15000, year: 1401, status: "done" },
    { id: 4, name: "مدرسه شهید بهشتی", role: "مجری", area: 4200, year: 1400, status: "done" },
];

const defaultResume: SupervisorResume = {
    fileName: "resume_razai_1404.pdf",
    description: "فایل رزومه شخصی — ۱.۲ مگابایت",
};

function StatusBadge({ status }: { status: SupervisorProject["status"] }) {
    const running = status === "running";
    return (
        <span
            className={cn(
                "inline-block rounded-full border px-3 py-0.5 text-2xs font-medium",
                running
                    ? "border-amber-500 bg-amber-100 text-amber-900"
                    : "border-green-500 bg-green-100 text-green-900"
            )}
        >
            {running ? "در حال اجرا" : "اتمام یافته"}
        </span>
    );
}

function StatCard({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl bg-neutral-50 py-4">
            <span className="text-3xs text-gray-500">{label}</span>
            <div className="flex items-center gap-1 text-md font-bold text-gray-900">{children}</div>
        </div>
    );
}

export function SupervisorProfileModal({
    supervisor: s,
    isOpen,
    active,
    onClose,
    onSelect,
    projects = defaultProjects,
    resume = defaultResume,
}: SupervisorProfileModalProps) {
    const isLegal = s.type === "legal";

    const tableCol = [
        {
            key: "name",
            label: "نام پروژه",
            className: "text-2xs text-gray-900 font-semibold",
        },
        { key: "role", label: "نقش", className: "text-2xs text-gray-900 font-normal" },
        {
            key: "area",
            label: "مساحت",
            className: "text-2xs text-gray-900  font-normal",
            render: (r: SupervisorProject) => `${fa(r.area)} مترمربع`,
        },
        {
            key: "year",
            label: "سال",
            className: "text-2xs text-gray-900 font-normal",
            render: (r: SupervisorProject) => new Intl.NumberFormat("fa-IR", { useGrouping: false }).format(r.year),
        },
        {
            key: "status",
            label: "وضعیت",
            className: "text-xs",
            render: (r: SupervisorProject) => <StatusBadge status={r.status} />,
        },
    ];

    const tableRow = projects.map((p) => ({ ...p, _rowClassName: "odd:bg-white" }));

    const header = (
        <div className="flex items-center gap-4 py-1">
            <div className="flex h-12 w-12  items-center justify-center rounded-full bg-indigo-100 text-base text-indigo-700">
                {isLegal ? <Building2 size={28} /> : s.initial}
            </div>
            <div className="flex flex-col gap-1.5">
                <h2 className="text-sm font-bold text-gray-900">{s.name}</h2>
                <p className="text-2xs text-gray-500">
                    {s.field} — {s.specialties} — پایه {fa(s.level)}
                </p>
            </div>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            closeModal={onClose}
            title={header as any}
            size="xl"
            className="sm:max-w-175 no-scrollbar  "
        >
            <div className="mt-2 flex  gap-4">
                <StatCard label="امتیاز">
                    <Star size={17} className="text-amber-500" />
                    <span>{fa(s.score)}</span>
                </StatCard>
                <StatCard label="سابقه">
                    <span>{fa(s.experience)} سال</span>
                </StatCard>
                <StatCard label="ظرفیت">
                    <span dir="ltr">
                        {fa(s.capacity.current)}/{fa(s.capacity.max)}
                    </span>
                </StatCard>
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-gray-900">
                <FileText size={16} />
                <span>پروژه‌های اجرا شده</span>
            </div>
            <Table
                tableRow={tableRow}
                tableCol={tableCol}
                minHeight="0px"
                HeaderPY="py-2"
            />

            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-gray-900">
                <Download size={16} />
                <span>رزومه آپلود شده</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-neutral-200  p-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-2xs font-bold text-rose-500">
                        PDF
                    </div>
                    <div className="flex flex-col ">
                        <span className="text-right text-s font-medium text-gray-900">
                            {resume.fileName}
                        </span>
                        <span className="text-3xs text-gray-500">{resume.description}</span>
                    </div>
                </div>

                <Button
                    leftIcon={<Download size={18} />}
                    size="xs"
                    variant="solid"
                    onClick={() => resume.url && window.open(resume.url, "_blank")}
                    type="button"
                    className={cn("flex px-4 items-center justify-center gap-2 h-8.75 rounded-xl border border-gray-200 bg-amber-50/40  text-nowrap text-xs font-bold text-neutral-900 transition-colors active:text-neutral-950 active:bg-teal-50 hover:text-neutral-950 hover:bg-teal-50")}
                >
                    دانلود
                </Button>
            </div>

            <div className="mt-3 flex items-center gap-5 border-t border-neutral-200 pt-4">
                <Button
                    variant={active ? "solid" : "outline"}
                    color="input"
                    rounded="lg"
                    leftIcon={active ? <CircleCheck size={18} /> : <UserCheck size={18} />}
                    textSize="xs"
                    onClick={() => onSelect(s.id)}
                    className={cn(
                        "h-9 flex-1 py-0 font-semibold",
                        active
                            ? "bg-blue-800 text-white hover:bg-blue-700"
                            : "border-gray-200 bg-[#FDFCF8] text-neutral-900 hover:bg-gray-50"
                    )}
                >
                    {active ? "انتخاب شد" : "انتخاب سرپرست"}
                </Button>

                <Button
                    size="xs"
                    onClick={onClose}
                    type="button"
                    className={cn("flex px-4 items-center justify-center gap-2 h-8.75 rounded-xl  bg-amber-50/40  text-nowrap text-xs font-bold text-neutral-900 transition-colors active:text-neutral-950 active:bg-teal-50 hover:text-neutral-950 hover:bg-teal-50")}
                >
                    بستن
                </Button>

            </div>
        </Modal>
    );
}