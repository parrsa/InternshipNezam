'use client'

import { Input } from "@/app/components/ui/input"
import SwitchButton from "@/app/components/ui/Button/switchButton"
import { useHeaderAction } from "@/core/provider/HeaderActionProvider/HeaderAction"
import { Form, Formik } from "formik"
import { useEffect } from "react"

const infoData = [
    {
        id: 1,
        title: "ظرفیت کل",
        number: 3
    },
    {
        id: 2,
        title: "تخصیص یافته",
        number: 9
    },
    {
        id: 3,
        title: "باقی‌مانده",
        number: 1
    },
    {
        id: 4,
        title: "نیمسال آینده",
        number: 1
    },
]

const autoAcceptData = [
    {
        id: "auto-accept-high-score",
        title: "پذیرش خودکار درخواست‌های دارای امتیاز بالا",
        description: "با فعال‌سازی، سامانه خودکار عمل می‌کند",
        defaultChecked: true
    },
    {
        id: "notify-intern-after-approval",
        title: "اعلان به کارآموز پس از تأیید",
        description: "با فعال‌سازی، سامانه خودکار عمل می‌کند",
        defaultChecked: true
    },
    {
        id: "warn-after-deadline",
        title: "اخطار پس از پایان مهلت درخواست",
        description: "با فعال‌سازی، سامانه خودکار عمل می‌کند",
        defaultChecked: false
    },
    {
        id: "share-capacity-with-organization",
        title: "اشتراک‌گذاری ظرفیت با سازمان",
        description: "با فعال‌سازی، سامانه خودکار عمل می‌کند",
        defaultChecked: true
    },
]

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
            <div className="w-full grid grid-cols-4 grid-rows-[150px] gap-4">
                {infoData.map((item: any) => (
                    <div key={item.id} className="w-full h-full bg-white rounded-2xl shadow-lg border border-neutral-300 flex justify-center items-start p-4 gap-2 flex-col ">
                        <p className="text-neutral-500 font-medium text-xs">{item.title}</p>
                        <p className="text-black font-bold text-xl">{item.number}</p>
                    </div>
                ))}
            </div>

            <div className="w-full p-8 bg-white border border-neutral-300 mt-4 rounded-xl shadow-lg flex justify-center items-center gap-8 flex-col">
                <div className="w-full text-right font-bold text-black text-sm">
                    <p>تنظیمات ظرفیت پذیرش</p>
                </div>
                <Formik
                    initialValues={{
                        currentSemester: "",
                        nextSemester: "",
                        maximumHours: "",
                        minimumHours: ""
                    }}
                    onSubmit={(value) => {
                        console.log(value)
                    }}>
                    {({ values, setFieldValue, errors }) => (
                        <Form className="w-full grid grid-cols-2 gap-8">
                            <div>
                                <Input
                                    variant="floating"
                                    label="ظرفیت نیمسال جاری"
                                    type="tel"
                                    inputMode="numeric"
                                    inputSize="sm"
                                    className="text-right" />
                            </div>
                            <div>
                                <Input
                                    variant="floating"
                                    label="ظرفیت نیمسال آینده"
                                    type="tel"
                                    inputMode="numeric"
                                    inputSize="sm"
                                    className="text-right" />
                            </div>
                            <div>
                                <Input
                                    variant="floating"
                                    label="حداکثر ساعت هفتگی"
                                    type="tel"
                                    inputMode="numeric"
                                    inputSize="sm"
                                    className="text-right" />
                            </div>
                            <div>
                                <Input
                                    variant="floating"
                                    label="حداقل ساعت لازم"
                                    type="tel"
                                    inputMode="numeric"
                                    inputSize="sm"
                                    className="text-right" />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            <div className="w-full p-8 bg-white border border-neutral-300 mt-4 rounded-xl shadow-xl flex flex-col gap-4">
                <div className="w-full text-right font-bold text-black text-sm">
                    <p>تنظیمات پذیرش خودکار</p>
                </div>
                <div className="w-full flex flex-col">
                    {autoAcceptData.map((item) => (
                        <div
                            key={item.id}
                            className="w-full flex items-center justify-between py-4 border-b border-neutral-200 last:border-b-0">
                            <div className="flex flex-col gap-1 text-right">
                                <p className="text-black font-bold text-sm">{item.title}</p>
                                <p className="text-neutral-500 font-medium text-xs">{item.description}</p>
                            </div>
                            <SwitchButton
                                id={item.id}
                                firstValueCheck={item.defaultChecked}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}