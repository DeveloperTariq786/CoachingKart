import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { instituteService } from '../services/institute.service';
import { useInstituteStore } from '../store/useInstituteStore';

export const useInstitute = () => {
    const params = useParams();
    const slug = params?.slug as string;

    const { detailsCache, setDetails } = useInstituteStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!slug) return;
            // Check cache
            if (detailsCache[slug]) {
                return;
            }

            try {
                setIsLoading(true);
                const response = await instituteService.getInstituteDetails(slug);
                if (response.success) {
                    setDetails(slug, response.data);
                }
            } catch (err) {
                console.error("Error fetching institute details:", err);
                setError("Failed to fetch institute details");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [slug, detailsCache, setDetails]);

    const details = slug ? detailsCache[slug] : null;

    return {
        institution: details, // Now details IS the institution data we want
        details,
        isLoading,
        error,
        slug
    };
};
