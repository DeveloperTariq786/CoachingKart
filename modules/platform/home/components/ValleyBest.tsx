'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { InstitutionCard } from '@/core/components/common';
import { useInstitutions } from '../../institutions/hooks/useInstitutions';
import { type FeaturedTuition } from '@/core/constants/tuitions';

const ValleyBest: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [hasIntersected, setHasIntersected] = useState(false);

    const { isLoading, isError, data: response } = useInstitutions(
        { limit: 10, sortBy: 'centers' },
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

    const isLoadingState = !hasIntersected || isLoading;

    // Map API data to FeaturedTuition interface expected by InstitutionCard
    const mappedTuitions: FeaturedTuition[] = (!isLoadingState && !isError && response?.data)
        ? response.data.slice(0, 10).map(inst => ({
            id: inst.id,
            name: inst.name,
            slug: inst.slug,
            location: `${inst.location.city}, ${inst.location.country}`,
            rating: inst.rating,
            reviewCount: inst.totalReviews,
            imageUrl: inst.coverImage || inst.logo,
            desc: inst.description,
            exams: inst.courses.map(c => c.name)
        }))
        : [];

    const showRealData = !isLoadingState && !isError && mappedTuitions.length > 0;
    const showFallback = !isLoadingState && (isError || mappedTuitions.length === 0);

    // Don't render section at all if fetch completed with no data
    if (showFallback) {
        return <section ref={sectionRef} className="pt-8 pb-16 md:py-16 bg-slate-50 border-t border-slate-100" />;
    }

    return (
        <section ref={sectionRef} className="py-8 md:py-16 bg-slate-50 border-t border-slate-100">
            <div className="w-full px-4 sm:px-6 lg:px-10">
                <div className="flex flex-col items-center justify-center text-center mb-6 md:mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Valley's Best</h2>
                        <p className="mt-2 md:mt-3 text-slate-500 text-sm sm:text-base md:text-lg leading-relaxed">
                            Discover renowned institutes recognized for excellence and outstanding results.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 md:gap-4">
                    {isLoadingState &&
                        Array.from({ length: 10 }).map((_, i) => (
                            <InstitutionCard key={`skeleton-${i}`} isLoading />
                        ))}

                    {showRealData &&
                        mappedTuitions.map((tuition) => (
                            <InstitutionCard key={tuition.id} tuition={tuition} />
                        ))}
                </div>

                {/* ─── View All Link ─────────────────────────────────────── */}
                {showRealData && (
                    <div className="mt-4 md:mt-6 flex flex-col items-center gap-1.5">
                        <Link
                            href="/institutions"
                            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors pt-2"
                        >
                            View all coachings
                            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ValleyBest;

