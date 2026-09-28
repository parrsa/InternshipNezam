"use client";

import { cn } from "@/lib/cn";

interface LabelProps {
  size?: "sm" | "lg" | "customSize";
  customLabelSize?: string;
  customIconSize?: string;
  icon?: any;
  title: string;
  varient?: "soft" | "solid" | "outline"; 
  color?: "primary" | "secondary" | "green" | "sky" | "orange" | "red";
}

const colors: any = {
  primary: {
    soft: "bg-primary-200 text-primary-700",
    solid: "bg-primary-600 text-white",
    outline: "bg-white border-[.5px] border-primary-600 text-primary-700",
  },
  secondary: {
    soft: "bg-secondary-200 text-secondary-700",
    solid: "bg-secondary-600 text-white",
    outline: "bg-white border-[.5px] border-secondary-600 text-secondary-700",
  },
  green: {
    soft: "bg-green-200 text-green-700",
    solid: "bg-green-700 text-white",
    outline: "bg-white border-[.5px] border-green-600 text-green-700",
  },
  sky: {
    soft: "bg-sky-200 text-sky-600",
    solid: "bg-sky-700 text-white",
    outline: "bg-white border-[.5px] border-sky-600 text-sky-800",
  },
  orange: {
    soft: "bg-orange-200 text-orange-700",
    solid: "bg-orange-600 text-white",
    outline: "bg-white border-[.5px] border-orange-600 text-orange-700",
  },
  red: {
    soft: "bg-red-200 text-red-700",
    solid: "bg-red-700 text-white",
    outline: "bg-white border-[.5px] border-red-600 text-red-700",
  },
};

function Label({
  size = "sm",
  customLabelSize,
  customIconSize,
  icon,
  title,
  varient = "soft",
  color = "primary",
  ...rest
}: LabelProps) {
  const labelSizeClasses = {
    sm: "text-sm gap-2 px-2 rounded-md leading-5",
    lg: "text-base gap-2.5 py-0.5 px-3 rounded-lg leading-6",
    customSize: customLabelSize,
  };
  const iconSizeClasses = {
    sm: "w-3.5 h-3.5",
    lg: "w-4.5 h-4.5",
    customSize: customIconSize,
  };
  return (
    <div
      className={cn(
        "flex justify-center items-center w-min font-medium",
        labelSizeClasses[size],
        colors[color][varient],
      )}
      {...rest}
    >
      {icon && <>{icon(iconSizeClasses[size])}</>}
      <span className="mb-1 le">{title}</span>
    </div>
  );
}
0.5;
export default Label;
