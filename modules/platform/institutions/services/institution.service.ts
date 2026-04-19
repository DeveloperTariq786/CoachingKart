import { apiClient } from '@/core/api/axios/client';
import ENDPOINTS from '@/core/api/endpoint/endpoints';
import { Institution, InstitutionsResponse, InstitutionsQueryParams, NearMeResponse, NearMeQueryParams } from '../types/institution.types';

export const institutionService = {
    getInstitutions: async (params?: InstitutionsQueryParams): Promise<InstitutionsResponse> => {
        const response = await apiClient.get<InstitutionsResponse>(
            ENDPOINTS.INSTITUTIONS,
            { params }
        );
        return response.data;
    },
    getNearMeInstitutions: async (params: NearMeQueryParams): Promise<NearMeResponse> => {
        const response = await apiClient.get<NearMeResponse>(
            ENDPOINTS.INSTITUTIONS_NEAR_ME,
            { params }
        );
        return response.data;
    },
};
