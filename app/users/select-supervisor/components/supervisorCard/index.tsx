"use client";
import { Star, Eye, UserCheck, CircleCheck, Building2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/app/components/ui/Button";
import { useState } from "react";
import { SupervisorProfileModal } from "../supervisorProfile";

export interface Supervisor {
  id: string;
  name: string;
  initial: string;
  specialties: string;
  level: number;
  experience: number;
  score: number;
  capacity: { current: number; max: number; percent: number };
  activeProjects: number;
  type: "real" | "legal";
  field: string;
}

interface SupervisorCardProps {
  supervisor: Supervisor;
  active: boolean;
  onSelect: (id: string) => void;
  onViewProfile?: (id: string) => void;
}

const fa = (n: number) => new Intl.NumberFormat("fa-IR").format(n);

export function SupervisorCard({
  supervisor: s,
  active,
  onSelect,
  onViewProfile,
}: SupervisorCardProps) {

  const [profileOpen, setProfileOpen] = useState(false);

  const isLegal = s.type === "legal";

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border bg-white p-5 py-8  transition-all duration-200",
        active
          ? "border-[1.5px] border-input-800 shadow-[0_0_0_2px_rgba(30,64,175,0.08)]"
          : "border-neutral-200 shadow-sm"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-13 w-13  items-center justify-center mt-1 rounded-full bg-indigo-100 text-sm text-indigo-700">
            {isLegal ? <Building2 size={26} /> : s.initial}
          </div>
          <div className="flex flex-col gap-1 pt-1.5">
            <h3 className="text-xs font-bold text-gray-900">{s.name}</h3>
            <p className="text-3xs text-gray-500">{s.specialties}</p>
            <p className="text-3xs text-gray-500">
              پایه {fa(s.level)} — {fa(s.experience)} سال سابقه
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 pt-3 text-xs font-bold text-gray-900">
          <Star size={17} className="text-amber-500" />
          <span>{fa(s.score)}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-2xs text-gray-500">
        <span>ظرفیت کارآموز</span>
        <span className=" text-2xs">
          {fa(s.capacity.current)} / {fa(s.capacity.max)}
        </span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden flex items-end justify-end rounded-full bg-indigo-100">
        <div
          className="h-full rounded-full bg-blue-800 transition-all duration-300"
          style={{ width: `${s.capacity.percent}%` }}
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-2xs text-gray-500">
          پروژه فعال: <b className="text-gray-900">{fa(s.activeProjects)}</b>
        </span>
        <span
          className={cn(
            "rounded-full border px-2 py-0.5 text-2xs",
            isLegal
              ? "border-sky-200 bg-sky-100 text-sky-700"
              : "border-gray-200 bg-gray-100 text-gray-600"
          )}
        >
          {isLegal ? "شخص حقوقی" : "شخص حقیقی"}
        </span>
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          color="input"
          leftIcon={<Eye size={18} />}
          onClick={() => { setProfileOpen(true); onViewProfile?.(s.id); }}

          className="h-9 flex-1 border-gray-200 bg-[#FDFCF8] py-0 font-semibold text-gray-900 hover:border-gray-300 hover:bg-gray-50"
          textSize="xs"
        >
          مشاهده پروفایل
        </Button>
        <Button
          variant={active ? "solid" : "outline"}
          color="input"
          rounded="lg"
          leftIcon={active ? <CircleCheck size={17} className="mb-1" /> : <UserCheck size={18} className="mb-1" />}
          onClick={() => onSelect(s.id)}
          textSize="xs"
          className={cn(
            "h-9 flex-1 py-0",
            active
              ? "bg-blue-800  text-white font-semibold hover:bg-blue-700"
              : "border-gray-200 bg-[#FDFCF8] text-neutral-900 font-semibold hover:border-gray-300 hover:bg-gray-50"
          )}
        >
          {active ? "انتخاب شد" : "انتخاب سرپرست"}
        </Button>
      </div>

      <SupervisorProfileModal
        supervisor={s}
        isOpen={profileOpen}
        active={active}
        onClose={() => setProfileOpen(false)}
        onSelect={onSelect}
      />

    </div>
  );
}