import { MutationHookProps, UpdateLinkRequest, UpdateLinkResponse } from "@/data/types";
import { putData } from "@/utils/apiUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateLink = ({ cb, cbSuccess, cbError }: MutationHookProps<UpdateLinkResponse>) => {

    const queryClient = useQueryClient();

    return useMutation<UpdateLinkResponse, Error, UpdateLinkRequest>({
        mutationFn: ({ linkId, payload }) => {
            const endpoint = `/links/${linkId}`
            return putData(endpoint, payload)
        },
        onMutate: cb,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['user']
            });
            cbSuccess?.(data)
        },
        onError: cbError
    })
};

export default useUpdateLink;