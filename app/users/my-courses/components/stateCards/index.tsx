// "use client";

// import { statCards } from "@/app/users/data";
// import React from "react";

// export type DashboardStatCard = {
//   title: string;
//   value: string | number;
//   badge: string;
//   badgeClass: string;
//   icon: React.ElementType;
// };

// interface DashboardStatCardsProps {
//   cards?: DashboardStatCard[];
// }

// function DashboardStatCards({cards = statCards,}: DashboardStatCardsProps) {
//   return (
//     <div
//       dir="rtl"
//       className="
//         grid
//         w-full
//         grid-cols-1
//         gap-4
//         md:grid-cols-3
//       "
//     >
//       {cards.map((card) => {
//         const Icon = card.icon;

//         return (
//           <article
//             key={card.title}
//             className="
//               h-[139px]
//               rounded-xl
//               border
//               border-slate-300
//               bg-white
//               px-5
//               py-3
//               shadow-xs
//             "
//           >
//             <div
//               className="
//                 flex
//                 h-full
//                 items-start
//                 justify-between
//                 gap-4
//               "
//             >
//               <div
//                 className="
//                   flex
//                   min-w-0
//                   flex-1
//                   flex-col
//                   items-start
//                   text-right
//                 "
//               >
//                 <h3
//                   className="
//                     text-sm
//                     font-medium
//                     leading-6
//                     text-slate-600
//                   "
//                 >
//                   {card.title}
//                 </h3>

//                 <div
//                   className="
//                     text-2xl
//                     font-bold
//                     leading-9
//                     tracking-tight
//                     text-slate-950
//                   "
//                 >
//                   {card.value}
//                 </div>

//                 <span
//                   className={`
//                     inline-flex
//                     w-fit
//                     items-center
//                     rounded-full
//                     border
//                     px-2
//                     py-0.5
//                     text-[10px]
//                     font-medium
//                     leading-4
//                     ${card.badgeClass}
//                   `}
//                 >
//                   {card.badge}
//                 </span>
//               </div>

//               <div
//                 className="
//                   mt-1
//                   flex
//                   h-[42px]
//                   w-[43px]
//                   shrink-0
//                   items-center
//                   justify-center
//                   rounded-lg
//                   bg-indigo-50
//                 "
//               >
//                 <Icon
//                   size={22}
//                   strokeWidth={1.8}
//                   className="text-blue-700"
//                 />
//               </div>
//             </div>
//           </article>
//         );
//       })}
//     </div>
//   );
// }

// export default DashboardStatCards;




import { statCards } from "@/app/users/data";
import React from "react";
export type DashboardStatCard = {
  title: string;
  value: string | number;
  badge: string;
  badgeClass: string;
  icon: React.ElementType;
};

interface DashboardStatCardsProps {
  cards?: DashboardStatCard[];
}

function DashboardStatCards({cards = statCards,}: DashboardStatCardsProps) {
  return (
    <div
      dir="ltr"
      className="
        grid
        w-full
        grid-cols-1
        gap-4
        sm:grid-cols-2
        xl:grid-cols-3
      "
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.title}
            className="
              h-27.5
              rounded-xl
              border
              border-slate-300
              bg-white
              px-5
              py-3
              shadow-xs
            "
          >
            <div
              className="
                flex
                h-full
                items-start
                justify-between
                gap-4
              "
            >
              <div
                className="
                  flex
                  min-w-0
                  flex-1
                  flex-col
                  items-end
                  text-right
                "
              >
                <h3
                  className="
                    text-2xs
                    font-medium
                    leading-6
                    text-slate-600
                  "
                >
                  {card.title}
                </h3>

                <div
                  className="
                    
                    text-xl
                    font-bold
                    leading-9
                    tracking-tight
                    text-slate-950
                  "
                >
                  {card.value}
                </div>

                <span
                  className={`
                    
                    inline-flex
                    w-fit
                    items-center
                    rounded-full
                    border
                    px-2
                    py-0.5
                    text-[9px]
                    font-medium
                    leading-4
                    ${card.badgeClass}
                  `}
                >
                  {card.badge}
                </span>
              </div>

              <div
                className="
                  flex
                  h-10.5
                  w-10.75
                  mt-1
                  items-center
                  justify-center
                  rounded-lg
                  bg-indigo-50
                "
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

export default DashboardStatCards;