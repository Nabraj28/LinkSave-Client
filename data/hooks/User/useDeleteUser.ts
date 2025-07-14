import { DeleteUserPayload, DeleteUserResponse, MutationHookProps } from "@/data/types";
import { deleteData } from "@/utils/apiUtils"
import { useMutation } from "@tanstack/react-query"


const useDeleteUser = ({ cb, cbSuccess, cbError }: MutationHookProps<DeleteUserResponse>) => {
    return useMutation<DeleteUserResponse, Error, string | undefined>({
        mutationFn: (userId) => {
            const endpoint = `/users/${userId}`
            return deleteData(endpoint)
        },
        onMutate: cb,
        onSuccess: cbSuccess,
        onError: cbError
    })
};

export default useDeleteUser