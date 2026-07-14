'use client';

import { useQuery } from '@tanstack/react-query';
import { courseService } from '../services/course.service';
import { useCourseStore } from '../store/useCourseStore';
import { useEffect } from 'react';

export const useCourses = (limit: number, enabled: boolean = true) => {
    const { setCourses } = useCourseStore();

    const query = useQuery({
        queryKey: ['platform-courses', limit],
        queryFn: () => courseService.getCourses(limit),
        staleTime: 1000 * 60 * 5, // 5 minutes
        placeholderData: (prev) => prev,
        enabled,
    });

    useEffect(() => {
        if (query.data?.data) {
            setCourses(query.data.data);
        }
    }, [query.data, setCourses]);

    return query;
};
