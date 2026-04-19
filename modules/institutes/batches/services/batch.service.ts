import { apiClient } from '@/core/api/axios/client';
import ENDPOINTS from '@/core/api/endpoint/endpoints';
import { BatchesResponse } from '../types/batch.types';

export const batchService = {
    getProgramBatches: async (programId: string, session?: string): Promise<BatchesResponse> => {
        const params: any = { programId };
        if (session && session !== 'all') {
            params.session = session;
        }

        const response = await apiClient.get<BatchesResponse>(
            ENDPOINTS.INSTITUTION.BATCHES,
            { params }
        );
        return response.data;
    }
};
