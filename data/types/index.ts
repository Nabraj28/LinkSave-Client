import React from "react";


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

export interface LinkSaveResponse {
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
    categories: CategoryResponse[]
}

export interface CategoryProps {
    isLoading: boolean;
    data?: LinkSaveResponse;
    selectedCategory?: CategoryResponse | null
    onSelect?: (item: CategoryResponse) => void
}
export interface CategoryResponse {
    _id?: string,
    name: string,
    links: Link[],
    _v?: number
}


export interface Link {
    _id: string,
    title: string,
    url: string,
    __v: number
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
    buttonBackground: string;
    text: string;
    input?: string;
    placeholder: string;
    card: string;
    danger: string
    subheader?: string;
    activeIcon: string;
    inactiveIcon: string;
    primary: string;
    secondary: string;
    border: string;
}

export interface Theme {
    name: ThemeName;
    colors: ThemeColors;
}

export interface UpsertModalProps {
    title: string;
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode
}

export interface DeleteLinkResponse {
    success: boolean,
    message: string,
    deletedLink: Link
}

export interface DeleteCategoryResponse {
    success: boolean,
    message: string,
    deletedCategory: CategoryResponse
}

export interface AddCategoryResponse {
    success: boolean,
    message: string,
    category: CategoryResponse
}

export interface DeleteModalProps {
    item: string,
    isVisible: boolean,
    onModalClose: () => void,
    onDelete: () => void;
    pending: boolean
}

interface UpdateCategoryRequest {
    name: string,
}

interface AddCategoryRequest {
    name: string
}

export interface AddCategoryPayload {
    payload: AddCategoryPayload
}
export interface UpdateCategoryPayload {
    categoryId?: string,
    payload: UpdateCategoryRequest
}

export interface UpdateCategoryResponse {
    success: boolean,
    message: string,
    category: CategoryResponse
}