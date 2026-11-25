// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toastify } from "@/app/components/ui/Toasts";
// import { RealRegistration } from "./api";
// import { KeyGetRealInfo } from "./key";

// export const useRegisterSupervisorReal = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (data: Parameters<typeof RealRegistration>[0]) =>
//       RealRegistration(data),

//     onSuccess: (response: any) => {
//       if (response?.isSuccess !== false) {
//         toastify("success", response?.message || "ثبت‌نام سرپرست با موفقیت انجام شد");
//         queryClient.invalidateQueries({ queryKey: KeyGetRealInfo() });
//       } else {
//         toastify("error", response?.message || "خطا در ثبت‌نام سرپرست");
//       }
//     },

//     onError: (error: any) => {
//       const data = error?.response?.data;
//       const validation = data?.errors
//         ? Object.values(data.errors).flat().join(" | ")
//         : null;
//       toastify(
//         "error",
//         validation || data?.message || error?.message || "خطا در ارتباط با سرور"
//       );
//     },
//   });
// };

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastify } from "@/app/components/ui/Toasts";
import { LegalRegistration, RealRegistration } from "./api";
import { KeyGetLegalInfo, KeyGetRealInfo } from "./key";

const extractErrorMessage = (error: any) => {
  const data = error?.response?.data;
  const validation = data?.errors
    ? Object.values(data.errors).flat().join(" | ")
    : null;
  return (
    validation || data?.message || error?.message || "خطا در ارتباط با سرور"
  );
};

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
      toastify("error", extractErrorMessage(error));
    },
  });
};

export const useRegisterSupervisorLegal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof LegalRegistration>[0]) =>
      LegalRegistration(data),

    onSuccess: (response: any) => {
      if (response?.isSuccess !== false) {
        toastify(
          "success",
          response?.message || "ثبت‌نام سرپرست حقوقی با موفقیت انجام شد"
        );
        queryClient.invalidateQueries({ queryKey: KeyGetLegalInfo() });
      } else {
        toastify("error", response?.message || "خطا در ثبت‌نام سرپرست حقوقی");
      }
    },

    onError: (error: any) => {
      toastify("error", extractErrorMessage(error));
    },
  });
};

import { ConfirmTrainee } from "./api";
import { KeyGetAllTraineeForConfirm } from "./key";

export const useConfirmTrainee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof ConfirmTrainee>[0]) =>
      ConfirmTrainee(data),

    onSuccess: async (response: any, variables) => {
      if (response?.isSuccess !== false) {
        toastify(
          "success",
          response?.message ||
            (variables.isConfirm
              ? "درخواست با موفقیت تأیید و ارسال شد"
              : "درخواست رد شد")
        );

        // ✅ هم invalidate (برای مارک کردن stale) و هم refetch فوری
        await queryClient.invalidateQueries({
          queryKey: KeyGetAllTraineeForConfirm(),
        });
        await queryClient.refetchQueries({
          queryKey: KeyGetAllTraineeForConfirm(),
          type: "active",
        });
      } else {
        toastify("error", response?.message || "خطا در انجام عملیات");
      }
    },

    onError: (error: any) => {
      toastify("error", extractErrorMessage(error));
    },
  });
};