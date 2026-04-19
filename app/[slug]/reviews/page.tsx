'use client';

import { useInstitute } from '@/modules/institutes/institute/hooks/useInstitute';
import InstitutionRatingAndReviews from '@/modules/institutes/reviews/components/InstitutionRatingAndReviews';

export default function ReviewsPage() {
    const { institution } = useInstitute();

    return (
        <div className="bg-background min-h-screen pt-20">
            <InstitutionRatingAndReviews institutionId={institution?.id} />
        </div>
    );
}
