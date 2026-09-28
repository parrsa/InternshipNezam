"use client";

import { cn } from "@/lib/cn";
import { useState } from "react";

interface SwitchButtonProps {
  id: string;
  firstValueCheck?: boolean;
  size?: "lg" | "xl";
  disabled?: boolean;
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

const inputSizeClasses = {
  lg: "w-10",
  xl: "w-14",
};

const keySizeClasses = {
  lg: "w-4 h-4",
  xl: "w-6 h-6",
};

function SwitchButton({
  id,
  firstValueCheck = false,
  size = "lg",
  disabled = false,
  ...rest
}: SwitchButtonProps) {
  const [value, setValue] = useState<boolean>(firstValueCheck);

  const inputClasses = cn(
    "flex transition items-center rounded-full cursor-pointer p-1",
    value ? "bg-input-700 justify-start" : "bg-neutral-500 justify-end",
    inputSizeClasses[size],
    disabled
      ? "bg-input-400"
        : "hover:bg-neutral-700",
    " ",
  );
const keyClasses = cn(
    "block rounded-full",
    keySizeClasses[size],
    disabled ? "bg-neutral-200" : "bg-white"
)
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <label htmlFor={id} className={inputClasses}>
          <span className={keyClasses}></span>
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
    </div>
  );
}

export default SwitchButton;
