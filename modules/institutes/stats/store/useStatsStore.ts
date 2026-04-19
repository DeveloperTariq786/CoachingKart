import { create } from 'zustand';
import { InstitutionHomeStats } from '../types/stats.types';

interface HomeStoreState {
    // Cache home stats by institutionId
    homeStatsCache: Record<string, InstitutionHomeStats>;
    setHomeStats: (institutionId: string, stats: InstitutionHomeStats) => void;
}

export const useHomeStore = create<HomeStoreState>((set) => ({
    homeStatsCache: {},

    setHomeStats: (institutionId, stats) =>
        set((state) => ({
            homeStatsCache: {
                ...state.homeStatsCache,
                [institutionId]: stats
            }
        })),
}));
