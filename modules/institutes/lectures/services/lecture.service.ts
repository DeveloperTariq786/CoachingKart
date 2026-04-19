import apiClient from '@/core/api/axios/client';
import ENDPOINTS from '@/core/api/endpoint/endpoints';
import { LecturesResponse, LectureDetailResponse, BatchSubjectsResponse } from '../types/lecture.types';

export const lectureService = {
    getBatchSubjects: async (batchId: string): Promise<BatchSubjectsResponse['data']> => {
        const response = await apiClient.get<BatchSubjectsResponse>(ENDPOINTS.INSTITUTION.BATCH_SUBJECTS, {
            params: {
                batchId
            }
        });
        return response.data.data;
    },

    getLectures: async (batchId: string, page: number = 1, limit: number = 10, subjectId?: string, search?: string): Promise<LecturesResponse['data']> => {
        const response = await apiClient.get<LecturesResponse>(ENDPOINTS.INSTITUTION.LECTURES, {
            params: {
                batchId,
                page,
                limit,
                subjectId,
                search: search || undefined
            }
        });
        return response.data.data;
    },

    getLectureDetail: async (lectureId?: string, order?: number, batchId?: string): Promise<LectureDetailResponse['data']> => {
        const response = await apiClient.get<LectureDetailResponse>(ENDPOINTS.INSTITUTION.LECTURE_DETAIL, {
            params: {
                lectureId,
                order,
                batchId
            }
        });
        return response.data.data;
    }
};
