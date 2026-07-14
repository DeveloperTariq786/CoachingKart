'use client';

import React from 'react';
import Image from 'next/image';
import { Trophy } from 'lucide-react';
import { Swiper, SwiperSlide, Autoplay, Pagination } from '@/core/lib/utils/swiper';
import { Card, CardContent } from '@/core/components/ui/card';
import { Skeleton } from '@/core/components/ui/skeleton';
import { cn } from '@/core/lib/utils/utils';
import { getOptimizedImageUrl } from '@/core/lib/utils/image-utils';
import { useInstitute } from '@/modules/institutes/institute/hooks/useInstitute';
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
    const { details } = useInstitute();
    const primaryColor = details?.theme?.primary || '#0ea5e9';
    const { topPerformersCache, setTopPerformers, resultsStatsCache, setResultsStats } = useResultStore();
    const [performers, setPerformers] = React.useState<Student[]>([]);
    const [stats, setStats] = React.useState<{ value: string; label: string }[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isLoadingStats, setIsLoadingStats] = React.useState(false);

    React.useEffect(() => {
        const fetchPerformers = async () => {
            if (!institutionId) return;

            if (topPerformersCache[institutionId]) {
                const mapped: Student[] = topPerformersCache[institutionId].map(p => ({
                    id: p.id,
                    name: p.name,
                    rank: p.rank.startsWith('AIR') ? p.rank : `AIR ${p.rank}`,
                    courseName: p.course?.name,
                    imageUrl: p.profile
                }));
                setPerformers(mapped);
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
                    setPerformers(mapped);
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

    const displayPerformers = performers;

    return (
        <div
            className="relative pt-12 lg:pt-16 pb-16 px-4 sm:px-6 lg:px-10 bg-white overflow-hidden"
            style={{
                '--primary-500': primaryColor,
                '--institution-primary': primaryColor,
            } as React.CSSProperties}
        >
            {/* Inject pagination styles scoped to institution primary color */}
            <style>{`
                .institution-pagination .swiper-pagination-bullet {
                    width: 8px;
                    height: 8px;
                    border-radius: 9999px;
                    background: #e2e8f0;
                    opacity: 1;
                    transition: all 0.3s ease;
                }
                .institution-pagination .swiper-pagination-bullet-active {
                    background: ${primaryColor} !important;
                    width: 8px;
                    height: 8px;
                }
            `}</style>

            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="grid grid-cols-12 h-full">
                    {[...Array(24)].map((_, i) => (
                        <div key={i} className="border-r border-b border-slate-200" />
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
                <span
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-background px-4 py-1.5 rounded-full mb-4 border border-foreground/10 shadow-sm"
                    style={{ color: primaryColor }}
                >
                    <Trophy size={14} style={{ color: primaryColor }} />
                    Our Achievements
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                    Our{' '}
                    <span className="block sm:inline" style={{ color: primaryColor }}>
                        Achievements
                    </span>
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-[17px] leading-relaxed mb-10">
                    We are setting new benchmarks of excellence year after year.
                </p>

                {/* Swiper Slider Section */}
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
                        pagination={{ clickable: true, el: '.institution-pagination' }}
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
                                            <CardContent className="p-0 relative aspect-[3/4]">
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
                                                <CardContent className="p-0 relative aspect-[3/4]">
                                                    <Image
                                                        src={getOptimizedImageUrl(student.imageUrl, { width: 300, quality: 85 })}
                                                        alt={student.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    {/* Float Info Card */}
                                                    <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm rounded-xl p-1.5 shadow-sm flex flex-col items-center">
                                                        <div className="flex items-center leading-tight">
                                                            <p
                                                                className="text-xs md:text-sm font-black flex items-baseline gap-0.5"
                                                                style={{ color: primaryColor }}
                                                            >
                                                                {student.rank}
                                                                {student.courseName && (
                                                                    <span
                                                                        className="text-[7px] font-bold uppercase italic ml-0.5"
                                                                        style={{ color: primaryColor, opacity: 0.8 }}
                                                                    >
                                                                        ({student.courseName})
                                                                    </span>
                                                                )}
                                                            </p>
                                                        </div>
                                                        <p className="text-[8px] font-bold text-slate-800 uppercase tracking-tighter line-clamp-1 text-center border-t border-slate-100 pt-1 w-full mt-0.5">
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

                    {/* Custom Pagination — styled via <style> tag above using primaryColor */}
                    <div className="institution-pagination flex justify-center gap-1.5 mt-10" />
                </div>

                {/* Stats Bar */}
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
                                <p
                                    className="text-xl md:text-2xl font-black mb-0.5"
                                    style={{ color: primaryColor }}
                                >
                                    {stat.value}
                                </p>
                                <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">
                                    {stat.label}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstitutionResultsHeader;