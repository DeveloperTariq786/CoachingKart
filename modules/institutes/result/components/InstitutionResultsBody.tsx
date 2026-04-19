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
    onChange: (value: string) => void
}> = ({ label, value, placeholder, options, onChange }) => {
    const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

    return (
        <div className="w-full mb-6">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                {label}
            </label>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="w-full h-11 flex items-center justify-between px-4 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold text-sm hover:border-primary-200 hover:bg-slate-50/50 transition-all outline-none focus:ring-4 focus:ring-primary-500/5 focus:border-primary-300 shadow-sm group text-left cursor-pointer">
                        <span className="truncate">{selectedLabel}</span>
                        <ChevronDown size={16} strokeWidth={3} className="text-slate-400 group-hover:text-primary-500 transition-colors shrink-0" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 max-h-[300px] overflow-y-auto" align="start">
                    <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
                        <DropdownMenuRadioItem value="" className="font-bold text-slate-400 cursor-pointer">
                            {placeholder}
                        </DropdownMenuRadioItem>
                        {options.map((opt) => (
                            <DropdownMenuRadioItem key={opt.value} value={opt.value} className="font-medium text-slate-700 cursor-pointer">
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
        <div className="flex items-center justify-center gap-2 mt-12 pb-4">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-100 bg-white text-slate-600 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-100 transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-600 disabled:hover:border-slate-100 cursor-pointer"
            >
                <ChevronDown className="rotate-90" size={18} />
            </button>

            <div className="flex items-center gap-1.5">
                {pages.map((p) => (
                    <button
                        key={p}
                        onClick={() => onPageChange(p)}
                        className={cn(
                            "w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all cursor-pointer",
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
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-100 bg-white text-slate-600 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-100 transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-600 disabled:hover:border-slate-100 cursor-pointer"
            >
                <ChevronDown className="-rotate-90" size={18} />
            </button>
        </div>
    );
};

const InstitutionResultsBody: React.FC<InstitutionResultsBodyProps> = ({ institutionId }) => {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row gap-12">

                {/* Sidebar Filters */}
                <aside className="w-full lg:w-72 shrink-0">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm sticky top-32">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-2 h-8 bg-primary-500 rounded-full" />
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Filters</h4>
                        </div>

                        <FilterDropdown
                            label="Exam / Course"
                            placeholder="All Exams"
                            value={selectedCourse}
                            options={courses.map(c => ({ label: c.name, value: c.id }))}
                            onChange={setSelectedCourse}
                        />

                        <FilterDropdown
                            label="Year / Session"
                            placeholder="All Time"
                            value={selectedYear}
                            options={YEARS.map(y => ({ label: y, value: y }))}
                            onChange={setSelectedYear}
                        />
                    </div>
                </aside>

                {/* Main Content Areas */}
                <main className="flex-1 space-y-20">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-10 flex flex-col items-center">
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 md:mb-12 tracking-tight uppercase text-center">
                            {activeCourseName} {selectedYear} Results
                        </h3>

                        {/* Student Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
                            {isLoadingResults ? (
                                [...Array(8)].map((_, i) => (
                                    <Card key={i} className="overflow-hidden border border-slate-100 shadow-sm rounded-xl">
                                        <CardContent className="p-0 flex flex-col h-full bg-white">
                                            <div className="relative aspect-[4/5] bg-slate-50">
                                                <Skeleton className="w-full h-full" />
                                            </div>
                                            <div className="p-3 md:p-4 flex flex-col items-center gap-2">
                                                <Skeleton className="h-4 w-3/4" />
                                                <Skeleton className="h-3 w-1/2" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : results.length > 0 ? (
                                results.map((result) => (
                                    <Card key={result.id} className="group overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col rounded-xl">
                                        <CardContent className="p-0 flex flex-col h-full bg-white">
                                            {/* Image Section */}
                                            <div className="relative aspect-[4/5] bg-slate-50 overflow-hidden">
                                                <Image
                                                    src={result.profile}
                                                    alt={result.name}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />

                                                {/* AIR Rank Badge */}
                                                <div className="absolute top-0 left-0 bg-primary-600 text-white px-3 py-1.5 font-bold text-xs md:text-sm rounded-br-2xl shadow-sm z-10 uppercase tracking-wider">
                                                    AIR: {result.rank}
                                                </div>
                                            </div>

                                            {/* Info Section */}
                                            <div className="p-3 md:p-4 flex flex-col justify-center text-center">
                                                <h4 className="text-sm md:text-sm font-bold text-slate-900 mb-1 line-clamp-1">{result.name}</h4>
                                                <div className="flex flex-col items-center gap-1 mt-1">
                                                    <div className="text-[10px] md:text-[11px] font-medium text-slate-500">
                                                        Score: <span className="text-primary-600 font-bold">{result.score}</span>
                                                    </div>
                                                    <div className="text-[9px] font-bold text-slate-400 uppercase italic">
                                                        {result.course?.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center">
                                    <div className="bg-slate-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                                        <RefreshCw className="text-slate-300" size={32} />
                                    </div>
                                    <p className="text-slate-500 font-medium">No results found for the selected filters.</p>
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
