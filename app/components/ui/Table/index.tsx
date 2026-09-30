"use client";
import { cn } from "@/lib/cn";
import { useTouchScroll } from "@/lib/useTouchScroll";

interface TableProps {
  tableRow: any;
  tableCol: any;
  minHeight?: string;
  HeaderPY?: string;
  fixed?: boolean; // table-fixed برای عرض دقیق ستون‌ها
}

function Table({
  tableRow,
  tableCol,
  minHeight = "390px",
  HeaderPY,
  fixed = false,
}: TableProps) {
  const { sliderRef, startDragging, onDragging, stopDragging } =
    useTouchScroll();

  return (
    <div className="bg-white h-full">
      <div
        ref={sliderRef}
        style={{ minHeight }}
        className="overflow-x-auto overflow-y-auto cursor-grab active:cursor-grabbing h-full no-scrollbar pb-2"
        onMouseDown={startDragging}
        onMouseMove={onDragging}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onTouchStart={startDragging}
        onTouchMove={onDragging}
        onTouchEnd={stopDragging}
      >
        <table className={cn("min-w-full select-none", fixed && "w-full table-fixed")}>
          <thead className="border-b border-neutral-200 bg-white sticky top-0 z-10">
            <tr>
              {tableCol.map((col: any) => (
                <th
                  key={String(col.key)}
                  className={cn(
                    HeaderPY ?? "py-3",
                    "px-4 text-right text-xs font-bold text-neutral-800",
                    col.width,
                    col.thClassName,
                  )}
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
              tableRow?.map((row: any, idx: number) => (
                <tr
                  key={idx}
                  className={cn(
                    "border-b border-neutral-200 last:border-b-0",
                    row._rowClassName ?? "odd:bg-neutral-50",
                  )}
                >
                  {tableCol.map((col: any) => (
                    <td
                      key={String(col.key)}
                      className={cn(
                        "px-4 py-2 text-right text-nowrap",
                        col.className,
                      )}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;