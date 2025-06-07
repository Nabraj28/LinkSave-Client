
export interface MutationHookProps<T> {
    cb?: () => void;
    cbSuccess?: (data: T) => void;
    cbError?: (error: Error) => void;
}

export type AuthState = {
    user: MinimalUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
};

export type AuthContextType = {
    authState: AuthState;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
};

export interface LoginRequest {
    email: string,
    password: string
}

export interface RegisterRequest {
    username: string,
    email: string,
    password: string
}

export interface AuthResponse {
    success: boolean,
    message: string,
    user: User,
    token: string,
}

export interface MinimalUser {
    _id: string,
    username: string,
    email: string
}

export interface User {
    _id: string
    username: string
    email: string,
    categories: Category[]
}

export interface Category {
    _id: string,
    name: string,
    links: Link[]
}

export interface Link {
    _id: string,
    title: string,
    url: string
}

export interface IconProps {
    size: number;
    color: string;
    focused: boolean;
    indicatorColor?: string;
}

// types/theme.ts
export type ThemeName = 'light' | 'dark';

export interface ThemeColors {
    background: string;
    tabbackground: string;
    text: string;
    subheader?: string;
    activeIcon: string;
    inactiveIcon: string;
    primary: string;
    secondary: string;
    border: string;
    input?: string;
    card: string;
}

export interface Theme {
    name: ThemeName;
    colors: ThemeColors;
}