'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide, Autoplay, Pagination } from '@/core/lib/utils/swiper';
import { Card, CardContent } from '@/core/components/ui/card';
import { Skeleton } from '@/core/components/ui/skeleton';
import { cn } from '@/core/lib/utils/utils';
import { resultService } from '../services/result.service';
import { useResultStore } from '../store/useResultStore';

interface Student {
    id: string;
    name: string;
    rank: string;
    courseName?: string;
    imageUrl: string;
}

interface InstitutionResultsHeaderProps {
    institutionId?: string;
}



const InstitutionResultsHeader: React.FC<InstitutionResultsHeaderProps> = ({ institutionId }) => {
    const { topPerformersCache, setTopPerformers, resultsStatsCache, setResultsStats } = useResultStore();
    const [performers, setPerformers] = React.useState<Student[]>([]);
    const [stats, setStats] = React.useState<{ value: string; label: string }[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isLoadingStats, setIsLoadingStats] = React.useState(false);

    React.useEffect(() => {
        const fetchPerformers = async () => {
            if (!institutionId) return;

            // Check cache first
            if (topPerformersCache[institutionId]) {
                const mapped: Student[] = topPerformersCache[institutionId].map(p => ({
                    id: p.id,
                    name: p.name,
                    rank: p.rank.startsWith('AIR') ? p.rank : `AIR ${p.rank}`,
                    courseName: p.course?.name,
                    imageUrl: p.profile
                }));
                setPerformers([...mapped, ...mapped]);
                return;
            }

            try {
                setIsLoading(true);
                const response = await resultService.getTopPerformers(institutionId);
                if (response.success && response.data.length > 0) {
                    setTopPerformers(institutionId, response.data);
                    const mapped: Student[] = response.data.map(p => ({
                        id: p.id,
                        name: p.name,
                        rank: p.rank.startsWith('AIR') ? p.rank : `AIR ${p.rank}`,
                        courseName: p.course?.name,
                        imageUrl: p.profile
                    }));
                    setPerformers([...mapped, ...mapped]);
                } else {
                    setPerformers([]);
                }
            } catch (error) {
                console.error("Error fetching performers:", error);
                setPerformers([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPerformers();
    }, [institutionId, topPerformersCache, setTopPerformers]);

    React.useEffect(() => {
        const fetchStats = async () => {
            if (!institutionId) return;

            // Check cache
            if (resultsStatsCache[institutionId]) {
                const mapped = resultsStatsCache[institutionId].map(s => ({
                    value: s.qualifiedCount.toString() + (s.qualifiedCount > 100 ? '+' : '') + '*',
                    label: `${s.course} Qualifiers`
                }));
                setStats(mapped);
                return;
            }

            try {
                setIsLoadingStats(true);
                const response = await resultService.getResultsStats(institutionId);
                if (response.success && response.data.length > 0) {
                    setResultsStats(institutionId, response.data);
                    const mapped = response.data.map(s => ({
                        value: s.qualifiedCount.toString() + (s.qualifiedCount > 100 ? '+' : '') + '*',
                        label: `${s.course} Qualifiers`
                    }));
                    setStats(mapped);
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setIsLoadingStats(false);
            }
        };

        fetchStats();
    }, [institutionId, resultsStatsCache, setResultsStats]);

    // Use real data only
    const displayPerformers = performers;

    return (
        <div className="relative pt-24 lg:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="grid grid-cols-12 h-full">
                    {[...Array(24)].map((_, i) => (
                        <div key={i} className="border-r border-b border-slate-200" />
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight uppercase">
                    Our <span className="text-primary-600 block sm:inline">Achievements</span>
                </h2>
                <p className="text-sm md:text-base text-slate-500 mb-10 font-medium max-w-xl mx-auto">
                    We are setting new benchmarks of excellence year after year.
                </p>

                {/* Swiper Slider Section - Robust Infinite Loop */}
                <div className="relative w-full max-w-4xl mx-auto pb-8">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={15}
                        slidesPerView={1.8}
                        centeredSlides={true}
                        loop={displayPerformers.length > 1}
                        speed={1000}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: false
                        }}
                        pagination={{ clickable: true, el: '.custom-pagination' }}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: 4.5 },
                        }}
                        className="!overflow-visible"
                    >
                        {isLoading ? (
                            [...Array(5)].map((_, idx) => (
                                <SwiperSlide key={`skeleton-${idx}`}>
                                    <div className="scale-90 opacity-40 grayscale blur-[0.5px]">
                                        <Card className="overflow-hidden border-2 border-white shadow-xl rounded-3xl bg-slate-50">
                                            <CardContent className="p-0 relative aspect-[4/5]">
                                                <Skeleton className="w-full h-full" />
                                                <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm rounded-xl p-2.5 shadow-md flex flex-col items-center gap-1.5">
                                                    <Skeleton className="h-5 w-1/2" />
                                                    <Skeleton className="h-3 w-3/4" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </SwiperSlide>
                            ))
                        ) : (
                            displayPerformers.map((student, idx) => (
                                <SwiperSlide key={`${student.id}-${idx}`}>
                                    {({ isActive }) => (
                                        <div className={cn(
                                            "relative transition-all duration-700 ease-in-out transform",
                                            isActive ? "scale-105 opacity-100 z-10" : "scale-90 opacity-40 grayscale blur-[0.5px]"
                                        )}>
                                            <Card className="overflow-hidden border-2 border-white shadow-xl rounded-3xl bg-slate-50">
                                                <CardContent className="p-0 relative aspect-[4/5]">
                                                    <Image src={student.imageUrl} alt={student.name} fill className="object-cover" />

                                                    {/* Float Info Card */}
                                                    <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm rounded-xl p-2.5 shadow-md flex flex-col items-center">
                                                        <div className="flex items-center leading-tight">
                                                            <p className="text-lg font-black text-primary-500 flex items-baseline gap-1.5">
                                                                {student.rank}
                                                                {student.courseName && (
                                                                    <span className="text-[9px] font-bold text-primary-500/80 uppercase italic">
                                                                        ({student.courseName})
                                                                    </span>
                                                                )}
                                                            </p>
                                                        </div>
                                                        <p className="text-[10px] font-bold text-slate-800 uppercase tracking-tighter line-clamp-1 text-center border-t border-slate-100 pt-1 w-full mt-0.5">
                                                            {student.name}
                                                        </p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )}
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>

                    {/* Custom Pagination */}
                    <div className="custom-pagination flex justify-center gap-1.5 mt-10 [&_.swiper-pagination-bullet]:w-6 [&_.swiper-pagination-bullet]:h-1 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-slate-200 [&_.swiper-pagination-bullet-active]:bg-primary-500 [&_.swiper-pagination-bullet-active]:w-8 transition-all" />
                </div>

                {/* Smaller Stats Bar */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 py-8 px-4 max-w-4xl mx-auto divide-x divide-slate-100">
                    {isLoadingStats ? (
                        [...Array(4)].map((_, i) => (
                            <div key={i} className="text-center px-2 flex flex-col items-center gap-2">
                                <Skeleton className="h-6 w-12" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        ))
                    ) : (
                        stats.map((stat, i) => (
                            <div key={i} className="text-center px-2 first:divide-none">
                                <p className="text-xl md:text-2xl font-black text-primary-600 mb-0.5">{stat.value}</p>
                                <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">{stat.label}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstitutionResultsHeader;
