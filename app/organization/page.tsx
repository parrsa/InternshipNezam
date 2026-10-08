"use client";

import StatCard from "./components/starCard";


export default function OrganizationDashboardPage() {
  return (
    <div dir="rtl" className="p-5 flex flex-col gap-4">
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h2 className="font-bold text-neutral-800 mb-1">
          داشبورد سازمان
        </h2>
        <p className="text-sm text-neutral-500">
          خلاصه وضعیت کارآموزان، سرپرستان، دوره‌ها و گواهی‌ها اینجا نمایش داده می‌شود.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="کارآموزان فعال" value="—" />
        <StatCard label="سرپرستان" value="—" />
        <StatCard label="گواهی‌های صادر شده" value="—" />
      </div>


    </div>
  );
}
