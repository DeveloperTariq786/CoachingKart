import { create } from 'zustand';
import { CarouselSlide } from '../types/carousel.types';

interface CarouselState {
    slides: CarouselSlide[];
    setSlides: (slides: CarouselSlide[]) => void;
    activeIndex: number;
    setActiveIndex: (index: number) => void;
}

export const useCarouselStore = create<CarouselState>((set) => ({
    slides: [],
    setSlides: (slides) => set({ slides }),
    activeIndex: 0,
    setActiveIndex: (index) => set({ activeIndex: index }),
}));
