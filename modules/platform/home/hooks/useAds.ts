'use client';

import { useQuery } from '@tanstack/react-query';
import { adService } from '../services/ad.service';
import { useAdStore } from '../store/useAdStore';
import { useEffect } from 'react';

export const useAds = (enabled: boolean = true) => {
    const { setAds } = useAdStore();

    const query = useQuery({
        queryKey: ['platform-ads'],
        queryFn: adService.getAds,
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled,
    });

    useEffect(() => {
        if (query.data) {
            setAds(query.data);
        }
    }, [query.data, setAds]);

    return query;
};
