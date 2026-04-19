import { useState, useEffect } from 'react';
import { resourceService } from '../services/resource.service';
import { Resource } from '../types/resource.types';
import { useResourceStore } from '../store/useResourceStore';

export const useBatchResources = (batchId: string | undefined, subjectId: string | null) => {
    const { batchResourcesCache, setBatchResources } = useResourceStore();
    const cacheKey = `${batchId}:${subjectId || 'all'}`;
    const cachedData = batchId ? batchResourcesCache[cacheKey] : null;
    const [isLoading, setIsLoading] = useState(!cachedData);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchResources = async () => {
            if (!batchId || !subjectId || batchResourcesCache[cacheKey]) return;

            try {
                setIsLoading(true);
                setError(null);
                const result = await resourceService.getBatchResources(batchId, subjectId);
                // Sort by order if needed, or by lecture order
                const sortedResult = result.sort((a, b) => {
                    if (a.lecture?.order !== b.lecture?.order) {
                        return (a.lecture?.order || 0) - (b.lecture?.order || 0);
                    }
                    return a.order - b.order;
                });
                setBatchResources(batchId, subjectId, sortedResult);
            } catch (err: any) {
                console.error("Error fetching batch resources:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResources();
    }, [batchId, subjectId, cacheKey, batchResourcesCache, setBatchResources]);

    return {
        data: cachedData || [],
        isLoading: !cachedData && isLoading,
        error
    };
};
