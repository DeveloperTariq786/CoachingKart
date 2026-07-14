'use client';

import React from 'react';
import { InstitutionCard } from '@/core/components/common';
import { Institution } from '../types/institution.types';

interface InstituteListProps {
    institutions: Institution[];
    isLoading: boolean;
    isLoadingMore?: boolean;
}

const InstituteList: React.FC<InstituteListProps> = ({ institutions, isLoading, isLoadingMore }) => {
    if (isLoading && institutions.length === 0) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4">
                {[...Array(8)].map((_, i) => (
                    <InstitutionCard key={`skeleton-${i}`} isLoading />
                ))}
            </div>
        );
    }

    if (institutions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-slate-100 rounded-2xl shadow-sm px-4">
                <div className="p-4 bg-slate-50 rounded-full mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">No Institutions Found</h3>
                <p className="text-sm text-slate-500 max-w-sm">We couldn't find any institutions matching your selection. Try adjusting your filters.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4">
            {institutions.map((institution) => (
                <InstitutionCard key={institution.id} tuition={institution} />
            ))}
            {isLoadingMore && [...Array(4)].map((_, i) => (
                <InstitutionCard key={`skeleton-more-${i}`} isLoading />
            ))}
        </div>
    );
};

export default InstituteList;
