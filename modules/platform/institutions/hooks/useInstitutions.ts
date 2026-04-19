'use client';

import { useQuery } from '@tanstack/react-query';
import { institutionService } from '../services/institution.service';
import { useInstitutionStore } from '../store/useInstitutionStore';
import { useEffect } from 'react';
import { InstitutionsQueryParams } from '../types/institution.types';

export const useInstitutions = (params?: InstitutionsQueryParams, enabled: boolean = true) => {
    const { setInstitutions } = useInstitutionStore();

    const query = useQuery({
        queryKey: ['platform-institutions', params],
        queryFn: () => institutionService.getInstitutions(params),
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled,
    });

    useEffect(() => {
        if (query.data) {
            setInstitutions(query.data.data);
        }
    }, [query.data, setInstitutions]);

    return query;
};
