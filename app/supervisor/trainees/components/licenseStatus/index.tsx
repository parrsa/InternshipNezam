"use client";

import { Settings } from "lucide-react";
import { cn } from "@/lib/cn";
import { Input, TextArea } from "@/app/components/ui/input";
import SwitchButton from "@/app/components/ui/Button/switchButton";

type Option = { label: string; value: string };
export type Item = { value: string; active: boolean };

/* ============ Options مطابق Enum بک‌اند ============ */

const fieldOptions: Option[] = [
  { label: "مهندسی مکانیک", value: "1" },
  { label: "مهندسی برق", value: "2" },
  { label: "مهندسی معماری", value: "4" },
  { label: "مهندسی عمران", value: "5" },
  { label: "شهرسازی", value: "6" },
  { label: "نقشه‌برداری", value: "7" },
  { label: "ترافیک", value: "8" },
  { label: "جوش", value: "9" },
  { label: "خاک و پی", value: "10" },
];

const qualificationOptions: Option[] = [
  { label: "نظارت", value: "1" },
  { label: "طراحی", value: "2" },
  { label: "مجری", value: "3" },
  { label: "آزمایشگاه", value: "4" },
];

const labelClassName = "text-2xs font-semibold text-neutral-900";

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
  experienceYearsError?: string;
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
  experienceYearsError,
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
          <div>
            <Input
              label="سابقه کار (سال)"
              variant="default"
              labelClassName={labelClassName}
              className="mt-2"
              inputSize="sm"
              type="number"
              min={1}
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
              error={!!experienceYearsError}
              errorMessage={experienceYearsError}
            />
          </div>
          <div>
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
      </div>
    </div>
  );
}