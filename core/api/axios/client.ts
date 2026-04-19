import useAuthStore from '@/core/store/auth.store';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// Create axios instance
export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
});

// Request interceptor - Attach JWT token to every request
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = useAuthStore.getState().token;

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle common errors
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Handle 401 Unauthorized - Token expired
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Clear auth state and redirect to login
            useAuthStore.getState().logout();


        }

        // Handle network errors
        if (!error.response) {
            console.error('Network error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default apiClient;
