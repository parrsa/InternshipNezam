import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
} from "lucide-react";

export type StatCard = {
  title: string;
  value: string;
  badge: string;
  icon: typeof Clock3;
  badgeClass: string;
};

export const statCards: StatCard[] = [


  {
    title: "گواهی‌های صادر شده",
    value: "127",
    badge: "۱ در حال صدور",
    icon: Award,
    badgeClass:
      "bg-blue-50 text-blue-900 border-blue-200",
  },
  {
    title: "دوره‌های جاری",
    value: "6",
    badge: "۹۶٪ نرخ تأیید",
    icon: CheckCircle2,
    badgeClass:
      "bg-emerald-50 text-emerald-900 border-emerald-200",
  },
  {
   title: "سرپرستان فعال",
   value: "16",
   badge: "۳ دوره نزد اتمام",
   icon: BookOpen,
   badgeClass:
     "bg-amber-50 text-amber-900 border-amber-200",
 },
    {
    title: " کل کارآموزان",
    value: "89",
    badge: "۴۸ ساعت این ماه",
    icon: Clock3,
    badgeClass:
      "bg-emerald-50 text-emerald-900 border-emerald-200",
  },
];
function DashboardCardOrg() {
  return (
    <div
      dir="ltr"
      className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {statCards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.title}
            className="h-27.5 rounded-xl border border-slate-300 bg-white px-5 py-3 shadow-xs"
          >
            <div
              className="flex h-full items-start justify-between gap-4"
            >
              <div
                className="flex min-w-0 flex-1 flex-col items-end text-right"
              >
                <h3
                  className="text-2xs font-medium leading-6 text-slate-600"
                >
                  {card.title}
                </h3>

                <div
                  className="text-xl font-bold leading-9 tracking-tight text-slate-950"
                >
                  {card.value}
                </div>

                <span
                  className={`inline-flex w-fit items-center rounded-full border px-2 py-0.5 text-[9px] font-medium leading-4 ${card.badgeClass}`}
                >
                  {card.badge}
                </span>
              </div>

              <div
                className="flex h-10.5 w-10.75 mt-1 items-center justify-center rounded-lg bg-indigo-50"
              >
                <Icon
                  size={22}
                  strokeWidth={1.8}
                  className="text-blue-700"
                />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default DashboardCardOrg;