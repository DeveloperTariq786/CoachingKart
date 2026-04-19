import { apiClient } from '@/core/api/axios/client';
import ENDPOINTS from '@/core/api/endpoint/endpoints';
import { GalleryResponse } from '../types/gallery.types';

export const galleryService = {
    getGallery: async (institutionId: string): Promise<GalleryResponse> => {
        const response = await apiClient.get<GalleryResponse>(
            ENDPOINTS.INSTITUTION.GALLERY,
            { params: { institutionId } }
        );
        return response.data;
    },
};
