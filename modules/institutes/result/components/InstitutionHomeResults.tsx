'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/core/components/ui/card';
import { cn } from '@/core/lib/utils/utils';
import { Trophy } from 'lucide-react';
import { getOptimizedImageUrl } from '@/core/lib/utils/image-utils';
import { resultService } from '../services/result.service';
import { useResultStore } from '../store/useResultStore';

interface Performer {
    id: string;
    name: string;
    rank: string;
    courseName?: string;
    imageUrl: string;
}

interface InstitutionHomeResultsProps {
    institutionId?: string;
}

const InstitutionHomeResults: React.FC<InstitutionHomeResultsProps> = ({ institutionId }) => {
    const params = useParams();
    const slug = params.slug as string;
    const { topPerformersCache, setTopPerformers } = useResultStore();
    const [performers, setPerformers] = React.useState<Performer[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        const fetchPerformers = async () => {
            if (!institutionId) return;

            if (topPerformersCache[institutionId]) {
                const mapped: Performer[] = topPerformersCache[institutionId].map(p => ({
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
                const response = await resultService.getTopPerformers(institutionId, 18);
                if (response.success && response.data.length > 0) {
                    setTopPerformers(institutionId, response.data);
                    const mapped: Performer[] = response.data.map(p => ({
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

    return (
        <section className="relative py-8 md:py-16 bg-white overflow-hidden border-t border-slate-100">
            {/* Subtle background grids */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="grid grid-cols-12 h-full">
                    {[...Array(24)].map((_, i) => (
                        <div key={i} className="border-r border-b border-slate-200" />
                    ))}
                </div>
            </div>

            <div className="w-full px-4 sm:px-6 lg:px-10 text-center relative z-10">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white border border-primary-100 shadow-sm text-primary-600 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide mb-2.5 sm:mb-4">
                    <Trophy size={14} className="sm:w-4 sm:h-4" />
                    <span>Achievements</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mt-1.5 sm:mt-2 md:mt-3 mb-2 sm:mb-2.5 md:mb-4 tracking-tight">
                    Our <span className="text-primary-600">Glorious Results</span>
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-slate-500 mb-6 sm:mb-8 md:mb-12 max-w-xl mx-auto font-medium">
                    Setting new benchmarks of excellence year after year.
                </p>

                {/* Grid Component */}
                {isLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3 w-full pb-6 md:pb-10">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="relative">
                                <Card className="overflow-hidden border border-slate-100 shadow-md rounded-xl md:rounded-2xl bg-slate-50">
                                    <CardContent className="p-0 relative aspect-[4/5] animate-pulse">
                                        <div className="w-full h-full bg-slate-200"></div>
                                        <div className="absolute bottom-1.5 left-1.5 right-1.5 md:bottom-2 md:left-2 md:right-2 bg-white/95 backdrop-blur-sm rounded-lg md:rounded-xl p-1 md:p-1.5 shadow-sm flex flex-col items-center">
                                            <div className="h-3 bg-slate-200 rounded w-12 mb-1"></div>
                                            <div className="h-2 bg-slate-200 rounded w-8 mb-0.5"></div>
                                            <div className="h-2 bg-slate-200 rounded w-16 mt-1"></div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                ) : performers.length === 0 ? (
                    <div className="text-center py-8 md:py-12">
                        <p className="text-slate-400 text-xs sm:text-sm md:text-base">No results found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3 w-full pb-6 md:pb-10">
                        {performers.map((student) => (
                            <div key={student.id} className="relative transform hover:scale-[1.03] transition-all duration-300">
                                <Card className="overflow-hidden border border-slate-100 shadow-md rounded-xl md:rounded-2xl bg-slate-50">
                                    <CardContent className="p-0 relative aspect-[4/5]">
                                        <Image
                                            src={getOptimizedImageUrl(student.imageUrl, { width: 300, quality: 85 })}
                                            alt={student.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 12vw"
                                        />
                                        {/* Floating Glass Rank Card */}
                                        <div className="absolute bottom-1.5 left-1.5 right-1.5 md:bottom-2 md:left-2 md:right-2 bg-white/95 backdrop-blur-sm rounded-lg md:rounded-xl p-1 md:p-1.5 shadow-sm flex flex-col items-center">
                                            <p className="text-[11px] sm:text-xs md:text-sm font-black text-primary-600 flex items-baseline gap-0.5">
                                                {student.rank}
                                            </p>
                                            <span className="text-[7.5px] sm:text-[8px] md:text-[9px] font-bold text-primary-500/80 uppercase italic tracking-tighter leading-none mb-0.5 truncate max-w-full">
                                                {student.courseName}
                                            </span>
                                            <p className="text-[8.5px] sm:text-[9px] md:text-[10px] font-bold text-slate-800 uppercase tracking-tighter line-clamp-1 text-center border-t border-slate-100 pt-0.5 md:pt-1 w-full">
                                                {student.name}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}



                {/* View All Achievements Button */}
                <div className="mt-4 sm:mt-6 md:mt-8 text-center">
                    <Link
                        href={`/${slug}/results`}
                        className="inline-flex items-center justify-center gap-2 text-primary-600 font-semibold text-xs sm:text-sm md:text-[16px] tracking-wide border-b border-dashed border-primary-600 pb-0.5 hover:text-primary-700 hover:border-primary-700 transition-all duration-200"
                    >
                        View All Achievements
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default InstitutionHomeResults;
