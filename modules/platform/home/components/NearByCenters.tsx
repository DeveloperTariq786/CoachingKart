'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import { InstitutionCard } from '@/core/components/common';
import { useIntersectionObserver } from '@/core/hooks/useIntersectionObserver';
import { useNearbyInstitutions } from '../hooks/useNearbyInstitutions';


/* ─── Main Section ───────────────────────────────────────────────── */
const NearByCenters: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({
        triggerOnce: true,
        threshold: 0.1,
    });

    const {
        institutions,
        isLoading,
        isError,
        locationDenied,
        requestLocation,
    } = useNearbyInstitutions(isVisible);

    const isLoadingState = !isVisible || isLoading;
    const showRealData = !isLoadingState && !isError && institutions.length > 0;
    const showFallback = !isLoadingState && (isError || institutions.length === 0);

    return (
        <section ref={sectionRef} className="py-24 bg-slate-50">
            <div className="w-full px-4 sm:px-6 lg:px-10">

                {/* Location prompt banner */}
                {locationDenied && (
                    <div className="mb-8 flex items-center justify-between gap-4 rounded-xl border border-primary-100 bg-primary-50/50 px-5 py-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-100">
                                <MapPin className="h-4 w-4 text-primary-600" />
                            </div>
                            <p className="text-sm text-slate-600">
                                Allow location access to view accurate institutions near you.
                            </p>
                        </div>
                        <Button
                            onClick={requestLocation}
                            size="sm"
                            className="shrink-0 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 cursor-pointer"
                        >
                            Allow Location
                        </Button>
                    </div>
                )}

                <div className="flex flex-col items-center justify-center text-center mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Nearby Coachings</h2>
                        <p className="mt-3 text-slate-500 text-lg leading-relaxed">
                            {locationDenied
                                ? 'Explore top rated coachings across the country.'
                                : 'Discover trusted coaching institutes conveniently located near you.'}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-4">
                    {isLoadingState &&
                        Array.from({ length: 10 }).map((_, i) => (
                            <InstitutionCard key={`skeleton-${i}`} isLoading />
                        ))}


                    {showRealData &&
                        institutions.slice(0, 10).map((inst) => (
                            <InstitutionCard key={inst.id} tuition={inst} />
                        ))}

                    {showFallback && (
                        <div className="col-span-1 sm:col-span-2 lg:col-span-4 py-12 text-center bg-white rounded-2xl border border-slate-100 flex flex-col items-center justify-center">
                            <p className="text-slate-500 font-medium pb-2 text-lg">No nearby coachings found right now.</p>
                            <p className="text-slate-400 text-sm">We are expanding our network, please check back later or try exploring other areas.</p>
                        </div>
                    )}
                </div>

                {/* ─── View All Link ─────────────────────────────────────── */}
                {showRealData && (
                    <div className="mt-6 flex flex-col items-center gap-1.5">

                        <Link
                            href="/institutions"
                            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors pt-2"
                        >
                            View all coachings
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                )}

            </div>
        </section>
    );
};

export default NearByCenters;