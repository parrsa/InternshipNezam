import { useQuery } from "@tanstack/react-query"
import { GetInfoTrainee } from "./api"
import { KeyGetInfoTrainee } from "./key"

export const useGetInfoTrainee = () => {
    return useQuery({
        queryKey: KeyGetInfoTrainee(),
        queryFn: () => GetInfoTrainee()
    })
}
import { GetSupervisorsForSelect } from "./api";
import { KeyGetSupervisorsForSelect } from "./key";

export const useGetSupervisorsForSelect = (params: {
    pageIndex: number;
    take: number;
    nationalCode: string;
    licenseNumber: string;
}) => {
    return useQuery({
        queryKey: KeyGetSupervisorsForSelect(params),
        queryFn: () => GetSupervisorsForSelect(params),
    });
};