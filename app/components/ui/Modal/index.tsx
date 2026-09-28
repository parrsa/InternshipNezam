import { X } from "lucide-react";
import { useEffect } from "react";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

const sizeMap: Record<ModalSize, string> = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-lg",
    lg: "sm:max-w-2xl",
    xl: "sm:max-w-4xl",
    full: "sm:max-w-[95vw]",
};

export default function Modal({
    closeModal,
    isOpen,
    children,
    title = 'مودال',
    size = 'md',
    className,
}: {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    closeModal: () => void;
    size?: ModalSize;
    className?:string
}) {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen, title])

    return (
        isOpen && (
            <div
                onClick={closeModal}
                className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 sm:p-5"
            >
                <div
                    className={`flex flex-col w-full max-h-[90vh] rounded-2xl bg-white overflow-hidden ${sizeMap[size]} ${className}`}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex items-center w-full justify-between p-4 sm:p-5 pb-2 sm:pb-3 border-b border-neutral-100 shrink-0">
                        <h1 className="font-bold text-lg sm:text-xl">
                            {title}
                        </h1>
                        <button
                            onClick={closeModal}
                            className="text-black cursor-pointer hover:bg-neutral-100 rounded-full p-2 shrink-0"
                        >
                            <X size={22} />
                        </button>
                    </div>
                    <div className="flex flex-col gap-2 p-4 sm:p-5 pt-3 overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        )
    )
}