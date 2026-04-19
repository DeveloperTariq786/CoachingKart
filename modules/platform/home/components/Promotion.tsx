'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAds } from '../hooks/useAds';
import { useAdStore } from '../store/useAdStore';
import { Skeleton } from '@/core/components/ui/skeleton';
import { Button } from '@/core/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/core/lib/utils/utils';

const Promotion: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [hasIntersected, setHasIntersected] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const { isLoading, isError } = useAds(hasIntersected);
    const ads = useAdStore((state) => state.ads);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasIntersected(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!ads || ads.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
        }, 50000); // Change ad every 50 seconds

        return () => clearInterval(interval);
    }, [ads]);

    if (!hasIntersected || isLoading) {
        return (
            <section ref={sectionRef} className="relative w-full h-[300px] md:h-[450px] overflow-hidden bg-slate-100 flex items-center justify-center">
                <Skeleton className="w-full h-full bg-slate-200/60" />
            </section>
        );
    }

    if (isError || !ads || ads.length === 0) {
        return <section ref={sectionRef} className="hidden" />;
    }

    const currentAd = ads[currentIndex];
    const institutionSlug = currentAd.institution?.name.toLowerCase().replace(/\s+/g, '-') || '';

    return (
        <section ref={sectionRef} className="relative w-full h-[300px] md:h-[450px] overflow-hidden group bg-slate-900">
            {ads.map((ad, index) => (
                <div
                    key={ad.id}
                    className={cn(
                        "absolute inset-0 transition-opacity duration-1000",
                        index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                    )}
                >
                    <Image
                        src={ad.image}
                        alt={`Advertisement from ${ad.institution?.name}`}
                        fill
                        className="object-cover transition-transform duration-[10000ms] ease-linear group-hover:scale-105"
                        sizes="100vw"
                        priority={index === 0}
                    />

                    {/* Subtle Dark gradient at the bottom for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10 lg:p-12">
                        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 animate-fade-in">
                            <div>
                                {ad.institution && (
                                    <div className="flex items-center gap-2">
                                        {ad.institution.logo && (
                                            <div className="relative w-6 h-6 rounded-full overflow-hidden bg-white border border-white/20 shadow-sm">
                                                <Image
                                                    src={ad.institution.logo}
                                                    alt={ad.institution.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <span className="text-white/80 font-medium text-xs sm:text-sm tracking-wide">
                                            Sponsored by <span className="text-white font-semibold">{ad.institution.name}</span>
                                        </span>
                                    </div>
                                )}
                            </div>

                            {ad.buttonText && institutionSlug && (
                                <Button
                                    asChild
                                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full px-5 py-2 h-auto text-xs sm:text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 group/btn"
                                >
                                    <Link href={`/${institutionSlug}`}>
                                        {ad.buttonText}
                                        <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Promotion;
