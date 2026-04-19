import { create } from 'zustand';
import { Ad } from '../types/ad.types';

interface AdState {
    ads: Ad[];
    setAds: (ads: Ad[]) => void;
}

export const useAdStore = create<AdState>((set) => ({
    ads: [],
    setAds: (ads) => set({ ads }),
}));
