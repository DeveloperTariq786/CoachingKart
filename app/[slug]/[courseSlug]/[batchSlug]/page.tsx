'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import SubjectHeader from '@/modules/institutes/lectures/components/Header';
import Lectures from '@/modules/institutes/lectures/components/Lectures';
import { useLectures } from '@/modules/institutes/lectures/hooks/useLectures';
import { useBatchSubjects } from '@/modules/institutes/lectures/hooks/useBatchSubjects';
import { useLectureStore } from '@/modules/institutes/lectures/store/useLectureStore';
import { Skeleton } from '@/core/components/ui/skeleton';
import { useRequireAuth } from '@/modules/platform/auth';
import { toast } from 'sonner';

export default function CourseDashboardPage() {
    const params = useParams();
    const router = useRouter();
    const batchId = params.batchSlug as string;

    const { hasHydrated, isAuthenticated } = useRequireAuth();
    const { activeSubjects, setActiveSubject } = useLectureStore();
    const activeSubject = activeSubjects[batchId] || null;
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const { data: batchSubjectsData, isLoading: isBatchLoading, error: batchError } = useBatchSubjects(
        hasHydrated && isAuthenticated ? batchId : undefined
    );

    const { data: lectureData, isLoading: isLecturesLoading, error } = useLectures(
        hasHydrated && isAuthenticated && activeSubject ? batchId : undefined,
        1, 10, activeSubject || undefined,
        debouncedSearchTerm || undefined
    );

    useEffect(() => {
        const combinedError = batchError || error;
        if (combinedError && combinedError.response?.status === 403) {
            const errorMessage = combinedError.response?.data?.message || "You are not enrolled in this batch";
            toast.error(errorMessage, {
                id: 'unauthorized-batch-access',
                duration: 4000
            });
            router.back();
        }
    }, [batchError, error, router]);

    const subjects = batchSubjectsData?.subjects || [];
    const lectures = lectureData?.lectures || [];
    const activeSubjectName = subjects.find(s => s.id === activeSubject)?.name || '';
    const batchName = batchSubjectsData?.batch?.name || '';

    useEffect(() => {
        if (!isBatchLoading && subjects.length > 0) {
            setActiveSubject(batchId, subjects[0].id);
        }
    }, [isBatchLoading, subjects.length, batchId, setActiveSubject]);

    const isLoading = isBatchLoading || isLecturesLoading;

    if (!hasHydrated || !isAuthenticated) {
        return (
            <div className="space-y-8">
                <div className="flex gap-4 border-b border-slate-200 pb-4">
                    {[1, 2, 3].map(i => (
                        <Skeleton key={i} className="h-6 w-24 bg-slate-100" />
                    ))}
                </div>
                <div className="space-y-4">
                    {[1, 2].map(i => (
                        <Skeleton key={i} className="h-32 w-full bg-slate-100 rounded-2xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            {isBatchLoading ? (
                <div className="flex gap-4 border-b border-slate-200 pb-4 mb-8">
                    {[1, 2, 3].map(i => (
                        <Skeleton key={i} className="h-6 w-24 bg-slate-100" />
                    ))}
                </div>
            ) : (
                <SubjectHeader
                    subjects={subjects}
                    activeSubject={activeSubject || ''}
                    onSubjectChange={(id) => setActiveSubject(batchId, id)}
                />
            )}

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                {isLecturesLoading ? (
                    <div className="space-y-4 mt-8">
                        {[1, 2, 3].map(i => (
                            <Skeleton key={i} className="h-32 w-full bg-slate-100 rounded-2xl" />
                        ))}
                    </div>
                ) : (
                    <Lectures
                        lectures={lectures}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        activeSubject={activeSubject || ''}
                        activeSubjectName={activeSubjectName}
                        batchName={batchName}
                    />
                )}
            </div>
        </>
    );
}
