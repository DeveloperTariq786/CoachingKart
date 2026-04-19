import { apiClient } from '@/core/api/axios/client';
import { ENDPOINTS } from '@/core/api/endpoint/endpoints';
import { OffersResponse } from '../types/offer.types';

export const offerService = {
    getOffers: async () => {
        const response = await apiClient.get<OffersResponse>(ENDPOINTS.MEDIA.OFFERS);
        return response.data;
    }
};
