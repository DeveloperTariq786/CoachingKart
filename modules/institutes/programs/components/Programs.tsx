'use client';

import React, { useRef } from 'react';
import { cn } from '@/core/lib/utils/utils';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProgramsHeaderProps {
    courseTitle?: string;
    subtitle?: string;
    activeTab: string;
    onTabChange: (tab: string) => void;
    programs?: { name: string }[];
}

const ProgramsHeader: React.FC<ProgramsHeaderProps> = ({
    courseTitle = "NEET and JEE",
    subtitle = "Explore our academic offerings for expert-led structured learning.",
    activeTab,
    onTabChange,
    programs = []
}) => {
    const tabs = programs.length > 0 ? programs.map(p => p.name) : [];
    const tabsRef = useRef<HTMLDivElement>(null);

    const handleScroll = (direction: 'left' | 'right') => {
        if (tabsRef.current) {
            const scrollAmount = 240;
            tabsRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="pt-20 pb-6 bg-background">
            <div className="w-full px-4 sm:px-6 lg:px-10 text-center">

                {/* Badge (Original) */}
                <div className="inline-flex items-center gap-2 bg-white border border-primary-100 shadow-sm text-primary-600 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-4">
                    <BookOpen size={16} />
                    <span>Classroom Programs</span>
                </div>

                {/* Main Heading (Original) */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
                    Our <span className="text-primary-600">Classroom</span> programs
                </h1>

                {/* Subtitle (Original) */}
                <div className="max-w-2xl mx-auto mb-10 md:mb-16">
                    <p className="text-slate-500 text-sm md:text-base font-medium">
                        {subtitle} Specifically designed for{' '}
                        <span className="text-foreground font-bold">{courseTitle}</span> aspirants.
                    </p>
                </div>

                {/* Premium Tabs Carousel Module */}
                <div className="w-full max-w-4xl mx-auto flex items-center gap-3">

                    {/* Left Scroll Button */}
                    <button
                        type="button"
                        onClick={() => handleScroll('left')}
                        className="flex-shrink-0 w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm hover:border-primary-200 hover:text-primary-600 flex items-center justify-center text-slate-500 transition-all cursor-pointer z-10"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={16} className="stroke-[2.5]" />
                    </button>


                    <div
                        ref={tabsRef}
                        className="flex-1 flex justify-start overflow-x-auto no-scrollbar gap-4 pb-px scroll-smooth border-b border-slate-200/60 px-4"
                        role="tablist"
                    >
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab;
                            return (
                                <button
                                    key={tab}
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => onTabChange(tab)}
                                    className={cn(
                                        "pb-3.5 pt-2 px-2 text-sm font-semibold transition-all duration-200 relative whitespace-nowrap tracking-medium cursor-pointer flex-shrink-0 rounded-t-lg",
                                        isActive
                                            ? "text-primary-600 bg-primary-50/30"
                                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/50"
                                    )}
                                >
                                    {tab}
                                    {isActive && (
                                        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary-600 rounded-t-full shadow-[0_-1px_4px_rgba(var(--primary),0.2)]" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Scroll Button */}
                    <button
                        type="button"
                        onClick={() => handleScroll('right')}
                        className="flex-shrink-0 w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm hover:border-primary-200 hover:text-primary-600 flex items-center justify-center text-slate-500 transition-all cursor-pointer z-10"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={16} className="stroke-[2.5]" />
                    </button>

                </div>
            </div>
        </section>
    );
};

export default ProgramsHeader;