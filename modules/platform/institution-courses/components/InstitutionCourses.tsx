'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useCourses } from '../hooks/useCourses';
import { useCourseStore } from '../store/useCourseStore';
import { Skeleton } from '@/core/components/ui/skeleton';

// Soft background tints cycling per card
const CARD_TINTS = [
    'bg-rose-50',
    'bg-amber-50',
    'bg-yellow-50',
    'bg-violet-50',
    'bg-sky-50',
    'bg-blue-50',
];

const ICON_COLORS = [
    'text-rose-400',
    'text-amber-400',
    'text-yellow-500',
    'text-violet-400',
    'text-sky-400',
    'text-blue-400',
];

const InstitutionCourses: React.FC = () => {
    const router = useRouter();
    const sectionRef = useRef<HTMLElement>(null);
    const [hasIntersected, setHasIntersected] = useState(false);
    const [limit, setLimit] = useState(8);

    const { isLoading, isError, data: coursesResponse, isFetching } = useCourses(limit, hasIntersected);
    const courses = useCourseStore((state) => state.courses);

    const hasMore = coursesResponse?.pagination
        ? courses.length < coursesResponse.pagination.total
        : false;

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
            <section ref={sectionRef} className="py-6 sm:py-8 md:py-16 bg-white border-b border-slate-100">
                <div className="w-full px-4 sm:px-6 lg:px-10">
                    {/* Header skeleton */}
                    <div className="text-center mb-5 sm:mb-6 md:mb-12 flex flex-col items-center justify-center">
                        <Skeleton className="h-7 sm:h-8 md:h-10 w-44 md:w-64 mb-1.5 sm:mb-2 md:mb-4 bg-slate-200" />
                        <Skeleton className="h-3.5 sm:h-4 md:h-6 w-56 md:w-96 bg-slate-200" />
                    </div>
                    {/* Grid skeleton */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="rounded-xl sm:rounded-2xl border border-slate-100 bg-slate-50 p-3.5 sm:p-5 md:p-6 min-h-[110px] sm:min-h-[140px] md:min-h-[170px]">
                                <Skeleton className="h-4 sm:h-5 w-1/3 mb-2 sm:mb-3 md:mb-4 bg-slate-200" />
                                <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 mb-2 sm:mb-3 md:mb-4">
                                    <Skeleton className="h-4 sm:h-5 md:h-6 w-14 sm:w-16 md:w-20 rounded-full bg-slate-200" />
                                    <Skeleton className="h-4 sm:h-5 md:h-6 w-10 sm:w-12 md:w-16 rounded-full bg-slate-200" />
                                </div>
                                <Skeleton className="h-3 sm:h-3.5 md:h-4 w-1/3 bg-slate-200" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (isError || !courses || courses.length === 0) {
        return <section ref={sectionRef} className="py-6 sm:py-8 md:py-16 bg-white border-b border-slate-100" />;
    }

    return (
        <section ref={sectionRef} className="py-6 sm:py-8 md:py-16 bg-white border-b border-slate-100">
            <div className="w-full px-4 sm:px-6 lg:px-10">

                {/* Section Header */}
                <div className="flex flex-col items-center justify-center text-center mb-5 sm:mb-6 md:mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Exam Categories</h2>
                        <p className="mt-1.5 sm:mt-2 md:mt-3 text-slate-500 text-xs sm:text-base md:text-lg leading-relaxed">
                            Explore coaching institutes offering diverse courses designed for your aspirations.
                        </p>
                    </div>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                    {courses.map((course, index) => {
                        const isUrl = course.icon.startsWith('http') || course.icon.startsWith('/');
                        const tint = CARD_TINTS[index % CARD_TINTS.length];
                        const iconColor = ICON_COLORS[index % ICON_COLORS.length];
                        const IconComponent = !isUrl
                            ? (LucideIcons as any)[course.icon] || LucideIcons.HelpCircle
                            : null;

                        // sub-tags: support optional `tags` field or fall back to empty
                        const tags: string[] = (course as any).tags ?? [];

                        return (
                            <div
                                key={course.id}
                                onClick={() =>
                                    router.push(
                                        `/institutions?courseName=${course.name.replace(/\s+/g, '+')}`
                                    )
                                }
                                className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-slate-100 bg-white p-3.5 sm:p-5 md:p-6 pr-16 sm:pr-24 cursor-pointer group transition-all duration-200 hover:shadow-md hover:border-primary-200 min-h-[110px] sm:min-h-[140px] md:min-h-[170px] flex flex-col justify-between"
                            >
                                <div>
                                    {/* Course name */}
                                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-1.5 sm:mb-2 md:mb-3 group-hover:text-primary-700 transition-colors z-10 relative pr-2">
                                        {course.name}
                                    </h3>

                                    {/* Sub-tags */}
                                    {tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 mb-2 sm:mb-2.5 md:mb-4 z-10 relative">
                                            {tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[10px] sm:text-xs text-slate-500 border border-slate-200 rounded-full px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-0.5 md:py-1 bg-white"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Institute count */}
                                    {course.centerCount != null && (
                                        <p className="text-[11px] sm:text-xs text-slate-400 mb-1.5 sm:mb-2 md:mb-3 z-10 relative">
                                            {course.centerCount}+ Institutes
                                        </p>
                                    )}
                                </div>

                                {/* Explore link */}
                                <div className="mt-auto flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 group-hover:text-primary-600 transition-colors z-10 relative">
                                    <span>Explore Category</span>
                                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform md:w-3.5 md:h-3.5" />
                                </div>

                                {/* Decorative half-circle blob — full height on the right */}
                                <div
                                    className={`absolute top-0 -right-10 sm:-right-16 md:-right-20 h-full aspect-square rounded-full ${tint} opacity-90 pointer-events-none`}
                                />
                                {/* Icon centered inside the blob */}
                                <div className={`absolute top-1/2 -translate-y-1/2 right-2.5 sm:right-3 md:right-4 flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 pointer-events-none ${iconColor}`}>
                                    {isUrl ? (
                                        <div className="relative w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12">
                                            <Image
                                                src={course.icon}
                                                alt={course.name}
                                                fill
                                                priority
                                                className="object-contain"
                                            />
                                        </div>
                                    ) : (
                                        IconComponent && <IconComponent size={26} className="sm:w-10 sm:h-10 md:w-12 md:h-12" strokeWidth={1.25} />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View More Button */}
                {hasMore && (
                    <div className="text-center mt-5 sm:mt-6 md:mt-8">
                        <button
                            onClick={() => setLimit((prev) => prev + 8)}
                            disabled={isFetching}
                            className="inline-block text-primary-600 font-bold hover:underline underline-offset-4 decoration-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs md:text-sm"
                        >
                            {isFetching ? 'Loading...' : 'View More'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default InstitutionCourses;