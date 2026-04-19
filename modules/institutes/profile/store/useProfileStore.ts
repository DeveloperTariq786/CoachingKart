import { create } from 'zustand';
import { StudentProfileData } from '../types/profile';

interface ProfileState {
    profile: StudentProfileData | null;
    isLoading: boolean;
    error: string | null;
    setProfile: (profile: StudentProfileData) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
    profile: null,
    isLoading: false,
    error: null,
    setProfile: (profile) => set({ profile, isLoading: false, error: null }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error, isLoading: false }),
}));
