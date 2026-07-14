'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide, Autoplay, Pagination, type SwiperType } from '@/core/lib/utils/swiper';
import { cn } from '@/core/lib/utils/utils';
import { getOptimizedImageUrl } from '@/core/lib/utils/image-utils';
import { Skeleton } from '@/core/components/ui/skeleton';

import { bannerService } from '../services/hero.service';
import { useBannerStore } from '../store/useHeroStore';
import { HeroSlide, InstitutionHeroProps } from '../types/hero.types';

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
                <Skeleton className={cn('w-full bg-slate-800/50 rounded-none', ASPECT_CLASS)} />
                <div className="px-4 sm:px-6 lg:px-10 py-4">
                    <Skeleton className="h-8 w-1/2 mb-3 bg-slate-200 rounded-lg" />
                    <Skeleton className="h-6 w-1/3 bg-slate-200 rounded-lg" />
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
        <section className="w-full">
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

                {/* Custom Carousel Indicators */}
                <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center space-x-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={cn(
                                "h-2.5 rounded-full transition-all duration-300",
                                index === activeIndex
                                    ? "bg-primary-500 w-8"
                                    : "bg-white/50 hover:bg-white/80 w-2.5"
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>


        </section>
    );
};

export default InstitutionHero;