import { cn } from "@/lib/cn";
import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  variant?:
  | "text"
  | "solid"
  | "outline"
  | "ghost"
  | "soft"
  | "link"
  | "gradient";
  color?: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "input";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  shadow?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "inner";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  textSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}
const getVariantClasses = (
  color: string = "primary",
  variant: string = "solid",
  disabled: boolean = false,
  loading: boolean = false,
): string => {
  const colors: any = {
    primary: {
      text: `bg-transparent ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer text-primary-800 hover:bg-primary-50 active:text-primary-900 active:bg-transparent"}`,
      solid: `${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300 bg-neutral-100" : "cursor-pointer bg-primary-500 text-black hover:bg-primary-700 hover:text-white active:bg-primary-800 active:text-white"}`,
      outline: `bg-transparent border-[.5px] ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer border-primary-600 text-primary-800 hover:bg-primary-50 hover:border-primary-700 active:border-primary-800 active:bg-transparent"}`,
      ghost: `bg-transparent ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer text-primary-600 hover:bg-primary-50"}`,
      soft: `${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300 bg-neutral-50" : "cursor-pointer bg-primary-100 text-primary-700 hover:bg-primary-200 "}`,
      link: `bg-transparent ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer text-primary-600 hover:underline"}`,
      gradient: `${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer bg-gradient-to-r from-primary-500 to-primary-700 text-white hover:from-primary-600 hover:to-primary-800"}`,
    },
    secondary: {
      text: `bg-transparent ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer text-secondary-800 hover:bg-secondary-50 active:text-secondary-900 active:bg-transparent"}`,
      solid: `${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300 bg-neutral-100" : "cursor-pointer bg-secondary-500 text-black hover:bg-secondary-700 hover:text-white active:bg-secondary-800 active:text-white"}`,
      outline: `bg-transparent border-[.5px] ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer border-secondary-600 text-secondary-800 hover:bg-secondary-50 hover:border-secondary-700 active:border-secondary-800 active:bg-transparent"}`,
      ghost: `bg-transparent ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer text-secondary-600 hover:bg-secondary-50"}`,
      soft: `${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300  bg-neutral-50" : "cursor-pointer bg-secondary-100 text-secondary-700 hover:bg-secondary-200"}`,
      link: `bg-transparent ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer text-secondary-600 hover:underline"}`,
      gradient: `${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer bg-gradient-to-r from-secondary-500 to-secondary-700 text-white hover:from-secondary-600 hover:to-secondary-800"}`,
    },
    input: {
      text: `bg-transparent ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer text-primary-50 hover:bg-input-100 active:text-input-900 active:bg-transparent"}`,
      solid: `${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300 bg-neutral-100" : "cursor-pointer bg-input-800 text-white hover:bg-input-700 hover:text-white duration-300  active:bg-input-500 active:text-white "}`,
      outline: `bg-transparent border-[.5px] ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer border-input-600 text-input-800 hover:bg-input-50 hover:border-input-700 active:border-input-800 active:bg-transparent"}`,
      ghost: `bg-transparent ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer text-input-600 hover:bg-input-50"}`,
      soft: `${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300 bg-neutral-50" : "cursor-pointer bg-input-100 text-input-700 hover:bg-input-200 "}`,
      link: `bg-transparent ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer text-input-600 hover:underline"}`,
      gradient: `${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer bg-gradient-to-r from-input-500 to-input-700 text-white hover:from-input-600 hover:to-input-800"}`,
    },
    danger: {
      text: `bg-transparent ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer text-red-900 hover:bg-red-50 active:bg-transparent"}`,
      solid: `${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300 bg-neutral-100" : "cursor-pointer bg-red-600 text-white hover:bg-red-700 active:bg-red-900"}`,
      outline: `bg-transparent border-[.5px] ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer border-red-700 text-red-900 hover:bg-red-50 active:bg-transparent hover:border-red-900 active:border-red-950"}`,
      ghost: `bg-transparent ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer text-red-600 hover:bg-red-50"}`,
      soft: `${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300 bg-neutral-50" : "cursor-pointer bg-red-100 text-red-700 hover:bg-red-200"}`,
      link: `bg-transparent ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer text-red-600 hover:underline"}`,
      gradient: `${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800"}`,
    },
    success: {
      text: `bg-transparent ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer text-green-800 hover:bg-green-50 active:text-green-900 active:bg-transparent"}`,
      solid: `${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300 bg-neutral-100" : "cursor-pointer bg-green-600 text-white hover:bg-green-700 active:bg-green-800"}`,
      outline: `bg-transparent border-[.5px] ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer border-green-600 text-green-800 hover:bg-green-50 hover:border-green-700 active:border-green-800 active:bg-transparent"}`,
      ghost: `bg-transparent ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer  text-green-600 hover:bg-green-50"}`,
      soft: `${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer bg-green-100 text-green-700 hover:bg-green-200"}`,
      link: `bg-transparent text-green-600 hover:underline ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer text-green-600 hover:underline"}`,
      gradient: `${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800"}`,
    },
    warning: {
      text: `bg-transparent ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer text-yellow-800 hover:bg-yellow-50 active:text-yellow-900 active:bg-transparent"}`,
      solid: `${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300 bg-neutral-100" : "cursor-pointer bg-yellow-600 text-white hover:bg-yellow-700 active:bg-yellow-800"}`,
      outline: `bg-transparent border-[.5px] ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer border-yellow-600 text-yellow-800 hover:bg-yellow-50 hover:border-yellow-700 active:border-yellow-800 active:bg-transparent"}`,
      ghost: `bg-transparent ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer text-yellow-600 hover:bg-yellow-50"}`,
      soft: `${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300 bg-neutral-50" : "cursor-pointer bg-yellow-100 text-yellow-700 hover:bg-yellow-200"}`,
      link: `bg-transparent ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer text-yellow-600 hover:underline"}`,
      gradient: `${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer bg-gradient-to-r from-yellow-500 to-yellow-700 text-white hover:from-yellow-600 hover:to-yellow-800"}`,
    },
    info: {
      text: `bg-transparent ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer text-sky-800 hover:bg-sky-50 active:text-sky-900 active:bg-transparent"}`,
      solid: `${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300 bg-neutral-100" : "cursor-pointer bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800"}`,
      outline: `bg-transparent border-[.5px] ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer border-sky-600 text-sky-800 hover:bg-sky-50 hover:border-sky-700 active:border-sky-800 active:bg-transparent"}`,
      ghost: `bg-transparent ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer text-sky-600 hover:bg-sky-50"}`,
      soft: `${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300 bg-neutral-50" : "cursor-pointer bg-sky-100 text-sky-700 hover:bg-sky-200"}`,
      link: `bg-transparent ${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer text-sky-600 hover:underline"}`,
      gradient: `${disabled || loading ? "cursor-not-allowed border-neutral-300 text-neutral-300" : "cursor-pointer bg-gradient-to-r from-sky-500 to-sky-700 text-white hover:from-sky-600 hover:to-sky-800"}`,
    },
  };

  return colors[color]?.[variant] || colors.primary.solid;
};

export const Button = ({
  children,
  variant = "solid",
  color = "primary",
  size = "md",
  textSize = "md",
  rounded = "md",
  shadow = "none",
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = "",
  onClick,
  type = "button",
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const sizeClasses = {
    xs: "px-2.5 py-1.5 gap-1",
    sm: "px-3 py-2 gap-1.5",
    md: "px-4 py-2.5 gap-2",
    lg: "px-4 py-3 gap-2.5",
    xl: "p-4 gap-3",
    "2xl": "px-7 py-4 gap-3.5",
    "3xl": "px-8 py-5 gap-4",
  };
  const textClasses = {
    xs: " text-xs",
    sm: " text-sm",
    md: " text-base",
    lg: " text-lg",
    xl: " text-xl",
    "2xl": " text-2xl",
    "3xl": " text-3xl",
  };
  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    full: "rounded-full",
  };

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
    inner: "shadow-inner",
  };
  const buttonClasses = cn(
    "inline-flex items-center justify-center font-medium",
    "transition-all duration-200 focus:outline-none",
    textClasses[textSize],
    sizeClasses[size],
    roundedClasses[rounded],
    shadowClasses[shadow],
    getVariantClasses(color, variant, disabled, loading),
    fullWidth ? "w-full" : "",
    loading ? "cursor-wait" : "",
    className);

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={buttonClasses}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && leftIcon}
      <span className="mb-0.5">{children}</span>
      {!loading && rightIcon}
    </button>
  );
};

interface IconButtonProps extends Omit<
  ButtonProps,
  "children" | "leftIcon" | "rightIcon"
> {
  icon: React.ReactNode;
  label: string;
}

export const IconButton = ({
  icon,
  label,
  size = "lg",
  ...props
}: IconButtonProps) => {
  const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
    xs: "p-1.5",
    sm: "p-2",
    md: "p-2.5",
    lg: "p-2",
    xl: "p-3",
    "2xl": "p-4",
    "3xl": "p-5",
  };

  return (
    <Button
      size={size}
      className={`${sizeClasses[size]} aspect-square p-0`}
      aria-label={label}
      {...props}
    >
      <span className="flex items-center justify-center">{icon}</span>
    </Button>
  );
};

interface ButtonGroupProps {
  children: React.ReactNode;
  direction?: "horizontal" | "vertical";
  className?: string;
}

export const ButtonGroup = ({
  children,
  direction = "horizontal",
  className = "",
}: ButtonGroupProps) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div
      className={`
        flex
        ${direction === "horizontal" ? "flex-row" : "flex-col"}
        divide-x-0
        ${direction === "horizontal" ? "divide-y-0" : "divide-y"}
        divide-gray-200
        border border-gray-200
        rounded-lg
        overflow-hidden
        ${className}
      `}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement<ButtonProps>(child)) return child;

        return React.cloneElement(child, {
          ...child.props,
          rounded: "none" as const,
          shadow: "none" as const,
          className: `
            ${child.props.className || ""}
            ${index === 0 && direction === "horizontal" ? "rounded-l-lg" : ""}
            ${index === 0 && direction === "vertical" ? "rounded-t-lg" : ""}
            ${index === childrenArray.length - 1 && direction === "horizontal" ? "rounded-r-lg" : ""}
            ${index === childrenArray.length - 1 && direction === "vertical" ? "rounded-b-lg" : ""}
          `,
        });
      })}
    </div>
  );
};

interface FabProps extends Omit<
  ButtonProps,
  "children" | "size" | "rounded" | "shadow"
> {
  icon: React.ReactNode;
  label: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

export const Fab = ({
  icon,
  label,
  position = "bottom-right",
  ...props
}: FabProps) => {
  const positions: Record<NonNullable<FabProps["position"]>, string> = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  return (
    <Button
      {...props}
      size="xl"
      rounded="full"
      shadow="xl"
      className={`
        fixed
        ${positions[position]}
        p-0
        w-14 h-14 z-50
        flex items-center justify-center
        ${props.className || ""}
      `}
    >
      {icon}
      <span className="sr-only">{label}</span>
    </Button>
  );
};


interface ButtonToggleProps {
  isTrue: boolean;
  offPrimaryColor?: string;
  onPrimary?: string;
  offSecoundryColor?: string;
  disabled?: boolean;
  onSecoundryColor?: string;
  onToggle: () => void;
}
export const ButtonToggle = ({
  isTrue,
  offPrimaryColor = "bg-black",
  onPrimary = "bg-purple-600",
  disabled = false,
  offSecoundryColor = "bg-white",
  onSecoundryColor = "bg-white",

  onToggle,
}: ButtonToggleProps) => {
  return (
    <button
      disabled={disabled}
      className={cn(
        isTrue ? onPrimary : offPrimaryColor,
        "relative flex items-center justify-center disabled:cursor-not-allowed disabled:bg-neutral-300 rounded-full h-[32px] w-[56px] transition-colors duration-500 ease-in-out",
      )}
      type="button"
      onClick={onToggle}
    >
      <div
        className={cn(
          disabled && "!bg-neutral-200",
          isTrue ? "translate-x-[50%]" : "-translate-x-[50%]",
          isTrue ? onSecoundryColor : offSecoundryColor,
          "rounded-full w-6 h-6 transition-transform duration-500 ease-in-out",
        )}
      ></div>
    </button>
  );
};
