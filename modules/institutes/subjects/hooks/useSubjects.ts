'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { subjectService } from '../services/subject.service';
import { useSubjectStore } from '../store/useSubjectStore';

export const useSubjects = (institutionId: string | undefined) => {
    const { setSubjects } = useSubjectStore();

    const query = useQuery({
        queryKey: ['institution-subjects', institutionId],
        queryFn: () => {
            if (!institutionId) throw new Error('institutionId is required');
            return subjectService.getSubjects(institutionId);
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: !!institutionId,
    });

    useEffect(() => {
        if (query.data?.data) {
            setSubjects(query.data.data);
        }
    }, [query.data, setSubjects]);

    return query;
};
