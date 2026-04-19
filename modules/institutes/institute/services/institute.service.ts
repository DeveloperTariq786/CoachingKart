import { apiClient } from '@/core/api/axios/client';
import ENDPOINTS from '@/core/api/endpoint/endpoints';
import { InstitutionDetailsResponse } from '../types/institute.types';

export const instituteService = {
    getInstituteDetails: async (slug: string): Promise<InstitutionDetailsResponse> => {
        const response = await apiClient.get<InstitutionDetailsResponse>(
            ENDPOINTS.INSTITUTION.DETAILS,
            {
                params: { slug }
            }
        );
        return response.data;
    }
};
