'use client'

import { Input } from "@/app/components/ui/input"
import { useHeaderAction } from "@/core/provider/HeaderActionProvider/HeaderAction"
import { Form, Formik } from "formik"
import { useEffect } from "react"

const infoData = [
    { id: 1, title: "ظرفیت کل", number: 3 },
    { id: 2, title: "تخصیص یافته", number: 9 },
    { id: 3, title: "باقی‌مانده", number: 1 },
    { id: 4, title: "نیمسال آینده", number: 1 },
]

interface SettingsFormValues {
    currentSemester: string
    assignedInterns: string
    maximumHours: string
    minimumHours: string
}

const initialValues: SettingsFormValues = {
    currentSemester: "5",
    assignedInterns: "61",
    maximumHours: "304",
    minimumHours: "603",
}

const labelClass = "block mb-2 text-s font-bold text-neutral-900"

export default function Settings() {
    const { setAction } = useHeaderAction()

    useEffect(() => {
        setAction(
            <div className="text-sm flex justify-start items-start flex-col gap-1">
                <p className="text-black font-bold ">گزارش‌های ماهانه</p>
                <p className="text-neutral-500 text-xs font-medium">بازبینی و تأیید گزارش‌ها</p>
            </div>
        )
        return () => {
            setAction(null)
        }
    }, [])

    return (
        <div className="p-4">
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 grid-rows-[150px] gap-4">
                {infoData.map((item) => (
                    <div key={item.id} className="w-full h-full bg-white rounded-2xl shadow-lg border border-neutral-300 flex justify-center items-start p-4 gap-2 flex-col ">
                        <p className="text-neutral-500 font-medium text-xs">{item.title}</p>
                        <p className="text-black font-bold text-xl">{item.number}</p>
                    </div>
                ))}
            </div>

            <div className="w-full p-8 bg-white border border-neutral-300 mt-4 rounded-3xl shadow-lg flex flex-col gap-8">
                <div className="w-full text-right font-bold text-black text-sm">
                    <p>تنظیمات ظرفیت پذیرش</p>
                </div>

                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                >
                    {({ values, handleChange }) => (
                        <Form dir="rtl" className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <label htmlFor="currentSemester" className={labelClass}>
                                    ظرفیت نیمسال جاری
                                </label>
                                <Input
                                    id="currentSemester"
                                    name="currentSemester"
                                    variant="default"
                                    color="input"
                                    type="tel"
                                    inputMode="numeric"
                                    inputSize="sm"
                                    value={values.currentSemester}
                                    disabled
                                    readOnly
                                    className="bg-neutral-100 text-neutral-500 cursor-not-allowed text-right"
                                />
                                <p className="mt-1.5 text-2xs text-neutral-500">
                                    تعیین‌شده توسط سازمان — برای اشخاص حقیقی ۵ و حقوقی ۲۰ نفر
                                </p>
                            </div>

                            <div>
                                <label htmlFor="assignedInterns" className={labelClass}>
                                    کارآموز تخصیص یافته
                                </label>
                                <Input
                                    id="assignedInterns"
                                    name="assignedInterns"
                                    variant="default"
                                    color="input"
                                    type="number"
                                    inputMode="numeric"
                                    inputSize="sm"
                                    value={values.assignedInterns}
                                    onChange={handleChange}
                                    className="text-right"
                                />
                            </div>

                            <div>
                                <label htmlFor="maximumHours" className={labelClass}>
                                    حداکثر ساعت هفتگی
                                </label>
                                <Input
                                    id="maximumHours"
                                    name="maximumHours"
                                    variant="default"
                                    color="input"
                                    type="number"
                                    inputMode="numeric"
                                    inputSize="sm"
                                    value={values.maximumHours}
                                    onChange={handleChange}
                                    className="text-right"
                                />
                            </div>

                            <div>
                                <label htmlFor="minimumHours" className={labelClass}>
                                    حداقل ساعت لازم
                                </label>
                                <Input
                                    id="minimumHours"
                                    name="minimumHours"
                                    variant="default"
                                    color="input"
                                    type="number"
                                    inputMode="numeric"
                                    inputSize="sm"
                                    value={values.minimumHours}
                                    onChange={handleChange}
                                    className="text-right"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}