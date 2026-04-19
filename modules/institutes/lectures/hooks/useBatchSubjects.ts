import { useState, useEffect } from 'react';
import { lectureService } from '../services/lecture.service';
import { useLectureStore } from '../store/useLectureStore';

export const useBatchSubjects = (batchId: string | undefined) => {
    const { batchSubjectsCache, setBatchSubjects } = useLectureStore();
    const cachedData = batchId ? batchSubjectsCache[batchId] : null;
    const [isLoading, setIsLoading] = useState(!cachedData);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchBatchSubjects = async () => {
            if (!batchId || batchSubjectsCache[batchId]) return;

            try {
                setIsLoading(true);
                setError(null);
                const data = await lectureService.getBatchSubjects(batchId);
                if (data) {
                    setBatchSubjects(batchId, data);
                }
            } catch (err: any) {
                console.error("Error fetching batch subjects:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBatchSubjects();
    }, [batchId, batchSubjectsCache, setBatchSubjects]);

    return {
        data: cachedData,
        isLoading: !cachedData && isLoading,
        error
    };
};
