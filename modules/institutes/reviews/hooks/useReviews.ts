'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { reviewsService } from '../services/reviews.service';
import { useReviewsStore } from '../store/useReviewsStore';

export const useReviews = (institutionId: string | undefined) => {
    const { setReviewsData } = useReviewsStore();

    const query = useQuery({
        queryKey: ['institution-reviews', institutionId],
        queryFn: () => {
            if (!institutionId) throw new Error('institutionId is required');
            return reviewsService.getReviews(institutionId);
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: !!institutionId,
    });

    useEffect(() => {
        if (query.data?.data) {
            setReviewsData(query.data.data);
        }
    }, [query.data, setReviewsData]);

    return query;
};
