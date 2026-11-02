"use client";

import React, { useState } from "react";

import Tabs from "@/app/components/ui/Tabs";
import VisitCard, { toFa, VisitItem } from "../visitCard";
import VisitTable, { initialReports, VisitReport } from "../visitTable";
import VisitRegistrationModal from "../visitregistrationmodal";
import VisitPaymentModal from "../visitpaymentmodal";

const TAB_ITEMS = [
    { id: "registered", label: "بازدیدهای ثبت‌نام‌شده" },
    { id: "available", label: "بازدیدهای قابل ثبت‌نام" },
];

const REQUIREMENTS = "کلاه ایمنی، کفش کار، لباس کار";

const visitsData: VisitItem[] = [
    {
        id: 1,
        title: "بازدید برج پارسیان",
        category: "مسکونی",
        capacity: 15,
        registered: 8,
        date: "۱۴۰۵/۰۵/۲۵",
        time: "۰۸:۰۰",
        duration: 4,
        departure: "پارکینگ سازمان",
        address: "تهران، خیابان ولیعصر، برج پارسیان",
        supervisor: "مهندس رضایی",
        supervisorShort: "م. رضایی",
        projectName: "برج مسکونی پارسیان",
        projectShort: "برج پارسیان",
        description:
            "بازدید فنی از پروژه برج پارسیان (۳۰ طبقه)؛ آشنایی با فرایند اجرای اسکلت فولادی و سیستم جانبی.",
        requirements: REQUIREMENTS,
        price: 50000,
    },
    {
        id: 2,
        title: "بازدید مجتمع تجاری کیان‌مال",
        category: "تجاری",
        capacity: 20,
        registered: 12,
        date: "۱۴۰۵/۰۶/۰۳",
        time: "۰۸:۳۰",
        duration: 5,
        departure: "پارکینگ سازمان",
        address: "کرج، کیان‌مال",
        supervisor: "مهندس کریمی",
        supervisorShort: "م. کریمی",
        projectName: "مجتمع تجاری کیان‌مال",
        projectShort: "کیان‌مال",
        description:
            "بازدید از مجتمع تجاری بزرگ شامل مراحل نصب نمای شیشه‌ای، تأسیسات و سیستم تهویه.",
        requirements: REQUIREMENTS,
        price: 50000,
    },
    {
        id: 3,
        title: "بازدید پروژه اداری برج سپهر",
        category: "اداری",
        capacity: 12,
        registered: 4,
        date: "۱۴۰۵/۰۶/۱۰",
        time: "۰۹:۰۰",
        duration: 3,
        departure: "پارکینگ سازمان",
        address: "تهران، سعادت‌آباد، برج سپهر",
        supervisor: "مهندس احمدی",
        supervisorShort: "م. احمدی",
        projectName: "پروژه اداری برج سپهر",
        projectShort: "برج سپهر",
        description:
            "بازدید از پروژه اداری ۱۵ طبقه در مرحله نازک‌کاری؛ آشنایی با جزئیات معماری و تأسیسات.",
        requirements: REQUIREMENTS,
        price: 0,
    },
    {
        id: 4,
        title: "بازدید پل عابر صدر",
        category: "اداری",
        capacity: 10,
        registered: 2,
        date: "۱۴۰۵/۰۶/۱۵",
        time: "۰۷:۳۰",
        duration: 6,
        departure: "پارکینگ سازمان",
        address: "تهران، تقاطع اتوبان صدر و حقانی",
        supervisor: "مهندس موسوی",
        supervisorShort: "م. موسوی",
        projectName: "پل عابر پیاده صدر",
        projectShort: "پل صدر",
        description:
            "بازدید از اجرای پل عابر پیاده‌رو صدر؛ آشنایی با روش‌های اجرا، خرابی‌ها و قالب‌بندی.",
        requirements: REQUIREMENTS,
        price: 70000,
    },
];

const toReport = (visit: VisitItem): VisitReport => ({
    period: visit.projectName,
    periodShort: visit.projectShort,
    supervisor: visit.supervisor,
    supervisorShort: visit.supervisorShort,
    hours: visit.duration,
    date: visit.date,
    dateShort: visit.date.slice(5),
    status: "pending",
    _rowClassName: "bg-white",
});

interface VisitTabsProps {
    completedHours?: number;
}

function VisitTabs({ completedHours = 0 }: VisitTabsProps) {
    const [activeTab, setActiveTab] = useState("registered");
    const [visits, setVisits] = useState<VisitItem[]>(visitsData);
    const [reports, setReports] = useState<VisitReport[]>(initialReports);

    const [selectedVisit, setSelectedVisit] = useState<VisitItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (visit: VisitItem) => {
        setSelectedVisit(visit);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedVisit(null);
    };

    const handleRegister = () => {
        if (!selectedVisit) return;

        setReports((current) => [toReport(selectedVisit), ...current]);
        setVisits((current) =>
            current.filter((visit) => visit.id !== selectedVisit.id)
        );

        closeModal();
    };

    const isFreeVisit = selectedVisit?.price === 0;

    return (
        <div className="flex w-full flex-col gap-4">
            <div
                dir="rtl"
                className="flex w-full items-center justify-between px-1"
            >
                <h3 className="text-sm font-normal text-neutral-600">
                    {toFa(reports.length)} بازدید ثبت‌نام‌شده —{" "}
                    {toFa(completedHours)} ساعت
                </h3>

                <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-2xs font-medium text-blue-800">
                    {toFa(visits.length)} بازدید قابل ثبت‌نام
                </span>
            </div>

            <div dir="ltr">
                <Tabs
                    variant="pill"
                    tabs={TAB_ITEMS}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    className="w-full max-w-140"
                />
            </div>

            {activeTab === "registered" ? (
                <VisitTable
                    rows={reports}
                    title="بازدیدهای ثبت‌نام‌شده من"
                    description="بازدیدهایی که توسط سازمان تعریف و توسط شما ثبت‌نام شده است."
                />
            ) : (
                <div className="flex w-full flex-col gap-4">
                    <div
                        dir="ltr"
                        className="rounded-lg border-r-4 border-blue-600 bg-blue-50 px-4 py-3 text-xs text-blue-950"
                    >
                        این بازدیدها توسط سازمان تعریف شده‌اند. در صورت تمایل
                        می‌توانید ثبت‌نام کنید. پس از ثبت‌نام، بازدید در تب
                        «بازدیدهای ثبت‌نام‌شده» نمایش داده می‌شود.
                    </div>

                    {visits.length > 0 ? (
                        <div className="grid w-full grid-cols-1 gap-5 xl:grid-cols-2">
                            {visits.map((visit) => (
                                <VisitCard
                                    key={visit.id}
                                    visit={visit}
                                    onRegister={openModal}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex min-h-62.5 w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white">
                            <div className="text-center">
                                <p className="text-sm font-semibold text-slate-700">
                                    بازدید قابل ثبت‌نامی وجود ندارد
                                </p>
                                <p className="mt-2 text-xs text-slate-400">
                                    بازدیدهای جدید پس از تعریف توسط سازمان در
                                    اینجا نمایش داده می‌شوند.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <VisitRegistrationModal
                isOpen={isModalOpen && isFreeVisit}
                visit={selectedVisit}
                onClose={closeModal}
                onConfirm={handleRegister}
            />

            <VisitPaymentModal
                isOpen={isModalOpen && !isFreeVisit}
                visit={selectedVisit}
                onClose={closeModal}
                onConfirm={handleRegister}
            />
        </div>
    );
}

export default VisitTabs;