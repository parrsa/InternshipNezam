import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/input";
import { Plus } from "lucide-react";

export default function RegistrationCOnditions() {
    return (
        <div dir="rtl" className="flex w-full flex-col gap-5 rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6  bg-white ">

            <div className="flex items-center mb-7 gap-2 justify-between w-full">
                <div className="flex justify-center items-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input-50 text-2xs font-bold text-input-700">
                        4
                    </span>
                    <h3 className="text-s font-bold text-gray-800">
                        شرایط پذیرش کارآموز

                    </h3>
                </div>
                <div>
                    <span className="px-2 bg-blue-100 text-2xs py-1 rounded-full text-input-900">قابل ویرایش همیشگی</span>
                </div>
            </div>

            <div className="w-full flex justify-start items-center gap-4">
                <div className="w-full flex justify-start items-center gap-4">
                    <div className="w-72">
                        <Input />
                    </div>
                    <div className="w-36">
                        <Input />
                    </div>
                </div>
                <div></div>
                <div></div>
            </div>


        </div >

    )
}