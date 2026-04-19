import { create } from 'zustand';
import { Resource } from '../types/resource.types';

interface ResourceStoreState {
    resourcesCache: Record<string, Resource[]>; // key: lectureId
    batchResourcesCache: Record<string, Resource[]>; // key: `${batchId}:${subjectId}`
    setResources: (lectureId: string, resources: Resource[]) => void;
    setBatchResources: (batchId: string, subjectId: string | null, resources: Resource[]) => void;
    clearCache: () => void;
}

export const useResourceStore = create<ResourceStoreState>((set) => ({
    resourcesCache: {},
    batchResourcesCache: {},
    setResources: (lectureId, resources) =>
        set((state) => ({
            resourcesCache: {
                ...state.resourcesCache,
                [lectureId]: resources
            }
        })),
    setBatchResources: (batchId, subjectId, resources) =>
        set((state) => ({
            batchResourcesCache: {
                ...state.batchResourcesCache,
                [`${batchId}:${subjectId || 'all'}`]: resources
            }
        })),
    clearCache: () => set({ resourcesCache: {}, batchResourcesCache: {} })
}));
