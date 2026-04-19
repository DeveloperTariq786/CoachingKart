'use client';

import { useQuery } from '@tanstack/react-query';
import { carouselService } from '../services/carousel.service';
import { useCarouselStore } from '../store/useCarouselStore';
import { useEffect } from 'react';

export const useCarousel = () => {
    const { setSlides } = useCarouselStore();

    const query = useQuery({
        queryKey: ['carousel'],
        queryFn: carouselService.getCarousel,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    useEffect(() => {
        if (query.data) {
            setSlides(query.data);
        }
    }, [query.data, setSlides]);

    return query;
};
