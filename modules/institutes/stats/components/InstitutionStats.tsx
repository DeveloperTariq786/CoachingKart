'use client';

import React from 'react';

import { Skeleton } from '@/core/components/ui/skeleton';
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

            // Check cache even if not in view
            if (homeStatsCache[institutionId]) {
                const data = homeStatsCache[institutionId];
                setStatsData([
                    { value: data.totalEnrolledStudents.toString() + '+', label: 'ENROLLED STUDENTS' },
                    { value: data.totalFacultyExperience.toString() + '+', label: 'YEARS EXPERIENCE' },
                    { value: data.successRate, label: 'QUALIFICATION RATE' },
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
                        { value: response.data.totalEnrolledStudents.toString() + '+', label: 'ENROLLED STUDENTS' },
                        { value: response.data.totalFacultyExperience.toString() + '+', label: 'YEARS EXPERIENCE' },
                        { value: response.data.successRate, label: 'QUALIFICATION RATE' },
                    ]);
                }
            } catch (error) {
                console.error("Error fetching home stats:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, [institutionId, homeStatsCache, setHomeStats, isInView]);

    // Fallback or Initial Mock (only if no data and not loading)
    const displayStats = statsData.length > 0 ? statsData : [
        { value: '...', label: 'ENROLLED STUDENTS' },
        { value: '...', label: 'YEARS EXPERIENCE' },
        { value: '...', label: 'QUALIFICATION RATE' },
    ];

    return (
        <section ref={sectionRef} className="bg-background py-16 md:py-20 border-t border-foreground/5 min-h-[200px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-center justify-center text-center">
                    {isLoading ? (
                        [...Array(3)].map((_, index) => (
                            <div key={index} className="flex flex-col items-center gap-3">
                                <Skeleton className="h-12 w-24 md:h-14 md:w-32 bg-slate-200 rounded-lg" />
                                <Skeleton className="h-4 w-32 md:w-40 bg-slate-200 rounded-lg" />
                            </div>
                        ))
                    ) : (
                        displayStats.map((stat, index) => (
                            <div key={index} className="flex flex-col items-center group">
                                <span className="text-4xl md:text-5xl font-extrabold text-primary-600 mb-2 tracking-tight transition-transform duration-300 group-hover:scale-110">
                                    {stat.value}
                                </span>
                                <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">
                                    {stat.label}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default InstitutionStats;
