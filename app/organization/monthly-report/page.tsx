// 'use client'
// import Table from "@/app/components/ui/Table"
// import { useHeaderAction } from "@/core/provider/HeaderActionProvider/HeaderAction"
// import { CircleCheck } from "lucide-react"
// import { useEffect } from "react"

// const infoData = [
//     {
//         id: 1,
//         title: "در انتظار",
//         number: 3
//     },
//     {
//         id: 2,
//         title: "تأیید شده",
//         number: 9
//     }, {
//         id: 3,
//         title: "رد شده",
//         number: 1
//     },
// ]

// const tabelRow = [
//     {
//         intern: "علی محمدی",
//         period: "مرداد ۱۴۰۴",
//         Time: 168,
//         Date: "۱۴۰۴/۰۵/۰۲",
//         Status: "pending",
//     },
//     {
//         intern: "زهرا حسینی",
//         period: "مرداد ۱۴۰۴",
//         Time: 152,
//         Date: "۱۴۰۴/۰۵/۰۲",
//         Status: "approved",
//     },
//     {
//         intern: "محمد رضایی",
//         period: "مرداد ۱۴۰۴",
//         Time: 96,
//         Date: "۱۴۰۴/۰۵/۰۲",
//         Status: "pending",
//     },
//     {
//         intern: "فاطمه کریمی",
//         period: "مرداد ۱۴۰۴",
//         Time: 48,
//         Date: "۱۴۰۴/۰۵/۰۲",
//         Status: "rejected",
//     },
//     {
//         intern: "حسین موسوی",
//         period: "مرداد ۱۴۰۴",
//         Time: 180,
//         Date: "۱۴۰۴/۰۵/۰۲",
//         Status: "approved",
//     },
// ]

// const HandelStatus = (status: any) => {
//     switch (status) {
//         case "pending":
//             return <div className="bg-amber-100 w-fit text-amber-800 px-2 py-1 text-2xs border border-amber-300 rounded-full">در انتظار</div>;
//         case "approved":
//             return <div className="bg-green-100 w-fit text-green-800 px-2 py-1 text-2xs border border-green-300 rounded-full">تایید شده</div>;
//         case "rejected":
//             return <div className="bg-red-100 w-fit text-red-800 px-2 py-1 text-2xs border border-red-300 rounded-full">رد شده</div>
//     }
// }

// export default function MonthlyReport() {
//     const { setAction } = useHeaderAction()

//     const tabelCols = [
//         {
//             key: "intern",
//             label: "کارآموز",
//             className: "text-neutral-600 text-sm text-center",
//             width: "text-center",
//         },
//         {
//             key: "period",
//             label: "دوره",
//             className: "text-neutral-600 text-sm text-center",
//             width: "text-center",
//         },
//         {
//             key: "Time",
//             label: "ساعت",
//             className: "text-neutral-600 text-sm text-center",
//             width: "text-center",
//         },
//         {
//             key: "Date",
//             label: "تاریخ",
//             className: "text-neutral-600 text-sm text-center",
//             width: "text-center",
//         },
//         {
//             key: "Status",
//             label: "وضعیت",
//             className: "text-neutral-600 text-sm text-center",
//             width: "text-center",
//             render: (row: any) => (
//                 <div className="w-full flex justify-center items-center">
//                     {HandelStatus(row.Status)}
//                 </div>
//             )
//         },
//         {
//             key: "asd",
//             label: "عملیات",
//             className: "text-neutral-600 text-sm text-center",
//             width: "text-center",
//             render: (row: any) => (
//                 <div className="flex justify-center items-center gap-2">
//                     <div className="flex justify-center p-1 cursor-pointer hover:bg-input-50 border-neutral-300 transition-all duration-500 items-center gap-2 border rounded-md bg-neutral-50 shadow-lg text-xs">
//                         <CircleCheck size={12} />
//                         <span>تایید</span>
//                     </div>
//                     <div className="flex justify-center p-1 cursor-pointer hover:bg-input-50 border-neutral-300 transition-all duration-500 items-center gap-2 border rounded-md bg-neutral-50 shadow-lg text-xs">
//                         <span>بازخورد</span>
//                     </div>
//                 </div>
//             )
//         },

//     ]
//     useEffect(() => {
//         setAction(
//             <div className="text-sm flex justify-start items-start flex-col gap-1">
//                 <p className="text-black font-bold ">گزارش‌های ماهانه</p>
//                 <p className="text-neutral-500 text-xs font-medium">بازبینی و تأیید گزارش‌ها</p>
//             </div>
//         )
//         return () => {
//             setAction(null)
//         }
//     }, [])

//     return (
//         <div className="p-4">
//             <div className="w-full grid grid-cols-3 grid-rows-[150px] gap-4">
//                 {infoData.map((item: any) => (
//                     <div key={item.id} className="w-full h-full bg-white rounded-2xl shadow-lg border border-neutral-300 flex justify-center items-start p-4 gap-2 flex-col ">
//                         <p className="text-neutral-500 font-medium text-xs">{item.title}</p>
//                         <p className="text-black font-bold text-xl">{item.number}</p>
//                     </div>
//                 ))}
//             </div>

//             <div className="w-full bg-white p-5 mt-4 rounded-xl  border border-neutral-300 shadow-lg">
//                 <div>
//                     <p className="text-black text-xs font-bold">گزارش های ماهانه کارآموزان</p>
//                 </div>

//                 <div className="mt-8">
//                     <Table minHeight="100px" tableCol={tabelCols} tableRow={tabelRow} />
//                 </div>
//             </div>
//         </div>
//     )
// }








"use client";

import { Input } from "@/app/components/ui/input";
import { Select } from "@/app/components/ui/input/SelectSilde";
import Table from "@/app/components/ui/Table";

import { useHeaderAction } from "@/core/provider/HeaderActionProvider/HeaderAction";
import { CircleCheck, MessageSquare } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type ReportStatus = "pending" | "approved" | "rejected";

type Report = {
    id: number;
    reportName: string;
    intern: string;
    supervisor: string;
    date: string;
    status: ReportStatus;
    period: string;
};

type Props = {
    role?: "supervisor" | "organization";
};

const reportData: Report[] = [
    {
        id: 1,
        reportName: "گزارش ماهانه مرداد",
        intern: "علی محمدی",
        supervisor: "محمد احمدی",
        date: "۱۴۰۴/۰۵/۰۲",
        status: "pending",
        period: "مرداد ۱۴۰۴",
    },
    {
        id: 2,
        reportName: "گزارش فعالیت ماهانه",
        intern: "زهرا حسینی",
        supervisor: "رضا کریمی",
        date: "۱۴۰۴/۰۵/۰۵",
        status: "approved",
        period: "مرداد ۱۴۰۴",
    },
    {
        id: 3,
        reportName: "گزارش پایان دوره",
        intern: "محمد رضایی",
        supervisor: "محمد احمدی",
        date: "۱۴۰۴/۰۵/۱۰",
        status: "pending",
        period: "مرداد ۱۴۰۴",
    },
    {
        id: 4,
        reportName: "گزارش پیشرفت کارآموزی",
        intern: "فاطمه کریمی",
        supervisor: "رضا کریمی",
        date: "۱۴۰۴/۰۵/۱۲",
        status: "rejected",
        period: "مرداد ۱۴۰۴",
    },
    {
        id: 5,
        reportName: "گزارش فعالیت ماهانه",
        intern: "حسین موسوی",
        supervisor: "محمد احمدی",
        date: "۱۴۰۴/۰۶/۰۲",
        status: "approved",
        period: "شهریور ۱۴۰۴",
    },
];

const statusLabels: Record<ReportStatus, string> = {
    pending: "در انتظار بررسی",
    approved: "تأیید شده",
    rejected: "رد شده",
};

const HandleStatus = (status: ReportStatus) => {
    const styles: Record<ReportStatus, string> = {
        pending: "bg-amber-100 text-amber-800 border-amber-300",
        approved: "bg-green-100 text-green-800 border-green-300",
        rejected: "bg-red-100 text-red-800 border-red-300",
    };

    return (
        <span
            className={`w-fit px-2 py-1 text-2xs border rounded-full ${styles[status]}`}
        >
            {statusLabels[status]}
        </span>
    );
};

export default function MonthlyReport({
    role = "supervisor",
}: Props) {
    const { setAction } = useHeaderAction();

    const [intern, setIntern] = useState("");
    const [supervisor, setSupervisor] = useState("");
    const [date, setDate] = useState("");
    const [period, setPeriod] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        setAction(
            <div className="text-sm flex flex-col gap-1">
                <p className="text-black font-bold">
                    گزارش‌های کارآموزان
                </p>
                <p className="text-neutral-500 text-xs font-medium">
                    مشاهده و مدیریت گزارش‌های ثبت شده
                </p>
            </div>
        );

        return () => {
            setAction(null);
        };
    }, [setAction]);

    const statistics = [
        {
            id: 1,
            title: "در انتظار بررسی",
            number: reportData.filter(
                (item) => item.status === "pending"
            ).length,
            color: "text-amber-600",
        },
        {
            id: 2,
            title: "تأیید شده",
            number: reportData.filter(
                (item) => item.status === "approved"
            ).length,
            color: "text-green-600",
        },
        {
            id: 3,
            title: "رد شده",
            number: reportData.filter(
                (item) => item.status === "rejected"
            ).length,
            color: "text-red-600",
        },
    ];

    const filteredReports = useMemo(() => {
        return reportData.filter((item) => {
            return (
                item.intern.includes(intern) &&
                item.supervisor.includes(supervisor) &&
                item.date.includes(date) &&
                item.period.includes(period) &&
                (status === "" || item.status === status)
            );
        });
    }, [intern, supervisor, date, period, status]);

    const resetFilters = () => {
        setIntern("");
        setSupervisor("");
        setDate("");
        setPeriod("");
        setStatus("");
    };

    const tableCols = [
        {
            key: "reportName",
            label: "نام گزارش",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
        },
        {
            key: "intern",
            label: "اطلاعات کارآموز",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
        },
        ...(role === "organization"
            ? [
                  {
                      key: "supervisor",
                      label: "نام سرپرست",
                      className: "text-neutral-600 text-sm text-center",
                      width: "text-center",
                  },
              ]
            : []),
        {
            key: "date",
            label: "تاریخ",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
        },
        {
            key: "status",
            label: "وضعیت",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
            render: (row: Report) => (
                <div className="w-full flex justify-center items-center">
                    {HandleStatus(row.status)}
                </div>
            ),
        },
        {
            key: "period",
            label: "دوره",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
        },
        ...(role === "supervisor"
            ? [
                  {
                      key: "actions",
                      label: "عملیات",
                      className: "text-neutral-600 text-sm text-center",
                      width: "text-center",
                      render: (row: Report) => (
                          <div className="flex justify-center items-center gap-2">
                              <button
                                  type="button"
                                  className="flex justify-center items-center gap-1 p-2 cursor-pointer hover:bg-green-50 border border-neutral-300 transition-all duration-300 rounded-md bg-neutral-50 text-xs"
                                  onClick={() => {
                                      console.log("Approve", row.id);
                                  }}
                              >
                                  <CircleCheck size={13} />
                                  <span>تأیید</span>
                              </button>

                              <button
                                  type="button"
                                  className="flex justify-center items-center gap-1 p-2 cursor-pointer hover:bg-input-50 border border-neutral-300 transition-all duration-300 rounded-md bg-neutral-50 text-xs"
                                  onClick={() => {
                                      console.log("Feedback", row.id);
                                  }}
                              >
                                  <MessageSquare size={13} />
                                  <span>بازخورد</span>
                              </button>
                          </div>
                      ),
                  },
              ]
            : []),
    ];

    return (
        <div className="w-full p-4 space-y-4">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                {statistics.map((item) => (
                    <div
                        key={item.id}
                        className="w-full min-h-[120px] bg-white rounded-2xl shadow-sm border border-neutral-300 flex justify-center items-start p-5 gap-3 flex-col"
                    >
                        <p className="text-neutral-500 font-medium text-xs">
                            {item.title}
                        </p>
                        <p className={`font-bold text-2xl ${item.color}`}>
                            {item.number}
                        </p>
                    </div>
                ))}
            </div>

            <div className="w-full bg-white p-5 rounded-xl border border-neutral-300 shadow-sm">
                <div className="mb-5">
                    <p className="text-black text-sm font-bold">
                        فیلتر گزارش‌ها
                    </p>
                </div>

                <div
                    className={`grid grid-cols-1 sm:grid-cols-2 ${
                        role === "organization"
                            ? "lg:grid-cols-5"
                            : "lg:grid-cols-4"
                    } gap-4`}
                >
                    <Input
                        value={intern}
                        onChange={(e) => setIntern(e.target.value)}
                        placeholder="نام کارآموز"
                        variant="outline"
                        inputSize="sm"
                        rounded="lg"
                    />

                    {role === "organization" && (
                        <Input
                            value={supervisor}
                            onChange={(e) => setSupervisor(e.target.value)}
                            placeholder="نام سرپرست"
                            variant="outline"
                            inputSize="sm"
                            rounded="lg"
                        />
                    )}

                    <Input
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="تاریخ"
                        variant="outline"
                        inputSize="sm"
                        rounded="lg"
                    />

                    <Select
                        value={period}
                        onChange={setPeriod}
                        placeholder="همه دوره‌ها"
                        options={[
                            {
                                label: "مرداد ۱۴۰۴",
                                value: "مرداد ۱۴۰۴",
                            },
                            {
                                label: "شهریور ۱۴۰۴",
                                value: "شهریور ۱۴۰۴",
                            },
                        ]}
                    />

                    <Select
                        value={status}
                        onChange={setStatus}
                        placeholder="همه وضعیت‌ها"
                        options={[
                            {
                                label: "در انتظار بررسی",
                                value: "pending",
                            },
                            {
                                label: "تأیید شده",
                                value: "approved",
                            },
                            {
                                label: "رد شده",
                                value: "rejected",
                            },
                        ]}
                    />
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={resetFilters}
                        className="text-xs text-neutral-500 hover:text-black transition-colors"
                    >
                        پاک کردن فیلترها
                    </button>
                </div>
            </div>

            <div className="w-full bg-white p-5 rounded-xl border border-neutral-300 shadow-sm">
                <div className="flex justify-between items-center mb-5">
                    <p className="text-sm text-black font-bold">
                        لیست گزارش‌ها
                    </p>

                    <span className="text-xs text-neutral-500">
                        {filteredReports.length} گزارش
                    </span>
                </div>

                <Table
                    minHeight="100px"
                    tableCol={tableCols}
                    tableRow={filteredReports}
                />
            </div>
        </div>
    );
}
