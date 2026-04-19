'use client';

import React, { useRef, useState, useEffect } from 'react';
import { InstitutionCard } from '@/core/components/common';
import { Swiper, SwiperSlide, Autoplay } from '@/core/lib/utils/swiper';
import { useInstitutions } from '../../institutions/hooks/useInstitutions';
import { Skeleton } from '@/core/components/ui/skeleton';
import { type FeaturedTuition } from '@/core/constants/tuitions';

const ValleyBest: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [hasIntersected, setHasIntersected] = useState(false);

    const { isLoading, isError, data: response } = useInstitutions(
        { limit: 12, sortBy: 'centers' },
        hasIntersected
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasIntersected(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '100px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    if (!hasIntersected || isLoading) {
        return (
            <section ref={sectionRef} className="py-24 bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <Skeleton className="h-10 w-64 mb-4" />
                        <Skeleton className="h-6 w-96" />
                    </div>
                    <div className="flex gap-6 overflow-hidden">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] h-[400px] bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col">
                                <Skeleton className="h-48 w-full mb-6 rounded-2xl bg-slate-100" />
                                <div className="px-2 space-y-4">
                                    <Skeleton className="h-7 w-3/4 bg-slate-100 rounded-lg" />
                                    <Skeleton className="h-4 w-1/2 bg-slate-100 rounded-lg" />
                                    <div className="flex gap-2 pt-2">
                                        <Skeleton className="h-6 w-16 rounded-full bg-slate-100" />
                                        <Skeleton className="h-6 w-16 rounded-full bg-slate-100" />
                                    </div>
                                    <div className="pt-6">
                                        <Skeleton className="h-12 w-full rounded-xl bg-slate-100/80" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (isError || !response || !response.data || response.data.length === 0) {
        return <section ref={sectionRef} className="py-24 bg-slate-50 border-t border-slate-100" />;
    }

    // Map API data to FeaturedTuition interface expected by InstitutionCard
    const mappedTuitions: FeaturedTuition[] = response.data.map(inst => ({
        id: inst.id,
        name: inst.name,
        slug: inst.slug,
        location: `${inst.location.city}, ${inst.location.country}`,
        rating: inst.rating,
        reviewCount: inst.totalReviews,
        imageUrl: inst.coverImage || inst.logo,
        desc: inst.description,
        exams: inst.courses.map(c => c.name)
    }));

    return (
        <section ref={sectionRef} className="py-24 bg-slate-50 border-t border-slate-100">
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
                        loop={mappedTuitions.length > 1}
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
                        {mappedTuitions.map((tuition) => (
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

