import { useEffect } from 'react';
import { profileService } from '../services/profile.service';
import { useProfileStore } from '../store/useProfileStore';

export const useProfile = () => {
    const { profile, isLoading, error, setProfile, setLoading, setError } = useProfileStore();

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await profileService.getStudentProfile();
            if (response.success) {
                setProfile(response.data);
            } else {
                setError(response.message || 'Failed to fetch profile');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'An error occurred while fetching profile');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!profile) {
            fetchProfile();
        }
    }, []);

    return { profile, isLoading, error, refetch: fetchProfile };
};
