import { LinkSaveResponse } from "@/data/types"
import { getData } from "@/utils/apiUtils"
import { useQuery } from "@tanstack/react-query"

const useGetUserData = (userId?: string) => {
    const endpoint = `/users/${userId}`
    return useQuery<LinkSaveResponse>({
        queryKey: ['user'],
        queryFn: () => getData(endpoint)
    })
}

export default useGetUserData