"use client";

import React, { useCallback, useMemo, useState } from "react";
import {
    BookOpen,
    CheckCircle2,
    Clock3,
    Search,
} from "lucide-react";

import CourseCard, { Course } from "./components/coursesCards";
import DashboardStatCards from "./components/stateCards";
import { Input } from "@/app/components/ui/input";
import CourseRegistrationModal from "./components/courseRegistrationModal";

type FilterType =
    | "all"
    | "نظری"
    | "مهارتی"
    | "بازدید پروژه"
    | "registered";

const coursesData: Course[] = [
    {
        id: 1,
        title: "آموزش ETABS",
        category: "مهارتی",
        status: "active",
        date: "۱۴۰۵/۰۵/۱۵",
        duration: "۸ ساعت",
        participants: "۲۵ نفر",
        description:
            "آموزش تحلیل و طراحی سازه با نرم‌افزار ETABS، شامل مدل‌سازی، تحلیل بارهای زلزله و باد و طراحی المان‌های فولادی و بتنی.",
        registered: 18,
        capacity: 25,
        price: "رایگان",
        isFree: true,
    },

    {
        id: 2,
        title: "بخشنامه‌های جدید",
        category: "حقوق",
        status: "active",
        date: "۱۴۰۵/۰۵/۲۰",
        duration: "۳ ساعت",
        participants: "۵۰ نفر",
        description:
            "بررسی آخرین بخشنامه‌های سازمان نظام مهندسی در خصوص مقررات ملی ساختمان، آیین‌نامه اجرا و مبحث ۲۷.",
        registered: 32,
        capacity: 50,
        price: "رایگان",
        isFree: true,
    },

    {
        id: 3,
        title: "ایمنی کارگاه",
        category: "نظری",
        status: "waiting",
        date: "۱۴۰۵/۰۶/۰۱",
        duration: "۶ ساعت",
        participants: "۳۰ نفر",
        description:
            "آموزش اصول ایمنی کارگاهی، شناخت خطرات، تجهیزات حفاظت فردی و آیین‌نامه HSE برای کارآموزان و مهندسان جدید.",
        registered: 0,
        capacity: 30,
        price: "رایگان",
        isFree: true,
    },

    {
        id: 4,
        title: "بازدید برج پارسیان",
        category: "بازدید پروژه",
        status: "active",
        date: "۱۴۰۵/۰۵/۲۵",
        duration: "۴ ساعت",
        participants: "۱۵ نفر",
        description:
            "بازدید فنی از پروژه برج پارسیان (۳۰ طبقه) با کالبدشکافی ایمنی و کفش کار، آشنایی با فرآیند اجرای اسکلت فولادی و سیستم جانبی.",
        registered: 8,
        capacity: 15,
        price: "۵۰۰,۰۰۰ تومان",
    },
];

const tabs: {
    key: FilterType;
    label: string;
}[] = [
        {
            key: "all",
            label: "همه",
        },
        {
            key: "نظری",
            label: "نظری",
        },
        {
            key: "مهارتی",
            label: "مهارتی",
        },
        {
            key: "بازدید پروژه",
            label: "بازدید پروژه",
        },
        {
            key: "registered",
            label: "ثبت‌نام شده",
        },
    ];

function MyCourses() {
    const [activeFilter, setActiveFilter] =
        React.useState<FilterType>("all");

    const [search, setSearch] = useState("");

    const [courses, setCourses] =
        React.useState<Course[]>(coursesData);

    const [selectedCourse, setSelectedCourse] =
        React.useState<Course | null>(null);

    const [isRegisterModalOpen, setIsRegisterModalOpen] =
        React.useState(false);

    const openRegisterModal = useCallback(
        (course: Course) => {
            setSelectedCourse(course);
            setIsRegisterModalOpen(true);
        },
        []
    );

    const closeRegisterModal = useCallback(() => {
        setIsRegisterModalOpen(false);
        setSelectedCourse(null);
    }, []);

    const handleRegister = useCallback(() => {
        if (!selectedCourse) return;

        setCourses((currentCourses) =>
            currentCourses.map((course) =>
                course.id === selectedCourse.id
                    ? {
                        ...course,
                        isRegistered: true,
                        status: "registered",
                        registered: Math.min(
                            course.registered + 1,
                            course.capacity
                        ),
                    }
                    : course
            )
        );

        closeRegisterModal();
    }, [selectedCourse, closeRegisterModal]);

    const filteredCourses = useMemo(() => {
        const normalizedSearch = search
            .trim()
            .toLocaleLowerCase("fa-IR");

        return courses.filter((course) => {
            const matchesFilter =
                activeFilter === "all"
                    ? true
                    : activeFilter === "registered"
                        ? Boolean(course.isRegistered)
                        : course.category === activeFilter;

            const matchesSearch =
                !normalizedSearch ||
                course.title
                    .toLocaleLowerCase("fa-IR")
                    .includes(normalizedSearch) ||
                course.description
                    .toLocaleLowerCase("fa-IR")
                    .includes(normalizedSearch);

            return matchesFilter && matchesSearch;
        });
    }, [courses, activeFilter, search]);

    const registeredCount = courses.filter(
        (course) => course.isRegistered
    ).length;

    const stats = useMemo(
        () => [
            {
                title: "دوره‌های فعال",
                value: courses.filter(
                    (course) => course.status === "active"
                ).length,
                badge: "در دست ثبت‌نام",
                badgeClass:
                    "border-blue-200 bg-blue-50 text-blue-600",
                icon: BookOpen,
            },
            {
                title: "ثبت‌نام شده من",
                value: registeredCount,
                badge: "دوره‌های آتی",
                badgeClass:
                    "border-emerald-200 bg-emerald-50 text-emerald-600",
                icon: CheckCircle2,
            },
            {
                title: "ساعات آموزشی",
                value: "۲۴",
                badge: "تاکنون تکمیل شده",
                badgeClass:
                    "border-amber-200 bg-amber-50 text-amber-700",
                icon: Clock3,
            },
        ],
        [courses, registeredCount]
    );

    return (
        <div
            className="flex w-full flex-col gap-5 px-5 py-4"
        >

            <div className="flex w-full gap-4 lg:flex-row lg:items-center lg:justify-between"
            >
                <div
                    className=" flex w-full items-center gap-2 overflow-x-auto pb-1 lg:w-auto "
                >
                    {tabs.map((tab) => {
                        const isActive = activeFilter === tab.key;

                        return (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() =>
                                    setActiveFilter(tab.key)
                                }
                                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${isActive
                                        ? "border-[#1645b5] bg-[#1645b5] text-white shadow-sm"
                                        : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>


                <div className="w-1/4">
                    <Input
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="جستجوی دوره..."
                        className="  placeholder:text-neutral-600  shadow-xs placeholder:text-xs "
                        variant="default"
                        inputSize="sm"
                        rounded="lg"
                        rightIcon={
                            <Search
                                color="#302f2f7d"
                                size={18}
                                strokeWidth={1.8}
                            />
                        }

                    />
                </div>
            </div>

            <DashboardStatCards cards={stats} />

         
            {filteredCourses.length > 0 ? (
                <div
                    className="grid w-full grid-cols-1 gap-5 xl:grid-cols-2"
                >
                    {filteredCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            onRegister={openRegisterModal}
                        />
                    ))}
                </div>
            ) : (
                <div
                    className="flex min-h-62.5 w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white"
                >
                    <div className="text-center">
                        <p className="text-base font-semibold text-slate-700">
                            دوره‌ای پیدا نشد
                        </p>

                        <p className="mt-2 text-sm text-slate-400">
                            عبارت جستجو یا فیلتر انتخابی را تغییر دهید.
                        </p>
                    </div>
                </div>
            )}

            <CourseRegistrationModal
                isOpen={isRegisterModalOpen}
                course={selectedCourse}
                onClose={closeRegisterModal}
                onConfirm={handleRegister}
            />
        </div>
    );
}

export default MyCourses;