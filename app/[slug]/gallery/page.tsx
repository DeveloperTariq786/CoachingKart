'use client';

import InstitutionGallery from '@/modules/institutes/gallery/components/InstitutionGallery';
import { useInstitute } from '@/modules/institutes/institute/hooks/useInstitute';

export default function GalleryPage() {
    const { details, slug } = useInstitute();

    const formattedName = details?.name || (slug ? slug.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Elite Academy');

    return (
        <div className="bg-background min-h-screen pt-16 pb-16">
            <InstitutionGallery
                institutionId={details?.id}
                formattedName={formattedName}
            />
        </div>
    );
}
