'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import SubjectHeader from '@/modules/institutes/lectures/components/Header';
import { useBatchSubjects } from '@/modules/institutes/lectures/hooks/useBatchSubjects';
import { useLectureStore } from '@/modules/institutes/lectures/store/useLectureStore';
import { Skeleton } from '@/core/components/ui/skeleton';
import { useAuthStore } from '@/core/store/auth.store';
import { LoginDialog } from '@/core/components/auth/LoginDialog';
import { BatchResources } from '@/modules/institutes/resources';

export default function ResourcesPage() {
    const params = useParams();
    const batchId = params.batchSlug as string;
    
    const { isAuthenticated } = useAuthStore();
    const { activeSubjects, setActiveSubject } = useLectureStore();
    const activeSubject = activeSubjects[batchId] || null;
    const [hasHydrated, setHasHydrated] = useState(false);

    // Wait for Zustand to rehydrate
    useEffect(() => {
        const unsub = useAuthStore.persist.onFinishHydration(() => {
            setHasHydrated(true);
        });
        if (useAuthStore.persist.hasHydrated()) {
            setHasHydrated(true);
        }
        return () => { unsub(); };
    }, []);

    const { data: batchSubjectsData, isLoading: isBatchLoading } = useBatchSubjects(
        hasHydrated && isAuthenticated ? batchId : undefined
    );

    const subjects = batchSubjectsData?.subjects || [];
    const activeSubjectName = subjects.find(s => s.id === activeSubject)?.name || '';

    useEffect(() => {
        if (!isBatchLoading && subjects.length > 0) {
            setActiveSubject(batchId, subjects[0].id);
        }
    }, [isBatchLoading, subjects.length, batchId, setActiveSubject]);

    // Show loading while waiting for hydration
    if (!hasHydrated) {
        return (
            <div className="space-y-8">
                <div className="flex gap-4 border-b border-slate-200 pb-4">
                    {[1, 2, 3].map(i => (
                        <Skeleton key={i} className="h-6 w-24 bg-slate-100" />
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
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Subject Header (Tabs) or Shimmer */}
            {isBatchLoading ? (
                <div className="flex gap-4 border-b border-slate-200 pb-4 mb-8">
                    {[1, 2, 3].map(i => (
                        <Skeleton key={i} className="h-6 w-24 bg-slate-100" />
                    ))}
                </div>
            ) : (
                <div className="mb-8">
                    <SubjectHeader
                        subjects={subjects}
                        activeSubject={activeSubject || ''}
                        onSubjectChange={(id) => setActiveSubject(batchId, id)}
                    />
                </div>
            )}

            <BatchResources batchId={batchId} subjectId={activeSubject} activeSubjectName={activeSubjectName} />
        </div>
    );
}
