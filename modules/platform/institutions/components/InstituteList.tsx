'use client';

import React from 'react';
import { FEATURED_TUITIONS } from '@/core/constants';
import { InstitutionCard } from '@/core/components/common';
import { Card } from '@/core/components/ui/card';

const InstituteList: React.FC = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-8">
            {FEATURED_TUITIONS.map((tuition) => (
                <InstitutionCard key={tuition.id} tuition={tuition} />
            ))}
        </div>
    );
};

export default InstituteList;
