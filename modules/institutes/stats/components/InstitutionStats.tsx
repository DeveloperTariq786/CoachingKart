'use client';

import React from 'react';
import { Skeleton } from '@/core/components/ui/skeleton';
import { cn } from '@/core/lib/utils/utils';
import { institutionHomeService } from '../services/stats.service';
import { useHomeStore } from '../store/useStatsStore';
import { useIntersectionObserver } from '@/core/hooks/useIntersectionObserver';

interface InstitutionStatsProps {
    institutionId?: string;
}

const InstitutionStats: React.FC<InstitutionStatsProps> = ({ institutionId }) => {
    const { homeStatsCache, setHomeStats } = useHomeStore();
    const [sectionRef, isInView] = useIntersectionObserver<HTMLElement>();
    const [isLoading, setIsLoading] = React.useState(!homeStatsCache[institutionId || '']);
    const [statsData, setStatsData] = React.useState<{ value: string; label: string }[]>([]);

    React.useEffect(() => {
        const fetchStats = async () => {
            if (!institutionId) return;

            if (homeStatsCache[institutionId]) {
                const data = homeStatsCache[institutionId];
                setStatsData([
                    { value: data.totalEnrolledStudents.toString() + '+', label: 'Enrolled Students' },
                    { value: data.totalFacultyExperience.toString() + '+', label: 'Years Experience' },
                    { value: data.successRate, label: 'Qualification Rate' },
                    { value: data.coursesOffered.toString() + '+', label: 'Courses Offered' },
                ]);
                setIsLoading(false);
                return;
            }

            if (!isInView) return;

            try {
                setIsLoading(true);
                const response = await institutionHomeService.getHomeStats(institutionId);
                if (response.success) {
                    setHomeStats(institutionId, response.data);
                    setStatsData([
                        { value: response.data.totalEnrolledStudents.toString() + '+', label: 'Enrolled Students' },
                        { value: response.data.totalFacultyExperience.toString() + '+', label: 'Years Experience' },
                        { value: response.data.successRate, label: 'Qualification Rate' },
                        { value: response.data.coursesOffered.toString() + '+', label: 'Courses Offered' },  // static for now
                    ]);
                }
            } catch (error) {
                console.error('Error fetching home stats:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, [institutionId, homeStatsCache, setHomeStats, isInView]);

    const displayStats = statsData.length > 0 ? statsData : [
        { value: '...', label: 'Enrolled Students' },
        { value: '...', label: 'Years Experience' },
        { value: '...', label: 'Qualification Rate' },
        { value: '...', label: 'Courses Offered' },
    ];

    return (
        <section ref={sectionRef} className="bg-background min-h-[100px]">
            {/* Stats Bar */}
            <div className="mt-3 sm:mt-4 md:mt-8 grid grid-cols-2 md:grid-cols-4 py-4 sm:py-5 md:py-8 px-3 sm:px-4 max-w-4xl mx-auto border-t border-slate-100">
                {isLoading ? (
                    [...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "text-center px-2 sm:px-3 md:px-4 py-2 md:py-0",
                                i % 2 !== 0 && "border-l border-slate-100",
                                i >= 2 && "border-t border-slate-100 md:border-t-0",
                                "md:border-l md:first:border-l-0"
                            )}
                        >
                            <Skeleton className="h-6 sm:h-7 md:h-8 w-16 md:w-20 bg-slate-200 rounded-lg mx-auto mb-1" />
                            <Skeleton className="h-2.5 sm:h-3 md:h-3 w-16 sm:w-20 md:w-24 bg-slate-200 rounded-lg mx-auto" />
                        </div>
                    ))
                ) : (
                    displayStats.map((stat, i) => (
                        <div
                            key={i}
                            className={cn(
                                "text-center px-2 sm:px-3 md:px-4 py-2 md:py-0",
                                i % 2 !== 0 && "border-l border-slate-100",
                                i >= 2 && "border-t border-slate-100 md:border-t-0",
                                "md:border-l md:first:border-l-0"
                            )}
                        >
                            <p className="text-xl sm:text-2xl md:text-3xl font-black text-primary-600 mb-0.5 md:mb-1">{stat.value}</p>
                            <p className="text-[9px] sm:text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider sm:tracking-widest leading-tight">
                                {stat.label}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default InstitutionStats;