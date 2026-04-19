'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/core/lib/utils/utils';
import { useSearchParams } from 'next/navigation';
import { CoursesFilters, InstituteList } from '@/modules/platform/institutions';
import { useInstitutions } from '@/modules/platform/institutions/hooks/useInstitutions';

export default function InstitutionPage() {
    const searchParams = useSearchParams();
    const courseName = searchParams.get('courseName') || undefined;
    const search = searchParams.get('search') || undefined;

    const [sortBy, setSortBy] = useState('recommended'); // Default to 'rating' as requested: "also sortedby rating"
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 10;
    const sortRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setIsSortOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const sortOptions = [
        { label: 'Recommended', value: 'recommended' },
        { label: 'Top Rated', value: 'rating' },

    ];

    const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || 'Top Rated';

    const queryParams = {
        courseName,
        search,
        sortBy,
        page,
        limit,
    };

    // Use query to get total results
    const { data: response } = useInstitutions(queryParams);
    const totalResults = response?.pagination?.total || 0;

    return (
        <main className="min-h-screen bg-white">
            <div className="flex flex-col lg:flex-row min-h-screen pt-20">
                {/* Filters Sidebar */}
                <CoursesFilters
                    className="lg:border-r lg:border-slate-100"
                    selectedCourseName={courseName}
                />

                {/* Main Content Area */}
                <div className="flex-1 px-4 sm:px-6 lg:px-10 py-10">
                    {/* Results Bar */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-slate-900">
                            {totalResults} Results Found
                        </h2>

                        <div className="flex items-center gap-2 relative">
                            <span className="text-sm text-slate-500 font-medium">Sort by:</span>
                            <div className="relative" ref={sortRef}>
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center gap-1 text-sm font-bold text-slate-900 hover:text-primary-600 transition-colors cursor-pointer"
                                >
                                    {currentSortLabel}
                                    <ChevronDown size={16} className={cn("transition-transform duration-200", isSortOpen && "rotate-180")} />
                                </button>

                                {isSortOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in zoom-in duration-200">
                                        {sortOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => {
                                                    setSortBy(option.value);
                                                    setIsSortOpen(false);
                                                }}
                                                className={cn(
                                                    "w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer",
                                                    sortBy === option.value
                                                        ? "bg-primary-50 text-primary-600 font-bold"
                                                        : "text-slate-600 hover:bg-slate-50"
                                                )}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <InstituteList queryParams={queryParams} />

                    {/* Pagination */}
                    {totalResults > limit && (
                        <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
                            <p className="text-sm text-slate-500">
                                Showing <span className="font-bold text-slate-900">{(page - 1) * limit + 1}</span> to <span className="font-bold text-slate-900">{Math.min(page * limit, totalResults)}</span> of <span className="font-bold text-slate-900">{totalResults}</span> results
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setPage(p => p + 1)}
                                    disabled={page * limit >= totalResults}
                                    className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors cursor-pointer"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
