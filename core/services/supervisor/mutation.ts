import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SupervisorKeys } from "./key";
import {
  getSupervisorRealInfo,
  registerSupervisorReal,
  SupervisorRealPayload,
} from "./api";


/**
 * ثبت‌نام / ذخیره سرپرست حقیقی
 */
export const useRegisterSupervisorReal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SupervisorRealPayload) =>
      registerSupervisorReal(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SupervisorKeys.realInfo(),
      });
    },
  });
};