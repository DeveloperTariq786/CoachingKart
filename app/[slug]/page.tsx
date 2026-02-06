'use client';

import { useParams } from 'next/navigation';
import InstitutionHero from '@/modules/institutes/components/InstitutionHero';
import InstitutionCenters from '@/modules/institutes/components/InstitutionCenters';
import InstitutionStats from '@/modules/institutes/components/InstitutionStats';
import InstitutionCourses from '@/modules/institutes/components/courses/InstitutionCourses';

export default function InstitutionDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const formattedName = slug ? slug.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Elite Academy';

    return (
        <div className="bg-white">
            <InstitutionHero
                name={formattedName}
                subtitle="Shaping the future of medical and engineering aspirants with world-class faculty and personal attention."
            />

            <InstitutionCourses />

            <InstitutionCenters institutionName={formattedName} />

            <InstitutionStats />
        </div >
    );
}
