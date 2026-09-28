"use client";
import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SelectOption {
    label: string;
    value: string;
}

export interface SelectProps {
    label?: string;
    placeholder?: string;
    options: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    className?: string;
}

export function Select({
    label,
    placeholder = "انتخاب",
    options,
    value,
    onChange,
    disabled = false,
    className,
}: SelectProps) {
    const [open, setOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel = options.find((option) => option.value === value)?.label;

    return (
        <div ref={containerRef} className={cn("relative flex w-full flex-col gap-1.5", className)}>
            {label && <span className="text-sm font-medium text-gray-700">{label}</span>}

            <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen((prev) => !prev)}
                className={cn(
                    "flex h-9 w-full items-center text-s justify-evenly gap-2 rounded-lg border px-5  transition-colors",
                    disabled
                        ? "cursor-not-allowed  border-neutral-200 bg-neutral-50 text-neutral-800"
                        : "border-neutral-300 bg-white text-gray-700 hover:border-neutral-400"
                )}
            >
                <ChevronDown
                    size={17}
                    className={cn("text-gray-400 transition-transform", open && "rotate-180")}
                />
                <span className={cn(!selectedLabel && "text-gray-600  ")}>
                    {selectedLabel || placeholder}
                </span>
            </button>

            {open && !disabled && (
                <ul className="absolute top-full z-30 mt-1 w-full overflow-hidden rounded-lg border border-gray-100 bg-white py-1 px-1 shadow-lg">
                    {options.map((option) => {
                        const isSelected = option.value === value;
                        return (
                            <li key={option.value}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        onChange?.(option.value);
                                        setOpen(false);
                                    }}
                                    className={cn(
                                        "flex w-full items-center  gap-13 px-4 py-2.5 text-sm transition-colors",
                                        isSelected ? "bg-teal-50 text-teal-900  px-2" : "text-gray-700  hover:rounded-md  px-2  hover:bg-teal-100"
                                    )}
                                >
                                    {option.label}
                                    {isSelected && <Check size={16} className="text-teal-900 " />}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
