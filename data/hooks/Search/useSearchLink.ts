import { Link } from "@/data/types";
import { getData } from "@/utils/apiUtils"
import { useQuery } from "@tanstack/react-query"

interface SearchLinkProps {
    userId?: string,
    searchQuery: string
}

interface SearchResponse {
    success: boolean,
    message: string,
    data: Link[]
}

const useSearchLink = ({ userId, searchQuery }: SearchLinkProps) => {

    const endpoint = `/links/search/${userId}?query=${searchQuery}`

    return useQuery<SearchResponse>({
        queryKey: ['search', userId, searchQuery],
        queryFn: () => getData(endpoint),
        enabled: !!searchQuery && searchQuery.length > 1,
        staleTime: 5 * 60 * 1000,
        retry: 2
    })
};

export default useSearchLink;