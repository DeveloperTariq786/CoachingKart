import { apiClient } from '@/core/api/axios/client';
import ENDPOINTS from '@/core/api/endpoint/endpoints';
import { ApiResponse, CarouselSlide } from '../types/carousel.types';

export const carouselService = {
    getCarousel: async (): Promise<CarouselSlide[]> => {
        const response = await apiClient.get<ApiResponse<CarouselSlide[]>>(
            ENDPOINTS.MEDIA.CAROUSEL
        );
        return response.data.data;
    },
};
