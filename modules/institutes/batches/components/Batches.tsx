'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { ArrowRight, Filter, BookOpen, Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/core/components/ui/select";

import { Skeleton } from "@/core/components/ui/skeleton";
import { useBatches } from '../hooks/useBatches';
import { useInstitute } from '@/modules/institutes/institute/hooks/useInstitute';
import { useAuthStore, getLoginUrl, getRegisterUrl } from '@/modules/platform/auth';
import { verifyBatchAccess } from '@/modules/institutes/lectures/utils/batch-access';
import { useLectureStore } from '@/modules/institutes/lectures/store/useLectureStore';
import { toast } from 'sonner';

interface BatchesProps {
    activeTab: string;
    programId?: string;
}

const Batches: React.FC<BatchesProps> = ({ activeTab, programId }) => {
    const [selectedYear, setSelectedYear] = useState<string>("all");
    const [checkingBatchId, setCheckingBatchId] = useState<string | null>(null);
    const params = useParams();
    const router = useRouter();
    const { details } = useInstitute();
    const slug = params.slug as string;
    const courseSlug = params.courseSlug as string;

    const { isAuthenticated } = useAuthStore();
    const { setBatchSubjects } = useLectureStore();
    const { data: apiBatches, isLoading } = useBatches(programId, selectedYear);

    // Map API batches to UI structure
    const batches = apiBatches.map(b => {
        let coverImage = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop";
        if (b.thumbnail) {
            if (b.thumbnail.startsWith('http://') || b.thumbnail.startsWith('https://')) {
                coverImage = b.thumbnail;
            } else if (b.thumbnail.startsWith('//')) {
                coverImage = `https:${b.thumbnail}`;
            } else {
                coverImage = `https://${b.thumbnail}`;
            }
        }

        return {
            id: b.id,
            title: b.name,
            description: b.description,
            fee: b.academicFee,
            year: b.session,
            classLevel: b.program?.name || activeTab,
            slug: b.id, // Using ID as slug for now as API doesn't provide slug
            coverImage
        };
    });

    const handleExploreBatch = async (batchSlug: string) => {
        if (!isAuthenticated) {
            router.push(getRegisterUrl({
                redirect: `/${slug}/${courseSlug}`,
                slug,
                institutionId: details?.id
            }));
            return;
        }

        // Check access before navigating
        setCheckingBatchId(batchSlug);
        try {
            const result = await verifyBatchAccess(batchSlug);

            if (result.ok) {
                setBatchSubjects(batchSlug, result.data);
                router.push(`/${slug}/${courseSlug}/${batchSlug}`);
                return;
            }

            if (result.errorCode === 'NOT_ENROLLED') {
                const batch = filteredBatches.find(b => b.id === batchSlug);
                const batchNameParam = batch ? `&batchName=${encodeURIComponent(batch.title)}` : '';
                router.push(`/${slug}/payment?batchId=${batchSlug}${batchNameParam}`);
                return;
            }

            if (result.errorCode === 'ACCESS_EXPIRED') {
                toast.error(result.message || 'Your access to this batch has expired');
                return;
            }

            toast.error(result.message, {
                id: result.status === 403 ? 'unauthorized-batch-access' : 'batch-access-error',
                duration: result.status === 403 ? 4000 : 3000,
            });
        } finally {
            setCheckingBatchId(null);
        }
    };

    // API already returns filtered results by session
    const filteredBatches = batches;

    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const yearList = [];
        for (let i = -3; i <= 3; i++) {
            yearList.push((currentYear + i).toString());
        }
        return yearList;
    }, []);

    return (
        <section className="pt-10 pb-20 bg-background">
            <div className="w-full px-4 sm:px-6 lg:px-10">
                {/* Header with Dropdown Filter */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-5">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">Available Batches</h2>
                        <p className="text-slate-500 text-sm mt-1">Showing for <span className="text-primary-600 font-bold">{activeTab}</span></p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:block">Filter by batches:</span>
                        <Select value={selectedYear} onValueChange={setSelectedYear}>
                            <SelectTrigger className="w-full sm:w-[160px] h-9 bg-background border-slate-300 rounded-lg focus:ring-0 focus:outline-none transition-all shadow-none text-foreground text-sm font-bold outline-none cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <Filter size={14} className="text-slate-600" />
                                    <SelectValue placeholder="Select Year" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="bg-background border-slate-200 rounded-lg shadow-xl py-1">
                                <SelectItem value="all" className="font-bold text-sm text-foreground focus:bg-slate-100 focus:text-foreground rounded-md mx-1 cursor-pointer py-2">All Batches</SelectItem>
                                {years.map(year => (
                                    <SelectItem key={year} value={year} className="font-bold text-sm text-foreground focus:bg-slate-100 focus:text-foreground rounded-md mx-1 cursor-pointer py-2">
                                        Batch {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Grid - Updated to 4 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {isLoading ? (
                        [...Array(4)].map((_, i) => (
                            <Card key={i} className="bg-background border-slate-200 shadow-sm rounded-xl overflow-hidden flex flex-col p-0">
                                <Skeleton className="h-40 w-full bg-slate-100 rounded-none" />
                                <CardContent className="p-5 flex flex-col gap-4">
                                    <div className="space-y-2 mt-1">
                                        <Skeleton className="h-6 w-full bg-slate-100" />
                                        <Skeleton className="h-6 w-3/4 bg-slate-100" />
                                    </div>
                                    <div className="space-y-2 mt-2">
                                        <Skeleton className="h-3 w-full bg-slate-100" />
                                        <Skeleton className="h-3 w-5/6 bg-slate-100" />
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <div className="space-y-1.5">
                                            <Skeleton className="h-2 w-12 bg-slate-100" />
                                            <Skeleton className="h-5 w-20 bg-slate-100" />
                                        </div>
                                        <Skeleton className="h-8 w-16 bg-slate-100 rounded-full" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : filteredBatches.length > 0 ? (
                        filteredBatches.map((batch) => (
                            <Card
                                key={batch.id}
                                className="relative bg-background border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col rounded-xl overflow-hidden group cursor-pointer p-0"
                                onClick={() => handleExploreBatch(batch.slug)}
                            >
                                {/* Loading overlay while checking access */}
                                {checkingBatchId === batch.slug && (
                                    <div className="absolute inset-0 z-20 bg-white/70 backdrop-blur-[2px] flex items-center justify-center rounded-xl">
                                        <Loader2 className="w-6 h-6 text-primary-600 animate-spin" />
                                    </div>
                                )}

                                {/* Compact Image Header */}
                                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                                    <img
                                        src={batch.coverImage}
                                        alt={batch.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

                                    {/* Scaled-down Overlays */}
                                    <div className="absolute bottom-3 left-4 flex flex-wrap items-center gap-1.5 z-10 pr-2">
                                        <span className="text-[9px] font-bold text-primary-700 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
                                            {batch.classLevel}
                                        </span>
                                        <span className="text-[9px] font-bold text-white bg-black/50 backdrop-blur-md px-2 py-0.5 rounded uppercase tracking-wider shadow-sm border border-white/20">
                                            Session {batch.year}
                                        </span>
                                    </div>
                                </div>

                                <CardContent className="p-5 flex-1 flex flex-col">
                                    <h3 className="text-lg font-bold text-foreground mb-2 leading-tight group-hover:text-primary-600 transition-colors line-clamp-2">
                                        {batch.title}
                                    </h3>

                                    <p className="text-slate-500 text-xs leading-relaxed mb-5 line-clamp-2">
                                        {batch.description}
                                    </p>

                                    {/* Compact Footer */}
                                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[8px] uppercase tracking-[0.15em] text-slate-400 font-bold mb-0.5">Academic Fee</span>
                                            <span className="text-lg font-black text-foreground tracking-tight">₹{batch.fee.toLocaleString()}</span>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-primary-600 font-bold text-[11px] group/btn">
                                            JOIN
                                            <div className="w-7 h-7 rounded-full bg-primary-50 flex items-center justify-center group-hover/btn:bg-primary-600 group-hover/btn:text-white group-hover/btn:shadow-md transition-all duration-300">
                                                <ArrowRight size={12} className="stroke-[2.5]" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                            <BookOpen size={28} className="mx-auto text-slate-300 mb-3" />
                            <p className="text-slate-600 font-bold text-base">No Batches found for {activeTab}</p>
                            <p className="text-slate-500 text-xs mb-3">in {selectedYear === "all" ? "any session" : `the ${selectedYear} session`}</p>
                            <Button variant="link" onClick={() => setSelectedYear('all')} className="text-primary-600 font-bold text-sm cursor-pointer">
                                Clear year filter
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Batches;
