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

    const [sortBy, setSortBy] = useState('recommended');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [allInstitutions, setAllInstitutions] = useState<any[]>([]);
    const limit = 12; // Increase default limit for infinite scroll density
    const sortRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<HTMLDivElement>(null);

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

    const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || 'Recommended';

    const queryParams = {
        courseName,
        search,
        sortBy,
        page,
        limit,
    };

    // Use query to fetch current page
    const { data: response, isLoading, isFetching } = useInstitutions(queryParams);
    const totalResults = response?.pagination?.total || 0;

    // Reset pagination and list when filters or sorting change
    useEffect(() => {
        setPage(1);
        setAllInstitutions([]);
    }, [courseName, search, sortBy]);

    // Accumulate institutions when response data arrives
    useEffect(() => {
        if (response?.data) {
            if (page === 1) {
                setAllInstitutions(response.data);
            } else {
                setAllInstitutions(prev => {
                    const existingIds = new Set(prev.map(item => item.id));
                    const newItems = response.data.filter(item => !existingIds.has(item.id));
                    return [...prev, ...newItems];
                });
            }
        }
    }, [response?.data, page]);

    // Setup intersection observer for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading && !isFetching && allInstitutions.length < totalResults) {
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 0.1, rootMargin: '150px' }
        );

        const currentTarget = observerRef.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [isLoading, isFetching, allInstitutions.length, totalResults]);

    return (
        <main className="min-h-screen bg-white">
            <div className="flex flex-col lg:flex-row min-h-screen pt-20">
                {/* Filters Sidebar */}
                <CoursesFilters
                    className="lg:border-r lg:border-slate-100"
                    selectedCourseName={courseName}
                />

                {/* Main Content Area */}
                <div className="flex-1 px-4 sm:px-6 lg:px-10 pt-6 pb-10">
                    {/* Results Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">
                                Explore Coachings
                            </h2>
                            <p className="text-xs font-semibold text-slate-400 mt-0.5">
                                Showing {allInstitutions.length} of {totalResults} available Coachings
                            </p>
                        </div>

                        <div className="flex items-center gap-2 relative">
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sort by:</span>
                            <div className="relative" ref={sortRef}>
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 rounded-xl text-sm font-bold text-slate-700 transition-all cursor-pointer"
                                >
                                    {currentSortLabel}
                                    <ChevronDown size={14} className={cn("text-slate-500 transition-transform duration-200", isSortOpen && "rotate-180")} />
                                </button>

                                {isSortOpen && (
                                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-20 animate-in fade-in zoom-in-95 duration-150">
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

                    <InstituteList
                        institutions={allInstitutions}
                        isLoading={isLoading}
                        isLoadingMore={isFetching && page > 1}
                    />

                    {/* Scroll Target and Loading Indicator */}
                    <div ref={observerRef} className="mt-12 py-8 flex justify-center items-center">
                        {isFetching && (
                            <div className="flex flex-col items-center gap-2">
                                <div className="h-7 w-7 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
                                <span className="text-xs font-bold text-slate-400 tracking-wide animate-pulse">Loading more institutions...</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
