'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { cn } from '@/core/lib/utils/utils';
import LecturesSidebar from '@/core/components/layout/LecturesSidebar';
import LecturesBottomNav from '@/core/components/layout/LecturesBottomNav';
import { useLectureStore } from '@/modules/institutes/lectures/store/useLectureStore';
import { Skeleton } from '@/core/components/ui/skeleton';

export default function BatchLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const params = useParams();
    const { batchNames } = useLectureStore();
    const slug = params.slug as string;
    const courseSlug = params.courseSlug as string;
    const batchSlug = params.batchSlug as string;
    const lectureSlug = params.lectureSlug as string;

    const isLecturePage = !!lectureSlug;
    const realBatchName = batchNames[batchSlug];

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
            "flex min-h-screen bg-background pt-14",
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
                            {realBatchName ? (
                                <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight leading-tight">
                                    {realBatchName}
                                </h1>
                            ) : (
                                <Skeleton className="h-9 w-72 bg-slate-100 rounded-lg" />
                            )}
                        </div>
                    )}

                    {children}
                </div>
            </main>
        </div>
    );
}
