"use client";
import * as React from "react";
import { Award } from "lucide-react";
import { cn } from "@/lib/cn";
import { Select } from "@/app/components/ui/input/SelectSilde";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/Button";


type CardStatus = "issued" | "pending" | "reviewing";

interface QualificationCard {
    title: string;
    code: string;
    status: CardStatus;
}

const statusStyles: Record<CardStatus, { label: string; className: string }> = {
    issued: {
        label: "صادر شده",
        className: "bg-emerald-100 text-emerald-800 border border-emerald-600",
    },
    pending: {
        label: "درخواست مستقل",
        className: "bg-red-100 text-red-800 border border-red-600",
    },
    reviewing: {
        label: "در حال بررسی",
        className: "bg-amber-100 text-amber-800 border border-amber-600",
    },
};

const qualificationCards: QualificationCard[] = [
    { title: "کارت صلاحیت – مهندسی عمران", code: "QC-CE-001", status: "issued" },
    { title: "کارت صلاحیت – معماری و شهرسازی", code: "QC-AR-002", status: "reviewing" },
    { title: "کارت صلاحیت – تأسیسات برقی", code: "QC-EL-003", status: "pending" },
];

const gradeOptions = [
    { label: "پایه ۱", value: "1" },
    { label: "پایه ۲", value: "2" },
    { label: "پایه ۳", value: "3" },
];

export default function LicenseStatus() {
    const [hasLicense, setHasLicense] = React.useState(true);
    const [licenseNumber, setLicenseNumber] = React.useState("");
    const [grade, setGrade] = React.useState<string | undefined>();

    return (
        <div dir="rtl" className="flex w-full flex-col gap-5 rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6  bg-white ">

            <div className="flex items-center mb-7 gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
                    ۳
                </span>
                <h3 className="text-s font-bold text-gray-800">
                    وضعیت پروانه اشتغال و کارت‌های صلاحیت
                </h3>
            </div>

            <div className="flex w-full items-start  gap-6">
                <div className="flex flex-col gap-1.5">
                    <span className="text-2xs  font-semibold text-gray-900">وضعیت پروانه اشتغال</span>
                    <div className="flex w-full  items-center gap-2">
                        <Button
                            type="button"
                            size="sm"
                            variant="solid"
                            color="input"
                            onClick={() => setHasLicense(true)}
                            className={cn(
                                "h-9  rounded-lg w-48 text-xs font-medium transition-colors",
                                hasLicense
                                    ? " text-white"
                                    : "border border-gray-200 hover:text-neutral-600 bg-white text-gray-400 hover:bg-gray-50"
                            )}
                        >
                            دارای پروانه
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant="solid"
                            color="input"
                            onClick={() => setHasLicense(false)}
                            className={cn(
                                "h-9  rounded-lg w-48 text-xs font-medium transition-colors",
                                !hasLicense
                                    ? "text-white"
                                    : "border border-gray-200 hover:text-neutral-600 bg-white text-gray-400 hover:bg-gray-50"
                            )}
                        >
                            فاقد پروانه
                        </Button>
                    </div>
                </div>

                {hasLicense && (
                    <div className=" flex justify-between  w-[75%]">
                        <div className="w-1/2">
                            <span className="text-2xs  font-semibold text-gray-900"> پایه صلاحیت</span>
                            <Select
                                className=" w-30 text-nowrap text-s"
                                placeholder="انتخاب پایه"
                                options={gradeOptions}
                                value={grade}
                                onChange={setGrade}
                            />
                        </div>

                        <div className="w-1/2">
                            <span className="text-2xs  font-semibold text-gray-900"> شماره پروانه </span>

                            <Input
                                variant="default"
                                color="input"
                                inputSize="sm"
                                placeholder="۰۱۲۳۴۵۶-۷"
                                className="placeholder:text-neutral-600   placeholder:text-xs"
                                value={licenseNumber}
                                onChange={(e) => setLicenseNumber(e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {qualificationCards.map((card) => {
                    const status = statusStyles[card.status];
                    return (
                        <div
                            key={card.code}
                            className="flex flex-col justify-between gap-3 rounded-xl border border-gray-200 p-4"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100">
                                    <Award size={18} className="text-amber-500" />
                                </span>
                                <div className="flex-1 text-right">
                                    <h4 className="text-xs font-semibold text-gray-800">{card.title}</h4>
                                </div>
                            </div>
                            <span className=" block text-xs text-gray-400">کد: {card.code}</span>

                            <div className="flex items-center justify-between gap-2">
                                <span className={cn("rounded-full px-3 py-1 text-xs font-medium", status.className)}>
                                    {status.label}
                                </span>

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className={cn("text-2xs py-1  font-semibold  border-neutral-300 bg-[#f7f9f4aa]  text-neutral-900")}
                                    rounded="lg"
                                >
                                    درخواست مستقل
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
