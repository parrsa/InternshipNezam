"use client";

import { cn } from "@/lib/cn";
import { Check } from "lucide-react";
import { useState } from "react";

interface CheckBoxProps {
  id: string;
  firstValueCheck?: boolean;
  size?: "lg" | "xl";
  disabled?: boolean;
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

const inputSizeClasses = {
  lg: "w-5.5 h-5.5",
  xl: "w-8 h-8",
};
const labelSizeClasses = {
  lg: "text-xs",
  xl: "text-base",
};
const iconSizeClasses = {
  lg: "w-3.5 h-3.5",
  xl: "w-5 h-5",
};
const errorMsgSizeClasses = {
  lg: "text-2xs",
  xl: "text-xs",
};
  const roundedClasses = {
    lg: "rounded-md",
    xl: "rounded-lg",
  };
function CheckBox({
  id,
  firstValueCheck = false,
  size = "lg",
  disabled = false,
  label,
  error = false,
  errorMessage,
  ...rest
}: CheckBoxProps) {
  const [value, setValue] = useState<boolean>(firstValueCheck);

  const inputClasses = cn(
    "flex transition justify-center items-center border-[.5px] text-white hover:text-input-600 cursor-pointer",
    value ? "bg-input-700" : "bg-white",
    roundedClasses[size],
    inputSizeClasses[size],
    disabled
      ? "bg-neutral-300 border-neutral-300"
      : error
        ? "border-red-600 hover:bg-input-50"
        : "border-neutral-300 hover:border-input-600 hover:bg-input-50",
    " ",
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <label htmlFor={id} className={inputClasses}>
          {value && <Check className={cn(iconSizeClasses[size])} />}
        </label>
        <label
          htmlFor={id}
          className={cn(
            "font-medium cursor-pointer",
            labelSizeClasses[size],
            disabled
              ? "text-neutral-300"
              : value
                ? "text-input-800"
                : "text-neutral-900",
          )}
        >
          {label}
        </label>
      </div>
      <input
        id={id}
        type="checkbox"
        className="hidden"
        onChange={(e: any) => setValue(e.target.checked)}
        disabled={disabled}
        {...rest}
      />
      {error && (
        <span
          className={cn(errorMsgSizeClasses[size], "text-red-600 font-medium")}
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
}

export default CheckBox;
