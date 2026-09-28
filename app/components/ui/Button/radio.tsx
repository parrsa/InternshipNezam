"use client";

import { cn } from "@/lib/cn";

interface RadioProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: () => void;
  size?: "lg" | "xl";
  disabled?: boolean;
  label?: string;
  error?: boolean;
}

const inputSizeClasses = {
  lg: "w-5.5 h-5.5",
  xl: "w-8 h-8",
};

const labelSizeClasses = {
  lg: "text-xs",
  xl: "text-base",
};
const borderSizeClasses = {
  lg: "border-5",
  xl: "border-8",
};
function Radio({
  id,
  name,
  checked,
  onChange,
  size = "lg",
  disabled = false,
  label,
  error = false ,
  ...rest
}: RadioProps) {

  const inputClasses = cn(
    "transition rounded-full cursor-pointer ",
    checked ? `bg-input-50 ${borderSizeClasses[size]} border-input-700 `: "bg-white border-3 border-neutral-300",
    inputSizeClasses[size],
    disabled
      ? "bg-neutral-100 border-neutral-300"
      : error
      ? "border-red-600 hover:bg-input-50"
      : " hover:border-input-600 hover:bg-input-50"
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <label htmlFor={id} className={inputClasses}></label>

        {label && (
          <label
            htmlFor={id}
            className={cn(
              "font-medium cursor-pointer ",
              labelSizeClasses[size],
              disabled
                ? "text-neutral-300"
                : checked
                ? "text-input-800"
                : "text-neutral-900"
            )}
          >
            {label}
          </label>
        )}
      </div>

      <input
        id={id}
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="hidden"
        {...rest}
      />   
    </div>
  );
}

export default Radio;