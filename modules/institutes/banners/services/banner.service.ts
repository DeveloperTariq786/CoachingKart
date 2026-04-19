import { apiClient } from '@/core/api/axios/client';
import ENDPOINTS from '@/core/api/endpoint/endpoints';
import { BannerResponse } from '../types/banner.types';

export const bannerService = {
    getBanners: async (institutionId: string): Promise<BannerResponse> => {
        const response = await apiClient.get<BannerResponse>(
            ENDPOINTS.INSTITUTION.BANNERS,
            {
                params: { institutionId }
            }
        );
        return response.data;
    },
};
