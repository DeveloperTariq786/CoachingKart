'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { facultyService } from '../services/faculty.service';
import { useFacultyStore } from '../store/useFacultyStore';
import { FacultiesQueryParams } from '../types/faculty.types';

export const useFaculties = (params: FacultiesQueryParams | undefined) => {
    const { setFaculties } = useFacultyStore();

    const query = useQuery({
        queryKey: ['institution-faculties', params],
        queryFn: () => {
            if (!params) throw new Error('params are required');
            return facultyService.getFaculties(params);
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: !!params?.institutionId,
    });

    useEffect(() => {
        if (query.data?.data) {
            setFaculties(query.data.data);
        }
    }, [query.data, setFaculties]);

    return query;
};
