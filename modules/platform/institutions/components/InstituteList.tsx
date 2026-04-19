'use client';

import React from 'react';
import { InstitutionCard } from '@/core/components/common';
import { useInstitutions } from '../hooks/useInstitutions';
import { InstitutionsQueryParams } from '../types/institution.types';

interface InstituteListProps {
    queryParams: InstitutionsQueryParams;
}

const InstituteList: React.FC<InstituteListProps> = ({ queryParams }) => {
    const { data: response, isLoading } = useInstitutions(queryParams);
    const institutions = response?.data || [];

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-8">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-[400px] w-full bg-slate-100 animate-pulse rounded-2xl" />
                ))}
            </div>
        );
    }

    if (institutions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-2">No Institutions Found</h3>
                <p className="text-slate-500">Try adjusting your filters to find what you're looking for.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-8">
            {institutions.map((institution) => (
                <InstitutionCard key={institution.id} tuition={institution} />
            ))}
        </div>
    );
};

export default InstituteList;
