import { apiClient } from '@/core/api/axios/client';
import ENDPOINTS from '@/core/api/endpoint/endpoints';
import { Ad, AdsResponse } from '../types/ad.types';

export const adService = {
    getAds: async (): Promise<Ad[]> => {
        const response = await apiClient.get<AdsResponse>(
            ENDPOINTS.MEDIA.ADS
        );
        return response.data.data;
    },
};
