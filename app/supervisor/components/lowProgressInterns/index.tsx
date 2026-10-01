'use client'

type Intern = {
    id: number
    name: string
    course: string
    progress: number
}

const interns: Intern[] = [
    { id: 1, name: "زهرا حسینی", course: "مدیریت پیمان", progress: 60 },
    { id: 2, name: "محمد رضایی", course: "فولاد ساختمانی", progress: 45 },
    { id: 3, name: "فاطمه کریمی", course: "بتن مسلح پیشرفته", progress: 20 },
]

function getBadgeStyle(progress: number) {
    return progress >= 60
        ? "text-green-900 bg-green-100 border-green-300"
        : "text-amber-900 bg-amber-100 border-amber-300"
}

export default function LowProgressInterns() {
    return (
        <div dir="rtl" className="w-full px-4 mt-4">
            <div className="w-full bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col gap-4">
                {/* هدر */}
                <div className="flex items-center justify-between">
                    <p className="text-black font-bold text-sm">کارآموزان با روند پیشرفت کم</p>
                    <button type="button" className="text-black font-bold text-xs hover:underline">
                        همه کارآموزان
                    </button>
                </div>

                {/* لیست */}
                <div className="flex flex-col">
                    {interns.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex items-center justify-between gap-4 py-4 ${index !== interns.length - 1 ? "border-b border-neutral-200" : ""
                                }`}
                        >
                            {/* آواتار و اطلاعات (سمت راست) */}
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-11 h-11 shrink-0 rounded-full bg-[#DDE3F3] text-blue-900 text-sm flex justify-center items-center">
                                    {item.name.charAt(0)}
                                </div>
                                <div className="flex flex-col gap-0.5 min-w-0">
                                    <p className="text-black font-bold text-sm truncate">{item.name}</p>
                                    <p className="text-neutral-500 text-xs truncate">{item.course}</p>
                                </div>
                            </div>

                            {/* نوار پیشرفت و درصد (سمت چپ) */}
                            <div className="flex items-center gap-4 shrink-0 rout">
                                <div className="w-30 rotate-180 h-2 rounded-full bg-[#D3D9EC] overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-blue-800"
                                        style={{ width: `${item.progress}%` }}
                                    />
                                </div>
                                <span
                                    className={`${getBadgeStyle(item.progress)} text-xs px-2 py-1 rounded-xl border min-w-11 text-center`}
                                >
                                    {item.progress.toLocaleString("fa-IR")}٪
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}