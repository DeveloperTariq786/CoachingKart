'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide, Autoplay, Pagination, type SwiperType } from '@/core/lib/utils/swiper';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/core/lib/utils/utils';
import { getOptimizedImageUrl } from '@/core/lib/utils/image-utils';
import { useCarousel } from '../hooks/useCarousel';
import { useCarouselStore } from '../store/useCarouselStore';
import { Skeleton } from '@/core/components/ui/skeleton';

const CF_IMAGE_OPTIONS = {
    width: 1920,
    height: 660,
    quality: 85,
    format: 'webp' as const,
    fit: 'cover' as const,
    gravity: 'top' as const,
};

const ASPECT_CLASS = 'aspect-[96/33]';

const Hero: React.FC = () => {
    const { isLoading, isError } = useCarousel();
    const slides = useCarouselStore((state) => state.slides);
    const activeIndex = useCarouselStore((state) => state.activeIndex);
    const setActiveIndex = useCarouselStore((state) => state.setActiveIndex);

    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

    const handleSlideChange = useCallback((swiper: SwiperType) => {
        setActiveIndex(swiper.realIndex);
    }, [setActiveIndex]);

    const handleDotClick = useCallback((index: number) => {
        if (swiperInstance) {
            swiperInstance.slideToLoop(index);
        }
    }, [swiperInstance]);

    const handlePrev = useCallback(() => {
        swiperInstance?.slidePrev();
    }, [swiperInstance]);

    const handleNext = useCallback(() => {
        swiperInstance?.slideNext();
    }, [swiperInstance]);

    // ── Loading state ──────────────────────────────────────────────────────────
    if (isLoading) {
        return (
            <section className="w-full">
                {/* Mirror the aspect ratio so the skeleton doesn't collapse */}
                <div className={cn('relative w-full bg-slate-900', ASPECT_CLASS)}>
                    <Skeleton className="absolute inset-0 bg-slate-800/60" />
                </div>
                <div className="bg-white py-8 px-4 sm:px-6 lg:px-10">
                    <div className="w-full space-y-4">
                        <Skeleton className="h-8 w-[50%] bg-slate-200 rounded" />
                        <Skeleton className="h-5 w-[70%] bg-slate-200 rounded" />
                        <Skeleton className="h-12 w-40 bg-slate-200 rounded-full" />
                    </div>
                </div>
            </section>
        );
    }

    // ── Error / empty state ────────────────────────────────────────────────────
    if (isError || !slides || slides.length === 0) {
        return <section className={cn('w-full bg-slate-900', ASPECT_CLASS)} />;
    }

    const activeSlide = slides[activeIndex] ?? slides[0];

    return (
        <section className="w-full">
            {/* ── Section 1: Image Carousel ─────────────────────────────────────
             *
             *  No fixed h-[] here. The container grows to match the intrinsic
             *  ratio of the Cloudflare-transformed image via `aspect-[32/9]`.
             *  On mobile you may want a taller crop — swap CF_IMAGE_OPTIONS.height
             *  or add a second Cloudflare request for a narrower breakpoint.
             * ──────────────────────────────────────────────────────────────── */}
            <div className={cn('relative w-full overflow-hidden bg-slate-900', ASPECT_CLASS)}>
                <Swiper
                    modules={[Autoplay, Pagination]}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    onSwiper={setSwiperInstance}
                    onSlideChange={handleSlideChange}
                    className="h-full w-full"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={slide.id} className="relative h-full">
                            <Image
                                src={getOptimizedImageUrl(slide.image, CF_IMAGE_OPTIONS)}
                                alt={slide.title}
                                fill
                                priority={index === 0}
                                className="object-cover object-top"
                                /**
                                 * sizes tells the browser which rendered width to expect
                                 * so it can pick the right srcset entry.
                                 * Since this is always 100% viewport width, "100vw" is correct.
                                 */
                                sizes="100vw"
                                unoptimized={false}
                            />
                            {/* Subtle bottom fade so the image transitions cleanly to the content section */}
                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Prev / Next arrow controls */}
                <button
                    onClick={handlePrev}
                    className={cn(
                        'absolute left-4 top-1/2 -translate-y-1/2 z-30',
                        'w-10 h-10 rounded-full bg-white/20 hover:bg-white/40',
                        'backdrop-blur-sm border border-white/30',
                        'flex items-center justify-center',
                        'transition-all duration-200 hover:scale-105',
                        'text-white'
                    )}
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={handleNext}
                    className={cn(
                        'absolute right-4 top-1/2 -translate-y-1/2 z-30',
                        'w-10 h-10 rounded-full bg-white/20 hover:bg-white/40',
                        'backdrop-blur-sm border border-white/30',
                        'flex items-center justify-center',
                        'transition-all duration-200 hover:scale-105',
                        'text-white'
                    )}
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dot indicators — bottom center */}
                <div className="absolute bottom-5 left-0 right-0 z-30 flex justify-center gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={cn(
                                'h-2 rounded-full transition-all duration-300',
                                index === activeIndex
                                    ? 'bg-white w-6'
                                    : 'bg-white/40 hover:bg-white/70 w-2'
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <div className="bg-white border-b border-slate-100">
                <div className="w-full px-4 sm:px-6 lg:px-10 py-7 lg:py-9">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                        {/* Title + description */}
                        <div className="max-w-2xl">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-snug tracking-tight mb-2 transition-all duration-300 whitespace-nowrap">
                                {activeSlide.title}
                            </h1>
                            <p className="text-base md:text-lg text-slate-500 leading-relaxed">
                                {activeSlide.description}
                            </p>
                        </div>

                        {/* CTA button */}
                        {activeSlide.institutionId && (
                            <div className="flex-shrink-0">
                                <Button
                                    asChild
                                    size="lg"
                                    className={cn(
                                        'px-7 py-3 h-auto',
                                        'bg-primary-700 hover:bg-primary-800',
                                        'text-white font-semibold rounded-full',
                                        'transition-all duration-300',
                                        'shadow-md hover:shadow-primary-600/25',
                                        'hover:-translate-y-0.5',
                                        'group'
                                    )}
                                >
                                    <Link
                                        href={`/${activeSlide.institution.name
                                            .toLowerCase()
                                            .replace(/\s+/g, '-')}`}
                                    >
                                        {activeSlide.buttonText || 'View Details'}
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;