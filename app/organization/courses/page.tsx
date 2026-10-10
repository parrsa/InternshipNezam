"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import { cn } from "@/lib/cn";
import { VisitInfoSection } from "./components/visitInfoSection";
import { VisitLocationSection } from "./components/visitLocationSection";
import { initialVisitValues, VisitFormValues, VisitOption, visitValidationSchema } from "./components/visitSchema/visitSchema";
import { VisitCapacitySection } from "./components/visitCapacitySection";
import TableCoursesPage from "./components/tableCourses";
import { CourseForm } from "./components/courseForm";
import { VisitRequirementsSection } from "./components/visitRequirementsSection";
import { Button } from "@/app/components/ui/Button";
import { Send } from "lucide-react";


type TabKey = "new" | "past";

const TABS: { key: TabKey; label: string }[] = [
    { key: "past", label: "بازدید پروژه" },
    { key: "new", label: "تعریف دوره" },
];


const MANAGERS: VisitOption[] = [
    { label: "مهندس رضایی", value: "manager-1" },
    { label: "مهندس احمدی", value: "manager-2" },
];

function Courses() {
    const [activeTab, setActiveTab] = useState<TabKey>("new");

    async function handleVisitSubmit(values: VisitFormValues) {
        const payload = {
            ...values,
            title: values.title.trim(),
            projectAddress: values.projectAddress.trim(),
            description: values.description.trim(),
            duration: Number(values.duration),
        };

        console.log("Visit payload:", payload);
    }

    return (
        <div className="flex w-full flex-col items-center  gap-3 px-5 p-2">
            <div className="flex w-full items-center justify-between gap-2 self-end rounded-xl bg-[#e7eef098] p-1 md:w-1/2">
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.key;

                    return (
                        <button
                            key={tab.key}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => setActiveTab(tab.key)}
                            className={cn(
                                "flex-1 rounded-lg px-3 py-2 text-xs font-bold text-black transition-colors duration-300",
                                isActive && "bg-[#fffdf9] shadow-sm"
                            )}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {activeTab === "past" ? (
                <>
                    <div className="mt-2 w-full">
                        <div className="flex min-h-11 items-center justify-end gap-3 rounded-lg border-r-4 border-input-400 bg-input-50 px-4 py-2 text-xs text-input-950">
                            <p>
                                بازدید پروژه شامل: نام پروژه، زمان بازدید، محل حرکت،
                                هزینه و الزامات. این بازدید در پنل کارآموز نمایش داده
                                می‌شود و در صورت تمایل کارآموز می‌تواند ثبت‌نام و پرداخت کند.
                            </p>
                        </div>
                    </div>

                    <Formik<VisitFormValues>
                        initialValues={initialVisitValues}
                        validationSchema={visitValidationSchema}
                        validateOnBlur
                        validateOnChange={false}
                        onSubmit={handleVisitSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form
                                dir="ltr"
                                noValidate
                                className="w-full flex flex-col gap-4 "
                            >


                                <div className="w-full rounded-2xl border border-[#d7dee7] bg-white p-5 shadow-sm">
                                    <VisitInfoSection managers={MANAGERS} />
                                </div>

                                <div className="w-full rounded-2xl border border-[#d7dee7] bg-white p-5 shadow-sm">
                                    <VisitLocationSection />
                                </div>

                                <div className="w-full rounded-2xl border border-[#d7dee7] bg-white p-5 shadow-sm">
                                    <VisitCapacitySection />
                                </div>

                                <div className="w-full rounded-2xl border border-[#d7dee7] bg-white p-5 shadow-sm">
                                    <VisitRequirementsSection />
                                </div>


                                <div className="flex  w-full items-center justify-end gap-2">
                                    <Button
                                        type="submit"
                                        variant="text"
                                        color="input"
                                        size="sm"
                                        textSize="sm"
                                        className="font-bold hover:bg-teal-50  text-neutral-800"
                                        disabled={isSubmitting}
                                    >
                                        ذخیره پیش‌نویس
                                    </Button>

                                    <Button
                                        type="submit"
                                        variant="solid"
                                        color="input"
                                        size="sm"
                                        textSize="sm"
                                        rounded="lg"
                                        loading={isSubmitting}
                                        className="h-10 font-bold"
                                        leftIcon={<Send size={16} aria-hidden />}
                                    >
                                        انتشار بازدید
                                    </Button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                    <TableCoursesPage />
                </>
            ) : (
                <div className="flex w-full flex-col gap-4">
                    <CourseForm />
                    <TableCoursesPage />
                </div>
            )}
        </div>
    );
}

export default Courses;
