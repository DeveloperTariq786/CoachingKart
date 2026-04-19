import { useState, useEffect } from 'react';
import { aboutService } from '../services/about.service';
import { InstitutionAboutData } from '../types/about.types';

export const useAbout = (institutionId: string | undefined) => {
    const [aboutData, setAboutData] = useState<InstitutionAboutData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAbout = async () => {
            if (!institutionId) {
                // If institutionId is not yet available, keep loading state
                return;
            }

            try {
                setIsLoading(true);
                const response = await aboutService.getInstitutionAbout(institutionId);
                if (response.success) {
                    setAboutData(response.data);
                }
            } catch (err) {
                console.error("Error fetching institution about details:", err);
                setError("Failed to fetch institution about details");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAbout();
    }, [institutionId]);

    return {
        aboutData,
        isLoading,
        error
    };
};
