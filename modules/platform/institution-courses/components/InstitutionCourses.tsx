'use client';

import React, { useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '@/core/constants';

const InstitutionCourses: React.FC = () => {
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

    return (
        <section className="py-16 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Browse by Categories</h2>

                <div className="relative group">

                    {/* Left Arrow - Desktop Only */}
                    <button
                        onClick={() => scroll('left')}
                        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-lg border border-slate-100 rounded-full items-center justify-center text-slate-600 hover:text-primary-600 hover:scale-105 transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-4 md:gap-6 pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 snap-x scroll-smooth"
                    >
                        {CATEGORIES.map((category) => {
                            // Dynamically get the icon component
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const IconComponent = (LucideIcons as any)[category.iconName] || LucideIcons.HelpCircle;

                            return (
                                <div
                                    key={category.id}
                                    className="flex-none w-40 md:w-48 snap-start group/card cursor-pointer"
                                >
                                    <div className="flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-100 rounded-2xl transition-all duration-300 group-hover/card:shadow-md group-hover/card:border-primary-200 group-hover/card:bg-primary-50 h-full">
                                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-500 mb-4 group-hover/card:text-primary-600 group-hover/card:scale-110 transition-transform">
                                            <IconComponent size={24} />
                                        </div>
                                        <h3 className="text-sm font-semibold text-slate-900 text-center mb-1 group-hover/card:text-primary-700">{category.name}</h3>
                                        <p className="text-xs text-slate-500">{category.count}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Arrow - Desktop Only */}
                    <button
                        onClick={() => scroll('right')}
                        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-lg border border-slate-100 rounded-full items-center justify-center text-slate-600 hover:text-primary-600 hover:scale-105 transition-all opacity-0 group-hover:opacity-100"
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
