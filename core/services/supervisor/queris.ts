import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SupervisorKeys } from "./key";
import {
  getSupervisorRealInfo,
  registerSupervisorReal,
  SupervisorRealPayload,
} from "./api";

/**
 * دریافت اطلاعات سرپرست حقیقی
 * روی mount صفحه Supervisor فراخوانی می‌شه.
 */
export const useGetSupervisorRealInfo = () => {
  return useQuery({
    queryKey: SupervisorKeys.realInfo(),
    queryFn: getSupervisorRealInfo,
    // اگه می‌خوای هر بار صفحه باز شه دوباره fetch بشه:
    // staleTime: 0,
    // refetchOnMount: "always",
  });
};