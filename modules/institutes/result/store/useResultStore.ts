import { create } from 'zustand';
import { Result, ResultStats, TopPerformer } from '../types/result.types';

interface ResultStoreState {
    // Cache top performers by institutionId
    topPerformersCache: Record<string, TopPerformer[]>;
    // Cache results by a key (e.g. institutionId-courseId-year-page)
    resultsCache: Record<string, { data: Result[], pagination: any }>;
    // Cache results stats by institutionId
    resultsStatsCache: Record<string, ResultStats[]>;
    setTopPerformers: (institutionId: string, performers: TopPerformer[]) => void;
    setResults: (cacheKey: string, results: Result[], pagination: any) => void;
    setResultsStats: (institutionId: string, stats: ResultStats[]) => void;
}

export const useResultStore = create<ResultStoreState>((set) => ({
    topPerformersCache: {},
    resultsCache: {},
    resultsStatsCache: {},

    setTopPerformers: (institutionId, performers) =>
        set((state) => ({
            topPerformersCache: {
                ...state.topPerformersCache,
                [institutionId]: performers
            }
        })),

    setResults: (cacheKey, results, pagination) =>
        set((state) => ({
            resultsCache: {
                ...state.resultsCache,
                [cacheKey]: { data: results, pagination }
            }
        })),

    setResultsStats: (institutionId, stats) =>
        set((state) => ({
            resultsStatsCache: {
                ...state.resultsStatsCache,
                [institutionId]: stats
            }
        })),
}));
