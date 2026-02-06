'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide, Autoplay, Pagination, type SwiperType } from '@/core/lib/utils/swiper';
import { cn } from '@/core/lib/utils/utils';

import { INSTITUTION_HERO_SLIDES, type HeroSlide } from '@/core/constants';

interface InstitutionHeroProps {
    name: string;
    subtitle: string;
    slides?: HeroSlide[];
}

const InstitutionHero: React.FC<InstitutionHeroProps> = ({ name, subtitle, slides = INSTITUTION_HERO_SLIDES }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

    const handleSlideChange = useCallback((swiper: SwiperType) => {
        setActiveIndex(swiper.realIndex);
    }, []);

    const handleDotClick = useCallback((index: number) => {
        if (swiperInstance) {
            swiperInstance.slideToLoop(index);
        }
    }, [swiperInstance]);

    return (
        <section className="relative h-[500px] lg:h-[600px] w-full overflow-hidden bg-slate-900">
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={0}
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

export default InstitutionHero;
