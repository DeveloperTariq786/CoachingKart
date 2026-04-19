import { apiClient } from '@/core/api/axios/client';
import ENDPOINTS from '@/core/api/endpoint/endpoints';
import { FacultiesResponse, FacultiesQueryParams } from '../types/faculty.types';

export const facultyService = {
    getFaculties: async (params: FacultiesQueryParams): Promise<FacultiesResponse> => {
        const response = await apiClient.get<FacultiesResponse>(
            ENDPOINTS.INSTITUTION.FACULTIES,
            { params }
        );
        return response.data;
    },
};
