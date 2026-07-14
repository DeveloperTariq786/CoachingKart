'use client';

import InstitutionCenters from '@/modules/institutes/centers/components/InstitutionCenters';
import InstitutionStats from '@/modules/institutes/stats/components/InstitutionStats';
import InstitutionCourses from '@/modules/institutes/courses/components/InstitutionCourses';
import { useInstitute } from '@/modules/institutes/institute/hooks/useInstitute';
import InstitutionHero from '@/modules/institutes/hero/components/InstitutionHero';
import InstitutionHomeFaculty from '@/modules/institutes/faculty/components/InstitutionHomeFaculty';
import InstitutionHomeResults from '@/modules/institutes/result/components/InstitutionHomeResults';

export default function InstitutionDetailPage() {
    const { institution, details, isLoading } = useInstitute();

    const name = details?.name || institution?.name || '';
    const subtitle = details?.description || institution?.description || "";

    return (
        <div className="bg-background">
            <InstitutionHero
                name={name}
                subtitle={subtitle}
                institutionId={String(institution?.id)}
                isLoading={isLoading}
            />

            <InstitutionCourses institutionId={String(institution?.id)} />

            <InstitutionHomeResults institutionId={String(institution?.id)} />

            <InstitutionHomeFaculty institutionId={String(institution?.id)} />

            <InstitutionCenters
                institutionName={name}
                institutionId={String(institution?.id)}
            />

            <InstitutionStats institutionId={String(institution?.id)} />
        </div >
    );
}

