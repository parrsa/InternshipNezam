import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KeyGetInfoTrainee } from "./key";
import { RegistrationTrainee } from "./api";
import { toastify } from "@/app/components/ui/Toasts";

export const useRegistrationTrainee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => RegistrationTrainee(data),

        onSuccess: (response: any) => {
            // ⚠️ بک‌اند حتی در خطای منطقی هم HTTP 200 با isSuccess: false برمی‌گردونه
            if (response?.isSuccess) {
                toastify("success", response.message || "ثبت‌نام با موفقیت انجام شد");

                // اطلاعات کارآموز رو رفرش کن
                queryClient.invalidateQueries({ queryKey: [KeyGetInfoTrainee] });
            } else {
                toastify("error", response?.message || "خطا در ثبت‌نام");
            }
        },

        onError: (error: any) => {
            const msg =
                error?.response?.data?.message ||
                error?.message ||
                "خطا در ارتباط با سرور";
            toastify("error", msg);
        },
    });
};

import { PaymentTrainee } from "./api";


export const usePaymentTrainee = () => {
    return useMutation({
        mutationFn: ({
            traineeId,
            competences,
        }: {
            traineeId: number;
            competences: number[];
        }) => PaymentTrainee(traineeId, competences),

        onSuccess: (response: any) => {
            if (response?.isSuccess && response?.data?.accessToken) {
                toastify(
                    "success",
                    response.message || "در حال انتقال به درگاه پرداخت...",
                );

                const { accessToken, terminalId } = response.data;
                console.log(response)
                // ساخت فرم و submit خودکار به شاپرک
                const form = document.createElement("form");
                form.method = "POST";
                form.action = "https://sepehr.shaparak.ir:8080/Pay";
                form.style.display = "none";

                const fields: Record<string, string> = {
                    TerminalID: String(terminalId),
                    token: accessToken,
                    getMethod: "1",
                };

                Object.entries(fields).forEach(([name, value]) => {
                    const input = document.createElement("input");
                    input.type = "hidden";
                    input.name = name;
                    input.value = value;
                    form.appendChild(input);
                });

                document.body.appendChild(form);
                form.submit();
                document.body.removeChild(form);
            } else {
                toastify("error", response?.message || "خطا در دریافت توکن پرداخت");
            }
        },

        onError: (error: any) => {
            const msg =
                error?.response?.data?.message ||
                error?.message ||
                "خطا در ارتباط با درگاه پرداخت";
            toastify("error", msg);
        },
    });
};
import { VerifyPaymentTrainee } from "./api";

export const useVerifyPaymentTrainee = () => {
    return useMutation({
        mutationFn: (data: Parameters<typeof VerifyPaymentTrainee>[0]) =>
            VerifyPaymentTrainee(data),

        onSuccess: (response: any) => {
            if (response?.isSuccess) {
                toastify("success", response.message || "پرداخت با موفقیت تأیید شد");
            } else {
                toastify("error", response?.message || "خطا در تأیید پرداخت");
            }
        },

        onError: (error: any) => {
            const msg =
                error?.response?.data?.message ||
                error?.message ||
                "خطا در ارتباط با سرور";
            toastify("error", msg);
        },
    });
};