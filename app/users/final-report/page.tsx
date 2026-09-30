"use client";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Send } from "lucide-react";
import AllInformation from "./components/allInformation";
import ActivitySummary from "./components/activitySummary";
import AttachmentFile from "./components/attachmentFile";
import { Button } from "@/app/components/ui/Button";
import { cn } from "@/lib/cn";
;

interface ReportFormValues {
    title: string;
    supervisor: string;
    deliveryDate: string;
    summary: string;
    totalHours: string;
    technicalVisits: string;
    file: File | null;
}

const initialValues: ReportFormValues = {
    title: "",
    supervisor: "",
    deliveryDate: "",
    summary: "",
    totalHours: "805",
    technicalVisits: "5",
    file: null,
};

const numberField = (label: string, min: number) =>
    Yup.number()
        .transform((value, original) => (original === "" ? undefined : value))
        .typeError(`${label} باید عدد باشد`)
        .required(`${label} الزامی است`)
        .integer(`${label} باید عدد صحیح باشد`)

const validationSchema = Yup.object({
    title: Yup.string().min(3, "عنوان گزارش حداقل ۳ کاراکتر باشد").required("عنوان گزارش الزامی است"),
    supervisor: Yup.string().required("انتخاب سرپرست الزامی است"),
    deliveryDate: Yup.string().required("تاریخ تحویل الزامی است"),
    summary: Yup.string().min(10, "خلاصه فعالیت حداقل ۱۰ کاراکتر باشد").required("خلاصه فعالیت الزامی است"),
    totalHours: numberField("ساعت کل کارآموزی", 1),
    technicalVisits: numberField("تعداد بازدید فنی", 0),
    file: Yup.mixed<File>()
        .nullable()
        .required("فایل PDF گزارش الزامی است")
        .test("fileType", "فقط فایل PDF مجاز است", (f) => !f || f.type === "application/pdf")
});

function FinalReport() {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                console.log("final submit", values);
            }}
        >
            {() => (
                <Form noValidate className="flex w-full flex-col items-center justify-center gap-5 p-2 px-5">
                    <AllInformation />
                    <ActivitySummary />
                    <AttachmentFile />

                    <div className="flex w-full items-center justify-start gap-3">
                        <Button
                            variant="solid"
                            color="input"
                            rounded="lg"
                            type="submit"
                            leftIcon={<Send className="h-4 w-4" />}
                            textSize="xs"
                            className={cn(
                                "h-9  py-0"
                            )}
                        >
                            ثبت نهایی گزارش
                        </Button>

                        <Button
                            size="xs"
                            variant="solid"
                            type="button"
                            className={cn(" h-9 rounded-lg border border-gray-200 bg-amber-50/40  text-nowrap text-xs font-bold text-neutral-900 transition-colors active:text-neutral-950 active:bg-teal-50 hover:text-neutral-950 hover:bg-teal-50 ")}
                        >
                            ذخیره پیش‌نویس
                        </Button>
                  
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default FinalReport;