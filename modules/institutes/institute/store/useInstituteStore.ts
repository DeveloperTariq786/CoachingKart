import { create } from 'zustand';
import { InstitutionDetails } from '../types/institute.types';

interface InstituteStoreState {
    detailsCache: Record<string, InstitutionDetails>;
    setDetails: (slug: string, details: InstitutionDetails) => void;
}

export const useInstituteStore = create<InstituteStoreState>((set) => ({
    detailsCache: {},
    setDetails: (slug, details) =>
        set((state) => ({
            detailsCache: {
                ...state.detailsCache,
                [slug]: details
            }
        })),
}));
