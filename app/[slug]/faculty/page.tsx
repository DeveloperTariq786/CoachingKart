'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import InstitutionHero from '@/modules/institutes/components/InstitutionHero';

import InstitutionFaculty from '@/modules/institutes/components/InstitutionFaculty';

export default function FacultyPage() {
    const params = useParams();
    const slug = params.slug as string;
    const formattedName = slug ? slug.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Elite Academy';

    return (
        <div className="bg-white min-h-screen pt-20">
            {/* <InstitutionHero
                name={formattedName}
                subtitle="Shaping the future of medical and engineering aspirants with world-class faculty and personal attention."
            /> */}

            <InstitutionFaculty />
        </div>
    );
}
