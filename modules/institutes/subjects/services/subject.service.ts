import { apiClient } from '@/core/api/axios/client';
import ENDPOINTS from '@/core/api/endpoint/endpoints';
import { SubjectsResponse } from '../types/subject.types';

export const subjectService = {
    getSubjects: async (institutionId: string): Promise<SubjectsResponse> => {
        const response = await apiClient.get<SubjectsResponse>(
            ENDPOINTS.INSTITUTION.SUBJECTS,
            {
                params: { institutionId },
            }
        );
        return response.data;
    },
};
