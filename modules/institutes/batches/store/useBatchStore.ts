import { create } from 'zustand';
import { Batch } from '../types/batch.types';

interface BatchStoreState {
    batchesCache: Record<string, Batch[]>; // key: `${programId}:${session}`
    setBatches: (programId: string, session: string, batches: Batch[]) => void;
}

export const useBatchStore = create<BatchStoreState>((set) => ({
    batchesCache: {},
    setBatches: (programId, session, batches) =>
        set((state) => ({
            batchesCache: {
                ...state.batchesCache,
                [`${programId}:${session}`]: batches
            }
        })),
}));
