import { useAuth } from "@/context/AuthContext";
import { LinkSaveResponse } from "@/data/types"
import { getData } from "@/utils/apiUtils"
import { useQuery } from "@tanstack/react-query"

const useGetUserData = () => {

    const { authState } = useAuth();
    const userId = authState.user?._id;

    const endpoint = `/users/${userId}`
    return useQuery<LinkSaveResponse>({
        queryKey: ['user'],
        queryFn: () => getData(endpoint)
    })
}

export default useGetUserData