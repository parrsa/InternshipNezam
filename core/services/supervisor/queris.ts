import { useQuery } from "@tanstack/react-query";
import { GetLegalInfo, GetRealInfo } from "./api";
import { KeyGetLegalInfo, KeyGetRealInfo } from "./key";

export const useGetRealInfo = () => {
  return useQuery({
    queryKey: KeyGetRealInfo(),
    queryFn: () => GetRealInfo(),
  });
};

export const useGetLegalInfo = () => {
  return useQuery({
    queryKey: KeyGetLegalInfo(),
    queryFn: () => GetLegalInfo()
  })
}