import { apiClient } from '@/core/api/axios/client';
import ENDPOINTS from '@/core/api/endpoint/endpoints';
import { InstitutionAboutResponse } from '../types/about.types';

export const aboutService = {
    getInstitutionAbout: async (institutionId: string): Promise<InstitutionAboutResponse> => {
        const response = await apiClient.get<InstitutionAboutResponse>(
            ENDPOINTS.INSTITUTION.ABOUT,
            {
                params: { institutionId }
            }
        );
        return response.data;
    }
};
