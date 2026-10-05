'use client'
import { Select } from "@/app/components/ui/input/SelectSilde"
import Table from "@/app/components/ui/Table";
import { useHeaderAction } from "@/core/provider/HeaderActionProvider/HeaderAction";
import { ArrowDownToLine, CircleCheck, CircleX, Eye } from "lucide-react";
import { useEffect, useState } from "react";

const infoData = [
    {
        id: 1,
        title: "در انتظار تایید سازمان",
        number: 3
    },
    {
        id: 2,
        title: "تأیید نهایی و آغاز کارآموزی",
        number: 9
    },
    {
        id: 3,
        title: "رد شده",
        number: 1
    },
    {
        id: 4,
        title: "کارآموزان فعال",
        number: 6
    }
]

const degreeOptions = [
    { label: "همه", value: "bachelor" },
    { label: "در انتظار", value: "master" },
    { label: "تاید شده", value: "phd" },
    { label: "ردشده", value: "associate" },
];

const tableRow = [
    {
        id: 1,
        internsName: "علی محمدی",
        major: "کارشناسی ارشد — مهندسی عمران",
        university: "دانشگاه صنعتی شریف",
        period: "مقررات ملی ساختمان",
        supervisor: "مهندس رضایی",
        supervisorInfo: "عمران — پایه ۳",
        buy: "paid",
        presence: "attended",
        Date: "۱۴۰۴/۰۵/۱۰",
        status: "pending",
    },
    {
        id: 2,
        internsName: "زهرا حسینی",
        major: "کارشناسی — مهندسی برق",
        university: "دانشگاه تهران",
        period: "تأسیسات برقی",
        supervisor: "مهندس احمدی",
        supervisorInfo: "برق — پایه ۲",
        buy: "paid",
        presence: "attended",
        Date: "۱۴۰۴/۰۵/۰۸",
        status: "pending",
    },
    {
        id: 3,
        internsName: "محمد رضایی",
        major: "کارشناسی — مهندسی معماری",
        university: "دانشگاه علم و صنعت",
        period: "طراحی معماری",
        supervisor: "مهندس کریمی",
        supervisorInfo: "معماری — پایه ۳",
        buy: "paid",
        presence: "attended",
        Date: "۱۴۰۴/۰۵/۰۶",
        status: "approved",
    },
    {
        id: 4,
        internsName: "فاطمه کریمی",
        major: "کارشناسی ارشد — مهندسی عمران",
        university: "دانشگاه امیرکبیر",
        period: "سازه",
        supervisor: "مهندس رضایی",
        supervisorInfo: "عمران — پایه ۳",
        buy: "paid",
        presence: "attended",
        Date: "۱۴۰۴/۰۵/۰۴",
        status: "approved",
    },
    {
        id: 5,
        internsName: "حسین موسوی",
        major: "کارشناسی — مهندسی برق",
        university: "دانشگاه خواجه نصیر",
        period: "تأسیسات برقی",
        supervisor: "مهندس احمدی",
        supervisorInfo: "برق — پایه ۲",
        buy: "unpaid",
        presence: "attended",
        Date: "۱۴۰۴/۰۵/۰۲",
        status: "rejected",
    },
    {
        id: 6,
        internsName: "سحر احمدی",
        major: "کارشناسی — مهندسی معماری",
        university: "دانشگاه هنر تهران",
        period: "طراحی داخلی",
        supervisor: "مهندس کریمی",
        supervisorInfo: "معماری — پایه ۳",
        buy: "paid",
        presence: "attended",
        Date: "۱۴۰۴/۰۵/۰۱",
        status: "pending",
    },
]

const HandelStatus = (status: any) => {
    switch (status) {
        case "pending":
            return <div className="bg-orange-100 w-fit text-amber-950 px-2 py-0.5 text-2xs border border-orange-300 rounded-full">در انتظار</div>;
        case "approved":
            return <div className="bg-primary-100 w-fit text-green-950 px-2 py-0.5 text-2xs border border-green-300 rounded-full">تأیید و آغاز کارآموزی</div>;
        case "rejected":
            return <div className="bg-red-100 w-fit text-red-800 px-2 py-0.5 text-2xs border border-red-300 rounded-full">رد شده</div>;
    }
}

const HandelPayment = (buy: any) => {
    switch (buy) {
        case "paid":
            return <div className="bg-primary-100 w-fit text-green-950 px-2 py-0.5 text-2xs border border-green-300 rounded-full">پرداخت شده</div>;
        case "unpaid":
            return <div className="bg-red-100 w-fit text-red-950 px-2 py-0.5 text-2xs border border-red-300 rounded-full">پرداخت نشده</div>;
    }
}

const HandelPresence = (presence: any) => {
    switch (presence) {
        case "attended":
            return <div className="bg-primary-100 w-fit text-green-950 px-2 py-0.5 text-2xs border border-green-300 rounded-full">حضور داشت</div>;
        case "absent":
            return <div className="bg-red-100 w-fit text-red-950 px-2 py-0.5 text-2xs border border-red-300 rounded-full">غایب</div>;
    }
}

export default function InternsRequest() {
    const [degree, setDegree] = useState("bachelor");
    const { setAction } = useHeaderAction()

    useEffect(() => {
        setAction(
            <div className="text-sm flex justify-start items-start flex-col gap-1">
                <p className="text-black font-bold ">درخواست‌های کارآموزی</p>
                <p className="text-neutral-500 text-xs font-medium">درخواست‌های ارسال‌شده از سمت کارآموزان انتخاب‌کننده</p>
            </div>
        )
        return () => {
            setAction(null)
        }
    }, [])

    const ColsData = [
        {
            key: "internsName",
            label: "نام کارآموز",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
        },
        {
            key: "university",
            label: "رشته / دانشگاه",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
            render: (row: any) => (
                <div className="flex flex-col items-start gap-1">
                    <span className="text-neutral-500 text-2xs">{row.major}</span>
                    <span className="text-neutral-600 text-2xs">{row.university}</span>
                </div>
            )
        },
        {
            key: "period",
            label: "دوره موردنظر",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
        },
        {
            key: "supervisor",
            label: "سرپرست",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
            render: (row: any) => (
                <div className="flex flex-col items-center gap-1">
                    <span className="text-neutral-600 text-sm font-bold">{row.supervisor}</span>
                    <span className="text-neutral-500 text-2xs">{row.supervisorInfo}</span>
                </div>
            )
        },
        {
            key: "buy",
            label: "پرداخت",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
            render: (row: any) => (
                <div className="w-full flex justify-center items-center">
                    {HandelPayment(row.buy)}
                </div>
            )
        },
        {
            key: "presence",
            label: "حضور در توجیهی",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
            render: (row: any) => (
                <div className="w-full flex justify-center items-center">
                    {HandelPresence(row.presence)}
                </div>
            )
        },
        {
            key: "Date",
            label: "تاریخ",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
        },
        {
            key: "status",
            label: "وضعیت",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
            render: (row: any) => (
                <div className="w-full flex justify-center items-center">
                    {HandelStatus(row.status)}
                </div>
            )
        },
        {
            key: "Operation",
            label: "عملیات",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
            render: (row: any) => (
                <div className="text-3xs flex justify-cente items-center gap-2">
                    <div className="flex   text-neutral-900 items-center gap-1 p-2 cursor-pointer font-bold  border text-2xs  border-neutral-300 rounded-lg bg-neutral-50 ">
                        <Eye size={14} />
                        <span>جزئیات</span>
                    </div>
                    {row.status === "pending" && (
                        <>
                            <div className="flex justify-center items-center gap-1 p-2 text-2xs cursor-pointer rounded-lg bg-primary-600 text-white ">
                                <CircleCheck size={14} />
                                <span>تأیید نهایی و اغاز کار اموزی</span>
                            </div>
                            <div className="flex justify-center items-center gap-1 p-2 cursor-pointer border border-red-300 rounded-lg text-red-600 font-bold">
                                <CircleX size={14} />
                                <span>رد</span>
                            </div>
                        </>
                    )}
                </div>
            )
        },

    ]

    return (
        <div className="p-4">
            <div className="w-full bg-input-50 border-r-4 text-input-900 border-input-500 text-2xs rounded-lg p-3 mb-5">
                <p>
                    این درخواست‌ها پس از تأیید سرپرست کارآموز، به همراه اطلاعات کامل کارآموز و سرپرست به سازمان ارسال شده است. با تأیید نهایی سازمان، فرایند کارآموزی آغاز می‌گردد.

                </p>
            </div>
            <div className="w-full grid grid-cols-4 grid-rows-[150px] gap-4">
                {infoData.map((item: any) => (
                    <div key={item.id} className="w-full  bg-white rounded-2xl shadow-sm border border-neutral-300 flex justify-center items-start p-4 gap-2 flex-col ">
                        <p className="text-neutral-500 font-medium text-xs">{item.title}</p>
                        <p className="text-black font-bold text-xl">{item.number}</p>
                    </div>
                ))}
            </div>

            <div className="w-full flex justify-center bg-white items-center flex-col gap-3 p-4 rounded-xl border border-neutral-300 mt-4">
                <div className="w-full flex justify-between items-center mb-6 mt-2">
                    <div className="w-full text-right text-black font-bold text-xs">
                        <p>درخواست‌های نهایی کارآموزی (ارسالی از سرپرستان)</p>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <Select
                            className=" text-nowrap text-xs"
                            placeholder="انتخاب مقطع"
                            options={degreeOptions}
                            value={degree}
                            onChange={setDegree}
                        />
                        <div className="flex p-2 rounded-lg cursor-pointer hover:bg-input-100 transition-all duration-500 justify-center items-center gap-1 text-xs border border-neutral-300">
                            <ArrowDownToLine size={17} />
                            <span>خروجی</span>
                        </div>
                    </div>


                </div>
                <div className="w-full text-nowrap">
                    <Table tableCol={ColsData} tableRow={tableRow} />
                </div>
            </div>
        </div>
    )
}