import { DeleteCategoryResponse, MutationHookProps } from "@/data/types"
import { deleteData } from "@/utils/apiUtils"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface Payload {
    categoryId?: string;
}

const useDeleteCategory = ({ cb, cbSuccess, cbError }: MutationHookProps<DeleteCategoryResponse>) => {
    const queryClient = useQueryClient();
    return useMutation<DeleteCategoryResponse, Error, Payload>({
        mutationFn: ({ categoryId }) => {
            const endpoint = `/categories/${categoryId}`
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

    });
};

export default useDeleteCategory;