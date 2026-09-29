"use client";

import { Button } from "@/app/components/ui/Button";
import { CheckCircle2, Send } from "lucide-react";

export function SendRequestBanner() {
    return (
        <div
            className=" flex w-full items-center justify-between rounded-2xl border  border-[#A4F4CF] bg-[#ECFDF5] px-5.25 py-9 shadow-sm"
        >
            <div className="flex items-center gap-3">
                <CheckCircle2
                    className="h-6 w-6  text-primary-600"
                    strokeWidth={2}
                />

                <div className="flex flex-col items-start gap-1">
                    <span
                        className=" text-s font-black text-[#004F3B]"
                    >
                        آماده ارسال درخواست
                    </span>

                    <span
                        className="text-2xs text-[#004F3B]"
                    >
                        با کلیک بر روی دکمه زیر، درخواست شما به سرپرست انتخاب‌شده ارسال
                        می‌شود.
                    </span>
                </div>
            </div>

            <Button
                type="button"
                variant="solid"
                color="input"
                className="text-sm"
                size="xs"
                rounded="lg"
                leftIcon={
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M21 3L3 10.5L10.5 13.5M21 3L13.5 21L10.5 13.5M21 3L10.5 13.5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                }
            >
                ارسال درخواست به سرپرست
            </Button>

        </div>
    );
}