"use client";
import { useField } from "formik";
import { Input } from "@/app/components/ui/input/Input";
import { Select } from "@/app/components/ui/input/SelectSilde";
import { getToday } from "@/lib/date-utils";
import JalaliDatePicker from "@/lib/jalaliDatePicker";


const supervisorOptions = [
    { label: "مهندس رضایی", value: "rezaei" },
    { label: "مهندس کریمی", value: "karimi" },
];


function AllInformation() {
    const [title, titleMeta] = useField("title");
    const [date, dateMeta, dateHelpers] = useField<string>("deliveryDate");
    const [sup, supMeta, supHelpers] = useField<string>("supervisor");

    const today = getToday();
    return (
        <div className="w-full rounded-2xl border border-neutral-200 bg-white px-7 py-7 shadow-sm">
            <h2 className="mb-8 text-s font-semibold text-neutral-900">اطلاعات کلی گزارش</h2>

            <div className="flex flex-col gap-5 md:items-center md:flex-row md:justify-between">
                <div className=" sm:flex-row flex-col flex items-center gap-2 justify-center w-full sm:w-1/2">
                    <div className="w-full">
                        <Input
                            variant="default"
                            inputSize="sm"
                            id="title"
                            name="title"
                            field={title}
                            rounded="lg"
                            className=" placeholder:text-neutral-600 placeholder:text-xs "
                            label="عنوان گزارش"
                            labelClassName="text-2xs mb-2  font-semibold text-gray-900"
                            placeholder="مثلاً: گزارش پایان کارآموزی — پروژه پارسیان"
                            error={titleMeta.touched && !!titleMeta.error}
                            errorMessage={titleMeta.error}
                        />
                    </div>

                    <div className="flex flex-col w-full sm:w-2/3">
                        <span className="text-2xs font-semibold mb-2   text-gray-900">سرپرست</span>
                        <Select
                            placeholder="انتخاب سرپرست"
                            className=" w-2/3  text-nowrap rounded-xl text-xs"
                            options={supervisorOptions}
                            value={sup.value}
                            onChange={(v: string) => {
                                supHelpers.setValue(v);
                                supHelpers.setTouched(true, false);
                            }}
                        />
                        {supMeta.touched && supMeta.error && (
                            <p className="mt-2 text-3xs text-red-600">{supMeta.error}</p>
                        )}
                    </div>
                </div>

                <div className="w-full md:w-[32%]">
                    <JalaliDatePicker
                        id="deliveryDate"
                        name="deliveryDate"
                        className=" placeholder:text-neutral-600  mt-2  placeholder:text-xs "
                        variant="default"
                        inputSize="sm"
                        rounded="lg"
                        label="تاریخ تحویل"
                        labelClassName="text-2xs font-semibold text-gray-900"
                        placeholder="۱۴۰۵/۰۱/۰۱"
                        value={date.value}
                        minDate={today}
                        error={dateMeta.touched && !!dateMeta.error}
                        errorMessage={dateMeta.touched ? dateMeta.error : undefined}
                        onChange={(iso) => {
                            dateHelpers.setTouched(true, false);
                            dateHelpers.setValue(iso, true);
                        }}
                        onBlur={() => dateHelpers.setTouched(true, false)}
                    />
                </div>
            </div>
        </div>
    );
}

export default AllInformation;