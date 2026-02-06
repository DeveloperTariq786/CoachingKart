'use client';

import { CATEGORIES } from '@/core/constants';
import { cn } from '@/core/lib/utils/utils';
import { Filter } from 'lucide-react';

interface CoursersFiltersProps {
    selectedCategory?: string;
    onSelectCategory?: (id: string) => void;
    className?: string;
}

const CoursesFilters: React.FC<CoursersFiltersProps> = ({ selectedCategory, onSelectCategory, className }) => {
    return (
        <aside className={cn("w-full lg:w-72 flex-shrink-0", className)}>
            <div className="bg-white p-6 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] flex flex-col">
                <div className="flex flex-none items-center justify-between mb-8 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <Filter size={18} className="text-primary-600" />
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight">Filters</h3>
                    </div>
                    <button
                        onClick={() => onSelectCategory?.('all')}
                        className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors"
                    >
                        Reset All
                    </button>
                </div>

                <div className="flex-1 flex flex-col overflow-hidden">
                    <h4 className="flex-none text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-4 px-2">Exam Category</h4>

                    {/* List container: Scrollable on desktop, horizontal on mobile */}
                    <div className="flex-1 lg:overflow-y-auto lg:pr-2 no-scrollbar flex lg:flex-col overflow-x-auto gap-2 lg:gap-1 px-2 pb-4">
                        <button
                            onClick={() => onSelectCategory?.('all')}
                            className={cn(
                                "flex-none lg:w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-left whitespace-nowrap lg:whitespace-normal",
                                !selectedCategory || selectedCategory === 'all'
                                    ? "bg-primary-50 text-primary-600 border border-primary-100 shadow-sm"
                                    : "text-slate-600 hover:bg-slate-50 border border-transparent"
                            )}
                        >
                            All
                        </button>

                        {CATEGORIES.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => onSelectCategory?.(category.id)}
                                className={cn(
                                    "flex-none lg:w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-left whitespace-nowrap lg:whitespace-normal",
                                    selectedCategory === category.id
                                        ? "bg-primary-50 text-primary-600 border border-primary-100 shadow-sm"
                                        : "text-slate-600 hover:bg-slate-50 border border-transparent"
                                )}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default CoursesFilters;
