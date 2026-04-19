'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { ArrowRight, Filter } from 'lucide-react';
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
import { useAuthStore } from '@/core/store/auth.store';
import { LoginDialog } from '@/core/components/auth/LoginDialog';

interface BatchesProps {
    activeTab: string;
    programId?: string;
}

const Batches: React.FC<BatchesProps> = ({ activeTab, programId }) => {
    const [selectedYear, setSelectedYear] = useState<string>("all");
    const [showLogin, setShowLogin] = useState(false);
    const [pendingBatchSlug, setPendingBatchSlug] = useState<string | null>(null);
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const courseSlug = params.courseSlug as string;

    const { isAuthenticated } = useAuthStore();
    const { data: apiBatches, isLoading } = useBatches(programId, selectedYear);

    // Map API batches to UI structure
    const batches = apiBatches.map(b => ({
        id: b.id,
        title: b.name,
        description: b.description,
        fee: b.academicFee,
        year: b.session,
        classLevel: b.program?.name || activeTab,
        slug: b.id // Using ID as slug for now as API doesn't provide slug
    }));

    const handleExploreBatch = (batchSlug: string) => {
        if (!isAuthenticated) {
            setPendingBatchSlug(batchSlug);
            setShowLogin(true);
            return;
        }
        router.push(`/${slug}/${courseSlug}/${batchSlug}`);
    };

    const handleLoginSuccess = () => {
        setShowLogin(false);
        if (pendingBatchSlug) {
            router.push(`/${slug}/${courseSlug}/${pendingBatchSlug}`);
            setPendingBatchSlug(null);
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
        <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with Dropdown Filter */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-black text-foreground tracking-tight">Available Batches</h2>
                        <p className="text-slate-500 text-sm mt-1">Showing for <span className="text-primary-600 font-bold">{activeTab}</span></p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:block">Filter by batches:</span>
                        <Select value={selectedYear} onValueChange={setSelectedYear}>
                            <SelectTrigger className="w-full sm:w-[180px] h-10 bg-background border-slate-300 rounded-lg focus:ring-0 focus:outline-none transition-all shadow-none text-foreground font-bold outline-none cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <Filter size={14} className="text-slate-600" />
                                    <SelectValue placeholder="Select Year" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="bg-background border-slate-200 rounded-lg shadow-xl py-1">
                                <SelectItem value="all" className="font-bold text-foreground focus:bg-slate-100 focus:text-foreground rounded-md mx-1 cursor-pointer py-2">All Batches</SelectItem>
                                {years.map(year => (
                                    <SelectItem key={year} value={year} className="font-bold text-foreground focus:bg-slate-100 focus:text-foreground rounded-md mx-1 cursor-pointer py-2">
                                        Batch {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                        [...Array(3)].map((_, i) => (
                            <Card key={i} className="bg-background border-slate-200 shadow-none rounded-2xl overflow-hidden">
                                <CardContent className="p-8 flex flex-col gap-6">
                                    <div className="flex gap-2">
                                        <Skeleton className="h-5 w-20 bg-slate-100" />
                                        <Skeleton className="h-5 w-24 bg-slate-100" />
                                    </div>
                                    <div className="space-y-3">
                                        <Skeleton className="h-7 w-full bg-slate-100" />
                                        <Skeleton className="h-7 w-3/4 bg-slate-100" />
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-full bg-slate-100" />
                                        <Skeleton className="h-4 w-5/6 bg-slate-100" />
                                    </div>
                                    <div className="mt-4 pt-6 border-t border-slate-100 flex items-center justify-between">
                                        <div className="space-y-2">
                                            <Skeleton className="h-3 w-16 bg-slate-100" />
                                            <Skeleton className="h-6 w-24 bg-slate-100" />
                                        </div>
                                        <Skeleton className="h-10 w-24 bg-slate-100 rounded-full" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : filteredBatches.length > 0 ? (
                        filteredBatches.map((batch) => (
                            <Card
                                key={batch.id}
                                className="relative bg-background border-slate-200 shadow-none hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col rounded-2xl overflow-hidden group cursor-pointer"
                                onClick={() => handleExploreBatch(batch.slug)}
                            >
                                <CardContent className="p-8 flex-1 flex flex-col">
                                    {/* Metadata Row */}
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="text-[10px] font-bold text-slate-500 border border-slate-200 px-2 py-0.5 rounded uppercase tracking-wider">
                                            {batch.classLevel}
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-400 border border-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">
                                            Session {batch.year}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary-600 transition-colors">
                                        {batch.title}
                                    </h3>

                                    <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-2">
                                        {batch.description}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-0.5">Academic Fee</span>
                                            <span className="text-xl font-bold text-foreground">₹{batch.fee.toLocaleString()}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-primary-600 font-bold text-xs group/btn">
                                            JOIN
                                            <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center group-hover/btn:bg-primary-600 group-hover/btn:text-white transition-all">
                                                <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                            <p className="text-slate-600 font-bold">No Batches found for {activeTab} in {selectedYear === "all" ? "any session" : selectedYear}</p>
                            <Button variant="link" onClick={() => setSelectedYear('all')} className="text-primary-600 mt-2 font-bold cursor-pointer">Clear year filter</Button>
                        </div>
                    )}
                </div>
            </div>
            {showLogin && (
                <LoginDialog 
                    isOpen={showLogin} 
                    onClose={() => { setShowLogin(false); setPendingBatchSlug(null); }}
                    onSuccess={handleLoginSuccess}
                />
            )}
        </section>
    );
};

export default Batches;
