'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import AboutInstitution from '@/modules/institutes/about/components/AboutInstitution';
// import InstitutionHero from '@/modules/institutes/home/components/InstitutionHero';

export default function AboutUsPage() {
    const params = useParams();
    const slug = params.slug as string;
    const formattedName = slug ? slug.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Elite Academy';

    return (
        <div className="bg-background min-h-screen pt-20">
            {/* <InstitutionHero
                name={formattedName}
                subtitle="Shaping the future of medical and engineering aspirants with world-class faculty and personal attention."
            /> */}
            <AboutInstitution />
        </div>
    );
}
