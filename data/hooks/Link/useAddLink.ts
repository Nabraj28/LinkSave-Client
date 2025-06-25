import { AddLinkRequest, AddLinkResponse, MutationHookProps } from "@/data/types";
import { postData } from "@/utils/apiUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const useAddLink = ({ cb, cbSuccess, cbError }: MutationHookProps<AddLinkResponse>) => {

    const queryClient = useQueryClient();

    return useMutation<AddLinkResponse, Error, AddLinkRequest>({
        mutationFn: ({ categoryId, payload }) => {
            const endpoint = `/categories/${categoryId}/links`;
            return postData(endpoint, payload)
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

export default useAddLink;