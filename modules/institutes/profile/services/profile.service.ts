import apiClient from '@/core/api/axios/client';
import ENDPOINTS from '@/core/api/endpoint/endpoints';
import { StudentProfileResponse } from '../types/profile';

export const profileService = {
    getStudentProfile: async (): Promise<StudentProfileResponse> => {
        const response = await apiClient.get<StudentProfileResponse>(ENDPOINTS.INSTITUTION.STUDENT_PROFILE);
        return response.data;
    },

    logout: async (token: string | null, email?: string, password?: string): Promise<void> => {
        await apiClient.post(ENDPOINTS.AUTH.LOGOUT, {
            email,
            password
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
};
