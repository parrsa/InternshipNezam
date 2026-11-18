"use client";

import { Plus, Settings, Trash2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { Input, TextArea } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/Button";
import SwitchButton from "@/app/components/ui/Button/switchButton";

type Option = { label: string; value: string };
export type Item = { value: string; active: boolean };

export interface ProjectRow {
    id?: string;
    list: string;
    ProjectName: string;
    role: string;
    area: number;
    time: number;
    year: number;
    status: string;
}

const fieldOptions: Option[] = [
    { label: "مهندسی عمران", value: "civil" },
    { label: "معماری و شهرسازی", value: "architecture" },
    { label: "مهندسی برق", value: "electrical" },
    { label: "مهندسی مکانیک", value: "mechanical" },
    { label: "نقشه‌برداری", value: "surveying" },
];

const qualificationOptions: Option[] = [
    { label: "طراحی", value: "design" },
    { label: "نظارت", value: "supervision" },
    { label: "اجرا", value: "execution" },
];

const projectRoleOptions: Option[] = [
    { label: "طراح", value: "designer" },
    { label: "ناظر", value: "supervisor" },
    { label: "مجری", value: "executor" },
];

const projectStatusOptions: Option[] = [
    { label: "در حال انجام", value: "in_progress" },
    { label: "تمام شده", value: "completed" },
    { label: "متوقف شده", value: "stopped" },
];

const labelClassName = "text-2xs font-semibold text-neutral-900";

const toEnglishDigits = (value: string) =>
    value
        .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
        .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

const makeId = () =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `p-${Date.now()}-${Math.random().toString(36).slice(2)}`;

/* ================================================================
   ProjectsTable — جدول native با key پایدار
   ================================================================ */

const cellInputClass =
    "w-full min-w-16 rounded-md border border-neutral-200 bg-white px-2 py-1.5 text-center text-xs outline-none focus:border-neutral-400";
const thClass =
    "whitespace-nowrap px-2 py-3 text-center text-sm font-medium text-neutral-600";
const tdClass = "px-2 py-2 text-center align-middle";

interface ProjectsTableProps {
    projects: ProjectRow[];
    setProjects: (v: ProjectRow[]) => void;
}

function ProjectsTable({ projects, setProjects }: ProjectsTableProps) {
    const updateProject = (index: number, patch: Partial<ProjectRow>) => {
        setProjects(projects.map((p, i) => (i === index ? { ...p, ...patch } : p)));
    };

    const handleAddProject = () => {
        setProjects([
            ...projects,
            {
                id: makeId(),
                list: String(projects.length + 1),
                ProjectName: "",
                role: "designer",
                area: 0,
                time: 0,
                year: 0,
                status: "in_progress",
            },
        ]);
    };

    const handleDeleteProject = (index: number) => {
        setProjects(
            projects
                .filter((_, i) => i !== index)
                .map((p, i) => ({ ...p, list: String(i + 1) }))
        );
    };

    const renderNumber = (
        row: ProjectRow,
        index: number,
        key: "area" | "time" | "year"
    ) => (
        <input
            type="text"
            inputMode="numeric"
            className={cellInputClass}
            value={row[key] ? String(row[key]) : ""}
            onChange={(e) => {
                const digits = toEnglishDigits(e.target.value).replace(/\D/g, "");
                updateProject(index, { [key]: Number(digits) || 0 } as Partial<ProjectRow>);
            }}
        />
    );

    return (
        <div className="w-full rounded-2xl border-2 border-neutral-200 bg-white p-4 sm:p-5">
            <div className="mb-4 flex w-full items-center justify-between gap-2">
                <div className="flex items-center justify-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
                        ۳
                    </span>
                    <h3 className="text-s font-bold text-gray-800">پروژه‌های اجرا شده</h3>
                </div>
                <Button
                    type="button"
                    className="h-8 w-28 text-nowrap text-2xs"
                    rounded="lg"
                    color="input"
                    leftIcon={<Plus />}
                    onClick={handleAddProject}
                >
                    افزودن پروژه
                </Button>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse">
                    <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-50">
                            <th className={thClass}>ردیف</th>
                            <th className={thClass}>نام پروژه</th>
                            <th className={thClass}>نقش</th>
                            <th className={thClass}>مساحت</th>
                            <th className={thClass}>زمان (ماه)</th>
                            <th className={thClass}>سال</th>
                            <th className={thClass}>وضعیت</th>
                            <th className={thClass}>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.length === 0 && (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="py-8 text-center text-xs text-neutral-500"
                                >
                                    هنوز پروژه‌ای اضافه نشده است.
                                </td>
                            </tr>
                        )}

                        {projects.map((row, index) => (
                            <tr
                                key={row.id ?? `row-${index}`}
                                className="border-b border-neutral-100 last:border-0"
                            >
                                <td className={cn(tdClass, "text-xs")}>{row.list}</td>

                                <td className={tdClass}>
                                    <input
                                        type="text"
                                        className={cellInputClass}
                                        value={row.ProjectName}
                                        placeholder="نام پروژه"
                                        onChange={(e) =>
                                            updateProject(index, { ProjectName: e.target.value })
                                        }
                                    />
                                </td>

                                <td className={tdClass}>
                                    <select
                                        className={cn(cellInputClass, "cursor-pointer")}
                                        value={row.role}
                                        onChange={(e) =>
                                            updateProject(index, { role: e.target.value })
                                        }
                                    >
                                        <option value="">انتخاب</option>
                                        {projectRoleOptions.map((o) => (
                                            <option key={o.value} value={o.value}>
                                                {o.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                <td className={tdClass}>{renderNumber(row, index, "area")}</td>
                                <td className={tdClass}>{renderNumber(row, index, "time")}</td>
                                <td className={tdClass}>{renderNumber(row, index, "year")}</td>

                                <td className={tdClass}>
                                    <select
                                        className={cn(cellInputClass, "cursor-pointer")}
                                        value={row.status}
                                        onChange={(e) =>
                                            updateProject(index, { status: e.target.value })
                                        }
                                    >
                                        {projectStatusOptions.map((o) => (
                                            <option key={o.value} value={o.value}>
                                                {o.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                <td className={tdClass}>
                                    <button
                                        type="button"
                                        aria-label="حذف پروژه"
                                        className="cursor-pointer"
                                        onClick={() => handleDeleteProject(index)}
                                    >
                                        <Trash2 size={17} color="red" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/* ================================================================
   ChipGroup
   ================================================================ */

function ChipGroup({
    label,
    options,
    items,
    onChange,
    multiple,
}: {
    label: string;
    options: Option[];
    items: Item[];
    onChange: (items: Item[]) => void;
    multiple: boolean;
}) {
    const isSelected = (value: string) => items.some((i) => i.value === value);

    const handleClick = (value: string) => {
        if (isSelected(value)) {
            onChange(items.filter((i) => i.value !== value));
        } else if (multiple) {
            onChange([...items, { value, active: true }]);
        } else {
            onChange([{ value, active: true }]);
        }
    };

    return (
        <div className="w-full">
            <span className={cn(labelClassName, "mb-3 block")}>{label}</span>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                    const selected = isSelected(option.value);
                    return (
                        <button
                            key={option.value}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => handleClick(option.value)}
                            className={cn(
                                "h-9 rounded-lg border px-4 text-2xs transition-colors",
                                selected
                                    ? "border-input-800 bg-input-800 font-semibold text-white"
                                    : "border-neutral-200 bg-neutral-50 text-neutral-900 hover:bg-neutral-100"
                            )}
                        >
                            {option.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

/* ================================================================
   ActivationRow
   ================================================================ */

function ActivationRow({
    title,
    active,
    onToggle,
}: {
    title: string;
    active: boolean;
    onToggle: (next: boolean) => void;
}) {
    return (
        <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
                <span className="text-2xs font-semibold text-neutral-900">{title}</span>
                <span
                    className={cn(
                        "flex h-5 items-center rounded-full border px-2 text-3xs",
                        active
                            ? "border-emerald-300 bg-emerald-100 text-emerald-800"
                            : "border-neutral-300 bg-neutral-100 text-neutral-600"
                    )}
                >
                    {active ? "فعال" : "غیرفعال"}
                </span>
            </div>
            <SwitchButton checked={active} onChange={onToggle} size="lg" />
        </div>
    );
}

/* ================================================================
   LicenseStatus
   ================================================================ */

interface LicenseStatusProps {
    userType?: "User" | "legal";
    stepNumber?: string;
    fields: Item[];
    setFields: (v: Item[]) => void;
    qualifications: Item[];
    setQualifications: (v: Item[]) => void;
    experienceYears: string;
    setExperienceYears: (v: string) => void;
    activeProjects: string;
    setActiveProjects: (v: string) => void;
    summary: string;
    setSummary: (v: string) => void;
    projects?: ProjectRow[];
    setProjects?: (v: ProjectRow[]) => void;
}

export default function LicenseStatus({
    stepNumber = "۲",
    fields,
    setFields,
    qualifications,
    setQualifications,
    experienceYears,
    setExperienceYears,
    activeProjects,
    setActiveProjects,
    summary,
    setSummary,
    projects = [],
    setProjects,
}: LicenseStatusProps) {
    const labelOf = (options: Option[], v: string) =>
        options.find((o) => o.value === v)?.label ?? v;

    const setActive = (
        items: Item[],
        setItems: (items: Item[]) => void,
        value: string,
        active: boolean
    ) => setItems(items.map((i) => (i.value === value ? { ...i, active } : i)));

    const hasSelection = fields.length > 0 || qualifications.length > 0;

    return (
        <div
            dir="rtl"
            className="w-full rounded-2xl border-2 border-neutral-200 bg-white p-5 shadow-xs sm:p-7"
        >
            <div className="mb-8 flex items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef0f8] text-xs text-blue-800">
                    {stepNumber}
                </span>
                <h3 className="text-s font-semibold text-neutral-900">
                    رشته فعالیت، صلاحیت و سوابق
                </h3>
            </div>

            <div className="flex flex-col gap-5">
                <ChipGroup
                    label="رشتهٔ فعالیت"
                    options={fieldOptions}
                    items={fields}
                    onChange={setFields}
                    multiple={false}
                />

                <ChipGroup
                    label="صلاحیت‌ها (چند انتخابی)"
                    options={qualificationOptions}
                    items={qualifications}
                    onChange={setQualifications}
                    multiple
                />

                {hasSelection && (
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-4">
                        <div className="flex items-center gap-2">
                            <Settings className="size-4 text-neutral-800" strokeWidth={1.75} />
                            <h4 className="text-2xs font-semibold text-neutral-900">
                                مدیریت فعال‌سازی رشته‌ها و صلاحیت‌ها
                            </h4>
                        </div>
                        <p className="mt-2 text-3xs text-neutral-600">
                            با غیرفعال کردن یک رشته یا صلاحیت، درخواست کارآموزی جدید برای آن
                            رشته/صلاحیت برای شما قابل قبول نخواهد بود.
                        </p>

                        <div className="mt-2 divide-y divide-neutral-200">
                            {fields.map((item) => (
                                <ActivationRow
                                    key={`field-${item.value}`}
                                    title={labelOf(fieldOptions, item.value)}
                                    active={item.active}
                                    onToggle={(next) =>
                                        setActive(fields, setFields, item.value, next)
                                    }
                                />
                            ))}
                            {qualifications.map((item) => (
                                <ActivationRow
                                    key={`qualification-${item.value}`}
                                    title={`صلاحیت ${labelOf(qualificationOptions, item.value)}`}
                                    active={item.active}
                                    onToggle={(next) =>
                                        setActive(qualifications, setQualifications, item.value, next)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Input
                        label="سابقه کار (سال)"
                        variant="default"
                        labelClassName={labelClassName}
                        className="mt-2"
                        inputSize="sm"
                        type="number"
                        min={0}
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                    />
                    <Input
                        label="تعداد پروژه فعال"
                        variant="default"
                        labelClassName={labelClassName}
                        className="mt-2"
                        inputSize="sm"
                        type="number"
                        min={0}
                        value={activeProjects}
                        onChange={(e) => setActiveProjects(e.target.value)}
                    />
                </div>

                <div className="w-full">
                    <label
                        htmlFor="experience-summary"
                        className={cn(labelClassName, "mb-2 block")}
                    >
                        خلاصه سوابق
                    </label>
                    <TextArea
                        id="experience-summary"
                        variant="default"
                        rounded="xl"
                        rows={3}
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="خلاصه‌ای از سوابق حرفه‌ای، پروژه‌های اجرا شده و تخصص‌های اصلی..."
                        className="min-h-0 text-xs"
                    />
                </div>

                {setProjects && (
                    <ProjectsTable projects={projects} setProjects={setProjects} />
                )}
            </div>
        </div>
    );
}