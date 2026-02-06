'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FEATURED_TUITIONS } from '@/core/constants';
import { cn } from '@/core/lib/utils/utils';
import { CoursesFilters, InstituteList } from '@/modules/platform/institutions';

export default function InstitutionPage() {
    const [sortBy, setSortBy] = useState('Recommended');
    const [isSortOpen, setIsSortOpen] = useState(false);

    return (
        <main className="min-h-screen bg-white">
            <div className="flex flex-col lg:flex-row min-h-screen pt-20">
                {/* Filters Sidebar */}
                <CoursesFilters className="lg:border-r lg:border-slate-100" />

                {/* Main Content Area */}
                <div className="flex-1 px-4 sm:px-6 lg:px-10 py-10">
                    {/* Results Bar */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-slate-900">
                            {FEATURED_TUITIONS.length} Results Found
                        </h2>

                        <div className="flex items-center gap-2 relative">
                            <span className="text-sm text-slate-500 font-medium">Sort by:</span>
                            <div className="relative">
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center gap-1 text-sm font-bold text-slate-900 hover:text-primary-600 transition-colors"
                                >
                                    {sortBy}
                                    <ChevronDown size={16} className={cn("transition-transform duration-200", isSortOpen && "rotate-180")} />
                                </button>

                                {isSortOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in zoom-in duration-200">
                                        {['Recommended', 'Top Rated'].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => {
                                                    setSortBy(option);
                                                    setIsSortOpen(false);
                                                }}
                                                className={cn(
                                                    "w-full text-left px-4 py-2 text-sm transition-colors",
                                                    sortBy === option
                                                        ? "bg-primary-50 text-primary-600 font-bold"
                                                        : "text-slate-600 hover:bg-slate-50"
                                                )}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <InstituteList />
                </div>
            </div>
        </main>
    );
}
