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
            <section ref={sectionRef} className="py-16 bg-white border-b border-slate-100">
                <div className="w-full px-4 sm:px-6 lg:px-10">
                    {/* Header skeleton */}
                    <div className="text-center mb-12 flex flex-col items-center justify-center">
                        <Skeleton className="h-10 w-64 mb-4 bg-slate-200" />
                        <Skeleton className="h-6 w-96 bg-slate-200" />
                    </div>
                    {/* Grid skeleton */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50 p-6 min-h-[170px]">
                                <Skeleton className="h-5 w-1/3 mb-4 bg-slate-200" />
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Skeleton className="h-6 w-20 rounded-full bg-slate-200" />
                                    <Skeleton className="h-6 w-16 rounded-full bg-slate-200" />
                                </div>
                                <Skeleton className="h-4 w-1/3 bg-slate-200" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (isError || !courses || courses.length === 0) {
        return <section ref={sectionRef} className="py-16 bg-white border-b border-slate-100" />;
    }

    return (
        <section ref={sectionRef} className="py-16 bg-white border-b border-slate-100">
            <div className="w-full px-4 sm:px-6 lg:px-10">

                {/* Section Header */}
                <div className="flex flex-col items-center justify-center text-center mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Exam Categories</h2>
                        <p className="mt-3 text-slate-500 text-lg leading-relaxed">
                            Explore coaching institutes offering diverse courses designed for your aspirations.
                        </p>
                    </div>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
                                className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 pr-24 cursor-pointer group transition-all duration-200 hover:shadow-md hover:border-primary-200 min-h-[170px] flex flex-col"
                            >
                                {/* Course name */}
                                <h3 className="text-base font-semibold text-slate-900 mb-3 group-hover:text-primary-700 transition-colors z-10 relative">
                                    {course.name}
                                </h3>

                                {/* Sub-tags */}
                                {tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4 z-10 relative">
                                        {tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs text-slate-500 border border-slate-200 rounded-full px-3 py-1 bg-white"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Institute count */}
                                {course.centerCount != null && (
                                    <p className="text-xs text-slate-400 mb-3 z-10 relative">
                                        {course.centerCount}+ Institutes
                                    </p>
                                )}

                                {/* Explore link */}
                                <div className="mt-auto flex items-center gap-1.5 text-sm text-slate-500 group-hover:text-primary-600 transition-colors z-10 relative">
                                    <span>Explore Category</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                </div>

                                {/* Decorative half-circle blob — full height on the right */}
                                <div
                                    className={`absolute top-0 -right-20 h-full aspect-square rounded-full ${tint} opacity-90 pointer-events-none`}
                                />
                                {/* Icon centered inside the blob */}
                                <div className={`absolute top-1/2 -translate-y-1/2 right-4 flex items-center justify-center w-16 h-16 pointer-events-none ${iconColor}`}>
                                    {isUrl ? (
                                        <div className="relative w-12 h-12">
                                            <Image
                                                src={course.icon}
                                                alt={course.name}
                                                fill
                                                priority
                                                className="object-contain"
                                            />
                                        </div>
                                    ) : (
                                        IconComponent && <IconComponent size={48} strokeWidth={1.25} />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View More Button */}
                {hasMore && (
                    <div className="text-center mt-8">
                        <button
                            onClick={() => setLimit((prev) => prev + 8)}
                            disabled={isFetching}
                            className="inline-block text-primary-600 font-bold hover:underline underline-offset-4 decoration-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
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