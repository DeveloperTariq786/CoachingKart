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
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 py-8 px-4 max-w-4xl mx-auto divide-x divide-slate-100 border-t border-slate-100">
                {isLoading ? (
                    [...Array(4)].map((_, i) => (
                        <div key={i} className="text-center px-4 first:divide-none">
                            <Skeleton className="h-8 w-20 bg-slate-200 rounded-lg mx-auto mb-1" />
                            <Skeleton className="h-3 w-24 bg-slate-200 rounded-lg mx-auto" />
                        </div>
                    ))
                ) : (
                    displayStats.map((stat, i) => (
                        <div key={i} className="text-center px-4 first:divide-none">
                            <p className="text-2xl md:text-3xl font-black text-primary-600 mb-1">{stat.value}</p>
                            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest leading-tight">
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