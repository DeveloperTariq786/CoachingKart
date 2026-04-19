import { apiClient } from '@/core/api/axios/client';
import ENDPOINTS from '@/core/api/endpoint/endpoints';
import { InstitutionCoursesResponse } from '../types/course.types';

export const institutionCourseService = {
    getInstitutionCourses: async (institutionId: string, limit?: number): Promise<InstitutionCoursesResponse> => {
        const response = await apiClient.get<InstitutionCoursesResponse>(
            ENDPOINTS.INSTITUTION.COURSES,
            {
                params: { institutionId, limit }
            }
        );
        return response.data;
    },
};
