'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowRight, BookOpen } from 'lucide-react';
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

    const cachedData = institutionId ? coursesCache[institutionId] : null;
    const [courses, setCourses] = useState<InstitutionCourse[]>(
        cachedData ? cachedData.data : []
    );
    const [isLoading, setIsLoading] = useState(!cachedData);
    const [limit, setLimit] = useState(
        cachedData ? cachedData.limit : 8
    );
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            if (!institutionId) return;

            const cached = coursesCache[institutionId];
            if (cached && cached.limit >= limit) {
                setCourses(cached.data.slice(0, limit));
                setIsLoading(false);
                return;
            }

            if (!isInView) return;

            try {
                if (limit === 8 && courses.length === 0) setIsLoading(true);
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
        setLimit(prev => prev + 8);
    };

    return (
        // Added overflow-x-hidden here to kill the horizontal scroll caused by card background circles
        <section id="courses" ref={sectionRef} className="scroll-mt-24 py-20 bg-slate-50/50 min-h-[400px] overflow-x-hidden">
            {/* EXACT padding and width preserved here */}
            <div className="w-full px-4 sm:px-6 lg:px-10">

                {/* Header Section */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 bg-white border border-primary-100 shadow-sm text-primary-600 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-4">
                        <BookOpen size={16} />
                        <span>Academic Courses</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        Shape Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Future Career</span>
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-[17px] leading-relaxed">
                        Explore our comprehensive, industry-aligned course structures designed to prepare you for success.
                    </p>
                </div>

                {/* Grid Container */}
                {!isLoading && courses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-5">
                            <BookOpen size={28} className="text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">No Programs Available</h3>
                        <p className="text-slate-500 max-w-md mx-auto">
                            We couldn't find any active courses for this institution right now. Please check back later.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                        {isLoading ? (
                            [...Array(8)].map((_, i) => (
                                <div key={i} className="bg-white border border-slate-100 rounded-3xl p-5 flex flex-col shadow-sm h-[240px]">
                                    <div className="flex items-start justify-between mb-5">
                                        <Skeleton className="h-12 w-12 rounded-2xl bg-slate-100" />
                                        <Skeleton className="h-6 w-20 bg-slate-100 rounded-full" />
                                    </div>
                                    <Skeleton className="h-6 w-3/4 mb-3 bg-slate-100 rounded-lg" />
                                    <div className="flex flex-wrap gap-2 mb-auto">
                                        <Skeleton className="h-6 w-16 bg-slate-100 rounded-full" />
                                        <Skeleton className="h-6 w-14 bg-slate-100 rounded-full" />
                                    </div>
                                    <div className="border-t border-slate-100 pt-3 mt-4 flex justify-between items-center">
                                        <Skeleton className="h-4 w-20 bg-slate-100 rounded-md" />
                                        <Skeleton className="h-7 w-7 bg-slate-100 rounded-full" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            courses.map((course) => (
                                <Link
                                    key={course.id}
                                    href={`/${slug}/${course.name.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="group relative bg-white border border-slate-100 rounded-3xl p-5 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-visible min-h-[240px] z-10 hover:z-20"
                                >
                                    {/* Top Section: Icon & Count */}
                                    <div className="relative z-10 flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-300 relative z-20">
                                            <img
                                                src={course.icon}
                                                alt={course.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        {course.programs && course.programs.length > 0 && (
                                            <div className="bg-slate-50 text-slate-500 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-slate-100 relative z-20">
                                                {course.programs.length} Programs
                                            </div>
                                        )}
                                    </div>

                                    {/* Main Content */}
                                    <div className="relative z-10 flex-grow">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                                            {course.name}
                                        </h3>

                                        <div className="flex flex-wrap items-center gap-1.5 mb-3">
                                            {course.programs?.slice(0, 2).map((program, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2.5 py-0.5 bg-slate-50 border border-slate-100 rounded-full text-[11px] font-medium text-slate-600 group-hover:bg-primary-50 group-hover:border-primary-100 group-hover:text-primary-700 transition-colors truncate max-w-[120px]"
                                                >
                                                    {program.name}
                                                </span>
                                            ))}

                                            {/* Tooltip Badge for Remaining Programs */}
                                            {course.programs && course.programs.length > 2 && (
                                                <div className="relative group/tag">
                                                    <span className="inline-flex px-2.5 py-0.5 bg-slate-50 border border-slate-100 rounded-full text-[11px] font-medium text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors cursor-pointer">
                                                        +{course.programs.length - 2}
                                                    </span>

                                                    {/* Tooltip Content */}
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] opacity-0 invisible group-hover/tag:opacity-100 group-hover/tag:visible transition-all duration-200 z-[60]">
                                                        <div className="bg-slate-800 text-white text-[11px] font-medium p-2.5 rounded-xl shadow-xl flex flex-col gap-1.5 border border-slate-700">
                                                            <div className="text-primary-400 text-[10px] uppercase tracking-wider mb-0.5 px-1 font-bold">Other Programs</div>
                                                            {course.programs.slice(2).map((p, pIdx) => (
                                                                <div key={pIdx} className="px-1 truncate text-slate-100">
                                                                    • {p.name}
                                                                </div>
                                                            ))}
                                                        </div>
                                                        {/* Tooltip Triangle */}
                                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-slate-800"></div>
                                                    </div>
                                                </div>
                                            )}

                                            {(!course.programs || course.programs.length === 0) && (
                                                <span className="px-2.5 py-0.5 bg-slate-50 border border-slate-100 rounded-full text-[11px] font-medium text-slate-400">
                                                    No Programs Available
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Footer Action */}
                                    <div className="relative z-10 border-t border-slate-100 pt-3 mt-2 flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-500 group-hover:text-primary-600 transition-colors">
                                            Explore Course
                                        </span>
                                        <div className="w-7 h-7 rounded-full bg-slate-50 text-slate-400 group-hover:bg-primary-600 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                                            <ArrowRight size={12} strokeWidth={3} />
                                        </div>
                                    </div>

                                    {/* Subtle Ambient Background Corner */}
                                    <div
                                        className="absolute -right-12 -top-12 w-32 h-32 rounded-full opacity-[0.03] group-hover:opacity-10 group-hover:scale-150 transition-all duration-700 pointer-events-none"
                                        style={{ backgroundColor: getColorHex(course.color) || '#3b82f6' }}
                                    />
                                </Link>
                            ))
                        )}
                    </div>
                )}

                {/* Primary Action Button - Replaced with clean text design with dashed line underneath */}
                {courses.length > 0 && (
                    <div className="mt-14 text-center">
                        <button
                            onClick={handleViewMore}
                            disabled={isFetchingMore}
                            className="inline-flex items-center justify-center gap-2 text-primary-600 font-semibold text-[16px] tracking-wide border-b border-dashed border-primary-600 pb-0.5 hover:text-primary-700 hover:border-primary-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {isFetchingMore ? (
                                <>
                                    <div className="w-3.5 h-3.5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
                                    <span>Loading...</span>
                                </>
                            ) : (
                                <span>View All Courses</span>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default InstitutionCourses;