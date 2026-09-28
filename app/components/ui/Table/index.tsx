// "use client";
// import { cn } from "../../../lib/cn.js";
// import { useTouchScroll } from "../../../lib/useTouchScroll.js";

// interface TableProps {
//   tableRow: any;
//   tableCol: any;
//   minHeight?: string;
// }

// function Table({ tableRow, tableCol, minHeight = "390px" }: TableProps) {
//   const { sliderRef, startDragging, onDragging, stopDragging } =
//     useTouchScroll();
//   return (
//     <div className="bg-white overflow-y-hidden h-full">
//       <div
//         ref={sliderRef}
//         style={{
//           minHeight: minHeight,
//           // minWidth: "max-content",
//         }}
//         className="overflow-x-auto overflow-y-auto cursor-grab active:cursor-grabbing h-full no-scrollbar"
//         onMouseDown={startDragging}
//         onMouseMove={onDragging}
//         onMouseUp={stopDragging}
//         onMouseLeave={stopDragging}
//         onTouchStart={startDragging}
//         onTouchMove={onDragging}
//         onTouchEnd={stopDragging}
//       >
//         <table className="min-w-full select-none">
//           <thead className="border-b border-brand-500 bg-white sticky top-0 z-10">
//             <tr className="px-6">
//               {tableCol.map((col: any, index: number) => (
//                 <th
//                   key={String(col.key)}
//                   className={`py-3 text-base font-bold text-brand-800 px-2
//                    ${col.width} ${index === 0 && "pr-3"} ${index === 6 && "pl-3"
//                     }`}
//                 >
//                   {col.label}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="bg-white">
//             {tableRow?.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={tableCol.length}
//                   className="py-6 text-center text-gray-500 h-72 text-lg"
//                 >
//                   موردی یافت نشد.
//                 </td>
//               </tr>
//             ) : (
//               <>
//                 {tableRow?.map((row: any, idx: number) => (
//                   <tr
//                     key={idx}
//                     className="px-1 odd:bg-neutral-50 border-b border-neutral-200 "
//                   >
//                     {tableCol.map((col: any, index: number) => (
//                       <td
//                         key={String(col.key)}
//                         className={cn(
//                           "py-3.5 text-bace font-medium px-2 text-nowrap",
//                           index === 0 && "pr-3",
//                           col.className,
//                         )}
//                       >
//                         {col.render ? col.render(row) : (row as any)[col.key]}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Table;



"use client";
import { cn } from "@/lib/cn";
import { useTouchScroll } from "@/lib/useTouchScroll";

interface TableProps {
  tableRow: any;
  tableCol: any;
  minHeight?: string;
  HeaderPY?: string
}

function Table({ tableRow, tableCol, minHeight = "390px", HeaderPY }: TableProps) {
  const { sliderRef, startDragging, onDragging, stopDragging } =
    useTouchScroll();
  return (
    <div className="bg-white h-full">
      <div
        ref={sliderRef}
        style={{
          minHeight: minHeight,
          // minWidth: "max-content",
        }}
        className="overflow-x-auto overflow-y-auto cursor-grab active:cursor-grabbing h-full no-scrollbar pb-2"
        onMouseDown={startDragging}
        onMouseMove={onDragging}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onTouchStart={startDragging}
        onTouchMove={onDragging}
        onTouchEnd={stopDragging}
      >
        <table className="min-w-full select-none">
          <thead className="border-b border-brand-500 bg-white sticky top-0 z-10">
            <tr className="px-6">
              {tableCol.map((col: any, index: number) => (
                <th
                  key={String(col.key)}
                  className={` ${HeaderPY ? HeaderPY : "py-3"} text-sm font-bold text-neutral-800 px-2
                   ${col.width} ${index === 0 && "pr-3"} ${index === 6 && "pl-3"
                    }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {tableRow?.length === 0 ? (
              <tr>
                <td
                  colSpan={tableCol.length}
                  className="py-6 text-center text-gray-500 h-72 text-lg"
                >
                  موردی یافت نشد.
                </td>
              </tr>
            ) : (
              <>
                {tableRow?.map((row: any, idx: number) => (
                  <tr
                    key={idx}
                    className={cn(
                      "px-1 odd:bg-neutral-50 border-b border-neutral-200",
                      row._rowClassName || "" // اضافه کردن این خط
                    )}
                  >
                    {tableCol.map((col: any, index: number) => (
                      <td
                        key={String(col.key)}
                        className={cn(
                          "py-3.5 text-bace font-medium px-2 text-nowrap",
                          index === 0 && "pr-3",
                          col.className,
                        )}
                      >
                        {col.render ? col.render(row) : (row as any)[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
