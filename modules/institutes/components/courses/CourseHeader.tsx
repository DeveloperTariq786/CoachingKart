'use client';

import React from 'react';
import { cn } from '@/core/lib/utils/utils';

interface CourseHeaderProps {
    courseTitle?: string;
    subtitle?: string;
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
    courseTitle = "NEET and JEE",
    subtitle = "Explore our academic course offerings for expert-led structured learning.",
    activeTab,
    onTabChange
}) => {
    const tabs = ['Class 11', 'Class 12', 'Class 12+', 'Droppers'];

    return (
        <section className="pt-20 md:pt-28 pb-0 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Main Heading */}
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                    Our <span className="text-primary-600">Classroom</span> courses
                </h1>

                {/* Subtitle */}
                <div className="max-w-2xl mx-auto mb-10 md:mb-16">
                    <p className="text-slate-500 text-sm md:text-base font-medium">
                        {subtitle} Specifically designed for <span className="text-slate-900 font-bold">{courseTitle}</span> aspirants.
                    </p>
                </div>

                {/* Simplified Tabs */}
                <div className="relative w-full max-w-2xl mx-auto">
                    <div className="flex justify-start md:justify-center overflow-x-auto no-scrollbar border-b border-slate-100 gap-6 md:gap-12 px-4 md:px-0">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab;
                            return (
                                <button
                                    key={tab}
                                    onClick={() => onTabChange(tab)}
                                    className={cn(
                                        "pb-3 md:pb-4 text-xs md:text-sm font-bold transition-all duration-300 relative whitespace-nowrap tracking-wide uppercase",
                                        isActive
                                            ? "text-primary-600"
                                            : "text-slate-400 hover:text-slate-600"
                                    )}
                                >
                                    {tab}
                                    {isActive && (
                                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-600 rounded-t-full transition-all duration-300" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CourseHeader;
