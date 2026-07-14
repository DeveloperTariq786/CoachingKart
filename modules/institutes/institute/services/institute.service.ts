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

        // Transform response for backward compatibility
        if (response.data?.success && response.data?.data) {
            const rawData = response.data.data;
            response.data.data = {
                ...rawData,
                // Ensure id is a string for other modules (like courses) that expect string IDs
                id: String(rawData.id),
                // Map institutionTheme to theme for existing components
                theme: rawData.institutionTheme,
                // Map location string to expected object structure
                location: typeof rawData.location === 'string' ? {
                    address: rawData.location,
                    city: '',
                    country: ''
                } : rawData.location
            };
        }

        return response.data;
    }
};
