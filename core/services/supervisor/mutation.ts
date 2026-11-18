import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastify } from "@/app/components/ui/Toasts";
import { RealRegistration } from "./api";
import { KeyGetRealInfo } from "./key";

export const useRegisterSupervisorReal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof RealRegistration>[0]) =>
      RealRegistration(data),

    onSuccess: (response: any) => {
      if (response?.isSuccess !== false) {
        toastify("success", response?.message || "ثبت‌نام سرپرست با موفقیت انجام شد");
        queryClient.invalidateQueries({ queryKey: KeyGetRealInfo() });
      } else {
        toastify("error", response?.message || "خطا در ثبت‌نام سرپرست");
      }
    },

    onError: (error: any) => {
      const data = error?.response?.data;
      const validation = data?.errors
        ? Object.values(data.errors).flat().join(" | ")
        : null;
      toastify(
        "error",
        validation || data?.message || error?.message || "خطا در ارتباط با سرور"
      );
    },
  });
};