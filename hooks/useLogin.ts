import { AuthResponse, LoginRequest, MutationHookProps } from "@/types";
import { postData } from "@/utils/apiUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";

const useLogin = ({ cb, cbError, cbSuccess }: MutationHookProps<AuthResponse>) => {
    const endpoint = '/login'
    return useMutation<AuthResponse, Error, LoginRequest>({
        mutationFn: async (payload) => {
            const response = await postData<LoginRequest, AuthResponse>(endpoint, payload);
            if (response.token) {
                await AsyncStorage.setItem('authToken', response.token);
                await AsyncStorage.setItem('user', JSON.stringify(response.user._id));
            }
            return response;
        },
        onMutate: cb,
        onError: cbError,
        onSuccess: cbSuccess
    });
};

export default useLogin;