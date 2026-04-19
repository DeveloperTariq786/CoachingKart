import { apiClient } from '@/core/api/axios/client';
import ENDPOINTS from '@/core/api/endpoint/endpoints';
import { InstitutionCentersResponse } from '../types/center.types';

export const institutionCenterService = {
    getInstitutionCenters: async (institutionId: string): Promise<InstitutionCentersResponse> => {
        const response = await apiClient.get<InstitutionCentersResponse>(
            ENDPOINTS.INSTITUTION.CENTERS,
            {
                params: { institutionId }
            }
        );
        return response.data;
    },
};
