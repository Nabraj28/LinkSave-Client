import { useAuth } from "@/context/AuthContext";
import { AddCategoryPayload, AddCategoryResponse, MutationHookProps } from "@/data/types";
import { postData } from "@/utils/apiUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddCategory = ({ cb, cbSuccess, cbError }: MutationHookProps<AddCategoryResponse>) => {

    const queryClient = useQueryClient();

    const { authState } = useAuth();
    const userId = authState.user?._id;
    const endpoint = `/users/${userId}/categories`;

    return useMutation<AddCategoryResponse, Error, AddCategoryPayload>({
        mutationFn: (payload: AddCategoryPayload) => postData(endpoint, payload),
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

export default useAddCategory;