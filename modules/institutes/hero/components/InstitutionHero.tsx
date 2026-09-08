'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide, Autoplay, Pagination, type SwiperType } from '@/core/lib/utils/swiper';
import { cn } from '@/core/lib/utils/utils';
import { getOptimizedImageUrl } from '@/core/lib/utils/image-utils';

import { bannerService } from '../services/hero.service';
import { useBannerStore } from '../store/useHeroStore';
import { HeroSlide, InstitutionHeroProps } from '../types/hero.types';
import { useInstitute } from '@/modules/institutes/institute/hooks/useInstitute';

const CF_IMAGE_OPTIONS = {
    width: 1920,
    height: 800,
    quality: 85,
    format: 'webp' as const,
    fit: 'cover' as const,
    gravity: 'top' as const,
};

const ASPECT_CLASS = 'aspect-[12/5]';


const InstitutionHero: React.FC<InstitutionHeroProps> = ({
    name,
    subtitle,
    slides: initialSlides,
    institutionId,
    isLoading: isParentLoading
}) => {
    const { details } = useInstitute();
    const primaryColor = details?.theme?.primary || '#0ea5e9';
    const { bannersCache, setBanners } = useBannerStore();
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const [slides, setSlides] = useState<HeroSlide[]>(initialSlides || []);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                if (!institutionId) return;

                if (bannersCache[institutionId]) {
                    const mappedSlides: HeroSlide[] = bannersCache[institutionId].map(banner => ({
                        id: banner.id,
                        imageUrl: banner.image,
                        title: banner.heading,
                        subtitle: banner.description
                    }));
                    setSlides(mappedSlides);
                    return;
                }

                setIsFetching(true);
                const response = await bannerService.getBanners(institutionId);
                if (response.success && response.data.length > 0) {
                    setBanners(institutionId, response.data);
                    const mappedSlides: HeroSlide[] = response.data.map(banner => ({
                        id: banner.id,
                        imageUrl: banner.image,
                        title: banner.heading,
                        subtitle: banner.description
                    }));
                    setSlides(mappedSlides);
                }
            } catch (error) {
                console.error("Error fetching banners:", error);
            } finally {
                setIsFetching(false);
            }
        };

        if (!initialSlides) {
            fetchBanners();
        }
    }, [institutionId, initialSlides, bannersCache, setBanners]);

    const handleSlideChange = useCallback((swiper: SwiperType) => {
        setActiveIndex(swiper.realIndex);
    }, []);

    const handleDotClick = useCallback((index: number) => {
        if (swiperInstance) {
            swiperInstance.slideToLoop(index);
        }
    }, [swiperInstance]);

    const isLoading = isParentLoading || (isFetching && slides.length === 0);

    // ── Loading state ──────────────────────────────────────────────────────────
    if (isLoading) {
        return (
            <section className="w-full">
                {/* Banner Shimmer */}
                <div className={cn('relative w-full overflow-hidden bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 border-b border-slate-100', ASPECT_CLASS)}>
                    {/* Animated Sweep */}
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
                </div>

                {/* Indicators Shimmer */}
                <div className="py-3 flex justify-center space-x-2 bg-background">
                    <div className="h-2 w-8 rounded-full bg-slate-300 animate-pulse" />
                    <div className="h-2 w-2 rounded-full bg-slate-200 animate-pulse" />
                    <div className="h-2 w-2 rounded-full bg-slate-200 animate-pulse" />
                </div>
            </section>
        );
    }

    // ── Empty / no slides state ────────────────────────────────────────────────
    if (slides.length === 0) {
        return (
            <section className="w-full bg-slate-800">
                <div className={cn('w-full', ASPECT_CLASS)} />
                <div className="px-4 sm:px-6 lg:px-10 py-4 text-left">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight text-foreground">
                        {name}
                    </h1>
                    <p className="text-base md:text-lg text-slate-600">
                        {subtitle}
                    </p>
                </div>
            </section>
        );
    }

    // ── Main carousel ──────────────────────────────────────────────────────────
    return (
        <section
            className="w-full"
            style={{
                '--primary-500': primaryColor,
                '--institution-primary': primaryColor,
            } as React.CSSProperties}
        >
            {/* Image Carousel */}
            <div className={cn('relative w-full overflow-hidden bg-slate-900', ASPECT_CLASS)}>
                <Swiper
                    key={slides.length}
                    modules={[Autoplay, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={slides.length > 1}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    onSwiper={setSwiperInstance}
                    onSlideChange={handleSlideChange}
                    className="h-full w-full"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id} className="relative h-full">
                            <div className="absolute inset-0">
                                <Image
                                    src={getOptimizedImageUrl(slide.imageUrl, CF_IMAGE_OPTIONS)}
                                    alt={name}
                                    fill
                                    priority
                                    className="object-cover object-top"
                                    sizes="100vw"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>

            {/* Custom Carousel Indicators Below Image */}
            {slides.length > 1 && (
                <div className="py-3 flex justify-center space-x-2 bg-background">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={cn(
                                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                                index === activeIndex
                                    ? "bg-primary-500 w-8"
                                    : "bg-slate-300 hover:bg-slate-400 w-2"
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}


        </section>
    );
};

export default InstitutionHero;