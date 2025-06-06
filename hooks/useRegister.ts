import { AuthResponse, MutationHookProps, RegisterRequest } from "@/types"
import { postData } from "@/utils/apiUtils"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useMutation } from "@tanstack/react-query"

const useRegister = ({ cb, cbSuccess, cbError }: MutationHookProps<AuthResponse>) => {
    const endpoint = `/register`
    return useMutation<AuthResponse, Error, RegisterRequest>({
        mutationFn: async (payload) => {
            const response = await postData<RegisterRequest, AuthResponse>(endpoint, payload);

            if (response.token) {
                await AsyncStorage.setItem('authToken', response.token);
                await AsyncStorage.setItem('user', JSON.stringify(response.user._id));
            }

            return response
        },
        onMutate: cb,
        onSuccess: cbSuccess,
        onError: cbError
    })
}

export default useRegister