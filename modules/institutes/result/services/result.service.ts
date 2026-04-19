import { apiClient } from '@/core/api/axios/client';
import ENDPOINTS from '@/core/api/endpoint/endpoints';
import { ResultStatsResponse, ResultsQueryParams, ResultsResponse, TopPerformersResponse } from '../types/result.types';

export const resultService = {
    getTopPerformers: async (institutionId: string): Promise<TopPerformersResponse> => {
        const response = await apiClient.get<TopPerformersResponse>(
            ENDPOINTS.INSTITUTION.RESULTS_TOP_10,
            {
                params: { institutionId }
            }
        );
        return response.data;
    },

    getResults: async (params: ResultsQueryParams): Promise<ResultsResponse> => {
        const response = await apiClient.get<ResultsResponse>(
            ENDPOINTS.INSTITUTION.RESULTS,
            {
                params
            }
        );
        return response.data;
    },

    getResultsStats: async (institutionId: string): Promise<ResultStatsResponse> => {
        const response = await apiClient.get<ResultStatsResponse>(
            ENDPOINTS.INSTITUTION.RESULTS_STATS,
            {
                params: { institutionId }
            }
        );
        return response.data;
    },
};
