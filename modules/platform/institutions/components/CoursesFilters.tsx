'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCourses } from '@/modules/platform/institution-courses';
import { useInstitutions } from '../hooks/useInstitutions';
import { Filter, Search } from 'lucide-react';
import { cn } from '@/core/lib/utils/utils';

interface CoursesFiltersProps {
    selectedCourseName?: string;
    className?: string;
}

const CoursesFilters: React.FC<CoursesFiltersProps> = ({ selectedCourseName, className }) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const { data: coursesResponse, isLoading: isLoadingCourses } = useCourses(100);
    const courses = coursesResponse?.data;
    const { data: response } = useInstitutions();

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

    const filteredCourses = courses?.filter(course =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <aside className={cn("w-full lg:w-72 flex-shrink-0", className)}>
            <div className="bg-white p-6 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] flex flex-col">
                <div className="flex flex-none items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-primary-50 rounded-lg">
                            <Filter size={16} className="text-primary-600" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Filters</h3>
                    </div>
                    <button
                        onClick={() => handleSelectCourse(null)}
                        className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer"
                    >
                        Reset All
                    </button>
                </div>

                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Courses</h4>
                        {courses && (
                            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
                                {courses.length}
                            </span>
                        )}
                    </div>

                    {/* Course Search (Desktop Only for Space Optimization) */}
                    <div className="hidden lg:block relative mb-4">
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-8 pr-7 py-2 text-xs bg-slate-50 hover:bg-slate-100/50 border border-slate-100 focus:border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all text-slate-800"
                        />
                        <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold cursor-pointer"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    <div className="flex-1 lg:overflow-y-auto lg:pr-1 no-scrollbar flex lg:flex-col overflow-x-auto gap-2 lg:gap-1.5 pb-4">
                        <button
                            onClick={() => handleSelectCourse(null)}
                            className={cn(
                                "flex-none lg:w-full px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-left whitespace-nowrap lg:whitespace-normal cursor-pointer",
                                !selectedCourseName
                                    ? "bg-primary-50 text-primary-600 border border-primary-100 lg:border-l-4 lg:border-l-primary-500 lg:pl-3.5 shadow-sm font-semibold"
                                    : "text-slate-600 hover:bg-slate-50 border border-slate-100 lg:border-transparent lg:border-l-4 lg:border-l-transparent lg:hover:translate-x-1 lg:pl-4"
                            )}
                        >
                            All Courses
                        </button>

                        {isLoadingCourses ? (
                            [...Array(5)].map((_, i) => (
                                <div key={i} className="h-9 w-full bg-slate-50 animate-pulse rounded-xl mb-1 flex-shrink-0" />
                            ))
                        ) : (
                            (searchQuery ? filteredCourses : courses)?.map((course) => (
                                <button
                                    key={course.id}
                                    onClick={() => handleSelectCourse(course.name)}
                                    className={cn(
                                        "flex-none lg:w-full px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-left whitespace-nowrap lg:whitespace-normal cursor-pointer",
                                        selectedCourseName === course.name
                                            ? "bg-primary-50 text-primary-600 border border-primary-100 lg:border-l-4 lg:border-l-primary-500 lg:pl-3.5 shadow-sm font-semibold"
                                            : "text-slate-600 hover:bg-slate-50 border border-slate-100 lg:border-transparent lg:border-l-4 lg:border-l-transparent lg:hover:translate-x-1 lg:pl-4"
                                    )}
                                >
                                    {course.name}
                                </button>
                            ))
                        )}
                        {searchQuery && filteredCourses?.length === 0 && (
                            <div className="text-center py-4 text-xs text-slate-400">
                                No courses found
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default CoursesFilters;
