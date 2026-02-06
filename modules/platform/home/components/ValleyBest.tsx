'use client';

import React from 'react';
import { FEATURED_TUITIONS } from '@/core/constants';
import { InstitutionCard } from '@/core/components/common';
import { Swiper, SwiperSlide, Autoplay } from '@/core/lib/utils/swiper';

const ValleyBest: React.FC = () => {
    return (
        <section className="py-24 bg-slate-50 border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Valley's Best</h2>
                        <p className="mt-3 text-slate-500 text-lg leading-relaxed">
                            The most prestigious and high-performing institutes across the valley.
                        </p>
                    </div>
                </div>

                <div className="relative">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1.2}
                        centeredSlides={false}
                        loop={true}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 24,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 32,
                            },
                        }}
                        className="w-full !pb-8"
                    >
                        {FEATURED_TUITIONS.map((tuition) => (
                            <SwiperSlide key={tuition.id} className="h-auto">
                                <InstitutionCard tuition={tuition} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default ValleyBest;
