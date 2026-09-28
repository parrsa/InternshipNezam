"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "../Button";
import Link from "next/link";
import { setTimer } from "@/lib/timer";

interface PinInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  loading?:boolean;
  errorMessage?:string;
  size?: "lg" | "xl" ;
  isEmail?: boolean;
  contactInformation: string;
  editLinkHref: string;
  reSendCodeHandler:any
}
const inputSizeClasse = {
    lg: "w-10 h-10 text-base",
    xl: "w-12 h-12 text-lg"
  }
  const messageSizeClasse = {
    lg: "text-xs",
    xl: "text-sm"
  }
  const titleSizeClasse = {
    lg: "text-sm",
    xl: "text-base"
  }
export function PinInput({
  length = 6,
  value = "",
  onChange,
  disabled = false,
  error = false,
  loading = false,
  errorMessage = "کد وارد شده صحیح نمی باشد",
  size= "lg",
  isEmail = false,
  contactInformation,
  editLinkHref,
  reSendCodeHandler,
}: PinInputProps) {
  const [time , setTime]= useState<string>("02:00")
  const [hasTime , setHasTime]= useState<boolean>(true)
  const [values, setValues] = useState<string[]>(
    () => Array.from({ length }, (_, i) => value[i] ?? "")
  );
  const inputsRef = useRef<HTMLInputElement[]>([]);

  useEffect(()=> {
    setTimer(120,setHasTime,setTime)
  },[])
  

  const updateValues = (next: string[]) => {
    setValues(next);
    onChange?.(next.join(""));
  };

  const focus = (index: number) => inputsRef.current[index]?.focus();

  const handleChange = (index: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...values];
    next[index] = val;
    updateValues(next);
    if (val && index < length - 1) focus(index + 1);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      focus(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!digits) return;
    const next = Array.from({ length }, (_, i) => digits[i] ?? "");
    updateValues(next);
    focus(Math.min(digits.length, length - 1));
  };
  
  const inputClasses = cn(
    "text-center font-medium",
    inputSizeClasse[size],
    "border-[.5px] rounded-md outline-none",
    "placeholder:text-neutral-400 text-input-900",
    error ? "border-red-500" : "border-neutral-400 ",
    "focus:border-input-600 focus:bg-input-50 hover:border-input-500 hover:placeholder:text-input-500",
    loading || disabled ? "opacity-50" : "",
  );
  
  const retryTimerHandler = () => {
    setTimer(120,setHasTime,setTime)
    setHasTime(true)
    reSendCodeHandler()
  }
  return (
    <div className="max-w-min flex flex-col items-start gap-2">
      <p className={cn("font-bold text-neutral-800", titleSizeClasse[size])}>کد تایید ارسال شده به {isEmail ? "ایمیل" : "شماره"} <span>{contactInformation}</span> را وارد کنید.</p>
      <Link href={`${editLinkHref}`} className="text-base font-medium text-input-700" >تغییر {isEmail ? "ایمیل" : "شماره تماس"}</Link>
      <div className="flex  gap-3 text-neutral-300 my-2" dir="ltr">
      {values.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            if (el) inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          disabled={disabled || loading}
          placeholder="-"
          className={inputClasses}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
        />
      ))}
    </div>
      {error && <span className={cn("text-red-600 font-medium",messageSizeClasse[size])}>{errorMessage}</span> }
      {hasTime ? (<>
        <span className="w-full font-medium text-input-700 text-center">{time}</span>
      </>) : (<>
        <div className="w-full flex justify-center">
         <Button type="button" className="font-medium" variant="link" color="input" onClick={retryTimerHandler}>ارسال مجدد کد</Button>
        </div>
      </>)}
    </div>
  );
}
