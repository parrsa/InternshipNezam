"use client";

import { cn } from "@/lib/cn";
import { useId, useState } from "react";

interface SwitchButtonProps {
  id?: string;
  checked?: boolean;
  firstValueCheck?: boolean;
  onChange?: (checked: boolean) => void;
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
  checked,
  firstValueCheck = false,
  onChange,
  size = "lg",
  disabled = false,
}: SwitchButtonProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  const [innerValue, setInnerValue] = useState<boolean>(firstValueCheck);
  const isControlled = checked !== undefined;
  const value = isControlled ? checked : innerValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.checked;
    if (!isControlled) setInnerValue(next);
    onChange?.(next);
  };

  const inputClasses = cn(
    "flex transition items-center rounded-full cursor-pointer p-1",
    value ? "bg-input-700 justify-start" : "bg-neutral-500 justify-end",
    inputSizeClasses[size],
    disabled ? "bg-input-400" : "hover:bg-neutral-700",
    " ",
  );
  const keyClasses = cn(
    "block rounded-full",
    keySizeClasses[size],
    disabled ? "bg-neutral-200" : "bg-white",
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <label htmlFor={inputId} className={inputClasses}>
          <span className={keyClasses}></span>
        </label>
      </div>
      <input
        id={inputId}
        type="checkbox"
        className="hidden"
        checked={value}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
}

export default SwitchButton;