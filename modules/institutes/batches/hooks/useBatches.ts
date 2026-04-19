import { useState, useEffect } from 'react';
import { batchService } from '../services/batch.service';
import { useBatchStore } from '../store/useBatchStore';
import { Batch } from '../types/batch.types';

export const useBatches = (programId?: string, session: string = 'all') => {
    const { batchesCache, setBatches: setBatchesInStore } = useBatchStore();
    const cacheKey = programId ? `${programId}:${session}` : null;
    const cachedData = cacheKey ? batchesCache[cacheKey] : null;
    const [isLoading, setIsLoading] = useState(!cachedData);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBatches = async () => {
            if (!programId || !cacheKey || batchesCache[cacheKey]) return;

            try {
                setIsLoading(true);
                const response = await batchService.getProgramBatches(programId, session);
                if (response.success) {
                    setBatchesInStore(programId, session, response.data);
                }
            } catch (err) {
                console.error("Error fetching batches:", err);
                setError("Failed to fetch batches");
            } finally {
                setIsLoading(false);
            }
        };

        fetchBatches();
    }, [programId, session, cacheKey, batchesCache, setBatchesInStore]);

    const data = cacheKey ? batchesCache[cacheKey] || [] : [];

    return {
        data,
        isLoading: !cachedData && isLoading,
        error
    };
};
