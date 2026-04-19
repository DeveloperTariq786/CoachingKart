import { useState, useEffect } from 'react';
import { lectureService } from '../services/lecture.service';
import { useLectureStore } from '../store/useLectureStore';
import { LectureDetailResponse } from '../types/lecture.types';

export const useLectureDetail = (lectureId: string | undefined) => {
    const { lectureDetailCache, setLectureDetail } = useLectureStore();
    const cachedData = lectureId ? lectureDetailCache[lectureId] : null;
    const [isLoading, setIsLoading] = useState(!cachedData);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchLectureDetail = async () => {
            if (!lectureId || lectureDetailCache[lectureId]) return;

            try {
                setIsLoading(true);
                setError(null);
                const result = await lectureService.getLectureDetail(lectureId);
                setLectureDetail(lectureId, result);
            } catch (err: any) {
                console.error("Error fetching lecture detail:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLectureDetail();
    }, [lectureId, lectureDetailCache, setLectureDetail]);

    return {
        data: cachedData,
        isLoading: !cachedData && isLoading,
        error
    };
};
