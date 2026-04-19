import { apiClient } from '@/core/api/axios/client';
import ENDPOINTS from '@/core/api/endpoint/endpoints';
import { InstitutionHomeStatsResponse } from '../types/stats.types';

export const institutionHomeService = {
    getHomeStats: async (institutionId: string): Promise<InstitutionHomeStatsResponse> => {
        const response = await apiClient.get<InstitutionHomeStatsResponse>(
            ENDPOINTS.INSTITUTION.HOME_STATS,
            {
                params: { institutionId }
            }
        );
        return response.data;
    }
};
