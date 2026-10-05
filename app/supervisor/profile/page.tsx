'use client'
import { Button } from "@/app/components/ui/Button"
import SwitchButton from "@/app/components/ui/Button/switchButton"
import Table from "@/app/components/ui/Table"
import { ArrowUpToLine, Eye, Pencil, Plus, Save, Trash2, TriangleAlert, Upload } from "lucide-react"
import { useRef, useState } from "react"

const Info = {
    name: "مهندس",
    lastName: "رضایی",
    des: "مهندسی عمران — طراح / ناظر / مجری — پایه ۳"
}

const MAX_FILE_SIZE = 5 * 1024 * 1024

interface ResumeFile {
    name: string
    size: number
    uploadedAt: string
    url?: string
}

const formatSize = (bytes: number) => {
    const mb = Number((bytes / (1024 * 1024)).toFixed(1))
    return `${mb.toLocaleString("fa-IR")} مگابایت`
}

const rowsTabel = [
    {
        list: 1,
        ProjectName: "برج مسکونی پارسیان",
        role: "مدیر پروژه",
        area: 12000,
        time: 24,
        year: 1403,
        status: "inProgress",
    },
    {
        list: 2,
        ProjectName: "مجتمع تجاری کیان",
        role: "ناظر رشته برق",
        area: 8500,
        time: 18,
        year: 1402,
        status: "completed",
    },
    {
        list: 3,
        ProjectName: "بیمارستان مهر",
        role: "طراح تأسیسات",
        area: 15000,
        time: 30,
        year: 1401,
        status: "completed",
    },
    {
        list: 4,
        ProjectName: "مدرسه شهید بهشتی",
        role: "مجری",
        area: 4200,
        time: 12,
        year: 1400,
        status: "completed",
    },
]

const HandelStatus = (status: any) => {
    switch (status) {
        case "inProgress":
            return <div className="bg-amber-100 w-fit text-amber-800 px-2 py-1 text-2xs border border-amber-300 rounded-full">در حال اجرا</div>;
        case "completed":
            return <div className="bg-green-100 w-fit text-green-800 px-2 py-1 text-2xs border border-green-300 rounded-full">اتمام یافته</div>;
    }
}

export default function Profile() {
    const [checked, setChecked] = useState(false)
    const [resume, setResume] = useState<ResumeFile | null>({
        name: "resume_razai_1404.pdf",
        size: 1.2 * 1024 * 1024,
        uploadedAt: "۱۴۰۴/۰۴/۲۸",
    })
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFile = (file: File | undefined) => {
        if (!file) return

        if (file.type !== "application/pdf") {
            setError("فقط فایل PDF مجاز است.")
            return
        }
        if (file.size > MAX_FILE_SIZE) {
            setError("حجم فایل نباید بیشتر از ۵ مگابایت باشد.")
            return
        }

        if (resume?.url) URL.revokeObjectURL(resume.url)

        setError("")
        setResume({
            name: file.name,
            size: file.size,
            uploadedAt: new Date().toLocaleDateString("fa-IR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            }),
            url: URL.createObjectURL(file),
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFile(e.target.files?.[0])
        e.target.value = ""
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)
        handleFile(e.dataTransfer.files?.[0])
    }

    const handleDelete = () => {
        if (resume?.url) URL.revokeObjectURL(resume.url)
        setResume(null)
        setError("")
    }

    const handlePreview = () => {
        if (resume?.url) window.open(resume.url, "_blank")
    }

    const colTabel = [
        {
            key: "list",
            label: "ردیف",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
            render: (row: any) => (
                <span>{row.list.toLocaleString("fa-IR")}</span>
            )
        },
        {
            key: "ProjectName",
            label: "نام پروژه",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
            render: (row: any) => (
                <span className="text-black text-sm font-bold">{row.ProjectName}</span>
            )
        },
        {
            key: "role",
            label: "نقش",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
        },
        {
            key: "area",
            label: "مساحت",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
            render: (row: any) => (
                <span>{row.area.toLocaleString("fa-IR")} مترمربع</span>
            )
        },
        {
            key: "time",
            label: "مدت",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
            render: (row: any) => (
                <span>{row.time.toLocaleString("fa-IR")} ماه</span>
            )
        },
        {
            key: "year",
            label: "سال",
            className: "text-neutral-600 text-sm text-center",
            width: "text-center",
            render: (row: any) => (
                <span>{row.year.toLocaleString("fa-IR", { useGrouping: false })}</span>
            )
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
                <div className="flex justify-center items-center gap-4">
                    <div className="cursor-pointer">
                        <Trash2 size={17} color="red" />
                    </div>
                    <div className="cursor-pointer">
                        <Pencil size={17} />
                    </div>
                </div>
            )
        },

    ]
    return (
        <div className="w-full p-4">
            <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-neutral-300">
                <div className="flex justify-center items-center gap-2">
                    <div className=" flex justify-start items-center">
                        <div className="w-14 h-14 bg-[#DCE3F3] rounded-full flex justify-center items-center text-input-900 font-medium">
                            {Info.lastName[0]} {Info.lastName[1]}
                        </div>
                    </div>

                    <div className="text-xs flex justify-start items-start flex-col gap-1">
                        <p className="text-sm font-bold text-black">{Info.name} {Info.lastName}</p>
                        <p className="text-neutral-700">{Info.des}</p>
                        <p className="text-neutral-500 text-2xs">این پروفایل توسط کارآموزان هنگام انتخاب سرپرست مشاهده می‌شود.</p>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-2">
                    <div className="flex justify-center items-center gap-1 text-3xs">
                        <span>نمایش پروفایل به کارآموزان</span>
                        <SwitchButton id="profile-visibility" checked={checked} onChange={setChecked} />
                    </div>
                    {checked ?
                        <div className="text-3xs bg-green-100 border border-green-300 rounded-full w-fit px-2 text-green-800">
                            <span>مشاهده پذیر</span>
                        </div> :
                        <div className="text-3xs bg-neutral-100 border border-neutral-300 rounded-full w-fit px-2 text-neutral-800">
                            <span>مخفی</span>
                        </div>}
                </div>
            </div>
            <div dir="rtl" className="flex w-full flex-col gap-5 mt-4 rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6  bg-white ">

                <div className="flex items-center mb-7 gap-2 justify-between w-full">
                    <div className="flex justify-start items-start gap-2 flex-col text-xs">
                        <h3 className="text-s font-bold text-gray-800">
                            پروژه‌های من
                        </h3>
                        <p className="text-3xs text-neutral-500">این پروژه‌ها در پروفایل شما به کارآموزان نمایش داده می‌شود.</p>
                    </div>
                    <div>
                        <Button className="w-28 text-nowrap h-8 text-2xs" rounded="lg" color="input" leftIcon={<Plus />}>افزودن پروژه</Button>
                    </div>
                </div>

                <div>
                    <Table minHeight="100px" tableCol={colTabel} tableRow={rowsTabel} />
                </div>


            </div >

            <div dir="rtl" className="w-full flex flex-col gap-4 mt-4 rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6 bg-white">
                <div className="flex justify-start items-center gap-2 text-sm font-bold text-black mb-4">
                    <ArrowUpToLine size={18} />
                    <span>فایل رزومه</span>
                </div>

                {resume && (
                    <div className="w-full flex justify-between items-center gap-3 p-4 rounded-xl border border-neutral-300 bg-neutral-50">
                        <div className="flex justify-start items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-red-100 text-red-600 text-2xs font-bold flex justify-center items-center">
                                PDF
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-bold text-black" dir="ltr">{resume.name}</p>
                                <p className="text-2xs text-neutral-500">
                                    {formatSize(resume.size)} — آپلود شده در {resume.uploadedAt}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <button
                                type="button"
                                onClick={handlePreview}
                                disabled={!resume.url}
                                className="flex justify-center items-center gap-1 px-3 py-2 text-xs font-bold border border-neutral-300 rounded-lg bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Eye size={14} />
                                <span>پیش‌نمایش</span>
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="flex justify-center items-center gap-1 px-3 py-2 text-xs font-bold border border-red-300 rounded-lg bg-white text-red-600 cursor-pointer"
                            >
                                <Trash2 size={14} />
                                <span>حذف</span>
                            </button>
                        </div>
                    </div>
                )}

                <div
                    onDragOver={(e) => {
                        e.preventDefault()
                        setIsDragging(true)
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`w-full flex flex-col justify-center items-center gap-3 py-8 rounded-xl border-2 border-dashed transition-all duration-300 ${isDragging ? "border-input-700 bg-input-50" : "border-neutral-300 bg-white"}`}
                >
                    <Upload size={36} className="text-neutral-500" />
                    <p className="text-xs text-neutral-500">
                        {resume
                            ? "برای جایگزینی رزومه، فایل PDF جدید را اینجا رها کنید"
                            : "فایل PDF رزومه را اینجا رها کنید"}
                    </p>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 text-xs font-bold border border-neutral-300 rounded-lg bg-neutral-50 cursor-pointer hover:bg-neutral-100 transition-all duration-300"
                    >
                        انتخاب فایل
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={handleInputChange}
                    />
                    {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
                </div>

                <div className="w-full flex justify-start items-center gap-2 p-3 rounded-lg bg-amber-50 border-r-4 border-amber-500 text-amber-800 text-xs">
                    <TriangleAlert size={14} />
                    <span>فایل رزومه برای کارآموزان در زمان انتخاب سرپرست قابل مشاهده خواهد بود. از بارگذاری اطلاعات حساس شخصی خودداری کنید.</span>
                </div>
            </div>

            <div className="w-full flex justify-end items-center">
                <Button leftIcon={<Save />} className="text-xs mt-4 h-9" size="sm" rounded="lg" variant="solid" color="input">ذخیره پروفایل</Button>
            </div>
        </div>
    )
}