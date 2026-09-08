'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCourses } from '@/modules/platform/institution-courses';
import { useInstitutions } from '../hooks/useInstitutions';
import { Filter, Search, X, Check, ArrowUpDown, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/core/lib/utils/utils';

export interface CoursesFiltersProps {
    selectedCourseName?: string;
    sortBy?: string;
    onSortChange?: (value: string) => void;
    isMobileOpen?: boolean;
    onMobileClose?: () => void;
    className?: string;
}

const SORT_OPTIONS = [
    { label: 'Recommended', value: 'recommended' },
    { label: 'Top Rated', value: 'rating' },
];

const CoursesFilters: React.FC<CoursesFiltersProps> = ({
    selectedCourseName,
    sortBy = 'recommended',
    onSortChange,
    isMobileOpen = false,
    onMobileClose,
    className
}) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const { data: coursesResponse, isLoading: isLoadingCourses } = useCourses(100);
    const courses = coursesResponse?.data;
    const { data: response } = useInstitutions();

    const searchParams = useSearchParams();

    // Lock body scroll when mobile drawer is open
    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileOpen]);

    const handleSelectCourse = (name: string | null) => {
        const params = new URLSearchParams(searchParams?.toString());
        if (name) {
            params.set('courseName', name);
        } else {
            params.delete('courseName');
        }
        router.push(`?${params.toString()}`);
    };

    const handleResetAll = () => {
        handleSelectCourse(null);
        onSortChange?.('recommended');
    };

    const filteredCourses = courses?.filter(course =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* ─── Desktop Sidebar (Untouched for large screens) ─── */}
            <aside className={cn("hidden lg:block w-72 flex-shrink-0", className)}>
                <div className="bg-white p-6 sticky top-20 h-[calc(100vh-80px)] flex flex-col">
                    <div className="flex flex-none items-center justify-between mb-6 pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-primary-50 rounded-lg">
                                <Filter size={16} className="text-primary-600" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Filters</h3>
                        </div>
                        <button
                            onClick={handleResetAll}
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

                        {/* Course Search */}
                        <div className="relative mb-4">
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

                        <div className="flex-1 overflow-y-auto pr-1 no-scrollbar flex flex-col gap-1.5 pb-4">
                            <button
                                onClick={() => handleSelectCourse(null)}
                                className={cn(
                                    "w-full px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-left cursor-pointer",
                                    !selectedCourseName
                                        ? "bg-primary-50 text-primary-600 border-l-4 border-l-primary-500 pl-3.5 shadow-sm font-semibold"
                                        : "text-slate-600 hover:bg-slate-50 border-l-4 border-l-transparent hover:translate-x-1 pl-4"
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
                                            "w-full px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-left cursor-pointer",
                                            selectedCourseName === course.name
                                                ? "bg-primary-50 text-primary-600 border-l-4 border-l-primary-500 pl-3.5 shadow-sm font-semibold"
                                                : "text-slate-600 hover:bg-slate-50 border-l-4 border-l-transparent hover:translate-x-1 pl-4"
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

            {/* ─── Mobile Slide-over Sidebar (Drawer) ─── */}
            {isMobileOpen && (
                <div className="lg:hidden fixed inset-0 z-[100] flex justify-end">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
                        onClick={onMobileClose}
                    />

                    {/* Drawer Content */}
                    <div className="relative w-full max-w-[85vw] sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
                        {/* Drawer Header */}
                        <div className="flex-none flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-100 bg-white">
                            <div className="flex items-center gap-2 sm:gap-2.5">
                                <div className="p-1.5 sm:p-2 bg-primary-50 text-primary-600 rounded-xl">
                                    <SlidersHorizontal size={16} className="sm:w-[18px] sm:h-[18px]" />
                                </div>
                                <div>
                                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-none">Filters & Sort</h3>
                                    <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">Refine your institute search</p>
                                </div>
                            </div>
                            <button
                                onClick={onMobileClose}
                                className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                                aria-label="Close filters"
                            >
                                <X size={18} className="sm:w-5 sm:h-5" />
                            </button>
                        </div>

                        {/* Drawer Body */}
                        <div className="flex-1 min-h-0 p-4 sm:p-5 flex flex-col gap-4 sm:gap-5 overflow-hidden">
                            {/* Sort By Section */}
                            <div className="flex-none">
                                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-2.5">
                                    <ArrowUpDown size={13} className="text-primary-600 sm:w-3.5 sm:h-3.5" />
                                    <h4 className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Sort By</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {SORT_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => onSortChange?.(opt.value)}
                                            className={cn(
                                                "flex items-center justify-between px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer",
                                                sortBy === opt.value
                                                    ? "bg-primary-50 text-primary-700 border-primary-200 shadow-xs"
                                                    : "bg-slate-50 text-slate-700 border-slate-200/60 hover:bg-slate-100"
                                            )}
                                        >
                                            <span>{opt.label}</span>
                                            {sortBy === opt.value && (
                                                <Check size={14} className="text-primary-600 shrink-0 ml-1" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Courses Filter Section */}
                            <div className="flex-1 min-h-0 flex flex-col">
                                <div className="flex-none flex items-center justify-between mb-2 sm:mb-2.5">
                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                        <Filter size={13} className="text-primary-600 sm:w-3.5 sm:h-3.5" />
                                        <h4 className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Courses</h4>
                                    </div>
                                    {courses && (
                                        <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                            {courses.length} courses
                                        </span>
                                    )}
                                </div>

                                {/* Search Input */}
                                <div className="flex-none relative mb-2.5 sm:mb-3">
                                    <input
                                        type="text"
                                        placeholder="Search courses..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-8 pr-7 py-2 sm:py-2.5 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 focus:border-primary-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all text-slate-800"
                                    />
                                    <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 sm:w-3.5 sm:h-3.5" />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold cursor-pointer"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>

                                {/* Course List */}
                                <div className="flex-1 min-h-0 overflow-y-auto pr-1 no-scrollbar flex flex-col gap-1 sm:gap-1.5 pb-1">
                                    <button
                                        onClick={() => handleSelectCourse(null)}
                                        className={cn(
                                            "flex items-center justify-between w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left cursor-pointer flex-shrink-0",
                                            !selectedCourseName
                                                ? "bg-primary-50 text-primary-700 font-bold border border-primary-200"
                                                : "text-slate-700 hover:bg-slate-50 border border-transparent"
                                        )}
                                    >
                                        <span>All Courses</span>
                                        {!selectedCourseName && <Check size={15} className="text-primary-600 shrink-0 sm:w-4 sm:h-4" />}
                                    </button>

                                    {isLoadingCourses ? (
                                        [...Array(6)].map((_, i) => (
                                            <div key={i} className="h-9 sm:h-10 w-full bg-slate-50 animate-pulse rounded-xl flex-shrink-0" />
                                        ))
                                    ) : (
                                        (searchQuery ? filteredCourses : courses)?.map((course) => (
                                            <button
                                                key={course.id}
                                                onClick={() => handleSelectCourse(course.name)}
                                                className={cn(
                                                    "flex items-center justify-between w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left cursor-pointer flex-shrink-0",
                                                    selectedCourseName === course.name
                                                        ? "bg-primary-50 text-primary-700 font-bold border border-primary-200"
                                                        : "text-slate-700 hover:bg-slate-50 border border-transparent"
                                                )}
                                            >
                                                <span className="truncate pr-2">{course.name}</span>
                                                {selectedCourseName === course.name && (
                                                    <Check size={15} className="text-primary-600 shrink-0 sm:w-4 sm:h-4" />
                                                )}
                                            </button>
                                        ))
                                    )}
                                    {searchQuery && filteredCourses?.length === 0 && (
                                        <div className="text-center py-5 text-xs text-slate-400">
                                            No courses matching "{searchQuery}"
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Drawer Footer */}
                        <div className="flex-none p-3.5 sm:p-4 border-t border-slate-100 bg-white flex items-center gap-2 sm:gap-2.5">
                            <button
                                onClick={handleResetAll}
                                className="px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                            >
                                Reset All
                            </button>
                            <button
                                onClick={onMobileClose}
                                className="flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md transition-colors text-center cursor-pointer"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CoursesFilters;
