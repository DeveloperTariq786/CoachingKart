import { create } from 'zustand';
import { GalleryItem } from '../types/gallery.types';

interface GalleryState {
    gallery: GalleryItem[];
    setGallery: (gallery: GalleryItem[]) => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
    gallery: [],
    setGallery: (gallery) => set({ gallery }),
}));
