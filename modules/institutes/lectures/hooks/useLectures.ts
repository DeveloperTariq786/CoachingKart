import { useState, useEffect } from 'react';
import { lectureService } from '../services/lecture.service';
import { useLectureStore } from '../store/useLectureStore';
import { LecturesResponse } from '../types/lecture.types';

export const useLectures = (batchId: string | undefined, page: number = 1, limit: number = 10, subjectId?: string, search?: string) => {
    const { lecturesCache, setLectures } = useLectureStore();
    const cacheKey = batchId ? `${batchId}:${subjectId || 'all'}:${page}:${limit}:${search || ''}` : null;
    const cachedData = cacheKey ? lecturesCache[cacheKey] : null;
    const [isLoading, setIsLoading] = useState(!cachedData);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchLectures = async () => {
            if (!batchId || !cacheKey || lecturesCache[cacheKey]) return;

            try {
                setIsLoading(true);
                setError(null);
                const data = await lectureService.getLectures(batchId, page, limit, subjectId, search);
                if (data) {
                    setLectures(batchId, subjectId, page, limit, data, search);
                }
            } catch (err: any) {
                console.error("Error fetching lectures:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLectures();
    }, [batchId, page, limit, subjectId, search, cacheKey, lecturesCache, setLectures]);

    const data = cacheKey ? lecturesCache[cacheKey] : null;

    return {
        data,
        isLoading: !cachedData && isLoading,
        error
    };
};
