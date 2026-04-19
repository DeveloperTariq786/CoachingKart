'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { galleryService } from '../services/gallery.service';
import { useGalleryStore } from '../store/useGalleryStore';

export const useGallery = (institutionId: string | undefined) => {
    const { setGallery } = useGalleryStore();

    const query = useQuery({
        queryKey: ['institution-gallery', institutionId],
        queryFn: () => {
            if (!institutionId) throw new Error('institutionId is required');
            return galleryService.getGallery(institutionId);
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: !!institutionId,
    });

    useEffect(() => {
        if (query.data?.data) {
            setGallery(query.data.data);
        }
    }, [query.data, setGallery]);

    return query;
};
