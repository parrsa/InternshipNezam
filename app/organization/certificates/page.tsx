// import { Button } from "@/app/components/ui/Button"
// import { Plus, WalletIcon } from "lucide-react"

// const infoData = [
//     {
//         id: 1,
//         title: " کل",
//         number: 127
//     },
//     {
//         id: 2,
//         title: "صادر شده",
//         number: 124
//     },
//     {
//         id: 3,
//         title: "در انتظار",
//         number: 3
//     },

// ]

// function Certificates() {

//     return (
//         <div className="w-full flex flex-col gap-4  px-5 p-2 items-center justify-center">
//             <div className="w-full flex  items-center justify-between gap-4 pt-2">
//                 <div className=" grid grid-cols-3 grid-rows-[130px]  w-2/5  gap-4">
//                     {infoData.map((item: any) => (
//                         <div key={item.id} className=" bg-white rounded-2xl shadow-sm border border-neutral-300 flex justify-center items-start p-4 gap-2 flex-col ">
//                             <p className="text-neutral-500 font-medium text-2xs">{item.title}</p>
//                             <p className="text-black font-bold text-xl">{item.number}</p>
//                         </div>
//                     ))}
//                 </div>
//                 <div>
//                     <div >
//                         <Button
//                             type="button"
//                             variant="solid"
//                             color="input"
//                             className="text-xs font-semibold"
//                             size="xs"
//                             rounded="lg"
//                             leftIcon={
//                                 <Plus className="w-5 h-5" />
//                             }
//                         >
//                             صدور گواهی
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Certificates


import { Button } from "@/app/components/ui/Button";
import { Plus } from "lucide-react";
import TablePart from "./components";

const infoData = [
  { id: 1, title: "کل", number: 127 },
  { id: 2, title: "صادر شده", number: 124 },
  { id: 3, title: "در انتظار", number: 3 },
];

function Certificates() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 px-5 p-2">
      <div className="flex w-full items-center justify-between gap-4 pt-2">
        <div className="grid w-2/5 grid-cols-3 grid-rows-[130px] gap-4">
          {infoData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-start justify-center gap-2 rounded-2xl border border-neutral-300 bg-white p-4 shadow-sm"
            >
              <p className="text-2xs font-medium text-neutral-500">
                {item.title}
              </p>
              <p className="text-xl font-bold text-black">{item.number}</p>
            </div>
          ))}
        </div>
        <div>
          <Button
            type="button"
            variant="solid"
            color="input"
            className="text-xs font-semibold"
            size="xs"
            rounded="lg"
            leftIcon={<Plus className="h-5 w-5" />}
          >
            صدور گواهی
          </Button>
        </div>
      </div>

      <TablePart />
    </div>
  );
}

export default Certificates;
