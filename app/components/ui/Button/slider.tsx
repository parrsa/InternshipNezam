"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface PriceRangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultMin?: number;
  defaultMax?: number;
  disabled?: boolean;
  setMinValue: (value: string | number) => void;
  setMaxValue: (value: string | number) => void;
  size?: "sm" | "lg";
  width?: string
}

const labelSizeClasses = {
  sm: "text-xs",
  lg: "text-sm",
};
const pipeSizeClasses = {
  sm: "h-1",
  lg: "h-1.5",
};


export default function Slider({
  min = 0,
  max = 10000000,
  step = 100000,
  defaultMin = 0,
  defaultMax = 10000000,
  size = "sm",
  width = "100%",
  disabled = false,
  setMinValue,
  setMaxValue,
}: PriceRangeSliderProps) {
  const [minValueInput, setMinValueInput] = useState(defaultMin);
  const [maxValueInput, setMaxValueInput] = useState(defaultMax);

  const minPercent = ((minValueInput - min) / (max - min)) * 100;
  const maxPercent = ((maxValueInput - min) / (max - min)) * 100;

  const handleMinChange = (value: number) => {
    if (value >= maxValueInput) return;
    setMinValueInput(value);
    setMinValue(value);
  };

  const handleMaxChange = (value: number) => {
    if (value <= minValueInput) return;
    setMaxValueInput(value);
    setMaxValue(value);
  };

  return (
    <div className="slider flex flex-col" style={{width: width, direction:"ltr"}}>
      <div className="relative w-full h-10 flex items-center">
        <div className={cn(pipeSizeClasses[size] ,"absolute w-full bg-neutral-200 rounded-full")}></div>
        <div
          className={cn(pipeSizeClasses[size] ,"absolute rounded-full" ,disabled ? "bg-neutral-200" : "bg-neutral-600 slider-activeSection")}
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        ></div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValueInput}
          disabled={disabled}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className={cn(size === "sm" ? "slider-thumb-sm" : "slider-thumb-lg",
            "absolute w-full appearance-none bg-transparent pointer-events-none",
            disabled ? "cursor-not-allowed" : "slider-input",
          )}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValueInput}
          disabled={disabled}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className={cn(size === "sm" ? "slider-thumb-sm" : "slider-thumb-lg",
            "absolute w-full appearance-none bg-transparent pointer-events-none",
            disabled ? "cursor-not-allowed" : "slider-input",
          )}
        />
      </div>
      <div className="flex justify-between text-sm font-medium">
        <span className={cn(labelSizeClasses[size])}>{minValueInput.toLocaleString("fa-IR")}</span>
        <span className={cn(labelSizeClasses[size])}>{maxValueInput.toLocaleString("fa-IR")}</span>
      </div>
    </div>
  );
}
