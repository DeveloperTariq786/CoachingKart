import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';

// Re-export Swiper components and modules for easy importing
export { Swiper, SwiperSlide } from 'swiper/react';
export { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
export type { Swiper as SwiperType } from 'swiper';

// Import all Swiper CSS
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

/**
 * Custom hook to manage Swiper instance reference
 * Provides methods for navigation and autoplay control
 */
export const useSwiper = () => {
    const swiperRef = useRef<SwiperType | null>(null);

    const slidePrev = () => {
        swiperRef.current?.slidePrev();
    };

    const slideNext = () => {
        swiperRef.current?.slideNext();
    };

    const stopAutoplay = () => {
        swiperRef.current?.autoplay.stop();
    };

    const startAutoplay = () => {
        swiperRef.current?.autoplay.start();
    };

    return {
        swiperRef,
        slidePrev,
        slideNext,
        stopAutoplay,
        startAutoplay,
    };
};
