import { apiClient } from '@/core/api/axios/client';
import ENDPOINTS from '@/core/api/endpoint/endpoints';
import { Course, CoursesResponse } from '../types/course.types';

export const courseService = {
    getCourses: async (): Promise<Course[]> => {
        const response = await apiClient.get<CoursesResponse>(
            ENDPOINTS.COURSES
        );
        return response.data.data;
    },
};
