import { DeleteLinkResponse, MutationHookProps } from "@/data/types"
import { deleteData } from "@/utils/apiUtils"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface Payload {
    linkId: string
}

const useDeleteLink = ({ cb, cbSuccess, cbError }: MutationHookProps<DeleteLinkResponse>) => {
    const queryClient = useQueryClient();
    return useMutation<DeleteLinkResponse, Error, Payload>({
        mutationFn: ({ linkId }) => {
            const endpoint = `/links/${linkId}`
            return deleteData(endpoint)
        },
        onMutate: cb,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['user']
            });
            cbSuccess?.(data);
        },
        onError: cbError,

    })
}

export default useDeleteLink