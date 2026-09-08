import React from 'react';
import Image from 'next/image';
import { ChevronDown, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/core/components/ui/card';
import { cn } from '@/core/lib/utils/utils';
import { Skeleton } from '@/core/components/ui/skeleton';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/core/components/ui/dropdown-menu';
import { useInstitute } from '@/modules/institutes/institute/hooks/useInstitute';
import { resultService } from '../services/result.service';
import { useResultStore } from '../store/useResultStore';
import { InstitutionCourse } from '../../courses/types/course.types';
import { institutionCourseService } from '../../courses/services/course.service';
import { Result } from '../types/result.types';

interface Student {
    id: string;
    name: string;
    rank: string;
    score?: string;
    imageUrl: string;
}

interface InstitutionResultsBodyProps {
    institutionId?: string;
}

const YEARS = (() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear + 5; i >= currentYear - 5; i--) {
        years.push(i.toString());
    }
    return years;
})();


const FilterDropdown: React.FC<{
    label: string,
    value?: string,
    placeholder: string,
    options: { label: string, value: string }[],
    onChange: (value: string) => void,
    primaryColor?: string
}> = ({ label, value, placeholder, options, onChange, primaryColor }) => {
    const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

    return (
        <div className="w-full mb-3 sm:mb-4 md:mb-6" style={{ '--primary-500': primaryColor } as React.CSSProperties}>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                {label}
            </label>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="w-full h-9 sm:h-10 md:h-11 flex items-center justify-between px-3 md:px-4 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold text-xs md:text-sm hover:border-primary-200 hover:bg-slate-50/50 transition-all outline-none focus:ring-4 focus:ring-primary-500/5 focus:border-primary-300 shadow-sm group text-left cursor-pointer">
                        <span className="truncate">{selectedLabel}</span>
                        <ChevronDown size={15} strokeWidth={3} className="text-slate-400 group-hover:text-primary-500 transition-colors shrink-0 md:w-4 md:h-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 max-h-[300px] overflow-y-auto" align="start" style={{ '--primary-500': primaryColor } as React.CSSProperties}>
                    <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
                        <DropdownMenuRadioItem value="" className="font-bold text-slate-400 cursor-pointer focus:bg-primary-50 focus:text-primary-700 data-[state=checked]:text-primary-600">
                            {placeholder}
                        </DropdownMenuRadioItem>
                        {options.map((opt) => (
                            <DropdownMenuRadioItem key={opt.value} value={opt.value} className="font-medium text-slate-700 cursor-pointer focus:bg-primary-50 focus:text-primary-700 data-[state=checked]:text-primary-600">
                                {opt.label}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

const Pagination: React.FC<{
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void
}> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 mt-6 sm:mt-8 md:mt-12 pb-2 md:pb-4 flex-wrap">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg md:rounded-xl border border-slate-100 bg-white text-slate-600 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-100 transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-600 disabled:hover:border-slate-100 cursor-pointer"
            >
                <ChevronDown className="rotate-90" size={14} />
            </button>

            <div className="flex items-center gap-1 md:gap-1.5">
                {pages.map((p) => (
                    <button
                        key={p}
                        onClick={() => onPageChange(p)}
                        className={cn(
                            "w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg md:rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer",
                            currentPage === p
                                ? "bg-primary-600 text-white shadow-lg shadow-primary-200"
                                : "bg-white border border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                        )}
                    >
                        {p}
                    </button>
                ))}
            </div>

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg md:rounded-xl border border-slate-100 bg-white text-slate-600 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-100 transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-600 disabled:hover:border-slate-100 cursor-pointer"
            >
                <ChevronDown className="-rotate-90" size={14} />
            </button>
        </div>
    );
};

const InstitutionResultsBody: React.FC<InstitutionResultsBodyProps> = ({ institutionId }) => {
    const { details } = useInstitute();
    const primaryColor = details?.theme?.primary || '#0ea5e9';
    const { resultsCache, setResults } = useResultStore();
    const [courses, setCourses] = React.useState<InstitutionCourse[]>([]);
    const [results, setResultsItems] = React.useState<Result[]>([]);
    const [selectedCourse, setSelectedCourse] = React.useState<string>('');
    const [selectedYear, setSelectedYear] = React.useState<string>('2026');
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const [isLoadingCourses, setIsLoadingCourses] = React.useState(false);
    const [isLoadingResults, setIsLoadingResults] = React.useState(false);

    // Fetch Courses
    React.useEffect(() => {
        const fetchCourses = async () => {
            if (!institutionId) return;
            try {
                setIsLoadingCourses(true);
                const response = await institutionCourseService.getInstitutionCourses(institutionId);
                if (response.success) {
                    setCourses(response.data);
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setIsLoadingCourses(false);
            }
        };

        fetchCourses();
    }, [institutionId]);

    // Reset page when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [selectedCourse, selectedYear]);

    // Fetch Results
    React.useEffect(() => {
        const fetchResults = async () => {
            if (!institutionId) return;

            const cacheKey = `${institutionId}-${selectedCourse}-${selectedYear}-${currentPage}`;
            if (resultsCache[cacheKey]) {
                setResultsItems(resultsCache[cacheKey].data);
                setTotalPages(resultsCache[cacheKey].pagination.pages);
                return;
            }

            try {
                setIsLoadingResults(true);
                const response = await resultService.getResults({
                    institutionId,
                    courseId: selectedCourse || undefined,
                    year: selectedYear,
                    page: currentPage,
                    limit: 20
                });
                if (response.success) {
                    setResultsItems(response.data);
                    setTotalPages(response.pagination.pages);
                    setResults(cacheKey, response.data, response.pagination);
                }
            } catch (error) {
                console.error("Error fetching results:", error);
            } finally {
                setIsLoadingResults(false);
            }
        };

        fetchResults();
    }, [institutionId, selectedCourse, selectedYear, currentPage, resultsCache, setResults]);

    const activeCourseName = courses.find(c => c.id === selectedCourse)?.name || 'All Exams';

    return (
        <div className="w-full px-4 sm:px-6 lg:px-10 py-6 md:py-12" style={{ '--primary-500': primaryColor } as React.CSSProperties}>
            <div className="flex flex-col lg:flex-row gap-6 md:gap-12">

                {/* Sidebar Filters */}
                <aside className="w-full lg:w-72 shrink-0">
                    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm lg:sticky lg:top-32">
                        <div className="flex items-center gap-2 md:gap-3 mb-3 sm:mb-4 md:mb-8">
                            <div className="w-1.5 md:w-2 h-5 sm:h-6 md:h-8 bg-primary-500 rounded-full" />
                            <h4 className="text-base sm:text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight">Filters</h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-4">
                            <FilterDropdown
                                label="Exam / Course"
                                placeholder="All Exams"
                                value={selectedCourse}
                                options={courses.map(c => ({ label: c.name, value: c.id }))}
                                onChange={setSelectedCourse}
                                primaryColor={primaryColor}
                            />

                            <FilterDropdown
                                label="Year / Session"
                                placeholder="All Time"
                                value={selectedYear}
                                options={YEARS.map(y => ({ label: y, value: y }))}
                                onChange={setSelectedYear}
                                primaryColor={primaryColor}
                            />
                        </div>
                    </div>
                </aside>

                {/* Main Content Areas */}
                <main className="flex-1 space-y-6 sm:space-y-10 md:space-y-20">
                    <div className="bg-white rounded-xl md:rounded-2xl border border-slate-100 shadow-sm p-3.5 sm:p-6 md:p-10 flex flex-col items-center">
                        <h3 className="text-base sm:text-xl md:text-2xl font-black text-slate-900 mb-4 sm:mb-6 md:mb-12 tracking-tight uppercase text-center">
                            {activeCourseName} {selectedYear} Results
                        </h3>

                        {/* Student Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4 md:gap-5 w-full">
                            {isLoadingResults ? (
                                [...Array(8)].map((_, i) => (
                                    <Card key={i} className="overflow-hidden border border-slate-100 shadow-sm rounded-xl">
                                        <CardContent className="p-0 flex flex-col h-full bg-white">
                                            <div className="relative aspect-[3/4] bg-slate-50">
                                                <Skeleton className="w-full h-full" />
                                            </div>
                                            <div className="p-2 sm:p-3 md:p-4 flex flex-col items-center gap-1.5 md:gap-2">
                                                <Skeleton className="h-3.5 md:h-4 w-3/4" />
                                                <Skeleton className="h-2.5 md:h-3 w-1/2" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : results.length > 0 ? (
                                results.map((result) => (
                                    <Card key={result.id} className="group overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col rounded-xl">
                                        <CardContent className="p-0 flex flex-col h-full bg-white">
                                            {/* Image Section */}
                                            <div className="relative aspect-[3/4] bg-slate-50 overflow-hidden">
                                                <Image
                                                    src={result.profile}
                                                    alt={result.name}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />

                                                {/* AIR Rank Badge */}
                                                <div className="absolute top-0 left-0 bg-primary-600 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1.5 font-bold text-[9px] sm:text-[10px] md:text-xs rounded-br-lg md:rounded-br-2xl shadow-sm z-10 uppercase tracking-wider">
                                                    AIR: {result.rank}
                                                </div>
                                            </div>

                                            {/* Info Section */}
                                            <div className="p-2 sm:p-3 md:p-4 flex flex-col justify-center text-center">
                                                <h4 className="text-xs md:text-sm font-bold text-slate-900 mb-0.5 md:mb-1 line-clamp-1">{result.name}</h4>
                                                <div className="flex flex-col items-center gap-0.5 md:gap-1 mt-0.5 md:mt-1">
                                                    <div className="text-[9px] sm:text-[10px] md:text-[11px] font-medium text-slate-500">
                                                        Score: <span className="text-primary-600 font-bold">{result.score}</span>
                                                    </div>
                                                    <div className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase italic">
                                                        {result.course?.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <div className="col-span-full py-8 sm:py-12 md:py-20 text-center">
                                    <div className="bg-slate-50 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-3 md:mb-4">
                                        <RefreshCw className="text-slate-300 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                                    </div>
                                    <p className="text-slate-500 text-xs sm:text-sm md:text-base font-medium">No results found for the selected filters.</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default InstitutionResultsBody;
