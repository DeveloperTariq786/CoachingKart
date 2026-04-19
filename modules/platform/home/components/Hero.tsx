'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide, Autoplay, Pagination, type SwiperType } from '@/core/lib/utils/swiper';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/core/lib/utils/utils';
import { useCarousel } from '../hooks/useCarousel';
import { useCarouselStore } from '../store/useCarouselStore';

import { Skeleton } from '@/core/components/ui/skeleton';

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

    if (isLoading) {
        return (
            <section className="relative h-[600px] lg:h-[730px] w-full overflow-hidden bg-slate-900">
                <div className="relative z-20 h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                    <div className="max-w-3xl space-y-6">
                        <Skeleton className="h-12 md:h-16 lg:h-20 w-[80%] bg-slate-800/60 rounded-lg" />
                        <Skeleton className="h-6 md:h-8 w-[60%] bg-slate-800/60 rounded-lg" />
                        <Skeleton className="h-14 w-44 bg-slate-800/60 rounded-full" />
                    </div>
                </div>
            </section>
        );
    }

    if (isError || !slides || slides.length === 0) {
        return (
            <section className="relative h-[600px] lg:h-[730px] w-full overflow-hidden bg-slate-900" />
        );
    }

    return (
        <section className="relative h-[600px] lg:h-[730px] w-full overflow-hidden bg-slate-900">
            <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    el: '.hero-pagination',
                }}
                onSwiper={setSwiperInstance}
                onSlideChange={handleSlideChange}
                className="h-full w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={slide.id} className="relative">
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                priority={index === 0}
                                className="object-cover object-center"
                                sizes="100vw"
                            />
                            {/* Overlay Gradient */}
                            <div className="hero-overlay" />
                        </div>

                        {/* Hero Content */}
                        <div className="relative z-20 h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                            <div className="max-w-3xl">
                                <div className="flex flex-col items-start animate-fade-in">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight tracking-tight drop-shadow-lg">
                                        {slide.title}
                                    </h1>

                                    <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl drop-shadow-md">
                                        {slide.description}
                                    </p>

                                    {slide.institutionId && (
                                        <Button
                                            asChild
                                            size="lg"
                                            className={cn(
                                                "px-8 py-4 h-auto",
                                                "bg-primary-700 hover:bg-primary-800",
                                                "text-white font-bold rounded-full",
                                                "transition-all duration-300",
                                                "shadow-lg hover:shadow-primary-600/30",
                                                "hover:-translate-y-1",
                                                "group"
                                            )}
                                        >
                                            <Link href={`/${slide.institution.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                                {slide.buttonText || "View Details"}
                                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </Button>
                                    )}
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
                                ? "bg-white w-8"
                                : "bg-white/50 hover:bg-white/80 w-2.5"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
