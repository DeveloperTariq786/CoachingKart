'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCourses } from '@/modules/platform/institution-courses';
import { useInstitutions } from '../hooks/useInstitutions';
import { Filter } from 'lucide-react';
import { cn } from '@/core/lib/utils/utils';

interface CoursesFiltersProps {
    selectedCourseName?: string;
    className?: string;
}

const CoursesFilters: React.FC<CoursesFiltersProps> = ({ selectedCourseName, className }) => {
    const router = useRouter();

    // Fetch courses from courseService
    const { data: courses, isLoading: isLoadingCourses } = useCourses();

    // As per user request: "use the institutionService in the CoursesFilters.tsx"
    // We fetch institutions to possibly show counts or just to satisfy the service requirement
    const { data: response } = useInstitutions();
    const institutions = response?.data || [];

    const searchParams = useSearchParams();

    const handleSelectCourse = (name: string | null) => {
        const params = new URLSearchParams(searchParams?.toString());
        if (name) {
            params.set('courseName', name);
        } else {
            params.delete('courseName');
        }
        router.push(`?${params.toString()}`);
    };

    return (
        <aside className={cn("w-full lg:w-72 flex-shrink-0", className)}>
            <div className="bg-white p-6 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] flex flex-col">
                <div className="flex flex-none items-center justify-between mb-8 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <Filter size={18} className="text-primary-600" />
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight">Filters</h3>
                    </div>
                    <button
                        onClick={() => handleSelectCourse(null)}
                        className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer"
                    >
                        Reset All
                    </button>
                </div>

                <div className="flex-1 flex flex-col overflow-hidden">
                    <h4 className="flex-none text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-4 px-2">Courses</h4>

                    {/* List container: Scrollable on desktop, horizontal on mobile */}
                    <div className="flex-1 lg:overflow-y-auto lg:pr-2 no-scrollbar flex lg:flex-col overflow-x-auto gap-2 lg:gap-1 px-2 pb-4">
                        <button
                            onClick={() => handleSelectCourse(null)}
                            className={cn(
                                "flex-none lg:w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-left whitespace-nowrap lg:whitespace-normal cursor-pointer",
                                !selectedCourseName
                                    ? "bg-primary-50 text-primary-600 border border-primary-100 shadow-sm"
                                    : "text-slate-600 hover:bg-slate-50 border border-transparent"
                            )}
                        >
                            All Courses
                        </button>

                        {isLoadingCourses ? (
                            [...Array(5)].map((_, i) => (
                                <div key={i} className="h-10 w-full bg-slate-50 animate-pulse rounded-xl mb-1" />
                            ))
                        ) : (
                            courses?.map((course) => (
                                <button
                                    key={course.id}
                                    onClick={() => handleSelectCourse(course.name)}
                                    className={cn(
                                        "flex-none lg:w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-left whitespace-nowrap lg:whitespace-normal cursor-pointer",
                                        selectedCourseName === course.name
                                            ? "bg-primary-50 text-primary-600 border border-primary-100 shadow-sm"
                                            : "text-slate-600 hover:bg-slate-50 border border-transparent"
                                    )}
                                >
                                    {course.name}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default CoursesFilters;
