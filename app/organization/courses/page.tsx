


// "use client";
// import { useState } from "react";
// import { cn } from "@/lib/cn";
// import { VisitInfoSection } from "./components/visitInfoSection";
// import { VisitLocationSection } from "./components/visitLocationSection";



// type TabKey = "new" | "past";
// type SessionStatus = "upcoming" | "held" | "archived";

// interface Session {
//     id: number;
//     title: string;
//     date: string;
//     time: string;
//     location: string;
//     participants: string;
//     status: SessionStatus;
// }

// const TABS: { key: TabKey; label: string }[] = [
//     { key: "past", label: "بازدید پروژه" },
//     { key: "new", label: "تعریف دوره" },
// ];

// const STATUS_CONFIG: Record<SessionStatus, { label: string; className: string }> = {
//     upcoming: {
//         label: "در پیش‌رو",
//         className: "bg-orange-100 border-amber-300 text-amber-800",
//     },
//     held: {
//         label: "برگزار شد",
//         className: "bg-green-100 border-green-300 text-green-800",
//     },
//     archived: {
//         label: "آرشیو",
//         className: "bg-gray-100 border-gray-300 text-gray-700",
//     },
// };

// const SESSIONS: Session[] = [
//     {
//         id: 1,
//         title: "جلسه توجیحی نیمسال پاییز ۱۴۰۴",
//         date: "۱۴۰۴/۰۶/۰۵",
//         time: "۱۰:۰۰",
//         location: "سالن همایش — طبقه ۳",
//         participants: "نفر ۲۴",
//         status: "upcoming",
//     },
//     {
//         id: 2,
//         title: "جلسه توجیحی — آیین‌نامه و مقررات",
//         date: "۱۴۰۴/۰۴/۱۸",
//         time: "۱۴:۰۰",
//         location: "سالن جلسات — طبقه ۲",
//         participants: "نفر ۱۸",
//         status: "held",
//     },
//     {
//         id: 3,
//         title: "جلسه توجیحی نیمسال بهار ۱۴۰۴",
//         date: "۱۴۰۴/۰۲/۰۵",
//         time: "۱۰:۰۰",
//         location: "سالن همایش",
//         participants: "نفر ۲۸",
//         status: "archived",
//     },
// ];

// const TH = "px-3 text-left text-s";
// const TD = "px-3 py-2 text-left text-xs text-neutral-900";

// const COLUMNS = [

//     {
//         key: "status",
//         label: "وضعیت",
//         width: "w-[11%]",
//         thClassName: TH,
//         className: TD,
//         render: (row: Session) => {
//             const { label, className } = STATUS_CONFIG[row.status];
//             return (
//                 <span className={cn("inline-block rounded-full border px-2 py-0.5 text-2xs", className)}>
//                     {label}
//                 </span>
//             );
//         },
//     },
//     { key: "participants", label: "شرکت‌کنندگان", width: "w-[14%]", thClassName: TH, className: cn(TD, "font-medium text-sm") },
//     { key: "location", label: "محل", width: "w-[19.5%]", thClassName: TH, className: cn(TD, "font-medium text-sm") },
//     { key: "time", label: "ساعت", width: "w-[8.5%]", thClassName: TH, className: cn(TD, "font-medium text-sm") },
//     { key: "date", label: "تاریخ", width: "w-[15%]", thClassName: TH, className: cn(TD, "font-medium text-sm") },
//     { key: "title", label: "عنوان جلسه", width: "w-[32%]", thClassName: TH, className: cn(TD, "font-bold") },
// ];

// const TABLE_ROWS = SESSIONS.map((s) => ({ ...s, _rowClassName: "bg-white" }));

// function Courses() {
//     const [activeTab, setActiveTab] = useState<TabKey>("new");

//     return (
//         <div className="w-full flex flex-col gap-3 px-5 p-2 items-center justify-center">
//             <div
//                 className="flex items-center justify-between gap-2 bg-[#e7eef098] p-1 rounded-xl w-full md:w-1/2 self-end"
//             >
//                 {TABS.map((tab) => {
//                     const isActive = activeTab === tab.key;
//                     return (
//                         <button
//                             key={tab.key}
//                             type="button"
//                             role="tab"
//                             aria-selected={isActive}
//                             onClick={() => setActiveTab(tab.key)}
//                             className={cn(
//                                 "flex-1 px-3 py-2  rounded-lg text-xs font-bold text-black transition-colors duration-300",
//                                 isActive && "bg-[#fffdf9]  shadow-sm",
//                             )}
//                         >
//                             {tab.label}
//                         </button>
//                     );
//                 })}
//             </div>

//             {activeTab === "past" ? (
//                 <>

//                     <div className="mt-2 w-full">
//                         <div className="flex h-11  justify-end items-center gap-3 rounded-lg border-r-4 border-input-400 bg-input-50 px-4 text-xs text-input-950">
//                             <p>بازدید پروژه شامل: نام پروژه، زمان بازدید، محل حرکت، هزینه و الزامات. این بازدید در پنل کارآموز نمایش داده می‌شود و در صورت تمایل کارآموز می‌تواند ثبت‌نام و پرداخت کند. </p>
//                         </div>
//                     </div>
//                     <div
//                         className=" w-full rounded-2xl border-2 shadow-xs border-neutral-200 bg-white p-5 sm:p-6"
//                     >
//                         <VisitInfoSection  managers={MANAGERS} />
//                         <VisitLocationSection/>
//                     </div>
//                 </>

//             ) : (
//                 <div className="w-full flex flex-col gap-4">
//                     ززز
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Courses;




"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import { cn } from "@/lib/cn";

import { VisitInfoSection } from "./components/visitInfoSection";
import { VisitLocationSection } from "./components/visitLocationSection";
import { initialVisitValues, VisitFormValues, VisitOption, visitValidationSchema } from "./components/visitSchema/visitSchema";
import { VisitCapacitySection } from "./components/visitCapacitySection";
import TableCoursesPage from "./components/tableCourses";
// import { VisitRequirementsSection } from "./components/visitRequirementsSection";


type TabKey = "new" | "past";
type SessionStatus = "upcoming" | "held" | "archived";

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
                                // className="w-full  flex flex-col gap-4 " 
                                className="flex w-full min-w-0 flex-col gap-5"


                            >
                                {/* <div
                                    className="w-full rounded-[18px] border border-[#d7dee7] bg-white p-5  shadow-sm"
                                >
                                    <VisitInfoSection managers={MANAGERS} />
                                </div>

                                <div
                                    className="w-full rounded-[18px] border border-[#d7dee7] bg-white p-5  shadow-sm"
                                >
                                    <VisitLocationSection />
                                </div>


                                <div
                                    className="w-full rounded-[18px] border border-[#d7dee7] bg-white p-5  shadow-sm"
                                >
                                    <VisitCapacitySection />
                                </div>

                                <div
                                    className="w-full rounded-[18px] border border-[#d7dee7] bg-white p-5  shadow-sm"
                                >
                                    <VisitRequirementsSection />

                                </div> */}



                                <div className="w-full rounded-[18px] border border-[#d7dee7] bg-white p-5 shadow-sm">
                                    <VisitInfoSection managers={MANAGERS} />
                                </div>

                                <div className="w-full rounded-[18px] border border-[#d7dee7] bg-white p-5 shadow-sm">
                                    <VisitLocationSection />
                                </div>

                                <div className="w-full rounded-[18px] border border-[#d7dee7] bg-white p-5 shadow-sm">
                                    <VisitCapacitySection />
                                </div>
                                {/* 
                                <div className="w-full rounded-[18px] border border-[#d7dee7] bg-white p-5 shadow-sm">
                                    <VisitRequirementsSection />
                                </div> */}



                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="sr-only"
                                >
                                    ثبت بازدید
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <TableCoursesPage/>
                </>
            ) : (
                <div className="flex w-full flex-col gap-4">
                    ززز
                </div>
            )}
        </div>
    );
}

export default Courses;
