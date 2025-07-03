import React from "react";
import { BaseToastProps } from 'react-native-toast-message';

export type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
};

export type AuthContextType = {
    authState: AuthState;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
};

export interface ContextProviderProps {
    children: React.ReactNode
}

export type ThemeName = 'light' | 'dark';

export interface ThemeColors {
    primary: string;
    text: string;
    background: string;
    tabbackground: string;
    buttonBackground: string;
    input?: string;
    placeholder: string;
    card: string;
    danger: string;
    themeIcon: string;
    border: string;
    subheader: string;
}

export interface Theme {
    name: ThemeName;
    colors: ThemeColors;
}

export interface ApiError extends Error {
    response?: {
        status: number;
        data: {
            message?: string;
            error?: string;
        };
    };
}

export interface MutationHookProps<T> {
    cb?: () => void;
    cbSuccess?: (data: T) => void;
    cbError?: (error: ApiError) => void;
}

export interface LoginRequest {
    email: string,
    password: string
}

export interface RegisterRequest {
    username: string,
    email: string,
    password: string
}

export interface User {
    _id: string
    username: string
    email: string,
    categories: CategoryResponse[]
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

export interface LinkSaveResponse {
    success: boolean,
    message: string,
    user: User,
    token: string,
}

export interface IconProps {
    size: number;
    color: string;
    focused: boolean;
    indicatorColor?: string;
}

export interface LinkCardProps {
    item: Link | number;
    getCategoryName: (item: Link) => React.ReactNode;
}

export interface SkeletonProps {
    width: number,
    height: number
}

export interface CustomToastProps extends BaseToastProps {
    text1?: string;
    text2?: string;
}

export interface UpsertModalProps {
    title: string;
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode
}

export interface AddCategoryRequest {
    name: string
}

export interface AddCategoryResponse {
    success: boolean,
    message: string,
    category: CategoryResponse
}

interface UpdateCategoryRequest {
    name: string,
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

export interface DeleteModalProps {
    text: string,
    isVisible: boolean,
    onModalClose: () => void,
    onDelete: () => void;
    pending: boolean
}

export interface DeleteCategoryResponse {
    success: boolean,
    message: string,
    deletedCategory: CategoryResponse
}

interface LinkPayload {
    title: string,
    url: string
}

export interface AddLinkRequest {
    categoryId?: string;
    payload: LinkPayload
}
export interface AddLinkResponse {
    success: boolean;
    message: string;
    link: Link
}

export interface UpdateLinkRequest {
    linkId?: string;
    payload: LinkPayload
}

export interface UpdateLinkResponse {
    success: boolean;
    message: string;
    link: Link
}
export interface DeleteLinkResponse {
    success: boolean,
    message: string,
    deletedLink: Link
}