import { BookOpen, Clock3, Tv, User, UsersIcon } from "lucide-react";

export type StatCard = {
  title: string;
  value: string;
  badge: string;
  icon: typeof Clock3;
  badgeClass: string;
};

export const statCards: StatCard[] = [


  {
    title: " کارآموزان حضور یافته",
    value: "45",
    badge: "ماه جاری",
    icon: User,
    badgeClass:
      "bg-emerald-50 text-emerald-900 border-emerald-200",

  },

  {
   title: "جلسات برنامه‌ریزی شده",
   value: "3",
   badge: "این هفته",
   icon: Tv,
   badgeClass:
      "bg-blue-50 text-blue-900 border-blue-200",

 },
    {
    title: " کارآموزان نیازمند جلسه ",
    value: "8",
    badge: "ثبت‌نام شده، بدون جلسه",
    icon: UsersIcon,
    badgeClass:
     "bg-orange-100 text-amber-900 border-amber-200",
  },
];
function CardBriefing() {
  return (
    <div
      dir="rtl"
      className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {statCards.map((card) => {
        const Icon = card.icon;

        return (
          <div
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
          </div>
        );
      })}
    </div>
  );
}

export default CardBriefing;