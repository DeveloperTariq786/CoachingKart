import { create } from 'zustand';
import { InstitutionCenter } from '../types/center.types';

interface CenterStoreState {
    // Cache centers by institutionId
    centersCache: Record<string, { centers: InstitutionCenter[], total: number }>;
    setCenters: (institutionId: string, centers: InstitutionCenter[], total: number) => void;
}

export const useCenterStore = create<CenterStoreState>((set) => ({
    centersCache: {},

    setCenters: (institutionId, centers, total) =>
        set((state) => ({
            centersCache: {
                ...state.centersCache,
                [institutionId]: { centers, total }
            }
        })),
}));
