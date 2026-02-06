'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { cn } from '@/core/lib/utils/utils';
import LecturesSidebar from '@/modules/institutes/layout/LecturesSidebar';
import LecturesBottomNav from '@/modules/institutes/layout/LecturesBottomNav';

export default function BatchLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const params = useParams();
    const slug = params.slug as string;
    const courseSlug = params.courseSlug as string;
    const batchSlug = params.batchSlug as string;
    const lectureSlug = params.lectureSlug as string;

    const isLecturePage = !!lectureSlug;

    // Helper to format slug to readable text
    const formatSlug = (str: string) => {
        if (!str) return '';
        return str
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div className={cn(
            "flex min-h-screen bg-[#F8FAFC] pt-14",
            !isLecturePage && "pb-20 lg:pb-0"
        )}>
            {/* Sidebar */}
            {!isLecturePage && <LecturesSidebar />}

            {/* Mobile Bottom Nav */}
            {!isLecturePage && <LecturesBottomNav />}

            {/* Main Content */}
            <main className={cn(
                "flex-1",
                isLecturePage
                    ? "lg:h-[calc(100vh-56px)] lg:overflow-hidden p-4 lg:p-6 overflow-y-auto"
                    : "p-8 lg:p-12 overflow-y-auto",
                !isLecturePage && "lg:ml-64"
            )}>
                <div className={cn(
                    "mx-auto min-h-[calc(100vh-200px)]",
                    isLecturePage ? "max-w-[1400px]" : "max-w-[1200px]"
                )}>

                    {/* Dynamic Page Header */}
                    {!isLecturePage && (
                        <div className="mb-8">
                            <div className="flex items-center flex-wrap gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2">
                                <span>{formatSlug(slug)}</span>
                                <span className="w-1 h-1 bg-slate-200 rounded-full hidden sm:block" />
                                <span className="hidden sm:block">{formatSlug(courseSlug)}</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                                {formatSlug(batchSlug)}
                            </h1>
                        </div>
                    )}

                    {children}
                </div>
            </main>
        </div>
    );
}
