import { Button } from "@/app/components/ui/Button";
import { cn } from "@/lib/cn";
import { CircleUser, User } from "lucide-react";

interface ProfileCardProps {
    fullName?: string;
    major?: string;
    onEdit?: () => void;
}

function getInitials(fullName: string): string {
    const words = fullName.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return "";
    const first = words[0][0];
    const last = words.length > 1 ? words[words.length - 1][0] : "";
    return [first, last].filter(Boolean).join(" ");
}

function getMajorTitle(major: string): string {
    return major.split("—")[0].trim();
}

export function ProfileCard({ fullName = "", major = "", onEdit }: ProfileCardProps) {
    const hasData = fullName.trim() !== "";

    return (
        <div

            className="flex flex-col h-92 items-center rounded-2xl border border-neutral-200 bg-white  justify-center pb-15 shadow-sm"
        >
            <div
                
                className="flex h-25 w-25 items-center justify-center rounded-full bg-[#dde4f3] text-3xl font-bold text-blue-800"
            >
                {hasData ? getInitials(fullName) : <User size={45} />}
            </div>

            <h2
                className={`mt-5 text-base font-bold ${hasData ? "text-neutral-900" : "text-neutral-900"}`}
            >
                {hasData ? fullName : "نام و نام خانوادگی"}
            </h2>
            <p className="mt-1 text-xs text-neutral-500">
                کارآموز{hasData && ` — ${getMajorTitle(major)}`}
            </p>
            <Button
                leftIcon={
                    <User size={18} strokeWidth={1.75} />
                }
                size="xs"
                variant="solid"
                type="button"
                rounded="lg"
                className={cn("flex   items-center justify-center gap-2 h-9  mt-3  border border-gray-200 bg-amber-50/40  text-nowrap text-xs font-bold text-neutral-900 transition-colors active:text-neutral-950 active:bg-teal-50 hover:text-neutral-950 hover:bg-teal-50")}
            >
                ویرایش پروفایل
            </Button>
         
        </div>
    );
}

export default ProfileCard;