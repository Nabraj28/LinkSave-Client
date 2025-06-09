import { LinkSaveResponse, MutationHookProps, RegisterRequest } from "@/types"
import { postData } from "@/utils/apiUtils"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useMutation } from "@tanstack/react-query"

const useRegister = ({ cb, cbSuccess, cbError }: MutationHookProps<LinkSaveResponse>) => {
    const endpoint = `/register`
    return useMutation<LinkSaveResponse, Error, RegisterRequest>({
        mutationFn: async (payload) => {
            const response = await postData<RegisterRequest, LinkSaveResponse>(endpoint, payload);

            if (response.token) {
                await AsyncStorage.setItem('authToken', response.token);
                await AsyncStorage.setItem('user', JSON.stringify(response.user));
            }

            return response
        },
        onMutate: cb,
        onSuccess: cbSuccess,
        onError: cbError
    })
}

export default useRegister