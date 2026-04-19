'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import SubjectHeader from '@/modules/institutes/lectures/components/Header';
import Lectures from '@/modules/institutes/lectures/components/Lectures';
import { useLectures } from '@/modules/institutes/lectures/hooks/useLectures';
import { useBatchSubjects } from '@/modules/institutes/lectures/hooks/useBatchSubjects';
import { useLectureStore } from '@/modules/institutes/lectures/store/useLectureStore';
import { Skeleton } from '@/core/components/ui/skeleton';
import { useAuthStore } from '@/core/store/auth.store';
import { LoginDialog } from '@/core/components/auth/LoginDialog';
import { toast } from 'sonner';

export default function CourseDashboardPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const courseSlug = params.courseSlug as string;
    const batchId = params.batchSlug as string;
    
    const { isAuthenticated } = useAuthStore();
    const { activeSubjects, setActiveSubject } = useLectureStore();
    const activeSubject = activeSubjects[batchId] || null;
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [hasHydrated, setHasHydrated] = useState(false);

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Wait for Zustand to rehydrate from localStorage before checking auth
    useEffect(() => {
        const unsub = useAuthStore.persist.onFinishHydration(() => {
            setHasHydrated(true);
        });
        // If already hydrated (e.g. not first render)
        if (useAuthStore.persist.hasHydrated()) {
            setHasHydrated(true);
        }
        return () => { unsub(); };
    }, []);

    const { data: batchSubjectsData, isLoading: isBatchLoading, error: batchError } = useBatchSubjects(
        hasHydrated && isAuthenticated ? batchId : undefined
    );

    const { data: lectureData, isLoading: isLecturesLoading, error } = useLectures(
        hasHydrated && isAuthenticated && activeSubject ? batchId : undefined,
        1, 10, activeSubject || undefined,
        debouncedSearchTerm || undefined
    );

    // Redirect to batches page if not enrolled (403 Forbidden)
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

    // Show loading while waiting for hydration
    if (!hasHydrated) {
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

    // Show login dialog if not authenticated
    if (!isAuthenticated) {
        return <LoginDialog isOpen={true} onClose={() => {}} />;
    }

    return (
        <>
            {/* Subject Header (Tabs) or Shimmer */}
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

            {/* Dashboard Content / Lectures Shimmer */}
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
