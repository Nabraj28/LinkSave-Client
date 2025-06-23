import { MutationHookProps, UpdateCategoryPayload, UpdateCategoryResponse } from "@/data/types";
import { putData } from "@/utils/apiUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const useUpdateCategory = ({ cb, cbSuccess, cbError }: MutationHookProps<UpdateCategoryResponse>) => {

    const queryClient = useQueryClient();

    return useMutation<UpdateCategoryResponse, Error, UpdateCategoryPayload>({
        mutationFn: ({ categoryId, payload }) => {
            const endpoint = `/categories/${categoryId}`;
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

export default useUpdateCategory;