'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Skeleton } from '@/core/components/ui/skeleton';
import { institutionCourseService } from '../services/course.service';
import { InstitutionCourse } from '../types/course.types';
import { useCourseStore } from '../store/useCourseStore';
import { useIntersectionObserver } from '@/core/hooks/useIntersectionObserver';
import { getColorHex } from '@/core/constants/colors';

interface InstitutionCoursesProps {
    institutionId?: string;
}

const InstitutionCourses: React.FC<InstitutionCoursesProps> = ({ institutionId }) => {
    const params = useParams();
    const slug = params.slug as string;
    const [sectionRef, isInView] = useIntersectionObserver<HTMLElement>();
    const { coursesCache, setCourses: setCoursesCache } = useCourseStore();

    // Initialize from cache if possible
    const cachedData = institutionId ? coursesCache[institutionId] : null;
    const [courses, setCourses] = useState<InstitutionCourse[]>(
        cachedData ? cachedData.data : []
    );
    const [isLoading, setIsLoading] = useState(!cachedData);
    const [limit, setLimit] = useState(
        cachedData ? cachedData.limit : 6
    );
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            if (!institutionId) return;

            // If we have cached data for this institution and the cached limit matches current limit,
            // we can set the data and stop loading even if not in view.
            const cached = coursesCache[institutionId];
            if (cached && cached.limit >= limit) {
                setCourses(cached.data.slice(0, limit));
                setIsLoading(false);
                return;
            }

            // Only trigger the actual API call if the component is in view
            if (!isInView) return;

            try {
                if (limit === 6 && courses.length === 0) setIsLoading(true);
                else setIsFetchingMore(true);

                const response = await institutionCourseService.getInstitutionCourses(institutionId, limit);
                if (response.success) {
                    setCourses(response.data);
                    setCoursesCache(institutionId, response.data, limit);
                }
            } catch (error) {
                console.error("Error fetching institution courses:", error);
            } finally {
                setIsLoading(false);
                setIsFetchingMore(false);
            }
        };

        fetchCourses();
    }, [institutionId, limit, coursesCache, setCoursesCache, isInView]);

    const handleViewMore = () => {
        setLimit(prev => prev + 6);
    };

    return (
        <section ref={sectionRef} className="py-16 bg-background min-h-[400px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Our Courses
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        Prepare for your dream career with our meticulously crafted course structures.
                    </p>
                </div>

                {/* Grid */}
                {!isLoading && courses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center shadow-sm mb-4">
                            <ArrowRight size={24} className="text-slate-300 rotate-45" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">No Courses Found</h3>
                        <p className="text-slate-500 max-w-xs mx-auto">
                            We couldn't find any courses for this institution at the moment. Please check back later.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoading ? (
                            [...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between overflow-hidden h-[250px]">
                                    <div>
                                        <Skeleton className="h-8 w-3/4 mb-4 bg-slate-200 rounded-lg" />
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            <Skeleton className="h-6 w-20 bg-slate-200 rounded-full" />
                                            <Skeleton className="h-6 w-16 bg-slate-200 rounded-full" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-6 w-24 bg-slate-200 rounded-lg" />
                                </div>
                            ))
                        ) : (
                            courses.map((course) => (
                                <div
                                    key={course.id}
                                    className="group relative bg-background border border-slate-200 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 hover:border-primary-100 flex flex-col justify-between overflow-hidden"
                                >
                                    {/* Content */}
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary-600 transition-colors">
                                            {course.name}
                                        </h3>
 
                                        <div className="flex flex-wrap gap-2 mb-8 pr-24">
                                            {course.programs?.map((program, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 bg-background border border-slate-200 rounded-full text-xs font-medium text-slate-600 group-hover:border-primary-200 group-hover:text-primary-700 transition-colors"
                                                >
                                                    {program.name}
                                                </span>
                                            ))}
                                            {(!course.programs || course.programs.length === 0) && (
                                                <span className="px-3 py-1 bg-background border border-slate-200 rounded-full text-xs font-medium text-slate-400">
                                                    Not Available
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Bottom Action */}
                                    <div className="relative z-10 mt-auto">
                                        <Link
                                            href={`/${slug}/${course.name.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="inline-flex items-center gap-2 text-sm font-bold text-foreground group-hover:text-primary-600 transition-colors"
                                        >
                                            Explore
                                            <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-primary-50 flex items-center justify-center transition-colors">
                                                <ArrowRight size={14} />
                                            </div>
                                        </Link>
                                    </div>

                                    {/* Decorative Background & Icon */}
                                    <div
                                        className="absolute -right-6 top-1/2 -translate-y-1/2 w-48 h-64 rounded-l-full opacity-50 group-hover:scale-110 transition-transform duration-500"
                                        style={{ backgroundColor: getColorHex(course.color) }}
                                    />

                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-24 flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                                        <img
                                            src={course.icon}
                                            alt={course.name}
                                            className="w-20 h-20 object-contain"
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* View More Button */}
                {courses.length > 0 && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={handleViewMore}
                            disabled={isFetchingMore}
                            className="inline-block text-primary-600 font-bold hover:underline underline-offset-4 decoration-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {isFetchingMore ? 'Loading...' : 'View More'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default InstitutionCourses;
