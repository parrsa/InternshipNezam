

"use client";

import { useMemo, useState } from "react";
import { Supervisor, SupervisorCard } from "./components/supervisorCard";
import { SupervisorFilterBar } from "./components/supervisorFilterBar";



const FIELD_OPTIONS = [
  { label: "همه رشته‌ها", value: "all" },
  { label: "مهندسی عمران", value: "civil" },
  { label: "معماری", value: "architecture" },
  { label: "برق", value: "electrical" },
];

const SUPERVISORS: Supervisor[] = [
  {
    id: "rezaei",
    name: "مهندس رضایی",
    initial: "ر",
    specialties: "مهندسی عمران — طراح / ناظر / مجری",
    level: 3,
    experience: 12,
    score: 85,
    capacity: { current: 5, max: 8, percent: 60 },
    activeProjects: 3,
    type: "real",
    field: "civil",
  },
  {
    id: "ahmadi",
    name: "مهندس احمدی",
    initial: "ا",
    specialties: "مهندسی برق — طراح / ناظر",
    level: 2,
    experience: 9,
    score: 92,
    capacity: { current: 5, max: 8, percent: 62 },
    activeProjects: 2,
    type: "real",
    field: "electrical",
  },
  {
    id: "pars",
    name: "شرکت مهندسین مشاور پارس",
    initial: "پ",
    specialties: "مهندسی عمران — طراح / ناظر / مجری",
    level: 3,
    experience: 20,
    score: 90,
    capacity: { current: 2, max: 6, percent: 33 },
    activeProjects: 6,
    type: "legal",
    field: "civil",
  },
  {
    id: "karimi",
    name: "مهندس کریمی",
    initial: "ک",
    specialties: "مهندسی معماری — طراح",
    level: 3,
    experience: 15,
    score: 88,
    capacity: { current: 4, max: 8, percent: 50 },
    activeProjects: 4,
    type: "real",
    field: "architecture",
  },
];

export default function SupervisorParent() {
  const [selectedId, setSelectedId] = useState<string | null>("rezaei");
  const [field, setField] = useState("all");

  const selected = SUPERVISORS.find((s) => s.id === selectedId);

  const visible = useMemo(
    () => SUPERVISORS.filter((s) => field === "all" || s.field === field),
    [field]
  );

  const handleSelect = (id: string) =>
    setSelectedId((prev) => (prev === id ? null : id));

  return (
    <div  className="flex w-full flex-col gap-6 p-4">
      <SupervisorFilterBar
        selectedName={selected?.name}
        fieldValue={field}
        fieldOptions={FIELD_OPTIONS}
        onFieldChange={setField}
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {visible.map((s) => (
          <SupervisorCard
            key={s.id}
            supervisor={s}
            active={s.id === selectedId}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}