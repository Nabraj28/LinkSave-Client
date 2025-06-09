import { LinkSaveResponse, LoginRequest, MutationHookProps } from "@/types";
import { postData } from "@/utils/apiUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";

const useLogin = ({ cb, cbError, cbSuccess }: MutationHookProps<LinkSaveResponse>) => {
    const endpoint = '/login'
    return useMutation<LinkSaveResponse, Error, LoginRequest>({
        mutationFn: async (payload) => {
            const response = await postData<LoginRequest, LinkSaveResponse>(endpoint, payload);
            if (response.token) {
                await AsyncStorage.setItem('authToken', response.token);
                await AsyncStorage.setItem('user', JSON.stringify(response.user));
            }
            return response;
        },
        onMutate: cb,
        onError: cbError,
        onSuccess: cbSuccess
    });
};

export default useLogin;