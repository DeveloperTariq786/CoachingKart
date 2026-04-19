import { useState, useEffect } from 'react';
import { resourceService } from '../services/resource.service';
import { Resource } from '../types/resource.types';
import { useResourceStore } from '../store/useResourceStore';

export const useLectureResources = (lectureId: string | undefined) => {
    const { resourcesCache, setResources } = useResourceStore();
    const cachedData = lectureId ? resourcesCache[lectureId] : null;
    const [isLoading, setIsLoading] = useState(!cachedData);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchResources = async () => {
            if (!lectureId || resourcesCache[lectureId]) return;

            try {
                setIsLoading(true);
                setError(null);
                const result = await resourceService.getLectureResources(lectureId);
                const sortedResult = result.sort((a, b) => a.order - b.order);
                setResources(lectureId, sortedResult);
            } catch (err: any) {
                console.error("Error fetching lecture resources:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResources();
    }, [lectureId, resourcesCache, setResources]);

    return {
        data: cachedData || [],
        isLoading: !cachedData && isLoading,
        error
    };
};
