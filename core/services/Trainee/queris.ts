import { useQuery } from "@tanstack/react-query"
import { GetInfoTrainee } from "./api"
import { KeyGetInfoTrainee } from "./key"

export const useGetInfoTrainee = () => {
    return useQuery({
        queryKey: KeyGetInfoTrainee(),
        queryFn: () => GetInfoTrainee()
    })
}