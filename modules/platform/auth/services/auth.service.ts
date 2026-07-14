import apiClient from '@/core/api/axios/client';
import ENDPOINTS from '@/core/api/endpoint/endpoints';
import { AuthApiResponse, RegisterRequest, RegisterResponse } from '../types/auth.types';

export const authService = {
    login: async (email: string, password: string): Promise<AuthApiResponse> => {
        const response = await apiClient.post<AuthApiResponse>(ENDPOINTS.AUTH.LOGIN, {
            email,
            password,
        });
        return response.data;
    },

    forceLogin: async (email: string, password: string): Promise<AuthApiResponse> => {
        const response = await apiClient.post<AuthApiResponse>(ENDPOINTS.AUTH.FORCE_LOGIN, {
            email,
            password,
        });
        return response.data;
    },

    register: async (data: RegisterRequest): Promise<RegisterResponse> => {
        const response = await apiClient.post<RegisterResponse>(ENDPOINTS.INSTITUTION.STUDENT_REGISTER, data);
        return response.data;
    },
};
