import apiClient from '@/core/api/axios/client';
import ENDPOINTS from '@/core/api/endpoint/endpoints';
import { StudentProfileResponse } from '../types/profile';

export const profileService = {
    getStudentProfile: async (): Promise<StudentProfileResponse> => {
        const response = await apiClient.get<StudentProfileResponse>(ENDPOINTS.INSTITUTION.STUDENT_PROFILE);
        return response.data;
    },
};
