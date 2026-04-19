'use client';

import { useQuery } from '@tanstack/react-query';
import { courseService } from '../services/course.service';
import { useCourseStore } from '../store/useCourseStore';
import { useEffect } from 'react';

export const useCourses = (enabled: boolean = true) => {
    const { setCourses } = useCourseStore();

    const query = useQuery({
        queryKey: ['platform-courses'],
        queryFn: courseService.getCourses,
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled,
    });

    useEffect(() => {
        if (query.data) {
            setCourses(query.data);
        }
    }, [query.data, setCourses]);

    return query;
};
