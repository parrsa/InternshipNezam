import React from 'react'
import { UserRoundCheck, Send } from 'lucide-react'
import { Button } from '@/app/components/ui/Button'

const supervisor = {
    initials: 'ر ض',
    name: 'مهندس رضایی',
    info: 'مهندسی عمران — پایه ۳ — ۹۵ امتیاز',
}

function CurrentActionPart() {
    return (
        <div className="w-full flex flex-col gap-3 mt-2 p-3 pr-6 rounded-2xl border border-indigo-300   bg-[#6a76df0c]">

            <div className="flex items-center gap-2 mt-4">
                <UserRoundCheck className="size-4 text-input-800" strokeWidth={1.75} />
                <h3 className="text-xs font-semibold text-neutral-900">
                    اقدام فعلی: انتخاب سرپرست کارآموزی
                </h3>
            </div>

            <p className="text-neutral-500 text-2xs mt-6">
                پروفایل سرپرستان را مشاهده و سرپرست موردنظر را انتخاب کنید.
            </p>

            <div className="w-full flex flex-col gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-3">
                <span className="text-2xs font-semibold text-neutral-900">
                    سرپرست انتخاب‌شده توسط شما:
                </span>

                <div className="w-full flex items-center  justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="size-10  rounded-full bg-indigo-100 flex items-center justify-center text-2xs text-input-800">
                            {supervisor.initials}
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-s font-semibold text-neutral-900">
                                {supervisor.name}
                            </span>
                            <span className="text-3xs text-neutral-500">
                                {supervisor.info}
                            </span>
                        </div>
                    </div>

                    <span className="text-3xs h-5 px-2.5 rounded-full flex items-center justify-center bg-input-100 border border-indigo-200 text-input-800">
                        انتخاب شد
                    </span>
                </div>
            </div>

            <div className=' pb-3 pt-1'>
                <Button
                    type="button"
                    variant="solid"
                    color="input"
                    className="text-sm"
                    size="xs"
                    rounded="lg"
                    leftIcon={
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M21 3L3 10.5L10.5 13.5M21 3L13.5 21L10.5 13.5M21 3L10.5 13.5"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    }
                >
                    ارسال درخواست به سرپرست
                </Button>
            </div>

        </div>
    )
}

export default CurrentActionPart