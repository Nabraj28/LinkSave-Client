import useLogin from "@/hooks/useLogin";
import useRegister from "@/hooks/useRegister";
import { AuthContextType, AuthState, LoginRequest, RegisterRequest } from "@/types";
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
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

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
        cbError: () => {
            Toast.show({
                type: 'error',
                text1: 'Login Failed'
            })
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
        cbError: () => {
            Toast.show({
                type: 'error',
                text1: 'Registration Failed'
            })
        }
    });

    const loadAuthState = async () => {
        try {
            const userId = await AsyncStorage.getItem('user');
            const token = await AsyncStorage.getItem('authToken');

            if (token && userId) {
                setAuthState({
                    user: JSON.parse(userId),
                    isAuthenticated: true,
                    isLoading: false,
                });
            } else {
                setAuthState(prev => ({ ...prev, isLoading: false }));
            }
        } catch (error) {
            setAuthState(prev => ({ ...prev, isLoading: false }));
        }
    }

    useEffect(() => {
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