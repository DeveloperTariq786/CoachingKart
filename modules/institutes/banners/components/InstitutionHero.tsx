'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide, Autoplay, Pagination, type SwiperType } from '@/core/lib/utils/swiper';
import { cn } from '@/core/lib/utils/utils';
import { Skeleton } from '@/core/components/ui/skeleton';

import { bannerService } from '../services/banner.service';
import { useBannerStore } from '../store/useBannerStore';

interface HeroSlide {
    id: string | number;
    imageUrl: string;
    title?: string;
    subtitle?: string;
}

interface InstitutionHeroProps {
    name: string;
    subtitle: string;
    slides?: HeroSlide[];
    institutionId?: string;
    isLoading?: boolean;
}

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

                // Check cache first
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

    if (isLoading) {
        return (
            <section className="relative h-[500px] lg:h-[600px] w-full overflow-hidden bg-slate-900 flex items-center justify-center">
                <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
                    <Skeleton className="h-16 md:h-24 w-3/4 mb-6 bg-slate-800/50 rounded-lg" />
                    <Skeleton className="h-6 md:h-8 w-1/2 mb-8 bg-slate-800/50 rounded-lg" />
                    <div className="flex gap-2">
                        <Skeleton className="h-2.5 w-8 bg-slate-800/50 rounded-full" />
                        <Skeleton className="h-2.5 w-2.5 bg-slate-800/50 rounded-full" />
                        <Skeleton className="h-2.5 w-2.5 bg-slate-800/50 rounded-full" />
                    </div>
                </div>
            </section>
        );
    }

    if (slides.length === 0) {
        return (
            <section className="relative h-[500px] lg:h-[600px] w-full overflow-hidden bg-slate-800">
                <div className="relative z-20 h-full flex flex-col justify-center w-full px-4 sm:px-6 lg:px-8 pt-20 text-center text-white">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-2xl">
                            {name}
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-8 font-medium drop-shadow-lg">
                            {subtitle}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative h-[500px] lg:h-[600px] w-full overflow-hidden bg-slate-900">
            <Swiper
                key={slides.length} // Force re-initialize when slides change
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
                    <SwiperSlide key={slide.id} className="relative">
                        <div className="absolute inset-0">
                            <Image
                                src={slide.imageUrl}
                                alt={name}
                                fill
                                priority
                                className="object-cover object-center"
                                sizes="100vw"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                        </div>

                        {/* Hero Content */}
                        <div className="relative z-20 h-full flex flex-col justify-center w-full px-4 sm:px-6 lg:px-8 pt-20 text-center text-white">
                            <div className="max-w-4xl mx-auto">
                                <div className="flex flex-col items-center animate-fade-in">


                                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-2xl">
                                        {slide.title || name}
                                    </h1>

                                    <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-8 font-medium drop-shadow-lg">
                                        {slide.subtitle || subtitle}
                                    </p>


                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Carousel Indicators */}
            <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-2">
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
        </section>
    );
};

export default InstitutionHero;
