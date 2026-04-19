'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCourses } from '../hooks/useCourses';
import { useCourseStore } from '../store/useCourseStore';
import { Skeleton } from '@/core/components/ui/skeleton';

const InstitutionCourses: React.FC = () => {
    const router = useRouter();
    const sectionRef = useRef<HTMLElement>(null);
    const [hasIntersected, setHasIntersected] = useState(false);

    const { isLoading, isError } = useCourses(hasIntersected);
    const courses = useCourseStore((state) => state.courses);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasIntersected(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '100px' } // Start loading slightly before it's visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = 300;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    if (!hasIntersected || isLoading) {
        return (
            <section ref={sectionRef} className="py-16 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Browse by Categories</h2>
                    <div className="flex gap-4 md:gap-6 overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex-none w-40 md:w-48">
                                <div className="flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-100 rounded-2xl h-full">
                                    <Skeleton className="w-12 h-12 rounded-full mb-4 bg-slate-200" />
                                    <Skeleton className="h-4 w-3/4 mb-2 bg-slate-200" />
                                    <Skeleton className="h-3 w-1/2 bg-slate-200" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (isError || !courses || courses.length === 0) {
        return (
            <section ref={sectionRef} className="py-16 bg-white border-b border-slate-100" />
        );
    }

    return (
        <section ref={sectionRef} className="py-16 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Browse by Categories</h2>

                <div className="relative group">

                    {/* Left Arrow - Desktop Only */}
                    <button
                        onClick={() => scroll('left')}
                        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-lg border border-slate-100 rounded-full items-center justify-center text-slate-600 hover:text-primary-600 hover:scale-105 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-4 md:gap-6 pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 snap-x scroll-smooth"
                    >
                        {courses.map((course) => {
                            const isUrl = course.icon.startsWith('http') || course.icon.startsWith('/');

                            return (
                                <div
                                    key={course.id}
                                    onClick={() => router.push(`/institutions?courseName=${course.name.replace(/\s+/g, '+')}`)}
                                    className="flex-none w-40 md:w-48 snap-start group/card cursor-pointer"
                                >
                                    <div className="flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-100 rounded-2xl transition-all duration-300 group-hover/card:shadow-md group-hover/card:border-primary-200 group-hover/card:bg-primary-50 h-full">
                                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-500 mb-4 group-hover/card:text-primary-600 group-hover/card:scale-110 transition-transform relative overflow-hidden">
                                            {isUrl ? (
                                                <div className="relative w-6 h-6">
                                                    <Image
                                                        src={course.icon}
                                                        alt={course.name}
                                                        fill
                                                        priority
                                                        className="object-contain"
                                                    />
                                                </div>
                                            ) : (
                                                (() => {
                                                    const IconComponent = (LucideIcons as any)[course.icon] || LucideIcons.HelpCircle;
                                                    return <IconComponent size={24} />;
                                                })()
                                            )}
                                        </div>
                                        <h3 className="text-sm font-semibold text-slate-900 text-center mb-1 group-hover/card:text-primary-700">{course.name}</h3>
                                        <p className="text-xs text-slate-500 text-center">{course.centerCount}+ Institutes</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Arrow - Desktop Only */}
                    <button
                        onClick={() => scroll('right')}
                        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-lg border border-slate-100 rounded-full items-center justify-center text-slate-600 hover:text-primary-600 hover:scale-105 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Fade effect on right for scrolling indication on mobile */}
                    <div className="md:hidden absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
};

export default InstitutionCourses;

