"use client";
import {
  ArrowUpToLine,
  Eye,
  FileText,
  Trash2,
  TriangleAlert,
  Upload,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export interface ResumeFile {
  name: string;
  size: number;
  uploadedAt: string;
  url?: string;
}

interface ResumeUploaderProps {
  initialResume?: ResumeFile | null;
  onChange?: (resume: ResumeFile | null, file?: File) => void;
}

const formatSize = (bytes: number) =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

export default function ResumeUploader({
  initialResume = null,
  onChange,
}: ResumeUploaderProps) {
  const [resume, setResume] = useState<ResumeFile | null>(initialResume);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const urlRef = useRef<string | undefined>(undefined);
  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  const handleFile = (file: File | undefined) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("فقط فایل PDF مجاز است.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("حجم فایل نباید بیشتر از ۵ مگابایت باشد.");
      return;
    }

    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    const url = URL.createObjectURL(file);
    urlRef.current = url;

    const newResume: ResumeFile = {
      name: file.name,
      size: file.size,
      uploadedAt: new Date().toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
      url,
    };

    setError("");
    setResume(newResume);
    onChange?.(newResume, file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0]);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleDelete = () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = undefined;
    setResume(null);
    setError("");
    onChange?.(null);
  };

  const handlePreview = () => {
    if (resume?.url) window.open(resume.url, "_blank");
  };

  return (
    <div
      dir="rtl"
      className="w-full flex flex-col gap-4 mt-4 rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6 bg-white"
    >
      <div className="flex justify-start items-center gap-2 text-sm font-bold text-black mb-4">
        <ArrowUpToLine size={18} />
        <span>فایل رزومه</span>
      </div>

      {resume && (
        <div className="w-full flex items-center justify-between gap-3 p-3 rounded-lg border border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-2 min-w-0">
            <FileText size={18} className="text-neutral-600 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-neutral-900 truncate">
                {resume.name}
              </p>
              <p className="text-3xs text-neutral-500">
                {formatSize(resume.size)} · {resume.uploadedAt}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {resume.url && (
              <button
                type="button"
                onClick={handlePreview}
                className="cursor-pointer"
                aria-label="مشاهده رزومه"
              >
                <Eye size={17} />
              </button>
            )}
            <button
              type="button"
              onClick={handleDelete}
              className="cursor-pointer"
              aria-label="حذف رزومه"
            >
              <Trash2 size={17} color="red" />
            </button>
          </div>
        </div>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`w-full flex flex-col justify-center items-center gap-3 py-8 rounded-xl border-2 border-dashed transition-all duration-300 ${
          isDragging ? "border-input-700 bg-input-50" : "border-neutral-300 bg-white"
        }`}
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
        <span>
          فایل رزومه برای کارآموزان در زمان انتخاب سرپرست قابل مشاهده خواهد بود.
          از بارگذاری اطلاعات حساس شخصی خودداری کنید.
        </span>
      </div>
    </div>
  );
}