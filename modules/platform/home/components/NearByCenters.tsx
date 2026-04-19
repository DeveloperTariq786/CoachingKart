'use client';

import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import { Card, CardContent } from '@/core/components/ui/card';
import { InstitutionCard } from '@/core/components/common';
import { useIntersectionObserver } from '@/core/hooks/useIntersectionObserver';
import { useNearbyInstitutions } from '../hooks/useNearbyInstitutions';

/* ─── Skeleton card for loading state ────────────────────────────── */
const SkeletonCard = () => (
    <Card className="overflow-hidden border-slate-100 rounded-2xl bg-slate-50 h-full flex flex-col">
        <div className="relative h-48 bg-slate-200 animate-pulse" />
        <CardContent className="p-5 flex flex-col flex-grow gap-3">
            <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
            <div className="flex gap-2 mt-1">
                <div className="h-6 w-14 bg-slate-200 rounded-full animate-pulse" />
                <div className="h-6 w-14 bg-slate-200 rounded-full animate-pulse" />
            </div>
            <div className="mt-auto pt-4 border-t border-slate-100">
                <div className="h-11 bg-slate-200 rounded-xl animate-pulse" />
            </div>
        </CardContent>
    </Card>
);

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

    // Decide what to render in the grid
    const isLoadingState = !isVisible || isLoading;
    const showRealData = !isLoadingState && !isError && institutions.length > 0;
    const showFallback = !isLoadingState && (isError || institutions.length === 0);

    return (
        <section ref={sectionRef} className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Nearby Coachings</h2>
                        <p className="mt-3 text-slate-500 text-lg leading-relaxed">
                            {locationDenied
                                ? 'Explore top rated coachings across the country.'
                                : 'Explore top rated coachings in your neighborhood.'}
                        </p>
                    </div>

                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {isLoadingState &&
                        Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}

                    {showRealData &&
                        institutions.slice(0, 4).map((inst) => (
                            <InstitutionCard key={inst.id} tuition={inst} />
                        ))}

                    {showFallback && (
                        <div className="col-span-1 sm:col-span-2 lg:col-span-4 py-12 text-center bg-white rounded-2xl border border-slate-100 flex flex-col items-center justify-center">
                            <p className="text-slate-500 font-medium pb-2 text-lg">No nearby coachings found right now.</p>
                            <p className="text-slate-400 text-sm">We are expanding our network, please check back later or try exploring other areas.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default NearByCenters;
