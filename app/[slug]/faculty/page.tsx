'use client';

import InstitutionFaculty from '@/modules/institutes/faculty/components/InstitutionFaculty';
import { useInstitute } from '@/modules/institutes/institute/hooks/useInstitute';

export default function FacultyPage() {
    const { details } = useInstitute();

    return (
        <div className="bg-background min-h-screen pt-20">
            <InstitutionFaculty institutionId={details?.id} />
        </div>
    );
}
