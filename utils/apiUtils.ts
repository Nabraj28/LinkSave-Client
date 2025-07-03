import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://linksave-server.vercel.app/api/v1'
});

axiosInstance.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


const getData = async <T>(endpoint: string): Promise<T> => {
    const response = await axiosInstance.get<T>(endpoint);
    return response.data
}

const postData = async<T, R>(endpoint: string, data: T): Promise<R> => {
    const response = await axiosInstance.post<R>(endpoint, data);
    return response.data
}

const putData = async<T, R>(endpoint: string, data: T): Promise<R> => {
    const response = await axiosInstance.put<R>(endpoint, data);
    return response.data
}

const deleteData = async <T>(endpoint: string): Promise<T> => {
    const response = await axiosInstance.delete<T>(endpoint);
    return response.data;
}

export { deleteData, getData, postData, putData };

