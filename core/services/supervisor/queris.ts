// import { useQuery } from "@tanstack/react-query";
// import { GetLegalInfo, GetRealInfo } from "./api";
// import { KeyGetLegalInfo, KeyGetRealInfo } from "./key";

// export const useGetRealInfo = () => {
//   return useQuery({
//     queryKey: KeyGetRealInfo(),
//     queryFn: () => GetRealInfo(),
//   });
// };

// export const useGetLegalInfo = () => {
//   return useQuery({
//     queryKey: KeyGetLegalInfo(),
//     queryFn: () => GetLegalInfo()
//   })
// }

// // import { useQuery } from "@tanstack/react-query";
// // import { GetRealInfo, GetLegalInfo } from "./api";
// // import { KeyGetRealInfo, KeyGetLegalInfo } from "./key";

// // export const useGetRealInfo = (options?: { enabled?: boolean }) =>
// //   useQuery({
// //     queryKey: KeyGetRealInfo(),
// //     queryFn: GetRealInfo,
// //     enabled: options?.enabled !== false,
// //     retry: false,
// //     staleTime: 0,
// //   });

// // export const useGetLegalInfo = (options?: { enabled?: boolean }) =>
// //   useQuery({
// //     queryKey: KeyGetLegalInfo(),
// //     queryFn: GetLegalInfo,
// //     enabled: options?.enabled !== false,
// //     retry: false,
// //     staleTime: 0,
// //   });
import { useQuery } from "@tanstack/react-query";
import { GetRealInfo, GetLegalInfo } from "./api";
import { KeyGetRealInfo, KeyGetLegalInfo } from "./key";

export const useGetRealInfo = (options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: KeyGetRealInfo(),
    queryFn: GetRealInfo,
    enabled: options?.enabled !== false,
    retry: false,
    staleTime: 0,
  });

export const useGetLegalInfo = (options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: KeyGetLegalInfo(),
    queryFn: GetLegalInfo,
    enabled: options?.enabled !== false,
    retry: false,
    staleTime: 0,
  });
import { GetAllTraineeForConfirm } from "./api";
import { KeyGetAllTraineeForConfirm } from "./key";

export const useGetAllTraineeForConfirm = (options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: KeyGetAllTraineeForConfirm(),
    queryFn: GetAllTraineeForConfirm,
    staleTime: 0,
  });