"use client";
import * as React from "react";
import { useField } from "formik";
import { Download, FileText, X } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { cn } from "@/lib/cn";

function AttachmentFile() {
    const [field, meta, helpers] = useField<File | null>("file");
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = React.useState(false);

    const pick = (file?: File | null) => {
        helpers.setTouched(true, false);
        helpers.setValue(file ?? null);
    };
    const openPicker = () => inputRef.current?.click();
    const hasError = meta.touched && !!meta.error;

    return (
        <div className="w-full rounded-2xl border border-neutral-200 bg-white px-8 py-7 shadow-sm">
            <h2 className="mb-8 text-s font-semibold text-neutral-900">فایل ضمیمه</h2>
            <div
                role="button"
                tabIndex={0}
                onClick={openPicker}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openPicker()}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    pick(e.dataTransfer.files?.[0]);
                }}
                className={`flex h-42.5 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors ${hasError ? "border-red-400" : dragging ? "border-blue-400 bg-blue-50" : "border-neutral-200"
                    }`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => {
                        pick(e.target.files?.[0]);
                        e.target.value = "";
                    }}
                />

                {field.value ? (
                    <div className="flex items-center gap-3 text-neutral-800">
                        <FileText className="h-8 w-8 text-neutral-600" />
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold" dir="ltr">{field.value.name}</span>
                            <span className="text-xs text-neutral-500">
                                {(field.value.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                        </div>
                        <button
                            type="button"
                            aria-label="حذف فایل"
                            onClick={(e) => {
                                e.stopPropagation();
                                pick(null);
                            }}
                            className="rounded-full p-1 text-neutral-500 hover:bg-neutral-100"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                ) : (
                    <>
                        <Download className="h-9 w-9 text-neutral-600" strokeWidth={1.5} />
                        <p className="mt-3 text-xs text-neutral-600">
                            فایل PDF گزارش را اینجا رها کنید یا کلیک کنید
                        </p>

                        <Button
                            size="xs"
                            variant="solid"
                            type="button"
                            className={cn("mt-3 h-8 rounded-lg border border-gray-200 bg-amber-50/40  text-nowrap text-xs font-bold text-neutral-900 transition-colors active:text-neutral-950 active:bg-teal-50 hover:text-neutral-950 hover:bg-teal-50 ")}
                        >
                            انتخاب فایل
                        </Button>

                    </>
                )}
            </div>

            {hasError && <p className="mt-2 text-xs text-red-600">{meta.error as string}</p>}
        </div>
    );
}

export default AttachmentFile;