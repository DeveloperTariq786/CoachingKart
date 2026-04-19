import { create } from 'zustand';
import { Banner } from '../types/banner.types';

interface BannerStoreState {
    // Cache banners by institutionId
    bannersCache: Record<string, Banner[]>;
    setBanners: (institutionId: string, banners: Banner[]) => void;
}

export const useBannerStore = create<BannerStoreState>((set) => ({
    bannersCache: {},

    setBanners: (institutionId, banners) =>
        set((state) => ({
            bannersCache: {
                ...state.bannersCache,
                [institutionId]: banners
            }
        })),
}));
