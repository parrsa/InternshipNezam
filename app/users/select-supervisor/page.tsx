

// "use client";

// import { useMemo, useState } from "react";
// import { Supervisor, SupervisorCard } from "./components/supervisorCard";
// import { SupervisorFilterBar } from "./components/supervisorFilterBar";
// import { SendRequestBanner } from "./components/sendRequstBanner";



// const FIELD_OPTIONS = [
//   { label: "همه رشته‌ها", value: "all" },
//   { label: "مهندسی عمران", value: "civil" },
//   { label: "معماری", value: "architecture" },
//   { label: "برق", value: "electrical" },
// ];

// const SUPERVISORS: Supervisor[] = [
//   {
//     id: "rezaei",
//     name: "مهندس رضایی",
//     initial: "ر",
//     specialties: "مهندسی عمران — طراح / ناظر / مجری",
//     level: 3,
//     experience: 12,
//     score: 85,
//     capacity: { current: 5, max: 8, percent: 60 },
//     activeProjects: 3,
//     type: "real",
//     field: "civil",
//   },
//   {
//     id: "ahmadi",
//     name: "مهندس احمدی",
//     initial: "ا",
//     specialties: "مهندسی برق — طراح / ناظر",
//     level: 2,
//     experience: 9,
//     score: 92,
//     capacity: { current: 5, max: 8, percent: 62 },
//     activeProjects: 2,
//     type: "real",
//     field: "electrical",
//   },
//   {
//     id: "pars",
//     name: "شرکت مهندسین مشاور پارس",
//     initial: "پ",
//     specialties: "مهندسی عمران — طراح / ناظر / مجری",
//     level: 3,
//     experience: 20,
//     score: 90,
//     capacity: { current: 2, max: 6, percent: 33 },
//     activeProjects: 6,
//     type: "legal",
//     field: "civil",
//   },
//   {
//     id: "karimi",
//     name: "مهندس کریمی",
//     initial: "ک",
//     specialties: "مهندسی معماری — طراح",
//     level: 3,
//     experience: 15,
//     score: 88,
//     capacity: { current: 4, max: 8, percent: 50 },
//     activeProjects: 4,
//     type: "real",
//     field: "architecture",
//   },
// ];

// export default function SupervisorParent() {
//   const [selectedId, setSelectedId] = useState<string | null>("rezaei");
//   const [field, setField] = useState("all");

//   const selected = SUPERVISORS.find((s) => s.id === selectedId);

//   const visible = useMemo(
//     () => SUPERVISORS.filter((s) => field === "all" || s.field === field),
//     [field]
//   );

//   const handleSelect = (id: string) =>
//     setSelectedId((prev) => (prev === id ? null : id));

//   return (
//     <div className="flex w-full flex-col gap-6 p-4">
//       <SupervisorFilterBar
//         selectedName={selected?.name}
//         fieldValue={field}
//         fieldOptions={FIELD_OPTIONS}
//         onFieldChange={setField}
//       />

//       <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//         {visible.map((s) => (
//           <SupervisorCard
//             key={s.id}
//             supervisor={s}
//             active={s.id === selectedId}
//             onSelect={handleSelect}
//           />
//         ))}
//       </div>

//       <SendRequestBanner />

//     </div>
//   );
// }

// "use client";

// import { useMemo, useState } from "react";
// import { SupervisorCard } from "./components/supervisorCard";
// import { SupervisorFilterBar } from "./components/supervisorFilterBar";
// import { SendRequestBanner } from "./components/sendRequstBanner";
// import { useGetSupervisorsForSelect } from "@/core/services/Trainee/queris";
// import { mapApiToSupervisor } from "./mapper";

// const FIELD_OPTIONS = [
//     { label: "همه رشته‌ها", value: "all" },
//     { label: "مهندسی عمران", value: "civil" },
//     { label: "معماری", value: "architecture" },
//     { label: "برق", value: "electrical" },
// ];

// export default function SupervisorParent() {
//     const [selectedId, setSelectedId] = useState<string | null>(null);
//     const [field, setField] = useState("all");

//     const { data, isLoading, isError } = useGetSupervisorsForSelect({
//         pageIndex: 1,
//         take: 20,
//         nationalCode: "",
//         licenseNumber: "",
//     });

//     const supervisors = useMemo(() => {
//         const items = data?.data?.items ?? [];
//         return items.map(mapApiToSupervisor);
//     }, [data]);

//     const selected = supervisors.find((s) => s.id === selectedId);

//     const visible = useMemo(
//         () => supervisors.filter((s) => field === "all" || s.field === field),
//         [supervisors, field]
//     );

//     const handleSelect = (id: string) =>
//         setSelectedId((prev) => (prev === id ? null : id));

//     if (isLoading) return <div className="p-4 text-sm">در حال بارگذاری سرپرستان...</div>;
//     if (isError) return <div className="p-4 text-sm text-red-600">خطا در دریافت لیست سرپرستان</div>;

//     return (
//         <div className="flex w-full flex-col gap-6 p-4">
//             <SupervisorFilterBar
//                 selectedName={selected?.name}
//                 fieldValue={field}
//                 fieldOptions={FIELD_OPTIONS}
//                 onFieldChange={setField}
//             />

//             <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//                 {visible.length === 0 ? (
//                     <p className="text-sm text-gray-500">سرپرستی یافت نشد.</p>
//                 ) : (
//                     visible.map((s) => (
//                         <SupervisorCard
//                             key={s.id}
//                             supervisor={s}
//                             active={s.id === selectedId}
//                             onSelect={handleSelect}
//                         />
//                     ))
//                 )}
//             </div>

//             <SendRequestBanner />
//         </div>
//     );
// }
"use client";

import { useMemo, useState } from "react";
import { SupervisorCard } from "./components/supervisorCard";
import { SupervisorFilterBar } from "./components/supervisorFilterBar";
import { SendRequestBanner } from "./components/sendRequstBanner";
import { useGetSupervisorsForSelect } from "@/core/services/Trainee/queris";
import { useSelectSupervisor } from "@/core/services/Trainee/mutate";
import { mapApiToSupervisor } from "./mapper";

const FIELD_OPTIONS = [
  { label: "همه رشته‌ها", value: "all" },
  { label: "مهندسی معماری", value: "مهندسی معماری" },
  { label: "مهندسی عمران", value: "مهندسی عمران" },
  { label: "مهندسی برق", value: "مهندسی برق" },
];

export default function SupervisorParent() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [field, setField] = useState("all");
  const [description, setDescription] = useState("");

  const { data, isLoading, isError } = useGetSupervisorsForSelect({
    pageIndex: 1,
    take: 20,
    nationalCode: "",
    licenseNumber: "",
  });

  const selectMutation = useSelectSupervisor();

  const supervisors = useMemo(() => {
    const items = data?.data?.items ?? [];
    return items.map(mapApiToSupervisor);
  }, [data]);

  const selected = supervisors.find((s: any) => s.id === selectedId);

  const visible = useMemo(
    () => supervisors.filter((s: any) => field === "all" || s.field === field),
    [supervisors, field]
  );

  const handleSelect = (id: string) =>
    setSelectedId((prev) => (prev === id ? null : id));

  const handleSubmit = () => {
    if (!selectedId) return;
    selectMutation.mutate({
      supervisorId: Number(selectedId),
      description: description.trim(),
    });
  };

  if (isLoading) return <div className="p-4 text-sm">در حال بارگذاری سرپرستان...</div>;
  if (isError) return <div className="p-4 text-sm text-red-600">خطا در دریافت لیست سرپرستان</div>;

  return (
    <div className="flex w-full flex-col gap-6 p-4">
      <SupervisorFilterBar
        selectedName={selected?.name}
        fieldValue={field}
        fieldOptions={FIELD_OPTIONS}
        onFieldChange={setField}
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {visible.length === 0 ? (
          <p className="text-sm text-gray-500">سرپرستی یافت نشد.</p>
        ) : (
          visible.map((s: any) => (
            <SupervisorCard
              key={s.id}
              supervisor={s}
              active={s.id === selectedId}
              onSelect={handleSelect}
            />
          ))
        )}
      </div>

      {/* توضیحات (اختیاری) */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-700">
          توضیحات (اختیاری) برای سرپرست انتخاب‌شده
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="مثلاً: درخواست نظارت بر پروژه مسکونی..."
          className="w-full rounded-lg border border-gray-200 bg-[#FCFBF8] p-3 text-xs outline-none focus:border-blue-800"
        />
      </div>

      <SendRequestBanner
        disabled={!selectedId || selectMutation.isPending}
        loading={selectMutation.isPending}
        onSubmit={handleSubmit}
      />
    </div>
  );
}