// import React from "react";
// import { cn } from "../../../lib/cn.js";

// interface RadioOptionProps {
//   label: string;
//   value?: string;
//   selected: boolean;
//   onClick: () => void;
//   padding?: string;
//   className?: string;
//   disabled?: boolean;
// }

// export const RadioOption: React.FC<RadioOptionProps> = ({
//   label,
//   selected,
//   onClick,
//   padding,
//   className,
//   disabled,
// }) => (
//   <button
//     disabled={disabled}
//     onClick={onClick}
//     type="button"
//     className={cn(
//       "flex-1 rounded-xl transition-all flex items-center gap-2",
//       padding ? padding : "p-1.5",
//       selected && !disabled
//         ? "text-input-700" : disabled ? "text-neutral-300"
//         : "border-gray-200 text-gray-600 hover:border-gray-300",
//       className,
//     )}
//   >
//     <div
//       className={cn(
//         "w-7 h-7 rounded-full flex items-center justify-center",
//         selected && !disabled
//           ? "border-input-700 border-[7.5px]"
//           : disabled
//             ? "bg-neutral-200 border-neutral-300 border-[3px]"
//             : "border-neutral-300 border-[3px]",
//       )}
//     />
//     <span className="text-base font-medium">{label}</span>
//   </button>
// );

import React from "react";
import { cn } from "@/lib/cn";

interface RadioOptionProps {
  label?: string; // تغییر به optional
  value?: string;
  selected: boolean;
  onClick: () => void;
  padding?: string;
  className?: string;
  disabled?: boolean;
  noLabel?: boolean; // اضافه کردن prop جدید
}

export const RadioOption: React.FC<RadioOptionProps> = ({
  label,
  selected,
  onClick,
  padding,
  className,
  disabled,
  noLabel,
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    type="button"
    className={cn(
      "rounded-xl transition-all flex items-center justify-center",
      !noLabel && "flex-1 gap-2",
      padding ? padding : noLabel ? "p-0" : "p-1.5",
      selected && !disabled
        ? "text-input-700" : disabled ? "text-neutral-300"
          : "border-gray-200 text-gray-600 hover:border-gray-300",
      className,
    )}
  >
    <div
      className={cn(
        "w-7 h-7 rounded-full flex items-center justify-center",
        selected && !disabled
          ? "border-input-700 border-[7.5px]"
          : disabled
            ? "bg-neutral-200 border-neutral-300 border-[3px]"
            : "border-neutral-300 border-[3px]",
      )}
    />
    {!noLabel && label && (
      <span className="text-base font-medium">{label}</span>
    )}
  </button>
);