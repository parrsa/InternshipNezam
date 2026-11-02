'use client'
import { ArrowUpToLine, Eye, Trash2, TriangleAlert, Upload } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const MAX_FILE_SIZE = 5 * 1024 * 1024

export interface ResumeFile {
    name: string
    size: number
    uploadedAt: string
    url?: string
}

interface ResumeUploaderProps {
    /** رزومهٔ اولیه (مثلاً از سرور) */
    initialResume?: ResumeFile | null
    /** هر وقت رزومه عوض یا حذف شد صدا زده می‌شود (برای ذخیره در فرم والد) */
    onChange?: (resume: ResumeFile | null, file?: File) => void
}

const formatSize = (bytes: number) => {
    const mb = Number((bytes / (1024 * 1024)).toFixed(1))
    return `${mb.toLocaleString("fa-IR")} مگابایت`
}

export default function ResumeUploader({ initialResume = null, onChange }: ResumeUploaderProps) {
    const [resume, setResume] = useState<ResumeFile | null>(initialResume)
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)

    // آزادسازی URL موقت هنگام unmount شدن کامپوننت
    const urlRef = useRef<string | undefined>(undefined)
    useEffect(() => {
        urlRef.current = resume?.url
    }, [resume])
    useEffect(() => {
        return () => {
            if (urlRef.current) URL.revokeObjectURL(urlRef.current)
        }
    }, [])

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

        const newResume: ResumeFile = {
            name: file.name,
            size: file.size,
            uploadedAt: new Date().toLocaleDateString("fa-IR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            }),
            url: URL.createObjectURL(file),
        }

        setError("")
        setResume(newResume)
        onChange?.(newResume, file)
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
        onChange?.(null)
    }

    const handlePreview = () => {
        if (resume?.url) window.open(resume.url, "_blank")
    }

    return (
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
    )
}