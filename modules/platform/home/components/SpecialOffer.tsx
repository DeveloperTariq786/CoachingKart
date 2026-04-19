'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import { useRouter } from 'next/navigation';
import { useOffers } from '../hooks/useOffers';
import { Skeleton } from '@/core/components/ui/skeleton';

const SpecialOffer: React.FC = () => {
    const router = useRouter();
    const sectionRef = useRef<HTMLElement>(null);
    const [hasIntersected, setHasIntersected] = useState(false);

    const { data: response, isLoading } = useOffers(hasIntersected);
    const offer = response?.data?.[0]; // Show the first active offer

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

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

    useEffect(() => {
        if (!offer?.remainingSeconds) return;

        let totalSeconds = offer.remainingSeconds;

        const timer = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(timer);
                return;
            }

            totalSeconds--;

            const d = Math.floor(totalSeconds / (3600 * 24));
            const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
            const m = Math.floor((totalSeconds % 3600) / 60);
            const s = Math.floor(totalSeconds % 60);

            setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
        }, 1000);

        return () => clearInterval(timer);
    }, [offer]);

    const timeBlocks = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
    ];

    // Loading/Initial state
    if (!hasIntersected || isLoading) {
        return (
            <section ref={sectionRef} className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden relative min-h-[500px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 opacity-50">
                    <div className="flex-1 space-y-6">
                        <Skeleton className="h-8 w-48 bg-white/20" />
                        <Skeleton className="h-16 w-full bg-white/20" />
                        <Skeleton className="h-4 w-3/4 bg-white/20" />
                        <Skeleton className="h-12 w-40 bg-white/20 rounded-full" />
                    </div>
                    <div className="flex-1 w-full max-w-lg">
                        <Skeleton className="h-80 w-full bg-white/20 rounded-3xl" />
                    </div>
                </div>
            </section>
        );
    }

    // If loading is finished and there's no offer, don't show the section
    if (!offer) {
        return null;
    }

    return (
        <section ref={sectionRef} className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden relative">

            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500 opacity-20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24">

                    {/* Left: Text Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <div className="hidden lg:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-blue-50 text-xs font-semibold tracking-wide uppercase mb-6">
                            <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></span>
                            Limited Time Admission Offer
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                            {offer.title}
                        </h2>

                        <p className="text-lg text-blue-100 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                            {offer.description}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <Button
                                onClick={() => {
                                    const slug = offer.institution.name.toLowerCase().replace(/\s+/g, '-');
                                    router.push(`/${slug}`);
                                }}
                                className="h-14 px-8 rounded-full bg-white text-primary-700 font-bold text-base shadow-xl hover:bg-blue-50 hover:scale-105 transition-all duration-300 group cursor-pointer"
                            >
                                <GraduationCap className="mr-2 w-5 h-5 text-primary-600" />
                                Claim Offer Now
                            </Button>
                        </div>
                    </div>

                    {/* Right: Countdown & Visual Card */}
                    <div className="flex-1 w-full max-w-lg">
                        {/* Mobile Badge: Show only on small screens */}
                        <div className="lg:hidden flex justify-center mb-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-blue-50 text-xs font-semibold tracking-wide uppercase">
                                <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></span>
                                Limited Time Admission Offer
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden group hover:bg-white/15 transition-all duration-500">

                            {/* Glass Reflective Effect */}
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>

                            <div className="text-center mb-8">
                                <p className="text-blue-100 text-sm font-medium uppercase tracking-widest mb-2">Offer Ends In</p>
                                <div className="flex justify-between items-center bg-black/20 rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/5">
                                    {timeBlocks.map((block, index) => (
                                        <div key={block.label} className="flex flex-col items-center flex-1">
                                            <span className="text-3xl md:text-4xl font-bold text-white tabular-nums leading-none mb-1">
                                                {block.value.toString().padStart(2, '0')}
                                            </span>
                                            <span className="text-[10px] uppercase font-medium text-blue-200/70 tracking-wider">
                                                {block.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="text-2xl font-bold text-white mb-1">{offer.discount}% OFF</div>
                                    <div className="text-xs text-blue-100 font-medium">at {offer.institution.name}</div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="text-2xl font-bold text-white mb-1">Free</div>
                                    <div className="text-xs text-blue-100 font-medium">Orientation Session</div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SpecialOffer;
