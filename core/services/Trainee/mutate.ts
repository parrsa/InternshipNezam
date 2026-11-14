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