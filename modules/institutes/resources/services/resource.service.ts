import apiClient from '@/core/api/axios/client';
import ENDPOINTS from '@/core/api/endpoint/endpoints';
import { ResourcesResponse, Resource } from '../types/resource.types';

export const resourceService = {
    getLectureResources: async (lectureId: string): Promise<Resource[]> => {
        const response = await apiClient.get<ResourcesResponse>(ENDPOINTS.INSTITUTION.RESOURCES, {
            params: {
                lectureId
            }
        });
        return response.data.data;
    },

    getBatchResources: async (batchId: string, subjectId: string | null): Promise<Resource[]> => {
        const response = await apiClient.get<ResourcesResponse>(ENDPOINTS.INSTITUTION.BATCH_RESOURCES, {
            params: {
                batchId,
                subjectId
            }
        });
        return response.data.data;
    }
};
