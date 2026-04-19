'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/core/components/ui/button';
import { Badge } from '@/core/components/ui/badge';
import { Card, CardContent } from '@/core/components/ui/card';
import { useRouter } from 'next/navigation';
import { MapPin } from 'lucide-react';
import { useInstitutions } from '../../institutions/hooks/useInstitutions';
import { Skeleton } from '@/core/components/ui/skeleton';

const QualifiersChoice: React.FC = () => {
    const router = useRouter();
    const sectionRef = useRef<HTMLElement>(null);
    const [hasIntersected, setHasIntersected] = useState(false);

    const { isLoading, isError, data: response } = useInstitutions(
        { limit: 10, sortBy: 'rankHolders' },
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
            <section ref={sectionRef} className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <Skeleton className="h-10 w-64 mb-4" />
                        <Skeleton className="h-6 w-96" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {[1, 2].map((i) => (
                            <div key={i} className="h-64 bg-slate-50 rounded-2xl flex border border-slate-100 overflow-hidden shadow-sm">
                                <Skeleton className="w-28 xs:w-36 sm:w-56 bg-slate-100/80 rounded-none shrink-0" />
                                <div className="flex-1 p-6 space-y-4 flex flex-col justify-center">
                                    <Skeleton className="h-8 w-3/4 bg-slate-100 rounded-lg" />
                                    <Skeleton className="h-4 w-1/2 bg-slate-100 rounded-lg" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-6 w-16 rounded-full bg-slate-100" />
                                        <Skeleton className="h-6 w-16 rounded-full bg-slate-100" />
                                    </div>
                                    <div className="pt-4 mt-auto">
                                        <Skeleton className="h-12 w-full rounded-xl bg-slate-100/60" />
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
        return <section ref={sectionRef} className="py-20 bg-white" />;
    }

    // Take first 4 for the 2-column grid layout as per original intention or design
    const choiceTuitions = response.data.slice(0, 4);

    return (
        <section ref={sectionRef} className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Qualifiers choice</h2>
                        <p className="mt-3 text-slate-500 text-lg leading-relaxed">
                            Handpicked premium centers with proven track records.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {choiceTuitions.map((tuition) => {
                        const slug = tuition.slug;
                        const displayImage = tuition.coverImage || tuition.logo;

                        return (
                            <Card
                                key={tuition.id}
                                className="group bg-slate-50 rounded-2xl border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 overflow-hidden flex flex-row relative outline-none"
                            >
                                {/* Decorative Circle */}
                                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-slate-200 rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>

                                {/* Left Side: Image Area */}
                                <div className="relative w-28 xs:w-36 sm:w-56 flex-shrink-0 overflow-hidden">
                                    {displayImage && (
                                        <Image
                                            src={displayImage}
                                            alt={tuition.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            sizes="(max-width: 640px) 150px, 300px"
                                        />
                                    )}

                                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                                        <Badge className="bg-primary-600 hover:bg-primary-700 font-bold uppercase tracking-wider text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded-md shadow-lg border-none whitespace-nowrap">
                                            Qualifiers Choice
                                        </Badge>
                                    </div>
                                </div>

                                {/* Right Side: Content Area */}
                                <CardContent className="flex-1 p-3 sm:p-6 flex flex-col min-w-0 pt-3 sm:pt-6 bg-transparent border-none shadow-none">
                                    <div className="mb-1 sm:mb-2">
                                        <h3 className="text-sm sm:text-lg md:text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors block leading-tight truncate sm:whitespace-normal">
                                            {tuition.name}
                                        </h3>
                                    </div>

                                    <div className="flex items-center text-slate-500 text-[10px] sm:text-sm mb-2 sm:mb-3">
                                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1 flex-shrink-0 text-slate-400" />
                                        <span className="truncate">{tuition.location.city}, {tuition.location.country}</span>
                                    </div>

                                    <p className="text-[10px] sm:text-sm text-slate-500 line-clamp-1 sm:line-clamp-2 mb-2 sm:mb-4 leading-normal sm:leading-relaxed">
                                        {tuition.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-6">
                                        {tuition.courses.slice(0, 3).map((course) => (
                                            <span key={course.id} className="bg-white text-slate-600 text-[8px] sm:text-[10px] font-bold uppercase tracking-tight px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm">
                                                {course.name}
                                            </span>
                                        ))}
                                        {tuition.courses.length > 3 && (
                                            <span className="bg-white/50 text-slate-400 text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                +{tuition.courses.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-auto">
                                        <Button
                                            onClick={() => router.push(`/${slug}`)}
                                            className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-bold transition-all duration-300 shadow-md hover:shadow-primary-500/20 active:scale-95 h-auto cursor-pointer"
                                        >
                                            Explore Choice
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default QualifiersChoice;

