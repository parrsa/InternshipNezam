"use client";
import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/cn"; 
import type { InputSize, InputVariant } from "../input/Input.js";


export interface SelectProps
    extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> {
    variant?: InputVariant;
    inputSize?: InputSize;
    error?: boolean;
    success?: boolean;
    disabled?: boolean;
    loading?: boolean;
    label?: string;
    helperText?: string;
    errorMessage?: string;
    fullWidth?: boolean;
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
    shadow?: "none" | "sm" | "md" | "lg" | "xl" | "inner";
    focusRing?: boolean;
    transition?: boolean;
    options?: Array<{ value: string; label: string }>;
    colorGroup?: "primary" | "secondary" | "brand";
    placeholder?: string;
    value?: string;
    onChange?: (e: { target: { name?: string; value: string; id: string } }) => void;
}

const sizeClasses: Record<InputSize, string> = {
    lg: "h-12 px-4 text-base",
    xl: "h-14 px-4 text-lg",
};

const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
};

const panelRoundedClasses: Record<string, string> = {
    none: "rounded-none",
    sm: "rounded-md",
    md: "rounded-lg",
    lg: "rounded-xl",
    xl: "rounded-2xl",
    full: "rounded-2xl",
};

const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    inner: "shadow-inner",
};

interface ColorToken {
    border: string;
    borderOpen: string;
    text: string;
    ring: string;
    selectedBg: string;
    selectedText: string;
    hoverBg: string;
}

const colorTokens: Record<NonNullable<SelectProps["colorGroup"]>, ColorToken> = {
    primary: {
        border: "border-primary-300",
        borderOpen: "border-primary-600",
        text: "text-primary-900",
        ring: "focus:ring-primary-200",
        selectedBg: "bg-primary-50",
        selectedText: "text-primary-700",
        hoverBg: "hover:bg-primary-50/60",
    },
    secondary: {
        border: "border-secondary-300",
        borderOpen: "border-secondary-600",
        text: "text-secondary-900",
        ring: "focus:ring-secondary-200",
        selectedBg: "bg-secondary-50",
        selectedText: "text-secondary-700",
        hoverBg: "hover:bg-secondary-50/60",
    },
    brand: {
        border: "border-neutral-500 border",
        borderOpen: "border-brand-600  focus:text-brand-700  text-brand-700",
        text: "text-neutral-600 ",
        ring: "focus:ring-brand-200 ",
        selectedBg: "bg-brand-50",
        selectedText: "text-black",
        hoverBg: "hover:bg-neutral-50",
    },
};

export function AdminSelect({
    className,
    variant = "outline",
    inputSize = "lg",
    error = false,
    success = false,
    disabled = false,
    loading = false,
    label,
    helperText,
    errorMessage,
    fullWidth = true,
    rounded = "xl",
    shadow = "none",
    focusRing = false,
    transition = true,
    options = [],
    id,
    colorGroup = "brand",
    name,
    value: controlledValue,
    onChange,
    placeholder = "انتخاب کنید",
    ...rest
}: SelectProps) {
    const selectId = id || React.useId();
    const [hasValue, setHasValue] = React.useState(!!controlledValue);
    const [open, setOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(-1);

    const containerRef = React.useRef<HTMLDivElement>(null);
    const tokens = colorTokens[colorGroup] ?? colorTokens.brand;
    const selected = options.find((o) => o.value === controlledValue);

    React.useEffect(() => {
        setHasValue(!!controlledValue);
    }, [controlledValue]);

    React.useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    function commitValue(newValue: string) {
        setHasValue(newValue.length > 0);
        onChange?.({ target: { name: name ?? '', value: newValue, id: selectId } });
    }

    function toggleOpen() {
        if (disabled || loading) return;
        setOpen((o) => !o);
        const idx = options.findIndex((o) => o.value === controlledValue);
        setActiveIndex(idx >= 0 ? idx : 0);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
        if (disabled || loading) return;
        if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setOpen(true);
            const idx = options.findIndex((o) => o.value === controlledValue);
            setActiveIndex(idx >= 0 ? idx : 0);
            return;
        }
        if (!open) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            const opt = options[activeIndex];
            if (opt) {
                commitValue(opt.value);
                setOpen(false);
            }
        } else if (e.key === "Escape") {
            e.preventDefault();
            setOpen(false);
        } else if (e.key === "Tab") {
            setOpen(false);
        }
    }

    const variantBorder =
        variant === "floating"
            ? (open ? `${tokens.borderOpen} border` : tokens.border)
            : (open ? tokens.borderOpen : "border-neutral-300");

    const triggerClasses = cn(
        "flex items-center justify-between min-w-0 gap-2 outline-none bg-white select-none",
        "border-2",
        variantBorder,
        tokens.text,
        sizeClasses[inputSize],
        roundedClasses[rounded],
        shadowClasses[shadow],
        transition && "transition-all duration-200",
        focusRing && cn("focus:outline-none focus:ring-4 ", tokens.ring),
        error && "border-red-500 text-red-600",
        success && "border-emerald-500 text-emerald-600",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "cursor-pointer",
        loading && "animate-pulse",
        fullWidth && "w-full",
        className
    );

    return (
        <div
            ref={containerRef}
            dir="rtl"
            className={cn("flex flex-col gap-1 relative", fullWidth && "w-full")}
        >
            {variant !== "floating" && label && (
                <label
                    htmlFor={selectId}
                    className={cn("text-sm font-medium mb-1 block", error ? "text-red-600" : "text-neutral-500")}
                >
                    {label}
                </label>
            )}

            <div className="relative">
                {variant === "floating" && label && (
                    <label
                        htmlFor={selectId}
                        className={cn(
                            "absolute -top-2.5 right-10 translate-x-1/2 bg-white px-2 text-xs font-bold z-10 whitespace-nowrap",
                            error && "text-red-600",
                            open ? tokens.borderOpen : tokens.text
                        )}
                    >
                        {label}
                    </label>
                )}

                <button
                    type="button"
                    id={selectId}
                    role="combobox"
                    aria-expanded={open}
                    aria-haspopup="listbox"
                    aria-controls={`${selectId}-listbox`}
                    disabled={disabled || loading}
                    onClick={toggleOpen}
                    onKeyDown={handleKeyDown}
                    className={triggerClasses}
                    {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
                >
                    <span className={cn(!selected && "text-neutral-600  font-normal")}>
                        {selected ? selected.label : placeholder}
                    </span>
                    {open ? <ChevronUp size={20} className="shrink-0" /> : <ChevronDown size={20} className="shrink-0" />}
                </button>

                {/* select مخفی برای سازگاری با فرم‌های name-based (submit سنتی) */}
                <select
                    name={name}
                    value={controlledValue}
                    onChange={() => { }}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="sr-only"
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    {options.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>

                {open && (
                    <ul
                        id={`${selectId}-listbox`}
                        role="listbox"
                        className={cn(
                            "absolute z-50 max-h-44 mt-2 w-full bg-white p-2 flex flex-col gap-1 overflow-auto",
                            panelRoundedClasses[rounded === "full" ? "xl" : rounded],
                            "shadow-xl border-2",
                            'border border-neutral-200'
                        )}
                    >
                        {options.map((option, idx) => {
                            const isSelected = option.value === controlledValue;
                            const isActive = idx === activeIndex;
                            return (
                                <li
                                    key={option.value}
                                    role="option"
                                    aria-selected={isSelected}
                                    onMouseEnter={() => setActiveIndex(idx)}
                                    onClick={() => {
                                        commitValue(option.value);
                                        setOpen(false);
                                    }}
                                    className={cn(
                                        "px-4 py-3 rounded-2xl text-[15px] cursor-pointer",
                                        isSelected
                                            ? cn(tokens.selectedBg, tokens.selectedText, "font-bold")
                                            : "text-neutral-800 font-normal",
                                        !isSelected && isActive && "bg-neutral-50",
                                        !isSelected && tokens.hoverBg
                                    )}
                                >
                                    {option.label}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            {
                (helperText || errorMessage) && (
                    <p className={cn("text-xs mt-1", error ? "text-red-600" : "text-neutral-500")}>
                        {error ? errorMessage : helperText}
                    </p>
                )
            }
        </div >
    );
}