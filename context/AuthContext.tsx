import useLogin from "@/data/hooks/User/useLogin";
import useRegister from "@/data/hooks/User/useRegister";
import { AuthContextType, AuthState, ContextProviderProps, LoginRequest, RegisterRequest } from "@/data/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const AuthContext = createContext<AuthContextType>({
    authState: {
        isAuthenticated: false,
        isLoading: false,
        user: null
    },
    login: async () => { },
    register: async () => { },
    logout: async () => { }
})

// AuthProvider is passed to Root Layout to Wrap up the entire App inside it
export const AuthProvider: React.FunctionComponent<ContextProviderProps> = ({ children }) => {

    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        isLoading: false,
        user: null
    });

    const loginMutation = useLogin({
        cbSuccess: (response) => {
            Toast.show({
                type: 'success',
                text1: `Logged In, Welcome ${response.user.username}`
            })
        },
        cbError: (error) => {
            if (error.response) {
                const { status, data } = error.response;

                if (status === 401) {
                    Toast.show({
                        type: 'error',
                        text1: 'Invalid Email or Password'
                    })
                } else if (status >= 500) {
                    Toast.show({
                        type: 'error',
                        text1: 'Server Error',
                        text2: 'Please try again later'
                    });
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Login Failed',
                        text2: data.message || 'Something went wrong'
                    })
                }
            }

        }
    });
    const registerMutation = useRegister({
        cbSuccess: (response) => {
            Toast.show({
                type: 'success',
                text1: `Registration successful!, Welcome ${response.user.username}`,
                text2: ' Please remember your email and password for future logins.'
            })
        },
        cbError: (error) => {
            if (error.response) {

                const { status } = error.response;

                if (status === 401) {
                    Toast.show({
                        type: 'error',
                        text1: 'User with this email already exists'
                    })
                } else if (status >= 500) {
                    Toast.show({
                        type: 'error',
                        text1: 'Server busy, Please try again later'
                    })
                } else {
                    Toast.show({
                        type: 'error',
                        text1: `${error.message}`
                    })
                }

            }
        }
    });

    useEffect(() => {
        const loadAuthState = async () => {
            try {
                const userString = await AsyncStorage.getItem('user');
                const token = await AsyncStorage.getItem('authToken');

                if (userString && token) {
                    setAuthState({
                        isAuthenticated: true,
                        isLoading: false,
                        user: JSON.parse(userString),
                    });
                } else {
                    setAuthState({
                        isAuthenticated: false,
                        isLoading: false,
                        user: null,
                    });
                }
            } catch (error) {
                console.error("Error loading auth state", error);
                setAuthState({
                    isAuthenticated: false,
                    isLoading: false,
                    user: null,
                });
            }
        };

        loadAuthState();
    }, []);


    const login = async (data: LoginRequest) => {
        setAuthState(prev => ({ ...prev, isLoading: true }));
        try {
            await loginMutation.mutateAsync(data);
            const userString = await AsyncStorage.getItem('user')
            if (userString) {
                setAuthState({
                    isAuthenticated: true,
                    isLoading: false,
                    user: JSON.parse(userString)
                })
            }
        } catch (error) {
            setAuthState(prev => ({ ...prev, isLoading: false }));
            throw error
        }
    };

    const register = async (data: RegisterRequest) => {
        setAuthState(prev => ({ ...prev, isLoading: true }));
        try {
            await registerMutation.mutateAsync(data);
            const userString = await AsyncStorage.getItem('user')
            if (userString) {
                setAuthState({
                    isAuthenticated: true,
                    isLoading: false,
                    user: JSON.parse(userString)
                })
            }
        } catch (error) {
            setAuthState(prev => ({ ...prev, isLoading: false }))
            throw error
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('authToken');
        setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false
        })
    }


    const contextValue = {
        authState: authState,
        login: login,
        register: register,
        logout: logout
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

// alternative method of const authContext = useContext(AuthContext)
export function useAuth() {
    return useContext(AuthContext)
}